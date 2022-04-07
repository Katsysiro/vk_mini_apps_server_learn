const fs = require( 'fs' )

var options = {
    key: fs.readFileSync('./privatekey.key'),
    cert: fs.readFileSync('./certificate.crt')
}

// создаем HTTP-сервер
const server = require('http').createServer(/*options*/)

// подключаем к серверу Socket.IO
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
})

const log = console.log

// получаем обработчики событий
const registerMessageHandlers = require('./handlers/messageHandlers')
const registerUserHandlers = require('./handlers/userHandlers')

// данная функция выполняется при подключении каждого сокета 
// (обычно, один клиент = один сокет)
const onConnection = (socket) => {
    // выводим сообщение о подключении пользователя
    log('User connected')

    // регистрируем обработчики
    // обратите внимание на передаваемые аргументы
    registerMessageHandlers(io, socket)
    registerUserHandlers(io, socket)

    // обрабатываем отключение сокета-пользователя
    socket.on('disconnect', function() {
        // выводим сообщение
        log('User disconnected')
    })
}

// обрабатываем подключение
io.on('connection', onConnection)

// запускаем сервер
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    log(`Server ready connect. Port: ${PORT}`)
})
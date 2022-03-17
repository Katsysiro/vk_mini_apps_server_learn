// создаем HTTP-сервер
const server = require('http').createServer()

// подключаем к серверу Socket.IO
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
})

const log = console.log

// получаем обработчики событий

// данная функция выполняется при подключении каждого сокета 
// (обычно, один клиент = один сокет)
const onConnection = (socket) => {

}

// обрабатываем подключение
io.on('connection', onConnection)

// запускаем сервер
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    log(`Server ready connect. Port: ${PORT}`)
})
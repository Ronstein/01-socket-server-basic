class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }
    socketEvents() {
        //onConnection
        this.io.on('connection', (socket) => {
            //Escuchar Evento: mensaje-to-server
            socket.on('mensaje-to-server', (data) => {
                console.log('El cliente envio algo: ', data);
                this.io.emit('mensaje-from-server', data);
            });
        });
    }
}

module.exports = Sockets;
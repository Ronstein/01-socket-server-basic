//Servidor Express
const express = require('express');
//Servidor de Sockets
const http = require('http');
//config. socket
const socketio = require('socket.io');
//directorios
const path = require('path');
const Sockets = require('./sockets');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //HTTP SERVER
        this.server = http.createServer(this.app);
        //CONFIGURACIONES DE SOCKETs
        this.io = socketio(this.server, {/* configuraciones */ });
    }

    middlewares() {
        //desplegar el directorio publico middleware
        this.app.use(express.static(path.resolve(__dirname, '../public')));
    }

    configurarSockets() {
        new Sockets(this.io);
    }

    execute() {
        //inicializar middlewares
        this.middlewares();
        //inicializar sockets
        this.configurarSockets();
        //inicializar server
        this.server.listen(this.port, () => {
            console.log('Server corriendo en puerto: ', this.port);
        });
    }
}

module.exports = Server;
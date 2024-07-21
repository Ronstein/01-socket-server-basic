//Servidor Express
const express = require('express');
const app = express();

//Servidor de Sockets
const server = require('http').createServer(app);

//configuracion del socket server
const io = require('socket.io')(server);

//desplegar el directorio publico middleware
app.use(express.static(`${__dirname}/public`));
//conexion
//puede ser client en vez de socket
io.on('connection', (socket) => {
    // console.log(socket.id);
    // socket.emit('mensaje-bienvenida', {
    //     msg: 'Bienvenido al Server',
    //     fecha: new Date(),
    // });
    //Escuchar el evento
    //mensaje-cliente
    // socket.on('mensaje-cliente', (data) => {
    //     console.log('El cliente envio algo: ', data);
    // });
    socket.on('mensaje-to-server', (data) => {
        console.log('El cliente envio algo: ', data);
        // socket.emit('mensaje-from-server', data);
        io.emit('mensaje-from-server', data);
    });
});

server.listen(8080, () => {
    console.log('Server corriendo en puerto 8080');
});
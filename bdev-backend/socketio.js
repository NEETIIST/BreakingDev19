const socketio = function(socket){
    socket.on('join', function(room) {
        //console.log("User joined room: "+room)
        socket.join(room);
    });
    socket.on('disconnect', function(){
        //console.log('User Disconnected');
    });
    /*
    socket.on('sent_message', function(channel){
        console.log("Recebida Mensagem, a emitir evento")
        //console.log(channel);
        //socket.to(channel).emit('has_messages');
    });
    */
}

module.exports = socketio;

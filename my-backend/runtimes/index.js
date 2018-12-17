
module.exports = (io) => {
    io.on('connection', (socket) => {
        
        console.log('connection ' + socket.id);

        socket.on('disconnect', () => {
            console.log('disconnect');
        });

    });
};
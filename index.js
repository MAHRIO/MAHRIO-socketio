require('mahrio').runServer(process.env, __dirname)
    .then( function(server) {

      io = require('socket.io').listen( server.listener );

      io.on('connection', function( socket ){
          console.log('socket listening...' + socket.id);
          socket.emit( 'event:hello' );
          socket.on('client:itsame', function(val){
            console.log(val)
          });
          socket.on( 'disconnect', function(){
            console.log('goodbye socket...' + socket.id );
          });
        });

        server.route({
            path: '/{param*}',
            method: 'GET',
            handler: {
              directory: {
                path: ['../public/']
              }
            }
        });

        server.route({
          path: "/socket.io/{param*}",
          method: 'GET',
          handler: {
            directory: {
              path: ["../node_modules/socket.io/"]
            }
          }
        })

    });

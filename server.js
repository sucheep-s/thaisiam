var Hapi = require('hapi');
var Good = require('good');
var Path = require('path');
var server = new Hapi.Server();
server.connection({port : 3000});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public',
            listing: true
        }
    }
});

server.views({
    engines: {
        html: require('handlebars')
    },
    path: Path.join(__dirname, 'views')
});
/*****************Admin************/
server.route({
    method: 'GET',
    path: '/login' ,
    handler: function (request, reply) {
        reply.view('login');
    }
});
server.route({
    method: 'GET',
    path: '/admin' ,
    handler: function (request, reply) {
        reply.view('admin');
    }
});
server.route({
    method: 'GET',
    path: '/adminaboutus' ,
    handler: function (request, reply) {
        reply.view('adminaboutus');
    }
});
server.route({
    method: 'GET',
    path: '/adminproduct' ,
    handler: function (request, reply) {
        reply.view('adminproduct');
    }
});
server.route({
    method: 'GET',
    path: '/adminuser' ,
    handler: function (request, reply) {
        reply.view('adminuser');
    }
});
server.route({
    method: 'GET',
    path: '/aboutus' ,
    handler: function (request, reply) {
        reply.view('aboutus');
    }
});

/*****************Front************/
server.route({
    method: 'GET',
    path: '/' ,
    handler: function (request, reply) {
        reply.view('index');
    }
});

server.route({
    method: 'GET',
    path: '/index' ,
    handler: function (request, reply) {
        reply.view('index');
    }   
});

server.route({
    method: 'GET',
    path: '/contact',
    handler: function (request, reply) {
        reply.view('contact');
    }
});
server.route({
    method: 'GET',
    path: '/product',
    handler: function (request, reply) {
        reply.view('product');
    }
});
server.route({
    method: 'GET',
    path: '/productdetail',
    handler: function (request, reply) {
        reply.view('productdetail');
    }
});

server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            args:[{ log: '*', response: '*' }]
        }]
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
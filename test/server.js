var Belt = require('jsbelt')
  , Optionall = require('optionall')
  , Path = require('path')
  , OS = require('os')
  , FSTK = require('fstk')
  , O = new Optionall({'__dirname': Path.resolve(module.filename + '/../..')
                     , 'file_priority': ['package.json', 'environment.json', 'config.json']})
  , Async = require('async')
  , _ = require('underscore')
  , Winston = require('winston')
  , API = require('ap1');

var gb = {}
  , log = new Winston.Logger()
;

log.add(Winston.transports.Console, {'level': 'debug', 'colorize': true, 'timestamp': false});

gb.api = new API(O);

gb.data = {};

//test routes

gb.api.ws.addRoute('/model/create', function(o){
  var obj = Belt.get(gb, 'data.model.' + Belt.pescape(o.$data.id)  + '.' + Belt.pescape(o.$data.path || ''));
  Belt.set(gb, 'data.model.' + Belt.pescape(o.$data.id) + Belt.pescape(o.$data.path), Belt.objPatch(obj, o.$data.patch));

  return gb.api.ws.emit('/model/' + o.$data.id + '/create', {
    'url': '/model/' + o.$data.id + '/create'
  , 'data': {
      'id': o.$data.id
    , 'path': o.$data.path
    , 'val': Belt.get(gb, 'data.model.' + Belt.pescape(o.$data.id)  + '.' + Belt.pescape(o.$data.path || ''))
    , 'echo': true
    }
  });
});

gb.api.ws.addRoute('/model/read', function(o){
  return gb.api.ws.emit('/model/' + o.$data.id + '/read', {
    'url': '/model/' + o.$data.id + '/create'
  , 'data': {
      'id': o.$data.id
    , 'path': o.$data.path
    , 'val': Belt.get(gb, 'data.model.' + Belt.pescape(o.$data.id)  + '.' + Belt.pescape(o.$data.path || ''))
    , 'echo': true
    }
  });
});

gb.api.ws.addRoute('/model/destroy', function(o){
  Belt.delete(gb, 'data.model.' + Belt.pescape(o.$data.id) + '.' + Belt.pescape(o.$data.path || ''));
  return gb.api.ws.emit('/model/' + o.$data.id + '/destroy', {
    'url': '/model/' + o.$data.id + '/destroy'
  , 'data': {
      'id': o.$data.id
    , 'path': o.$data.path
    , 'echo': true
    }
  });
});

//end test routes

gb.api.http.addRoute('*', function(o){
  return o.$response.sendFile(Path.join(gb.api.settings.__dirname, '.' + o.$url.pathname));
});

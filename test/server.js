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
  , API = require('ap1')
  , Locup = require('locup')
;

var gb = {}
  , log = new Winston.Logger()
;

log.add(Winston.transports.Console, {'level': 'debug', 'colorize': true, 'timestamp': false});

gb.api = new API(O);
gb.locup = new Locup(Belt.extend({'api_key': O.google.key}, O));

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

gb.api.http.addRoute('/geocode', function(o){
  return gb.locup.geocode(o.$data.address, function(err, d){
    var data = {
      'location.normalized_string': Belt.get(Belt.toArray(d), '0.formatted_address')
    }
    data['location.address'] = Belt.get(Belt.toArray(d), '0.address_components');
    if (data['location.address']) data['location.address'] = gb.locup.address_components_to_obj(data['location.address']);

    data['location.geo.coordinates.0'] = Belt.get(Belt.toArray(d), '0.geometry.location.lng');
    data['location.geo.coordinates.1'] = Belt.get(Belt.toArray(d), '0.geometry.location.lat');

    return o.$response.status(200).json({'error': Belt.get(err, 'message'), 'data': data});
  });
});

gb.api.http.addRoute('/reverse_geocode', function(o){
  return gb.locup.reverse_geocode(o.$data.latitude, o.$data.longitude, function(err, d){
    var data = {
      'location.normalized_string': Belt.get(Belt.toArray(d), '0.formatted_address')
    }
    if (!err){
      data['location.address'] = Belt.get(Belt.toArray(d), '0.address_components');
      if (data['location.address']) data['location.address'] = gb.locup.address_components_to_obj(data['location.address']);
    }

    return o.$response.status(200).json({'error': Belt.get(err, 'message'), 'data': data});
  });
});

gb.api.http.addRoute('/file/create', function(o){
  var _gb = {};
  return Async.waterfall([
    function(cb){
      _gb.data = Belt.parse(Belt.get(o, '$data.data') || '{}');
      _gb.file = Belt.get(o, '$files.upload');

      if (!_gb.file) return cb(new Error('File was not uploaded'));

      if (_gb.data.file.file_path) return FSTK.rm(Path.join(gb.api.settings.http.paths.data, '/', _gb.data.file.file_path), Belt.cw(cb));

      return cb();
    }
  , function(cb){
      return FSTK.mv(_gb.file.path, Path.join(gb.api.settings.http.paths.data, '/', _gb.file.name), Belt.cw(cb, 0));
    }
  , function(cb){
      Belt.set(_gb, 'data.file.file_path', _gb.file.name);
      return FSTK.stat(Path.join(gb.api.settings.http.paths.data, '/', _gb.file.name), Belt.dcds(cb, _gb, 'data.file.stat', 1, '', 0)); 
    }
  ], function(err){
    return o.$response.status(200).json({'error': Belt.get(err, 'message'), 'data': _gb.data});
  });
}, {'method': 'post'});

//end test routes

gb.api.http.addRoute('*', function(o){
  return o.$response.sendFile(Path.join(gb.api.settings.__dirname, '.' + o.$url.pathname));
});

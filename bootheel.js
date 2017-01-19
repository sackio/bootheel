function _bh(){
  var self = this
    , bh = {};

  bh['_viewSet'] = function(options, callback){
    var a = Belt.argulint(arguments)
      , self = this
      , gb = {};
    a.o = _.defaults(a.o, {
      //el
      //path
      //value
      //view
      //data
    });

    $(a.o.el).find('[data-set="' + a.o.path + '"]').each(function(i, el){
      var $el = $(el)
        , method = $el.attr('data-set-method') || ($el.is('input, textarea, select') ? 'val' : 'html')
        , transform = $el.attr('data-set-transformer') || ('set:' + a.o.path)
        , value;

      if (transform && (Belt.get(a.o.view, 'transformers') || {})[transform]){
        value = _.bind(a.o.view.transformers[transform], a.o.view)(a.o.value, $el, a.o);
      } else {
        value = a.o.value;
      }

      Belt.call($el, method, value);
    });
  };

  bh['_viewGet'] = function(options, callback){
    var a = Belt.argulint(arguments)
      , self = this
      , gb = {};
    a.o = _.defaults(a.o, {
      //el
      //path
      //data
    });

    var $el = $(a.o.el).find('[data-get="' + a.o.path + '"]')
      , method = $el.attr('data-get-method') || ($el.is('input, textarea, select') ? 'val()' : 'html()')
      , transform = $el.attr('data-get-transformer') || ('get:' + a.o.path)
      , value;

    if (transform && (Belt.get(a.o.view, 'transformers') || {})[transform]){
      value = _.bind(a.o.view.transformers[transform], a.o.view)(Belt.get($el, method), $el, a.o);
    } else {
      value = Belt.get($el, method);
    }

    return value;
  };

  bh['View'] = function(options, callback){
    var a = Belt.argulint(arguments)
      , self = this
      , gb = {};
    a.o = _.defaults(a.o, {
      //template
      //el
    });

    var view = new (Backbone.View.extend(_.pick(a.o, [
      'template'
    ])))();

    _.extend(view, _.omit(a.o, [
      'el'
    ]));

    view['setters'] = view.setters || {};
    view['getters'] = view.getters || {};
    view['subviews'] = view.subviews || {};
    view['data'] = view.data || {};
    view['events'] = view.events || {};
    view['transformers'] = view.transformers || {};
    view['triggers'] = view.triggers || {};

    view['loadSubviews'] = function(){
      var self = this;

      _.each(self.subviews, function(v, k){
        if (_.isString(v)){
          self.subviews[k] = self.$el.find(v);
        } else {
          self.subviews[k] = v;
        }
      });
    };
    view.loadSubviews();

    view['set'] = function(vals, opts){
      var self = this;

      opts = opts || {};

      if (!opts.no_persist) _.each(vals, function(v, k){
        self.data[k] = v;
      });

      vals['self'] = self.data;

      _.each(vals, function(v, k){
        if (self.setters[k]) self.setters[k](v, opts);

        bh._viewSet({
          'el': self.$el
        , 'value': v
        , 'path': k
        , 'view': view
        , 'data': vals
        });

        if (!opts.silent) self.emit('set:' + k, v);
      });
    };

    view['get'] = function(path, opts){
      var self = this;

      opts = opts || {};

      if (Belt.isNull(path)) return _.extend(view.$el.find('[data-get]').map(function(i, e){
        var $el = $(e)
          , path = $el.attr('data-get');
        return view.get(path, opts);
      }), _.mapObject(self.getters, function(v, k){
        return view.get(k, opts);
      }));

      if (_.isArray(path)) return _.object(path, _.map(path, function(k){
        return view.get(k, opts);
      }));

      var val;

      if (self.getters[path]){
        val =  self.getters[path](opts);
      } else {
        val = bh._viewGet({
          'el': self.$el
        , 'path': path
        , 'view': view
        });
      }

      if (!opts.no_persist) self.data[path] = val;
      if (!opts.silent) self.emit('get:' + path, val);

      return val;
    };

    _.extend(view, Backbone.Events);

    view.setEvents = function(events){
      _.each(events, function(v, k){
        view.on(k, _.bind(v, view));
      });
    };

    view.setEvents(view.events);

    view['setEl'] = function(el){
      view['$el'] = $(el);

      _.each(view.triggers, function(v, k){
        var cmps = k.split(' ')
          , event = cmps.shift()
          , sel = cmps.join(' ');

        view.$el.on(event, sel, _.bind(v, view));
      });
    };

    if (a.o.el) view.setEl(a.o.el);

    view.emit('load');

    return view;
  };
};

var Bh = _bh.call(this);

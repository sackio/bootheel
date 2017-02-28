Backbone.Events['emit'] = Backbone.Events.trigger;

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

    if ($(a.o.el).is('[data-set="' + a.o.path + '"]')){
      var $el = $(a.o.el)
        , method = $el.attr('data-set-method')
                || ($el.is('input, select, textarea') ? 'val' : 'html')
        , transform = $el.attr('data-set-transformer') || ('set:' + a.o.path)
        , value;

      if (transform && (Belt.get(a.o.view, 'transformers') || {})[transform]){
        value = _.bind(a.o.view.transformers[transform], a.o.view)(a.o.value, $el, a.o);
      } else {
        value = a.o.value;
      }

      if (method) Belt.call($el, method, value);
    }

    $(a.o.el).find('[data-set="' + a.o.path + '"]').each(function(i, el){
      var $el = $(el)
        , method = $el.attr('data-set-method')
                || ($el.is('input, select, textarea') ? 'val' : 'html')
        , transform = $el.attr('data-set-transformer') || ('set:' + a.o.path)
        , value;

      if (transform && (Belt.get(a.o.view, 'transformers') || {})[transform]){
        value = _.bind(a.o.view.transformers[transform], a.o.view)(a.o.value, $el, a.o);
      } else {
        value = a.o.value;
      }

      if (method) Belt.call($el, method, value);
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

    var $el = $(a.o.el).is('[data-get="' + a.o.path + '"]') ? $(a.o.el) : $(a.o.el).find('[data-get="' + a.o.path + '"]')
      , method = $el.attr('data-get-method')
              || ($el.is('input, select, textarea') ? 'val()' : 'html()')
      , transform = $el.attr('data-get-transformer') || ('get:' + a.o.path)
      , value;

    if (transform && (Belt.get(a.o.view, 'transformers') || {})[transform]){
      value = _.bind(a.o.view.transformers[transform], a.o.view)(method ? Belt.get($el, method) : null, $el, a.o);
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

    if (a.o.template && _.isString(a.o.template)) a.o.template = _.template(a.o.template);

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
      opts['view'] = self;

      if (!opts.no_persist) _.each(vals, function(v, k){
        self.data[k] = v;
      });

      vals['self'] = self.data;

      _.each(vals, function(v, k){
        if (self.setters[k]) _.bind(self.setters, self)[k](v, opts);

        bh._viewSet({
          'el': self.$el
        , 'value': v
        , 'path': k
        , 'view': view
        , 'data': vals
        });

        if (!opts.silent){
          self.emit('set:' + k, v);
          self.emit('set', _.object([k], [v]));
        }
      });
    };

    view['get'] = function(path, opts){
      var self = this;

      opts = opts || {};
      opts['view'] = self;

      if (Belt.isNull(path)){
        var obj = {};
        if (view.$el.is('[data-get]')){
          var path = view.$el.attr('data-get');
          Belt.set(obj, path, view.get(path, opts));
        }

        view.$el.find('[data-get]').each(function(i, e){
          var $el = $(e)
            , path = $el.attr('data-get');
          Belt.set(obj, path, view.get(path, opts));
        });

        _.each(self.getters, function(v, k){
          Belt.set(obj, k, view.get(k, opts));
        });

        return obj;
      }

      if (_.isArray(path)) return _.object(path, _.map(path, function(k){
        return view.get(k, opts);
      }));

      var val;

      if (self.getters[path]){
        val =  _.bind(self.getters[path], self)(opts);
      } else {
        val = bh._viewGet({
          'el': self.$el
        , 'path': path
        , 'view': view
        });
      }

      if (!opts.no_persist) self.data[path] = val;
      if (!opts.silent){
        self.emit('get:' + path, val);
        self.emit('get', _.object([path], [val]));
      }

      return val;
    };

    _.extend(view, Backbone.Events);

    view['setEvents'] = function(events){
      _.each(events, function(v, k){
        view.on(k, _.bind(v, view));
      });
    };

    view.setEvents(view.events);

    if (a.o.template) view['render'] = function(el, template){
      if (el) view.setEl(el);

      if (template) _.isString(template) ? view['template'] =  _.template(template) : template;

      view.$el.html(view.template(view.data));
      view.emit('render');
    };

    view['setEl'] = function(el){
      view['$el'] = $(el);

      _.each(view.triggers, function(v, k){
        var cmps = k.split(' ')
          , event = cmps.shift()
          , sel = cmps.join(' ');

        view.$el.on(event, sel || _.bind(v, view), sel ? _.bind(v, view) : null);
      });

      view.emit('el', view.$el);
    };

    if (a.o.el) view.setEl(a.o.el);

    view.emit('load');

    return view;
  };

  return bh;
};

var Bh = _bh.call(this);

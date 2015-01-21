/*
 * bootheel
 * 
 *
 * Copyriht (c) 2014 Ben Sack
 * Licensed under the MIT license.
 */

(function(){

  var _$ = function(options){
    var B = {};

    B.settings = Belt.extend({
      'io': io
    , 'io_url': undefined
    }, options);

    B['io'] = B.settings.io;
    B.io = B.io.connect(B.settings.io_url);

    /////////////////////////////////////////////////////////////
    // Chainable HTML DOM methods, render DOM elements with JS //
    /////////////////////////////////////////////////////////////

    B['el'] = function(opts, html){
      if (!_.isObject(opts)){ html = opts; opts = {}; }

      var e = _.defaults(opts || {}, {
        'tag': 'div'
      , 'id': null
      , 'class': null
      , 'data': {}
      , 'style': {}
      , 'attr': {}
      , '_$transformers': []
      , '_$parent': null
      , 'parents': {}
      });

      _.each(e._$transformers, function(v, k){
        return v.call(e, k);
      });

      e = Belt.extend({
        '_$settings': {
          'close': true
        , 'uuid': Belt.uuid()
        }
      }, e);

      html = html || e.html;

      e = Belt.extend(e, {
        '_$html': html ? Belt.toArray(html) : []
      });

      e = Belt.extend(e, {
        'el': function(_$opts, _$html){
          var _$e = B.el(_$opts, _$html);
          _$e._$parent = e;
          e._$html.push(_$e);
          return _$e;
        }
      , 'renderTag': function(){
          return [
            '<' + e.tag
          , (e.id ? ' id="' + e.id + '"' : '')
          , (e.class ? ' class="' + Belt.toArray(e.class).join(' ') + '"' : '')
          , (e.attr && _.any(e.attr) ? _.map(e.attr, function(v, k){
              if (_.isUndefined(v) || _.isNull(v) || v === false) return '';
              return ' ' + k + '="' + (_.isObject(v) ? Belt.stringify(v).replace(/\"/g, '&quot;') : v) + '"';
            }).join('') : '')
          , (e.style && _.any(e.style) ? ' style="' + _.map(e.style, function(v, k){
              if (_.isUndefined(v) || _.isNull(v) || v === false) return '';
              return k + ':' + (_.isObject(v) ? Belt.stringify(v).replace(/\"/g, '&quot;') : v);
            }).join(';') + '"' : '')
          , (e.data && _.any(e.data) ? _.map(e.data, function(v, k){
              if (_.isUndefined(v) || _.isNull(v) || v === false) return '';
              return ' data-' + k + '="' + (_.isObject(v) ? Belt.stringify(v).replace(/\"/g, '&quot;') : v) + '"';
            }).join('') : '')
          , '>'].join('');
        }
      , 'start': function(){
          if (e._$parent) return e._$parent.start();
          return e;
        }
      , 'render': function(chain){
          if (chain) return e.start().render();

          return e.renderTag() + _.map(e._$html, function(h){
            if (Belt.isNull(h)) return '';
            if (h instanceof $) return Belt._call(h, 'prop', 'outerHTML') || '';
            if (_.isString(h)) return _.template(h)(e);
            if (_.isFunction(h)) return h.call(h, e);
            if (h.render){
              if (Belt.get(Belt._call(h, 'start'), '_$settings.uuid') === Belt.get(Belt.call(e, 'start'), '_$settings.uuid'))
                return h.render();

              if (Belt.get(Belt._call(h, 'start'), '_$settings.uuid') !== Belt.get(h, '_$settings.uuid'))
                return h.render(true);

              return h.render();
            }
            if (_.isObject(h)) return B.el(h).render();
            if (h.toString) return h.toString();

            throw new Error('Element could not be rendered');
            return;
          }).join('') + (Belt.get(e, '_$settings.close') ? '</' + e.tag + '>' : '');
        }
      , '$': function(chain){
          if (chain) return e.start().$();

          var _$e = $(e.renderTag() + (Belt.get(e, '_$settings.close') ? '</' + e.tag + '>' : ''));

          _.each(e._$html, function(h){
            if (!h) return;
            if (h instanceof $) return _$e.append(h);
            if (_.isString(h)) return _$e.append(_.template(h)(e));
            if (_.isFunction(h)) return _$e.append(h.call(h, e));
            if (h.$){
              if (Belt.get(Belt._call(h, 'start'), '_$settings.uuid') === Belt.get(Belt._call(e, 'start'), '_$settings.uuid'))
                return _$e.append(h.$());

              if (Belt.get(Belt._call(h, 'start'), '_$settings.uuid') !== Belt.get(h, '_$settings.uuid'))
                return _$e.append(h.$(true));

              return _$e.append(h.$());
            }
            if (_.isObject(h)) return _$e.append(B.el(h).$());
            if (h.toString) return _$e.append(h.toString());

            throw new Error('Element could not be created');
            return;
          });

          return _$e;
        }
      , 'append': function(func){
          e._$html = e._$html.concat(Belt.toArray(!_.isFunction(func) ? func : func.apply(e, _.omit(arguments, '0'))));
          return e;
        }
      });

      _.each(B._$els, function(v, k){
        return e[k] = Belt.csh(e.el, {0: function(o){ return Belt.extend({'tag': k}, v, (_.isObject(o) ? o : {})); }
        , 1: function(o, h){ return !_.isObject(o) ? o : h; }
        });
      });

      return e;
    };

    B['_$els'] = {
      'a': {}
    , 'abbr': {}
    , 'address': {}
    , 'area': {'_$settings': {'close': false}}
    , 'article': {}
    , 'aside': {}
    , 'audio': {}
    , 'b': {}
    , 'base': {'_$settings': {'close': false}}
    , 'bdi': {}
    , 'bdo': {}
    , 'blockquote': {}
    , 'body': {}
    , 'br': {'_$settings': {'close': false}}
    , 'button': {}
    , 'canvas': {}
    , 'caption': {}
    , 'cite': {}
    , 'code': {}
    , 'col': {'_$settings': {'close': false}}
    , 'colgroup': {}
    , 'command': {'_$settings': {'close': false}}
    , 'datalist': {}
    , 'dd': {}
    , 'del': {}
    , 'details': {}
    , 'dfn': {}
    , 'dialog': {}
    , 'div': {}
    , 'dl': {}
    , 'dt': {}
    , 'em': {}
    , 'embed': {'_$settings': {'close': false}}
    , 'fieldset': {}
    , 'figcaption': {}
    , 'figure': {}
    , 'footer': {}
    , 'form': {}
    , 'h1': {}
    , 'h2': {}
    , 'h3': {}
    , 'h4': {}
    , 'h5': {}
    , 'h6': {}
    , 'head': {}
    , 'header': {}
    , 'hgroup': {}
    , 'hr': {'_$settings': {'close': false}}
    , 'html': {}
    , 'i': {}
    , 'iframe': {}
    , 'img': {'_$settings': {'close': false}}
    , 'input': {'_$settings': {'close': false}}
    , 'ins': {}
    , 'kbd': {}
    , 'keygen': {}
    , 'label': {}
    , 'legend': {}
    , 'li': {}
    , 'link': {'_$settings': {'close': false}}
    , 'main': {}
    , 'map': {}
    , 'mark': {}
    , 'menu': {}
    , 'menuitem': {}
    , 'meta': {'_$settings': {'close': false}}
    , 'meter': {}
    , 'nav': {}
    , 'noscript': {}
    , 'object': {}
    , 'ol': {}
    , 'optgroup': {}
    , 'option': {}
    , 'output': {}
    , 'p': {}
    , 'param': {'_$settings': {'close': false}}
    , 'pre': {}
    , 'progress': {}
    , 'q': {}
    , 'rp': {}
    , 'rt': {}
    , 'ruby': {}
    , 's': {}
    , 'samp': {}
    , 'script': {}
    , 'section': {}
    , 'select': {}
    , 'small': {}
    , 'source': {'_$settings': {'close': false}}
    , 'span': {}
    , 'strong': {}
    //, 'style': {}
    , 'sub': {}
    , 'summary': {}
    , 'sup': {}
    , 'table': {}
    , 'tbody': {}
    , 'td': {}
    , 'textarea': {}
    , 'tfoot': {}
    , 'th': {}
    , 'thead': {}
    , 'time': {}
    , 'title': {}
    , 'tr': {}
    , 'track': {}
    , 'u': {}
    , 'ul': {}
    , 'var': {}
    , 'video': {}
    , 'wbr': {}
    };

    _.each(B._$els, function(v, k){
      return B[k] = Belt.csh(B.el, { 0: function(o){ return Belt.extend({'tag': k}, v, (_.isObject(o) ? o : {})); }
                                   , 1: function(o, h){ return !_.isObject(o) ? o : h; }
                                   });
    });

    /////////////////////////////////////////////////////////////
    // Bootstrap Views                                         //
    /////////////////////////////////////////////////////////////

    B['view'] = function(options){
      var o = _.defaults(options || {}, {
        'views': {}
      , 'parents': {}
      , 'control': 'view'
      , 'subviews_path': ''
      , 'layout': []
      , 'events': {}
      , 'set': {
          'method': ['getEl', 'html']
        , 'selector': null
        , 'args': null
        , 'event': null
        , 'view': null
        , 'transformer': null
        , 'silent': false
        }
      , 'get': {
          'method': ['getEl', 'text']
        , 'selector': null
        , 'args': null
        , 'view': null
        , 'transformer': null
        }
      , 'change': {
          'silent': false
        }
      , 'replace': {
          'silent': false
        }
      , 'delete': {
          'silent': false
        }
      , 'tag': 'div'
      });

      var self = Backbone.View.extend(Belt.extend({
        'attributes': Belt.extend({
          'data-control': o.control
        , 'data-name': o.name
        }, o.attributes, o.attr)
      , 'tagName': o.tagName || o.tag
      , 'className': Belt.toArray(o.className || o.class).join(' ')
      , 'settings': Belt.extend({}, o, o.settings)
      , 'views': o.views
      , 'layout': o.layout
      , 'parents': o.parents
      , 'subPath': function(options){
          var _o = options || {};
          _o = _.defaults(_o, {
            'path': this.settings.subviews_path
          });

          if (!_o.path) return '';
          return _o.path + '.' + (Belt.call(this, _o.path + '.subPath') || '');
        }
      , 'getEl': function(options){
          var _o = _.defaults(options || {}, {
            //'path': this.subPath() + '$el'
            'suffix': '$el'
          });
          return Belt.get(this, this.subPath(_o) + _o.suffix);
        }
      , 'getViews': function(options){
          return Belt.get(this, this.subPath(options) + 'views');
        }
      , 'getLayout': function(options){
          return Belt.get(this, this.subPath(options) + 'layout');
        }
      , '_$render': function(options){
          var _o = options || {}
            , self = this;

          return _.each(Belt.toArray(_o.layout), function(v){
            if (_.isObject(v)) return self._$render({
              'parent': _o.views[_.keys(v)[0]]
            , 'layout': _.values(v)[0]
            , 'views': _o.views
            });

            if (!_o.parent._$settings){
              if (Belt.get(_o, 'views.' + v + '._$settings')) return _o.parent.$el.append(_o.views[v].render(true));
              _o.views[v].render({'silent': true});
              return _o.parent.$el.append(_o.views[v].$el);
            } else {
              if (_o.views[v]._$settings) return _o.parent.append(_o.views[v]);
              _o.views[v].render({'silent': true});
              return _o.parent.append(_o.views[v].$el);
            }
          });
        }
      , 'render': function(options){
          var _o = _.isObject(options) ? options || {} : {};
          _o = Belt.extend({}, o.render, _o);

          if (_o.preformer && !_o.preformer.apply(this, arguments)) return this;

          var s = this;

          s.$el.html('');

          s._$render({
            'parent': s
          , 'layout': s.getLayout({'path': ''})
          , 'views': s.getViews({'path': ''})
          });

          s.$el.append(s.settings.html || '');

          if (_o.transformer && !_o.transformer.apply(this, arguments)) return this;

          Belt.set(this, 'settings._$rendered', true);
          if (!_o.silent) this.trigger('render');
          return this;
        }
      , 'getView': function(path, options){
          if (Belt.isNull(path) || path === '') return this;

          var _o = options || {};
          _o = _.defaults(_o, {
            'offset': false
          , 'subpaths': {}
          });

          var vw = String(path).split('.')
            , cv = this;

          if (_o.offset) vw.splice(-1 * Math.abs(_o.offset), Math.abs(_o.offset));

          for (var __o = 0; __o < vw.length; __o++){
            var sp = Belt.get(_o, 'subpaths.' + vw[__o]);
            cv = Belt.get(cv, cv.subPath({'path': sp}) + 'views.' + vw[__o]);
            if (!cv) break;
          }

          return cv;
        }
      , 'getViewIndex': function(path, options){
          var _o = options || {}
            , ind = -1
            , cv = _o.name || String(path).split('.').pop()
            , pl = _o.layout || Belt.chain(this, ['getView', path, Belt.extend({}, _o, {'offset': 1})], 'getLayout');

          if (!pl) return ind;

          for (var i = 0; i < pl.length; i++){
            if (pl[i] !== cv) continue;
            ind = i;
            break;
          }
          return ind;
        }
      , 'getViewEl': function(path, options){
          if (Belt.isNull(path) || path === '') return;
          var _o = options || {}
            , cv = this.getViewIndex(path, _o);

          if (cv < 0) return;
          return this.getEl().find('> :nth-child(' + (cv + 1) + ')');
        }
      , 'setView': function(path, view, options){
          if (Belt.isNull(path) || path === '') return;

          var _o = options || {};
          _o = _.defaults(_o, {

          });

          var cv = String(path).split('.').pop();
          if (!cv) return;

          var pv = this.getView(path, Belt.extend({}, _o, {'offset': 1}));
          if (!pv) return;

          var rnd = Belt.get(this, 'settings._$rendered')
            , el;
          if (rnd) el = view._$settings ? view.$(true)
                      : (!Belt.get(view, 'settings._$rendered') ? Belt.chain(view, 'render', '$el') : view.$el);

          var ev = _o.skip_existing ? view : pv.getView(cv)
            , ind
            , pl = pv.getLayout(_o);

          if (!_o.skip_existing){
            pv.getViews()[cv] = view;
            Belt.set(view, 'parents.' + cv, this);
          }

          if (ev && !_o.skip_existing){
            ind = this.getViewIndex(path, {'name': cv, 'layout': pl});
            this.getEl().find('> :nth-child(' + (ind + 1) + ')').remove();
            pl.splice(ind, 1);
          } else {
            ind = pl.length;
          }

          if (!Belt.isNull(_o.index) && _o.index <= pl.length){
            ind = _o.index;
          }

          if (pl[ind]){ pl.splice(ind, 0, cv); } else { pl.push(cv); }

          if (rnd){
            if (ind === 0){
              this.getEl().prepend(el);
            } else {
              this.getEl().find('> :nth-child(' + ind + ')').after(el);
            }
          }

          if (!_o.silent){
            this.trigger('setView', {'path': path, 'view': view, 'oview': ev});
            this.trigger('change', {'event': 'setView', 'path': path, 'view': view, 'oview': ev});
          }

          return ev; //previous view if it existed
        }
      , 'deleteView': function(path, options){
          if (Belt.isNull(path) || path === '') return;

          var _o = options || {};
          _o = _.defaults(_o, {

          });

          var pv = _o.views || this.getView(path, Belt.extend({}, _o, {'offset': 1}));
          if (!pv) return;

          var cv = _o.name || String(path).split('.').pop();
          if (!cv) return;

          var pl = _o.layout || pv.getLayout(_o)
            , ind = _o.index || this.getViewIndex(path, {'name': cv, 'layout': pl})
            , ev = (pv.getViews() || {})[cv];

          if (!_o.do_not_delete) delete (pv.getViews() || {})[cv];
          if (ind >= 0){
            var rnd = Belt.get(this, 'settings._$rendered')
            if (rnd) this.getEl().find('> :nth-child(' + (ind + 1) + ')').remove();
            pl.splice(ind, 1);
          }

          if (!_o.silent){
            this.trigger('deleteView', {'path': path, 'view': ev});
            this.trigger('change', {'event': 'deleteView', 'path': path, 'view': ev});
          }

          return ev;
        }
      , 'moveView': function(path, index, options){
          var _o = options || {}
            , ov = this.deleteView(path, Belt.extend({'silent': true}, _o, {'do_not_delete': true}));
          if (ov) this.setView(path, ov, Belt.extend({'silent': true}, _o, {'skip_existing': true, 'index': index}));

          if (!_o.silent){
            this.trigger('moveView', {'path': path, 'index': index});
            this.trigger('change', {'event': 'moveView', 'path': path, 'index': index});
          }
          return ov;
        }
      , 'renameView': function(name, nname, options){
          var _o = options || {}
            , _v = this.getViews(_o)
            , lo = this.getLayout(_o);

          _v[nname] = _v[name];
          delete _v[name];
          _.each(lo, function(l, i){
            if (l !== name) return;
            return lo[i] = nname;
          });

          //if (Belt.get(_v, nname + '.setName')) _v[nname].setName(nname);

          return _v[nname];
        }
      , 'set': function(val, options){
          var _o = options || {

          };
          _o = Belt.extend({}, o.set, _o);

          if (_o.preformer && !_o.preformer.apply(this, arguments)) return this;

          var view = _o.view ? this.getView(_o.view, _o) : this
            , evt = _o.event || (_o.view ? 'set:' + _o.view : 'set')
            , oval, _val
            , _a = [];

          if (!view) return this;

          if (_o.view && !view._$settings){
            var __val = view.set(val, Belt.extend(_.omit(_o, ['view', 'preformer', 'transformer']), {'silent': true}));
            oval = Belt.get(__val, 'oval');
            _val = Belt.get(__val, 'val');

          } else {
            if (view._$settings) view = this.getViewEl(_o.view);

            oval = this.get(_o.get);
            _val = _o.transformer ? _o.transformer.call(this, val, _o) : val;

            if (Belt.deepEqual(oval, _val)) return;

            _a = _a.concat(Belt.toArray(_o.method));
            _a[_a.length - 1] = Belt.toArray(_.last(_a));
            if (_o.args) _a[_a.length - 1] = _.last(_a).concat(Belt.toArray(_o.args));
            _a.unshift(_o.selector ? (view._$settings ? view : view.getEl()).find(_o.selector) : view);
            _.last(_a).push(_val);

            Belt.chain.apply(Belt, _a);
          }

          if (!_o.silent){
            this.trigger(evt, {'oval': oval, 'val': _val});
            this.trigger('change', {'event': evt, 'val': _val, 'oval': oval});
          }

          return {'oval': oval, 'val': _val};
        }
      , 'get': function(options){
          var _o = _.defaults(options || {}, o.get);
          _o = _.defaults(_o);

          if (_o.preformer && !_o.preformer.apply(this, arguments)) return this;

          var view = _o.view ? this.getView(_o.view, _o) : this
            , _val
            , _a = [];

          if (_o.view && view && !view._$settings){
            _val = view.get(Belt.extend(_.omit(_o, ['view']), {'silent': true}));

          } else {
            if (view && view._$settings) view = this.getViewEl(_o.view);

            _a = _a.concat(Belt.toArray(_o.method));
            _a[_a.length - 1] = Belt.toArray(_.last(_a));
            if (_o.args) _a[_a.length - 1] = _.last(_a).concat(Belt.toArray(_o.args));
            _a.unshift(_o.selector ? (view._$settings ? view : view.getEl()).find(_o.selector) : view);

            _val = Belt.chain.apply(Belt, _a);
          }

          _val = _o.transformer ? _o.transformer.call(this, _val, _o) : _val;
          return _val;
        }
      , 'change': function(options){
          var _o = options || {};
          _o = Belt.extend({}, o.change, _o);

          var _val = this.get(_o)
            //, _set = this.set(_val, {'silent': true})
            , evt = _o.event || (_o.view ? 'changed:' + _o.view : 'changed')
            , oval = _o.oval || _o.old_value;

          if (!_o.silent){
            this.trigger(evt, {'oval': oval, 'val': _val})
            this.trigger('change', {'event': evt, 'val': _val, 'oval': oval});
          }

          return {'oval': oval, 'val': _val};
        }
      , 'delete': function(options){
          var _o = options || {};
          _o = Belt.extend({}, o.delete, _o);

          if (_o.transformer && !_o.transformer.call(this, _o)) return this;

          _.each(this.parents || {}, function(v, k){
            if (!v || !v.deleteView) return;
            return v.deleteView(k, _o);
          });

          var evt = _o.event || 'delete';

          this.$el.remove();

          if (!_o.silent){
            this.trigger(evt);
            this.trigger('change', {'event': evt});
          }

          return this;
        }
      , 'replace': function(view, options){
          var _o = options || {

          };
          _o = Belt.extend({}, o.replace, _o);

          if (_o.transformer && !_o.transformer.call(this, _o)) return this;

          var self = this
            , evt = _o.event || 'replace';

          _.each(this.parents || {}, function(v, k){
            if (!v || !v.setView) return;
            return v.setView(k, view);
          });

          if (_.any(this.parents)){
            this.$el.remove();
          } else {
            var el;
            if (Belt.get(this, 'settings._$rendered')) el = view._$settings ? view.$(true) : view.render().$el;
            el ? this.$el.replaceWith(el) : this.$el.remove();
          }

          if (!_o.silent){
            this.trigger(evt, {'view': view});
            this.trigger('change', {'event': evt, 'view': view});
          }

          return this;
        }
      , 'events': o.events
      , 'getObj': function(options){
          var _o = options || {}
            , obj = {}
            , vws = this.getViews()
            , keys = _o.keys || _.keys(vws);

          _.each(keys, function(v){
            if (!Belt.get(vws, v + '.get')) return;
            //get visible option
            var ops = _o[v] || {};
            return obj[v] = Belt.call(vws, [v, (ops.$meth || 'get')].join('.'), ops.$opts || {});
          });

          obj = _o.transformer ? _o.transformer.call(this, obj, _o) : obj;
          return obj;
        }
      , 'setObj': function(obj, options){
          var _o = options || {}
            , vws = this.getViews()
            , self = this
            , oobj = this.getObj(_o.get || {})
            , evt = _o.event || 'set:all';
          obj = obj || {};

          if (!_o.do_not_delete){
            var dopts = _o.delete || {};
            _.each(vws, function(v, k){
              if (!Belt.isNull(obj[k])) return;
              //set visible option
              return self.deleteView(k, dopts[k] || {});
            });
          }

          _.each(obj, function(v, k){
            var ops = Belt.extend({}, Belt.get(self, 'settings.child') || {}, Belt.get(self, 'settings.subschemas.' + k) || {}
                      , _o.child || {}, _o[k] || {});

            if (!Belt.get(vws, k)){
              var _v = B[ops.$control || 'mutableControl'](Belt.extend({'value': v, 'name': k}, ops || {}, ops.$opts || {}));
              return Belt.call(self, [(ops.$meth || 'setView')].join('.'), k, _v);
            }

            if (!Belt.get(vws, k + '.set')) return;
            return Belt.call(vws, [k, (ops.$meth || 'set')].join('.'), v, ops.$opts || {});
          });

          obj = _o.transformer ? _o.transformer.call(this, obj, _o) : obj;

          if (!_o.silent){
            this.trigger(evt, {'oval': oobj, 'val': obj});
            this.trigger('change', {'event': evt, 'oval': oobj, 'val': obj});
          }

          return {'oval': oobj, 'val': obj};
        }
      , 'getPath': function(path, options){
          var p = this.getView(path, options);
          if (!p || !p.get) return;
          return p.get(options);
        }
      , 'setPath': function(path, val, options){
          var _v = this
            , oval = this.getPath(path)
            , _ov, _op
            , _o = options || {}
            , self = this
            , ps = (path || '').split('.');

          while (_v && _.any(ps)){
            _ov = _v;
            _v = _v.getView(ps[0]);
            _op = ps.shift();
          }

          /*if (path === '') _o.opts = Belt.extend({}, _.pick(Belt.get(self, 'settings') || {}
          , ['schema', 'subschemas', 'child', 'addable', 'removable']), _o.opts || {});*/

          if (!_v){
            var obj = Belt.set(Belt.isInt(_op) ? [] : {}, ps.join('.'), val)
              , _vw = B[_o.$control || 'mutableControl'](Belt.extend({'value': obj, 'name': _op}, _o.opts || {}));

            _ov.setView(_op, _vw);
          } else {
            _v.set(val, _o);
          }

          _o.event = _o.event || 'set:' + path;

          if (!_o.silent){
            this.trigger(_o.event, {'val': val, 'oval': oval});
            this.trigger('change', {'event': _o.event, 'path': path, 'val': val, 'oval': oval});
          }

          return this;
        }
      , 'deletePath': function(path, options){
          var _o = options || {}
            , v = this.getView(path, _o)
          if (!v) return;
          v.delete(_o);

          _o.event = _o.event || 'deletePath'; // + path;

          if (!_o.silent){
            this.trigger(_o.event, {'path': path});
            this.trigger('change', {'event': _o.event, 'path': path});
          }

          return v;
        }
      , 'setName': function(val){
          var self = this
            , on = Belt.get(this, 'settings.name');

          Belt.set(this, 'settings.name', val);
          this.getEl().attr('data-name', val);
          this.getEl().data('name', val);

          _.each(this.parents, function(v, k){
            if (k !== on || !v || !v.renameView) return;
            v.renameView(on, val);
          });
          this.parents[val] = this.parents[on];
          delete this.parents[on];

          if (true){
            this.trigger('setName', {'name': val, 'oname': on});
            this.trigger('change', {'event': 'setName', 'name': val, 'oname': on});
          }

          return {'name': val, 'oname': on};
        }
      , 'getControl': function(){ return this; }
      }, o.initialize ? {'initialize': o.initialize} : {}, o.view));

      self = new self;

      self.on('change', function(val){
        return _.each(self.parents, function(v, k){
          if (!v || !v.trigger) return;
          return v.trigger('change', Belt.extend({'view': k}, val));
        });
      });

      self.on('delete', function(val){
        return _.each(self.parents, function(v, k){
          if (!v || !v.trigger) return;
          return v.trigger('deleteView', Belt.extend({'view': k}, val));
        });
      });

      self.on('deletePath', function(val){
        return _.each(self.parents, function(v, k){
          if (!v || !v.trigger) return;
          return v.trigger('deletePath', Belt.extend({'view': k}, val));
        });
      });

      _.each(self.views, function(v, k){
        v.parents = v.parents || {};
        return v.parents[k] = self;
      });

      return self;
    };

    B['textControl'] = function(options){
      var o = _.defaults(options || {}, {
        'name': ''
      , 'control': 'text'
      , 'type': 'text'
      , 'value': null
      , 'placeholder': null
      , 'required': null
      , 'disabled': null
      , 'readonly': null
      , 'min': null
      , 'max': null
      , 'step': null
      , 'removable': true
      , 'layout': ['label', 'input', 'buttons', 'status']
      , 'set': {
          'selector': 'input'
        , 'method': 'val'
        , 'transformer': function(v){ return !v ? '' : (_.isObject(v) ? Belt.stringify(v) : Belt.call(v, 'toString')); }
        }
      , 'get': {
          'selector': 'input'
        , 'method': 'val'
        , 'transformer': function(v){ return !v ? '' : (_.isObject(v) ? Belt.stringify(v) : Belt.call(v, 'toString')); }
        }
      , 'change': {
        }
      , 'tag': 'div'
      , 'class': 'form-group'
      });

      o = _.defaults(o, {
        'views': Belt.extend({
          'buttons': B.div({'class': 'col-xs-1'})
                      .div({'class': 'row'})
                      .div({'class': 'col-xs-12'}).append(function(){
                        return o.removable ? B.button({'class': ['btn', 'btn-danger', 'remove']}, 'Delete') : '';
                      })
        , 'label': B.label({'class': ['control-label', 'col-xs-1'], 'attr': {'for': o.name}}, String(o.name))
        , 'input': B.div({'class': 'col-xs-10'}, [
                     B.input({
                       'class': ['form-control']
                     , 'attr': _.pick(o, ['type', 'name', 'value', 'placeholder'
                                         , 'regex', 'required', 'disabled', 'readonly'
                                         , 'min', 'max', 'step'])
                     })
                   //, B.viewsArray({'class': ['status']}).$el
                   ])
        , 'status': B.viewsArray({
                      'class': ['status', 'col-xs-11 col-xs-offset-1']
                    , 'child': {
                        'tag': 'span'
                      , 'class': ['help-block']
                      }
                    })
        }, o.views || {})
      , 'view': {
          'setName': function(val){
            var self = this
              , on = Belt.get(this, 'settings.name');

            Belt.set(this, 'settings.name', val);
            this.getEl().find('> label').html(val);
            this.getEl().find('> label').attr('for', val);
            this.getEl().find('> div > input').attr('name', val);
            this.getEl().attr('data-name', val);
            this.getEl().data('name', val);

            _.each(this.parents, function(v, k){
              if (k !== on || !v || !v.renameView) return;
              v.renameView(on, val);
            });
            this.parents[val] = this.parents[on];
            delete this.parents[on];

            if (true){
              this.trigger('setName', {'name': val, 'oname': on});
              this.trigger('change', {'event': 'setName', 'name': val, 'oname': on});
            }

            return {'name': val, 'oname': on};
          }
        , 'setState': function(state){
            var states = ['success', 'warning', 'error'];
            if (state && !Belt.find(states, state)) return;
            var on = Belt.call(this, 'getState')
              , rclass = _.chain(states).difference([state])
                          .map(function(s){ return 'has-' + s; })
                          .value().join(' ');

            this.getEl().removeClass(rclass);
            if (state) this.getEl().addClass('has-' + state);

            this.trigger('setState', {'state': state, 'ostate': on});
            return {'state': state, 'ostate': on};
          }
        , 'getState': function(){
            var el = this.getEl()
              , states = ['success', 'warning', 'error']
              , state = _.find(states, function(s){ return el.hasClass('has-' + s); });

            return state;
          }
        , 'setStatus': function(err, options){
            var _o = options || {}
              , _e = Belt.toArray(err || [])
              , rt = {'ostatus': this.getStatus()};

            _o = _.defaults(_o, {
              'state': _.any(_e) ? 'error' : undefined
            , 'reset': 'true'
            });

            this.setState(_o.state);
            var stat = this.getView('status');
            if (_o.reset) _.each(stat.getViews(), function(v){
              return stat.pop();
            });

            _.each(_e, function(r){
              return stat.push(r);
            });

            rt.status = {'state': _o.state, 'status': _o.reset ? _e : rt.ostatus.status.concat(_e)};

            this.trigger('setStatus', rt);
            return rt;
          }
        , 'getStatus': function(){
            var stat = {
              'state': this.getState()
            , 'status': this.getView('status').get()
            }
            return stat;
          }
        , 'override_methods': ['setState', 'getState', 'setStatus', 'getStatus']
        }
      });

      o = _.defaults(o, {
        'events': {
          'change input': function(e){
            var c = this.change();
            /*  , el = Belt.get(e, 'target');

            if (!el) return;

            var $el = $(el)
              , val = $el.val();

            if (!Belt.equal(String(c.val), String(val))){
              $el.val(c.val);
              this.setStatus('Invalid value');
            } else {
              this.setStatus();
            }*/
            return;
          }
        , 'click button.remove': function(){ return this.delete(); }
        }
      });

      var self = B.view(o);

      return self;
    };

    B['numberControl'] = function(options){
      var o = _.defaults(options || {}, {
        'type': 'number'
      , 'control': 'number'
      , 'set': {
          'selector': 'input'
        , 'method': 'val'
        , 'transformer': function(v){ return !v && !_.isNumber(v) ? '' : Number(v).toString(); }
        //, 'transformer': function(v){ return !_.isNumber(v) || _.isNaN(v) ? '' : Number(v).toString(); }
        }
      , 'get': {
          'selector': 'input'
        , 'method': 'val'
        , 'transformer': function(v){ return !v && !_.isNumber(v) ? undefined : Number(v); }
        //, 'transformer': function(v){ return !_.isNumber(v) || _.isNaN(v) ? '' : Number(v).toString(); }
        }
      , 'change': {
        }
      , 'tag': 'div'
      , 'class': 'form-group'
      });

      if (o.value) o.value = Number(o.value);

      return B.textControl(o);
    };

    B['datetimeControl'] = function(options){
      var o = _.defaults(options || {}, {
        'type': 'datetime-local'
      , 'control': 'datetime-local'
      , 'set': {
          'selector': 'input'
        , 'method': 'val'
        , 'transformer': function(v){ return !v ? '' : moment(v).format('YYYY-MM-DDTHH:mm'); }
        }
      , 'get': {
          'selector': 'input'
        , 'method': 'val'
        , 'transformer': function(v){ return !v ? undefined : moment(v, 'YYYY-MM-DDTHH:mm').toDate(); }
        }
      , 'change': {
        }
      , 'tag': 'div'
      , 'class': 'form-group'
      });

      if (o.value) o.value = moment(o.value).format('YYYY-MM-DDTHH:mm');

      return B.textControl(o);
    };

    B['textareaControl'] = function(options){
      var o = _.defaults(options || {}, {
        'control': 'textarea'
      , 'name': ''
      , 'value': null
      , 'placeholder': null
      , 'required': null
      , 'disabled': null
      , 'readonly': null
      , 'removable': true
      , 'rows': 10
      , 'layout': ['label', 'textarea', 'buttons', 'status']
      , 'set': {
          'selector': 'textarea'
        , 'method': 'val'
        , 'transformer': function(v){ return !v ? '' : (_.isObject(v) ? Belt.stringify(v) : Belt.call(v, 'toString')); }
        }
      , 'get': {
          'selector': 'textarea'
        , 'method': 'val'
        , 'transformer': function(v){ return !v ? '' : (_.isObject(v) ? Belt.stringify(v) : Belt.call(v, 'toString')); }
        }
      , 'change': {
        }
      , 'tag': 'div'
      , 'class': 'form-group'
      });

      o = _.defaults(o, {
        'views': Belt.extend({
          'buttons': B.div({'class': 'col-xs-1'})
                      .div({'class': 'row'})
                      .div({'class': 'col-xs-12'}).append(function(){
                        return o.removable ? B.button({'class': ['btn', 'btn-danger', 'remove']}, 'Delete') : '';
                      })
        , 'label': B.label({'class': ['control-label', 'col-xs-1'], 'attr': {'for': o.name}}, String(o.name))
        , 'textarea': B.div({'class': 'col-xs-10'})
                    .textarea({
                      'class': ['form-control']
                    , 'attr': _.pick(o, ['name', 'value', 'placeholder', 'required', 'disabled', 'readonly', 'rows', 'cols'])
                    }, o.value || '')
        , 'status': B.viewsArray({
                      'class': ['status', 'col-xs-11 col-xs-offset-1']
                    , 'child': {
                        'tag': 'span'
                      , 'class': ['help-block']
                      }
                    })
        }, o.views || {})
      , 'view': {
          'setName': function(val){
            var self = this
              , on = Belt.get(this, 'settings.name');

            Belt.set(this, 'settings.name', val);
            this.getEl().find('> label').html(val);
            this.getEl().find('> label').attr('for', val);
            this.getEl().find('> div > textarea').attr('name', val);
            this.getEl().attr('data-name', val);
            this.getEl().data('name', val);

            _.each(this.parents, function(v, k){
              if (k !== on || !v || !v.renameView) return;
              v.renameView(on, val);
            });
            this.parents[val] = this.parents[on];
            delete this.parents[on];

            if (true){
              this.trigger('setName', {'name': val, 'oname': on});
              this.trigger('change', {'event': 'setName', 'name': val, 'oname': on});
            }

            return {'name': val, 'oname': on};
          }
        , 'setState': function(state){
            var states = ['success', 'warning', 'error'];
            if (state && !Belt.find(states, state)) return;
            var on = Belt.call(this, 'getState')
              , rclass = _.chain(states).difference([state])
                          .map(function(s){ return 'has-' + s; })
                          .value().join(' ');

            this.getEl().removeClass(rclass);
            if (state) this.getEl().addClass('has-' + state);

            this.trigger('setState', {'state': state, 'ostate': on});
            return {'state': state, 'ostate': on};
          }
        , 'getState': function(){
            var el = this.getEl()
              , states = ['success', 'warning', 'error']
              , state = _.find(states, function(s){ return el.hasClass('has-' + s); });

            return state;
          }
        , 'setStatus': function(err, options){
            var _o = options || {}
              , _e = Belt.toArray(err || [])
              , rt = {'ostatus': this.getStatus()};

            _o = _.defaults(_o, {
              'state': _.any(_e) ? 'error' : undefined
            , 'reset': 'true'
            });

            this.setState(_o.state);
            var stat = this.getView('status');
            if (_o.reset) _.each(stat.getViews(), function(v){
              return stat.pop();
            });

            _.each(_e, function(r){
              return stat.push(r);
            });

            rt.status = {'state': _o.state, 'status': _o.reset ? _e : rt.ostatus.status.concat(_e)};

            this.trigger('setStatus', rt);
            return rt;
          }
        , 'getStatus': function(){
            var stat = {
              'state': this.getState()
            , 'status': this.getView('status').get()
            }
            return stat;
          }
        , 'override_methods': ['setState', 'getState', 'setStatus', 'getStatus']
        }
      });

      o = _.defaults(o, {
        'events': {
          'change textarea': function(){ return this.change(); }
        , 'click button.remove': function(){ return this.delete(); }
        }
      });

      var self = B.view(o);

      return self;
    };

    B['checkboxControl'] = function(options){
      var o = _.defaults(options || {}, {
        'control': 'checkbox'
      , 'name': ''
      , 'type': 'checkbox'
      , 'value': null
      , 'required': null
      , 'disabled': null
      , 'readonly': null
      , 'removable': true
      , 'layout': ['input', 'buttons', 'status']
      , 'set': {
          'method': 'check'
        , 'transformer': function(v){ return !v ? false : true; }
        }
      , 'get': {
          'method': 'check'
        , 'transformer': function(v){ return !v ? false : true; }
        }
      , 'change': {
        }
      , 'tag': 'div'
      , 'class': 'form-group'
      , 'view': {
          'check': function(chk){
            if (_.isUndefined(chk) || _.isNull(chk)) return this.$('input').prop('checked');
            this.$('input').prop('checked', chk ? true : false);
            return chk ? true : false;
          }
        , 'setName': function(val){
            var self = this
              , on = Belt.get(this, 'settings.name');

            Belt.set(this, 'settings.name', val);
            this.getEl().find('> div > label > span').html(val);
            //this.getEl().find('> label').attr('for', val);
            this.getEl().find('> div > label > input').attr('name', val);
            this.getEl().attr('data-name', val);
            this.getEl().data('name', val);

            _.each(this.parents, function(v, k){
              if (k !== on || !v || !v.renameView) return;
              v.renameView(on, val);
            });
            this.parents[val] = this.parents[on];
            delete this.parents[on];

            if (true){
              this.trigger('setName', {'name': val, 'oname': on});
              this.trigger('change', {'event': 'setName', 'name': val, 'oname': on});
            }

            return {'name': val, 'oname': on};
          }
        , 'setState': function(state){
            var states = ['success', 'warning', 'error'];
            if (state && !Belt.find(states, state)) return;
            var on = Belt.call(this, 'getState')
              , rclass = _.chain(states).difference([state])
                          .map(function(s){ return 'has-' + s; })
                          .value().join(' ');

            this.getEl().removeClass(rclass);
            if (state) this.getEl().addClass('has-' + state);

            this.trigger('setState', {'state': state, 'ostate': on});
            return {'state': state, 'ostate': on};
          }
        , 'getState': function(){
            var el = this.getEl()
              , states = ['success', 'warning', 'error']
              , state = _.find(states, function(s){ return el.hasClass('has-' + s); });

            return state;
          }
        , 'setStatus': function(err, options){
            var _o = options || {}
              , _e = Belt.toArray(err || [])
              , rt = {'ostatus': this.getStatus()};

            _o = _.defaults(_o, {
              'state': _.any(_e) ? 'error' : undefined
            , 'reset': 'true'
            });

            this.setState(_o.state);
            var stat = this.getView('status');
            if (_o.reset) _.each(stat.getViews(), function(v){
              return stat.pop();
            });

            _.each(_e, function(r){
              return stat.push(r);
            });

            rt.status = {'state': _o.state, 'status': _o.reset ? _e : rt.ostatus.status.concat(_e)};

            this.trigger('setStatus', rt);
            return rt;
          }
        , 'getStatus': function(){
            var stat = {
              'state': this.getState()
            , 'status': this.getView('status').get()
            }
            return stat;
          }
        , 'override_methods': ['setState', 'getState', 'setStatus', 'getStatus']
        }
      });

      o = _.defaults(o, {
        'checked': o.value ? 'checked' : null
      });

      o.disabled = o.disabled || o.readonly;

      o = _.defaults(o, {
        'views': Belt.extend({
          'buttons': B.div({'class': 'col-xs-1'})
                      .div({'class': 'row'})
                      .div({'class': 'col-xs-12'}).append(function(){
                        return o.removable ? B.button({'class': ['btn', 'btn-danger', 'remove']}, 'Delete') : '';
                      })
        , 'input': B.div({'class': ['checkbox', 'col-xs-10 col-xs-offset-1']})
                    .label({}, [
                      B.input({
                        'attr': _.pick(o, ['type', 'name', 'value', 'checked', 'required', 'disabled', 'readonly'])
                      })
                    , ' '
                    , B.span({}, String(o.name))
                    ])
        , 'status': B.viewsArray({
                      'class': ['status', 'col-xs-11 col-xs-offset-1']
                    , 'child': {
                        'tag': 'span'
                      , 'class': ['help-block']
                      }
                    })
        }, o.views || {})
      });

      o = _.defaults(o, {
        'events': {
          'change input': function(){ return this.change(); }
        , 'click button.remove': function(){ return this.delete(); }
        }
      });

      var self = B.view(o);

      return self;
    };

    B['radioControl'] = function(options){
      var o = _.defaults(options || {}, {
        'name': ''
      , 'control': 'radio'
      , 'type': 'radio'
      , 'values': []
      , 'required': null
      , 'disabled': null
      , 'readonly': null
      , 'removable': true
      , 'layout': ['label', 'input', 'buttons', 'status']
      , 'set': {
          'method': 'setChecked'
        }
      , 'get': {
          'method': 'isChecked'
        , 'args': [undefined]
        }
      , 'change': {
        }
      , 'tag': 'div'
      , 'class': 'form-group'
      , 'view': {
          'isChecked': function(){
            return this.$('input:checked').prop('value');
          }
        , 'setChecked': function(_chk){
            var chk = _chk.toString();

            this.$('input:checked').prop('checked', false);
            if ($('input[value="' + chk + '"]').length === 0) return;

            this.$('input[value="' + chk + '"]').prop('checked', true);

            return chk;
          }
        , 'setName': function(val){
            var self = this
              , on = Belt.get(this, 'settings.name');

            Belt.set(this, 'settings.name', val);
            this.getEl().find('> label').html(val);
            this.getEl().find('> label').attr('for', val);
            this.getEl().attr('data-name', val);
            this.getEl().data('name', val);

            _.each(this.parents, function(v, k){
              if (k !== on) return;
              v.renameView(on, val);
            });
            this.parents[val] = this.parents[on];
            delete this.parents[on];

            if (true){
              this.trigger('setName', {'name': val, 'oname': on});
              this.trigger('change', {'event': 'setName', 'name': val, 'oname': on});
            }

            return {'name': val, 'oname': on};
          }
        , 'setState': function(state){
            var states = ['success', 'warning', 'error'];
            if (state && !Belt.find(states, state)) return;
            var on = Belt.call(this, 'getState')
              , rclass = _.chain(states).difference([state])
                          .map(function(s){ return 'has-' + s; })
                          .value().join(' ');

            this.getEl().removeClass(rclass);
            if (state) this.getEl().addClass('has-' + state);

            this.trigger('setState', {'state': state, 'ostate': on});
            return {'state': state, 'ostate': on};
          }
        , 'getState': function(){
            var el = this.getEl()
              , states = ['success', 'warning', 'error']
              , state = _.find(states, function(s){ return el.hasClass('has-' + s); });

            return state;
          }
        , 'setStatus': function(err, options){
            var _o = options || {}
              , _e = Belt.toArray(err || [])
              , rt = {'ostatus': this.getStatus()};

            _o = _.defaults(_o, {
              'state': _.any(_e) ? 'error' : undefined
            , 'reset': 'true'
            });

            this.setState(_o.state);
            var stat = this.getView('status');
            if (_o.reset) _.each(stat.getViews(), function(v){
              return stat.pop();
            });

            _.each(_e, function(r){
              return stat.push(r);
            });

            rt.status = {'state': _o.state, 'status': _o.reset ? _e : rt.ostatus.status.concat(_e)};

            this.trigger('setStatus', rt);
            return rt;
          }
        , 'getStatus': function(){
            var stat = {
              'state': this.getState()
            , 'status': this.getView('status').get()
            }
            return stat;
          }
        , 'override_methods': ['setState', 'getState', 'setStatus', 'getStatus']
        }
      });

      o = _.defaults(o, {
        'views': Belt.extend({
          'buttons': B.div({'class': 'col-xs-1'})
                      .div({'class': 'row'})
                      .div({'class': 'col-xs-12'}).append(function(){
                        return o.removable ? B.button({'class': ['btn', 'btn-danger', 'remove']}, 'Delete') : '';
                      })
        , 'label': B.label({'class': ['control-label', 'col-xs-1'], 'attr': {'for': o.name}}, String(o.name))
        , 'input': B.div({'class': ['radio', 'col-xs-10']}, _.map(o.values, function(v){
                    return B.label({'class': 'radio-inline'}, [
                      B.input({
                        'attr': Belt.extend({}, _.pick(o, ['type', 'required', 'disabled', 'readonly'])
                        , (_.isObject(v) ? _.omit(v, ['label']) : {'value': v}), {'name': o.name
                          , 'checked': (!_.isUndefined(o.value) && ((_.isObject(v) && v.value === o.value) || (v === o.value)) ? 'checked'
                                       : null)
                        })
                      })
                    , ' '
                    , B.span({}, _.isObject(v) ? v.label : v)
                    ]);
                  }))
        , 'status': B.viewsArray({
                      'class': ['status', 'col-xs-11 col-xs-offset-1']
                    , 'child': {
                        'tag': 'span'
                      , 'class': ['help-block']
                      }
                    })
        }, o.views || {})
      });

      o = _.defaults(o, {
        'events': {
          'change input': function(){ return this.change(); }
        , 'click button.remove': function(){ return this.delete(); }
        }
      });

      var self = B.view(o);

      return self;
    };

    B['selectControl'] = function(options){
      var o = _.defaults(options || {}, {
        'control': 'select'
      , 'name': ''
      , 'value': null
      , 'values': []
      , 'placeholder': null
      , 'required': null
      , 'disabled': null
      , 'readonly': null
      , 'removable': true
      , 'multiple': null
      , 'layout': ['label', 'select', 'buttons', 'status']
      , 'render': {
          'transformer': function(){
            return this.$('select').multiselect(_.pick(o, ['multiple']));
          }
        }
      , 'set': {
          'method': 'select'
        , 'transformer': function(v){ return !v ? 'none selected' : v; }
        }
      , 'get': {
          'method': 'select'
        , 'transformer': function(v){ return !v || v === 'none selected' ? undefined : v; }
        }
      , 'change': {
        }
      , 'tag': 'div'
      , 'class': 'form-group'
      });

      if (!o.multiple && !Belt.find(o.values, 'none selected')) o.values.unshift('none selected');

      o = _.defaults(o, {
        'views': Belt.extend({
          'buttons': B.div({'class': 'col-xs-1'})
                      .div({'class': 'row'})
                      .div({'class': 'col-xs-12'}).append(function(){
                        return o.removable ? B.button({'class': ['btn', 'btn-danger', 'remove']}, 'Delete') : '';
                      })
        , 'label': B.label({'class': ['control-label', 'col-xs-1'], 'attr': {'for': o.name}}, String(o.name))
        , 'select': B.div({'class': 'col-xs-10'})
                     .select({
                       'class': ['form-control']
                     , 'attr': _.pick(o, ['type', 'name', 'placeholder', 'multiple', 'required', 'disabled', 'readonly'])
                     }, _.map(o.values, function(v){
                       var attr = Belt.extend({}, _.isObject(v) ? v : {'value': v, 'label': v});

                       attr.selected = !_.isUndefined(o.value) && Belt.find(Belt.toArray(o.value), attr.value) ? 'selected' : null;
                       return B.option({'attr': _.pick(attr, ['value', 'selected'])}, attr.label);
                     }))
        , 'status': B.viewsArray({
                      'class': ['status', 'col-xs-11 col-xs-offset-1']
                    , 'child': {
                        'tag': 'span'
                      , 'class': ['help-block']
                      }
                    })
        }, o.views || {})
      , 'view': {
          'select': function(sel){
            var self = this;
            if (_.isUndefined(sel) || _.isNull(sel)) return !o.multiple ? this.$('option:selected').val()
                                                            : _.map(this.$('option:selected'), function(v){ return $(v).val(); });
            this.$('select').multiselect('deselect', _.map(this.$('option:selected'), function(v){ return $(v).val(); }));
            this.$('option:selected').prop('selected', false);
            if (!_.every(Belt.toArray(sel), function(s){ return self.$('option[value="' + s + '"]'); }))
              return o.multiple ? undefined : this.$('select').multiselect('select', 'none selected');;

            this.$('select').multiselect('select', Belt.toArray(sel));

            return sel;
          }
        , 'setName': function(val){
            var self = this
              , on = Belt.get(this, 'settings.name');

            Belt.set(this, 'settings.name', val);
            this.getEl().find('> label').html(val);
            this.getEl().find('> label').attr('for', val);
            this.getEl().find('select').attr('name', val);
            this.getEl().attr('data-name', val);
            this.getEl().data('name', val);

            _.each(this.parents, function(v, k){
              if (k !== on || !v || !v.renameView) return;
              v.renameView(on, val);
            });
            this.parents[val] = this.parents[on];
            delete this.parents[on];

            if (true){
              this.trigger('setName', {'name': val, 'oname': on});
              this.trigger('change', {'event': 'setName', 'name': val, 'oname': on});
            }

            return {'name': val, 'oname': on};
          }
        , 'setState': function(state){
            var states = ['success', 'warning', 'error'];
            if (state && !Belt.find(states, state)) return;
            var on = Belt.call(this, 'getState')
              , rclass = _.chain(states).difference([state])
                          .map(function(s){ return 'has-' + s; })
                          .value().join(' ');

            this.getEl().removeClass(rclass);
            if (state) this.getEl().addClass('has-' + state);

            this.trigger('setState', {'state': state, 'ostate': on});
            return {'state': state, 'ostate': on};
          }
        , 'getState': function(){
            var el = this.getEl()
              , states = ['success', 'warning', 'error']
              , state = _.find(states, function(s){ return el.hasClass('has-' + s); });

            return state;
          }
        , 'setStatus': function(err, options){
            var _o = options || {}
              , _e = Belt.toArray(err || [])
              , rt = {'ostatus': this.getStatus()};

            _o = _.defaults(_o, {
              'state': _.any(_e) ? 'error' : undefined
            , 'reset': 'true'
            });

            this.setState(_o.state);
            var stat = this.getView('status');
            if (_o.reset) _.each(stat.getViews(), function(v){
              return stat.pop();
            });

            _.each(_e, function(r){
              return stat.push(r);
            });

            rt.status = {'state': _o.state, 'status': _o.reset ? _e : rt.ostatus.status.concat(_e)};

            this.trigger('setStatus', rt);
            return rt;
          }
        , 'getStatus': function(){
            var stat = {
              'state': this.getState()
            , 'status': this.getView('status').get()
            }
            return stat;
          }
        , 'override_methods': ['setState', 'getState', 'setStatus', 'getStatus']
        }
      });

      o = Belt.extend({
        'events': {
          'change select': function(){ return this.change(); }
        , 'click button.remove': function(){ return this.delete(); }
        }
      }, o);

      var self = B.view(o);

      return self;
    };

    B['mutableControl'] = function(options){
      var o = _.defaults(options || {}, {
        'settings': {}
      , 'control': 'mutable'
      , 'value': null
      , 'tag': 'div'
      , 'layout': ['control']
      , 'subviews_path': 'views.control'
      });

      o.settings = _.defaults(Belt.extend({}, o
        /*_.pick(o, ['default_control', 'control_type', 'types', 'control_settings', 'schema', 'child'])*/
      , o.settings), {
        'default_control': 'textControl'
      , 'control_type': null
      , 'types': {
          'textControl': function(val, options){
            var _o = options || {};
            return _.isString(val) && val.length < 50 && !_o.$control === 'textareaControl';
          }
        , 'textareaControl': function(val, options){
            var _o = options || {};
            return (_.isString(val) && val.length > 50) || _o.$control === 'textareaControl';
          }
        , 'datetimeControl': function(val, options){
            var _o = options || {};
            return _.isDate(val);
          }
        , 'checkboxControl': function(val, options){
            var _o = options || {};
            return _.isBoolean(val);
          }
        , 'numberControl': function(val, options){
            var _o = options || {};
            return _.isNumber(val);
          }
        , 'objectControl': function(val, options){
            var _o = options || {};
            return _.isObject(val) && !_.isArray(val);
          }
        , 'arrayControl': function(val, options){
            var _o = options || {};
            return _.isArray(val);
          }
        }
      });

      o = _.defaults(o, {
        'view': {
          'getControl': function(){ return this.getView('control', {'subpaths': {'control': ''}}); }
        , 'setControl': function(val, options){
            var _o = options || {}
              , self = this;

            _o = Belt.extend({'value': val}
                            , _.pick(self.settings, ['name', 'removable', 'addable', 'default_control', 'types', 'control_type', '$control'])
                            , self.settings.control_settings || {}, self.control_settings || {}, _o);

            _o.value = !Belt.isEmpty(Belt.get(self, 'settings.schema')) ? Belt.objSchema(Belt.copy(_o.value), self.settings.schema)
                                                                        : _o.value;
            if (!_o.$control && _o.schema && _o.schema['']){
              if (_o.schema[''].match(/^(object|mixed)$/)){
                _o.$control = 'objectControl';
              } else if (_o.schema[''] === 'array'){
                _o.$control = 'arrayControl';
              } else if (_o.schema[''] === 'number'){
                _o.$control = 'numberControl';
              }
            }

            var _control = _o.$control
                         || _.find(_.keys(_o.types), function(k){ return _o.types[k].call(self, _o.value, _o); })
                         || _o.default_control;

            if (_o.get_control) return _control;

            if (!_o.skip_replace && (_o.force_replace || _control !== _o.control_type)){
              _o.control_type = _control;

              Belt.set(self, 'settings.control_type', _control);

              var _v = self.getControl();

              if (!_v) return true;

              //_v.replace(B[_control](_.omit(_o, ['default_control', 'types', 'control_type'])), _o);

              _v.$el.remove();

              self.views.control = B[_control](_.omit(_o, ['default_control', 'types', 'control_type']));
              self.layout = ['control']
              self.views.control.parents = {'control': self};
              self.render();

              var _c = self.getControl();

              _c.on('delete', function(){
                return self.delete();
              });

              _.each(_c.override_methods || [], function(m){
                self[m] = _c[m];
                if (_.isFunction(self[m])) self[m] = _.bind(self[m], _c);
              });

              this.trigger('replace', {'control': _c, 'oname': _v});
              return false;
            }

            return true;
          }
        , 'setName': function(val){
            var self = this
              , on = Belt.get(this, 'settings.name');

            Belt.set(this, 'settings.name', val);

            Belt.call(self.getControl(), 'setName', val);
            this.$el.attr('data-name', val);
            this.$el.data('name', val);

            _.each(this.parents, function(v, k){
              if (k !== on) return;
              v.renameView(on, val);
            });
            this.parents[val] = this.parents[on];
            delete this.parents[on];

            if (true){
              this.trigger('setName', {'name': val, 'oname': on});
              this.trigger('change', {'event': 'setName', 'name': val, 'oname': on});
            }

            return {'name': val, 'oname': on};
          }
        }
      });

      if (!Belt.get(o, 'settings.control_type'))
        Belt.set(o, 'settings.control_type', o.view.setControl.call(o, o.value, {'get_control': true}));

      o = _.defaults(o, {
        'views': Belt.extend({
          'control': B[o.settings.control_type](Belt.extend({}
                     /*, _.pick(o, ['name', 'value', 'removable'])*/
                     , o.settings.control_settings || {}, o.control_settings || {}
                     , _.omit(o, ['view', 'control', 'tag', 'subviews_path', 'layout', 'settings'])
                     ))
        }, o.views || {})
      , 'events': {
        }
      , 'set': {
          'view': 'control'
        , 'subpaths': {'control': ''}
        , 'preformer': o.view.setControl
        , 'transformer': function(val){
            return !Belt.isEmpty(Belt.get(this, 'settings.schema')) ? Belt.objSchema(Belt.copy(val), this.settings.schema) : val;
          }
        }
      , 'get': {
          'view': 'control'
        , 'subpaths': {'control': ''}
        }
      , 'change': {
        }
      , 'replace': {
        }
      });

      if (!Belt.isEmpty(o.schema)) o.value = Belt.objSchema(Belt.copy(o.value), o.schema);

      var self = B.view(o);

      self.getControl().on('delete', function(){ return self.delete() });

      _.each(self.getControl().override_methods || [], function(m){
        var c = self.getControl();
        self[m] = c[m];
        if (_.isFunction(self[m])) self[m] = _.bind(self[m], c);
      });

      return self;
    };

    B['objectHeaderView'] = function(options){
      var o = _.defaults(options || {}, {
        'name': ''
      , 'controls': [
        {'html': 'String', 'method': 'mutableControl', 'options': {'default_control': 'textControl'}}
      , {'html': 'Number', 'method': 'mutableControl', 'options': {'default_control': 'numberControl'}}
      , {'html': 'Boolean', 'method': 'mutableControl', 'options': {'default_control': 'checkboxControl'}}
      , {'html': 'Date', 'method': 'mutableControl', 'options': {'default_control': 'datetimeControl'}}
      , {'html': 'Object', 'method': 'mutableControl', 'options': {'default_control': 'objectControl'}}
      , {'html': 'Array', 'method': 'mutableControl', 'options': {'default_control': 'arrayControl'}}
      ]
      , 'addable': true
      , 'removable': true
      , 'dropdown': true
      , 'labels': {
          'add': 'Add Field'
        , 'remove': 'Remove Object'
        }
      , 'layout': ['legend', 'buttons']
      , 'tag': 'div'
      , 'class': ['row', 'header']
      });

      if (!o.child && o.dropdown && _.any(o.controls)) o.labels.add += ' <span class="caret"></span>';

      o = _.defaults(o, {
        'views': Belt.extend({
          'legend': B.div({'class': 'col-xs-6'}).append(function(){
            return !Belt.isNull(o.name) ? B.legend({'class': 'text-primary'}, String(o.name)) : '';
          })
        , 'buttons': B.div({'class': 'col-xs-6'})
                      .div({'class': ['btn-group', 'pull-right'], 'attr': {'role': 'group'}})
                      .append(function(){
            var html = [];

            if (o.removable) html.push(B.button({'class': ['btn', 'btn-danger', 'remove']}, o.labels.remove));

            if (!o.addable) return html;

            if (o.child){
              o.child.method = o.child.method || 'mutableControl';
              html.unshift(B.button({'class': ['btn', 'btn-default', 'add', 'child', 'no-dropdown']
                          , 'data': o.child}, o.labels.add));
            } else if (!o.dropdown){
              html.unshift(B.button({'class': ['btn', 'btn-default', 'add', 'no-dropdown']
                          , 'data': _.omit(o.controls[0], ['html'])}, o.labels.add));
            } else {
              var el = B.div({'class': ['btn-group', 'add'], 'attr': {'role': 'group'}}, [
                         B.button({'class': ['btn', 'btn-default', 'dropdown-toggle'], 'data': {'toggle': 'dropdown'}
                                 , 'attr': {'aria-expaned': 'false'}}, o.labels.add)
                       , B.ul({'class': 'dropdown-menu', 'attr': {'role': 'menu'}}, _.map(o.controls, function(c){
                           return B.li().a({
                             'attr': {'href': '#'}
                           , 'data': _.omit(c, ['html'])
                           }, c.html);
                         }))
                       ]);
              html.unshift(el);
            }

            return html;
          })
        }, o.views || {})
      });

      var self = B.view(o);

      return self;
    };

    B['objectFieldsView'] = function(options){
      var o = options || {};
      o = _.defaults(o, {
        'layout': []
      , 'tag': 'div'
      , 'class': ['col-xs-11', 'col-xs-offset-1', 'fields']
      , 'value': {}
      , 'views': Belt.extend({}, o.views || {})
      , 'schema': {}
      });

      var self = B.view(_.omit(o, ['parent']));

      _.each(o.value || {}, function(v, k){
        var vops = Belt.get(o, 'subschemas.' + k) || {}
          , $child = Belt.get(o, 'child') || {}
          , $opts = Belt.extend({}, $child, $child.options || {}, vops, vops.$options || {}, vops.$opts || {})
          , $meth = $opts.$meth || $opts.$method || $opts.meth || $opts.method || 'mutableControl';

        $opts.schema = $opts.schema || (Belt.get(o, 'schema.' + k) ? {'': o.schema[k]} : undefined);

        $opts = Belt.extend({'value': v, 'name': k.toString()}, $opts);

        return self.setView(k, B[$meth]($opts));
      });

      return self;
    };

    B['objectControl'] = function(options){
      var o = _.defaults(options || {}, {
        'name': ''
      , 'removable': true
      , 'addable': true
      , 'control': 'object'
      , 'layout': ['objectHeaderView', 'status', 'objectFieldsView']
      , 'tag': 'fieldset'
      , 'subviews_path': 'views.objectFieldsView'
      , 'class': []
      , 'schema': {}
      });

      if (!Belt.isEmpty(o.schema)) o.value = Belt.objSchema(Belt.copy(o.value), o.schema);

      o.settings = Belt.extend({'is_array': o.is_array}, o.settings || {});

      o = _.defaults(o, {
        'set': {
          'method': 'setObj'
        , 'transformer': function(val){
            return !Belt.isEmpty(Belt.get(this, 'settings.schema')) ? Belt.objSchema(Belt.copy(val), this.settings.schema) : val;
          }
        }
      , 'get': {
          'method': 'getObj'
        , 'transformer': function(val, options){
            var v = Belt.get(this, 'settings.is_array') ? _.sortBy(val, function(v, k){ return parseInt(k); }) : val;
            return !Belt.get(options, 'no_transform') && !Belt.isEmpty(Belt.get(this, 'settings.schema'))
                     ? Belt.objSchema(Belt.copy(v), this.settings.schema) : v;
          }
        }
      , 'views': Belt.extend({
          'objectHeaderView': B.objectHeaderView(Belt.extend(_.pick(o
          , ['removable', 'name', 'addable', 'child', 'schema', 'subschemas']), o.header))
        , 'status': B.viewsArray({
                      'class': ['status']
                    , 'default_view': 'alertControl'
                    , 'child': {
                        'type': 'danger'
                      , 'removable': false
                      }
                    })
        , 'objectFieldsView': B.objectFieldsView(Belt.extend(_.pick(o, ['value', 'subschemas', 'schema', 'child']), o.fields))
        }, o.views || {})
      , 'view': {
          'override_methods': ['setState', 'getState', 'setStatus', 'getStatus', 'addPath', 'getButtons']
        }
      });

      o.view = Belt.extend({
        'setState': function(state){
            var states = ['success', 'warning', 'error'];
            if (state && !Belt.find(states, state)) return;
            var on = Belt.call(this, 'getState')
              , rclass = _.chain(states).difference([state])
                          .map(function(s){ return 'has-' + s; })
                          .value().join(' ');

            this.getControl().$el.removeClass(rclass);
            if (state) this.getControl().$el.addClass('has-' + state);

            this.trigger('setState', {'state': state, 'ostate': on});
            return {'state': state, 'ostate': on};
          }
        , 'getState': function(){
            var el = this.getControl().$el
              , states = ['success', 'warning', 'error']
              , state = _.find(states, function(s){ return el.hasClass('has-' + s); });

            return state;
          }
        , 'setStatus': function(err, options){
            var _o = options || {}
              , _e = Belt.toArray(err || [])
              , rt = {'ostatus': this.getStatus()};

            _o = _.defaults(_o, {
              'state': _.any(_e) ? 'error' : undefined
            , 'reset': 'true'
            });

            this.setState(_o.state);
            var stat = this.getView('status', {'subpaths': ''});

            //hack
            if (!stat) stat = Belt.chain(this, ['getControl'], ['getView', 'status', {'subpaths': ''}]);

            if (!stat) return;
            if (_o.reset) _.each(Belt.call(stat, 'getViews') || [], function(v){
              return stat.pop();
            });

            _.each(_e, function(r){
              return stat.push(r, {'type': _o.state, 'removable': _o.removable});
            });

            rt.status = {'state': _o.state, 'status': _o.reset ? _e : rt.ostatus.status.concat(_e)};

            this.trigger('setStatus', rt);
            return rt;
          }
        , 'getStatus': function(){
            var stat = {
              'state': this.getState()
            , 'status': _.pluck(Belt.chain(this, ['getView', 'status', {'subpaths': ''}], 'get') || [], 'html')
            }
            return stat;
          }
        , 'getButtons': function(){
            return Belt.call(this, 'views.objectHeaderView.$', '.btn-group');
          }
      }, o.view || {});

      o.view.addPath = o.view.addPath || function(method, options){
        var _o = options || {}
          , self = this
          , $o = Belt.get(self, 'settings.child') || {};

        //_o.name = _o.name || Belt.chain($o, 'name');

        if (!Belt.isNull(_o.name)){
          method = method || _o.method || Belt.get($o, 'method') || Belt.get($o, 'meth');
          return self.setView(_o.name, B[method](Belt.extend($o || {}, _o || {})));
        } else {
          return bootbox.prompt({'title': 'Enter name for new path for "' + Belt.get(self, 'settings.name') + '"'
          , 'callback': function(name){
            if (!name) return;

            $o = Belt.extend({'name': name}, $o || {}, Belt.get(self, 'settings.subschemas.' + name) || {}, _o);
            method = method || $o.method || $o.meth;

            return self.setView(name, B[method]($o));
          }});
        }
      };

      o.view.setName = o.view.setName || function(val){
        var self = this
          , on = Belt.get(this, 'settings.name');

        Belt.set(this, 'settings.name', val);

        this.$el.attr('data-name', val);
        this.$el.attr('name', val);
        this.$el.data('name', val);
        this.$('> div.header legend').html(val);

        _.each(this.parents, function(v, k){
          if (k !== on || !v || !v.renameView) return;
          v.renameView(on, val);
        });
        this.parents[val] = this.parents[on];
        delete this.parents[on];

        if (true){
          this.trigger('setName', {'name': val, 'oname': on});
          this.trigger('change', {'event': 'setName', 'name': val, 'oname': on});
        }

        return {'name': val, 'oname': on};
      };

      o = Belt.extend({
        'events': {
          'click > .header button.remove': function(){ return this.delete(); }
        , 'click > .header .add a': function(e){
            e.preventDefault();
            var el = Belt.get(e, 'target');
            if (!el) return;
            var $el = $(el)
              , opts = Belt.copy($el.data('options') || {});

            this.addPath($el.data('method'), opts);
          }
        , 'click > .header .add.no-dropdown': function(e){
            e.preventDefault();
            var el = Belt.get(e, 'target');
            if (!el) return;
            var $el = $(el)
              , opts = Belt.copy($el.data('options') || {});

            this.addPath($el.data('method'), opts);
          }
        }
      }, o);

      var self = B.view(o);
      self.settings.conformer = _.debounce(function(){
        if (!this.settings.autoconform) return;

        var slf = this;
        setTimeout(function(){
          if (Belt.isEmpty(Belt.get(slf, 'settings.schema'))) return;
          var _s = slf.get({'no_transform': true})
            , _a = Belt.objSchema(Belt.copy(_s), slf.settings.schema);

          if (Belt.equal(_s, _a)) return;

          return slf.setObj(_a, Belt.extend({'silent': true, 'child': slf.settings.child || {}}, slf.settings.subschemas || {}));
        }, 0);
      }, 500);

      self.on('change', self.settings.conformer);

      return self;
    };

    B['arrayControl'] = function(options){
      var o = options || {}
        , ar = B.objectControl(Belt.extend({
        'is_array': true
      , 'header': {
          'labels': {
            'add': 'Add Element'
          , 'remove': 'Remove Array'
          }
        }
      , 'view': {
          'reindex': function(){
            var self = this;
            _.each(self.getLayout(), function(l, i){
              var vw = self.getView(l);
              if (!vw || !vw.setName) return;
              return vw.setName(Belt.uuid());
            });
            _.each(self.getLayout(), function(l, i){
              var vw = self.getView(l);
              if (!vw || !vw.setName) return;
              return vw.setName(String(i));
            });
            return this;
          }
        , 'addPath': function(method, options){
            var _o = options || {}
              , self = this
              , $o = Belt.get(self, 'settings.child') || {}
              , index = self.getEl().children().length || 0
              , path = String(index);

            $o = Belt.extend({'name': path}, $o || {}, Belt.get(self, 'settings.subschemas.' + path) || {}, _o);
            method = method || $o.method || $o.meth;

            var view = B[method](Belt.extend({'name': path}, $o));

            view.on('delete', function(){ return ar.reindex(); });

            var ret = self.setView(path, view);

            if (!Belt.isNull($o.index)) return self.move(index, $o.index, $o);

            self.reindex();
            return ret;
          }
        , 'pushView': function(view, options){
            var _o = options || {}
              , self = this
              , $o = Belt.get(self, 'settings.child') || {}
              , index = self.getEl().children().length || 0
              , path = String(index);

            view.setName(path);

            view.on('delete', function(){ return ar.reindex(); });

            var ret = self.setView(path, view);
            self.reindex();
            return ret;
          }
        , 'push': function(val, options){
            var _o = options || {}
              , $o = Belt.get(self, 'settings.child') || {}
              , method = $o.method || $o.meth || 'mutableControl';
            return this.addPath(method, Belt.extend({'value': val}, $o));
          }
        , 'pop': function(options){
            var l = this.getLayout();
            if (!_.any(l)) return;
            var ret = this.deleteView(_.last(l), options);
            return ret;
          }
        , 'shift': function(options){
            var l = this.getLayout();
            if (!_.any(l)) return;
            var ret = this.deleteView(_.first(l), options);
            this.reindex();
            return ret;
          }
        , 'unshift': function(val, options){
            var _o = options || {}
              , $o = Belt.get(self, 'settings.child') || {}
              , method = $o.method || $o.meth || 'mutableControl';
            return this.addPath(method, Belt.extend({'value': val, 'index': 0}, $o));
          }
        , 'move': function(ind, tind, options){
            var ret = this.moveView(String(ind), tind, options);
            this.reindex();
            return ret;
          }
        , 'override_methods': ['setState', 'getState', 'setStatus', 'getStatus', 'move', 'reindex'
                              , 'addPath', 'push', 'pushView', 'pop', 'shift', 'unshift']
        }
      , 'control': 'array'
      }, o));

      _.each(ar.getViews(), function(v, k){
        return v.on('delete', function(){ return ar.reindex(); });
      });

      return ar;
    };

    B['viewsArray'] = function(options){
      var o = Belt.extend({
        'schema': {}
      , 'set': {
          'method': 'setObj'
        , 'transformer': function(val){
            return !Belt.isEmpty(Belt.get(this, 'settings.schema')) ? Belt.objSchema(Belt.copy(val), this.settings.schema) : val;
          }
        }
      , 'get': {
          'method': 'getObj'
        , 'transformer': Belt.objToArray
        }
      , 'view': {
          'reindex': function(){
            var self = this;
            _.each(self.getLayout(), function(l, i){
              var vw = self.getView(l);
              if (!vw || !vw.setName) return;
              return vw.setName(Belt.uuid());
            });
            _.each(self.getLayout(), function(l, i){
              var vw = self.getView(l);
              if (!vw || !vw.setName) return;
              return vw.setName(String(i));
            });
            return this;
          }
        , 'addPath': function(method, options){
            var _o = options || {}
              , self = this
              , $o = Belt.get(self, 'settings.child') || {}
              , index = self.getEl().children().length || 0
              , path = String(index);

            $o = Belt.extend({'name': path}, $o || {}, Belt.get(self, 'settings.subschemas.' + path) || {}, _o);

            method = method || $o.method || $o.meth;

            var view = B[method](Belt.extend({'name': path}, $o));

            view.on('delete', function(){ return ar.reindex(); });

            var ret = self.setView(path, view);

            if (!Belt.isNull($o.index)) return self.move(index, $o.index, $o);

            self.reindex();
            return ret;
          }
        , 'pushView': function(view, options){
            var _o = options || {}
              , self = this
              , $o = Belt.get(self, 'settings.child') || {}
              , index = self.getEl().children().length || 0
              , path = String(index);

            view.setName(path);

            view.on('delete', function(){ return ar.reindex(); });

            var ret = self.setView(path, view);
            self.reindex();
            return ret;
          }
        , 'push': function(val, options){
            var _o = options || {}
              , $o = Belt.extend({}, Belt.get(self, 'settings.child') || {}, _o)
              , method = $o.method || $o.meth || this.settings.default_view;
            return this.addPath(method, Belt.extend({'value': val, 'html': val}, $o));
          }
        , 'pop': function(options){
            var l = this.getLayout();
            if (!_.any(l)) return;
            var ret = this.deleteView(_.last(l), options);
            return ret;
          }
        , 'shift': function(options){
            var l = this.getLayout();
            if (!_.any(l)) return;
            var ret = this.deleteView(_.first(l), options);
            this.reindex();
            return ret;
          }
        , 'unshift': function(val, options){
            var _o = options || {}
              , $o = Belt.extend({}, Belt.get(self, 'settings.child') || {}, _o)
              , method = $o.method || $o.meth || this.settings.default_view;

            return this.addPath(method, Belt.extend({'value': val, 'html': val, 'index': 0}, $o));
          }
        , 'move': function(ind, tind, options){
            var ret = this.moveView(String(ind), tind, options);
            this.reindex();
            return ret;
          }
        , 'override_methods': ['move', 'reindex', 'addPath', 'push', 'pushView', 'pop', 'shift', 'unshift']
        }
      , 'control': 'viewsArray'
      , 'tag': 'div'
      }, options || {});

      o.settings = _.defaults(o.settings || {}, {
        'default_view': o.default_view || 'view'
      });

      var ar = B.view(o);

      _.each(o.value || {}, function(v, k){
        var $meth, $opts;

        var vops = Belt.get(o, 'subschemas.' + k) || {}
          , $child = Belt.get(o, 'child') || {}
          , $opts = Belt.extend({}, $child, vops, vops.$options || {}, vops.$opts || {})
          , $meth = $opts.$meth || $opts.$method || $opts.meth || $opts.method || 'mutableControl';

        $opts = Belt.extend({'value': v, 'html': v, 'name': k.toString()}, $opts);

        return ar.setView(k, B[$meth]($opts));
      });

      _.each(ar.getViews(), function(v, k){
        if (!v.on) return;
        return v.on('delete', function(){ return ar.reindex(); });
      });

      return ar;
    };

    B['alertControl'] = function(options){
      var o = _.defaults(options || {}, {
        'name': ''
      , 'control': 'alert'
      , 'removable': false
      , 'set': {
          'method': 'setAlert'
        }
      , 'get': {
          'method': 'getAlert'
        }
      , 'change': {
        }
      , 'tag': 'div'
      , 'attributes': {
          'role': 'alert'
        }
      , 'class': ['alert']
      });

      o = _.defaults(o, {
        'view': {
          'setName': function(val){
            var self = this
              , on = Belt.get(this, 'settings.name');

            Belt.set(this, 'settings.name', val);
            this.getEl().attr('data-name', val);
            this.getEl().data('name', val);

            _.each(this.parents, function(v, k){
              if (k !== on || !v || !v.renameView) return;
              v.renameView(on, val);
            });
            this.parents[val] = this.parents[on];
            delete this.parents[on];

            if (true){
              this.trigger('setName', {'name': val, 'oname': on});
              this.trigger('change', {'event': 'setName', 'name': val, 'oname': on});
            }

            return {'name': val, 'oname': on};
          }
        , 'setAlert': function(val){
            if (!Belt.isPlainObj(val)) val = {'html': String(val)};
            var _a = _.defaults(val || {}, {
              'type': Belt.get(this, 'settings.type') || 'success'
            , 'removable': Belt.get(this, 'settings.removable') || false
            , 'html': ''
            });

            if (_a.type === 'error') _a.type = 'danger'; //alias

            var prf = _a.removable ? ('<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
            + '<span aria-hidden="true">&times;</span></button>') : '';

            this.$el.html(prf + _a.html);
            this.settings.html = prf + _a.html;

            this.$el.addClass('alert-' + _a.type);
            if (_a.removable){
              this.$el.addClass('alert-dismissable');
            } else {
              this.$el.removeClass('alert-dismissable');
            }

            var rclass = _.chain(['success', 'info', 'warning', 'danger'])
                          .difference([_a.type])
                          .map(function(t){ return 'alert-' + t; })
                          .value()
                          .join(' ');

            this.$el.removeClass(rclass);
            return this;
          }
        , 'getAlert': function(){
            var _a = {};

            _a.html = this.$el.html();
            if (this.$el.hasClass('alert-dismissable')){
              _a.html = _a.html.split('</button>')
              _a.html.shift();
              _a.html = _a.html.join('</button>');
              _a.removable = true;
            } else {
              _a.removable = false;
            }

            if (this.$el.hasClass('alert-success')){
              _a.type = 'success';
            } else if (this.$el.hasClass('alert-info')){
              _a.type = 'info';
            } else if (this.$el.hasClass('alert-warning')){
              _a.type = 'warning';
            } else if (this.$el.hasClass('alert-danger')){
              _a.type = 'danger';
            }

            return _a;
          }
        }
      });

      o = Belt.extend({
        'events': {
          'click > button.close': function(e){
            e.preventDefault();
            return this.delete();
          }
        }
      }, o);

      var self = B.view(o);
      self.setAlert(o.value);

      return self;
    };

    /////////////////////////////////////////////////////////////
    //                    Backbone Model                       //
    /////////////////////////////////////////////////////////////

    B['model'] = function(options){
      var _o = Belt.extend({
        '$validations': []
      , '$transformers': {
          'validate': []
        , 'save': []
        }
      , '$errors': []
      , '$history': []
      , '$schema': undefined
      , '$viewSchema': {}
      , '$views': {}
      , '$io': B.io
      , 'idAttribute': '_id'
      , 'url': '/model/<%= _id %>'
      , 'urlRoot': '/model'
      , '$lastSync': undefined
      }, options || {});

      _o.url = _.template(_o.url);

      _o.$validators = Belt.extend({
        'required': function(path){
          var p = this.get(path);
          return !Belt.isNull(p) && p !== '';
        }
      , 'defined': function(path){
          var p = this.get(path);

          return p !== undefined;
        }
      , 'enum': function(path, values){
          var v = this.get(path);
          return Belt.isNull(v) || v === '' ? true : Belt.find(values, v);
        }
      , 'match': function(path, regex){
          var v = this.get(path);
          return Belt.isNull(v) || v === '' ? true : Belt.call(v, 'match', regex);
        }
      , 'unique': function(path, collection){
          var v = Belt.get(this, path)
            , col = Belt.map(collection, function(c){ return c.get(path); });
          return Belt.isNull(v) || v === '' ? true : Belt.find(col, v);
        }
      , 'typeof': function(path, type){
          var t = Belt.typeof(type) === 'function' ? Belt.typeof(new type()) : type
            , v = this.get(path);
          if (Belt.isNull(v) || v === '') return true;
          return Belt.typeof(t) === 'regexp' ? Belt.call(B.typeof(v), 'match', t)
                                             : Belt.typeof(v) === t;
        }
      , 'validate': function(iter){
          return iter.call(this);
        }
      }, _o.$validators || {});

      _o.get = function(path){
        if (!path) return Belt.get(this, 'attributes');
        return Belt.get(this, 'attributes.' + path);
      };

      _o.set = function(path, val, opts){
        var o = opts || {}
          , rt = Belt.extend({}, o, {'oval': this.get(path)})
          , self = this;

        if (path === '' && this.defaultCast && this.defaultCast !== Belt.typeof(val))
          val = Belt.cast(val, this.defaultCast);

        if (Belt.equal(rt.oval, val)) return; //no change

        if (!o.silent && !o.no_snapshot) var oa = Belt.copy(this.attributes);
        var oid = Belt.copy(Belt.get(this, 'attributes.' + Belt.pescape(this.idAttribute)));

        Belt.set(this, 'attributes' + (path ? '.' + path : ''), val);

        rt.path = path;
        rt.val = val;

        if (!o.silent){
          if (!o.no_snapshot){
            var ss = Belt.objDiff(this.attributes, oa);
            if (!_.last(this.$history) || !Belt.equal(ss, _.last(this.$history)))
              this.$history.push(ss);
          }

          _.each(this.$views, function(v){
            if (path === '') return v.set(self.get(path));
            return v.setPath(path, self.get(path));
          });

          if (o.conform) setTimeout(function(){ return self.$conformSchema(); }, 0);
          this.validate();

          this.trigger('change', rt);
        }

        if (!Belt.equal(oid, Belt.get(this, 'attributes.' + Belt.pescape(this.idAttribute))))
          this.$unlisten(oid).$listen();

        return rt;
      };

      _o.unset = function(path, options){
        var o = options || {}
          , rt = {'oval': this.get(path), 'path': path};

        if (!o.silent && !o.no_snapshot) var oa = Belt.copy(this.attributes);

        Belt.delete(this, 'attributes.' + path);
        _.each(this.$views, function(v, k){
          if (v && v.deleteView) v.deleteView(path);
          return;
        });

        this.validate();

        if (!o.silent &&!o.no_snapshot){
          var ss = Belt.objDiff(this.attributes, oa);
          if (!_.last(this.$history) || !Belt.equal(ss, _.last(this.$history)))
            this.$history.push(ss);
        }

        this.trigger('change', rt);
        return rt;
      };

      _o.push = function(path, val, options){
        var ar = this.get(path)
          , o = options || {}
          , self = this;

        if (!o.silent && !o.no_snapshot) var oa = Belt.copy(this.attributes);

        if (Belt.isNull(ar)) return this.set(path, [val], o);

        if (!_.isArray(ar)) return;

        ar.push(val);

        _.each(this.$views, function(v, k){
          return Belt.chain(v, ['getView', path], ['push', val]);
        });

        this.validate();

        if (!o.silent &&!o.no_snapshot){
          var ss = Belt.objDiff(this.attributes, oa);
          if (!_.last(this.$history) || !Belt.equal(ss, _.last(this.$history)))
            this.$history.push(ss);
        }

        if (o.conform) setTimeout(function(){ return self.$conformSchema(); }, 0);

        this.trigger('change', {'path': path, 'val': val});
        return {'path': path, 'val': val};
      };

      _o.unshift = function(path, val, options){
        var ar = this.get(path)
          , o = options || {}
          , self = this;

        if (!o.silent && !o.no_snapshot) var oa = Belt.copy(this.attributes);

        if (Belt.isNull(ar)) return this.set(path, [val], o);

        if (!_.isArray(ar)) return;

        ar.unshift(val);

        _.each(this.$views, function(v, k){
          return Belt.chain(v, ['getView', path], ['unshift', val]);
        });

        this.validate();

        if (!o.silent &&!o.no_snapshot){
          var ss = Belt.objDiff(this.attributes, oa);
          if (!_.last(this.$history) || !Belt.equal(ss, _.last(this.$history)))
            this.$history.push(ss);
        }

        if (o.conform) setTimeout(function(){ return self.$conformSchema(); }, 0);

        this.trigger('change', {'path': path, 'val': val});
        return {'path': path, 'val': val};
      };

      _o.splice = function(path, ind, rm, val, options){
        var ar = this.get(path)
          , o = options || {}
          , self = this;

        if (!o.silent && !o.no_snapshot) var oa = Belt.copy(this.attributes);

        if (Belt.isNull(ar)) return this.set(path, [val], o);

        if (!_.isArray(ar)) return;

        ar.splice(ind, rm, val);

        _.each(this.$views, function(v, k){
          return Belt.chain(v, ['setPath', path, ar]);
        });

        this.validate();

        if (!o.silent &&!o.no_snapshot){
          var ss = Belt.objDiff(this.attributes, oa);
          if (!_.last(this.$history) || !Belt.equal(ss, _.last(this.$history)))
            this.$history.push(ss);
        }

        if (o.conform) setTimeout(function(){ return self.$conformSchema(); }, 0);

        this.trigger('change', {'path': path, 'val': val});
        return {'path': path, 'val': val};
      };

      _o.shift = function(path, options){
        var ar = this.get(path)
          , o = options || {}
          , self = this;

        if (!o.silent && !o.no_snapshot) var oa = Belt.copy(this.attributes);

        if (Belt.isNull(ar)) return this.set(path, [], o);

        if (!_.isArray(ar)) return;

        var val = ar.shift();

        _.each(this.$views, function(v, k){
          return Belt.chain(v, ['getView', path], ['shift']);
        });

        this.validate();

        if (!o.silent &&!o.no_snapshot){
          var ss = Belt.objDiff(this.attributes, oa);
          if (!_.last(this.$history) || !Belt.equal(ss, _.last(this.$history)))
            this.$history.push(ss);
        }

        if (o.conform) setTimeout(function(){ return self.$conformSchema(); }, 0);

        this.trigger('change', {'path': path, 'val': val});
        return {'path': path, 'val': val};
      };

      _o.pop = function(path, ind, options){
        var ar = this.get(path)
          , o = options || {}
          , self = this;

        if (!o.silent && !o.no_snapshot) var oa = Belt.copy(this.attributes);

        if (Belt.isNull(ar)) return this.set(path, [], o);

        if (!_.isArray(ar)) return;

        var val = ar.pop();

        _.each(this.$views, function(v, k){
          return Belt.chain(v, ['getView', path], ['pop']);
        });

        this.validate();

        if (!o.silent &&!o.no_snapshot){
          var ss = Belt.objDiff(this.attributes, oa);

          if (!_.last(this.$history) || !Belt.equal(ss, _.last(this.$history)))
            this.$history.push(ss);
        }

        if (o.conform) setTimeout(function(){ return self.$conformSchema(); }, 0);

        this.trigger('change', {'path': path, 'val': val});
        return {'path': path, 'val': val};
      };

      _o.move = function(path, ind, dind, options){
        var ar = this.get(path)
          , o = options || {}
          , self = this;

        if (!o.silent && !o.no_snapshot) var oa = Belt.copy(this.attributes);

        if (Belt.isNull(ar)) return this.set(path, [], o);

        if (!_.isArray(ar)) return;

        var val = ar.splice(ind, 1);
        ar.splice(dind, 0, val);

        _.each(this.$views, function(v, k){
          return Belt.chain(v, ['getView', path], ['move', ind, dind]);
        });

        this.validate();

        if (!o.silent &&!o.no_snapshot){
          var ss = Belt.objDiff(this.attributes, oa);
          if (!_.last(this.$history) || !Belt.equal(ss, _.last(this.$history)))
            this.$history.push(ss);
        }

        if (o.conform) setTimeout(function(){ return self.$conformSchema(); }, 0);

        this.trigger('change', {'path': path, 'val': val});
        return {'path': path, 'val': val};
      };

      _o.rollback = function(){
        return this.set('', Belt.objPatch(Belt.copy(this.attributes), this.$history.pop())
        , {'no_snapshot': true});
      };

      _o.addView = function(name, _v, options){
        var o = options || {}, self = this;
        if (self.$views[name]) self.removeView(name);

        var container = _v.container
          , view = _v.$el ? _v : B[_v.method](Belt.extend({}
                   , {'value': self.get(), /*'schema': self.$schema,*/ 'subschemas': self.$nested}
                   , self.$viewSchema || {}, _v));

        if (container) $(container.selector)[container.method](view.$el);

        self.$views[name] = view;

        view.render();
        view.set(self.get());

        /*view.listenTo(self, 'change', function(val){
          if (Belt.find(Belt.toArray(val.ignore), name)) return;
          return this.set(self.get(), {'silent': true});
        });*/

        self.listenTo(view, 'change', function(val){
          return this.set('', view.get(), {'ignore': [name]});
        });

        if (!o.silent) this.trigger('addView', {'name': name, 'view': view});
        return this;
      };

      _o.validate = function(options){
        var self = this
          , o = options || {}
          , g = o.val || self.get();

        self.$errors = [];

        if (!o.keep_errors) _.each(Belt.extend({'': true}, Belt.objFlatten(g)), function(v, k){
          return self.$setStatus(k, undefined);
        });

        _.each(self.$validations, function(e){
          var ps = Belt.match(self.attributes, e.path);

          if (!_.any(ps)) ps = _.object([e.path], [Belt.get(self, 'attributes.' + e.path)]);

          return _.each(ps, function(v, k){
            if (_.isFunction(e.method)){
              if (!e.method.call(self, v, k))
                return self.$errors.push({'path': k
                , 'message': _.template(e.message)(Belt.extend({}, e, {'lpath': k, 'lval': v}))
                });
            } else {
              var ar = [k];

              if (e.method === 'enum') ar.push(e.values);
              if (e.method === 'match') ar.push(e.regex);
              if (e.method === 'unique') ar.push(e.collection);
              if (e.method === 'typeof') ar.push(e.type);

              if (!self.$validators[e.method].apply(self, ar))
                return self.$errors.push({'path': k
                , 'message': _.template(e.message)(Belt.extend({}, e, {'lpath': k, 'lval': v}))
                });
            }

            return;
          });

          return;
        });

        if (!o.silent && _.any(self.$errors)){
          var p = _.groupBy(self.$errors, function(e){ return e.path; });
          _.each(p, function(errs, k){
            return self.$setStatus(k, _.pluck(errs, 'message'));
          });
        }

        //setTimeout(function(){ return self.$conformSchema(); }, 0);
        self.validationErrors = self.$errors;
        return self.$errors;
      };

      _o.isValid = function(){
        this.validate();
        return !_.any(this.validationErrors);
      };

      _o.$setStatus = function(path, status, options){
        var o = options || {}
          , s = status ? Belt.toArray(status) : [];

        //if (!_.any(s)) return this;

        _.each(this.$views, function(v, k){
          var _v = v.getView(path); //Belt.chain(v, ['getView', path], 'getControl');

          if (!_v || !_v.setStatus){
            var p = Belt.psplit(path);
            while ((!_v || !_v.setStatus) && _.any(p)){
              p.pop();
              _v = v.getView(p.join('.'));
            }
            if (!_v || !_v.setStatus) return;
          }

          return _v.setStatus(s);
        });

        return this;
      };

      _o.$addValidation = function(options){
        var o = _.defaults(options || {}, {
          'path': ''
        , 'message': 'Invalid'
        , 'method': 'required'
        });

        this.$validations.push(o);
        return o;
      };

      _o.$conformSchema = function(){
        var self = this
          , _s = this.get();
        if (this.defaultCast && !Belt.equal(_s, Belt.cast(Belt.copy(_s), this.defaultCast)))
          this.set('', Belt.cast(Belt.copy(_s), this.defaultCast));

        if (this.$schema){
          var _a = Belt.objSchema(Belt.copy(_s), this.$schema);
          if (!Belt.equal(_a, _s)) this.set('', _a);
        }
        _.each(this.defaults || {}, function(v, k){
          return self.set(k, v);
        });
        return;
      };

      _o.sync = function(val, options){
        var o = options || {}
          , self = this;

        o = _.defaults(o, {
          'path': ''
        });

        self.$lastSync = val;
        return self.set(o.path, val, Belt.extend({'conform': true}, o)); 
      };

      _o.save = function(options){
        var o = options || {}
          , self = this;

        o = _.defaults(o, {
          'path': ''
        });

        self.$conformSchema();
        if (!self.isValid()) return false;

        var ptch = Belt.objDiff(Belt.get(self, '$lastSync.' + Belt.pescape(self.idAttribute)), self.get(o.path));

        self.$io.emit(self.urlRoot + '/create', Belt.extend({'patch': ptch, 'id': self.get(self.idAttribute)}, o));
        return true;
      };

      _o.fetch = function(options){
        var o = options || {}
          , self = this;

        o = _.defaults(o, {
          'path': ''
        });

        return self.$io.emit(self.urlRoot + '/read', Belt.extend({'id': self.get(self.idAttribute)}, o));
      };

      _o.destroy = function(options){
        var o = options || {}
          , self = this;

        o = _.defaults(o, {
          'path': ''
        , 'conform': false
        });

        self.sync(undefined, o);

        self.$io.emit(self.urlRoot + '/destroy', Belt.extend({'id': self.get(self.idAttribute)}, o));
        return true;
      };

      _o.$listen = function(){
        var self = this
          , id = Belt.pescape(self.get(self.idAttribute));

        self.$io.on(self.urlRoot + '/' + id + '/read', function(o){
          return self.sync(o.data.val, o.data);
        });
        self.$io.on(self.urlRoot + '/' + id + '/create', function(o){
          return self.sync(o.data.val, o.data);
        });
        self.$io.on(self.url + '/' + id + '/destroy', function(o){
          return self.sync(undefined, o.data);
        });

        return self;
      };

      _o.$unlisten = function(id){
        id = Belt.pescape(id);
        var self = this;

        self.$io.removeAllListeners(self.urlRoot + '/' + id + '/read');
        self.$io.removeAllListeners(self.urlRoot + '/' + id + '/create');
        self.$io.removeAllListeners(self.urlRoot + '/' + id + '/destroy');

        return self;
      };

      _o.getView = function(index){
        if (_.isString(index)) return this.$views[index]
        return Belt.objIndex(this.$views || {}, index, true);
      };

      _o.initialize = function(options){
        var self = this
          , _o = options || {};

        self.$schema = _o.schema;
        self.$viewSchema = _o.viewSchema;
        self.defaults = _o.defaults;
        self.defaultCast = _o.defaultCast;

        _.each(_o.views || {'view': _o.view}, function(v, k){
          if (!v) return;
          return self.addView(k, v);
        });

        _.each(_o.validations || [], function(v, k){
          return self.$addValidation(v);
        });

        self.on('change', function(){
          //return this.validate();
        });

        self.set('', _o.value);

        setTimeout(function(){ return self.$conformSchema(); }, 0);

        return self;
      };

      var self = Backbone.Model.extend(_o);

      return self;
    };

  //////////////////////////////////////////////////////////////////////////////
  ////                        CUSTOM CONTROLS                               ////
  //////////////////////////////////////////////////////////////////////////////

    /*
      Barcode Control
    */
    B['barcodeControl'] = function(options){
      var o = _.defaults(options || {}, {
        'name': ''
      , 'control': 'barcode'
      , 'format': 'qr'
      , 'removable': true
      , 'layout': ['label', 'code', 'buttons', 'status']
      , 'set': {
          'method': 'setCode'
        }
      , 'get': {
          'method': 'getCode'
        }
      , 'change': {
        }
      , 'render': {
          'transformer': function(){
            if (!Belt.isNull(this.settings.value)) this.set(this.settings.value);
            return true;
          }
        }
      , 'tag': 'div'
      , 'class': 'form-group'
      , 'view': {
         'setCode': function(val){
           var self = this,
               v = Belt.cast(val, 'object');

           v = _.defaults(v, {
             'text': Belt.cast(val, 'string')
           , 'format': Belt.get(self, 'settings.format') || 'qr'
           });

           self.$('.code').html('');

           if (v.format.match(/^qr$/i)){
             self.$('.code').qrcode(_.omit(v, ['format']));
           } else if (Belt.call(v, 'format.match', /^(CODE128|EAN|UPC|CODE39|ITF|ITF14|pharmacode)$/i)){
             v.format = v.format.toUpperCase();
             if (v.format === 'PHARMACODE') v.format = 'pharmacode';

             self.$('.code').html('<canvas></canvas>');
             self.$('.code > canvas').JsBarcode(v.text, _.omit(['text']), function(valid){
               if (!valid) setTimeout(function(){
                 self.setStatus(['"', v.text, '"', ' is not a valid ', v.format, ' code'].join(''));
                 return self.set();
               }, 0);
               return;
             });
           } else {
             v.text = '';
           }

           Belt.set(self, 'settings.format', v.format);
           Belt.set(self, '$val', v.text);
           self.$el.data('format', v.format);
           self.$('.code').attr('title', v.text);

           val = v.text;
           return self;
         }
       , 'getCode': function(){
           return Belt.get(this, '$val');
         }
       , 'setName': function(val){
            var self = this
              , on = Belt.get(this, 'settings.name');

            Belt.set(this, 'settings.name', val);
            this.getEl().find('> label').html(val);
            this.getEl().find('> label').attr('for', val);
            this.getEl().attr('data-name', val);
            this.getEl().data('name', val);

            _.each(this.parents, function(v, k){
              if (k !== on) return;
              v.renameView(on, val);
            });
            this.parents[val] = this.parents[on];
            delete this.parents[on];

            if (true){
              this.trigger('setName', {'name': val, 'oname': on});
              this.trigger('change', {'event': 'setName', 'name': val, 'oname': on});
            }

            return {'name': val, 'oname': on};
          }
        , 'setState': function(state){
            var states = ['success', 'warning', 'error'];
            if (state && !Belt.find(states, state)) return;
            var on = Belt.call(this, 'getState')
              , rclass = _.chain(states).difference([state])
                          .map(function(s){ return 'has-' + s; })
                          .value().join(' ');

            this.getEl().removeClass(rclass);
            if (state) this.getEl().addClass('has-' + state);

            this.trigger('setState', {'state': state, 'ostate': on});
            return {'state': state, 'ostate': on};
          }
        , 'getState': function(){
            var el = this.getEl()
              , states = ['success', 'warning', 'error']
              , state = _.find(states, function(s){ return el.hasClass('has-' + s); });

            return state;
          }
        , 'setStatus': function(err, options){
            var _o = options || {}
              , _e = Belt.toArray(err || [])
              , rt = {'ostatus': this.getStatus()};

            _o = _.defaults(_o, {
              'state': _.any(_e) ? 'error' : undefined
            , 'reset': 'true'
            });

            this.setState(_o.state);
            var stat = this.getView('status');
            if (_o.reset) _.each(stat.getViews(), function(v){
              return stat.pop();
            });

            _.each(_e, function(r){
              return stat.push(r);
            });

            rt.status = {'state': _o.state, 'status': _o.reset ? _e : rt.ostatus.status.concat(_e)};

            this.trigger('setStatus', rt);
            return rt;
          }
        , 'getStatus': function(){
            var stat = {
              'state': this.getState()
            , 'status': this.getView('status').get()
            }
            return stat;
          }
        , 'override_methods': ['setState', 'getState', 'setStatus', 'getStatus']
        }
      });

      o = Belt.extend({
        'attributes': {
          'data-format': o.format
        }
      }, o);

      o = _.defaults(o, {
        'views': Belt.extend({
          'buttons': B.div({'class': 'col-xs-1'})
                      .div({'class': 'row'})
                      .div({'class': 'col-xs-12'}).append(function(){
                        return o.removable ? B.button({'class': ['btn', 'btn-danger', 'remove']}, 'Delete') : '';
                      })
        , 'label': B.label({'class': ['control-label', 'col-xs-1'], 'attr': {'for': o.name}}, String(o.name))
        , 'code': B.div({'class': ['code', 'col-xs-10']})
        , 'status': B.viewsArray({
                      'class': ['status', 'col-xs-11 col-xs-offset-1']
                    , 'child': {
                        'tag': 'span'
                      , 'class': ['help-block']
                      }
                    })
        }, o.views || {})
      });

      o = _.defaults(o, {
        'events': {
          'click button.remove': function(){ return this.delete(); }
        }
      });

      var self = B.view(o);

      return self;
    };

    /*
      Location
    */
    B['locationControl'] = function(options){
      var o = _.defaults(options || {}, {
        'name': ''
      , 'control': 'location'
      , 'removable': true
      , 'addable': false
      , 'schema': {
          'longitude': 'number'
        , 'latitude': 'number'
        , 'address': 'string'
        }
      , 'child': {
          'removable': false
        , 'addable': false
        , '$control': 'numberControl'
        }
      , 'subschemas': {
          'address': {
            '$control': 'textareaControl'
          }
        }
      , 'render': {
          'transformer': function(){
            return this.getButtons().prepend(
              B.button({'class': 'btn btn-default current'}, 'Current Location').render(true),
              B.button({'class': 'btn btn-default track'}, 'Track').render(true),
              B.button({'class': 'btn btn-default coordinates'}, 'Coordinates').render(true),
              B.button({'class': 'btn btn-default address'}, 'Address').render(true)
            );
          }
        }
      , 'geocode_url': '/location/geocode'
      , 'reverse_geocode_url': '/location/reverse_geocode'
      , 'tracking_interval': 2000
      });

      o = Belt.extend({
        'view': {
          'getCurrentLocation': function(options){
             var self = this
               , o = options || {};

             if (!Belt.get(navigator, 'geolocation')) return self.setStatus('Geolocation is not supported in this browser');

             return navigator.geolocation.getCurrentPosition(function(pos){
                var long  = Belt.get(pos, 'coords.longitude')
                  , lat = Belt.get(pos, 'coords.latitude');

                if (o.tracking && Belt.equal([long, lat], [self.getPath('longitude'), self.getPath('latitude')])) return;

                self.setStatus(!Belt.isNull(long) && !Belt.isNull(lat) ? undefined : 'Current location could not be retrieved');
                self.setPath('longitude', long);
                self.setPath('latitude', lat);

               return self.getAddress();
            }, function(err){
              if (err) self.setStatus('Current location could not be retrieved');
              return;
            });
          }
        , 'trackLocation': function(e){
            var self = this
              , el = $(Belt.get(e, 'target'));

            el.removeClass('track btn-default');
            el.addClass('untrack btn-warning');
            el.html('Stop Tracking');

            self.$tracking = setInterval(_.bind(self.getCurrentLocation, self), self.settings.tracking_interval);
            return self.getCurrentLocation({'tracking': true});
          }
        , 'stopTrackingLocation': function(e){
            var self = this;

            if (this.$tracking) clearInterval(this.$tracking);
            delete this.$tracking

            var el = $(Belt.get(e, 'target'));

            el.addClass('track btn-default');
            el.removeClass('untrack btn-warning');
            el.html('Track');

            return;
          }
        , 'getCoordinates': function(options){
            var self = this
              , o = options || {};

            o = _.defaults(o, {
              'address': self.getPath('address')
            });

            if (!o.address) return self.setStatus('Address is required', {'removable': true});

            return $.getJSON(self.settings.geocode_url, o, function(data){
              self.setStatus();
              return _.each(Belt.get(data, 'data') || {}, function(v, k){
                return self.setPath(k, v);
              });
            });
          }
        , 'getAddress': function(options){
            var self = this
              , o = options || {};

            o = _.defaults(o, {
              'address': self.getPath('address')
            , 'longitude': self.getPath('longitude')
            , 'latitude': self.getPath('latitude')
            });

            if (!Belt.isNull(o.latitude) && !Belt.isNull(o.longitude))
              return $.getJSON(self.settings.reverse_geocode_url, o, function(data){
                self.setStatus();
                return _.each(Belt.get(data, 'data') || {}, function(v, k){
                  return self.setPath(k, v);
                });
              });

            if (!o.address) return self.setStatus('Address  or latitude/longitude are required', {'removable': true});

            return $.getJSON(self.settings.geocode_url, o, function(data){
              self.setStatus();
              return _.each(Belt.get(data, 'data') || {}, function(v, k){
                return self.setPath(k, v);
              });
            });
          }
        }
      , 'events': {
          'click .header button.current': function(e){
            e.preventDefault();
            return this.getCurrentLocation();
          }
        , 'click .header button.track': function(e){
            e.preventDefault();
            return this.trackLocation(e);
          }
        , 'click .header button.untrack': function(e){
            e.preventDefault();
            return this.stopTrackingLocation(e);
          }
        , 'click .header button.coordinates': function(e){
            e.preventDefault();
            return this.getCoordinates();
          }
        , 'click .header button.address': function(e){
            e.preventDefault();
            return this.getAddress();
          }
        }
      }, o);

      o = _.defaults(o, {

      });

      o = _.defaults(o, {

      });

      var self = B.objectControl(o);

      return self;
    };

  /*
    WYSIWYG editor
  */

  /*
    File upload
  */

  /*
    Braintree account
  */

  /*
    Braintree payment method
  */

  /*
    Select box with url of options
  */

    return B;
  };

  this._$ = new _$();

}).call(this);

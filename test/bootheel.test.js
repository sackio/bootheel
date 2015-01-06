var gb = {};

suite('dom-chaining', function(){
  setup(function(){
    return $('#fixture').html('');
  });
  teardown(function(){
    return $('#fixture').html('');
  });

  test('el', function(done){
    gb.el = _$.el({'tag': 'div', 'id': 'alert', 'class': ['alert', 'alert-success']}, 'test alert');
    gb.el.$().appendTo('#fixture');

    assert.ok(gb.el.render(true));
    assert.ok($('#fixture').html());
    assert.ok(Belt.deepEqual(gb.el.render(true), $('#fixture').html()));
    assert.ok($('#fixture').find('div').length === 1);
    assert.ok($('#fixture').find('div#alert.alert.alert-success').length === 1);
    assert.ok(gb.el.$().html() === 'test alert');

    return done();
  });

  test('el-tag', function(done){
    gb.el = _$.el({'tag': 'li'});
    gb.el.$().appendTo('#fixture');

    assert.ok(gb.el.render(true));
    assert.ok($('#fixture').html());
    assert.ok(Belt.deepEqual(gb.el.render(true), $('#fixture').html()));
    assert.ok($('#fixture').find('li').length === 1);
    assert.ok(gb.el.$().html() === '');

    return done();
  });

  test('el-id', function(done){
    gb.el = _$.el({'tag': 'form', 'id': 'test'});
    gb.el.$().appendTo('#fixture');

    assert.ok(gb.el.render(true));
    assert.ok($('#fixture').html());
    assert.ok(Belt.deepEqual(gb.el.render(true), $('#fixture').html()));
    assert.ok($('#fixture').find('form#test').length === 1);
    assert.ok(gb.el.$().html() === '');

    return done();
  });

  test('el-class', function(done){
    gb.el = _$.el({'tag': 'form', 'class': 'test'});
    gb.el.$().appendTo('#fixture');

    assert.ok(gb.el.render(true));
    assert.ok($('#fixture').html());
    assert.ok(Belt.deepEqual(gb.el.render(true), $('#fixture').html()));
    assert.ok($('#fixture').find('form.test').length === 1);
    assert.ok(gb.el.$().html() === '');

    return done();
  });

  test('el-class-2', function(done){
    gb.el = _$.el({'tag': 'form', 'class': ['test']});
    gb.el.$().appendTo('#fixture');

    assert.ok(gb.el.render(true));
    assert.ok($('#fixture').html());
    assert.ok(Belt.deepEqual(gb.el.render(true), $('#fixture').html()));
    assert.ok($('#fixture').find('form.test').length === 1);
    assert.ok(gb.el.$().html() === '');

    return done();
  });

  test('el-class-3', function(done){
    gb.el = _$.el({'tag': 'form', 'class': ['test', 'a', 'dom']});
    gb.el.$().appendTo('#fixture');

    assert.ok(gb.el.render(true));
    assert.ok($('#fixture').html());
    assert.ok(Belt.deepEqual(gb.el.render(true), $('#fixture').html()));
    assert.ok($('#fixture').find('form.test.a.dom').length === 1);
    assert.ok(gb.el.$().html() === '');

    return done();
  });

  test('el-class-4', function(done){
    gb.el = _$.el({'tag': 'form', 'class': ['test a', 'frog']});
    gb.el.$().appendTo('#fixture');

    assert.ok(gb.el.render(true));
    assert.ok($('#fixture').html());
    assert.ok(Belt.deepEqual(gb.el.render(true), $('#fixture').html()));
    assert.ok($('#fixture').find('form.test.a.frog').length === 1);
    assert.ok(gb.el.$().html() === '');

    return done();
  });

  test('el-attr', function(done){
    gb.el = _$.el({'tag': 'form', 'attr': {'cols': 12, 'height': 900, 'name': 'test', 'object': {'dog': 'cat'}}});
    gb.dom = gb.el.$();

    assert.ok(gb.dom.attr('cols') === '12');
    assert.ok(gb.dom.attr('height') === '900');
    assert.ok(gb.dom.attr('name') === 'test');
    assert.ok(Belt.deepEqual(gb.dom.attr('object'), Belt.stringify({'dog': 'cat'})));

    gb.dom.appendTo('#fixture');
    assert.ok(gb.el.render(true));
    assert.ok($('#fixture').html());
    assert.ok(Belt.deepEqual(gb.el.render(true), $('#fixture').html()));
    assert.ok($('#fixture').find('form[cols="12"][height="900"]').length === 1);
    assert.ok(gb.dom.html() === '');

    return done();
  });

  test('el-data', function(done){
    gb.el = _$.el({'tag': 'form', 'data': {'cols': 12, 'height': 900, 'name': 'test', 'object': {'dog': 'cat'}}});
    gb.dom = gb.el.$();

    assert.ok(gb.dom.data('cols') === 12);
    assert.ok(gb.dom.data('height') === 900);
    assert.ok(gb.dom.data('name') === 'test');
    assert.ok(Belt.deepEqual(gb.dom.data('object'), {'dog': 'cat'}));

    gb.dom.appendTo('#fixture');
    assert.ok(gb.el.render(true));
    assert.ok($('#fixture').html());
    assert.ok(Belt.deepEqual(gb.el.render(true), $('#fixture').html()));
    assert.ok($('#fixture').find('form[data-cols="12"][data-height="900"]').length === 1);
    assert.ok(gb.dom.html() === '');

    return done();
  });

  test('el-style', function(done){
    gb.el = _$.el({'tag': 'form', 'style': {'color': 'red', 'height': '900px'}});
    gb.dom = gb.el.$();

    assert.ok(gb.dom.css('color') === 'red');
    assert.ok(gb.dom.css('height') === '900px');

    gb.dom.appendTo('#fixture');
    assert.ok(gb.el.render(true));
    assert.ok($('#fixture').html());
    assert.ok(Belt.deepEqual(gb.el.render(true), $('#fixture').html()));
    assert.ok($('#fixture').find('form').length === 1);
    assert.ok(gb.dom.html() === '');

    return done();
  });

  test('el-closing', function(done){
    gb.el = _$.el({'tag': 'form', '_$settings': {'close': false}});
    assert.ok(gb.el.render(true) === '<form>');

    gb.el = _$.el({'tag': 'form', '_$settings': {'close': true}});
    assert.ok(gb.el.render(true) === '<form></form>');

    return done();
  });

  test('el-html', function(done){
    gb.el = _$.el({'tag': 'form'}, 'This is a <%= tag %>');
    gb.dom = gb.el.$();

    assert.ok(gb.dom.html() === 'This is a form');

    return done();
  });

  test('el-html-2', function(done){
    gb.el = _$.el({'tag': 'form'}, ['This is a <%= tag %>', ' and also a <%= tag %>'
    , 12, function(el){ return el.tag; }, $('<div class="hi"></div>'), {'tag': 'form'}]);

    gb.dom = gb.el.$();

    assert.ok(gb.dom.html() === 'This is a form and also a form12form<div class="hi"></div><form></form>');

    assert.ok('<form>' + gb.dom.html() + '</form>' === gb.el.render(true));

    return done();
  });

  test('el-no-opts', function(done){
    gb.el = _$.el('This is a <%= tag %>');
    gb.dom = gb.el.$();

    assert.ok(gb.dom.html() === 'This is a div');

    return done();
  });

  test('el-dom-methods', function(done){
    gb.el = _$.div('This is a dom <%= tag %>');
    gb.dom = gb.el.$(true);

    assert.ok(gb.dom.prop('outerHTML') === '<div>This is a dom div</div>');

    return done();
  });

  test('el-dom-methods-2', function(done){
    gb.el = _$.li({'class': 'abc'}, 'This is a dom <%= tag %>');
    gb.dom = gb.el.$();

    assert.ok(gb.dom.prop('outerHTML') === '<li class="abc">This is a dom li</li>');

    return done();
  });

  test('el-dom-methods-3', function(done){
    gb.el = _$.br({'class': 'abc'});
    gb.dom = gb.el.$();

    assert.ok(gb.dom.prop('outerHTML') === '<br class="abc">');

    return done();
  });

  test('el-nested', function(done){
    gb.el = _$.div({'class': 'abc'}).div({'class': 'def'}).li({'id': 'ghi'}, 'jklmnop');
    gb.dom = gb.el.$(true);

    assert.ok(gb.dom.prop('outerHTML') === '<div class="abc"><div class="def"><li id="ghi">jklmnop</li></div></div>');
    assert.ok(gb.el.render() === '<li id="ghi">jklmnop</li>');
    assert.ok(gb.el.start().class === 'abc');
    assert.ok(gb.el.render(true) === '<div class="abc"><div class="def"><li id="ghi">jklmnop</li></div></div>');
    return done();
  });

  test('el-nested-2', function(done){
    gb.el = _$.div({'class': 'abc'}).ul({'class': 'def'}, [_$.li({'id': 'ghi'}, 'jklmnop'), _$.li({'id': 'ghi2'}).a()]);
    gb.dom = gb.el.$(true);

    assert.ok(gb.dom.prop('outerHTML') === '<div class="abc"><ul class="def"><li id="ghi">jklmnop</li><li id="ghi2"><a></a></li></ul></div>');
    assert.ok(gb.el.start().class === 'abc');
    assert.ok(gb.el.render(true) === '<div class="abc"><ul class="def"><li id="ghi">jklmnop</li><li id="ghi2"><a></a></li></ul></div>');
    return done();
  });

  test('el-nested-3', function(done){
    gb.el = _$.div({'class': '1'}, [
      _$.ul({'class': '2'}, [_$.li({'class': '3'}, 'abc'), _$.li({'class': '4'}).a({'class': '5'}).span({'class': '5'}, 'span')])
    , _$.ul({'class': '2'}, [_$.li({'class': '3'}, 'abc'), _$.li({'class': '4'}).a({'class': '5'}).span({'class': '5'}, 'span')])
    , _$.hr()
    , 'this is html'
    ]);

    assert.ok(gb.el.render(true) === '<div class="1"><ul class="2"><li class="3">abc</li><li class="4"><a class="5"><span class="5">span</span></a></li></ul><ul class="2"><li class="3">abc</li><li class="4"><a class="5"><span class="5">span</span></a></li></ul><hr>this is html</div>');

    gb.dom = gb.el.$(true);

    assert.ok(gb.dom.prop('outerHTML') === '<div class="1"><ul class="2"><li class="3">abc</li><li class="4"><a class="5"><span class="5">span</span></a></li></ul><ul class="2"><li class="3">abc</li><li class="4"><a class="5"><span class="5">span</span></a></li></ul><hr>this is html</div>');
    assert.ok(gb.el.start().class === '1');

    return done();
  });

  test('el-transformers', function(done){
    gb.el = _$.input({'value': 60, 'attr': {'type': 'number'}
    , '_$transformers': [
      function(){ return this.attr.value = this.value; }
    , function(){ return this.data.value = this.attr.value; }
    ]});

    assert.ok(gb.el.render(true) === '<input type="number" value="60" data-value="60">');

    gb.dom = gb.el.$(true);

    assert.ok(gb.dom.prop('outerHTML') === '<input type="number" value="60" data-value="60">');

    return done();
  });

  test('el-transformers-2', function(done){
    gb.el = _$.div().input({'value': 60, 'attr': {'type': 'number'}
    , '_$transformers': [
      function(){ return this.attr.value = this.value; }
    , function(){ return this.data.value = this.attr.value; }
    ]});

    assert.ok(gb.el.render(true) === '<div><input type="number" value="60" data-value="60"></div>');

    gb.dom = gb.el.$(true);

    assert.ok(gb.dom.prop('outerHTML') === '<div><input type="number" value="60" data-value="60"></div>');

    return done();
  });

  test('el-append', function(done){
    gb.el = _$.div().append(function(){
      if (this.tag === 'div') return _$.input({'attr': {'type': 'number'}});
      return '';
    });

    assert.ok(gb.el.render(true) === '<div><input type="number"></div>');

    gb.dom = gb.el.$(true);

    assert.ok(gb.dom.prop('outerHTML') === '<div><input type="number"></div>');

    gb.el = _$.div().append(function(){
      return ['some html', ' ', 'some more'];
    });

    assert.ok(gb.el.render(true) === '<div>some html some more</div>');

    gb.dom = gb.el.$(true);

    assert.ok(gb.dom.prop('outerHTML') === '<div>some html some more</div>');


    return done();
  });
});

suite('views', function(){
  setup(function(){
    return $('#fixture').html('');
  });
  teardown(function(){
    return $('#fixture').html('');
  });

  gb = {
    'basic': function(){
      return {
        'control': 'basic'
      , 'tag': 'section'
      , 'name': 'basic-control'
      , 'views': {
          'child1': _$.div({'class': ['child1']})
        , 'child2': _$.section({'id': 'child2'}, 'html')
        }
      , 'attr': {
          'data-test': true
        , 'name': 'foobar'
        }
      , 'layout': ['child1', 'child2']
      };
    }
  , 'nested': function(){
      return {
        'control': 'nested'
      , 'tag': 'section'
      , 'name': 'nested-control'
      , 'subviews_path': 'views.childb'
      , 'views': {
          'childa': _$.view(Belt.extend(gb.basic(), {'attr': {'id': 'childa'}}))
        , 'childb': _$.view(Belt.extend(gb.basic(), {'attr': {'id': 'childb'}}))
        }
      , 'attr': {
          'data-test': true
        , 'name': 'foobar'
        }
      , 'layout': ['childa', 'childb']
      };
    }
  , 'deepNested': function(){
      return {
        'control': 'deepnested'
      , 'tag': 'section'
      , 'name': 'deepnested-control'
      , 'subviews_path': 'views.child1a'
      , 'views': {
          'child1a': _$.view(Belt.extend(gb.nested(), {'attr': {'id': 'child1a'}}))
        , 'child1b': _$.view(Belt.extend(gb.nested(), {'attr': {'id': 'child1b'}}))
        }
      , 'attr': {
          'data-test': true
        , 'name': 'foobar'
        }
      , 'layout': ['child1a', 'child1b']
      };
    }
  };

  test('basic-subview-crud', function(done){
    gb.el = new _$.view(gb.basic());
    assert.ok(Belt.deepEqual(_.keys(gb.el.views), ['child1', 'child2']));

    $('#fixture').append(gb.el.$el);

    assert.ok($('#fixture section[data-control="basic"][data-name="basic-control"]').length === 1);
    assert.ok($('#fixture section[data-control="basic"][data-name="basic-control"] div.child1').length === 0);

    gb.el.render();

    assert.ok($('#fixture section[data-control="basic"][data-name="basic-control"]').length === 1);
    assert.ok($('#fixture section[data-control="basic"][data-name="basic-control"] > div.child1').length === 1);
    assert.ok($('#fixture section[data-control="basic"][data-name="basic-control"] > div.child1').index() === 0);
    assert.ok($('#fixture section[data-control="basic"][data-name="basic-control"] > section#child2').length === 1);
    assert.ok($('#fixture section[data-control="basic"][data-name="basic-control"] > section#child2').index() === 1);
    assert.ok($('#fixture section[data-control="basic"][data-name="basic-control"] > section#child2').html() === 'html');

    assert.ok(gb.el.subPath() === '');
    assert.ok(gb.el.subPath({'path': 'test'}) === 'test.');
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(gb.el.views)));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), gb.el.layout));
    assert.ok(gb.el.getView('child1').$(true).prop('tagName') === 'DIV');
    assert.ok(gb.el.getView('child2').$(true).prop('tagName') === 'SECTION');
    assert.ok(!gb.el.getView('not real'));
    assert.ok(gb.el.getView('child1').parents['child1'].$el.data('control') === 'basic');
    assert.ok(gb.el.getView('child2').parents['child2'].$el.data('name') === 'basic-control');
    assert.ok(!gb.el.getView('child2').parents['child1']);

    //adding view with no index (to end of layout)
    gb.sel = new _$.view(gb.basic());

    gb.el.setView('child3', gb.sel);

    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(gb.el.views)));
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child1', 'child2', 'child3']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child1', 'child2', 'child3']));
    assert.ok(gb.el.getView('child3').parents['child3'].$el.data('control') === 'basic');
    assert.ok(gb.el.$el.children().length === 3);
    assert.ok(gb.el.$el.children().length === 3);
    assert.ok(gb.el.getView('child3').$el.data('control') === 'basic');
    assert.ok(gb.el.getView('child3').$el.data('name') === 'basic-control')
    assert.ok(gb.el.getView('child3').$el.children().length === 2)
    assert.ok(gb.el.$('> :nth-child(3)').data('control') === 'basic');
    assert.ok(gb.el.$('> :nth-child(3)').data('name') === 'basic-control');

    //adding view with index to middle of layout
    gb.attr = gb.basic();
    gb.attr.attributes = {'id': 'child4'};
    gb.sel = new _$.view(gb.attr);

    gb.el.setView('child4', gb.sel, {'index': 1});

    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(gb.el.views)));
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child1', 'child2', 'child3', 'child4']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child1', 'child4', 'child2', 'child3']));
    assert.ok(gb.el.getView('child4').parents['child4'].$el.data('control') === 'basic');
    assert.ok(gb.el.$el.children().length === 4);
    assert.ok(gb.el.$el.children().length === 4);
    assert.ok(gb.el.getView('child4').$el.data('control') === 'basic');
    assert.ok(gb.el.getView('child4').$el.data('name') === 'basic-control')
    assert.ok(gb.el.getView('child4').$el.children().length === 2)

    assert.ok(gb.el.$('> :nth-child(1)').hasClass('child1'));
    assert.ok(gb.el.$('> :nth-child(2)').data('control') === 'basic');
    assert.ok(gb.el.$('> :nth-child(2)').prop('id') === 'child4');
    assert.ok(gb.el.$('> :nth-child(3)').prop('id') === 'child2');
    assert.ok(gb.el.$('> :nth-child(4)').data('control') === 'basic');
    assert.ok(gb.el.$('> :nth-child(4)').data('name') === 'basic-control');

    //adding view to start of layout - adding dom element
    gb.sel = _$.a({'attr': {'href': '/testing'}, 'id': 'child5'});

    gb.el.setView('child5', gb.sel, {'index': 0});

    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(gb.el.views)));
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child1', 'child2', 'child3', 'child4', 'child5']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child5', 'child1', 'child4', 'child2', 'child3']));
    assert.ok(gb.el.getView('child5').parents['child5'].$el.data('control') === 'basic');
    assert.ok(gb.el.$el.children().length === 5);
    assert.ok(gb.el.$el.children().length === 5);

    assert.ok(gb.el.$('> :nth-child(1)').prop('id') === 'child5');
    assert.ok(gb.el.$('> :nth-child(1)').prop('tagName') === 'A');
    assert.ok(gb.el.$('> :nth-child(2)').hasClass('child1'));
    assert.ok(gb.el.$('> :nth-child(3)').data('control') === 'basic');
    assert.ok(gb.el.$('> :nth-child(3)').prop('id') === 'child4');
    assert.ok(gb.el.$('> :nth-child(4)').prop('id') === 'child2');
    assert.ok(gb.el.$('> :nth-child(5)').data('control') === 'basic');
    assert.ok(gb.el.$('> :nth-child(5)').data('name') === 'basic-control');

    assert.ok(gb.el.getViewIndex('child1') === 1);
    assert.ok(gb.el.getViewIndex('child2') === 3);
    assert.ok(gb.el.getViewIndex('child3') === 4);
    assert.ok(gb.el.getViewIndex('child4') === 2);
    assert.ok(gb.el.getViewIndex('child5') === 0);

    //replacing view - no index
    gb.sel = _$.img({'attr': {'src': '#'}, 'id': 'new-child5'});

    gb.el.setView('child5', gb.sel);

    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(gb.el.views)));
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child1', 'child2', 'child3', 'child4', 'child5']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child5', 'child1', 'child4', 'child2', 'child3']));
    assert.ok(gb.el.getView('child5').parents['child5'].$el.data('control') === 'basic');
    assert.ok(gb.el.$el.children().length === 5);
    assert.ok(gb.el.$el.children().length === 5);

    assert.ok(gb.el.$('> :nth-child(1)').prop('id') === 'new-child5');
    assert.ok(gb.el.$('> :nth-child(1)').prop('tagName') === 'IMG');
    assert.ok(gb.el.$('> :nth-child(2)').hasClass('child1'));
    assert.ok(gb.el.$('> :nth-child(3)').data('control') === 'basic');
    assert.ok(gb.el.$('> :nth-child(3)').prop('id') === 'child4');
    assert.ok(gb.el.$('> :nth-child(4)').prop('id') === 'child2');
    assert.ok(gb.el.$('> :nth-child(5)').data('control') === 'basic');
    assert.ok(gb.el.$('> :nth-child(5)').data('name') === 'basic-control');

    assert.ok(gb.el.getViewIndex('child1') === 1);
    assert.ok(gb.el.getViewIndex('child2') === 3);
    assert.ok(gb.el.getViewIndex('child3') === 4);
    assert.ok(gb.el.getViewIndex('child4') === 2);
    assert.ok(gb.el.getViewIndex('child5') === 0);

    //replacing view - with index
    gb.sel = _$.img({'attr': {'src': '#'}, 'id': 'new-child1'});

    gb.el.setView('child1', gb.sel, {'index': 3});

    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(gb.el.views)));
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child1', 'child2', 'child3', 'child4', 'child5']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child5', 'child4', 'child2', 'child1', 'child3']));
    assert.ok(gb.el.getView('child1').parents['child1'].$el.data('control') === 'basic');
    assert.ok(gb.el.$el.children().length === 5);
    assert.ok(gb.el.$el.children().length === 5);

    assert.ok(gb.el.$('> :nth-child(1)').prop('id') === 'new-child5');
    assert.ok(gb.el.$('> :nth-child(1)').prop('tagName') === 'IMG');
    assert.ok(!gb.el.$('> :nth-child(4)').hasClass('child1'));
    assert.ok(gb.el.$('> :nth-child(4)').prop('id') === 'new-child1');
    assert.ok(gb.el.$('> :nth-child(2)').data('control') === 'basic');
    assert.ok(gb.el.$('> :nth-child(2)').prop('id') === 'child4');
    assert.ok(gb.el.$('> :nth-child(3)').prop('id') === 'child2');
    assert.ok(gb.el.$('> :nth-child(5)').data('control') === 'basic');
    assert.ok(gb.el.$('> :nth-child(5)').data('name') === 'basic-control');

    assert.ok(gb.el.getViewIndex('child1') === 3);
    assert.ok(gb.el.getViewIndex('child2') === 2);
    assert.ok(gb.el.getViewIndex('child3') === 4);
    assert.ok(gb.el.getViewIndex('child4') === 1);
    assert.ok(gb.el.getViewIndex('child5') === 0);

    //delete view
    gb.el.deleteView('child1');

    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(gb.el.views)));
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child2', 'child3', 'child4', 'child5']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child5', 'child4', 'child2', 'child3']));
    assert.ok(!gb.el.getView('child1'));
    assert.ok(gb.el.$el.children().length === 4);
    assert.ok(gb.el.$el.children().length === 4);

    assert.ok(gb.el.$('> :nth-child(1)').prop('id') === 'new-child5');
    assert.ok(gb.el.$('> :nth-child(1)').prop('tagName') === 'IMG');
    assert.ok(gb.el.$('> :nth-child(2)').data('control') === 'basic');
    assert.ok(gb.el.$('> :nth-child(2)').prop('id') === 'child4');
    assert.ok(gb.el.$('> :nth-child(3)').prop('id') === 'child2');
    assert.ok(gb.el.$('> :nth-child(4)').data('control') === 'basic');
    assert.ok(gb.el.$('> :nth-child(4)').data('name') === 'basic-control');

    assert.ok(gb.el.getViewIndex('child1') === -1);
    assert.ok(gb.el.getViewIndex('child2') === 2);
    assert.ok(gb.el.getViewIndex('child3') === 3);
    assert.ok(gb.el.getViewIndex('child4') === 1);
    assert.ok(gb.el.getViewIndex('child5') === 0);

    //delete view - nonexistent
    gb.el.deleteView('child123123');

    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(gb.el.views)));
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child2', 'child3', 'child4', 'child5']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child5', 'child4', 'child2', 'child3']));
    assert.ok(!gb.el.getView('child1'));
    assert.ok(gb.el.$el.children().length === 4);
    assert.ok(gb.el.$el.children().length === 4);

    assert.ok(gb.el.$('> :nth-child(1)').prop('id') === 'new-child5');
    assert.ok(gb.el.$('> :nth-child(1)').prop('tagName') === 'IMG');
    assert.ok(gb.el.$('> :nth-child(2)').data('control') === 'basic');
    assert.ok(gb.el.$('> :nth-child(2)').prop('id') === 'child4');
    assert.ok(gb.el.$('> :nth-child(3)').prop('id') === 'child2');
    assert.ok(gb.el.$('> :nth-child(4)').data('control') === 'basic');
    assert.ok(gb.el.$('> :nth-child(4)').data('name') === 'basic-control');

    assert.ok(gb.el.getViewIndex('child123123') === -1);
    assert.ok(gb.el.getViewIndex('child2') === 2);
    assert.ok(gb.el.getViewIndex('child3') === 3);
    assert.ok(gb.el.getViewIndex('child4') === 1);
    assert.ok(gb.el.getViewIndex('child5') === 0);

    //move view
    gb.el.moveView('child5', 2);

    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(gb.el.views)));
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child2', 'child3', 'child4', 'child5']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child4', 'child2', 'child5', 'child3']));
    assert.ok(!gb.el.getView('child1'));
    assert.ok(gb.el.$el.children().length === 4);
    assert.ok(gb.el.$el.children().length === 4);

    assert.ok(gb.el.$('> :nth-child(3)').prop('id') === 'new-child5');
    assert.ok(gb.el.$('> :nth-child(3)').prop('tagName') === 'IMG');
    assert.ok(gb.el.$('> :nth-child(1)').data('control') === 'basic');
    assert.ok(gb.el.$('> :nth-child(1)').prop('id') === 'child4');
    assert.ok(gb.el.$('> :nth-child(2)').prop('id') === 'child2');
    assert.ok(gb.el.$('> :nth-child(4)').data('control') === 'basic');
    assert.ok(gb.el.$('> :nth-child(4)').data('name') === 'basic-control');

    assert.ok(gb.el.getViewIndex('child1') === -1);
    assert.ok(gb.el.getViewIndex('child2') === 1);
    assert.ok(gb.el.getViewIndex('child3') === 3);
    assert.ok(gb.el.getViewIndex('child4') === 0);
    assert.ok(gb.el.getViewIndex('child5') === 2);

    //move view - nonexistent
    gb.el.moveView('child5342523452345', 2);

    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(gb.el.views)));
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child2', 'child3', 'child4', 'child5']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child4', 'child2', 'child5', 'child3']));
    assert.ok(!gb.el.getView('child5342523452345'));
    assert.ok(gb.el.$el.children().length === 4);
    assert.ok(gb.el.$el.children().length === 4);

    assert.ok(gb.el.$('> :nth-child(3)').prop('id') === 'new-child5');
    assert.ok(gb.el.$('> :nth-child(3)').prop('tagName') === 'IMG');
    assert.ok(gb.el.$('> :nth-child(1)').data('control') === 'basic');
    assert.ok(gb.el.$('> :nth-child(1)').prop('id') === 'child4');
    assert.ok(gb.el.$('> :nth-child(2)').prop('id') === 'child2');
    assert.ok(gb.el.$('> :nth-child(4)').data('control') === 'basic');
    assert.ok(gb.el.$('> :nth-child(4)').data('name') === 'basic-control');

    assert.ok(gb.el.getViewIndex('child5342523452345') === -1);
    assert.ok(gb.el.getViewIndex('child2') === 1);
    assert.ok(gb.el.getViewIndex('child3') === 3);
    assert.ok(gb.el.getViewIndex('child4') === 0);
    assert.ok(gb.el.getViewIndex('child5') === 2);

    assert.ok(gb.el.getView('child5'));
    assert.ok(!gb.el.getView('child5b'));
    gb.el.renameView('child5', 'child5b');
    assert.ok(gb.el.getViewIndex('child5') === -1);
    assert.ok(gb.el.getViewIndex('child5b') === 2);
    assert.ok(!gb.el.getView('child5'));
    assert.ok(gb.el.getView('child5b'));

    return done();
  });

  test('nested-subview-crud', function(done){
    gb.el = new _$.view(gb.nested());
    assert.ok(Belt.deepEqual(_.keys(gb.el.views), ['childa', 'childb']));

    $('#fixture').append(gb.el.$el);

    assert.ok($('#fixture section[data-control="nested"][data-name="nested-control"]').length === 1);
    assert.ok($('#fixture section[data-control="nested"][data-name="nested-control"] #childa').length === 0);

    gb.el.render();

    assert.ok($('#fixture section[data-control="nested"][data-name="nested-control"]').length === 1);
    assert.ok($('#fixture section[data-control="nested"][data-name="nested-control"] > section#childa > div.child1').length === 1);
    assert.ok($('#fixture section[data-control="nested"][data-name="nested-control"] > section#childb > div.child1').length === 1);
    assert.ok($('#fixture section[data-control="nested"][data-name="nested-control"] > section#childa > section#child2').length === 1);
    assert.ok($('#fixture section[data-control="nested"][data-name="nested-control"] > section#childb > section#child2').length === 1);

    assert.ok($('#fixture section[data-control="nested"][data-name="nested-control"] > section#childa > div.child1').index() === 0);
    assert.ok($('#fixture section[data-control="nested"][data-name="nested-control"] > section#childb > div.child1').index() === 0);
    assert.ok($('#fixture section[data-control="nested"][data-name="nested-control"] > section#childa > section#child2').index() === 1);
    assert.ok($('#fixture section[data-control="nested"][data-name="nested-control"] > section#childb > section#child2').index() === 1);

    assert.ok($('#fixture section[data-control="nested"][data-name="nested-control"] > section#childa > section#child2').html() === 'html');
    assert.ok($('#fixture section[data-control="nested"][data-name="nested-control"] > section#childb > section#child2').html() === 'html');

    assert.ok(gb.el.subPath() === 'views.childb.');
    assert.ok(gb.el.subPath({'path': 'test'}) === 'test.');
    assert.ok(!Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(gb.el.views)));
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(Belt.get(gb.el, 'views.childb.views'))));
    assert.ok(!Belt.deepEqual(gb.el.getLayout(), gb.el.layout));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), gb.el.views.childb.layout));
    assert.ok(gb.el.getView('child1').$(true).prop('tagName') === 'DIV');
    assert.ok(gb.el.getView('child2').$(true).prop('tagName') === 'SECTION');
    assert.ok(!gb.el.getView('not real'));
    assert.ok(gb.el.getView('child1').parents['child1'].$el.data('control') === 'basic');
    assert.ok(gb.el.getView('child2').parents['child2'].$el.data('name') === 'basic-control');
    assert.ok(!gb.el.getView('child2').parents['child1']);

    //adding view with no index (to end of layout)
    gb.sel = new _$.view(gb.basic());

    gb.el.setView('child3', gb.sel);

    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(gb.el.views.childb.views)));
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child1', 'child2', 'child3']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child1', 'child2', 'child3']));
    assert.ok(gb.el.getView('child3').parents['child3'].$el.data('control') === 'nested');
    assert.ok(gb.el.$el.children().length === 2);
    assert.ok(gb.el.getEl().children().length === 3);
    assert.ok(gb.el.getView('child3').$el.data('control') === 'basic');
    assert.ok(gb.el.getView('child3').$el.data('name') === 'basic-control')
    assert.ok(gb.el.getView('child3').$el.children().length === 2)
    assert.ok(gb.el.getEl().find('> :nth-child(3)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(3)').data('name') === 'basic-control');

    //adding view with index to middle of layout
    gb.attr = gb.basic();
    gb.attr.attributes = {'id': 'child4'};
    gb.sel = new _$.view(gb.attr);

    gb.el.setView('child4', gb.sel, {'index': 1});

    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(gb.el.views.childb.views)));
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child1', 'child2', 'child3', 'child4']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child1', 'child4', 'child2', 'child3']));
    assert.ok(gb.el.getView('child4').parents['child4'].$el.data('control') === 'nested');
    assert.ok(gb.el.$el.children().length === 2);
    assert.ok(gb.el.getEl().children().length === 4);
    assert.ok(gb.el.getView('child4').$el.data('control') === 'basic');
    assert.ok(gb.el.getView('child4').$el.data('name') === 'basic-control')
    assert.ok(gb.el.getView('child4').$el.children().length === 2)

    assert.ok(gb.el.getEl().find('> :nth-child(1)').hasClass('child1'));
    assert.ok(gb.el.getEl().find('> :nth-child(2)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(2)').prop('id') === 'child4');
    assert.ok(gb.el.getEl().find('> :nth-child(3)').prop('id') === 'child2');
    assert.ok(gb.el.getEl().find('> :nth-child(4)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(4)').data('name') === 'basic-control');

    //adding view to start of layout - adding dom element
    gb.sel = _$.a({'attr': {'href': '/testing'}, 'id': 'child5'});

    gb.el.setView('child5', gb.sel, {'index': 0});

    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(gb.el.views.childb.views)));
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child1', 'child2', 'child3', 'child4', 'child5']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child5', 'child1', 'child4', 'child2', 'child3']));
    assert.ok(gb.el.getView('child5').parents['child5'].$el.data('control') === 'nested');
    assert.ok(gb.el.$el.children().length === 2);
    assert.ok(gb.el.getEl().children().length === 5);

    assert.ok(gb.el.getEl().find('> :nth-child(1)').prop('id') === 'child5');
    assert.ok(gb.el.getEl().find('> :nth-child(1)').prop('tagName') === 'A');
    assert.ok(gb.el.getEl().find('> :nth-child(2)').hasClass('child1'));
    assert.ok(gb.el.getEl().find('> :nth-child(3)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(3)').prop('id') === 'child4');
    assert.ok(gb.el.getEl().find('> :nth-child(4)').prop('id') === 'child2');
    assert.ok(gb.el.getEl().find('> :nth-child(5)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(5)').data('name') === 'basic-control');

    assert.ok(gb.el.getViewIndex('child1') === 1);
    assert.ok(gb.el.getViewIndex('child2') === 3);
    assert.ok(gb.el.getViewIndex('child3') === 4);
    assert.ok(gb.el.getViewIndex('child4') === 2);
    assert.ok(gb.el.getViewIndex('child5') === 0);

    //replacing view - no index
    gb.sel = _$.img({'attr': {'src': '#'}, 'id': 'new-child5'});

    gb.el.setView('child5', gb.sel);

    assert.ok(!Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(gb.el.views)));
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(gb.el.views.childb.views)));
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child1', 'child2', 'child3', 'child4', 'child5']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child5', 'child1', 'child4', 'child2', 'child3']));
    assert.ok(gb.el.getView('child5').parents['child5'].$el.data('control') === 'nested');
    assert.ok(gb.el.$el.children().length === 2);
    assert.ok(gb.el.getEl().children().length === 5);

    assert.ok(gb.el.getEl().find('> :nth-child(1)').prop('id') === 'new-child5');
    assert.ok(gb.el.getEl().find('> :nth-child(1)').prop('tagName') === 'IMG');
    assert.ok(gb.el.getEl().find('> :nth-child(2)').hasClass('child1'));
    assert.ok(gb.el.getEl().find('> :nth-child(3)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(3)').prop('id') === 'child4');
    assert.ok(gb.el.getEl().find('> :nth-child(4)').prop('id') === 'child2');
    assert.ok(gb.el.getEl().find('> :nth-child(5)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(5)').data('name') === 'basic-control');

    assert.ok(gb.el.getViewIndex('child1') === 1);
    assert.ok(gb.el.getViewIndex('child2') === 3);
    assert.ok(gb.el.getViewIndex('child3') === 4);
    assert.ok(gb.el.getViewIndex('child4') === 2);
    assert.ok(gb.el.getViewIndex('child5') === 0);

    //replacing view - with index
    gb.sel = _$.img({'attr': {'src': '#'}, 'id': 'new-child1'});

    gb.el.setView('child1', gb.sel, {'index': 3});

    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child1', 'child2', 'child3', 'child4', 'child5']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child5', 'child4', 'child2', 'child1', 'child3']));
    assert.ok(gb.el.getView('child1').parents['child1'].$el.data('control') === 'nested');
    assert.ok(gb.el.$el.children().length === 2);
    assert.ok(gb.el.getEl().children().length === 5);

    assert.ok(gb.el.getEl().find('> :nth-child(1)').prop('id') === 'new-child5');
    assert.ok(gb.el.getEl().find('> :nth-child(1)').prop('tagName') === 'IMG');
    assert.ok(!gb.el.getEl().find('> :nth-child(4)').hasClass('child1'));
    assert.ok(gb.el.getEl().find('> :nth-child(4)').prop('id') === 'new-child1');
    assert.ok(gb.el.getEl().find('> :nth-child(2)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(2)').prop('id') === 'child4');
    assert.ok(gb.el.getEl().find('> :nth-child(3)').prop('id') === 'child2');
    assert.ok(gb.el.getEl().find('> :nth-child(5)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(5)').data('name') === 'basic-control');

    assert.ok(gb.el.getViewIndex('child1') === 3);
    assert.ok(gb.el.getViewIndex('child2') === 2);
    assert.ok(gb.el.getViewIndex('child3') === 4);
    assert.ok(gb.el.getViewIndex('child4') === 1);
    assert.ok(gb.el.getViewIndex('child5') === 0);

    //delete view
    gb.el.deleteView('child1');

    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child2', 'child3', 'child4', 'child5']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child5', 'child4', 'child2', 'child3']));
    assert.ok(!gb.el.getView('child1'));
    assert.ok(gb.el.getEl().children().length === 4);
    assert.ok(gb.el.getEl().children().length === 4);

    assert.ok(gb.el.getEl().find('> :nth-child(1)').prop('id') === 'new-child5');
    assert.ok(gb.el.getEl().find('> :nth-child(1)').prop('tagName') === 'IMG');
    assert.ok(gb.el.getEl().find('> :nth-child(2)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(2)').prop('id') === 'child4');
    assert.ok(gb.el.getEl().find('> :nth-child(3)').prop('id') === 'child2');
    assert.ok(gb.el.getEl().find('> :nth-child(4)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(4)').data('name') === 'basic-control');

    assert.ok(gb.el.getViewIndex('child1') === -1);
    assert.ok(gb.el.getViewIndex('child2') === 2);
    assert.ok(gb.el.getViewIndex('child3') === 3);
    assert.ok(gb.el.getViewIndex('child4') === 1);
    assert.ok(gb.el.getViewIndex('child5') === 0);

    //delete view - nonexistent
    gb.el.deleteView('child123123');

    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child2', 'child3', 'child4', 'child5']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child5', 'child4', 'child2', 'child3']));
    assert.ok(!gb.el.getView('child1'));
    assert.ok(gb.el.$el.children().length === 2);
    assert.ok(gb.el.getEl().children().length === 4);

    assert.ok(gb.el.getEl().find('> :nth-child(1)').prop('id') === 'new-child5');
    assert.ok(gb.el.getEl().find('> :nth-child(1)').prop('tagName') === 'IMG');
    assert.ok(gb.el.getEl().find('> :nth-child(2)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(2)').prop('id') === 'child4');
    assert.ok(gb.el.getEl().find('> :nth-child(3)').prop('id') === 'child2');
    assert.ok(gb.el.getEl().find('> :nth-child(4)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(4)').data('name') === 'basic-control');

    assert.ok(gb.el.getViewIndex('child123123') === -1);
    assert.ok(gb.el.getViewIndex('child2') === 2);
    assert.ok(gb.el.getViewIndex('child3') === 3);
    assert.ok(gb.el.getViewIndex('child4') === 1);
    assert.ok(gb.el.getViewIndex('child5') === 0);

    //move view
    gb.el.moveView('child5', 2);

    assert.ok(!Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(gb.el.views)));
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child2', 'child3', 'child4', 'child5']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child4', 'child2', 'child5', 'child3']));
    assert.ok(!gb.el.getView('child1'));
    assert.ok(gb.el.$el.children().length === 2);
    assert.ok(gb.el.getEl().children().length === 4);

    assert.ok(gb.el.getEl().find('> :nth-child(3)').prop('id') === 'new-child5');
    assert.ok(gb.el.getEl().find('> :nth-child(3)').prop('tagName') === 'IMG');
    assert.ok(gb.el.getEl().find('> :nth-child(1)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(1)').prop('id') === 'child4');
    assert.ok(gb.el.getEl().find('> :nth-child(2)').prop('id') === 'child2');
    assert.ok(gb.el.getEl().find('> :nth-child(4)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(4)').data('name') === 'basic-control');

    assert.ok(gb.el.getViewIndex('child1') === -1);
    assert.ok(gb.el.getViewIndex('child2') === 1);
    assert.ok(gb.el.getViewIndex('child3') === 3);
    assert.ok(gb.el.getViewIndex('child4') === 0);
    assert.ok(gb.el.getViewIndex('child5') === 2);

    //move view - nonexistent
    gb.el.moveView('child5342523452345', 2);

    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child2', 'child3', 'child4', 'child5']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child4', 'child2', 'child5', 'child3']));
    assert.ok(!gb.el.getView('child5342523452345'));
    assert.ok(gb.el.$el.children().length === 2);
    assert.ok(gb.el.getEl().children().length === 4);

    assert.ok(gb.el.$('> #childb > :nth-child(3)').prop('id') === 'new-child5');
    assert.ok(gb.el.$('> #childb > :nth-child(3)').prop('tagName') === 'IMG');
    assert.ok(gb.el.$('> #childb > :nth-child(1)').data('control') === 'basic');
    assert.ok(gb.el.$('> #childb > :nth-child(1)').prop('id') === 'child4');
    assert.ok(gb.el.$('> #childb > :nth-child(2)').prop('id') === 'child2');
    assert.ok(gb.el.$('> #childb > :nth-child(4)').data('control') === 'basic');
    assert.ok(gb.el.$('> #childb > :nth-child(4)').data('name') === 'basic-control');

    assert.ok(gb.el.getViewIndex('child5342523452345') === -1);
    assert.ok(gb.el.getViewIndex('child2') === 1);
    assert.ok(gb.el.getViewIndex('child3') === 3);
    assert.ok(gb.el.getViewIndex('child4') === 0);
    assert.ok(gb.el.getViewIndex('child5') === 2);

    assert.ok(gb.el.getView('child5'));
    assert.ok(!gb.el.getView('child5b'));
    gb.el.renameView('child5', 'child5b');
    assert.ok(gb.el.getViewIndex('child5') === -1);
    assert.ok(gb.el.getViewIndex('child5b') === 2);
    assert.ok(!gb.el.getView('child5'));
    assert.ok(gb.el.getView('child5b'));

    return done();
  });

  test('deep-nested-subview-crud', function(done){
    gb.el = new _$.view(gb.deepNested());
    assert.ok(Belt.deepEqual(_.keys(gb.el.views), ['child1a', 'child1b']));

    $('#fixture').append(gb.el.$el);

    assert.ok($('#fixture section[data-control="deepnested"][data-name="deepnested-control"]').length === 1);
    assert.ok($('#fixture section[data-control="deepnested"][data-name="deepnested-control"] #child1a').length === 0);

    gb.el.render();

    assert.ok($('#fixture section[data-control="deepnested"][data-name="deepnested-control"]').length === 1);
    assert.ok($('#fixture section[data-control="deepnested"][data-name="deepnested-control"] > section#child1a > section#childa > div.child1').length === 1);
    assert.ok($('#fixture section[data-control="deepnested"][data-name="deepnested-control"] > section#child1a > section#childb > div.child1').length === 1);
    assert.ok($('#fixture section[data-control="deepnested"][data-name="deepnested-control"] > section#child1a > section#childa > section#child2').length === 1);
    assert.ok($('#fixture section[data-control="deepnested"][data-name="deepnested-control"] > section#child1a > section#childb > section#child2').length === 1);

    assert.ok($('#fixture section[data-control="deepnested"][data-name="deepnested-control"] > section#child1a > section#childa > div.child1').index() === 0);
    assert.ok($('#fixture section[data-control="deepnested"][data-name="deepnested-control"] > section#child1a > section#childb > div.child1').index() === 0);
    assert.ok($('#fixture section[data-control="deepnested"][data-name="deepnested-control"] > section#child1a > section#childa > section#child2').index() === 1);
    assert.ok($('#fixture section[data-control="deepnested"][data-name="deepnested-control"] > section#child1a > section#childb > section#child2').index() === 1);

    assert.ok($('#fixture section[data-control="deepnested"][data-name="deepnested-control"] > section#child1a > section#childa > section#child2').html() === 'html');
    assert.ok($('#fixture section[data-control="deepnested"][data-name="deepnested-control"] > section#child1a > section#childb > section#child2').html() === 'html');

    assert.ok(gb.el.subPath() === 'views.child1a.views.childb.');
    assert.ok(gb.el.subPath({'path': 'test'}) === 'test.');
    assert.ok(!Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(gb.el.views)));
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(Belt.get(gb.el, 'views.child1a.views.childb.views'))));
    assert.ok(!Belt.deepEqual(gb.el.getLayout(), gb.el.layout));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), gb.el.views.child1a.views.childb.layout));
    assert.ok(gb.el.getView('child1').$(true).prop('tagName') === 'DIV');
    assert.ok(gb.el.getView('child2').$(true).prop('tagName') === 'SECTION');
    assert.ok(!gb.el.getView('not real'));
    assert.ok(gb.el.getView('child1').parents['child1'].$el.data('control') === 'basic');
    assert.ok(gb.el.getView('child2').parents['child2'].$el.data('name') === 'basic-control');
    assert.ok(!gb.el.getView('child2').parents['child1']);

    //adding view with no index (to end of layout)
    gb.sel = new _$.view(gb.basic());

    gb.el.setView('child3', gb.sel);

    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(Belt.get(gb.el, 'views.child1a.views.childb.views'))));
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child1', 'child2', 'child3']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child1', 'child2', 'child3']));
    assert.ok(gb.el.getView('child3').parents['child3'].$el.data('control') === 'deepnested');
    assert.ok(gb.el.$el.children().length === 2);
    assert.ok(gb.el.getEl().children().length === 3);
    assert.ok(gb.el.getView('child3').$el.data('control') === 'basic');
    assert.ok(gb.el.getView('child3').$el.data('name') === 'basic-control')
    assert.ok(gb.el.getView('child3').$el.children().length === 2)
    assert.ok(gb.el.getEl().find('> :nth-child(3)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(3)').data('name') === 'basic-control');

    //adding view with index to middle of layout
    gb.attr = gb.basic();
    gb.attr.attributes = {'id': 'child4'};
    gb.sel = new _$.view(gb.attr);

    gb.el.setView('child4', gb.sel, {'index': 1});

    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(Belt.get(gb.el, 'views.child1a.views.childb.views'))));
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child1', 'child2', 'child3', 'child4']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child1', 'child4', 'child2', 'child3']));
    assert.ok(gb.el.getView('child4').parents['child4'].$el.data('control') === 'deepnested');
    assert.ok(gb.el.$el.children().length === 2);
    assert.ok(gb.el.getEl().children().length === 4);
    assert.ok(gb.el.getView('child4').$el.data('control') === 'basic');
    assert.ok(gb.el.getView('child4').$el.data('name') === 'basic-control')
    assert.ok(gb.el.getView('child4').$el.children().length === 2)

    assert.ok(gb.el.getEl().find('> :nth-child(1)').hasClass('child1'));
    assert.ok(gb.el.getEl().find('> :nth-child(2)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(2)').prop('id') === 'child4');
    assert.ok(gb.el.getEl().find('> :nth-child(3)').prop('id') === 'child2');
    assert.ok(gb.el.getEl().find('> :nth-child(4)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(4)').data('name') === 'basic-control');

    //adding view to start of layout - adding dom element
    gb.sel = _$.a({'attr': {'href': '/testing'}, 'id': 'child5'});

    gb.el.setView('child5', gb.sel, {'index': 0});

    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(Belt.get(gb.el, 'views.child1a.views.childb.views'))));
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child1', 'child2', 'child3', 'child4', 'child5']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child5', 'child1', 'child4', 'child2', 'child3']));
    assert.ok(gb.el.getView('child5').parents['child5'].$el.data('control') === 'deepnested');
    assert.ok(gb.el.$el.children().length === 2);
    assert.ok(gb.el.getEl().children().length === 5);

    assert.ok(gb.el.getEl().find('> :nth-child(1)').prop('id') === 'child5');
    assert.ok(gb.el.getEl().find('> :nth-child(1)').prop('tagName') === 'A');
    assert.ok(gb.el.getEl().find('> :nth-child(2)').hasClass('child1'));
    assert.ok(gb.el.getEl().find('> :nth-child(3)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(3)').prop('id') === 'child4');
    assert.ok(gb.el.getEl().find('> :nth-child(4)').prop('id') === 'child2');
    assert.ok(gb.el.getEl().find('> :nth-child(5)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(5)').data('name') === 'basic-control');

    assert.ok(gb.el.getViewIndex('child1') === 1);
    assert.ok(gb.el.getViewIndex('child2') === 3);
    assert.ok(gb.el.getViewIndex('child3') === 4);
    assert.ok(gb.el.getViewIndex('child4') === 2);
    assert.ok(gb.el.getViewIndex('child5') === 0);

    //replacing view - no index
    gb.sel = _$.img({'attr': {'src': '#'}, 'id': 'new-child5'});

    gb.el.setView('child5', gb.sel);

    assert.ok(!Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(gb.el.views)));
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(Belt.get(gb.el, 'views.child1a.views.childb.views'))));
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child1', 'child2', 'child3', 'child4', 'child5']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child5', 'child1', 'child4', 'child2', 'child3']));
    assert.ok(gb.el.getView('child5').parents['child5'].$el.data('control') === 'deepnested');
    assert.ok(gb.el.$el.children().length === 2);
    assert.ok(gb.el.getEl().children().length === 5);

    assert.ok(gb.el.getEl().find('> :nth-child(1)').prop('id') === 'new-child5');
    assert.ok(gb.el.getEl().find('> :nth-child(1)').prop('tagName') === 'IMG');
    assert.ok(gb.el.getEl().find('> :nth-child(2)').hasClass('child1'));
    assert.ok(gb.el.getEl().find('> :nth-child(3)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(3)').prop('id') === 'child4');
    assert.ok(gb.el.getEl().find('> :nth-child(4)').prop('id') === 'child2');
    assert.ok(gb.el.getEl().find('> :nth-child(5)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(5)').data('name') === 'basic-control');

    assert.ok(gb.el.getViewIndex('child1') === 1);
    assert.ok(gb.el.getViewIndex('child2') === 3);
    assert.ok(gb.el.getViewIndex('child3') === 4);
    assert.ok(gb.el.getViewIndex('child4') === 2);
    assert.ok(gb.el.getViewIndex('child5') === 0);

    //replacing view - with index
    gb.sel = _$.img({'attr': {'src': '#'}, 'id': 'new-child1'});

    gb.el.setView('child1', gb.sel, {'index': 3});

    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child1', 'child2', 'child3', 'child4', 'child5']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child5', 'child4', 'child2', 'child1', 'child3']));
    assert.ok(gb.el.getView('child1').parents['child1'].$el.data('control') === 'deepnested');
    assert.ok(gb.el.$el.children().length === 2);
    assert.ok(gb.el.getEl().children().length === 5);

    assert.ok(gb.el.getEl().find('> :nth-child(1)').prop('id') === 'new-child5');
    assert.ok(gb.el.getEl().find('> :nth-child(1)').prop('tagName') === 'IMG');
    assert.ok(!gb.el.getEl().find('> :nth-child(4)').hasClass('child1'));
    assert.ok(gb.el.getEl().find('> :nth-child(4)').prop('id') === 'new-child1');
    assert.ok(gb.el.getEl().find('> :nth-child(2)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(2)').prop('id') === 'child4');
    assert.ok(gb.el.getEl().find('> :nth-child(3)').prop('id') === 'child2');
    assert.ok(gb.el.getEl().find('> :nth-child(5)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(5)').data('name') === 'basic-control');

    assert.ok(gb.el.getViewIndex('child1') === 3);
    assert.ok(gb.el.getViewIndex('child2') === 2);
    assert.ok(gb.el.getViewIndex('child3') === 4);
    assert.ok(gb.el.getViewIndex('child4') === 1);
    assert.ok(gb.el.getViewIndex('child5') === 0);

    //delete view
    gb.el.deleteView('child1');

    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child2', 'child3', 'child4', 'child5']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child5', 'child4', 'child2', 'child3']));
    assert.ok(!gb.el.getView('child1'));
    assert.ok(gb.el.getEl().children().length === 4);
    assert.ok(gb.el.getEl().children().length === 4);

    assert.ok(gb.el.getEl().find('> :nth-child(1)').prop('id') === 'new-child5');
    assert.ok(gb.el.getEl().find('> :nth-child(1)').prop('tagName') === 'IMG');
    assert.ok(gb.el.getEl().find('> :nth-child(2)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(2)').prop('id') === 'child4');
    assert.ok(gb.el.getEl().find('> :nth-child(3)').prop('id') === 'child2');
    assert.ok(gb.el.getEl().find('> :nth-child(4)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(4)').data('name') === 'basic-control');

    assert.ok(gb.el.getViewIndex('child1') === -1);
    assert.ok(gb.el.getViewIndex('child2') === 2);
    assert.ok(gb.el.getViewIndex('child3') === 3);
    assert.ok(gb.el.getViewIndex('child4') === 1);
    assert.ok(gb.el.getViewIndex('child5') === 0);

    //delete view - nonexistent
    gb.el.deleteView('child123123');

    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child2', 'child3', 'child4', 'child5']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child5', 'child4', 'child2', 'child3']));
    assert.ok(!gb.el.getView('child1'));
    assert.ok(gb.el.$el.children().length === 2);
    assert.ok(gb.el.getEl().children().length === 4);

    assert.ok(gb.el.getEl().find('> :nth-child(1)').prop('id') === 'new-child5');
    assert.ok(gb.el.getEl().find('> :nth-child(1)').prop('tagName') === 'IMG');
    assert.ok(gb.el.getEl().find('> :nth-child(2)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(2)').prop('id') === 'child4');
    assert.ok(gb.el.getEl().find('> :nth-child(3)').prop('id') === 'child2');
    assert.ok(gb.el.getEl().find('> :nth-child(4)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(4)').data('name') === 'basic-control');

    assert.ok(gb.el.getViewIndex('child123123') === -1);
    assert.ok(gb.el.getViewIndex('child2') === 2);
    assert.ok(gb.el.getViewIndex('child3') === 3);
    assert.ok(gb.el.getViewIndex('child4') === 1);
    assert.ok(gb.el.getViewIndex('child5') === 0);

    //move view
    gb.el.moveView('child5', 2);

    assert.ok(!Belt.deepEqual(_.keys(gb.el.getViews()), _.keys(gb.el.views)));
    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child2', 'child3', 'child4', 'child5']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child4', 'child2', 'child5', 'child3']));
    assert.ok(!gb.el.getView('child1'));
    assert.ok(gb.el.$el.children().length === 2);
    assert.ok(gb.el.getEl().children().length === 4);

    assert.ok(gb.el.getEl().find('> :nth-child(3)').prop('id') === 'new-child5');
    assert.ok(gb.el.getEl().find('> :nth-child(3)').prop('tagName') === 'IMG');
    assert.ok(gb.el.getEl().find('> :nth-child(1)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(1)').prop('id') === 'child4');
    assert.ok(gb.el.getEl().find('> :nth-child(2)').prop('id') === 'child2');
    assert.ok(gb.el.getEl().find('> :nth-child(4)').data('control') === 'basic');
    assert.ok(gb.el.getEl().find('> :nth-child(4)').data('name') === 'basic-control');

    assert.ok(gb.el.getViewIndex('child1') === -1);
    assert.ok(gb.el.getViewIndex('child2') === 1);
    assert.ok(gb.el.getViewIndex('child3') === 3);
    assert.ok(gb.el.getViewIndex('child4') === 0);
    assert.ok(gb.el.getViewIndex('child5') === 2);

    //move view - nonexistent
    gb.el.moveView('child5342523452345', 2);

    assert.ok(Belt.deepEqual(_.keys(gb.el.getViews()), ['child2', 'child3', 'child4', 'child5']));
    assert.ok(Belt.deepEqual(gb.el.getLayout(), ['child4', 'child2', 'child5', 'child3']));
    assert.ok(!gb.el.getView('child5342523452345'));
    assert.ok(gb.el.$el.children().length === 2);
    assert.ok(gb.el.getEl().children().length === 4);

    assert.ok(gb.el.$('> #child1a > #childb > :nth-child(3)').prop('id') === 'new-child5');
    assert.ok(gb.el.$('> #child1a > #childb > :nth-child(3)').prop('tagName') === 'IMG');
    assert.ok(gb.el.$('> #child1a > #childb > :nth-child(1)').data('control') === 'basic');
    assert.ok(gb.el.$('> #child1a > #childb > :nth-child(1)').prop('id') === 'child4');
    assert.ok(gb.el.$('> #child1a > #childb > :nth-child(2)').prop('id') === 'child2');
    assert.ok(gb.el.$('> #child1a > #childb > :nth-child(4)').data('control') === 'basic');
    assert.ok(gb.el.$('> #child1a > #childb > :nth-child(4)').data('name') === 'basic-control');

    assert.ok(gb.el.getViewIndex('child5342523452345') === -1);
    assert.ok(gb.el.getViewIndex('child2') === 1);
    assert.ok(gb.el.getViewIndex('child3') === 3);
    assert.ok(gb.el.getViewIndex('child4') === 0);
    assert.ok(gb.el.getViewIndex('child5') === 2);

    assert.ok(!gb.el.getViewEl('child5342523452345'));
    assert.ok(gb.el.getViewEl('child2').index() === 1);
    assert.ok(gb.el.getViewEl('child3').index() === 3);
    assert.ok(gb.el.getViewEl('child4').index() === 0);
    assert.ok(gb.el.getViewEl('child5').index() === 2);

    assert.ok(gb.el.getView('child5'));
    assert.ok(!gb.el.getView('child5b'));
    gb.el.renameView('child5', 'child5b');
    assert.ok(gb.el.getViewIndex('child5') === -1);
    assert.ok(gb.el.getViewIndex('child5b') === 2);
    assert.ok(!gb.el.getView('child5'));
    assert.ok(gb.el.getView('child5b'));

    return done();
  });

  test('basic-crud', function(done){
    //gb.el = _$.view({'views': {'label': _$.label(), 'input': _$.input()}, 'layout': ['label', 'input']});
    gb.el = _$.view();
    gb.el.render();
    $('#fixture').append(gb.el.getEl());

    var cb = _.after(2, done);

    gb.el.once('change', function(val){
      assert.ok(val.val === 'new test');
      assert.ok(val.oval === 'test');

      gb.el.once('change', function(val){
        assert.ok(val.val === 'new test');
        assert.ok(val.oval === '<a>test</a>');
        return cb();
      });

      return cb();
    });

    gb.el.$el.html('<a>test</a>');

    assert.ok(gb.el.get() === gb.el.getEl().text());
    assert.ok(gb.el.get() === 'test');

    assert.ok(gb.el.get({'method': ['getEl', 'html']}) === '<a>test</a>');
    assert.ok(gb.el.get({'method': ['getEl', 'html']}) === gb.el.getEl().html());

    gb.val = gb.el.set('new test');

    assert.ok(gb.val.val === 'new test');
    assert.ok(gb.val.oval === 'test');
    assert.ok(gb.el.get({'method': ['getEl', 'html']}) === 'new test');
    assert.ok(gb.el.get() === 'new test');

    gb.el.$el.html('<a>test</a>');

    assert.ok(gb.el.get() === gb.el.getEl().text());
    assert.ok(gb.el.get() === 'test');

    assert.ok(gb.el.get({'method': ['getEl', 'html']}) === '<a>test</a>');
    assert.ok(gb.el.get({'method': ['getEl', 'html']}) === gb.el.getEl().html());

    gb.val = gb.el.set('new test', {'get': {'method': ['getEl', 'html']}});

    assert.ok(gb.val.val === 'new test');
    assert.ok(gb.val.oval === '<a>test</a>');

    return;
  });

  test('basic-crud-2', function(done){
    gb.el = _$.view({'views': {'label': _$.label(), 'input': _$.input()}, 'layout': ['label', 'input']});
    gb.el.render();
    $('#fixture').append(gb.el.getEl());

    var cb = _.after(2, done);

    assert.ok(gb.el.$el.html() === '<label></label><input>');

    assert.ok(gb.el.get() === gb.el.getEl().text());
    assert.ok(gb.el.get() === '');

    assert.ok(gb.el.get({'method': ['getEl', 'html']}) === '<label></label><input>');
    assert.ok(gb.el.get({'method': ['getEl', 'html']}) === gb.el.getEl().html());

    gb.el.once('change:label', function(val){
      assert.ok(val.val === 'new test');
      assert.ok(val.oval === '');

      return cb();
    });

    gb.val = gb.el.set('new test', {'view': 'label', 'method': 'html'});

    assert.ok(gb.val.val === 'new test');
    assert.ok(gb.val.oval === '');

    assert.ok(gb.el.get({'method': ['getEl', 'html']}) === '<label>new test</label><input>');
    assert.ok(gb.el.get() === 'new test');

    assert.ok(!gb.el.$('input').prop('id'));

    gb.el.once('totally random', function(val){
      assert.ok(val.val === 'id');
      assert.ok(val.oval === 'INPUT');

      return cb();
    });

    gb.val = gb.el.set('id', {'event': 'totally random', 'selector': 'input', 'method': 'attr', 'args': 'id'
    , 'get': {'selector': 'input', 'method': 'prop', 'args': 'tagName'}
    });

    assert.ok(gb.val.val === 'id');
    assert.ok(gb.val.oval === 'INPUT');
    assert.ok(gb.el.$('input').prop('id') === 'id');

    return;
  });

  test('nested-crud', function(done){
    gb._el = _$.view({'views': {'label': _$.label(), 'input': _$.input()}, 'layout': ['label', 'input']});
    gb.el = _$.view({'views': {'child': gb._el}, 'subviews_path': 'views.child', 'layout': ['child']});

    gb.el.render();
    $('#fixture').append(gb.el.$el);

    var cb = _.after(2, done);

    assert.ok(gb.el.$el.html() === '<div data-control="view"><label></label><input></div>');

    assert.ok(gb.el.get() === gb.el.getEl().text());
    assert.ok(gb.el.get() === '');

    assert.ok(gb.el.get({'method': ['getEl', 'html']}) === '<label></label><input>');
    assert.ok(gb.el.get({'method': ['getEl', 'html']}) === gb.el.getEl().html());

    gb.el.once('change:label', function(val){
      assert.ok(val.val === 'new test');
      assert.ok(val.oval === '');

      return cb();
    });

    gb.val = gb.el.set('new test', {'view': 'label', 'method': 'html'});

    assert.ok(gb.val.val === 'new test');
    assert.ok(gb.val.oval === '');

    assert.ok(gb.el.get({'method': ['getEl', 'html']}) === '<label>new test</label><input>');
    assert.ok(gb.el.get() === 'new test');

    assert.ok(!gb.el.$('input').prop('id'));

    gb.el.once('totally random', function(val){
      assert.ok(val.val === 'id');
      assert.ok(val.oval === 'INPUT');

      return cb();
    });

    gb.val = gb.el.set('id', {'event': 'totally random', 'selector': 'input', 'method': 'attr', 'args': 'id'
    , 'get': {'selector': 'input', 'method': 'prop', 'args': 'tagName'}
    });

    assert.ok(gb.val.val === 'id');
    assert.ok(gb.val.oval === 'INPUT');
    assert.ok(gb.el.$('input').prop('id') === 'id');

    return;
  });

  test('deepnested-crud', function(done){
    gb._el = _$.view({'views': {'label': _$.label(), 'input': _$.input()}, 'layout': ['label', 'input']});
    gb.__el = _$.view({'views': {'child': gb._el}, 'subviews_path': 'views.child', 'layout': ['child']});
    gb.el = _$.view({'views': {'parent': gb.__el, 'div': _$.div()}, 'subviews_path': 'views.parent.views.child', 'layout': ['div', 'parent']});

    gb.el.render();
    $('#fixture').append(gb.el.$el);

    var cb = _.after(2, done);

    gb.el.$el.html('<undefined><label></label><input></undefined>');

    assert.ok(gb.el.get() === gb.el.getEl().text());
    assert.ok(gb.el.get() === '');

    assert.ok(gb.el.get({'method': ['getEl', 'html']}) === '<label></label><input>');
    assert.ok(gb.el.get({'method': ['getEl', 'html']}) === gb.el.getEl().html());

    gb.el.once('change:label', function(val){
      assert.ok(val.val === 'new test');
      assert.ok(val.oval === '');

      return cb();
    });

    gb.val = gb.el.set('new test', {'view': 'label', 'method': 'html'});

    assert.ok(gb.val.val === 'new test');
    assert.ok(gb.val.oval === '');

    assert.ok(gb.el.get({'method': ['getEl', 'html']}) === '<label>new test</label><input>');
    assert.ok(gb.el.get() === 'new test');

    assert.ok(!gb.el.$('input').prop('id'));

    gb.el.once('totally random', function(val){
      assert.ok(val.val === 'id');
      assert.ok(val.oval === 'INPUT');

      return cb();
    });

    gb.val = gb.el.set('id', {'event': 'totally random', 'selector': 'input', 'method': 'attr', 'args': 'id'
    , 'get': {'selector': 'input', 'method': 'prop', 'args': 'tagName'}
    });

    assert.ok(gb.val.val === 'id');
    assert.ok(gb.val.oval === 'INPUT');
    assert.ok(gb.el.$('input').prop('id') === 'id');

    return;
  });

  test('replace-delete', function(done){
    var cb = _.after(3, done);

    gb._el = _$.view({'views': {'label': _$.label(), 'input': _$.input()}, 'layout': ['label', 'input']});
    gb.__el = _$.view({'views': {'child': gb._el}, 'layout': ['child']});
    gb.el = _$.view({'views': {'parent': gb.__el, 'div': _$.div()}, 'layout': ['div', 'parent']});

    gb.el.render();
    $('#fixture').append(gb.el.$el);

    assert.ok(gb.el.$el.html() === '<div></div><div data-control="view"><div data-control="view"><label></label><input></div></div>');

    gb._el.deleteView('input');
    assert.ok(gb.el.$el.html() === '<div></div><div data-control="view"><div data-control="view"><label></label></div></div>');

    gb._el.once('delete', function(){
      return cb();
    });

    gb._el.delete();

    assert.ok(gb.el.$el.html() === '<div></div><div data-control="view"></div>');
    assert.ok(Belt.deepEqual(gb.__el.views, {}));

    assert.ok(gb.el.views.parent && !gb.el.views.parent._$settings);
    gb.__el.replace(_$.section());
    assert.ok(gb.el.$el.html() === '<div></div><section></section>');
    assert.ok(Belt.deepEqual(gb.__el.views, {}));
    assert.ok(gb.el.views.parent && gb.el.views.parent._$settings);

    gb.__el.parents = {};
    gb.el.setView('new_parent', gb.__el);
    assert.ok(Belt.deepEqual(gb.el.layout, ['div', 'parent', 'new_parent']));
    assert.ok(gb.el.getView('new_parent').cid === gb.__el.cid);

    gb.new_el = _$.view({'tag': 'section'});
    assert.ok(!_.any(gb.new_el.parents));

    gb.__el.once('replace', function(){
      return cb();
    });

    gb.__el.replace(gb.new_el);
    assert.ok(gb.el.getView('new_parent').cid === gb.new_el.cid);
    assert.ok(gb.new_el.parents['new_parent']);

    gb.el.once('replace', function(){
      return cb();
    });

    assert.ok($('#fixture').html() !== '<form></form>');
    gb.el.replace(_$.form());
    assert.ok($('#fixture').html() === '<form></form>');

    return;
  });

});

suite('controls', function(){
  setup(function(){
    return $('#fixture').html('');
  });
  teardown(function(){
    return $('#fixture').html('');
  });

  test('textControl', function(done){
    gb.el = _$.textControl();
    gb.cb = _.after(4, done);
    $('#fixture').append(gb.el.$el);

    assert.ok($('#fixture div[data-control="text"]').length === 1);
    assert.ok($('#fixture div[data-control="text"]').html() === '');
    assert.ok($('#fixture div[data-name=""]').length === 1);
    assert.ok($('#fixture div[data-name=""]').html() === '');
    assert.ok($('#fixture div.form-group').length === 1);
    assert.ok($('#fixture div.form-group').html() === '');

    gb.el.on('render', function(){
      return gb.cb();
    });

    gb.el.render();

    assert.ok($('#fixture div[data-control="text"]').html() !== '');
    assert.ok($('#fixture div[data-name=""] label.control-label.col-xs-1').length === 1);
    assert.ok($('#fixture div[data-name=""] div.col-xs-10 input.form-control[type="text"][name=""]').length === 1);
    assert.ok($('#fixture div[data-name=""] div.col-xs-1 div.row button.remove').length === 1);

    assert.ok(gb.el.$('input').length === 1);
    assert.ok(gb.el.$('label').length === 1);
    assert.ok(gb.el.$('button').length === 1);

    gb.el.once('change', function(val){
      assert.ok(val.val === gb.val);
      assert.ok(val.oval === '');
      return gb.cb();
    });

    gb.val = Belt.uuid();
    gb.el.set(gb.val);

    assert.ok(gb.el.$('input').val() === gb.val);
    assert.ok(gb.el.get() === gb.val);

    gb.valb = Belt.uuid();

    gb.el.on('change', function(val){
      assert.ok(val.val === gb.valb);
      assert.ok(val.oval === undefined);
      return gb.cb();
    });

    gb.el.$('input').val(gb.valb);
    gb.el.$('input').trigger('change');

    gb.el.on('delete', function(){
      return gb.cb();
    });

    return gb.el.$('button').trigger('click');
  });

  test('textControl-2', function(done){
    gb.attr = {
      'name': Belt.uuid()
    , 'type': 'number'
    , 'value': '1234'
    , 'placeholder': 'placeholder'
    , 'disabled': true
    , 'readonly': 'true'
    , 'required': true
    , 'min': 50
    , 'max': 100
    , 'step': 2
    };

    gb.el = _$.textControl(gb.attr);

    gb.el.render();

    $('#fixture').append(gb.el.$el);

    assert.ok(gb.el.$el.data('name') === gb.attr.name);
    assert.ok(gb.el.$el.data('control') === 'text');

    assert.ok(gb.el.$('input').attr('name') === gb.attr.name);
    assert.ok(gb.el.$('label').text() === gb.attr.name);
    assert.ok(gb.el.$('label').attr('for') === gb.attr.name);
    assert.ok(gb.el.$('input').attr('type') === gb.attr.type);
    assert.ok(gb.el.$('input').attr('value') === gb.attr.value);
    assert.ok(gb.el.$('input').val() === gb.attr.value);
    assert.ok(gb.el.$('input').attr('placeholder') === gb.attr.placeholder);
    assert.ok(gb.el.$('input').attr('disabled') === 'disabled');
    assert.ok(gb.el.$('input').attr('readonly') === 'readonly');
    assert.ok(gb.el.$('input').attr('required') === 'required');
    assert.ok(gb.el.$('input').attr('min') === gb.attr.min.toString());
    assert.ok(gb.el.$('input').attr('max') === gb.attr.max.toString());
    assert.ok(gb.el.$('input').attr('step') === gb.attr.step.toString());

    return done();
  });

  test('textControl-3', function(done){
    gb.el = _$.textControl();
    gb.cb = _.after(3, done);
    $('#fixture').append(gb.el.$el);

    gb.el.on('render', function(){
      return gb.cb();
    });

    gb.el.render();

    assert.ok(gb.el.$('input[type="text"]').length === 1);
    assert.ok(gb.el.$('label').length === 1);
    assert.ok(gb.el.$('button').length === 1);

    gb.el.once('change', function(val){
      assert.ok(val.val === gb.val.toString());
      assert.ok(val.oval === '');
      return gb.cb();
    });

    gb.val = 6626526;
    gb.el.set(gb.val);

    assert.ok(gb.el.$('input').val() === gb.val.toString());
    assert.ok(gb.el.get() === gb.val.toString());

    gb.valb = undefined;
    gb.el.set(gb.valb);

    assert.ok(gb.el.$('input').val() === '');
    assert.ok(gb.el.get() === '');

    gb.valb = false;
    gb.el.set(gb.valb);

    assert.ok(gb.el.$('input').val() === '');
    assert.ok(gb.el.get() === '');

    gb.valb = true;
    gb.el.set(gb.valb);

    assert.ok(gb.el.$('input').val() === 'true');
    assert.ok(gb.el.get() === 'true');

    gb.valb = {1: 2};
    gb.el.set(gb.valb);

    assert.ok(Belt.deepEqual(JSON.parse(gb.el.$('input').val()), gb.valb));
    assert.ok(Belt.deepEqual(JSON.parse(gb.el.get()), gb.valb));

    gb.el.on('delete', function(){
      return gb.cb();
    });

    return gb.el.delete();
  });

  test('textControl-removable', function(done){
    gb.el = _$.textControl({'removable': false});
    gb.cb = _.after(3, done);
    $('#fixture').append(gb.el.$el);

    gb.el.on('render', function(){
      return gb.cb();
    });

    gb.el.render();

    assert.ok(gb.el.$('input[type="text"]').length === 1);
    assert.ok(gb.el.$('label').length === 1);
    assert.ok(gb.el.$('button').length === 0);

    gb.el.once('change', function(val){
      assert.ok(val.val === gb.val.toString());
      assert.ok(val.oval === '');
      return gb.cb();
    });

    gb.val = 6626526;
    gb.el.set(gb.val);

    assert.ok(gb.el.$('input').val() === gb.val.toString());
    assert.ok(gb.el.get() === gb.val.toString());

    gb.valb = undefined;
    gb.el.set(gb.valb);

    assert.ok(gb.el.$('input').val() === '');
    assert.ok(gb.el.get() === '');

    gb.valb = false;
    gb.el.set(gb.valb);

    assert.ok(gb.el.$('input').val() === '');
    assert.ok(gb.el.get() === '');

    gb.valb = true;
    gb.el.set(gb.valb);

    assert.ok(gb.el.$('input').val() === 'true');
    assert.ok(gb.el.get() === 'true');

    gb.valb = {1: 2};
    gb.el.set(gb.valb);

    assert.ok(Belt.deepEqual(JSON.parse(gb.el.$('input').val()), gb.valb));
    assert.ok(Belt.deepEqual(JSON.parse(gb.el.get()), gb.valb));

    gb.el.on('delete', function(){
      return gb.cb();
    });

    return gb.el.delete();
  });


  test('textControl-setName', function(done){
    gb.attr = {'name': Belt.uuid(), 'value': '1234'};

    gb.el = _$.textControl(gb.attr);

    gb.el.render();

    $('#fixture').append(gb.el.$el);

    assert.ok(gb.el.$el.data('name') === gb.attr.name);
    assert.ok(gb.el.$('label').html() === gb.attr.name);
    assert.ok(gb.el.$('input').attr('name') === gb.attr.name);
    assert.ok(gb.el.$('label').attr('for') === gb.attr.name);

    gb.el.setName('monkey');
    assert.ok(gb.el.$el.data('name') === 'monkey');
    assert.ok(gb.el.$('label').html() === 'monkey');
    assert.ok(gb.el.$('input').attr('name') === 'monkey');
    assert.ok(gb.el.$('label').attr('for') === 'monkey');

    gb.parent = _$.view({'views': {'monkey': gb.el}, 'layout': ['monkey']});

    assert.ok(gb.parent.getView('monkey'));
    assert.ok(gb.el.parents['monkey']);

    gb.el.on('setName', function(v){
      assert.ok(v.name === 'frog');
      assert.ok(v.oname === 'monkey');
      return done();
    });

    gb.el.setName('frog');

    assert.ok(gb.el.$el.data('name') === 'frog');
    assert.ok(gb.el.$('label').html() === 'frog');
    assert.ok(gb.el.$('input').attr('name') === 'frog');
    assert.ok(gb.el.$('label').attr('for') === 'frog');
    assert.ok(!gb.parent.getView('monkey'));
    assert.ok(!gb.el.parents['monkey']);
    assert.ok(gb.parent.getView('frog'));
    assert.ok(gb.el.parents['frog']);

    return;
  });

  test('numberControl', function(done){
    gb.el = _$.numberControl();
    gb.cb = _.after(3, done);
    $('#fixture').append(gb.el.$el);

    gb.el.on('render', function(){
      return gb.cb();
    });

    gb.el.render();

    assert.ok(gb.el.$('input[type="number"]').length === 1);
    assert.ok(gb.el.$('label').length === 1);
    assert.ok(gb.el.$('button').length === 1);

    gb.el.once('change', function(val){
      assert.ok(val.val === gb.val.toString());
      assert.ok(val.oval === undefined);
      return gb.cb();
    });

    gb.val = 6626526;
    gb.el.set(gb.val);

    assert.ok(gb.el.$('input').val() === gb.val.toString());
    assert.ok(gb.el.get() === gb.val);

    gb.valb = 324.234;
    gb.el.set(gb.valb);

    assert.ok(gb.el.$('input').val() === gb.valb.toString());
    assert.ok(gb.el.get() === gb.valb);

    gb.valb = '21312';
    gb.el.set(gb.valb);

    assert.ok(gb.el.$('input').val() === gb.valb.toString());
    assert.ok(gb.el.get() === parseInt(gb.valb));

    gb.valb = 'not a number';
    gb.el.set(gb.valb);

    assert.ok(gb.el.$('input').val() === '');
    assert.ok(gb.el.get() === undefined);

    gb.el.on('delete', function(){
      return gb.cb();
    });

    return gb.el.$('button').trigger('click');
  });

  test('numberControl-setName', function(done){
    gb.attr = {'name': Belt.uuid(), 'value': '1234'};

    gb.el = _$.numberControl(gb.attr);

    gb.el.render();

    $('#fixture').append(gb.el.$el);

    assert.ok(gb.el.$el.data('name') === gb.attr.name);
    assert.ok(gb.el.$('label').html() === gb.attr.name);
    assert.ok(gb.el.$('input').attr('name') === gb.attr.name);
    assert.ok(gb.el.$('label').attr('for') === gb.attr.name);

    gb.el.setName('monkey');
    assert.ok(gb.el.$el.data('name') === 'monkey');
    assert.ok(gb.el.$('label').html() === 'monkey');
    assert.ok(gb.el.$('input').attr('name') === 'monkey');
    assert.ok(gb.el.$('label').attr('for') === 'monkey');

    gb.parent = _$.view({'views': {'monkey': gb.el}, 'layout': ['monkey']});

    assert.ok(gb.parent.getView('monkey'));
    assert.ok(gb.el.parents['monkey']);

    gb.el.on('setName', function(v){
      assert.ok(v.name === 'frog');
      assert.ok(v.oname === 'monkey');
      return done();
    });

    gb.el.setName('frog');

    assert.ok(gb.el.$el.data('name') === 'frog');
    assert.ok(gb.el.$('label').html() === 'frog');
    assert.ok(gb.el.$('input').attr('name') === 'frog');
    assert.ok(gb.el.$('label').attr('for') === 'frog');
    assert.ok(!gb.parent.getView('monkey'));
    assert.ok(!gb.el.parents['monkey']);
    assert.ok(gb.parent.getView('frog'));
    assert.ok(gb.el.parents['frog']);

    return;
  });

  test('datetimeControl', function(done){
    gb.el = _$.datetimeControl({'value': moment('04/01/2012', 'MM/DD/YYYY').toDate()});
    gb.cb = _.after(3, done);
    $('#fixture').append(gb.el.$el);

    assert.ok($('#fixture div[data-control="datetime-local"]'));

    gb.el.on('render', function(){
      return gb.cb();
    });

    gb.el.render();

    assert.ok($('#fixture div[data-control="datetime-local"] input[type="datetime-local"][name=""][value="2012-04-01T00:00"]'));

    assert.ok(gb.el.$('input[type="datetime-local"]').length === 1);
    assert.ok(gb.el.$('label').length === 1);
    assert.ok(gb.el.$('button').length === 1);

    gb.el.once('change', function(val){
      assert.ok(Belt.deepEqual(moment(val.val).toDate(), gb.val));
      assert.ok(Belt.deepEqual(val.oval, moment('04/01/2012', 'MM/DD/YYYY').toDate()));
      return gb.cb();
    });

    gb.val = moment('01/01/2012', 'MM/DD/YYYY').toDate();
    gb.el.set(gb.val);

    assert.ok(gb.el.$('input').val() === moment(gb.val).format('YYYY-MM-DDTHH:mm'));
    assert.ok(Belt.deepEqual(gb.el.get(), gb.val));

    gb.valb = moment('05/01/2012 14:23', 'MM/DD/YYYY HH:mm').toDate();
    gb.el.set(gb.valb);

    assert.ok(gb.el.$('input').val() === moment(gb.valb).format('YYYY-MM-DDTHH:mm'));
    assert.ok(Belt.deepEqual(gb.el.get(), gb.valb));

    gb.valb = '05/01/2012 14:23';
    gb.el.set(gb.valb);

    assert.ok(gb.el.$('input').val() === moment(gb.valb).format('YYYY-MM-DDTHH:mm'));
    assert.ok(Belt.deepEqual(gb.el.get(), moment(gb.valb, 'MM/DD/YYYY HH:mm').toDate()));

    gb.valb = 'not a number';
    gb.el.set(gb.valb);

    assert.ok(gb.el.$('input').val() === '');
    assert.ok(gb.el.get() === undefined);

    gb.el.on('delete', function(){
      return gb.cb();
    });

    return gb.el.$('button').trigger('click');
  });

  test('numberControl-setName', function(done){
    gb.attr = {'name': Belt.uuid(), 'value': '1234'};

    gb.el = _$.numberControl(gb.attr);

    gb.el.render();

    $('#fixture').append(gb.el.$el);

    assert.ok(gb.el.$el.data('name') === gb.attr.name);
    assert.ok(gb.el.$('label').html() === gb.attr.name);
    assert.ok(gb.el.$('input').attr('name') === gb.attr.name);
    assert.ok(gb.el.$('label').attr('for') === gb.attr.name);

    gb.el.setName('monkey');
    assert.ok(gb.el.$el.data('name') === 'monkey');
    assert.ok(gb.el.$('label').html() === 'monkey');
    assert.ok(gb.el.$('input').attr('name') === 'monkey');
    assert.ok(gb.el.$('label').attr('for') === 'monkey');

    gb.parent = _$.view({'views': {'monkey': gb.el}, 'layout': ['monkey']});

    assert.ok(gb.parent.getView('monkey'));
    assert.ok(gb.el.parents['monkey']);

    gb.el.on('setName', function(v){
      assert.ok(v.name === 'frog');
      assert.ok(v.oname === 'monkey');
      return done();
    });

    gb.el.setName('frog');

    assert.ok(gb.el.$el.data('name') === 'frog');
    assert.ok(gb.el.$('label').html() === 'frog');
    assert.ok(gb.el.$('input').attr('name') === 'frog');
    assert.ok(gb.el.$('label').attr('for') === 'frog');
    assert.ok(!gb.parent.getView('monkey'));
    assert.ok(!gb.el.parents['monkey']);
    assert.ok(gb.parent.getView('frog'));
    assert.ok(gb.el.parents['frog']);

    return;
  });

  test('textareaControl', function(done){
    gb.el = _$.textareaControl();
    gb.cb = _.after(3, done);
    $('#fixture').append(gb.el.$el);

    gb.el.on('render', function(){
      return gb.cb();
    });

    gb.el.render();

    assert.ok($('#fixture div[data-control="textarea"][data-name=""]').length === 1);
    assert.ok(gb.el.$('textarea').length === 1);
    assert.ok(gb.el.$('label').length === 1);
    assert.ok(gb.el.$('button').length === 1);

    gb.el.once('change', function(val, ov){
      assert.ok(val.val === gb.val.toString());
      assert.ok(val.oval === '');
      return gb.cb();
    });

    gb.val = 6626526;
    gb.el.set(gb.val);

    assert.ok(gb.el.$('textarea').val() === gb.val.toString());
    assert.ok(gb.el.get() === gb.val.toString());

    gb.valb = 324.234;
    gb.el.set(gb.valb);

    assert.ok(gb.el.$('textarea').val() === gb.valb.toString());
    assert.ok(gb.el.get() === gb.valb.toString());

    gb.valb = '21312';
    gb.el.set(gb.valb);

    assert.ok(gb.el.$('textarea').val() === gb.valb.toString());
    assert.ok(gb.el.get() === gb.valb.toString());

    gb.valb = true;
    gb.el.set(gb.valb);

    assert.ok(gb.el.$('textarea').val() === 'true');
    assert.ok(gb.el.get() === gb.valb.toString());

    gb.el.on('delete', function(){
      return gb.cb();
    });

    return gb.el.$('button').trigger('click');
  });

  test('textareaControl-setName', function(done){
    gb.attr = {'name': Belt.uuid(), 'value': '1234'};

    gb.el = _$.textareaControl(gb.attr);

    gb.el.render();

    $('#fixture').append(gb.el.$el);

    assert.ok(gb.el.$el.data('name') === gb.attr.name);
    assert.ok(gb.el.$('label').html() === gb.attr.name);
    assert.ok(gb.el.$('textarea').attr('name') === gb.attr.name);
    assert.ok(gb.el.$('label').attr('for') === gb.attr.name);

    gb.el.setName('monkey');
    assert.ok(gb.el.$el.data('name') === 'monkey');
    assert.ok(gb.el.$('label').html() === 'monkey');
    assert.ok(gb.el.$('textarea').attr('name') === 'monkey');
    assert.ok(gb.el.$('label').attr('for') === 'monkey');

    gb.parent = _$.view({'views': {'monkey': gb.el}, 'layout': ['monkey']});

    assert.ok(gb.parent.getView('monkey'));
    assert.ok(gb.el.parents['monkey']);

    gb.el.on('setName', function(v){
      assert.ok(v.name === 'frog');
      assert.ok(v.oname === 'monkey');
      return done();
    });

    gb.el.setName('frog');

    assert.ok(gb.el.$el.data('name') === 'frog');
    assert.ok(gb.el.$('label').html() === 'frog');
    assert.ok(gb.el.$('textarea').attr('name') === 'frog');
    assert.ok(gb.el.$('label').attr('for') === 'frog');
    assert.ok(!gb.parent.getView('monkey'));
    assert.ok(!gb.el.parents['monkey']);
    assert.ok(gb.parent.getView('frog'));
    assert.ok(gb.el.parents['frog']);

    return;
  });

  test('checkboxControl', function(done){
    gb.el = _$.checkboxControl({'value': true});
    gb.cb = _.after(3, done);
    $('#fixture').append(gb.el.$el);

    gb.el.on('render', function(){
      return gb.cb();
    });

    gb.el.render();

    assert($('#fixture div[data-control="checkbox"][data-name=""]'));

    assert.ok(gb.el.$('input[type="checkbox"]').length === 1);
    assert.ok(gb.el.$('label').length === 1);
    assert.ok(gb.el.$('button').length === 1);
    assert.ok(gb.el.$('input').prop('checked') === true);

    gb.el.once('change', function(val){
      assert.ok(Belt.deepEqual(val.val, gb.val));
      assert.ok(Belt.deepEqual(val.oval, true));
      return gb.cb();
    });

    gb.val = false;
    gb.el.set(gb.val);

    assert.ok(gb.el.$('input').prop('checked') === false);
    assert.ok(Belt.deepEqual(gb.el.get(), gb.val));

    gb.valb = moment('05/01/2012 14:23', 'MM/DD/YYYY HH:mm').toDate();
    gb.el.set(gb.valb);

    assert.ok(gb.el.$('input').prop('checked') === true);
    assert.ok(Belt.deepEqual(gb.el.get(), gb.el.$('input').prop('checked')));

    gb.valb = '';
    gb.el.set(gb.valb);

    assert.ok(gb.el.$('input').prop('checked') === false);
    assert.ok(Belt.deepEqual(gb.el.get(), gb.el.$('input').prop('checked')));

    gb.el.on('delete', function(){
      return gb.cb();
    });

    return gb.el.$('button').trigger('click');
  });

  test('checkboxControl-setName', function(done){
    gb.attr = {'name': Belt.uuid(), 'value': '1234'};

    gb.el = _$.checkboxControl(gb.attr);

    gb.el.render();

    $('#fixture').append(gb.el.$el);

    assert.ok(gb.el.$el.data('name') === gb.attr.name);
    assert.ok(gb.el.$('label span').html() === gb.attr.name);
    assert.ok(gb.el.$('input').attr('name') === gb.attr.name);

    gb.el.setName('monkey');
    assert.ok(gb.el.$el.data('name') === 'monkey');
    assert.ok(gb.el.$('label span').html() === 'monkey');
    assert.ok(gb.el.$('input').attr('name') === 'monkey');

    gb.parent = _$.view({'views': {'monkey': gb.el}, 'layout': ['monkey']});

    assert.ok(gb.parent.getView('monkey'));
    assert.ok(gb.el.parents['monkey']);

    gb.el.on('setName', function(v){
      assert.ok(v.name === 'frog');
      assert.ok(v.oname === 'monkey');
      return done();
    });

    gb.el.setName('frog');

    assert.ok(gb.el.$el.data('name') === 'frog');
    assert.ok(gb.el.$('label span').html() === 'frog');
    assert.ok(gb.el.$('input').attr('name') === 'frog');

    assert.ok(!gb.parent.getView('monkey'));
    assert.ok(!gb.el.parents['monkey']);
    assert.ok(gb.parent.getView('frog'));
    assert.ok(gb.el.parents['frog']);

    return;
  });

  test('radioControl', function(done){
    gb.el = _$.radioControl({'values': ['a', 'b', 'c'], 'value': 'c'});
    gb.cb = _.after(3, done);
    $('#fixture').append(gb.el.$el);

    gb.el.on('render', function(){
      return gb.cb();
    });

    gb.el.render();

    assert($('#fixture div[data-control="radio"][data-name=""]'));

    assert.ok(gb.el.$('input[type="radio"]').length === 3);
    assert.ok(gb.el.$('label').length === 4);
    assert.ok(gb.el.$('button').length === 1);
    assert.ok(gb.el.$('input[value="c"]').prop('checked') === true);

    gb.el.once('change', function(val){
      assert.ok(Belt.deepEqual(val.val, gb.val));
      assert.ok(Belt.deepEqual(val.oval, 'c'));
      return gb.cb();
    });

    gb.val = 'a';
    gb.el.set(gb.val);

    assert.ok(gb.el.$('input[value="c"]').prop('checked') === false);
    assert.ok(gb.el.$('input[value="a"]').prop('checked') === true);
    assert.ok(Belt.deepEqual(gb.el.get(), gb.val));

    gb.value = moment('05/01/2012 14:23', 'MM/DD/YYYY HH:mm').toDate();

    gb.el.set(gb.value);

    assert.ok(gb.el.$('input:checked').length === 0);
    assert.ok(Belt.deepEqual(gb.el.get(), undefined));

    gb.el.on('delete', function(){
      return gb.cb();
    });

    return gb.el.$('button').trigger('click');
  });

  test('radioControl-2', function(done){
    gb.el = _$.radioControl({'name': 'monkey', 'values': [{'value': 'a', 'readonly': true}, {'value': 'b', 'label': 'frog'}, {'value': 'c'}], 'value': 'c'});
    gb.cb = _.after(3, done);
    $('#fixture').append(gb.el.$el);

    gb.el.on('render', function(){
      return gb.cb();
    });

    gb.el.render();

    assert($('#fixture div[data-control="radio"][data-name="monkey"]'));

    assert.ok(gb.el.$('input[type="radio"]').length === 3);
    assert.ok(gb.el.$('label').length === 4);
    assert.ok(gb.el.$('button').length === 1);
    assert.ok(gb.el.$('input[value="c"]').prop('checked') === true);

    gb.el.once('change', function(val){
      assert.ok(Belt.deepEqual(val.val, gb.val));
      assert.ok(Belt.deepEqual(val.oval, 'c'));
      return gb.cb();
    });

    gb.val = 'a';
    gb.el.set(gb.val);

    assert.ok(gb.el.$('input[value="c"]').prop('checked') === false);
    assert.ok(gb.el.$('input[value="a"]').prop('checked') === true);
    assert.ok(Belt.deepEqual(gb.el.get(), gb.val));

    
    gb.valb = moment('05/01/2012 14:23', 'MM/DD/YYYY HH:mm').toDate();
    gb.el.set(gb.valb);

    assert.ok(gb.el.$('input:checked').length === 0);
    assert.ok(Belt.deepEqual(gb.el.get(), undefined));
    

    gb.el.on('delete', function(){
      return gb.cb();
    });

    return gb.el.$('button').trigger('click');
  });

  test('radioControl-setName', function(done){
    gb.attr = {'name': Belt.uuid(), 'value': '1234'};

    gb.el = _$.radioControl(gb.attr);

    gb.el.render();

    $('#fixture').append(gb.el.$el);

    assert.ok(gb.el.$el.data('name') === gb.attr.name);
    assert.ok(gb.el.$('> label').html() === gb.attr.name);
    assert.ok(gb.el.$('> label').attr('for') === gb.attr.name);

    gb.el.setName('monkey');
    assert.ok(gb.el.$el.data('name') === 'monkey');
    assert.ok(gb.el.$('> label').html() === 'monkey');
    assert.ok(gb.el.$('> label').attr('for') === 'monkey');

    gb.parent = _$.view({'views': {'monkey': gb.el}, 'layout': ['monkey']});

    assert.ok(gb.parent.getView('monkey'));
    assert.ok(gb.el.parents['monkey']);

    gb.el.on('setName', function(v){
      assert.ok(v.name === 'frog');
      assert.ok(v.oname === 'monkey');
      return done();
    });

    gb.el.setName('frog');

    assert.ok(gb.el.$el.data('name') === 'frog');
    assert.ok(gb.el.$('> label').html() === 'frog');
    assert.ok(gb.el.$('> label').attr('for') === 'frog');

    assert.ok(!gb.parent.getView('monkey'));
    assert.ok(!gb.el.parents['monkey']);
    assert.ok(gb.parent.getView('frog'));
    assert.ok(gb.el.parents['frog']);

    return;
  });

  test('selectControl', function(done){
    gb.el = _$.selectControl({'values': ['a', 'b', 'c'], 'value': 'c'});
    gb.cb = _.after(3, done);
    $('#fixture').append(gb.el.$el);

    gb.el.on('render', function(){
      return gb.cb();
    });

    gb.el.render();

    assert($('#fixture div[data-control="select"][data-name=""]'));

    assert.ok(gb.el.$('option').length === 4);
    assert.ok(gb.el.$('option:selected').length === 1);
    assert.ok(gb.el.$('select').length === 1);
    assert.ok(gb.el.$('label').length === 5);
    assert.ok(gb.el.$('button.remove').length === 1);
    assert.ok(gb.el.$('option[value="c"]').prop('selected') === true);

    gb.el.once('change', function(val){
      assert.ok(Belt.deepEqual(val.val, gb.val));
      assert.ok(Belt.deepEqual(val.oval, 'c'));
      return gb.cb();
    });

    gb.val = 'a';
    gb.el.set(gb.val);

    assert.ok(gb.el.$('option[value="c"]').prop('selected') === false);
    assert.ok(gb.el.$('option[value="a"]').prop('selected') === true);
    assert.ok(Belt.deepEqual(gb.el.get(), gb.val));

    gb.valb = moment('05/01/2012 14:23', 'MM/DD/YYYY HH:mm').toDate();
    gb.el.set(gb.valb);

    assert.ok(Belt.deepEqual(gb.el.get(), undefined));

    gb.el.on('delete', function(){
      return gb.cb();
    });

    return gb.el.$('button').trigger('click');
  });

  test('selectControl-multiselect', function(done){
    gb.el = _$.selectControl({'values': ['a', 'b', 'c'], 'value': ['a', 'c'], 'multiple': true});
    gb.cb = _.after(3, done);
    $('#fixture').append(gb.el.$el);

    gb.el.on('render', function(){
      return gb.cb();
    });

    gb.el.render();

    assert.ok(gb.el.$('option').length === 3);
    assert.ok(gb.el.$('option:selected').length === 2);
    assert.ok(gb.el.$('select').length === 1);
    assert.ok(gb.el.$('label').length === 4);
    assert.ok(gb.el.$('button.remove').length === 1);
    assert.ok(gb.el.$('option[value="c"]').prop('selected') === true);
    assert.ok(gb.el.$('option[value="a"]').prop('selected') === true);
    assert.ok(gb.el.$('option[value="b"]').prop('selected') === false);

    gb.el.once('change', function(val){
      assert.ok(Belt.deepEqual(val.val, gb.val));
      assert.ok(Belt.deepEqual(val.oval, ['a', 'c']));
      return gb.cb();
    });

    gb.val = 'a';
    gb.el.set(gb.val);

    gb.el.once('change', function(val){
      assert.ok(Belt.deepEqual(val.val, gb.valb));
      assert.ok(Belt.deepEqual(val.oval, ['a']));
      return gb.cb();
    });

    assert.ok(gb.el.$('option[value="c"]').prop('selected') === false);
    assert.ok(gb.el.$('option[value="a"]').prop('selected') === true);
    assert.ok(Belt.deepEqual(gb.el.get(), [gb.val]));

    gb.valb = moment('05/01/2012 14:23', 'MM/DD/YYYY HH:mm').toDate();
    gb.el.set(gb.valb);

    assert.ok(Belt.deepEqual(gb.el.get(), []));

    gb.el.once('change', function(val){
      assert.ok(Belt.deepEqual(val.val, ['a', 'b']));
      assert.ok(Belt.deepEqual(val.oval, ['a']));
      return gb.cb();
    });

    gb.val = ['a', 'b'];
    gb.el.set(gb.val);

    assert.ok(Belt.deepEqual(gb.el.get(), ['a', 'b']));

    gb.el.on('delete', function(){
      return gb.cb();
    });

    return gb.el.$('button').trigger('click');
  });

  test('selectControl-setName', function(done){
    gb.attr = {'name': Belt.uuid(), 'value': '1234'};

    gb.el = _$.selectControl(gb.attr);

    gb.el.render();

    $('#fixture').append(gb.el.$el);

    assert.ok(gb.el.$el.data('name') === gb.attr.name);
    assert.ok(gb.el.$('> label').html() === gb.attr.name);
    assert.ok(gb.el.$('> label').attr('for') === gb.attr.name);

    gb.el.setName('monkey');
    assert.ok(gb.el.$el.data('name') === 'monkey');
    assert.ok(gb.el.$('> label').html() === 'monkey');
    assert.ok(gb.el.$('> label').attr('for') === 'monkey');

    gb.parent = _$.view({'views': {'monkey': gb.el}, 'layout': ['monkey']});

    assert.ok(gb.parent.getView('monkey'));
    assert.ok(gb.el.parents['monkey']);

    gb.el.on('setName', function(v){
      assert.ok(v.name === 'frog');
      assert.ok(v.oname === 'monkey');
      return done();
    });

    gb.el.setName('frog');

    assert.ok(gb.el.$el.data('name') === 'frog');
    assert.ok(gb.el.$('> label').html() === 'frog');
    assert.ok(gb.el.$('> label').attr('for') === 'frog');

    assert.ok(!gb.parent.getView('monkey'));
    assert.ok(!gb.el.parents['monkey']);
    assert.ok(gb.parent.getView('frog'));
    assert.ok(gb.el.parents['frog']);

    return;
  });

  gb.date = moment('04/02/2012', 'MM/DD/YYYY');

  test('get-set-obj', function(done){
    gb.textControl = _$.textControl({'value': 'a text control', 'name': 'textControl'});
    gb.numberControl = _$.numberControl({'value': 12, 'name': 'numberControl'});
    gb.datetimeControl = _$.datetimeControl({'value': gb.date, 'name': 'datetimeControl'});
    gb.checkboxControl = _$.checkboxControl({'value': true, 'name': 'checkboxControl'});
    gb.textareaControl = _$.textareaControl({'value': 'textarea value', 'name': 'textareaControl'});
    gb.radioControl = _$.radioControl({'name': 'radioControl', 'values': ['a', 'b', 'c'], 'value': 'c'});
    gb.selectControl = _$.selectControl({'values': ['apple', 'banana', 'carrot']
                                       , 'value': 'carrot', 'name': 'selectControl'});

    gb.form = _$.view({'class': 'form-horizontal', 'tag': 'form'
    , 'views': {'textControl': gb.textControl, 'numberControl': gb.numberControl
               , 'datetimeControl': gb.datetimeControl, 'checkboxControl': gb.checkboxControl
               , 'textareaControl': gb.textareaControl, 'radioControl': gb.radioControl
               , 'selectControl': gb.selectControl}
    , 'layout': ['textControl', 'numberControl', 'datetimeControl', 'checkboxControl'
                , 'textareaControl', 'radioControl', 'selectControl']});

    gb.form.render();
    $('#fixture').html(gb.form.getEl());

    assert.ok(Belt.deepEqual(gb.form.getObj(), {
      'textControl': 'a text control'
    , 'numberControl': 12
    , 'datetimeControl': gb.date.toDate()
    , 'checkboxControl': true
    , 'textareaControl': 'textarea value'
    , 'radioControl': 'c'
    , 'selectControl': 'carrot'
    }));

    assert.ok(Belt.deepEqual(gb.form.getObj({'keys': ['numberControl', 'radioControl']}), {
      'numberControl': 12
    , 'radioControl': 'c'
    }));

    gb.dateb = moment('06/02/2012', 'MM/DD/YYYY');
    gb.val = gb.form.setObj({
      'textControl': 'a'
    , 'numberControl': 1
    , 'datetimeControl': gb.dateb
    , 'checkboxControl': false
    , 'textareaControl': 'area value'
    , 'radioControl': 'b'
    , 'selectControl': 'apple'
    });

    assert.ok(Belt.deepEqual(gb.val.val, {
      'textControl': 'a'
    , 'numberControl': 1
    , 'datetimeControl': gb.dateb
    , 'checkboxControl': false
    , 'textareaControl': 'area value'
    , 'radioControl': 'b'
    , 'selectControl': 'apple'
    }));

    assert.ok(Belt.deepEqual(gb.val.oval, {
      'textControl': 'a text control'
    , 'numberControl': 12
    , 'datetimeControl': gb.date.toDate()
    , 'checkboxControl': true
    , 'textareaControl': 'textarea value'
    , 'radioControl': 'c'
    , 'selectControl': 'carrot'
    }));

    assert.ok(Belt.deepEqual(gb.form.getObj(), {
      'textControl': 'a'
    , 'numberControl': 1
    , 'datetimeControl': gb.dateb.toDate()
    , 'checkboxControl': false
    , 'textareaControl': 'area value'
    , 'radioControl': 'b'
    , 'selectControl': 'apple'
    }));

    gb.val = gb.form.setObj({
      'textControl': 'ghf'
    });

    assert.ok(Belt.deepEqual(gb.val.oval, {
      'textControl': 'a'
    , 'numberControl': 1
    , 'datetimeControl': gb.dateb.toDate()
    , 'checkboxControl': false
    , 'textareaControl': 'area value'
    , 'radioControl': 'b'
    , 'selectControl': 'apple'
    }));

    assert.ok(Belt.deepEqual(gb.val.val, {
      'textControl': 'ghf'
    }));

    assert.ok(Belt.deepEqual(gb.form.getObj(), {
      'textControl': 'ghf'
    }));
    assert.ok(gb.form.views.textControl);
    assert.ok(_.keys(gb.form.views).length === 1);
    assert.ok(Belt.deepEqual(gb.form.layout, ['textControl']));
    assert.ok(gb.form.$el.children().length === 1);

    gb.val = gb.form.setObj({
      'textControl': 'sdfsd'
    , 'egg': true
    , 'fish': 3
    , 'tacos': 'more please'
    });

    assert.ok(Belt.deepEqual(gb.val.oval, {
      'textControl': 'ghf'
    }));
    assert.ok(Belt.deepEqual(gb.val.val, {
      'textControl': 'sdfsd'
    , 'egg': true
    , 'fish': 3
    , 'tacos': 'more please'
    }));

    assert.ok(Belt.deepEqual(gb.form.getObj(), {
      'textControl': 'sdfsd'
    , 'egg': true
    , 'fish': 3
    , 'tacos': 'more please'
    }));
    assert.ok(gb.form.views.textControl);
    assert.ok(_.keys(gb.form.views).length === 4);
    assert.ok(Belt.deepEqual(gb.form.layout, ['textControl', 'egg', 'fish', 'tacos']));
    assert.ok(gb.form.$el.children().length === 4);
    assert.ok(gb.form.$('[data-control="text"][data-name="textControl"]').length === 1);
    assert.ok(gb.form.$('[data-control="mutable"]').length === 3);
    assert.ok(gb.form.$('[data-control="mutable"][data-name="egg"]').length === 1);
    assert.ok(gb.form.$('[data-control="mutable"][data-name="fish"]').length === 1);
    assert.ok(gb.form.$('[data-control="mutable"][data-name="tacos"]').length === 1);
    assert.ok(gb.form.$('[data-control="mutable"][data-name="egg"] > [data-control="checkbox"][data-name="egg"]').length === 1);
    assert.ok(gb.form.$('[data-control="mutable"][data-name="fish"] > [data-control="number"][data-name="fish"]').length === 1);
    assert.ok(gb.form.$('[data-control="mutable"][data-name="tacos"] > [data-control="text"][data-name="tacos"]').length === 1);

    gb.form.getView('textControl').setName('plain');
    assert.ok(Belt.deepEqual(gb.form.layout, ['plain', 'egg', 'fish', 'tacos']));

    assert.ok(Belt.deepEqual(gb.form.getObj(), {
      'egg': true
    , 'fish': 3
    , 'tacos': 'more please'
    , 'plain': 'sdfsd'
    }));

    assert.ok(gb.form.$('[data-control="text"][data-name="plain"] input[name="plain"]').length === 1);

    gb.form.getView('fish').setName('trout');
    gb.form.getView('tacos').setName('tortillas');
    gb.form.getView('egg').setName('zygote');

    assert.ok(gb.form.$('[data-control="mutable"][data-name="zygote"]').length === 1);
    assert.ok(gb.form.$('[data-control="mutable"][data-name="trout"]').length === 1);
    assert.ok(gb.form.$('[data-control="mutable"][data-name="tortillas"]').length === 1);
    assert.ok(gb.form.$('[data-control="mutable"][data-name="zygote"] > [data-control="checkbox"][data-name="zygote"]').length === 1);
    assert.ok(gb.form.$('[data-control="mutable"][data-name="trout"] > [data-control="number"][data-name="trout"]').length === 1);
    assert.ok(gb.form.$('[data-control="mutable"][data-name="tortillas"] > [data-control="text"][data-name="tortillas"]').length === 1);

    assert.ok(Belt.deepEqual(gb.form.getObj(), {
      'plain': 'sdfsd'
    , 'trout': 3
    , 'tortillas': 'more please'
    , 'zygote': true
    }));

    gb.form.setObj({
      'plain': 'giant text'
    , 'trout': false
    , 'tortillas': gb.date.toDate()
    , 'zygote': 243
    });

    assert.ok(Belt.deepEqual(gb.form.getObj(), {
      'plain': 'giant text'
    , 'trout': false
    , 'tortillas': gb.date.toDate()
    , 'zygote': 243
    }));

    assert.ok(gb.form.$('[data-control="mutable"][data-name="zygote"]').length === 1);
    assert.ok(gb.form.$('[data-control="mutable"][data-name="trout"]').length === 1);
    assert.ok(gb.form.$('[data-control="mutable"][data-name="tortillas"]').length === 1);
    assert.ok(gb.form.$('[data-control="mutable"][data-name="zygote"] > [data-control="number"][data-name="zygote"]').length === 1);
    assert.ok(gb.form.$('[data-control="mutable"][data-name="trout"] > [data-control="checkbox"][data-name="trout"]').length === 1);
    assert.ok(gb.form.$('[data-control="mutable"][data-name="tortillas"] > [data-control="datetime-local"][data-name="tortillas"]').length === 1);

    gb.form.setObj({
      'plain': 'giant text'
    , 'tortillas': gb.date.toDate()
    });

    assert.ok(Belt.deepEqual(gb.form.getObj(), {
      'plain': 'giant text'
    , 'tortillas': gb.date.toDate()
    }));

    assert.ok(gb.form.$('[data-control="mutable"][data-name="zygote"]').length === 0);
    assert.ok(gb.form.$('[data-control="mutable"][data-name="trout"]').length === 0);
    assert.ok(gb.form.$('[data-control="mutable"][data-name="tortillas"]').length === 1);
    assert.ok(gb.form.$('[data-control="mutable"][data-name="zygote"] > [data-control="number"][data-name="zygote"]').length === 0);
    assert.ok(gb.form.$('[data-control="mutable"][data-name="trout"] > [data-control="checkbox"][data-name="trout"]').length === 0);
    assert.ok(gb.form.$('[data-control="mutable"][data-name="tortillas"] > [data-control="datetime-local"][data-name="tortillas"]').length === 1);

   gb.form.setObj({
     'tortillas': true
   }, {'do_not_delete': true});

    assert.ok(Belt.deepEqual(gb.form.getObj(), {
      'plain': 'giant text'
    , 'tortillas': true
    }));

    assert.ok(gb.form.$('[data-control="mutable"][data-name="tortillas"] > [data-control="checkbox"][data-name="tortillas"]').length === 1);

    return done();
  });

  test('mutableControl', function(done){
    gb.el = _$.mutableControl({'value': 'c', 'name': 'donkey'});
    gb.el.render();
    $('#fixture').append(gb.el.$el);

    assert.ok(gb.el.$el.data('control') === 'mutable');
    assert.ok(gb.el.$el.data('name') === 'donkey');
    assert.ok(gb.el.$('> [data-control="text"]').length === 1);
    assert.ok(gb.el.$('> [data-name="donkey"]').length === 1);

    assert.ok(gb.el.get() === 'c');
    gb.val = gb.el.set('this is text');

    assert.ok(gb.val.val === 'this is text');
    assert.ok(gb.val.oval === 'c');
    assert.ok(gb.el.get() === 'this is text');
    assert.ok(gb.el.$el.data('control') === 'mutable');
    assert.ok(gb.el.$el.data('name') === 'donkey');
    assert.ok(gb.el.$('> [data-control="text"]').length === 1);
    assert.ok(gb.el.$('> [data-name="donkey"]').length === 1);

    gb.val = gb.el.set('this is a longer amount of text that has become a textarea as a result');
    assert(!gb.val.val);
    assert.ok(gb.el.get() === 'this is a longer amount of text that has become a textarea as a result');
    assert.ok(gb.el.$el.data('control') === 'mutable');
    assert.ok(gb.el.$el.data('name') === 'donkey');
    assert.ok(gb.el.$('> [data-control="textarea"]').length === 1);
    assert.ok(gb.el.$('> [data-name="donkey"]').length === 1);


    gb.val = gb.el.set(false);
    assert(!gb.val.val);
    assert.ok(gb.el.get() === false);
    assert.ok(gb.el.$el.data('control') === 'mutable');
    assert.ok(gb.el.$el.data('name') === 'donkey');
    assert.ok(gb.el.$('> [data-control="checkbox"]').length === 1);
    assert.ok(gb.el.$('> [data-name="donkey"]').length === 1);

    gb.val = gb.el.set(123);
    assert(!gb.val.val);
    assert.ok(gb.el.get() === 123);
    assert.ok(gb.el.$el.data('control') === 'mutable');
    assert.ok(gb.el.$el.data('name') === 'donkey');
    assert.ok(gb.el.$('> [data-control="number"]').length === 1);
    assert.ok(gb.el.$('> [data-name="donkey"]').length === 1);

    gb.val = gb.el.set(gb.date.toDate());

    assert(!gb.val.val);
    assert.ok(Belt.deepEqual(gb.el.get(), gb.date.toDate()));
    assert.ok(gb.el.$el.data('control') === 'mutable');
    assert.ok(gb.el.$el.data('name') === 'donkey');
    assert.ok(gb.el.$('> [data-control="datetime-local"]').length === 1);
    assert.ok(gb.el.$('> [data-name="donkey"]').length === 1);

    gb.val = gb.el.set(gb.date.toDate());
    assert.ok(Belt.deepEqual(gb.val.oval, gb.date.toDate()));


    gb.el.set('c', {'$control': 'selectControl', 'values': ['a', 'b', 'c'], 'multiple': true})
    assert.ok(Belt.deepEqual(gb.el.get(), ['c']));
    assert.ok(gb.el.$el.data('control') === 'mutable');
    assert.ok(gb.el.$el.data('name') === 'donkey');

    assert.ok(gb.el.$('> [data-control="select"]').length === 1);
    assert.ok(gb.el.$('> [data-name="donkey"]').length === 1);

    gb.el.set(['a', 'c'], {'skip_replace': true});

    assert.ok(Belt.deepEqual(gb.el.get(), ['a', 'c']));

    gb.el.setName('monkey');
    assert.ok(gb.el.$el.data('control') === 'mutable');
    assert.ok(gb.el.$el.data('name') === 'monkey');
    assert.ok(gb.el.$('> [data-control="select"][data-name="monkey"]').length === 1);
    assert.ok(gb.el.$('> [data-control="select"][data-name="monkey"] select[name="monkey"]').length === 1);

    gb.el.set(['a', 'c']);
    assert.ok(gb.el.$el.data('control') === 'mutable');
    assert.ok(gb.el.$el.data('name') === 'monkey');
    assert.ok(gb.el.$('> fieldset[data-control="array"][data-name="monkey"]').length === 1);
    assert.ok(gb.el.$('legend').length === 1);
    assert.ok(gb.el.$('input').length === 2);

    assert.ok(Belt.deepEqual(gb.el.get(), ['a', 'c']));

    gb.el.set(['a', 'c', 'efg', true]);
    assert.ok(Belt.deepEqual(gb.el.get(), ['a', 'c', 'efg', true]));

    assert.ok(gb.el.$('legend').length === 1);
    assert.ok(gb.el.$('input').length === 4);
    assert.ok(gb.el.$('input[type="text"]').length === 3);
    assert.ok(gb.el.$('input[type="checkbox"]').length === 1);

    gb.el.set(['a', 'c', 'this is a really long bit of text for a textarea element to appear', true]);
    assert.ok(Belt.deepEqual(gb.el.get(), ['a', 'c', 'this is a really long bit of text for a textarea element to appear', true]));

    assert.ok(gb.el.$('input').length === 3);
    assert.ok(gb.el.$('input[type="text"]').length === 2);
    assert.ok(gb.el.$('input[type="checkbox"]').length === 1);
    assert.ok(gb.el.$('textarea').length === 1);

    gb.el.set([1, {}, []]);
    assert.ok(Belt.deepEqual(gb.el.get(), [1, {}, []]));

    assert.ok(gb.el.$('legend').length === 3);
    assert.ok(gb.el.$('input').length === 1);
    assert.ok(gb.el.$('input[type="number"]').length === 1);
    assert.ok(gb.el.$('[data-control="array"]').length === 2);
    assert.ok(gb.el.$('[data-control="object"]').length === 1);

    gb.el.set({a: 'a', c: 'c'});
    assert.ok(gb.el.$el.data('control') === 'mutable');
    assert.ok(gb.el.$el.data('name') === 'monkey');
    assert.ok(gb.el.$('> fieldset[data-control="object"][data-name="monkey"]').length === 1);
    assert.ok(gb.el.$('legend').length === 1);
    assert.ok(gb.el.$('input').length === 2);

    assert.ok(Belt.deepEqual(gb.el.get(), {a: 'a', c: 'c'}));

    gb.el.set({a: 'a', c: 'c', d: 'efg', e: true});
    assert.ok(Belt.deepEqual(gb.el.get(), {a: 'a', c: 'c', d: 'efg', e: true}));

    assert.ok(gb.el.$('legend').length === 1);
    assert.ok(gb.el.$('input').length === 4);
    assert.ok(gb.el.$('input[type="text"]').length === 3);
    assert.ok(gb.el.$('input[type="checkbox"]').length === 1);

    gb.el.set({a: 'a', c: 'c', d: 'this is a really long bit of text for a textarea element to appear', e: true});
    assert.ok(Belt.deepEqual(gb.el.get(), {a: 'a', c: 'c', d: 'this is a really long bit of text for a textarea element to appear', e: true}));

    assert.ok(gb.el.$('input').length === 3);
    assert.ok(gb.el.$('input[type="text"]').length === 2);
    assert.ok(gb.el.$('input[type="checkbox"]').length === 1);
    assert.ok(gb.el.$('textarea').length === 1);

    gb.el.set({a: 1, c: {}, b: []});
    assert.ok(Belt.deepEqual(gb.el.get(), {a: 1, c: {}, b: []}));

    assert.ok(gb.el.$('legend').length === 3);
    assert.ok(gb.el.$('input').length === 1);
    assert.ok(gb.el.$('input[type="number"]').length === 1);
    assert.ok(gb.el.$('[data-control="array"]').length === 1);
    assert.ok(gb.el.$('[data-control="object"]').length === 2);

    gb.el.on('delete', function(){
      return done();
    });

    return gb.el.$('button').trigger('click');
  });

  test('mutableControl-setName', function(done){
    gb.attr = {'name': Belt.uuid(), 'value': '1234'};

    gb.el = _$.mutableControl(gb.attr);

    gb.el.render();

    $('#fixture').append(gb.el.$el);

    assert.ok(gb.el.$el.data('name') === gb.attr.name);
    assert.ok(gb.el.$('label').html() === gb.attr.name);
    assert.ok(gb.el.$('input').attr('name') === gb.attr.name);
    assert.ok(gb.el.$('label').attr('for') === gb.attr.name);

    gb.el.setName('monkey');
    assert.ok(gb.el.$el.data('name') === 'monkey');
    assert.ok(gb.el.$('label').html() === 'monkey');
    assert.ok(gb.el.$('input').attr('name') === 'monkey');
    assert.ok(gb.el.$('label').attr('for') === 'monkey');

    gb.parent = _$.view({'views': {'monkey': gb.el}, 'layout': ['monkey']});

    assert.ok(gb.parent.getView('monkey'));
    assert.ok(gb.el.parents['monkey']);

    gb.el.on('setName', function(v){
      assert.ok(v.name === 'frog');
      assert.ok(v.oname === 'monkey');
      return done();
    });

    gb.el.setName('frog');

    assert.ok(gb.el.$el.data('name') === 'frog');
    assert.ok(gb.el.$('label').html() === 'frog');
    assert.ok(gb.el.$('input').attr('name') === 'frog');
    assert.ok(gb.el.$('label').attr('for') === 'frog');
    assert.ok(!gb.parent.getView('monkey'));
    assert.ok(!gb.el.parents['monkey']);
    assert.ok(gb.parent.getView('frog'));
    assert.ok(gb.el.parents['frog']);

    return;
  });
});

suite('objects', function(){
  setup(function(){
    return $('#fixture').html('<form class="form-horizontal"></form>');
  });
  teardown(function(){
    return $('#fixture').html('');
  });

  test('objectControl-setName', function(done){
    gb.obj = {'simple': 'object'};
    gb.el = _$.mutableControl({'value': gb.obj, 'name': 'object'});
    gb.el.render();
    $('#fixture form').append(gb.el.$el);

    assert.ok(gb.el.$el.data('name') === 'object');
    assert.ok(gb.el.$('legend').html() === 'object');

    gb.el.setName('monkey');
    assert.ok(gb.el.$el.data('name') === 'monkey');
    assert.ok(gb.el.$('legend').html() === 'monkey');

    gb.parent = _$.view({'views': {'monkey': gb.el}, 'layout': ['monkey']});

    assert.ok(gb.parent.getView('monkey'));
    assert.ok(gb.el.parents['monkey']);

    gb.el.on('setName', function(v){
      assert.ok(v.name === 'frog');
      assert.ok(v.oname === 'monkey');
      return done();
    });

    gb.el.setName('frog');

    assert.ok(gb.el.$el.data('name') === 'frog');
    assert.ok(gb.el.$('legend').html() === 'frog');
    assert.ok(gb.el.$el.attr('name') === 'frog');
    assert.ok(!gb.parent.getView('monkey'));
    assert.ok(!gb.el.parents['monkey']);
    assert.ok(gb.parent.getView('frog'));
    assert.ok(gb.el.parents['frog']);

    return done();
  });

  test('objectControl-set-get', function(done){
    gb.obj = {'simple': 'object'};
    gb.el = _$.mutableControl({'value': gb.obj, 'name': 'object'});
    gb.el.render();
    $('#fixture form').append(gb.el.$el);

    assert.ok(Belt.deepEqual(gb.obj, gb.el.get()));
    _.each(Belt.objFlatten(gb.obj), function(v, k){
      assert.ok(gb.el.getView(k));
      gb.le = k.split('.').pop();
      assert.ok(gb.el.getEl().find('[data-name="' + gb.le + '"]:visible button.remove'));
      return assert.ok(Belt.deepEqual(gb.el.getPath(k), v));
    });

    _.each(Belt.objFlatten(gb.obj, {'deepest': true}), function(v, k){
      if (!gb.el.getView(k)) return;
      gb.el.getView(k).getEl().find('button.remove').trigger('click');
      assert.ok(!Belt.deepEqual(gb.el.getPath(k), v));
    });

    gb.obj = 'simple';
    gb.el.set(gb.obj);
    assert.ok(Belt.deepEqual(gb.obj, gb.el.get()));

    return done();
  });

  test('objectControl-set-get', function(done){
    gb.obj = [];
    gb.el.set(gb.obj);
    assert.ok(Belt.deepEqual(gb.obj, gb.el.get()));
    _.each(Belt.objFlatten(gb.obj), function(v, k){
      assert.ok(gb.el.getView(k));
      gb.le = k.split('.').pop();
      assert.ok(gb.el.getEl().find('[data-name="' + gb.le + '"]:visible button.remove'));
      assert.ok(Belt.isNull(gb.el.getPath(k)) || !Belt.deepEqual(gb.el.getPath(k), v));
    });

    gb.obj = {
      name: 'John Smith',
      hobbies: ['surfing', 'diving'],
      friends: []
    };
    gb.el.set(gb.obj);
    assert.ok(Belt.deepEqual(gb.obj, gb.el.get()));
    _.each(Belt.objFlatten(gb.obj), function(v, k){
      assert.ok(gb.el.getView(k));
      gb.le = k.split('.').pop();
      assert.ok(gb.el.getEl().find('[data-name="' + gb.le + '"]:visible button.remove'));
      return assert.ok(Belt.deepEqual(gb.el.getPath(k), v));
    });

    _.each(Belt.objFlatten(gb.obj, {'deepest': true}), function(v, k){
      if (!gb.el.getView(k) || Belt.isObj(v)) return;
      gb.el.getView(k).getEl().find('button.remove').trigger('click');
      assert.ok(Belt.isNull(gb.el.getPath(k)) || !Belt.deepEqual(gb.el.getPath(k), v));
    });

    return done();
  });

  test('objectControl-set-get', function(done){
    gb.obj = {
      name: 'Bob Boston',
      hobbies: ['rowing', 'smurfing'],
      friends: [{
        name: 'John Smith',
        hobbies: ['surfing', 'diving'],
        friends: []
      }]
    };
    gb.el.set(gb.obj);

    assert.ok(Belt.deepEqual(gb.obj, gb.el.get()));
    _.each(Belt.objFlatten(gb.obj), function(v, k){
      assert.ok(gb.el.getView(k));
      gb.le = k.split('.').pop();
      assert.ok(gb.el.getEl().find('[data-name="' + gb.le + '"]:visible button.remove'));
      return assert.ok(Belt.deepEqual(gb.el.getPath(k), v));
    });

    gb.obj = {
      name: 'Bob Boston',
      hobbies: ['rowing', 'surfing'],
      friends: [{
        name: 'John Smith',
        hobbies: ['surfing', 'diving'],
        friends: [{'name': [1, true, false, moment('01/01/2001', 'MM/DD/YYYY').toDate()]}]
      }]
    };
    gb.el.set(gb.obj);
    assert.ok(Belt.deepEqual(gb.obj, gb.el.get()));
    _.each(Belt.objFlatten(gb.obj), function(v, k){
      assert.ok(gb.el.getView(k));
      gb.le = k.split('.').pop();
      assert.ok(gb.el.getEl().find('[data-name="' + gb.le + '"]:visible button.remove'));
      return assert.ok(Belt.deepEqual(gb.el.getPath(k), v));
    });

    gb.el.setPath('friends.hobbies.1', true);

    return done();
  });

  test('objectControl-set-get', function(done){
    gb.obj = {
      name: 'Bob Boston',
      hobbies: ['rowing', 'surfing'],
      friends: [{
        name: 'John Smith is a really long bit of text to see if this changes the control or not and see if it is working',
        hobbies: ['surfing', true],
        friends: [{'name': [1, true, false, moment('01/01/2001', 'MM/DD/YYYY').toDate()]}]
      }]
    };

    gb.el.set(gb.obj);
    assert.ok(Belt.deepEqual(gb.obj, gb.el.get()));
    _.each(Belt.objFlatten(gb.obj), function(v, k){
      assert.ok(gb.el.getView(k));
      gb.le = k.split('.').pop();
      assert.ok(gb.el.getEl().find('[data-name="' + gb.le + '"]:visible button.remove'));
      return assert.ok(Belt.deepEqual(gb.el.getPath(k), v));
    });

    gb.o = Belt.objFlatten(gb.obj, {'deepest': true});
    gb.ind = 0;
    _.each(gb.o, function(v, k){
      if (!gb.el.getView(k)) return gb.ind++;

      gb.el.getView(k).on('delete', function(){
        return gb.ind++;
      });

      gb.el.getView(k).getEl().find('button.remove').trigger('click');

      return;
    });
    assert.ok(gb.ind === _.keys(gb.o).length);

    gb.obj = {
      name: 'Bob Boston',
      hobbies: ['rowing', 'surfing']
    };

    /*gb.el.set(gb.obj);*/

    gb.el.delete();

    gb.el = _$.mutableControl({'value': gb.obj, 'name': 'object'});
    gb.el.render();
    $('#fixture form').append(gb.el.$el);

    gb.el.getView('hobbies').push('knitting');
    assert.ok(Belt.deepEqual(gb.el.getPath('hobbies'), ['rowing', 'surfing', 'knitting']));

    gb.el.getView('hobbies').shift();
    assert.ok(Belt.deepEqual(gb.el.getPath('hobbies'), ['surfing', 'knitting']));

    gb.el.getView('hobbies').move(0, 1);
    assert.ok(Belt.deepEqual(gb.el.getPath('hobbies'), ['knitting', 'surfing']));

    gb.el.getView('hobbies').pop();
    assert.ok(Belt.deepEqual(gb.el.getPath('hobbies'), ['knitting']));

    gb.el.getView('hobbies').unshift('jumping');
    assert.ok(Belt.deepEqual(gb.el.getPath('hobbies'), ['jumping', 'knitting']));

    gb.el.deletePath('hobbies.0');
    assert.ok(Belt.deepEqual(gb.el.getPath('hobbies'), ['knitting']));

    gb.el.deletePath('name');
    assert.ok(Belt.deepEqual(gb.el.get(), {'hobbies': ['knitting']}));

    return done();
  });

  test('arrayControl', function(done){
    gb.obj = {
      name: 'Bob Boston',
      hobbies: ['rowing', 'surfing']
    };

    gb.el = _$.mutableControl({'value': gb.obj, 'name': 'object'});
    gb.el.render();
    $('#fixture form').append(gb.el.$el);

    assert.ok(Belt.deepEqual(gb.obj, gb.el.get()));

    gb.el.getView('hobbies').push('knitting');
    assert.ok(Belt.deepEqual(gb.el.getPath('hobbies'), ['rowing', 'surfing', 'knitting']));

    gb.el.getView('hobbies').shift();
    assert.ok(Belt.deepEqual(gb.el.getPath('hobbies'), ['surfing', 'knitting']));

    gb.el.getView('hobbies').move(0, 1);
    assert.ok(Belt.deepEqual(gb.el.getPath('hobbies'), ['knitting', 'surfing']));

    gb.el.getView('hobbies').pop();
    assert.ok(Belt.deepEqual(gb.el.getPath('hobbies'), ['knitting']));

    gb.el.getView('hobbies').unshift('jumping');
    assert.ok(Belt.deepEqual(gb.el.getPath('hobbies'), ['jumping', 'knitting']));

    gb.el.deletePath('hobbies.0');
    assert.ok(Belt.deepEqual(gb.el.getPath('hobbies'), ['knitting']));

    gb.el.deletePath('name');
    assert.ok(Belt.deepEqual(gb.el.get(), {'hobbies': ['knitting']}));

    return done();
  });

  test('viewsArray', function(done){
    gb.obj = ['rowing', 'surfing'];

    gb.el = _$.viewsArray({'value': gb.obj, 'name': 'object'});
    gb.el.render();
    $('#fixture form').append(gb.el.$el);

    assert.ok(Belt.deepEqual(gb.obj, gb.el.get()));

    gb.el.push('knitting');
    assert.ok(Belt.deepEqual(gb.el.get(), ['rowing', 'surfing', 'knitting']));

    gb.el.shift();
    assert.ok(Belt.deepEqual(gb.el.get(), ['surfing', 'knitting']));

    gb.el.move(0, 1);
    assert.ok(Belt.deepEqual(gb.el.get(), ['knitting', 'surfing']));

    gb.el.pop();
    assert.ok(Belt.deepEqual(gb.el.get(), ['knitting']));

    gb.el.unshift('jumping');
    assert.ok(Belt.deepEqual(gb.el.get(), ['jumping', 'knitting']));

    gb.el.deletePath('0');
    assert.ok(Belt.deepEqual(gb.el.get(), ['knitting']));

    return done();
  });
});

suite('statuses', function(){
  setup(function(){
    return $('#fixture').html('');
  });
  teardown(function(){
    return $('#fixture').html('');
  });

  test('textControl-setStatus', function(done){
    gb.attr = {'name': Belt.uuid(), 'value': '1234'};

    gb.el = _$.textControl(gb.attr);

    gb.el.render();

    $('#fixture').append(gb.el.$el);

    assert.ok(!gb.el.getState());
    assert.ok(!gb.el.getStatus().state);
    assert.ok(Belt.deepEqual(gb.el.getStatus().status, []));

    gb.rt = gb.el.setState('success');
    assert.ok(gb.el.getEl().hasClass('has-success'));
    assert.ok(!gb.el.getEl().hasClass('has-error'));
    assert.ok(!gb.el.getEl().hasClass('has-warning'));
    assert.ok(gb.rt.state === 'success');
    assert.ok(gb.rt.ostate === undefined);

    gb.rt = gb.el.setState('error');
    assert.ok(!gb.el.getEl().hasClass('has-success'));
    assert.ok(gb.el.getEl().hasClass('has-error'));
    assert.ok(!gb.el.getEl().hasClass('has-warning'));
    assert.ok(gb.rt.state === 'error');
    assert.ok(gb.rt.ostate === 'success');

    gb.rt = gb.el.setState(false);
    assert.ok(!gb.el.getEl().hasClass('has-success'));
    assert.ok(!gb.el.getEl().hasClass('has-error'));
    assert.ok(!gb.el.getEl().hasClass('has-warning'));
    assert.ok(gb.rt.ostate === 'error');
    assert.ok(gb.rt.state === false);

    gb.rt = gb.el.setState('warning');
    assert.ok(!gb.el.getEl().hasClass('has-success'));
    assert.ok(!gb.el.getEl().hasClass('has-error'));
    assert.ok(gb.el.getEl().hasClass('has-warning'));
    assert.ok(gb.rt.state === 'warning');
    assert.ok(gb.rt.ostate === undefined);

    gb.rt = gb.el.setStatus('this is an error');
    assert.ok(!gb.el.getEl().hasClass('has-success'));
    assert.ok(gb.el.getEl().hasClass('has-error'));
    assert.ok(!gb.el.getEl().hasClass('has-warning'));
    assert.ok(gb.el.getEl().find('span.help-block').length === 1);
    assert.ok(gb.el.getEl().find('span.help-block').html() === 'this is an error');
    assert.ok(gb.rt.ostatus.state === 'warning');
    assert.ok(gb.rt.status.state === 'error');
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, []));
    assert.ok(Belt.deepEqual(gb.rt.status.status, ['this is an error']));

    gb.rt = gb.el.setStatus('this is an error', {'reset': false});
    assert.ok(!gb.el.getEl().hasClass('has-success'));
    assert.ok(gb.el.getEl().hasClass('has-error'));
    assert.ok(!gb.el.getEl().hasClass('has-warning'));
    assert.ok(gb.el.getEl().find('span.help-block').length === 2);
    assert.ok(gb.el.getEl().find('span.help-block').text() === 'this is an errorthis is an error');
    assert.ok(gb.rt.ostatus.state === 'error');
    assert.ok(gb.rt.status.state === 'error');
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, ['this is an error']));
    assert.ok(Belt.deepEqual(gb.rt.status.status, ['this is an error', 'this is an error']));

    gb.rt = gb.el.setStatus('this is success', {'state': 'success'});
    assert.ok(gb.el.getEl().hasClass('has-success'));
    assert.ok(!gb.el.getEl().hasClass('has-error'));
    assert.ok(!gb.el.getEl().hasClass('has-warning'));
    assert.ok(gb.el.getEl().find('span.help-block').length === 1);
    assert.ok(gb.el.getEl().find('span.help-block').text() === 'this is success');
    assert.ok(gb.rt.ostatus.state === 'error');
    assert.ok(gb.rt.status.state === 'success');
    assert.ok(Belt.deepEqual(gb.rt.status.status, ['this is success']));
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, ['this is an error', 'this is an error']));

    gb.rt = gb.el.setStatus([], {'state': 'warning'});
    assert.ok(!gb.el.getEl().hasClass('has-success'));
    assert.ok(!gb.el.getEl().hasClass('has-error'));
    assert.ok(gb.el.getEl().hasClass('has-warning'));
    assert.ok(gb.el.getEl().find('span.help-block').length === 0);
    assert.ok(gb.rt.status.state === 'warning');
    assert.ok(gb.rt.ostatus.state === 'success');
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, ['this is success']));
    assert.ok(Belt.deepEqual(gb.rt.status.status, []));

    gb.rt = gb.el.setStatus(false);
    assert.ok(!gb.el.getEl().hasClass('has-success'));
    assert.ok(!gb.el.getEl().hasClass('has-error'));
    assert.ok(!gb.el.getEl().hasClass('has-warning'));
    assert.ok(gb.el.getEl().find('span.help-block').length === 0);
    assert.ok(gb.rt.ostatus.state === 'warning');
    assert.ok(gb.rt.status.state === undefined);
    assert.ok(Belt.deepEqual(gb.rt.status.status, []));
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, []));

    return done();
  });

  test('objectControl-setStatus', function(done){
    gb.obj = {
      'a': 123
    , 'b': 'string'
    , 'c': true
    , 'd': [1, 2, 3, {'_a': true, '_b': [true, false, true]}]
    , 'e': {
        'f': '1'
      , 'g': []
      }
    };

    gb.attr = {'name': Belt.uuid(), 'value': gb.obj};

    gb.el = _$.mutableControl(gb.attr);

    gb.el.render();

    $('#fixture').append(gb.el.$el);

    assert.ok(!gb.el.getState());
    assert.ok(!gb.el.getStatus().state);
    assert.ok(Belt.deepEqual(gb.el.getStatus().status, []));

    gb.rt = gb.el.setState('success');
    assert.ok(gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.rt.state === 'success');
    assert.ok(gb.rt.ostate === undefined);

    gb.rt = gb.el.setState('error');
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.rt.state === 'error');
    assert.ok(gb.rt.ostate === 'success');

    gb.rt = gb.el.setState(false);
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.rt.ostate === 'error');
    assert.ok(gb.rt.state === false);

    gb.rt = gb.el.setState('warning');
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.rt.state === 'warning');
    assert.ok(gb.rt.ostate === undefined);

    gb.rt = gb.el.setStatus('this is an error');
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').length === 1);
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').html() === 'this is an error');
    assert.ok(gb.rt.ostatus.state === 'warning');
    assert.ok(gb.rt.status.state === 'error');
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, []));
    assert.ok(Belt.deepEqual(gb.rt.status.status, ['this is an error']));

    gb.rt = gb.el.setStatus('this is an error', {'reset': false});
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').length === 2);
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').text() === 'this is an errorthis is an error');
    assert.ok(gb.rt.ostatus.state === 'error');
    assert.ok(gb.rt.status.state === 'error');
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, ['this is an error']));
    assert.ok(Belt.deepEqual(gb.rt.status.status, ['this is an error', 'this is an error']));

    gb.rt = gb.el.setStatus('this is success', {'state': 'success'});
    assert.ok(gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-success').length === 1);
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-success').text() === 'this is success');
    assert.ok(gb.rt.ostatus.state === 'error');
    assert.ok(gb.rt.status.state === 'success');
    assert.ok(Belt.deepEqual(gb.rt.status.status, ['this is success']));
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, ['this is an error', 'this is an error']));

    gb.rt = gb.el.setStatus([], {'state': 'warning'});
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').length === 0);
    assert.ok(gb.rt.status.state === 'warning');
    assert.ok(gb.rt.ostatus.state === 'success');
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, ['this is success']));
    assert.ok(Belt.deepEqual(gb.rt.status.status, []));

    gb.rt = gb.el.setStatus(false);
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').length === 0);
    assert.ok(gb.rt.ostatus.state === 'warning');
    assert.ok(gb.rt.status.state === undefined);
    assert.ok(Belt.deepEqual(gb.rt.status.status, []));
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, []));

    gb.parent = gb.el;

    gb.el = gb.parent.getView('d.3._b');

    assert.ok(!gb.el.getState());
    assert.ok(!gb.el.getStatus().state);
    assert.ok(Belt.deepEqual(gb.el.getStatus().status, []));

    gb.rt = gb.el.setState('success');
    assert.ok(gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.rt.state === 'success');
    assert.ok(gb.rt.ostate === undefined);

    gb.rt = gb.el.setState('error');
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.rt.state === 'error');
    assert.ok(gb.rt.ostate === 'success');

    gb.rt = gb.el.setState(false);
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.rt.ostate === 'error');
    assert.ok(gb.rt.state === false);

    gb.rt = gb.el.setState('warning');
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.rt.state === 'warning');
    assert.ok(gb.rt.ostate === undefined);

    gb.rt = gb.el.setStatus('this is an error');
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').length === 1);
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').html() === 'this is an error');
    assert.ok(gb.rt.ostatus.state === 'warning');
    assert.ok(gb.rt.status.state === 'error');
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, []));
    assert.ok(Belt.deepEqual(gb.rt.status.status, ['this is an error']));

    gb.rt = gb.el.setStatus('this is an error', {'reset': false});
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').length === 2);
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').text() === 'this is an errorthis is an error');
    assert.ok(gb.rt.ostatus.state === 'error');
    assert.ok(gb.rt.status.state === 'error');
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, ['this is an error']));
    assert.ok(Belt.deepEqual(gb.rt.status.status, ['this is an error', 'this is an error']));

    gb.rt = gb.el.setStatus('this is success', {'state': 'success'});
    assert.ok(gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-success').length === 1);
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-success').text() === 'this is success');
    assert.ok(gb.rt.ostatus.state === 'error');
    assert.ok(gb.rt.status.state === 'success');
    assert.ok(Belt.deepEqual(gb.rt.status.status, ['this is success']));
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, ['this is an error', 'this is an error']));

    gb.rt = gb.el.setStatus([], {'state': 'warning'});
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').length === 0);
    assert.ok(gb.rt.status.state === 'warning');
    assert.ok(gb.rt.ostatus.state === 'success');
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, ['this is success']));
    assert.ok(Belt.deepEqual(gb.rt.status.status, []));

    gb.rt = gb.el.setStatus(false);
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').length === 0);
    assert.ok(gb.rt.ostatus.state === 'warning');
    assert.ok(gb.rt.status.state === undefined);
    assert.ok(Belt.deepEqual(gb.rt.status.status, []));
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, []));

    gb.el = gb.parent.getView('d.3');

    assert.ok(!gb.el.getState());
    assert.ok(!gb.el.getStatus().state);
    assert.ok(Belt.deepEqual(gb.el.getStatus().status, []));

    gb.rt = gb.el.setState('success');
    assert.ok(gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.rt.state === 'success');
    assert.ok(gb.rt.ostate === undefined);

    gb.rt = gb.el.setState('error');
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.rt.state === 'error');
    assert.ok(gb.rt.ostate === 'success');

    gb.rt = gb.el.setState(false);
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.rt.ostate === 'error');
    assert.ok(gb.rt.state === false);

    gb.rt = gb.el.setState('warning');
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.rt.state === 'warning');
    assert.ok(gb.rt.ostate === undefined);

    gb.rt = gb.el.setStatus('this is an error');
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').length === 1);
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').html() === 'this is an error');
    assert.ok(gb.rt.ostatus.state === 'warning');
    assert.ok(gb.rt.status.state === 'error');
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, []));
    assert.ok(Belt.deepEqual(gb.rt.status.status, ['this is an error']));

    gb.rt = gb.el.setStatus('this is an error', {'reset': false});
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').length === 2);
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').text() === 'this is an errorthis is an error');
    assert.ok(gb.rt.ostatus.state === 'error');
    assert.ok(gb.rt.status.state === 'error');
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, ['this is an error']));
    assert.ok(Belt.deepEqual(gb.rt.status.status, ['this is an error', 'this is an error']));

    gb.rt = gb.el.setStatus('this is success', {'state': 'success'});
    assert.ok(gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-success').length === 1);
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-success').text() === 'this is success');
    assert.ok(gb.rt.ostatus.state === 'error');
    assert.ok(gb.rt.status.state === 'success');
    assert.ok(Belt.deepEqual(gb.rt.status.status, ['this is success']));
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, ['this is an error', 'this is an error']));

    gb.rt = gb.el.setStatus([], {'state': 'warning'});
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').length === 0);
    assert.ok(gb.rt.status.state === 'warning');
    assert.ok(gb.rt.ostatus.state === 'success');
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, ['this is success']));
    assert.ok(Belt.deepEqual(gb.rt.status.status, []));

    gb.rt = gb.el.setStatus(false);
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').length === 0);
    assert.ok(gb.rt.ostatus.state === 'warning');
    assert.ok(gb.rt.status.state === undefined);
    assert.ok(Belt.deepEqual(gb.rt.status.status, []));
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, []));


    gb.el = gb.parent.getView('d');

    assert.ok(!gb.el.getState());
    assert.ok(!gb.el.getStatus().state);
    assert.ok(Belt.deepEqual(gb.el.getStatus().status, []));

    gb.rt = gb.el.setState('success');
    assert.ok(gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.rt.state === 'success');
    assert.ok(gb.rt.ostate === undefined);

    gb.rt = gb.el.setState('error');
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.rt.state === 'error');
    assert.ok(gb.rt.ostate === 'success');

    gb.rt = gb.el.setState(false);
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.rt.ostate === 'error');
    assert.ok(gb.rt.state === false);

    gb.rt = gb.el.setState('warning');
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.rt.state === 'warning');
    assert.ok(gb.rt.ostate === undefined);

    gb.rt = gb.el.setStatus('this is an error');
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').length === 1);
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').html() === 'this is an error');
    assert.ok(gb.rt.ostatus.state === 'warning');
    assert.ok(gb.rt.status.state === 'error');
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, []));
    assert.ok(Belt.deepEqual(gb.rt.status.status, ['this is an error']));

    gb.rt = gb.el.setStatus('this is an error', {'reset': false});
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').length === 2);
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').text() === 'this is an errorthis is an error');
    assert.ok(gb.rt.ostatus.state === 'error');
    assert.ok(gb.rt.status.state === 'error');
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, ['this is an error']));
    assert.ok(Belt.deepEqual(gb.rt.status.status, ['this is an error', 'this is an error']));

    gb.rt = gb.el.setStatus('this is success', {'state': 'success'});
    assert.ok(gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-success').length === 1);
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-success').text() === 'this is success');
    assert.ok(gb.rt.ostatus.state === 'error');
    assert.ok(gb.rt.status.state === 'success');
    assert.ok(Belt.deepEqual(gb.rt.status.status, ['this is success']));
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, ['this is an error', 'this is an error']));

    gb.rt = gb.el.setStatus([], {'state': 'warning'});
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').length === 0);
    assert.ok(gb.rt.status.state === 'warning');
    assert.ok(gb.rt.ostatus.state === 'success');
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, ['this is success']));
    assert.ok(Belt.deepEqual(gb.rt.status.status, []));

    gb.rt = gb.el.setStatus(false);
    assert.ok(!gb.el.getControl().$el.hasClass('has-success'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-error'));
    assert.ok(!gb.el.getControl().$el.hasClass('has-warning'));
    assert.ok(gb.el.getControl().$el.find('div.alert.alert-danger').length === 0);
    assert.ok(gb.rt.ostatus.state === 'warning');
    assert.ok(gb.rt.status.state === undefined);
    assert.ok(Belt.deepEqual(gb.rt.status.status, []));
    assert.ok(Belt.deepEqual(gb.rt.ostatus.status, []));

    return done();
  });
});

suite('custom-controls', function(){
  setup(function(){
    return $('#fixture').html('');
  });
  teardown(function(){
    return $('#fixture').html('');
  });

  test('alertControl', function(done){
    gb.obj = {
      'html': 'this is an alert'
    , 'type': 'warning'
    , 'removable': false
    };

    gb.el = _$.alertControl({'value': gb.obj, 'name': 'alert'});
    gb.el.render();
    $('#fixture').html(gb.el.$el);

    assert.ok(Belt.deepEqual(gb.obj, gb.el.get()));

    return done();
  });
});

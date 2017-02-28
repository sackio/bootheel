# bootheel

Bootheel is a small library for turning views into powerful, modular components, driven by Javascript, and based on Backbone.js.

It's meant to provide a minimal, simple, and powerful way to modify and read from the DOM of your views. Forget all that MVC bloat and fanciness. This is a just-enough library, that focuses on turning views into modular components.

## Getting started

Bootheel has a few dependencies, so be sure to include these:

* jQuery
* Underscore
* Belt [my utility library](https://github.com/sackio/jsbelt)
* Backbone

Once you have these, drop in the Bootheel code:

```html
  <script src="./wherever_your_js_stuff_is/bootheel/bootheel.js"></script>
```

```javascript
  //Now, the Bh variable represents the bootheel instance
  var view = new Bh.view();
```

## Basic Example - Getters & Setters

Bootheel is simple. Take your HTML code for a view, add `data-set` and `data-get` attributes for getting and setting data. Here's a super basic example:

```html
  <div id="nametag">
    <h1 data-set="name" data-set-method="html"></h1>
    <input name="mood" type="text" data-get="mood" data-get-method="val()" data-set="mood" data-set-method="val" placeholder="My current mood">
  </div>
```

Now we can do stuff like:

```javascript
  var Nametag = new Bh.view({
    'el': '#nametag' //the DOM element / selector string / or jQuery object that represents the view
  });

  //set name to "Pablo" and update the view
  Nametag.set({
    'name': 'Pablo'
  });

  //set mood and name, also updating view
  Nametag.set({
    'name': 'Salvador'
  , 'mood': 'surreal'
  });

  //get mood from view
  var mood = Nametag.get('mood');
```

Simple, right?

## Events & Triggers

Bootheel extends Backbone and turns views into event emitters. Each Bootheel view gets a lot of events right out of the box, here's some examples:

```javascript

  //anytime get is called, event called "get:[path]" is emitted, passing value returned as first argument
  Nametag.get('mood'); //event "get:mood" is emitted with first argument being the value of mood

  //for example, this would log the mood to console whenever Nametag.get('mood') is called
  Nametag.on('get:mood', function(val){
    console.log(val); //mood logged to console
  });

  //anytime set is called, an event called set:[path] is emitted, passing value sent to set as first argument
  Nametag.set({
    'mood': 'happy' //event "set:mood" is emitted and "happy" is passed as first argument
  });

```
You get event emission out of the box for any other events you want to emit / listen for:

```javascript

  Nametag.on('someevent', function(arg){
    console.log(arg);
  });

  Nametag.emit('someevent', 'hello world');

```

If you want, you can wire up event listeners when instantiating a view:

```javascript

  //alert will show when mood is set to happy
  var Nametag = new Bh.view({
    'el': '#nametag'
  , 'events': {
      'set:mood': function(val){
        if (val === 'happy') {
          alert('Glad you\'re happy');
        }
      }
    }
  });

  //or add listeners anytime
  Nametag.on('set:name', function(arg){
    console.log(arg);
  });

```

These events are wired up for each view:

| Events | Details |
| ------ | ------- |
| **load** | fired when view is loaded for first time |
| **render** | fired when render is called on a view |
| **el** | fired when view's element is set |
| **set** | fired anytime set is called on any path of the view, passes object like `{'path': 'value set'}` |
| **set:[path]** | fired anytime set is called on a path of the view's data, passes value |
| **get** | fired anytime get is called on any path of the view, passes object like `{'path': 'value'}` |
| **get:[path]** | fired anytime get is called on a path of the view's data, passes value |

What about when you want to listen to the view's DOM? Those are called **triggers** (since events was already taken):

```javascript

  //here's an example, an alert will display when the input is modified
  var Nametag = new Bh.view({
    'el': '#nametag'
  , 'triggers': {
      'change input[name="mood"]': function(){
        alert('hello, ' + this.get('name') + '. You\'re feeling ' + this.get('mood'));
      }
    }
  });

```

Triggers are set when instantiating a view. Key is `[dom event] [selector]` and value is a function that will be called when event occurs. Function will be bound to view (`this` is the view).

## Transformers

Tranformers are methods that ahem, transform data when getters and setters are called. They act as interceptor methods that mediate the updates made to the DOM and the data read from it.

Here's an example - `friends` will be an array of strings. We will use the transformer `renderFriends` to convert this array into `li` elements:

```html
  <div id="nametag">
    <h1 data-set="name" data-set-method="html"></h1>
    <input name="mood" type="text" data-get="mood" data-get-method="val()" data-set="mood" data-set-method="val" placeholder="My current mood">
    <ul data-set="friends" data-set-method="html" data-set-transformer="renderFriends">
    </ul>
  </div>
```

```javascript

  var Nametag = new Bh.view({
    'el': '#nametag'
  , 'transformers': {
      //renderFriends transforms the friends array into li elements - it returns a string which is used to set the html of the ul element
      'renderFriends': function(val, $el, opts){
        return _.map(val, function(v){
          return '<li>' + v + '</li>';
        }).join('\n')
      }
    }
  });

```

For getters, the value returned from the method used (i.e. `html()`) will run through the transformer before being returned from calling `get`.

For setters, the value sent to `set` is passed through the transformer before being passed to the method used to change the DOM (i.e. `html`).

Add transformers when instantiating a view. To call a specific transformer by name (i.e. utility transformer to capitalize text) add `data-get-transformer="name of transformer"` or `data-set-transformer="name of transformer"`

Some transformers come out of the box. Adding `set:[path]` or `get:[path]` to the transformers object will ensure the method gets called when `path` is set or gotten, respectively:

```html
  <div id="nametag">
    <h1 data-set="name" data-set-method="html"></h1>
    <input name="mood" type="text" data-get="mood" data-get-method="val()" data-set="mood" data-set-method="val" placeholder="My current mood">
    <ul data-set="friends" data-set-method="html">
    </ul>
  </div>
```

```javascript

  var Nametag = new Bh.view({
    'el': '#nametag'
  , 'transformers': {
      'set:friends': function(val, $el, opts){
        return _.map(val, function(v){
          return '<li>' + v + '</li>';
        }).join('\n')
      }
    }
  });

```

Note that each transformer is also passed the element being set or gotten. This is useful if you want to perform modifications to the DOM beyond just invoking the `data-get` or `data-set` method.

```javascript

  var Nametag = new Bh.view({
    'el': '#nametag'
  , 'transformers': {
      'set:friends': function(val, $el, opts){
        if (val.length > 100) $el.addClass('popular'); //adds class "important" to ul element if there are more than 100 friends

        return _.map(val, function(v){
          return '<li>' + v + '</li>';
        }).join('\n')
      }
    }
  });

```

## Tips and Tricks

### Data

Each view includes a `data` property that keeps all values since the last time they have been set or gotten. It's just useful at times, without getting into a whole MVC debate:

```javascript

  var Nametag = new Bh.view({
    'el': '#nametag'
  });

  Nametag.set({
    'name': 'Marcel Duchamps'
  , 'mood': 'quirky'
  });

  console.log(Nametag.data.name); //Marcel Duchamps

  $('[name="mood"]').val('bonkers'); //the input is modified outside of Bootheel

  console.log(Nametag.data.mood); //quirky, the value needs to be refreshed with get

  Nametag.get([
    'name'
  , 'mood'
  ]);

  console.log(Nametag.data.mood); //bonkers

  //BTW, passing {'no_persist': true} with get or set will prevent the data object from being updated

  $('[name="mood"]').val('bonkers'); //the input is modified outside of Bootheel

  console.log(Nametag.data.mood); //quirky, the value needs to be refreshed with get

  Nametag.get('mood', {
    'no_persist': true
  }); //sorry, not gonna update data now

  console.log(Nametag.data.mood); //quirky

```

### Getters and Setters

There's a lot of sugar and tricks for getters and setters. Here's a running list of examples:

`data-set="self"` will get triggered anytime `set` is called on any path (and will be passed the `data` object as the value to set). This is useful if you update some aspect of the view anytime the view is updated.

```html
  <h1 id="nametag" data-set="self"></h1>
```

```javascript

  var Nametag = new Bh.view({
    'el': '#nametag'
  , 'transformer': {
      'set:self': function(val){
        return val.name;
      }
    }
  });

```

You can be lazy about `data-set-method` and `data-get-method`. They will default to `val` for `input, selector, textarea` and `html` for all other elements. You can also pass variables to the get method, like `data-get-method="attr('name')"`.

If you don't want to trigger the `set:[path]` or `get:[path]` event, pass `{'silent': true}` to the get or set call:

```javascript

  Nametag.get('mood', {
    'silent': true
  }); //no get:mood event will be emitted

```

If you want to get all data from a view, call `get()` without passing any values object.

You can also override any DOM-based setters or getters by instantiating the view with the following:

```javascript

  //when set({'name': 'something'}) is called, the setter below will be called. When get('name') is called, the getter below will be called
  var Nametag = new Bh.view({
    'el': '#nametag'
  , 'setters': {
      'name': function(val){
        return this.$el.html(name);
      }
    }
  , 'getters': {
      'name': function(){
        return this.$el.html();
      }
    }
  });

```

## Reference

Each view instance includes the following:

### Properties

| Name | Description |
| ---- | ----------- |
| **$el** | jQuery object referencing the top-most DOM element for the view |
| **data** | Object storing the latest data set or gotten for the view |
| **transformers** | Object storing methods called to transform data being passed or retrieved from setters and getters. |
| **setters** | Object storing setters for the view. Storing a setter with the value of a given `path` will cause that setter to be called whenever `set({"path": "value"})` is called |
| **getters** | Object storing getters for the view. Storing a getter with the value of a given `path` will cause that getter to be called whenever `get("path")` is called |
| **transformers** | Object storing transformers for the view. Storing a method with `set:path` or `get:path` will cause the transformer to be called when `set` or `get` is called on the path. Other transformers can be instantiated by including `data-get-transformer="name of method"` or `data-set-transformer="name of method"` in the DOM |

### Methods

| Name | Signature | Description |
| ---- | --------- | ----------- |
| **render** | `el`: (optional) String, jQuery Element, DOM element; `template`: (optional) String, _.template method | Renders `template` or `this.template` (if `template` is `null`) into `el` or `this.$el` (`el` is `null`). Use this to render the initial HTML of the view. |
| **setEl** | `el`: String, jQuery Element, DOM element | Set element of view, attach all triggers to DOM of `el` and store jQuery reference to view as `this.$el`. |
| **set** | `data`: Object | For each `key` in the object, set DOM elements of the view with `data-set="key"` with `value`. If `this.setters.key` is defined, it will be called as well. |
| **get** | `paths`: String, Array | For each `element` in the array, get value from the DOM elements of the view with `data-get="element"`. If `this.getters.key` is defined, it will be called as well. A single string can be passed to return one value. If `paths` is null, all data paths will be gotten. |
| **emit** | `event`: String, `arguments...` | Fire the named `event` passing and `arguments` to any listeners |
| **on** | `event`: String, `listener`: Function | Attach a listener to the view, which will be invoked when `event` is emitted. Any arguments passed to the event will be passed to `listener` |

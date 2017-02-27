# bootheel

Bootheel is a small library for turning views into powerful, modular components, driven by Javascript. It's an extension of Backbone.js. These provide a simple and powerful way to modify and read from the DOM of your views. Forget all that MVC bloat and fanciness.

The main idea is to add `data-set` and `data-get` attributes to the HTML of your views, for a quick way to read data from views, and updating views with new data.

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

Bootheel is simple. Take your HTML code for a view, add `data-` attributes for getting and setting data. Here's a super basic example:

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

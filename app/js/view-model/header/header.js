define(
  ['jquery', 'knockout', 'text!view-model/header/header.tmpl'],

  function($, ko, headerTmpl) {
    var HeaderViewModel = function(options) {
      //  ---------------------------------------------
      //  Variables
      //  ---------------------------------------------
      var self = this; //save main context
      self.element = options.element; //keep a reference to the root element

      //  ---------------------------------------------
      //  Applying template
      //  ---------------------------------------------
      self.element.html(headerTmpl);
    };

    return HeaderViewModel;
  }
);

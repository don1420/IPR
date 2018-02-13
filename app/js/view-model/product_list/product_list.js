define(
  [
    'jquery',
    'knockout',
    'core/read_set_data',
    'text!view-model/product_list/product_list.tmpl'
  ],

  function($, ko, ReadSetData, productListTmpl) {
    var ProductListViewModel = function(options) {
      //  ---------------------------------------------
      //  Variables
      //  ---------------------------------------------
      var self = this; //save main context
      self.element = options.element; //keep a reference to the root element

      //  ---------------------------------------------
      //  Applying template
      //  ---------------------------------------------
      self.element.html(productListTmpl);

      //  ---------------------------------------------
      //  Tracking changes in ReadSetData and returning the current product page
      //  ---------------------------------------------
      self.pagedList = ko.dependentObservable(function() {
        var size = this.currentPageSize(),
          start = this.pageIndex() * size;
        return this.records.slice(start, start + size);
      }, ReadSetData);

    };

    return ProductListViewModel;
  }
);

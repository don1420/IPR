define(
  [
    'jquery',
    'knockout',
    'underscore',
    'core/get_product_list',
    'core/read_set_data',
    'text!view-model/sidebar/sidebar.tmpl'
  ],

  function($, ko, _, getProductList, ReadSetData, sidebarTmpl) {
    var SidebarViewModel = function(options) {
      //  ---------------------------------------------
      //  Variables
      //  ---------------------------------------------
      var self = this; //save main context
      self.sidebarEl = options.sidebarEl; //keep a reference to the root element
      self.records = ReadSetData.records(); //get product list
      self.currentPageSize = ReadSetData.currentPageSize; //current count of products per page
      self.recordCount = ko.computed(function() {
        //count of products
        return self.records.length;
      });
      self.pageIndex = ReadSetData.pageIndex; //current page of product list
      self.priceFilter = ko.observableArray(); //track the sidebar input checking

      //  ---------------------------------------------
      //  Applying template
      //  ---------------------------------------------
      self.sidebarEl.html(sidebarTmpl);

      //  ---------------------------------------------
      //  Applying price filter
      //  ---------------------------------------------
      self.applyPriceFilter = ko.computed(function() {
        if (self.priceFilter().length !== 0) {
          var minFilterValue, maxFilterValue;

          $.each(self.priceFilter(), function() {
            var min = Number(this.split('-')[0]),
              max = Number(this.split('-')[1]);

            if (!minFilterValue && !maxFilterValue) {
              minFilterValue = min;
              maxFilterValue = max;
            }
            if (minFilterValue > min) {
              minFilterValue = min;
            }
            if (maxFilterValue < max) {
              maxFilterValue = max;
            }
          });

          var filtredRecords = _.filter(self.records, function(item) {
            return (
              item.price() > minFilterValue && item.price() < maxFilterValue
            );
          });

          ReadSetData.pageIndex(0);
          ReadSetData.records(filtredRecords);
        } else {
          ReadSetData.pageIndex(0);
          ReadSetData.records(self.records);
        }
      });
    };

    return SidebarViewModel;
  }
);

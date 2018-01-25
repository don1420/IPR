define(['jquery',
        'knockout',
        'underscore',
        'app/core/get_product_list',
        'app/core/read_set_data',
        'text!app/sidebar/sidebar.tmpl'],

 
        function($, ko, _, getProductList, ReadSetData, sidebarTmpl) {
 
        var SidebarViewModel = function(options) {

            //  ---------------------------------------------
            //  Variables
            //  ---------------------------------------------
            var self = this;                                                //save main context
            self.sidebarEl = options.sidebarEl;                             //keep a reference to the root element
            self.records = ReadSetData.records;                             //get product list
            self.currentPageSize = ReadSetData.currentPageSize;             //current count of products per page
            self.recordCount = ko.computed(function() {                     //count of products
                return self.records().length;
            });
            self.pageIndex = ReadSetData.pageIndex;                         //current page of product list

            //  ---------------------------------------------
            //  Applying template
            //  ---------------------------------------------
            self.sidebarEl.html(sidebarTmpl);
            self.priceFilterChecked = ko.observable(false);

            self.applyPriceFilter = ko.computed(function () {
                //debugger;
                if (self.priceFilterChecked()) {
                    self.filtredRecords = _.filter(self.records(), function (item) {
                        return item.price() < 40 || item.price() > 50;
                    });
                    //ReadSetData.currentPageSize(this.filtredRecords.length);
                    ReadSetData.pageIndex(0);
                    ReadSetData.records(self.filtredRecords);
                    //console.log('true', self.priceFilterChecked(), self.records());
                } else {
                    if (!self.recordsNotFiltred) {
                       self.recordsNotFiltred = self.records();
                    }
                    if (self.recordsNotFiltred) {
                        ReadSetData.pageIndex(0);
                        ReadSetData.records(self.recordsNotFiltred);
                    }
                    //console.log('false', self.priceFilterChecked(), self.records());
                }
            });

            
            //self.applyPriceFilter();

        };

        return SidebarViewModel;
});
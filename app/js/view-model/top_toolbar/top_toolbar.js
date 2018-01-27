define(['jquery',
        'knockout',
        'core/read_set_data',
        'text!view-model/top_toolbar/top_toolbar.tmpl'],

        function($, ko, ReadSetData, topToolbarTmpl) {
 
        var TopToolbarViewModel = function(options) {

            //  ---------------------------------------------
            //  Variables
            //  ---------------------------------------------
            var self = this;                                                //save main context
            self.topToolbarEl = options.topToolbarEl;                       //keep a reference to the root element
            self.pageSizeOptions = ko.observableArray([3, 6, 9, 12, 14]);   //options for <select> products per page
            self.records = ReadSetData.records;                             //get product list
            self.currentPageSize = ReadSetData.currentPageSize;             //current count of products per page
            self.recordCount = ko.computed(function() {                     //count of products
                return self.records().length;
            });
            self.pageIndex = ReadSetData.pageIndex;                         //current page of product list

            //  ---------------------------------------------
            //  Applying template
            //  ---------------------------------------------
            self.topToolbarEl.html(topToolbarTmpl);

            //  ---------------------------------------------
            //  Calculation of the starting element for the section "Products - total"
            //  ---------------------------------------------
            self.getProductsCountsFrom = function() {
                if (self.pageIndex() == 0 ) {
                    return self.pageIndex() + 1;
                } else {
                    return (self.pageIndex() * self.currentPageSize()) + 1;
                }
            };

            //  ---------------------------------------------
            //  Calculation of the ending element for the section "Products - total"
            //  ---------------------------------------------
            self.getProductsCountsTo = function() {
                if (self.pageIndex() == 0 ) {
                    return (self.pageIndex() + 1) * self.currentPageSize();
                } else if ((self.pageIndex() + 1) * self.currentPageSize() <= self.records().length) {
                    return (self.pageIndex() + 1) * self.currentPageSize();
                } else {
                    return self.records().length;
                }
            };

            //  ---------------------------------------------
            //  Sorting functions
            //  ---------------------------------------------
            self.sortByPosition = function() {
                self.records.sort(function(a, b) {
                    return a.id() > b.id() ? 1 : -1;
                });
            };

            self.sortByName = function() {
                self.records.sort(function(a, b) {
                    return a.name().toLowerCase() > b.name().toLowerCase() ? 1 : -1;
                });
            };

            self.sortByPrice = function() {
                self.records.sort(function(a, b) {
                    return a.price() > b.price() ? 1 : -1;
                });
            };

            //  ---------------------------------------------
            //  Initialize the materialize select element
            //  ---------------------------------------------
            $(function() {
                $('select').material_select();
            });

            //  ---------------------------------------------
            //  Options for <select>
            //  ---------------------------------------------
            self.choices = ["Position", "Name", "Price"];

            //  ---------------------------------------------
            //  Set current option in <select>
            //  ---------------------------------------------
            self.selectedChoice = ko.observable("Position");

            //  ---------------------------------------------
            //  Subscription to changes in <select>
            //  ---------------------------------------------
            self.selectedChoice.subscribe(function(newOption) {
                switch (newOption) {
                    case "Position":
                        self.sortByPosition();
                        break;
                    case "Name":
                        self.sortByName();
                        break;
                    case "Price":
                        self.sortByPrice();
                        break;
                }
            });
        };

        return TopToolbarViewModel;
});
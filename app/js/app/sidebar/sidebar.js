define(['jquery',
        'knockout',
        'underscore',
        'app/core/read_set_data',
        'text!app/sidebar/sidebar.tmpl'],

 
        function($, ko, _, ReadSetData, sidebarTmpl) {
 
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

            self.applyPriceFilter = function () {
                this.filtredRecords = _.filter(self.records(), function(item){
                    return item.price() < 40 || item.price() > 50;
                });
                //ReadSetData.currentPageSize(this.filtredRecords.length);
                ReadSetData.pageIndex(0);
                ReadSetData.records(self.filtredRecords); 
            };

            self.applyPriceFilter();

        };

        return SidebarViewModel;
});
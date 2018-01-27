define(['jquery',
        'knockout',
        'core/read_set_data',
        'text!view-model/bottom_toolbar/bottom_toolbar.tmpl'],

 
        function($, ko, ReadSetData, bottomToolbarTmpl) {
 
        var BottomToolbarViewModel = function(options) {

            var self = this;                                        //save main context
            self.bottomToolbarEl = options.bottomToolbarEl;         //keep a reference to the root element
            self.records = ReadSetData.records;                     //get product list
            self.currentPageSize = ReadSetData.currentPageSize;     //current count of products per page
            self.pageIndex = ReadSetData.pageIndex;                 //current page of product list

            //  ---------------------------------------------
            //  Applying template
            //  ---------------------------------------------
            self.bottomToolbarEl.html(bottomToolbarTmpl);

            //  ---------------------------------------------
            //  Calculation of the max page index in pagination
            //  ---------------------------------------------
            self.maxPageIndex = ko.computed(function() {
                var maxPageIndex = Math.ceil(self.records().length / self.currentPageSize()) - 1;
                if (maxPageIndex !== -1 && maxPageIndex < self.pageIndex()) {
                    ReadSetData.pageIndex(maxPageIndex);
                }
                return maxPageIndex;
            });

            //  ---------------------------------------------
            //  Move to the selected page
            //  ---------------------------------------------
            self.moveSelectedPage = function(data) {
                self.pageIndex(data);
                ReadSetData.pageIndex(self.pageIndex());
            };

            //  ---------------------------------------------
            //  Move to the previous page
            //  ---------------------------------------------
            self.movePreviousPage = function() {
                if(self.pageIndex() > 0) {
                    self.pageIndex(self.pageIndex() - 1);
                    ReadSetData.pageIndex(self.pageIndex());
                }
            };

            //  ---------------------------------------------
            //  Move to the next page
            //  ---------------------------------------------
            self.moveNextPage = function() {
                if(self.pageIndex() < self.maxPageIndex()) {
                    self.pageIndex(self.pageIndex() + 1);
                    ReadSetData.pageIndex(self.pageIndex());
                }
            };

            //  ---------------------------------------------
            //  MOve to the first page
            //  ---------------------------------------------
            self.moveFirstPage = function () {
                ReadSetData.pageIndex(0);
            };

            //  ---------------------------------------------
            //  MOve to the last page
            //  ---------------------------------------------
            self.moveLastPage = function () {
                ReadSetData.pageIndex(self.maxPageIndex());
            };
        };

        return BottomToolbarViewModel;
});
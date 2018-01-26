define(['jquery',
        'knockout',
        'app/product_list/product_list',
        'app/top_toolbar/top_toolbar',
        'app/bottom_toolbar/bottom_toolbar',
        'app/sidebar/sidebar',
        'app/core/read_set_data',
        'text!app/view/layout.tmpl'],

        function($, ko, ProductListViewModel, TopToolbarViewModel, BottomToolbarViewModel, SidebarViewModel, ReadSetData, layoutTmpl) {

            var MainViewModel = function(options) {

                //  ---------------------------------------------
                //  Variables
                //  ---------------------------------------------
                var self = this;                                                //save main context
                self.element = options.element;                                 //keep a reference to the root element

                //  ---------------------------------------------
                //  Applying main template
                //  ---------------------------------------------
                self.element.html(layoutTmpl);

                //  ---------------------------------------------
                //  Create ProductListViewModel
                //  ---------------------------------------------
                var productListEl = self.element.find('#product_list');         //keep a reference to the product_list block
                self.productList = new ProductListViewModel({
                    element: productListEl
                });

                //  ---------------------------------------------
                //  Create TopToolbarViewModel
                //  ---------------------------------------------
                var topToolbarEl = self.element.find('#top_toolbar');           //keep a reference to the top_toolbar block
                self.topToolbar = new TopToolbarViewModel({
                    topToolbarEl: topToolbarEl
                });

                //  ---------------------------------------------
                //  Create BottomToolbarViewModel
                //  ---------------------------------------------
                var bottomToolbarEl = self.element.find('#bottom_toolbar');     //keep a reference to the bottom_toolbar block
                self.bottomToolbar = new BottomToolbarViewModel({
                    bottomToolbarEl: bottomToolbarEl
                });

                //  ---------------------------------------------
                //  Create BottomToolbarViewModel
                //  ---------------------------------------------
                var sidebarEl = self.element.find('.sidebar');     //keep a reference to the bottom_toolbar block
                self.sidebar = new SidebarViewModel({
                    sidebarEl: sidebarEl
                });
            };

        return MainViewModel;
});
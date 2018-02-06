define(
  [
    'jquery',
    'knockout',
    'view-model/header/header',
    'view-model/product_list/product_list',
    'view-model/top_toolbar/top_toolbar',
    'view-model/bottom_toolbar/bottom_toolbar',
    'view-model/sidebar/sidebar',
    'view-model/footer/footer',
    'core/read_set_data',
    'text!view/layout.tmpl',
  ],

  function(
    $,
    ko,
    HeaderViewModel,
    ProductListViewModel,
    TopToolbarViewModel,
    BottomToolbarViewModel,
    SidebarViewModel,
    FooterViewModel,
    ReadSetData,
    layoutTmpl
  ) {
    var MainViewModel = function(options) {
      //  ---------------------------------------------
      //  Variables
      //  ---------------------------------------------
      var self = this; //save main context
      self.element = options.element; //keep a reference to the root element

      //  ---------------------------------------------
      //  Applying main template
      //  ---------------------------------------------
      self.element.html(layoutTmpl);

      //  ---------------------------------------------
      //  Create HeaderViewModel
      //  ---------------------------------------------
      var headerEl = self.element.find('#main_header'); //keep a reference to the main_header block
      self.productList = new HeaderViewModel({
        element: headerEl,
      });

      //  ---------------------------------------------
      //  Create FooterViewModel
      //  ---------------------------------------------
      var footerEl = self.element.find('#main_footer'); //keep a reference to the main_footer block
      self.productList = new FooterViewModel({
        element: footerEl,
      });

      //  ---------------------------------------------
      //  Create ProductListViewModel
      //  ---------------------------------------------
      var productListEl = self.element.find('#product_list'); //keep a reference to the product_list block
      self.productList = new ProductListViewModel({
        element: productListEl,
      });

      //  ---------------------------------------------
      //  Create TopToolbarViewModel
      //  ---------------------------------------------
      var topToolbarEl = self.element.find('#top_toolbar'); //keep a reference to the top_toolbar block
      self.topToolbar = new TopToolbarViewModel({
        topToolbarEl: topToolbarEl,
      });

      //  ---------------------------------------------
      //  Create BottomToolbarViewModel
      //  ---------------------------------------------
      var bottomToolbarEl = self.element.find('#bottom_toolbar'); //keep a reference to the bottom_toolbar block
      self.bottomToolbar = new BottomToolbarViewModel({
        bottomToolbarEl: bottomToolbarEl,
      });

      //  ---------------------------------------------
      //  Create BottomToolbarViewModel
      //  ---------------------------------------------
      var sidebarEl = self.element.find('#sidebar_filter'); //keep a reference to the sidebar_filter block
      self.sidebar = new SidebarViewModel({
        sidebarEl: sidebarEl,
      });

      $(function() {
        $('.button-collapse').sideNav();
      });
    };

    return MainViewModel;
  }
);

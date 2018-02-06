define(
  ['jquery', 'knockout', 'core/get_product_list'],

  function($, ko, getProductList) {
    var jsonUrl = '/js/model/products.json';

    var ReadSetData = {
      records: getProductList(jsonUrl), //get product list from file products.json
      currentPageSize: ko.observable(6), //current count of products per page
      pageIndex: ko.observable(0), //current page of product list
    };

    return ReadSetData;
  }
);

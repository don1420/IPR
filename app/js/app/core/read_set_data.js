define(['jquery',
        'knockout',
        'app/core/get_product_list'],

        function($, ko, getProductList) {

            var ReadSetData = {
                records: getProductList("/js/app/model/products.json"),      //get product list from file products.json
                currentPageSize: ko.observable(6),                           //current count of products per page
                pageIndex: ko.observable(0)                                  //current page of product list
            };

            return ReadSetData;
        });
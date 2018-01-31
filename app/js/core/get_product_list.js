define(['jquery',
        'knockout'],

 
        function($, ko) {
            function getProductList (url) {

                var self = this;
                self.productListArr = ko.observableArray();

                $.getJSON(url, function(data, status){
                    if (status == "success") {
                        $.each(data, function () {
                          self.productListArr.push({
                                id: ko.observable(parseInt(this.entity_id)),
                                name: ko.observable(this.name),
                                img: ko.computed(function(){
                                    return (this.images.length !== 0) ? this.images[0].url : "img/no-img.jpg";
                                }, this),
                                price: ko.observable(parseFloat(this.price).toFixed(2)),
                                description: ko.observable(this.short_description)
                            });
                        });
                    } else if (status == "timeout") {
                        alert("Something is wrong with the connection");
                    } else if (status == "error" || status == "parsererror" ) {
                            alert("An error occured");
                    }
                })
                .fail(function() {
                    alert( "Unable to load from " + url);
                });

                return self.productListArr;
            }

        return getProductList;
});
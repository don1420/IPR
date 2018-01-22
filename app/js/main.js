
/*define(function (require) {
    // Load jQuery v3.2.1
    var jQuery = require('/jquery/dist/jquery.min');

    // Load Bootstrap-sassJS  v3.3.6
    var bootstrap = require('/bootstrap-sass/assets/javascripts/bootstrap.min');

    // Load KnockoutJS v3.3.0
    var Knockout = require('knockout');
});*/

require.config({
        paths: {
            'text': '../libs/text',
            'jquery': '../libs/jquery/dist/jquery.min',
            'underscore': '../libs/underscore',
            'knockout': '../libs/knockout'
        },
        shim: {
            underscore: {
                exports: '_'
            }
        }
});

require(['jquery', 'knockout', 'app/app'], 

    function($, ko, MainViewModel) {

    var mainContent = $('#main-content');      //keep a reference to the root element

    //ko.components.registry() регистрация компонентов
        //сss материалайз гугл
        //хедер - лого, телефон
        //футер копирайт, емаил
        //продукт лист - добавить баттон

    //  ---------------------------------------------
    //  Applying bind of the MainViewModel
    //  ---------------------------------------------
    ko.applyBindings(new MainViewModel({
        element: mainContent
    }), mainContent[0]);

});

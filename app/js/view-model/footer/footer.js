define(['jquery',
        'knockout',
        'text!view-model/footer/footer.tmpl'],
 
        function($, ko, footerTmpl) {
 
        var FooterViewModel = function(options) {

            //  ---------------------------------------------
            //  Variables
            //  ---------------------------------------------
        	var self = this;                                     //save main context
            self.element = options.element;                      //keep a reference to the root element

            //  ---------------------------------------------
            //  Applying template
            //  ---------------------------------------------
            self.element.html(footerTmpl);

            $(function(){
                $('.carousel').carousel({fullWidth: true});
            });
        };
 
        return FooterViewModel;
});
function validate() {
    if($('.p-form-row #accType').children('option:selected').val() === '') {
      $('#acc-check').addClass('fa fa-exclamation-circle');
    }
    else {
        $('#acc-check').removeClass('fa fa-exclamation-circle');
    }

}
function validate2() {
    if($('#mainImage').get(0).files.length === 0) {
        $('#img-check').addClass('fa fa-exclamation-circle');
        $('.img-input.mandatory').css('border', '2px dashed red');
    }
    else {
        $('#img-check').removeClass('fa fa-exclamation-circle');
        $('.img-input.mandatory').css('border', '2px dashed #666');
    }
}

function readURL(input) {
    if (input.files) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.gallery#g1').empty();
            $('.gallery#g1').append('<img src="'+e.target.result+'">');
            $('.gallery#g1').show();
                
        };

        reader.readAsDataURL(input.files[0]);
        
    }
    else {
        $('.gallery#g1').empty().hide();
    }
    validate2();
}
function readURL2(input) {
    if (input.files) {
        var filesAmount = input.files.length;
            $('.gallery#g2').empty();
            for (i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    $('.gallery#g2').append('<img src="'+e.target.result+'">');
                    $('.gallery#g2').show();
                }

                reader.readAsDataURL(input.files[i]);
            }
    }
    else {
        $('.gallery#g2').empty().hide();
    }
}

/*********api calls start form here********/

$.get('/product/getCategories', (categories) => {
    for(var i=0; i<categories.length; i++) {
        $('select#category').append('<option value="'+ categories[i].id +'">'+ categories[i].value +'</option>');
    }
});

$('select#category').change(function() {
    if($('select#category option:selected').val() !== '') {
        $.get('/product/getFeatures', {categoryId: Number($('select#category option:selected').val())}, (features) => {
            for(var i=0; i<features.length; i++) {
                $('.show-on-api-call').append('<div class="p-form-row"><label for="'+ features[i].value +'" class="add-dropdown-labels">'+ features[i].value + '</label><select name="'+ features[i].value +'" id="'+ features[i].value +'" class="add-dropdowns" required><option value="">Select</option></select><i class="fa fa-angle-down" id="arrow-down"></i></div>');
                $.get('/product/getFeatureOptions', {featureId: features[i].id}, (featureOptions) => {
                   for(var j=0; j<featureOptions.length; j++) {
                    $('.show-on-api-call select#'+features[i].value).append('<option value="'+ featureOptions[j].id +'">'+ featureOptions[j].value +'</option>');
                   }
                });
            }
        });
        
        $('.show-on-api-call').fadeIn('fast');
    }
    else {
        $('.show-on-api-call').fadeOut('fast');
    }
});

$.get('/product/getBrands', (brands) => {
    for(var i=0; i<brands.length; i++) {
        $('.p-form-row select#brand').append('<option value="'+ brands[i].id +'">'+ brands[i].value +'</option>');
    }
});

$.get('/product/getPTCs', (ptc) => {
    for(var i=0; i<ptc.length; i++) {
        $('.p-form-row select#ptc').append('<option value="'+ ptc[i].id +'">'+ ptc[i].value +'</option>');
    }
})
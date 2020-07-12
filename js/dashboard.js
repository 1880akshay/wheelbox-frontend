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
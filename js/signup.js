$('#login-head').click(function() {
    $('.page-sign-up').fadeOut('fast', function() {
        $('.page-login').fadeIn('fast');
    });
    
    $('#sign-up-head').removeClass('head-active');
    $('#login-head').addClass('head-active');
  });
  $('#sign-up-head').click(function() {
    $('.page-login').fadeOut('fast', function() {
        $('.page-sign-up').fadeIn('fast');
    });
    $('#sign-up-head').addClass('head-active');
    $('#login-head').removeClass('head-active');
  });

  $('#eye1').click(function() {
      $('#eye1').toggleClass('fa-eye');
      $('#eye1').toggleClass('fa-eye-slash');
      var input = $('#password1');
      if(input.attr('type') === 'password') {
          input.attr('type', 'text');
      }
      else {
        input.attr('type', 'password');
      }
  });
  $('#eye2').click(function() {
      $('#eye2').toggleClass('fa-eye');
      $('#eye2').toggleClass('fa-eye-slash');
      var input = $('#password2');
      if(input.attr('type') === 'password') {
          input.attr('type', 'text');
      }
      else {
        input.attr('type', 'password');
      }
  });

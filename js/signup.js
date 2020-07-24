$('#login-head').click(function() {
    $('.page-sign-up').fadeOut('fast', function() {
        $('.page-login').fadeIn('fast');
    });
    
    $('#sign-up-head').removeClass('head-active');
    $('#login-head').addClass('head-active');
    $('.signup-different-text').fadeOut('fast', function() {
      $('.login-different-text').fadeIn('fast');
    });
  });
  $('#sign-up-head').click(function() {
    $('.page-login').fadeOut('fast', function() {
        $('.page-sign-up').fadeIn('fast');
    });
    $('#sign-up-head').addClass('head-active');
    $('#login-head').removeClass('head-active');
    $('.login-different-text').fadeOut('fast', function() {
      $('.signup-different-text').fadeIn('fast');
    });
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


/******api calls****/

var usernameValidation = 0;
var phoneNumberValidation = 0;

$('input#username1').blur(function() {
  var username = $('input#username1').val();
  if(username !== '') {
    $.get('/login/isUser', {username: username}, (data) => {
      if(data === 'Success') {
        $('#username-taken').hide();
        $('#username-available').show();
        usernameValidation = 1;
      }
      else if(data === 'FAILED') {
        $('#username-taken').show();
        $('#username-available').hide();
        usernameValidation = 0;
      }
    });
  }
});

$('input#phone').blur(function() {
  var phoneNumber = $('input#phone').val();
  if(phoneNumber.length === 10) {
    $.get('/login/isPhoneNumber', {phoneNumber: Number(phoneNumber)}, (data) => {
      if(data === 'Success') {
        $('#phone-taken').hide();
        $('#phone-available').show();
        phoneNumberValidation = 1;
      }
      else if(data === 'FAILED') {
        $('#phone-taken').show();
        $('#phone-available').hide();
        phoneNumberValidation = 0;
      }
    });
  }
});

$('.page-sign-up #signup-form').submit(function(event) {
  event.preventDefault();
  if(usernameValidation && phoneNumberValidation) {
    var credentials = {
      username: $('.form-row #username1').val(),
      password: $('.form-row #password1').val(),
      firstName: $('.form-row #first-name').val(),
      lastName: $('.form-row #last-name').val(),
      mainPhoneNumber: Number($('.form-row #phone').val()),
      mainEmail: $('.form-row #email').val()
    }
    $.post('/login/sendOTP', {phoneNumber: credentials.mainPhoneNumber}, (data) => {
      if(data.type === 'error') {
        alert("An error occurred! Please try again");
      }
      else if(data.type === 'success') {
        $('.page-sign-up').empty();
        $('.page-sign-up').append('<form id="signup-otp-form"><div class="text-center text-success mb-4">An OTP has been sent to your Phone number!</div><div class="form-row"><label for="otp">OTP</label><input type="tel" name="otp" id="otp" pattern="^[0-9]*$" class="input-text" required style="margin-bottom: 5px;" ><i class="fa fa-key form-icon"></i></div><span class="resend-otp-row">Didn\'t receive OTP?&nbsp; <span class="resend-otp">Resend OTP</span></span><div class="form-row-last"><input type="submit" class="register btn btn-orange" value="Verify and Register" style="margin-top: 15px"></div></form>');
        $('#signup-otp-form').submit(function(e) {
          e.preventDefault();
          $.post('/login/verifyOTP', {phoneNumber: credentials.mainPhoneNumber, otp: Number($('input#otp').val())}, (data2) => {
            if(data2.type === 'error') {
              if(!alert('Verification failed! Please try again')) window.location.reload(true);
            }
            else if(data2.type === 'success') {
              $.post('/login/signup', credentials, (user) => {
                if(typeof user === 'object') {
                  if(!alert('Registered successfully! Login to continue')) window.location.reload(true);
                }
                else {
                  if(!alert('An error occurred! Please try again')) window.location.reload(true);
                }
              });
            }
          });
        });
        $('.resend-otp').click(function() {
          $.post('/login/resendOTP', {phoneNumber: credentials.mainPhoneNumber}, (data3) => {
            if(data3.type === 'error') {
              alert('An error occurred! Please try again');
            }
            else if(data3.type === 'success') {
              alert('OTP sent successfully!');
            }
          });
        });
      }
    });
  }
});

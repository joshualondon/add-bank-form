$(document).ready(function() {

  /* -------------------------
   * Prevent number spinning on scrollwheel
   */
  $(':input[type=number]').on('mousewheel', function(e) {
    e.preventDefault();
  });





  /* -------------------------
   * Update nickname text
   */
  function updateNickname() {

    var nicknameInput = $('.input--nickname').val();
    var nicknameLenght = nicknameInput.length;
    var nicknameDisplay = $('.check--nickname');

    if (nicknameLenght >= 1) {
      nicknameDisplay.text(nicknameInput);
    } else {
      nicknameDisplay.text('Nickname');
    }

    if (nicknameLenght >= 28) {
      alert('too many chars');
    }
  }

  $('.input--nickname').on('keyup', function() {
    updateNickname();
  });






  /* -------------------------
   * Update routing number text and counter
   */
  function updateRoutingNumber() {

    var routingInput = $('.input--routing-number').val();
    var routingDisplay = $('.check-numbers--routing .numbers--value');

    routingDisplay.text(routingInput);
  }

  $('.input--routing-number').on('keyup', function() {
    updateRoutingNumber();
    updateRoutingCounter();
  });



  /* -------------------------
   * Update account number
   */
  function updateAccountNumber() {

    var accountInput = $('.input--account-number').val();
    var accountDisplay = $('.check-numbers--account .numbers--value');

    accountDisplay.text(accountInput);
  }

  $('.input--account-number').on('keyup', function() {
    updateAccountNumber();
  });




  /* -------------------------
   * Update number counter and error handling
   */
  function updateRoutingCounter() {

    var routingInput = $('.input--routing-number').val();
    var routingInputLength = routingInput.length;
    var routingNumberCounter = $('.routing-counter');
    var routingNumberCounterVal = routingNumberCounter.find('span');

    routingNumberCounterVal.text(routingInputLength);

    if (routingInputLength == 9) {
      validateBankRouting();
    }

    if (routingInputLength > 9) {
      routingNumberCounter.addClass('is-invalid');
    } else {
      routingNumberCounter.removeClass('is-invalid');
    }

  }




  /* -------------------------
   * Validate the bank routing with ACH
   */
  function validateBankRouting() {

    var routingInput = $('.input--routing-number').val();

    setTimeout(function() {

    })

    $.ajax({
      type: 'GET',
      url: 'https://www.routingnumbers.info/api/data.json?rn=' + routingInput,
      dataType: 'jsonp',
      encode: false,

      beforeSend: function() {
        $('.routing-counter').addClass('is-hidden');
        $('.loading--routing-number').removeClass('is-hidden')
      },

      success: function(response) {

        setTimeout(function() {
          console.log(response);

          $('.loading--routing-number').addClass('is-hidden');
          $('.loading--success-checkmark').removeClass('is-hidden');

          var respBankName = response.customer_name;
              bankName = respBankName.toLowerCase();

          var respBankStreet = response.address;
              bankStreet = respBankStreet.toLowerCase();

          var respBankCity = response.city;
              bankCity = respBankCity.toLowerCase();

          $('.check--bank-name').text(bankName);
          $('.bank-address--street').text(bankStreet);
          $('.bank-address--city').text(bankCity);
          $('.bank-address--state').text(response.state);
          $('.bank-address--zip').text(response.zip);
        }, 2000);

      },

      error: function() {
        // hide spinner
        // show validation
      }
    });
  }

  $('input[name=account-type]').on('change', function() {
    console.log('radio changed');

    var radioSavings = $('#account-type--savings');
    var radioChecking = $('#account-type--checking');
    var fauxCheck = $('.faux-check');

    fauxCheck.removeClass('account-radio--savings-checked account-radio--checking-checked');

    if (radioSavings.prop('checked')) {
      fauxCheck.addClass('account-radio--savings-checked');
    }

    if (radioChecking.prop('checked')) {
      fauxCheck.addClass('account-radio--checking-checked');
    }


  });



});

$(document).ready(function() {

    if( $(".slider").length > 0 ) {
        $(".slider").not(".slick-initialized").slick({
            dots: true,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1200,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            variableWidth: true,
        });
    }

  // Set the date we're counting down to
  var lastDay = $("[data-countdowndate]").attr("data-countdowndate");
  var countDownDate = new Date(lastDay).getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {

      // Get todays date and time
      var now = new Date().getTime();
      
      // Find the distance between now an the count down date
      var distance = countDownDate - now;
      
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      if(days <= 9) {
        days = "0" + Math.floor(distance / (1000 * 60 * 60 * 24));
      }    
      if(hours <= 9) {
        hours = "0" + Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      }    
      if(minutes <= 9) {
        minutes = "0" + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      }    
      if(seconds <= 9) {
        seconds = "0" + Math.floor((distance % (1000 * 60)) / 1000);
      }

      hours_str = hours.toString();
      $(".hours_1").html(hours_str.substr(0, 1));
      $(".hours_2").html(hours_str.substr(1));
      
      minutes_str = minutes.toString();
      $(".minutes_1").html(minutes_str.substr(0, 1));
      $(".minutes_2").html(minutes_str.substr(1));

      seconds_str = seconds.toString();
      $(".seconds_1").html(seconds_str.substr(0, 1));
      $(".seconds_2").html(seconds_str.substr(1));

      // If the count down is over, write some text 
      if (distance < 0) {
          clearInterval(x);
          $(".hours").html("00");
          $(".minutes").html("00");
          $(".seconds").html("00");
      }
  }, 1000);

  // -----------

  var this_form, name, tel, email, message, error;

  $(".submitBtn").on("click", function (event) {
      event.preventDefault();
      error = 0;
      this_form = $(this).closest("form");
      this_form.find('input, textarea').removeClass('error');
      
      if(this_form.find('input').is('input[type="text"]')) {
          name = this_form.find('input[type="text"]');
          if(typeof name.attr('required') != typeof undefined) {
              if(name.val().length<=2) {
                  name.addClass('error');
                  error = 1;
              }
          }
      }
      if(this_form.find('input').is('input[type="tel"]')) {
          tel = this_form.find('input[type="tel"]');
          if(typeof tel.attr('required') != typeof undefined) {
              if( tel.val().length == 0 ) {
                  tel.addClass('error');
                  error = 1;
              }
          }
      }
      $(".count_goods").each(function() {
        if($(this).is(":checked")) {
          count_goods = $(this).val();
        }
      });
      if(error==1) {
          return false;
      }
      $.ajax({
          url: "mail.php",
          method: 'post',
          data: {
            name: name.val(),
            tel: tel.val(),
            count_goods: count_goods
          },
          success: function (response) {
              jQuery(this_form)[0].reset();
              this_form.find('input, textarea, select').removeClass('error');
              this_form.find(".succes_message").fadeIn(300);
              setTimeout(function() {
                this_form.find(".succes_message").fadeOut(300);
              }, 3000);
          },
          error: function(){
              alert('Ошибка при отправке');
          }
      });
  });

});
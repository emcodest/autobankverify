jQuery(function($) {
  
    //Watch all ajax activity
    $(document).ajaxStart(function() {
      
      if ($('#loading-bar').length === 0) {
  
        $('body').append( $('<div/>').attr('id', 'loading-bar').addClass(_lb.position) );
  
        /**
         * Random loading bar initial percentage
         */
        _lb.percentage = Math.random() * 30 + 30;
        $("#loading-bar")[_lb.direction](_lb.percentage + "%");
  
        /**
         * Bump loading percentage between current and 99%
         */
        _lb.interval = setInterval(function() {
          
          _lb.percentage = Math.random() * ( (100-_lb.percentage) / 2 ) + _lb.percentage;
          
          $("#loading-bar")[_lb.direction](_lb.percentage + "%");
          
        }, 500);
  
      }
  
    }).ajaxStop(function() {
      
      clearInterval(_lb.interval);
      $("#loading-bar")[_lb.direction]("101%");
  
      /**
       * Waits until css transition is finished and removes element from the DOM
       */
      setTimeout( function() {
        $("#loading-bar").fadeOut(300, function() {
          $(this).remove();
        });
      }, 300);
  
    });
  
  });
  
  /**
   * Main object
   */
  var _lb = {}
  
  //Default loading bar position
  _lb.position  = 'top';
  _lb.direction = 'width'
  
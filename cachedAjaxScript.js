(function ($) {
  /*
  @param callback, which execute when all scripts done loaded
  @param options is a ajax options, see  jQuery.ajax( options )
    by default cache: true, dataType: "script",
  
  DOM:
  
  <a id="btnSave" data-form="formFoo" class="btn-floating btn-large" cachedAjaxScript="/js/profile.js"><i class="material-icons">save</i></a>
  <script cachedAjaxScript="/js/foo.js"></script>
  <div cachedAjaxScript="/js/bar.js"></div>
  
  Usage:
  $('*[cachedAjaxScript]').cachedAjaxScript(function () {
    // extended functionality here!!
    $('#btnSave').profile('btnSaveProfile');
  });
  
  */
  
  var ajaxDone = function (elem, url, options) {
    
    return function( script, textStatus, jqxhr ) {
      if (jqxhr.status == '200' || jqxhr.status == '304') {
        options.done++;
        elem.removeAttr('cachedAjaxScript');
        elem.attr('done-cachedAjaxScript', url);
      }
      if (options.done == options.total) {
        options.callback();
      }
      
    };
  };
  
  $.fn.cachedAjaxScript = function (callback, options) {
    
    var defaults = {
      dataType: "script",
      cache: true,
      //url
    };
    options = $.extend(defaults, options);
    
    //  evalute callback when done=total
    var counter = {// один для всех
      total: $(this).length,
      done: 0,
      callback: callback,
    };
    
    $(this).each(function(){
      var $this = $(this);
      options.url = $this.attr('cachedAjaxScript');
      jQuery.ajax( options ).done(ajaxDone($this, options.url, counter));
    });
  };
}( jQuery ));

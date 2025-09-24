// Menu Btn
/* --------------------------------------------------- */
$(function() {
  // MenuBtn
  $('.btn_menu').click(function() {
    $('.btn_menu').toggleClass('open');
    if ( $('.btn_menu').hasClass('open') ) {
      $('.menu_text').html('CLOSE');
    } else {
      $('.menu_text').html('MENU');
    }
  });
});

// Smooth Scroll
/* --------------------------------------------------- */
$(function() {
  $('a[href^="#"]').click(function() {
    var href = $(this).attr('href');
    var target = $(href == '#' || href == '' ? 'html' : href);
    target.focus();
    var position = target.offset().top;
    $('html, body').animate( {
      scrollTop: position
    }, 1000, 'swing');
    return false;
  });
});

// File Size
/* --------------------------------------------------- */
$(function() {
  $('document').ready(function() {
    $('a[href].file').each(function() {
      var obj = $(this);
      var href = obj.attr('href');
      if ( href.match(/\.(TXT|CSV|PDF|MP3|ISO|ZIP|7Z|LZH|RAR|EXE|DMG|SIT|TAR|GZ|DOC|DOCX|XLS|XLSX|PPT|PPTX|MOV|AVI|MP4|WMV|MSI|MSP|SWF)$/i) ) {
        var ext = RegExp.$1;
        var req = $.ajax( {
          type: 'HEAD',
          url: href,
          success: function() {
            var size = req.getResponseHeader('Content-Length');
            if (size) {
              var showsize = conv_unit(size);
              var iHrefLength = href.length;
              var iDot = href.lastIndexOf(".");
              var sExtension = href.substring(iDot+1,iHrefLength);
              sExtension = sExtension.toUpperCase();
              var regExp = /PDF([?#&][\w]+[=]\d)+$/;
              if ( regExp.test(sExtension) ) {
                sExtension = '';
              }
              if ( sExtension == 'DOC' ) {
                sExtension = 'Word';
              }
              if ( sExtension == 'PDF' ) {
                obj.attr({target:"_blank"});
              }
              obj.find('.file_size').html('（'+ sExtension + '&nbsp;/&nbsp;' + conv_unit(size)+'）');
            }
          }
        });
      }
    });
  });
  var number_format = function(val) {
    var s = '' + val;
    if (s.length > 3) {
      var r = ((r = s.length % 3) == 0 ? 3 : r);
      var d = s.substring(r);
      s = s.substr(0, r) + d.replace(/(\d{3})/g, ",$1");
    }
    return s;
  };
  var conv_unit = function(size) {
    var unit = ['KB','MB','GB','TB','PB','EB','ZB','YB'];
    if (size < 1024) return size + 'B';
    for (var i = 0; i < unit.length; i++) {
      size /= 1024;
      if (size < 1024) {
        if (size >= 100)
        return number_format(Math.ceil(size)) + unit[i];
        else
        return Math.ceil(size*1)/1 + unit[i];
      }
    }
    return number_format(Math.ceil(size)) + 'YB';
  };
});

// Top Slide
/* --------------------------------------------------- */
$(function() {
  if ($('div').hasClass('mv_area')) {
    $('.mv_area .main_slider').slick( {
      autoplay: true,
      autoplaySpeed: 5000,
      dots: true,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
    });
    $('.mv_area .slick-dots').wrap('<div class="container"></div>');
    $('.mv_area .main_slider .container').wrap('<div class="slick_nav"></div>');
    $('.mv_area .slick_nav .container').append('<div class="slick_ps"><div class="slick_play"><a href="javascript:void(0);"><img src="./images/css/icon_play.png" alt="再生"></a></div><div class="slick_stop active"><a href="javascript:void(0);"><img src="./images/css/icon_stop.png" alt="停止"></a></div></div>');
    $('.mv_area .slick_stop').on('click',function() {
      $('.mv_area .main_slider').slick('slickPause');
      $(this).removeClass('active');
      $('.mv_area .slick_play').addClass('active');
    });
    $('.mv_area .slick_play').on('click',function() {
      $('.mv_area .main_slider').slick('slickPlay');
      $(this).removeClass('active');
      $('.mv_area .slick_stop').addClass('active');
    });
 }
});


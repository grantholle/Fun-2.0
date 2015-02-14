(function($) {

  var $body = $('body'),
      $window = $(window),
      $rapper = $('section.rapper'),
      $overlay = $('section.overlay'),
      littleWillHeight = 50,
      littleWillWidth = 50,
      littleWill = '<article class="little-will"><img src="will.png"></article>',
      maxLeft = 0,
      minLeft = -1 * littleWillWidth,
      maxTop = 0,
      minTop = -1 * littleWillHeight,
      diagMaxLeft = 0,
      diagMinLeft = 0,
      diagMaxTop = 0,
      diagMinTop = 0,
      iRobot = [],
      princeCount = 0,

      agentJ = function () {
        var index = Math.floor(Math.random() * (iRobot.length));

        return iRobot[index];
      },

      range = function () {
        maxLeft = $window.outerWidth() - 1;
        maxTop = $window.outerHeight();

        diagMaxLeft = maxLeft + (maxTop / 2);
        diagMinLeft = minLeft - (maxTop / 2);
        diagMaxTop = maxTop + (maxLeft / 2);
        diagMinTop = minTop - (maxLeft / 2);
      },

      chasingForever = function () {
        var red = Math.floor(Math.random() * 256),
            green = Math.floor(Math.random() * 256),
            blue = Math.floor(Math.random() * 256),
            rgb = 'rgb(' + red + ',' + green + ',' + blue + ')';

        $body.css('background', rgb);

        setTimeout(chasingForever, 150);
      },

      freshPrince = function () {
        var willard = agentJ(),
            $will = $(littleWill).addClass(willard.class).css(willard.style);

        princeCount++;

        if (!!willard.to) {
          var name = 'willard-' + princeCount;

          $.keyframe.define({
            name: name,
            to: {
              'transform': 'translate(' + willard.to.left() + 'px, ' + willard.to.top() + 'px)'
            }
          });

          $will.playKeyframe(name + ' 3s linear 0 infinite');
        }

        $rapper.append($will);

        setTimeout(freshPrince, Math.floor(Math.random() * (1500 - 150 + 1)) + 150);
      },

      wildWildWest = function () {
        $('<img/>').attr('src', 'will.png').load(function (e) {
          $(this).remove();
          $overlay.css('background-image', 'url(will.png)');

          setTimeout(function () {
            $overlay.addClass('gone');
            $body.find('audio')[0].play();
            chasingForever();
            freshPrince();
          }, 2000);
        });
      },

      topper = function () {
        return Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop;
      },

      lefter = function () {
        return Math.floor(Math.random() * (maxLeft - minLeft + 1)) + minLeft;
      },

      diagTopper = function () {
        return Math.floor(Math.random() * (diagMaxTop - diagMinTop + 1)) + diagMinTop;
      },

      diagLefter = function () {
        return Math.floor(Math.random() * (diagMaxLeft - diagMinLeft + 1)) + diagMinLeft;
      },

      sonny = function () {
        iRobot = [
          {
            class: 'to-left',
            style: { top: topper }
          },
          {
            class: 'to-right',
            style: { top: topper }
          },
          {
            class: 'to-top',
            style: { left: lefter }
          },
          {
            class: 'to-bottom',
            style: { left: lefter }
          },
          {
            class: 'diagonal-to-left',
            style: { top: diagTopper },
            to: {
              top: diagTopper,
              left: function() { return -1 * maxLeft - littleWillWidth; }
            }
          },
          {
            class: 'diagonal-to-right',
            style: { top: diagTopper },
            to: {
              top: diagTopper,
              left: function() { return maxLeft + littleWillWidth; }
            }
          },
          {
            class: 'diagonal-to-top',
            style: { left: diagLefter },
            to: {
              left: diagLefter,
              top: function () { return -1 * maxTop - littleWillHeight; }
            }
          },
          {
            class: 'diagonal-to-bottom',
            style: { left: diagLefter },
            to: {
              left: diagLefter,
              top: function () { return maxTop + littleWillHeight; }
            }
          }
        ]
      },

      uh = function () {
        range();
        sonny();
        wildWildWest();

        $window.resize(function () {
          range();
        });
      };

  uh();

})(window.jQuery);
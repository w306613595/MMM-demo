;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-wodefankui" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M883.2 83.2l-742.4 0c-51.2 0-92.8 41.6-92.8 89.6l0 582.4c0 48 41.6 89.6 92.8 89.6l256 0c0 0 6.4 6.4 16 19.2 3.2 3.2 6.4 6.4 9.6 12.8 0 0 6.4 9.6 9.6 12.8 28.8 44.8 51.2 67.2 86.4 67.2 35.2 0 60.8-22.4 89.6-67.2 22.4-35.2 28.8-44.8 28.8-44.8l249.6 0c51.2 0 92.8-41.6 92.8-89.6l0-582.4C976 121.6 934.4 83.2 883.2 83.2zM931.2 755.2c0 25.6-19.2 44.8-44.8 44.8l-252.8 0c-6.4 0-9.6 0-16 3.2-9.6 6.4-19.2 12.8-28.8 28.8-3.2 6.4-22.4 35.2-22.4 35.2-19.2 32-35.2 44.8-48 44.8-12.8 0-25.6-12.8-48-44.8-3.2-3.2-6.4-12.8-9.6-12.8-3.2-6.4-6.4-9.6-9.6-12.8-19.2-25.6-32-38.4-54.4-38.4l-256 0c-25.6 0-44.8-19.2-44.8-44.8l0-582.4c0-25.6 22.4-44.8 48-44.8l742.4 0c25.6 0 48 19.2 48 44.8L934.4 755.2z"  ></path>' +
    '' +
    '<path d="M220.8 483.2a1.6 1.6 0 1 0 102.4 0 1.6 1.6 0 1 0-102.4 0Z"  ></path>' +
    '' +
    '<path d="M460.8 483.2a1.6 1.6 0 1 0 102.4 0 1.6 1.6 0 1 0-102.4 0Z"  ></path>' +
    '' +
    '<path d="M697.6 483.2a1.6 1.6 0 1 0 102.4 0 1.6 1.6 0 1 0-102.4 0Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)
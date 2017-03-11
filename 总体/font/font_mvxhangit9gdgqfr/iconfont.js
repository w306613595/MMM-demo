;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-icon1460187848267" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M73.142857 219.428571l250.051048 0c7.43619-16.993524 16.262095-33.231238 26.112-48.761905L73.142857 170.666667C59.684571 170.666667 48.761905 181.589333 48.761905 195.047619S59.684571 219.428571 73.142857 219.428571zM73.142857 585.142857l293.083429 0c-11.605333-15.408762-22.186667-31.597714-31.256381-48.761905L73.142857 536.380952c-13.458286 0-24.380952 10.898286-24.380952 24.380952S59.684571 585.142857 73.142857 585.142857zM853.333333 902.095238 73.142857 902.095238c-13.458286 0-24.380952 10.898286-24.380952 24.380952s10.922667 24.380952 24.380952 24.380952l780.190476 0c13.482667 0 24.380952-10.898286 24.380952-24.380952S866.816 902.095238 853.333333 902.095238zM996.912762 730.819048l-145.627429-145.627429C912.213333 531.577905 950.857143 453.241905 950.857143 365.714286c0-161.572571-130.998857-292.571429-292.571429-292.571429S365.714286 204.141714 365.714286 365.714286s130.998857 292.571429 292.571429 292.571429c56.344381 0 108.739048-16.188952 153.380571-43.76381l150.77181 150.77181c9.557333 9.557333 24.966095 9.557333 34.474667 0C1006.421333 755.785143 1006.421333 740.327619 996.912762 730.819048zM658.285714 609.52381c-134.656 0-243.809524-109.177905-243.809524-243.809524 0-134.656 109.153524-243.809524 243.809524-243.809524 134.607238 0 243.809524 109.153524 243.809524 243.809524C902.095238 500.345905 792.892952 609.52381 658.285714 609.52381z"  ></path>' +
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
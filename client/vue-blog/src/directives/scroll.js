export default {
  inserted: function (el, binding) {
    let lastPosition = 0
    let ticking = false

    function callback (now) {
      lastPosition = now
    }
    let f = function (evt) {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          if (binding.value(evt, el, binding, lastPosition, callback)) {
            window.removeEventListener('scroll', f)
          }
          ticking = false
        })
      }
      ticking = true
    }
    window.addEventListener('scroll', f)
  },
  unbind: function (params) {
    // window.removeEventListener('scroll', f);
  }
}

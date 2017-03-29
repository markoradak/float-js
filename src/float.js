/*!
 * Float JS
 * --------
 * @author Marko Radak <mail@markoradak.com>
 * @desc   A tiny decelerated layer offseting
 *         engine that reacts to the mouse
 *         position or device orientation.
 */

function init( options ) {

  // Define animation frame.
  const requestAnimationFrame = window.requestAnimationFrame       ||
                                window.webkitRequestAnimationFrame ||
                                window.mozRequestAnimationFrame    ||
                                window.oRequestAnimationFrame

  // Get every element with [data-float] selector.
  const floatElements = document.querySelectorAll('[data-float]')

  // Calculate window width and height initially.
  var vw = window.innerWidth,
      vh = window.innerHeight

  // Assign default mouse position / accelerometer values.
  var inputX = vw / 2,
      inputY = vh / 2,
      dX = 0,
      dY = 0

  // Create default options.
  var options = Object.assign({
    'deceleration': 0.5,
    'strength': 0.5,
    'precision':  2,
    'direction': -1
  }, options)

  /**
   * Normalize Deceleration
   * ----------------------
   * @desc Deceleration should never be lower than 1.
   *       Additional math is performed so that a
   *       variable would go between 0 - 1 range.
   */
  options['deceleration'] = Math.max( 1, options.deceleration * 100 / 6 )

  // Create layer positions array.
  var positions = []

  // Push initial position values for every float element.
  for (var i = 0; i < floatElements.length; i++) {
    positions.push({
      'xPos': 0,
      'yPos': 0
    })
  }

  // Check if device motion API exists.
  var acc
  window.addEventListener( 'devicemotion', (e) => {
    e.accelerationIncludingGravity.x == null ? acc = false : acc = true
  })

  // Create float function.
  function float() {

    // Update input on mouse move.
    window.addEventListener( 'mousemove', (e) => {
      inputX = e.clientX
      inputY = e.clientY
    })

    // Update input on device motion if API exists.
    if ( acc )
      window.addEventListener( 'devicemotion', (e) => {
        inputX = e.accelerationIncludingGravity.x * 100
        inputY = e.accelerationIncludingGravity.y * 100 * ( -1 )
      })

    // Update window width / height on resize.
    window.addEventListener( 'resize', () => {
      vw = window.innerWidth
      vh = window.innerHeight
    })

    // Itterate through float elements.
    for (var i = 0; i < floatElements.length; i++) {

      // Set base variables.
      var element  = floatElements[i],
          strength = element.getAttribute('data-float')

      /**
       * Normalize Strength
       * ------------------
       * @desc Calculate strenght based on it's HTML
       *       input multiplied with options variable.
       *       Additional math is performed so that a
       *       variable would go between 0 - 1 range.
       */
      strength = strength * (options.strength / 2.5)

      /**
       * Calculate Layer Positions
       * -------------------------
       * @desc Calculate layer positions based on
       *       normalized user's input, multiplied
       *       with direction and strength and
       *       finally substracted with it's
       *       previous position.
       */
      dX = ( inputX - vw/2 ) * options.direction * strength - positions[i].xPos
      dY = ( inputY - vh/2 ) * options.direction * strength - positions[i].yPos

      /**
       * Decelerate
       * ----------
       * @desc Decelerate final position by adding
       *       newly calculated position divided
       *       by deceleration rate.
       */
      positions[i].xPos += ( dX / options.deceleration )
      positions[i].yPos += ( dY / options.deceleration )

      // Apply final transformations with precision rate.
      element.style.transform = 'translate3d(' +
        positions[i].xPos.toFixed(options.precision) + 'px, '  +
        positions[i].yPos.toFixed(options.precision) + 'px, 0)'

    }

    // Request animation frame.
    requestAnimationFrame( float )

  }

  // Kickoff.
  float()

}

// Export module.
module.exports = {
  init: init
}

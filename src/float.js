/*!
 * Float JS
 * --------
 * @author Marko Radak <mail@markoradak.com>
 * @desc   A tiny decelerated layer offseting
 *         engine that reacts to the mouse
 *         position or device orientation.
 */

const raf = require('raf');

class FloatJS {
  constructor({
    attribute = 'data-float',
    deceleration = 0.5,
    strength = 0.5,
    precision = 2,
    direction = -1,
  }) {
      // Set config.
    this.attribute = attribute;
    this.deceleration = deceleration;
    this.strength = strength;
    this.precision = precision;
    this.direction = direction;

    // Get every element with defined attribute.
    this.floatElements = document.querySelectorAll(`[${this.attribute}]`);

    // Calculate window width and height initially.
    this.vw = window.innerWidth;
    this.vh = window.innerHeight;

    // Assign default mouse position / accelerometer values.
    this.inputX = this.vw / 2;
    this.inputY = this.vh / 2;
    this.dX = 0;
    this.dY = 0;

    /**
     * Normalize Deceleration
     * ----------------------
     * @desc Deceleration should never be lower than 1.
     *       Additional math is performed so that a
     *       variable would go between 0 - 1 range.
     */
    this.deceleration = Math.max(1, (this.deceleration * 100) / 6);

    // Create layer positions array.
    this.positions = [];

    // Push initial position values for every float element.
    this.floatElements.forEach(() => {
      this.positions.push({
        xPos: 0,
        yPos: 0,
      });
    });

    // Check if device motion API exists.
    this.acc = false;
    window.addEventListener('devicemotion', (e) => {
      if (e.accelerationIncludingGravity.x == null) {
        this.acc = false;
      } else {
        this.acc = true;
      }
    });

    // Kickoff on DOM loaded.
    document.addEventListener('DOMContentLoaded', () => {
      this.float();
    }, false);
  }

  // Create float function.
  float() {
    // Update input on mouse move.
    window.addEventListener('mousemove', (e) => {
      this.inputX = e.clientX;
      this.inputY = e.clientY;
    });

    // Update input on device motion if API exists.
    if (this.acc) {
      window.addEventListener('devicemotion', (e) => {
        this.inputX = e.accelerationIncludingGravity.x * 100;
        this.inputY = e.accelerationIncludingGravity.y * 100 * (-1);
      });
    }

    // Update window width / height on resize.
    window.addEventListener('resize', () => {
      this.vw = window.innerWidth;
      this.vh = window.innerHeight;
    });

    // Itterate through float elements.
    this.floatElements.forEach((element, i) => {
      // Set strength.
      let strength = element.getAttribute(this.attribute);

      /**
       * Normalize Strength
       * ------------------
       * @desc Calculate strenght based on it's HTML
       *       input multiplied with options variable.
       *       Additional math is performed so that a
       *       variable would go between 0 - 1 range.
       */
      strength *= (this.strength / 2.5);

      /**
       * Calculate Layer Positions
       * -------------------------
       * @desc Calculate layer positions based on
       *       normalized user's input, multiplied
       *       with direction and strength and
       *       finally substracted with it's
       *       previous position.
       */
      this.dX =
        ((this.inputX - (this.vw / 2))
        * (this.direction * strength))
        - this.positions[i].xPos;
      this.dY =
        ((this.inputY - (this.vh / 2))
        * (this.direction * strength))
        - this.positions[i].yPos;

      /**
       * Decelerate
       * ----------
       * @desc Decelerate final position by adding
       *       newly calculated position divided
       *       by deceleration rate.
       */
      this.positions[i].xPos += (this.dX / this.deceleration);
      this.positions[i].yPos += (this.dY / this.deceleration);

      // Apply final transformations with precision rate.
      element.style.transform = `translate3d(${
        this.positions[i].xPos.toFixed(this.precision)}px, ${
        this.positions[i].yPos.toFixed(this.precision)}px, 0)`;
    });

    // Request animation frame.
    raf(this.float.bind(this));
  }
}

// Export module.
module.exports = FloatJS;

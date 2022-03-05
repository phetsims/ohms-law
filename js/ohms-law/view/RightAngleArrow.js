// Copyright 2013-2022, University of Colorado Boulder

/**
 * View for a right angled arrow around WireBox
 * The arrow points down and then to the left.
 *
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import { Shape } from '../../../../kite/js/imports.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import { Path } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ohmsLaw from '../../ohmsLaw.js';

// constants
// points for the arrow
const POINTS = [
  new Vector2( 5, -30 ),  // inner tail of arrow
  new Vector2( 13, -30 ), // outer tail of arrow
  new Vector2( 13, 13 ),  // outer corner
  new Vector2( -25, 13 ),
  new Vector2( -25, 17 ),
  new Vector2( -40, 8.5 ), // tip of the arrow head
  new Vector2( -25, 0 ),
  new Vector2( -25, 5 ),
  new Vector2( 5, 5 ) // inner corner
];

class RightAngleArrow extends Path {
  /**
   * @param {Property.<number>} currentProperty
   * @param {Object} [options]
   */
  constructor( currentProperty, options ) {

    options = merge( {
      stroke: '#000',
      fill: PhetColorScheme.RED_COLORBLIND,
      lineWidth: 0.2,

      // The arrow increased in size when the layout bounds were increased. Rather than drawing a new shape, just
      // scale it back. Part of https://github.com/phetsims/ohms-law/issues/62.
      scale: 0.85,

      tandem: Tandem.REQUIRED
    }, options );

    // create the shape of the arrow
    const arrowShape = new Shape().polygon( POINTS );

    super( arrowShape, options );

    // Present for the lifetime of the simulation
    currentProperty.lazyLink( current => {

      // Scale the arrows based on the value of the current.
      // Exponential scaling algorithm.  Linear makes the changes too big.
      const scale = Math.pow( ( current * 0.1 ), 0.7 );

      this.setScaleMagnitude( scale );
    } );
  }
}

ohmsLaw.register( 'RightAngleArrow', RightAngleArrow );

export default RightAngleArrow;
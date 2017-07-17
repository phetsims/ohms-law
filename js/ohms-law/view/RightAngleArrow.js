// Copyright 2016-2017, University of Colorado Boulder

/**
 * View for a right angled arrow around WireBox
 * The arrow points down and then to the left.
 *
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  var Shape = require( 'KITE/Shape' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  // points for the arrow
  var POINTS = [
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

  /**
   * @param {Property.<number>} currentProperty
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function RightAngleArrow( currentProperty, tandem, options ) {
    var self = this;

    // create the shape of the arrow
    var arrowShape = new Shape().polygon( POINTS );

    Path.call( this, arrowShape, {
      stroke: '#000',
      fill: PhetColorScheme.RED_COLORBLIND,
      lineWidth: 0.2,

      // The arrow increased in size when the layout bounds were increased. Rather than drawing a new shape, just
      // scale it back. Part of https://github.com/phetsims/ohms-law/issues/62.
      scale: .85
    } );

    // Present for the lifetime of the simulation
    currentProperty.lazyLink( function( current ) {

      // Scale the arrows based on the value of the current.
      // Exponential scaling algorithm.  Linear makes the changes too big.
      var scale = Math.pow( ( current * 0.1 ), 0.7 );

      self.setScaleMagnitude( scale );
    } );

    options.tandem = tandem;
    this.mutate( options );
  }

  ohmsLaw.register( 'RightAngleArrow', RightAngleArrow );

  return inherit( Path, RightAngleArrow );
} );

// Copyright 2013-2015, University of Colorado Boulder

/**
 * View for OhmsLaw simulations.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var OhmsLawStage = require( 'OHMS_LAW/ohms-law/view/OhmsLawStage' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {OhmsLawModel} model
   * @constructor
   */
  function OhmsLawView( model ) {
    ScreenView.call( this, { layoutBounds: new Bounds2( 0, 0, 768, 504 ) } );
    this.addChild( new OhmsLawStage( model ) );
  }

  return inherit( ScreenView, OhmsLawView );
} );

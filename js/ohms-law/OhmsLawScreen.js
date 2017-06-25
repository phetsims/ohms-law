// Copyright 2016-2017, University of Colorado Boulder

/**
 * The main screen class for the 'Ohms Law' simulation.  This is where the main model and view instances are
 * created and inserted into the framework.
 *
 * @author Martin Veillette (Berea College)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var OhmsLawModel = require( 'OHMS_LAW/ohms-law/model/OhmsLawModel' );
  var OhmsLawScreenView = require( 'OHMS_LAW/ohms-law/view/OhmsLawScreenView' );
  var Property = require( 'AXON/Property' );
  var Screen = require( 'JOIST/Screen' );
  var TColor = require( 'SCENERY/util/TColor' );

  /**
   * @constructor
   */
  function OhmsLawScreen( tandem ) {
    Screen.call( this,
      function() { return new OhmsLawModel( tandem.createTandem( 'ohmsLawModel' ) ); },
      function( model ) { return new OhmsLawScreenView( model, tandem.createTandem( 'ohmsLawScreenView' ) ); },
      {
        backgroundColorProperty: new Property( '#ffffdf', {
          tandem: tandem.createTandem( 'backgroundColorProperty' ),
          phetioValueType: TColor
        } ),
        tandem: tandem
      }
    );
  }

  ohmsLaw.register( 'OhmsLawScreen', OhmsLawScreen );

  return inherit( Screen, OhmsLawScreen );
} );

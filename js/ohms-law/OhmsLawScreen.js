// Copyright 2017-2019, University of Colorado Boulder

/**
 * The main screen class for the 'Ohms Law' simulation.  This is where the main model and view instances are
 * created and inserted into the framework.
 *
 * @author Martin Veillette (Berea College)
 */
define( require => {
  'use strict';

  // modules
  const Color = require( 'SCENERY/util/Color' );
  const ColorIO = require( 'SCENERY/util/ColorIO' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  const OhmsLawModel = require( 'OHMS_LAW/ohms-law/model/OhmsLawModel' );
  const OhmsLawScreenView = require( 'OHMS_LAW/ohms-law/view/OhmsLawScreenView' );
  const Property = require( 'AXON/Property' );
  const PropertyIO = require( 'AXON/PropertyIO' );
  const Screen = require( 'JOIST/Screen' );

  /**
   * @constructor
   */
  function OhmsLawScreen( tandem ) {
    Screen.call( this,
      function() { return new OhmsLawModel( tandem.createTandem( 'model' ) ); },
      function( model ) { return new OhmsLawScreenView( model, tandem.createTandem( 'view' ) ); },
      {
        backgroundColorProperty: new Property( new Color( '#ffffdf' ), {
          tandem: tandem.createTandem( 'backgroundColorProperty' ),
          phetioType: PropertyIO( ColorIO )
        } ),
        tandem: tandem
      }
    );
  }

  ohmsLaw.register( 'OhmsLawScreen', OhmsLawScreen );

  return inherit( Screen, OhmsLawScreen );
} );

// Copyright 2017-2018, University of Colorado Boulder

/**
 * Content for the "Hot Keys and Help" dialog that can be brought up from the sim navigation bar.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow
 */
define( function( require ) {
  'use strict';

  // modules
  var GeneralKeyboardHelpSection = require( 'SCENERY_PHET/keyboard/help/GeneralKeyboardHelpSection' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var SliderKeyboardHelpSection = require( 'SCENERY_PHET/keyboard/help/SliderKeyboardHelpSection' );

  /**
   * @constructor
   */
  function OhmsLawKeyboardHelpContent() {

    var sliderKeyboardHelpSection = new SliderKeyboardHelpSection();
    var generalNavigationHelpSection = new GeneralKeyboardHelpSection();

    HBox.call( this, {
      children: [ sliderKeyboardHelpSection, generalNavigationHelpSection ],
      align: 'top',
      spacing: 30
    } );
  }

  ohmsLaw.register( 'OhmsLawKeyboardHelpContent', OhmsLawKeyboardHelpContent );

  return inherit( HBox, OhmsLawKeyboardHelpContent );
} );
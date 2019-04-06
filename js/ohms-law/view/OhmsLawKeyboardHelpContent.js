// Copyright 2017-2018, University of Colorado Boulder

/**
 * Content for the "Hot Keys and Help" dialog that can be brought up from the sim navigation bar.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow
 */
define( require => {
  'use strict';

  // modules
  const GeneralKeyboardHelpSection = require( 'SCENERY_PHET/keyboard/help/GeneralKeyboardHelpSection' );
  const TwoColumnKeyboardHelpContent = require( 'SCENERY_PHET/keyboard/help/TwoColumnKeyboardHelpContent' );
  const ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  const SliderKeyboardHelpSection = require( 'SCENERY_PHET/keyboard/help/SliderKeyboardHelpSection' );

  class OhmsLawKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
    constructor() {
      const sliderKeyboardHelpSection = new SliderKeyboardHelpSection();
      const generalNavigationHelpSection = new GeneralKeyboardHelpSection();

      super( sliderKeyboardHelpSection, generalNavigationHelpSection );
    }
  }

  return ohmsLaw.register( 'OhmsLawKeyboardHelpContent', OhmsLawKeyboardHelpContent );
} );
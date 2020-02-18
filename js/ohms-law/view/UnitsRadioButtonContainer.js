// Copyright 2020, University of Colorado Boulder

/**
 * RadioButtonGroup with heading to control current units
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const AccessiblePeer = require( 'SCENERY/accessibility/AccessiblePeer' );
  const CurrentUnit = require( 'OHMS_LAW/ohms-law/model/CurrentUnit' );
  const merge = require( 'PHET_CORE/merge' );
  const ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  const OhmsLawA11yStrings = require( 'OHMS_LAW/ohms-law/OhmsLawA11yStrings' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VerticalAquaRadioButtonGroup = require( 'SUN/VerticalAquaRadioButtonGroup' );

  // strings
  const ampsAString = require( 'string!OHMS_LAW/ampsA' );
  const milliampsMAString = require( 'string!OHMS_LAW/milliampsMA' );
  const unitsString = require( 'string!OHMS_LAW/units' );

  // a11y strings
  const chooseUnitForCurrentString = OhmsLawA11yStrings.chooseUnitForCurrent.value;

  // constants
  const MAX_WIDTH = 250;
  const RADIO_BUTTON_TEXT_OPTIONS = { font: new PhetFont( 20 ), maxWidth: MAX_WIDTH };

  class UnitsRadioButtonContainer extends VBox {

    /**
     * @param {Property.<CurrentUnit>}currentUnitsProperty
     * @param {Object} [options] - not passed to supertype
     */
    constructor( currentUnitsProperty, options ) {

      merge( {
        tandem: Tandem.REQUIRED,
        tagName: 'div'
      }, options );

      const unitsHeading = new RichText( unitsString, {
        font: new PhetFont( {
          size: 22,
          weight: 'bold'
        } ),
        maxWidth: MAX_WIDTH
      } );

      const currentUnitRadioButtonGroup = new VerticalAquaRadioButtonGroup( currentUnitsProperty, [
        {
          node: new Text( milliampsMAString, RADIO_BUTTON_TEXT_OPTIONS ),
          value: CurrentUnit.MILLIAMPS,
          tandemName: 'milliampsRadioButton',
          labelContent: milliampsMAString
        }, {
          node: new Text( ampsAString, RADIO_BUTTON_TEXT_OPTIONS ),
          value: CurrentUnit.AMPS,
          tandemName: 'ampsRadioButton',
          labelContent: ampsAString
        } ], {
        labelTagName: 'h3',
        labelContent: unitsString,
        descriptionContent: chooseUnitForCurrentString,
        tandem: options.tandem.createTandem( 'currentUnitRadioButtonGroup' )
      } );

      // a11y - the radio button group is aria-labelledby the heading
      currentUnitRadioButtonGroup.addAriaLabelledbyAssociation( {
        thisElementName: AccessiblePeer.PRIMARY_SIBLING,
        otherNode: currentUnitRadioButtonGroup,
        otherElementName: AccessiblePeer.LABEL_SIBLING
      } );

      super( {
        children: [ unitsHeading, currentUnitRadioButtonGroup ],
        align: 'left',
        spacing: 10
      } );
    }
  }

  return ohmsLaw.register( 'UnitsRadioButtonContainer', UnitsRadioButtonContainer );

} );

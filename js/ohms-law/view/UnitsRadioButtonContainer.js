// Copyright 2020-2021, University of Colorado Boulder

/**
 * Radio button group with heading to control current units
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { RichText, Text, VBox } from '../../../../scenery/js/imports.js';
import VerticalAquaRadioButtonGroup from '../../../../sun/js/VerticalAquaRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ohmsLaw from '../../ohmsLaw.js';
import ohmsLawStrings from '../../ohmsLawStrings.js';
import CurrentUnit from '../model/CurrentUnit.js';
import OhmsLawA11yStrings from '../OhmsLawA11yStrings.js';

const ampsAString = ohmsLawStrings.ampsA;
const milliampsMAString = ohmsLawStrings.milliampsMA;
const unitsString = ohmsLawStrings.units;

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
      labelContent: unitsString,
      descriptionContent: chooseUnitForCurrentString,
      tandem: options.tandem.createTandem( 'currentUnitRadioButtonGroup' )
    } );

    super( {
      children: [ unitsHeading, currentUnitRadioButtonGroup ],
      align: 'left',
      spacing: 10
    } );
  }
}

ohmsLaw.register( 'UnitsRadioButtonContainer', UnitsRadioButtonContainer );
export default UnitsRadioButtonContainer;
// Copyright 2020-2025, University of Colorado Boulder

/**
 * Radio button group with heading to control current units
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VerticalAquaRadioButtonGroup from '../../../../sun/js/VerticalAquaRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ohmsLaw from '../../ohmsLaw.js';
import OhmsLawStrings from '../../OhmsLawStrings.js';
import OhmsLawMessages from '../../strings/OhmsLawMessages.js';
import CurrentUnit from '../model/CurrentUnit.js';

const ampsAString = OhmsLawStrings.ampsA;
const milliampsMAString = OhmsLawStrings.milliampsMA;
const unitsString = OhmsLawStrings.units;

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
        createNode: () => new Text( milliampsMAString, RADIO_BUTTON_TEXT_OPTIONS ),
        value: CurrentUnit.MILLIAMPS,
        tandemName: 'milliampsRadioButton',
        options: {
          accessibleName: milliampsMAString
        }
      }, {
        createNode: () => new Text( ampsAString, RADIO_BUTTON_TEXT_OPTIONS ),
        value: CurrentUnit.AMPS,
        tandemName: 'ampsRadioButton',
        options: {
          accessibleName: ampsAString
        }
      } ], {
      labelContent: unitsString,
      descriptionContent: OhmsLawMessages.chooseUnitForCurrentMessageProperty,
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
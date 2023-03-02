// Copyright 2013-2023, University of Colorado Boulder

/**
 * Panel that displays the current inside the WireBox
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { HBox, Rectangle, Text } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ohmsLaw from '../../ohmsLaw.js';
import OhmsLawStrings from '../../OhmsLawStrings.js';
import CurrentUnit from '../model/CurrentUnit.js';
import OhmsLawModel from '../model/OhmsLawModel.js';
import OhmsLawConstants from '../OhmsLawConstants.js';

const currentAmpUnitsString = OhmsLawStrings.currentAmpUnits;
const currentString = OhmsLawStrings.current;
const currentUnitsString = OhmsLawStrings.currentUnits;

// constants
const FONT = new PhetFont( 32 );
const MAX_READOUT_WIDTH = 0.63 * OhmsLawConstants.WIRE_WIDTH;

class ReadoutPanel extends Panel {

  /**
   * @param {OhmsLawModel} model
   * @param {Object} [options]
   */
  constructor( model, options ) {

    options = merge( {
      xMargin: 30,
      yMargin: 8,
      lineWidth: 3,
      resize: false,
      tandem: Tandem.REQUIRED
    }, options );

    const currentStringText = new Text( currentString, {
      font: FONT,
      fill: PhetColorScheme.RED_COLORBLIND,
      maxWidth: 110, // empirically determined
      tandem: options.tandem.createTandem( 'currentStringText' )
    } );

    const equalsSignText = new Text( '=', {
      font: FONT,
      fill: 'black',
      tandem: options.tandem.createTandem( 'equalsSignText' ),
      phetioReadOnly: true
    } );

    const currentValueText = new Text( Utils.toFixed( OhmsLawModel.getMaxCurrent(), 1 ), {
      font: FONT,
      fill: 'black',
      tandem: options.tandem.createTandem( 'currentValueText' ),
      phetioReadOnly: true
    } );

    // To keep the correct spacing as the current value changes
    const currentValueBackground = Rectangle.bounds( currentValueText.bounds, {
      children: [ currentValueText ]
    } );

    const currentUnitText = new Text( currentUnitsString, {
      font: FONT,
      fill: PhetColorScheme.RED_COLORBLIND,
      tandem: options.tandem.createTandem( 'currentUnitText' ),
      phetioReadOnly: true
    } );

    const textContainer = new HBox( {
      spacing: 11.3, // empirically determined
      children: [ currentStringText, equalsSignText, currentValueBackground, currentUnitText ]
    } );

    // Scale the text if greater than max allowed width.
    if ( textContainer.width > MAX_READOUT_WIDTH ) {
      textContainer.scale( MAX_READOUT_WIDTH / textContainer.width );
    }

    // Present for the lifetime of the simulation, no need to unlink.
    Multilink.multilink( [ model.currentProperty,
      model.currentUnitsProperty ], ( current, units ) => {
      const rightEdgePosition = currentValueText.right;
      currentValueText.string = model.getFixedCurrent();
      currentValueText.right = rightEdgePosition;

      currentUnitText.string = units === CurrentUnit.AMPS ? currentAmpUnitsString : currentUnitsString;
    } );

    super( textContainer, options );
  }
}

ohmsLaw.register( 'ReadoutPanel', ReadoutPanel );
export default ReadoutPanel;
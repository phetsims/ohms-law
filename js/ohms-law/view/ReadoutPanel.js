// Copyright 2013-2020, University of Colorado Boulder

/**
 * Panel that displays the current inside the WireBox
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

import Property from '../../../../axon/js/Property.js';
import Utils from '../../../../dot/js/Utils.js';
import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ohmsLawStrings from '../../ohmsLawStrings.js';
import ohmsLaw from '../../ohmsLaw.js';
import CurrentUnit from '../model/CurrentUnit.js';
import OhmsLawModel from '../model/OhmsLawModel.js';
import OhmsLawConstants from '../OhmsLawConstants.js';

const currentAmpUnitsString = ohmsLawStrings.currentAmpUnits;
const currentString = ohmsLawStrings.current;
const currentUnitsString = ohmsLawStrings.currentUnits;

// constants
const FONT = new PhetFont( 32 );
const MAX_READOUT_WIDTH = 0.63 * OhmsLawConstants.WIRE_WIDTH;

/**
 * @param {OhmsLawModel} model
 * @param {Tandem} tandem
 * @param {Object} [options]
 * @constructor
 */
function ReadoutPanel( model, options ) {

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

  const equalsSign = new Text( '=', {
    font: FONT,
    fill: 'black',
    tandem: options.tandem.createTandem( 'equalsSign' ),
    phetioReadOnly: true
  } );

  const currentValue = new Text( Utils.toFixed( OhmsLawModel.getMaxCurrent(), 1 ), {
    font: FONT,
    fill: 'black',
    tandem: options.tandem.createTandem( 'currentValue' ),
    phetioReadOnly: true
  } );

  // To keep the correct spacing as the current value changes
  const currentValueBackground = new Rectangle.bounds( currentValue.bounds, {
    children: [ currentValue ]
  } );

  const currentUnit = new Text( currentUnitsString, {
    font: FONT,
    fill: PhetColorScheme.RED_COLORBLIND,
    tandem: options.tandem.createTandem( 'currentUnit' ),
    phetioReadOnly: true
  } );

  const textContainer = new HBox( {
    spacing: 11.3, // empirically determined
    children: [ currentStringText, equalsSign, currentValueBackground, currentUnit ]
  } );

  // Scale the text if greater than max allowed width.
  if ( textContainer.width > MAX_READOUT_WIDTH ) {
    textContainer.scale( MAX_READOUT_WIDTH / textContainer.width );
  }

  // Present for the lifetime of the simulation, no need to unlink.
  Property.multilink( [ model.currentProperty,
    model.currentUnitsProperty ], ( current, units ) => {
    const rightEdgePosition = currentValue.right;
    currentValue.text = model.getFixedCurrent();
    currentValue.right = rightEdgePosition;

    currentUnit.text = units === CurrentUnit.AMPS ? currentAmpUnitsString : currentUnitsString;
  } );

  // Create the panel to surround the hBox.
  Panel.call( this, textContainer, options );
}

ohmsLaw.register( 'ReadoutPanel', ReadoutPanel );

inherit( Panel, ReadoutPanel );
export default ReadoutPanel;
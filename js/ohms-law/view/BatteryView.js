// Copyright 2013-2023, University of Colorado Boulder

/**
 * View of Single Battery
 * The battery is laid out on its side, with the positive pole pointing to the right
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

import LinearFunction from '../../../../dot/js/LinearFunction.js';
import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { LinearGradient, Node, Rectangle, Text } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ohmsLaw from '../../ohmsLaw.js';
import OhmsLawStrings from '../../OhmsLawStrings.js';
import OhmsLawConstants from '../OhmsLawConstants.js';

const voltageUnitsString = OhmsLawStrings.voltageUnits;

// constants
const FONT = new PhetFont( { size: 19, weight: 'bold' } );
const BATTERY_HEIGHT = OhmsLawConstants.BATTERY_HEIGHT;
const NUB_HEIGHT = OhmsLawConstants.BATTERY_HEIGHT * 0.30;

// convert voltage to percentage (0 to 1)
const VOLTAGE_TO_SCALE = new LinearFunction( 0.1, OhmsLawConstants.AA_VOLTAGE, 0.0001, 1, true );
const VOLTAGE_STRING_MAX_WIDTH = new Text( Utils.toFixed( OhmsLawConstants.VOLTAGE_RANGE.max, 1 ), { font: FONT } ).width;

// Fills for the battery
const MAIN_BODY_FILL = new LinearGradient( 0, 0, 0, BATTERY_HEIGHT )
  .addColorStop( 0, '#777777' )
  .addColorStop( 0.3, '#bdbdbd' )
  .addColorStop( 1, '#2b2b2b' );
const COPPER_PORTION_FILL = new LinearGradient( 0, 0, 0, BATTERY_HEIGHT )
  .addColorStop( 0, '#cc4e00' )
  .addColorStop( 0.3, '#dddad6' )
  .addColorStop( 1, '#cc4e00' );
const NUB_FILL = '#dddddd';

class BatteryView extends Node {
  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

    super();

    // @private - Determine the width of the batter pieces.
    this.mainBodyWidth = OhmsLawConstants.BATTERY_WIDTH * 0.87; // empirically determined
    const nubWidth = OhmsLawConstants.BATTERY_WIDTH * 0.05; // empirically determined
    const copperPortionWidth = OhmsLawConstants.BATTERY_WIDTH - this.mainBodyWidth - nubWidth;

    // The origin (0,0) is defined as the leftmost and vertically centered position of the battery
    const batteryNode = new Node();

    // @private
    this.mainBody = new Rectangle( 0, 0, this.mainBodyWidth, BATTERY_HEIGHT, {
      stroke: '#000',
      fill: MAIN_BODY_FILL,
      y: -BATTERY_HEIGHT / 2
    } );
    batteryNode.addChild( this.mainBody );

    // @private
    this.copperPortion = new Rectangle( 0, 0, copperPortionWidth, BATTERY_HEIGHT, {
      stroke: '#000',
      fill: COPPER_PORTION_FILL,
      y: -BATTERY_HEIGHT / 2,
      x: this.mainBodyWidth
    } );
    batteryNode.addChild( this.copperPortion );

    // @private
    this.nub = new Rectangle( copperPortionWidth, 0, nubWidth, NUB_HEIGHT, {
      stroke: '#000',
      fill: NUB_FILL,
      y: -NUB_HEIGHT / 2,
      x: this.mainBodyWidth
    } );
    batteryNode.addChild( this.nub );

    this.addChild( batteryNode );

    // @private - Voltage label associated with the battery
    this.batteryText = new Node( { x: 3, tandem: options.tandem.createTandem( 'batteryText' ) } );

    // @private
    this.voltageValueText = new Text( OhmsLawConstants.AA_VOLTAGE, {
      font: FONT,
      tandem: options.tandem.createTandem( 'voltageValueText' ),
      phetioReadyOnly: true
    } );
    this.batteryText.addChild( this.voltageValueText );

    const voltageUnitsText = new Text( voltageUnitsString, {
      font: FONT,
      fill: 'blue',
      x: VOLTAGE_STRING_MAX_WIDTH * 1.1,
      maxWidth: ( this.mainBodyWidth - VOLTAGE_STRING_MAX_WIDTH ) * 0.9, // limit to 90% of remaining space
      tandem: options.tandem.createTandem( 'voltageUnitsText' )
    } );
    this.batteryText.addChild( voltageUnitsText );

    this.addChild( this.batteryText );
    this.mutate( options );
  }


  /**
   * Set the length of the battery as well as voltage text and position of the text associated with the battery
   * @param {number} voltage
   * @public
   */
  setVoltage( voltage ) {

    // update the voltage readout text
    this.voltageValueText.string = Utils.toFixed( voltage, 1 );

    // adjust length of the battery
    this.mainBody.setRect( 0, 0, this.mainBodyWidth * VOLTAGE_TO_SCALE.evaluate( voltage ), BATTERY_HEIGHT );
    this.copperPortion.x = this.mainBody.right;
    this.nub.x = this.mainBody.right;

    // set vertical position of the voltage label
    if ( voltage >= OhmsLawConstants.AA_VOLTAGE ) {
      this.batteryText.centerY = -7; // move slightly up from centered position, empirically determined
    }
    // move up if the voltage is greater than 0.1 but less than OhmsLawConstants.AA_VOLTAGE
    else if ( voltage >= 0.1 ) {
      this.batteryText.centerY = -BATTERY_HEIGHT / 2 - 12; // place it above the battery
    }
  }
}

ohmsLaw.register( 'BatteryView', BatteryView );

export default BatteryView;
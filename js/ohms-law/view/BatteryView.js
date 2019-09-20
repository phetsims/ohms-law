// Copyright 2013-2019, University of Colorado Boulder

/**
 * View of Single Battery
 * The battery is laid out on its side, with the positive pole pointing to the right
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const LinearFunction = require( 'DOT/LinearFunction' );
  const LinearGradient = require( 'SCENERY/util/LinearGradient' );
  const Node = require( 'SCENERY/nodes/Node' );
  const ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  const OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );

  // strings
  const voltageUnitsString = require( 'string!OHMS_LAW/voltageUnits' );

  // constants
  const FONT = new PhetFont( { size: 19, weight: 'bold' } );
  const BATTERY_HEIGHT = OhmsLawConstants.BATTERY_HEIGHT;
  const NUB_HEIGHT = OhmsLawConstants.BATTERY_HEIGHT * 0.30;

  // convert voltage to percentage (0 to 1)
  const VOLTAGE_TO_SCALE = new LinearFunction( 0.1, OhmsLawConstants.AA_VOLTAGE, 0.0001, 1, true );
  const VOLTAGE_STRING_MAX_WIDTH = new Text( Util.toFixed( OhmsLawConstants.VOLTAGE_RANGE.max, 1 ), { font: FONT } ).width;

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

  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function BatteryView( tandem, options ) {

    Node.call( this );

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
      y: -BATTERY_HEIGHT / 2,
      tandem: tandem.createTandem( 'mainBody' )
    } );
    batteryNode.addChild( this.mainBody );

    // @private
    this.copperPortion = new Rectangle( 0, 0, copperPortionWidth, BATTERY_HEIGHT, {
      stroke: '#000',
      fill: COPPER_PORTION_FILL,
      y: -BATTERY_HEIGHT / 2,
      x: this.mainBodyWidth,
      tandem: tandem.createTandem( 'copperPortion' )
    } );
    batteryNode.addChild( this.copperPortion );

    // @private
    this.nub = new Rectangle( copperPortionWidth, 0, nubWidth, NUB_HEIGHT, {
      stroke: '#000',
      fill: NUB_FILL,
      y: -NUB_HEIGHT / 2,
      x: this.mainBodyWidth,
      tandem: tandem.createTandem( 'nub' )
    } );
    batteryNode.addChild( this.nub );

    this.addChild( batteryNode );

    // @private - Voltage label associated with the battery
    this.batteryText = new Node( { x: 3, tandem: tandem.createTandem( 'batteryText' ) } );

    // @private
    this.voltageValueText = new Text( OhmsLawConstants.AA_VOLTAGE, {
      font: FONT,
      tandem: tandem.createTandem( 'voltageValueText' )
    } );
    this.batteryText.addChild( this.voltageValueText );

    const voltageUnitsText = new Text( voltageUnitsString, {
      font: FONT,
      fill: 'blue',
      x: VOLTAGE_STRING_MAX_WIDTH * 1.1,
      maxWidth: ( this.mainBodyWidth - VOLTAGE_STRING_MAX_WIDTH ) * 0.9, // limit to 90% of remaining space
      tandem: tandem.createTandem( 'voltageUnitsText' )
    } );
    this.batteryText.addChild( voltageUnitsText );

    this.addChild( this.batteryText );
    this.mutate( options );
  }

  ohmsLaw.register( 'BatteryView', BatteryView );

  return inherit( Node, BatteryView, {

    /**
     * Set the length of the battery as well as voltage text and position of the text associated with the battery
     * @param {number} voltage
     * @public
     */
    setVoltage: function( voltage ) {

      // update the voltage readout text
      this.voltageValueText.text = Util.toFixed( voltage, 1 );

      // adjust length of the battery
      this.mainBody.setRect( 0, 0, this.mainBodyWidth * VOLTAGE_TO_SCALE( voltage ), BATTERY_HEIGHT );
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
  } );
} );

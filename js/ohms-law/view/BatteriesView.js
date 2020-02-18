// Copyright 2013-2020, University of Colorado Boulder

/**
 * View of the battery pack at the top of the wire
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const BatteryView = require( 'OHMS_LAW/ohms-law/view/BatteryView' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  const OhmsLawA11yStrings = require( 'OHMS_LAW/ohms-law/OhmsLawA11yStrings' );
  const OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Utils = require( 'DOT/Utils' );

  // a11y strings
  const batteriesSupplyPatternString = OhmsLawA11yStrings.batteriesSupplyPattern.value;

  /**
   * @param {Property.<number>} voltageProperty
   * @param {Object} [options]
   * @constructor
   */
  function BatteriesView( voltageProperty, options ) {

    options = merge( {
      tandem: Tandem.REQUIRED,

      // a11y
      tagName: 'li' // this assumes that it is a child of a 'ul'
    }, options );

    Node.call( this );
    const self = this;

    // Store battery nodes in an array
    const batteries = [];

    const batteriesGroupTandem = options.tandem.createGroupTandem( 'battery' );

    // Create an array of batteries; enough to fill the entire wire.
    for ( let i = 0; i < OhmsLawConstants.MAX_NUMBER_OF_BATTERIES; i++ ) {
      const leftPosition = i * OhmsLawConstants.BATTERY_WIDTH;
      const battery = new BatteryView( { x: leftPosition, y: 0, tandem: batteriesGroupTandem.createNextTandem() } );

      // Add them as children to this node, and to the array for manipulation
      this.addChild( battery );
      batteries.push( battery );
    }

    // Present for the lifetime of the simulation; no need to unlink.
    voltageProperty.link( function( voltage ) {

      batteries.forEach( function( battery, index ) {

        // Determine associated with a particular battery
        let voltageBattery = Math.min( OhmsLawConstants.AA_VOLTAGE, voltage - index * OhmsLawConstants.AA_VOLTAGE );
        voltageBattery = Utils.roundToInterval( voltageBattery, Math.pow( 10, -OhmsLawConstants.VOLTAGE_SIG_FIGS ) );

        // Battery is only visible if it has a voltage.
        battery.visible = ( voltageBattery > 0 );

        if ( battery.visible ) {
          battery.setVoltage( voltageBattery );
        }
      } );

      // a11y - update the description for the number of batteries
      self.innerContent = StringUtils.fillIn( batteriesSupplyPatternString, {
        voltage: Utils.toFixed( voltage, OhmsLawConstants.VOLTAGE_SIG_FIGS )
      } );
    } );
    this.mutate( options );
  }

  ohmsLaw.register( 'BatteriesView', BatteriesView );

  return inherit( Node, BatteriesView );
} );
// Copyright 2013-2017, University of Colorado Boulder

/**
 * View of the battery pack at the top of the wire
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var BatteryView = require( 'OHMS_LAW/ohms-law/view/BatteryView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var OhmsLawA11yStrings = require( 'OHMS_LAW/ohms-law/OhmsLawA11yStrings' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Util = require( 'DOT/Util' );

  // a11y strings
  var lessThanOneBatteryString = OhmsLawA11yStrings.lessThanOneBatteryString;
  var exactlyBatteryString = OhmsLawA11yStrings.exactlyBatteryString;
  var exactlyBatteriesPatternString = OhmsLawA11yStrings.exactlyBatteriesPatternString;
  var betweenBatteriesPatternString = OhmsLawA11yStrings.betweenBatteriesPatternString;
  var batteriesVisiblePatternString = OhmsLawA11yStrings.batteriesVisiblePatternString;
  var showString = OhmsLawA11yStrings.showString;
  var showsString = OhmsLawA11yStrings.showsString;

  /**
   * @param {Property.<number>} voltageProperty
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function BatteriesView( voltageProperty, tandem, options ) {
    Node.call( this, {

      // a11y
      tagName: 'li'
    } );
    var self = this;

    // Store battery nodes in an array
    var batteries = [];

    var batteriesGroupTandem = tandem.createGroupTandem( 'battery' );

    // Create an array of batteries; enough to fill the entire wire.
    for ( var i = 0; i < OhmsLawConstants.MAX_NUMBER_OF_BATTERIES; i++ ) {
      var leftPosition = i * OhmsLawConstants.BATTERY_WIDTH;
      var battery = new BatteryView( batteriesGroupTandem.createNextTandem(), { x: leftPosition, y: 0 } );

      // Add them as children to this node, and to the array for manipulation
      this.addChild( battery );
      batteries.push( battery );
    }

    // Present for the lifetime of the simulation; no need to unlink.
    voltageProperty.link( function( voltage ) {

      batteries.forEach( function( battery, index ) {

        // Determine associated with a particular battery
        var voltageBattery = Math.min( OhmsLawConstants.AA_VOLTAGE, voltage - index * OhmsLawConstants.AA_VOLTAGE );

        // Battery is only visible if it has a voltage.
        battery.visible = ( voltageBattery > 0 );

        if ( battery.visible ) {
          battery.setVoltage( voltageBattery );
        }
      } );

      // update the description for the number of batteries
      self.accessibleLabelAsHTML = self.getBatteryDescription( voltage );
    } );

    options.tandem = tandem;
    this.mutate( options );
  }

  ohmsLaw.register( 'BatteriesView', BatteriesView );

  return inherit( Node, BatteriesView, {

    /**
     * From the voltage, get a description of the number of batteries visible in the circuit.
     * 
     * @param  {number} voltage
     * @return {string}
     */
    getBatteryDescription: function( voltage ) {
      var batteryVisibleDescription;
      var show;

      var numVisible = Math.floor( voltage / OhmsLawConstants.AA_VOLTAGE );
      var remainder = voltage % OhmsLawConstants.AA_VOLTAGE;

      if ( numVisible < 1 && remainder > 0 ) {

        // there are less than one batteries visilbe
        batteryVisibleDescription = lessThanOneBatteryString;
        show = showsString;
      }
      else if ( numVisible === 1 && remainder === 0 ) {

        // exactly one batteries
        batteryVisibleDescription = exactlyBatteryString;
        show = showsString;
      }
      else {

        // generate a custom description
        if ( remainder === 0 ) {
          batteryVisibleDescription = StringUtils.fillIn( exactlyBatteriesPatternString, {
            number: numVisible
          } );
        }
        else {
          batteryVisibleDescription =StringUtils.fillIn( betweenBatteriesPatternString, {
            min: numVisible,
            max: numVisible + 1
          } );
        }

        show = showString;
      }
      assert && assert( batteryVisibleDescription, 'no description generated for ' + numVisible + '+' + remainder + ' batteries' );

      var roundedVoltage = Util.toFixed( voltage, OhmsLawConstants.VOLTAGE_SIG_FIGS );

      return StringUtils.fillIn( batteriesVisiblePatternString, {
        visible: batteryVisibleDescription,
        voltage: roundedVoltage,
        show: show
      } );
    }
  } );
} );
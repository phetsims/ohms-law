// Copyright 2013-2020, University of Colorado Boulder

/**
 * View of the battery pack at the top of the wire
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

import Utils from '../../../../dot/js/Utils.js';
import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ohmsLaw from '../../ohmsLaw.js';
import OhmsLawA11yStrings from '../OhmsLawA11yStrings.js';
import OhmsLawConstants from '../OhmsLawConstants.js';
import BatteryView from './BatteryView.js';

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

inherit( Node, BatteriesView );
export default BatteriesView;
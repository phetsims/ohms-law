// Copyright 2024, University of Colorado Boulder

/**
 * Describes the state of the circuit components in the wire box.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import ohmsLaw from '../../ohmsLaw.js';
import OhmsLawConstants from '../OhmsLawConstants.js';

// enum for describing the relative sizes of letters
class SizeDescription extends EnumerationValue {
  static TINY = new SizeDescription();
  static VERY_SMALL = new SizeDescription();
  static SMALL = new SizeDescription();
  static MEDIUM_SIZE = new SizeDescription();
  static LARGE = new SizeDescription();
  static VERY_LARGE = new SizeDescription();
  static HUGE = new SizeDescription();
  static enumeration = new Enumeration( SizeDescription );
}

export default class WireBoxDescriber {
  constructor( model, arrowNode ) {
    this.arrowNode = arrowNode;

    // Set the model to a state where the arrows will be tiny, so that we can
    // keep that as a minimum height for future calculations.
    model.voltageProperty.set( OhmsLawConstants.VOLTAGE_RANGE.min );
    model.resistanceProperty.set( OhmsLawConstants.RESISTANCE_RANGE.max );

    // @private - this is the min height of the arrows for this sim
    this.minArrowHeight = arrowNode.height;

    // reset the model after using to get height of arrows
    model.reset();

    this.arrowSizeDescriptionProperty = new DerivedProperty( [ model.voltageProperty, model.resistanceProperty ],
      ( voltage, resistance ) => this.getArrowSizeDescription()
    );
  }


  /**
   * Get a SizeDescription for the arrow.
   * @public
   *
   * @returns {string}
   */
  getArrowSizeDescription() {

    const height = this.arrowNode.height;

    // Empirically determined, the idea is for the largest relative size string to map to when the 'I' in the formula
    // goes off the screen (or at least close to that), see https://github.com/phetsims/ohms-law/issues/97.
    const maxArrowHeightThresholdCoefficient = 2;

    // The max in the linear function, instead of the max height of the arrow, everything bigger will just be the
    // largest relative size.
    const maxArrowHeightThreshold = OhmsLawConstants.WIRE_HEIGHT * maxArrowHeightThresholdCoefficient;

    const values = SizeDescription.enumeration.values;

    // map the normalized height to one of the size descriptions
    let index = Utils.roundSymmetric( Utils.linear(
      this.minArrowHeight, maxArrowHeightThreshold, // a1 b1
      0, values.length - 1, // a2 b2
      height ) ); // a3

    // if beyond the threshold, clamp it back to the highest index
    if ( height > maxArrowHeightThreshold ) {
      index = values.length - 1;
    }
    assert && assert(
    index >= 0 && index < values.length,
      'mapping to relative size string incorrect'
    );

    return values[ index ];
  }
}

ohmsLaw.register( 'WireBoxDescriber', WireBoxDescriber );
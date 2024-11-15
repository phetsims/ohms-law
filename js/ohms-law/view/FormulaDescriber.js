// Copyright 2024, University of Colorado Boulder

/**
 * Describes the relationships between the letters in the Ohm's Law formula.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Range from '../../../../dot/js/Range.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import ohmsLaw from '../../ohmsLaw.js';

// enum for describing the relative sizes of letters
class SizeComparison extends EnumerationValue {
  static MUCH_MUCH_SMALLER = new SizeComparison();
  static MUCH_SMALLER = new SizeComparison();
  static SLIGHTLY_SMALLER = new SizeComparison();
  static COMPARABLE = new SizeComparison();
  static SLIGHTLY_LARGER = new SizeComparison();
  static MUCH_LARGER = new SizeComparison();
  static MUCH_MUCH_LARGER = new SizeComparison();
  static enumeration = new Enumeration( SizeComparison );
}

// Map for relative size of variables to their accessible description - ranges values are the
// ratio of sizes for instance, a value 0.25 means that the letter is 1/4 the size of the other.
const COMPARATIVE_DESCRIPTION_RANGES = new Map( [
  [ new Range( 0, 0.25 ), SizeComparison.MUCH_MUCH_SMALLER ],
  [ new Range( 0.25, 0.50 ), SizeComparison.MUCH_SMALLER ],
  [ new Range( 0.50, 0.9 ), SizeComparison.SLIGHTLY_SMALLER ],
  [ new Range( 0.9, 1.10 ), SizeComparison.COMPARABLE ],
  [ new Range( 1.10, 2.0 ), SizeComparison.SLIGHTLY_LARGER ],
  [ new Range( 2.0, 4.0 ), SizeComparison.MUCH_LARGER ],
  [ new Range( 4.0, Number.MAX_VALUE ), SizeComparison.MUCH_MUCH_LARGER ]
] );

const COMPARATIVE_RANGES = Array.from( COMPARATIVE_DESCRIPTION_RANGES.keys() );

export default class FormulaDescriber {
  constructor( model, resistanceLetterNode, currentLetterNode, voltageLetterNode ) {
    this.resistanceLetterNode = resistanceLetterNode;
    this.currentLetterNode = currentLetterNode;
    this.voltageLetterNode = voltageLetterNode;

    // The SizeComparison between the ltter V and I
    this.vToIComparisonProperty = new DerivedProperty( [ model.voltageProperty, model.currentProperty ], ( voltage, current ) => {
      return this.compareNodeHeight( this.voltageLetterNode, this.currentLetterNode );
    } );

    // The SizeComparison between the ltter V and R
    this.vToRComparisonProperty = new DerivedProperty( [ model.voltageProperty, model.resistanceProperty ], ( voltage, resistance ) => {
      return this.compareNodeHeight( this.voltageLetterNode, this.resistanceLetterNode );
    } );
  }

  /**
   * Returns a SizeComparison between the height of two Nodes. The returned value compares "nodeA" to "nodeB", such that
   * a value of MUCH_SMALLER means that "nodeA" is much smaller than "nodeB".
   * @private
   */
  compareNodeHeight( nodeA, nodeB ) {
    const aHeight = nodeA.height;
    const bHeight = nodeB.height;

    const aToB = aHeight / bHeight;

    for ( let i = 0; i < COMPARATIVE_RANGES.length; i++ ) {
      const range = COMPARATIVE_RANGES[ i ];
      if ( range.contains( aToB ) ) {
        return COMPARATIVE_DESCRIPTION_RANGES.get( range );
      }
    }

    // Arbitrary default for consistent return.
    return SizeComparison.MUCH_MUCH_SMALLER;
  }
}

ohmsLaw.register( 'FormulaDescriber', FormulaDescriber );
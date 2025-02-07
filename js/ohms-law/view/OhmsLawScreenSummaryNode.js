// Copyright 2017-2025, University of Colorado Boulder

/**
 * The scene accessible summary content for Ohms Law.  This manages the strings available
 * to a screen reader, and generates the parallel DOM structure.
 *
 * @author Jesse Greenberg
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PatternMessageProperty from '../../../../chipper/js/browser/PatternMessageProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import ohmsLaw from '../../ohmsLaw.js';
import OhmsLawMessages from '../../strings/OhmsLawMessages.js';
import OhmsLawConstants from '../OhmsLawConstants.js';

class OhmsLawScreenSummaryNode extends ScreenSummaryContent {

  /**
   * @param {OhmsLawModel} model
   * @param {OhmsLawDescriber} ohmsLawDescriber
   */
  constructor( model, ohmsLawDescriber ) {
    super( {
      additionalContent: [
        OhmsLawMessages.summaryPlayAreaMessageProperty,
        OhmsLawMessages.summaryControlAreaMessageProperty,
        OhmsLawMessages.rightNowMessageProperty
      ]
    } );

    // list outlining the values for this sim
    const valueListNode = new Node( { tagName: 'ul' } );
    const valueVoltageItemNode = new Node( { tagName: 'li' } );
    const valueResistanceItemNode = new Node( { tagName: 'li' } );
    const valueCurrentItemNode = new Node( { tagName: 'li' } );
    valueListNode.children = [ valueVoltageItemNode, valueResistanceItemNode, valueCurrentItemNode ];

    const sliderParagraphNode = new Node( { tagName: 'p', innerContent: OhmsLawMessages.summaryLookForSlidersMessageProperty } );

    // add all children to this node, ordering the accessible content
    this.addChild( valueListNode );
    this.addChild( sliderParagraphNode );

    // add all values to a list so we can easily iterate and add listeners to update descriptions
    // with each property
    [
      {
        property: model.voltageProperty,

        patternStringProperty: OhmsLawMessages.voltageSummaryPatternMessageProperty,
        node: valueVoltageItemNode,
        precision: OhmsLawConstants.VOLTAGE_SIG_FIGS
      },
      {
        property: model.resistanceProperty,
        patternStringProperty: OhmsLawMessages.resistanceSummaryPatternMessageProperty,
        node: valueResistanceItemNode,
        precision: OhmsLawConstants.RESISTANCE_SIG_FIGS
      }
    ].forEach( item => {
      item.node.innerContent = new PatternMessageProperty(
        item.patternStringProperty, {
          value: new DerivedProperty( [ item.property ], value => Utils.toFixed( value, item.precision ) )
        }
      );
    } );

    valueCurrentItemNode.innerContent = new PatternMessageProperty(
      OhmsLawMessages.currentSummaryPatternMessageProperty, {
        value: new DerivedProperty( [ model.currentProperty ], value => model.getFixedCurrent() ),
        unit: model.currentUnitsProperty
      }
    );
  }
}

ohmsLaw.register( 'OhmsLawScreenSummaryNode', OhmsLawScreenSummaryNode );
export default OhmsLawScreenSummaryNode;
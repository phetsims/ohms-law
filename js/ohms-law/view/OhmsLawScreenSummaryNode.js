// Copyright 2017-2023, University of Colorado Boulder

/**
 * The scene accessible summary content for Ohms Law.  This manages the strings available
 * to a screen reader, and generates the parallel DOM structure.
 *
 * @author Jesse Greenberg
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Utils from '../../../../dot/js/Utils.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import { Node } from '../../../../scenery/js/imports.js';
import ohmsLaw from '../../ohmsLaw.js';
import OhmsLawA11yStrings from '../OhmsLawA11yStrings.js';
import OhmsLawConstants from '../OhmsLawConstants.js';

const summaryLookForSlidersString = OhmsLawA11yStrings.summaryLookForSliders.value;
const summaryPlayAreaString = OhmsLawA11yStrings.summaryPlayArea.value;
const summaryControlAreaString = OhmsLawA11yStrings.summaryControlArea.value;
const rightNowString = OhmsLawA11yStrings.rightNow.value;
const voltageSummaryPatternString = OhmsLawA11yStrings.voltageSummaryPattern.value;
const resistanceSummaryPatternString = OhmsLawA11yStrings.resistanceSummaryPattern.value;
const currentSummaryPatternString = OhmsLawA11yStrings.currentSummaryPattern.value;

class OhmsLawScreenSummaryNode extends Node {

  /**
   * @param {OhmsLawModel} model
   * @param {OhmsLawDescriber} ohmsLawDescriber
   */
  constructor( model, ohmsLawDescriber ) {
    super();

    const playAreaSummaryNode = new Node( {
      tagName: 'p',
      innerContent: summaryPlayAreaString
    } );
    const controlAreaSummaryNode = new Node( {
      tagName: 'p',
      innerContent: summaryControlAreaString
    } );

    const rightNowParagraphNode = new Node( { tagName: 'p', innerContent: rightNowString } );

    // list outlining the values for this sim
    const valueListNode = new Node( { tagName: 'ul' } );
    const valueVoltageItemNode = new Node( { tagName: 'li' } );
    const valueResistanceItemNode = new Node( { tagName: 'li' } );
    const valueCurrentItemNode = new Node( { tagName: 'li' } );
    valueListNode.children = [ valueVoltageItemNode, valueResistanceItemNode, valueCurrentItemNode ];

    const sliderParagraphNode = new Node( { tagName: 'p', innerContent: summaryLookForSlidersString } );

    // add all children to this node, ordering the accessible content
    this.addChild( playAreaSummaryNode );
    this.addChild( controlAreaSummaryNode );
    this.addChild( rightNowParagraphNode );
    this.addChild( valueListNode );
    this.addChild( sliderParagraphNode );

    // add all values to a list so we can easily iterate and add listeners to update descriptions
    // with each property
    [
      {
        property: model.voltageProperty,
        patternString: voltageSummaryPatternString,
        node: valueVoltageItemNode,
        precision: OhmsLawConstants.VOLTAGE_SIG_FIGS
      },
      {
        property: model.resistanceProperty,
        patternString: resistanceSummaryPatternString,
        node: valueResistanceItemNode,
        precision: OhmsLawConstants.RESISTANCE_SIG_FIGS
      }
    ].forEach( item => {

      // register listeners that update the labels in the screen summary - this summary exists for life of sim,
      // no need to dispose
      item.property.link( value => {
        item.node.innerContent = StringUtils.fillIn( item.patternString, {
          value: Utils.toFixed( value, item.precision ),
          unit: ohmsLawDescriber.getUnitForCurrent()
        } );
      } );
    } );

    Multilink.multilink( [ model.currentProperty, model.currentUnitsProperty ], ( current, units ) => {
      valueCurrentItemNode.innerContent = StringUtils.fillIn( currentSummaryPatternString, {
        value: model.getFixedCurrent(),
        unit: ohmsLawDescriber.getUnitForCurrent()
      } );
    } );
  }
}

ohmsLaw.register( 'OhmsLawScreenSummaryNode', OhmsLawScreenSummaryNode );
export default OhmsLawScreenSummaryNode;
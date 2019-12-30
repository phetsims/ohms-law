// Copyright 2017-2019, University of Colorado Boulder

/**
 * The scene accessible summary content for Ohms Law.  This manages the strings available
 * to a screen reader, and generates the parallel DOM structure.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  const OhmsLawA11yStrings = require( 'OHMS_LAW/ohms-law/OhmsLawA11yStrings' );
  const OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Utils = require( 'DOT/Utils' );

  // a11y strings
  const summaryLookForSlidersString = OhmsLawA11yStrings.summaryLookForSliders.value;
  const summarySimString = OhmsLawA11yStrings.summarySim.value;
  const rightNowString = OhmsLawA11yStrings.rightNow.value;
  const voltageSummaryPatternString = OhmsLawA11yStrings.voltageSummaryPattern.value;
  const resistanceSummaryPatternString = OhmsLawA11yStrings.resistanceSummaryPattern.value;
  const currentSummaryPatternString = OhmsLawA11yStrings.currentSummaryPattern.value;

  function OhmsLawScreenSummaryNode( model ) {
    Node.call( this );

    const summaryNode = new Node( {
      tagName: 'p',
      innerContent: summarySimString
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
    this.addChild( summaryNode );
    this.addChild( rightNowParagraphNode );
    this.addChild( valueListNode );
    this.addChild( sliderParagraphNode );

    // add all values to a list so we can easily iterate and add listeners to update descriptions
    // with each property
    const valueItemList = [
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
      },
      {
        property: model.currentProperty,
        patternString: currentSummaryPatternString,
        node: valueCurrentItemNode,
        precision: OhmsLawConstants.CURRENT_SIG_FIGS
      }
    ];

    // register listeners that update the labels in the screen summary - this summary exists for life of sim,
    // no need to dispose
    valueItemList.forEach( function( item ) {
      item.property.link( function( value ) {
        item.node.innerContent = StringUtils.fillIn( item.patternString, {
          value: Utils.toFixed( value, item.precision )
        } );
      } );
    } );
  }

  ohmsLaw.register( 'OhmsLawScreenSummaryNode', OhmsLawScreenSummaryNode );

  return inherit( Node, OhmsLawScreenSummaryNode );
} );

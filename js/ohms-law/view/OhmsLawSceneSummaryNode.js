// Copyright 2017, University of Colorado Boulder

/**
 * The scene accessible summary content for Ohms Law.  This manages the strings available
 * to a screen reader, and generates the parallel DOM structure.
 * 
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var AccessibleSectionNode = require( 'SCENERY_PHET/accessibility/AccessibleSectionNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var JoistA11yStrings = require( 'JOIST/JoistA11yStrings' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var OhmsLawA11yStrings = require( 'OHMS_LAW/ohms-law/OhmsLawA11yStrings' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Util = require( 'DOT/Util' );

  // strings
  var summaryLookForSlidersString = OhmsLawA11yStrings.summaryLookForSlidersString;
  var summaryShortcutHintsString = OhmsLawA11yStrings.summaryShortcutHintsString;
  var sceneSummaryString = JoistA11yStrings.sceneSummaryString;
  var summarySimString = OhmsLawA11yStrings.summarySimString;
  var rightNowString = OhmsLawA11yStrings.rightNowString;
  var summaryVoltagePatternString = OhmsLawA11yStrings.summaryVoltagePatternString;
  var resistanceSummaryPatternString = OhmsLawA11yStrings.resistanceSummaryPatternString;
  var currentSummaryPatternString = OhmsLawA11yStrings.currentSummaryPatternString;

  function OhmsLawSceneSummaryNode( model ) {

    AccessibleSectionNode.call( this, sceneSummaryString );

    // h2 and main summary for this sim
    var summaryNode = new Node( {
      tagName: 'p',
      accessibleLabel: summarySimString
    } );

    var rightNowParagraphNode = new Node( { tagName: 'p', accessibleLabel: rightNowString } );

    // list outlining the values for this sim
    var valueListNode = new Node( { tagName: 'ul' } );
    var valueVoltageItemNode = new Node( { tagName: 'li' } );
    var valueResistanceItemNode = new Node( { tagName: 'li' } );
    var valueCurrentItemNode = new Node( { tagName: 'li' } );
    valueListNode.children = [ valueVoltageItemNode, valueResistanceItemNode, valueCurrentItemNode ];

    // TODO: add a link to the keyboard help button in the shortcut paragraph
    var sliderParagraphNode = new Node( { tagName: 'p', accessibleLabel: summaryLookForSlidersString } );
    var shortcutParagraphNode = new Node( { tagName: 'p', accessibleLabel: summaryShortcutHintsString } );

    // add all children to this node, ordering the accessible content
    this.addChild( summaryNode );
    this.addChild( rightNowParagraphNode );
    this.addChild( valueListNode );
    this.addChild( sliderParagraphNode );
    this.addChild( shortcutParagraphNode );

    // add all values to a list so we can easily iterate and add listeners to update descriptions
    // with each property
    var valueItemList = [
      {
        property: model.voltageProperty,
        patternString: summaryVoltagePatternString,
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

    // register listeners that update the labels in the scene summary - this summary exists for life of sim,
    // no need to dispose
    valueItemList.forEach( function( item ) {
      item.property.link( function( value ) {
        item.node.accessibleLabelAsHTML = StringUtils.fillIn( item.patternString, {
          value: Util.toFixed( value, item.precision )
        } );
      } );
    } );
  }

  ohmsLaw.register( 'OhmsLawSceneSummaryNode', OhmsLawSceneSummaryNode );

  return inherit( AccessibleSectionNode, OhmsLawSceneSummaryNode );
} );

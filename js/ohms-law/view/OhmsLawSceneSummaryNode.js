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
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var inherit = require( 'PHET_CORE/inherit' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Node = require( 'SCENERY/nodes/Node' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var OhmsLawA11yStrings = require( 'OHMS_LAW/ohms-law/OhmsLawA11yStrings' );
  var Util = require( 'DOT/Util' );
  var JoistA11yStrings = require( 'JOIST/JoistA11yStrings' );
  var AccessibleSectionNode = require( 'SCENERY_PHET/accessibility/AccessibleSectionNode' );

  // constants
  
  // strings
  var summaryCurrentPatternString = OhmsLawA11yStrings.summaryCurrentPatternString;
  var summaryLookForSlidersString = OhmsLawA11yStrings.summaryLookForSlidersString;
  var summaryShortcutHintsString = OhmsLawA11yStrings.summaryShortcutHintsString;
  var sceneSummaryString = JoistA11yStrings.sceneSummaryString;

  function OhmsLawSceneSummaryNode( model, formulaNode, wireBox ) {

    AccessibleSectionNode.call( this, sceneSummaryString );

    // h2 and main summary for this sim
    var summaryNode = new Node( {
      tagName: 'p',
      accessibleLabel: 'In this sim, the Play Area contains the Ohm\'s Law equation, V equals I times R, a physical circuit, and sliders to play with voltage and resistance. The circuit connects a resistor to a series of batteries. Batteries show amount of voltage. Dots in the resistor represent the level of resistance in the resistor. In the Control Panel, buttons mute sound or reset sim.'
    } );

    // heading marking the current state of this sim
    var stateOfSimHeadingNode = new Node( { tagName: 'h3', accessibleLabel: 'State of Sim' } );
    var rightNowParagraphNode = new Node( { tagName: 'p', accessibleLabel: 'Right now,' } );

    // list outlining the values for this sim
    var valueListNode = new Node( { tagName: 'ul' } );
    var valueVoltageItemNode = new Node( { tagName: 'li' } );
    var valueResistanceItemNode = new Node( { tagName: 'li' } );
    var valueCurrentItemNode = new Node( { tagName: 'li' } );
    valueListNode.children = [ valueVoltageItemNode, valueResistanceItemNode, valueCurrentItemNode ];

    var withValuesParagraphNode = new Node( { tagName: 'p', accessibleLabel: 'With these values,' } );

    var sizeListNode = new Node( { tagName: 'ul' } );
    var comparativeSizeItemNode = new Node( { tagName: 'li' } );
    var currentSizeItemNode = new Node( { tagName: 'li' } );
    sizeListNode.addChild( comparativeSizeItemNode );
    sizeListNode.addChild( currentSizeItemNode );

    // TODO: add a link to the keyboard help button in the shortcut paragraph
    var sliderParagraphNode = new Node( { tagName: 'p', accessibleLabel: summaryLookForSlidersString } );
    var shortcutParagraphNode = new Node( { tagName: 'p', accessibleLabel: summaryShortcutHintsString } );

    // add all children to this node, ordering the accessible content
    this.addChild( summaryNode );
    this.addChild( stateOfSimHeadingNode );
    this.addChild( rightNowParagraphNode );
    this.addChild( valueListNode );
    this.addChild( withValuesParagraphNode );
    this.addChild( sizeListNode );
    this.addChild( sliderParagraphNode );
    this.addChild( shortcutParagraphNode );

    // add all values to a list so we can easily iterate and add listeners to update descriptions
    // with each property
    var valueItemList = [
      {
        property: model.voltageProperty,
        patternString: 'Voltage, <strong>V</strong> is <em>{{value}} volts</em>',
        node: valueVoltageItemNode,
        precision: OhmsLawConstants.VOLTAGE_SIG_FIGS
      },
      {
        property: model.resistanceProperty,
        patternString: 'Resistance, <strong>R</strong> is <em>{{value}} ohms</em>',
        node: valueResistanceItemNode,
        precision: OhmsLawConstants.RESISTANCE_SIG_FIGS
      },
      {
        property: model.currentProperty,
        patternString: 'Current, <strong>I</strong> is <em>{{value}} milliamps</em>',
        node: valueCurrentItemNode,
        precision: OhmsLawConstants.CURRENT_SIG_FIGS
      }
    ];

    // whenever any of the model values change, update the description items that descripe
    // the relative size of letters in the equation
    var updateComparativeSizeDescriptions = function() {
      comparativeSizeItemNode.accessibleLabelAsHTML = formulaNode.getComparativeSizeDescription();

      // generate the scene summary description for the arrow sizes
      currentSizeItemNode.accessibleLabelAsHTML = StringUtils.fillIn( summaryCurrentPatternString, {
        size: wireBox.getArrowSizeDescription()
      } );
    };

    // register listeners that update the labels in the scene summary - this summary exists for life of sim,
    // no need to dispose
    valueItemList.forEach( function( item ) {
      item.property.link( function( value ) {
        item.node.accessibleLabelAsHTML = StringUtils.fillIn( item.patternString, {
          value: Util.toFixed( value, item.precision )
        } );

        // if any of the Properties change, update relative size description and current item descriptions
        updateComparativeSizeDescriptions();
      } );
    } );
  }

  ohmsLaw.register( 'OhmsLawSceneSummaryNode', OhmsLawSceneSummaryNode );

  return inherit( AccessibleSectionNode, OhmsLawSceneSummaryNode );
} );

// Copyright 2016-2017, University of Colorado Boulder

/**
 * View circuit with a resistor, a battery pack, two current arrows and a current readout panel
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var OhmsLawA11yStrings = require( 'OHMS_LAW/ohms-law/OhmsLawA11yStrings' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ReadoutPanel = require( 'OHMS_LAW/ohms-law/view/ReadoutPanel' );
  var BatteriesView = require( 'OHMS_LAW/ohms-law/view/BatteriesView' );
  var ResistorNode = require( 'OHMS_LAW/ohms-law/view/ResistorNode' );
  var RightAngleArrow = require( 'OHMS_LAW/ohms-law/view/RightAngleArrow' );
  var Range = require( 'DOT/Range' );
  var Util = require( 'DOT/Util' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );

  // a11y strings
  var circuitLabelString = OhmsLawA11yStrings.circuitLabelString;
  var circuitDescriptionString = OhmsLawA11yStrings.circuitDescriptionString;
  var currentDescriptionPatternString = OhmsLawA11yStrings.currentDescriptionPatternString;

  // constants
  var WIDTH = OhmsLawConstants.WIRE_WIDTH;
  var HEIGHT = OhmsLawConstants.WIRE_HEIGHT;
  var WIRE_THICKNESS = 10;
  var OFFSET = 10;  // position offset for the RightAngleArrow

  /**
   * @param {OhmsLawModel} model
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function WireBox( model, tandem, options ) {

    Node.call( this, {

      // a11y
      tagName: 'ul',
      labelTagName: 'h3',
      accessibleLabel: circuitLabelString,
      accessibleDescription: circuitDescriptionString,
      prependLabels: true
    } );
    var self = this;

    // For positioning, the top left corner of the wireFrame is defined as 0,0
    var wireFrame = new Rectangle( 0, 0, WIDTH, HEIGHT, 4, 4, {
      stroke: '#000',
      lineWidth: WIRE_THICKNESS,
      tandem: tandem.createTandem( 'wireFrame' )
    } );
    this.addChild( wireFrame );

    var batteriesView = new BatteriesView( model.voltageProperty, tandem.createTandem( 'batteriesView' ), {
      left: OhmsLawConstants.BATTERIES_OFFSET, // Slightly to the right of the wire
      centerY: 0
    } );
    this.addChild( batteriesView );

    var resistorNode = new ResistorNode( model.resistanceProperty, tandem.createTandem( 'resistorNode' ), {
      centerX: WIDTH / 2,
      centerY: HEIGHT,

      // a11y
      tagName: 'li'
    } );
    this.addChild( resistorNode );

    this.bottomLeftArrow = new RightAngleArrow( model.currentProperty, tandem.createTandem( 'bottomLeftArrow' ), {
      x: -OFFSET,
      y: HEIGHT + OFFSET,
      rotation: Math.PI / 2
    } );
    this.addChild( this.bottomLeftArrow );

    this.bottomRightArrow = new RightAngleArrow( model.currentProperty, tandem.createTandem( 'bottomRightArrow' ), {
      x: WIDTH + OFFSET,
      y: HEIGHT + OFFSET,
      rotation: 0
    } );
    this.addChild( this.bottomRightArrow );

    // a11y - accessible description for the current
    var accessibleCurrentNode = new Node( { tagName: 'li' } );
    this.addChild( accessibleCurrentNode );

    var currentReadoutPanel = new ReadoutPanel( model, tandem.createTandem( 'currentReadoutPanel' ), {
      centerY: HEIGHT / 2,
      centerX: WIDTH / 2
    } );
    this.addChild( currentReadoutPanel );

    // a11y - create a map that goes from arrow size to size description by scaling by setting model to extrema
    model.voltageProperty.set( OhmsLawConstants.VOLTAGE_RANGE.max );
    model.resistanceProperty.set( OhmsLawConstants.RESISTANCE_RANGE.min );
    var arrowHeightMax = this.bottomLeftArrow.height;

    model.voltageProperty.set( OhmsLawConstants.VOLTAGE_RANGE.min );
    model.resistanceProperty.set( OhmsLawConstants.RESISTANCE_RANGE.max );
    var arrowHeightMin = this.bottomLeftArrow.height;

    // @private - this is the range of heights for this sim (thought we would likely want to do a comprehensive
    this.arrowHeightRange = new Range( arrowHeightMin, arrowHeightMax );

    // reset the model after using to get heights of arrows
    model.reset();

    // a11y - when the current changes, update the accessible description
    model.currentProperty.link( function( current ) {
      var formattedCurrent = Util.toFixed( current, OhmsLawConstants.CURRENT_SIG_FIGS );

      accessibleCurrentNode.accessibleLabelAsHTML = StringUtils.fillIn( currentDescriptionPatternString ,{
        arrowSize: self.getArrowSizeDescription(),
        value: formattedCurrent
      } );
    } );

    // a11y - the order of descriptions should be current, batteries, then resistance
    this.accessibleOrder = [ accessibleCurrentNode, batteriesView, resistorNode ];

    options.tandem = tandem;
    this.mutate( options );
  }

  ohmsLaw.register( 'WireBox', WireBox );

  return inherit( Node, WireBox, {

    /**
     * Get a description of the arrow size.  Returns omething like "small" or "huge" or "medium size".
     * @public
     * 
     * @return {string}
     */
    getArrowSizeDescription: function() {

      var range = this.arrowHeightRange;
      var height = this.bottomLeftArrow.height;

      // map the normalized height to one of the size descriptions
      var index = Util.roundSymmetric( Util.linear( range.min, range.max, 0, OhmsLawConstants.RELATIVE_SIZE_STRINGS.length - 1, height ) );

      assert && assert( index >= 0, 'mapping to relative size string incorrect' );
      return OhmsLawConstants.RELATIVE_SIZE_STRINGS[ index ]; 
    }
  } );
} );
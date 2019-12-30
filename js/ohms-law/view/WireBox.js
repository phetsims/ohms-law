// Copyright 2013-2019, University of Colorado Boulder

/**
 * View circuit with a resistor, a battery pack, two current arrows and a current readout panel
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const BatteriesView = require( 'OHMS_LAW/ohms-law/view/BatteriesView' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  const OhmsLawA11yStrings = require( 'OHMS_LAW/ohms-law/OhmsLawA11yStrings' );
  const OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  const ReadoutPanel = require( 'OHMS_LAW/ohms-law/view/ReadoutPanel' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const ResistorNode = require( 'OHMS_LAW/ohms-law/view/ResistorNode' );
  const RightAngleArrow = require( 'OHMS_LAW/ohms-law/view/RightAngleArrow' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Utils = require( 'DOT/Utils' );

  // a11y strings
  const circuitLabelString = OhmsLawA11yStrings.circuitLabel.value;
  const circuitDescriptionString = OhmsLawA11yStrings.circuitDescription.value;
  const currentDescriptionPatternString = OhmsLawA11yStrings.currentDescriptionPattern.value;

  // constants
  const WIDTH = OhmsLawConstants.WIRE_WIDTH;
  const HEIGHT = OhmsLawConstants.WIRE_HEIGHT;
  const WIRE_THICKNESS = 10;
  const OFFSET = 10;  // position offset for the RightAngleArrow

  /**
   * @param {OhmsLawModel} model
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function WireBox( model, tandem, options ) {

    options = merge( {

      // phet-io
      tandem: tandem,

      // a11y
      tagName: 'ul',
      labelTagName: 'h3',
      labelContent: circuitLabelString,
      descriptionContent: circuitDescriptionString
    }, options );

    Node.call( this, options );
    const self = this;

    // For positioning, the top left corner of the wireFrame is defined as 0,0
    const wireFrame = new Rectangle( 0, 0, WIDTH, HEIGHT, 4, 4, {
      stroke: '#000',
      lineWidth: WIRE_THICKNESS,
      tandem: tandem.createTandem( 'wireFrame' )
    } );
    this.addChild( wireFrame );

    const batteriesView = new BatteriesView( model.voltageProperty, tandem.createTandem( 'batteriesView' ), {
      left: OhmsLawConstants.BATTERIES_OFFSET, // Slightly to the right of the wire
      centerY: 0
    } );
    this.addChild( batteriesView );

    const resistorNode = new ResistorNode( model.resistanceProperty, tandem.createTandem( 'resistorNode' ), {
      centerX: WIDTH / 2,
      centerY: HEIGHT
    } );
    this.addChild( resistorNode );

    // @private
    this.bottomLeftArrow = new RightAngleArrow( model.currentProperty, tandem.createTandem( 'bottomLeftArrow' ), {
      x: -OFFSET,
      y: HEIGHT + OFFSET,
      rotation: Math.PI / 2
    } );
    this.addChild( this.bottomLeftArrow );

    const bottomRightArrow = new RightAngleArrow( model.currentProperty, tandem.createTandem( 'bottomRightArrow' ), {
      x: WIDTH + OFFSET,
      y: HEIGHT + OFFSET,
      rotation: 0
    } );
    this.addChild( bottomRightArrow );

    // a11y - accessible description for the current
    assert && assert( this.tagName.toUpperCase() === 'UL', 'li children assume list parent' );
    const accessibleCurrentNode = new Node( { tagName: 'li' } );
    this.addChild( accessibleCurrentNode );

    const currentReadoutPanel = new ReadoutPanel( model, tandem.createTandem( 'currentReadoutPanel' ), {
      centerY: HEIGHT / 2,
      centerX: WIDTH / 2
    } );
    this.addChild( currentReadoutPanel );

    model.voltageProperty.set( OhmsLawConstants.VOLTAGE_RANGE.min );
    model.resistanceProperty.set( OhmsLawConstants.RESISTANCE_RANGE.max );

    // @private - this is the min height of the arrows for this sim
    this.minArrowHeight = this.bottomLeftArrow.height;

    // reset the model after using to get height of arrows
    model.reset();

    // a11y - when the current changes, update the accessible description
    model.currentProperty.link( function( current ) {
      const formattedCurrent = Utils.toFixed( current, OhmsLawConstants.CURRENT_SIG_FIGS );

      accessibleCurrentNode.innerContent = StringUtils.fillIn( currentDescriptionPatternString, {
        arrowSize: self.getArrowSizeDescription(),
        value: formattedCurrent
      } );
    } );

    // a11y - the order of descriptions should be batteries, resistance, then current
    this.accessibleOrder = [ batteriesView, resistorNode, accessibleCurrentNode ];
  }

  ohmsLaw.register( 'WireBox', WireBox );

  return inherit( Node, WireBox, {

    /**
     * Get a description of the arrow size.  Returns omething like "small" or "huge" or "medium size".
     * @public
     *
     * @returns {string}
     */
    getArrowSizeDescription: function() {

      const height = this.bottomLeftArrow.height;

      // Empirically determined, the idea is for the largest relative size string to map to when the 'I' in the formula
      // goes off the screen (or at least close to that), see https://github.com/phetsims/ohms-law/issues/97.
      const maxArrowHeightThresholdCoefficient = 2;

      // The max in the linear function, instead of the max height of the arrow, everything bigger will just be the
      // largest relative size.
      const maxArrowHeightThreshold = HEIGHT * maxArrowHeightThresholdCoefficient;

      // map the normalized height to one of the size descriptions
      let index = Utils.roundSymmetric( Utils.linear(
        this.minArrowHeight, maxArrowHeightThreshold, // a1 b1
        0, OhmsLawConstants.RELATIVE_SIZE_STRINGS.length - 1, // a2 b2
        height ) ); // a3

      // if beyond the threshold, clamp it back to the highest index
      if ( height > maxArrowHeightThreshold ) {
        index = OhmsLawConstants.RELATIVE_SIZE_STRINGS.length - 1;
      }
      assert && assert( index >= 0 && index < OhmsLawConstants.RELATIVE_SIZE_STRINGS.length,
        'mapping to relative size string incorrect' );
      return OhmsLawConstants.RELATIVE_SIZE_STRINGS[ index ].toLowerCase();
    }
  } );
} );
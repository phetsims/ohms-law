// Copyright 2016, University of Colorado Boulder

/**
 * Container for sliders and adjacent text
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Slider = require( 'OHMS_LAW/ohms-law/view/Slider' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var WhiteBox = require( 'OHMS_LAW/ohms-law/view/WhiteBox' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );

  // images
  var sliderImage = require( 'image!OHMS_LAW/slider.png' );

  // strings
  var voltageSymbolString = require( 'string!OHMS_LAW/voltageSymbol' );
  var resistanceSymbolString = require( 'string!OHMS_LAW/resistanceSymbol' );
  var voltageString = require( 'string!OHMS_LAW/voltage' );
  var voltageUnitsString = require( 'string!OHMS_LAW/voltageUnits' );
  var resistanceString = require( 'string!OHMS_LAW/resistance' );
  var resistanceUnitsString = require( 'string!OHMS_LAW/resistanceUnits' );


  var PANEL_WIDTH = 270;
  var PANEL_HEIGHT = 400;

  /**
   * @param {OhmsLawModel} model
   * @param {Object} [options]
   * @constructor
   */
  function SlidersBox( model, options ) {

    Node.call( this );

    var textVoltage;
    var textResistance;

    // xy Grid
    var yCoords = [ 5, 60, 340 ];
    var xCoords = [ 70, 190 ];
    this.addChild( new WhiteBox( 0, 0, PANEL_WIDTH, PANEL_HEIGHT ) );

    // limit max width of labels and units in support of translation
    var maxLabelWidth = PANEL_WIDTH * 0.25;
    var maxUnitsWidth = PANEL_WIDTH * 0.1;


    this.addChild( new Text( voltageSymbolString, {
      font: new PhetFont( { family: 'Times New Roman', size: 60, weight: 'bold' } ),
      fill: '#0f0ffb',
      centerX: xCoords[ 0 ],
      top: yCoords[ 0 ],
      maxWidth: maxLabelWidth
    } ) );
    this.addChild( new Text( voltageString, {
      font: new PhetFont( 16 ),
      textAlign: 'center',
      textAnchor: 'middle',
      fill: '#0f0ffb',
      centerX: xCoords[ 0 ],
      top: yCoords[ 1 ],
      maxWidth: maxLabelWidth
    } ) );
    this.addChild( textVoltage = new Text( Util.toFixed( model.voltageProperty.value, 1 ), {
      font: new PhetFont( 30 ),
      textAlign: 'end',
      textAnchor: 'end',
      fill: '#000',
      right: xCoords[ 0 ] + 15,
      top: yCoords[ 2 ],
      maxWidth: maxLabelWidth
    } ) );
    this.addChild( new Text( voltageUnitsString, {
      font: new PhetFont( 30 ),
      textAlign: 'start',
      textAnchor: 'start',
      fill: '#0f0ffb',
      left: xCoords[ 0 ] + 20,
      centerY: textVoltage.centerY,
      maxWidth: maxUnitsWidth
    } ) );

    this.addChild( new Text( resistanceSymbolString, {
      font: new PhetFont( { family: 'Times New Roman', size: 60, weight: 'bold' } ),
      fill: '#0f0ffb',
      centerX: xCoords[ 1 ],
      top: yCoords[ 0 ],
      maxWidth: maxLabelWidth
    } ) );
    this.addChild( new Text( resistanceString, {
      font: new PhetFont( 16 ),
      textAlign: 'center',
      textAnchor: 'middle',
      fill: '#0f0ffb',
      centerX: xCoords[ 1 ],
      top: yCoords[ 1 ],
      maxWidth: maxLabelWidth
    } ) );
    this.addChild( textResistance = new Text( Util.toFixed( model.resistanceProperty.value, 0 ), {
      font: new PhetFont( 30 ),
      textAlign: 'end',
      textAnchor: 'end',
      fill: '#000',
      right: xCoords[ 1 ] + 20,
      top: yCoords[ 2 ],
      maxWidth: maxLabelWidth
    } ) );
    this.addChild( new Text( resistanceUnitsString, {
      font: new PhetFont( 30 ),
      textAlign: 'start',
      textAnchor: 'start',
      fill: '#0f0ffb',
      left: xCoords[ 1 ] + 20,
      centerY: textResistance.centerY,
      maxWidth: maxUnitsWidth
    } ) );

    // make all of the text and background unpickable in order to speed up mouse/touch hit computation
    _.each( this.children, function( child ) { child.pickable = false; } );

    this.addChild( new Slider( xCoords[ 0 ], 90, 240, model.voltageProperty, sliderImage, OhmsLawConstants.VOLTAGE_RANGE ) );
    this.addChild( new Slider( xCoords[ 1 ], 90, 240, model.resistanceProperty, sliderImage, OhmsLawConstants.RESISTANCE_RANGE ) );

    model.voltageProperty.link( function updateTextVoltage( value ) {
      textVoltage.text = Util.toFixed( value, 1 );
      textVoltage.right = xCoords[ 0 ] + 15;
    } );
    model.resistanceProperty.link( function updateTextResistance( value ) {
      textResistance.text = Util.toFixed( value, 0 );
      textResistance.right = xCoords[ 1 ] + 15;
    } );

    this.mutate( options );
  }

  ohmsLaw.register( 'SlidersBox', SlidersBox );

  return inherit( Node, SlidersBox );
} );

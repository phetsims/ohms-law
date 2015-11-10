// Copyright 2013-2015, University of Colorado Boulder

/**
 * Container for sliders and circumjacent text
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var WhiteBox = require( 'OHMS_LAW/ohms-law/view/shapes/WhiteBox' );
  var Slider = require( 'OHMS_LAW/ohms-law/view/shapes/SliderBox/Slider' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Util = require( 'DOT/Util' );

  // images
  var sliderImage = require( 'image!OHMS_LAW/slider.png' );

  // strings
  var voltageSymbolString = require( 'string!OHMS_LAW/voltageSymbol' );
  var resistanceSymbolString = require( 'string!OHMS_LAW/resistanceSymbol' );
  var voltageString = require( 'string!OHMS_LAW/voltage' );
  var voltageUnitsString = require( 'string!OHMS_LAW/voltageUnits' );
  var resistanceString = require( 'string!OHMS_LAW/resistance' );
  var resistanceUnitsString = require( 'string!OHMS_LAW/resistanceUnits' );

  // constants
  var VOLTAGEMAX = 9;
  var VOLTAGEMIN = 0.1;
  var RESISTANCEMAX = 1000;
  var RESISTANCEMIN = 10;

  /**
   * @param {OhmsLawModel} model
   * @constructor
   */
  function SlidersBox( model ) {

    Node.call( this );

    var rectW = 270;
    var rectH = 400;
    var rectX = 720;
    var rectY = 80;
    var textVoltage;
    var textResistance;

    //xy Grid
    var yCoords = [ 5, 60, 340, 340 ];
    var xCoords = [ 70, 190 ];
    this.x = rectX;
    this.y = rectY;
    this.addChild( new WhiteBox( 0, 0, rectW, rectH ) );

    this.addChild( new Text( voltageSymbolString, {
      font: new PhetFont( { family: 'Times New Roman', size: 60, weight: 'bold' } ),
      fill: '#0f0ffb',
      centerX: xCoords[ 0 ],
      top: yCoords[ 0 ]
    } ) );
    this.addChild( new Text( voltageString, {
      font: new PhetFont( 16 ),
      textAlign: 'center',
      textAnchor: 'middle',
      fill: '#0f0ffb',
      centerX: xCoords[ 0 ],
      top: yCoords[ 1 ]
    } ) );
    this.addChild( textVoltage = new Text( Util.toFixed( model.voltage, 1 ), {
      font: new PhetFont( 30 ),
      textAlign: 'end',
      textAnchor: 'end',
      fill: '#000',
      right: xCoords[ 0 ] + 15,
      top: yCoords[ 2 ]
    } ) );
    this.addChild( new Text( voltageUnitsString, {
      font: new PhetFont( 30 ),
      textAlign: 'start',
      textAnchor: 'start',
      fill: '#0f0ffb',
      centerX: xCoords[ 0 ] + 30,
      top: yCoords[ 3 ]
    } ) );

    this.addChild( new Text( resistanceSymbolString, {
      font: new PhetFont( { family: 'Times New Roman', size: 60, weight: 'bold' } ),
      fill: '#0f0ffb',
      centerX: xCoords[ 1 ],
      top: yCoords[ 0 ]
    } ) );
    this.addChild( new Text( resistanceString, {
      font: new PhetFont( 16 ),
      textAlign: 'center',
      textAnchor: 'middle',
      fill: '#0f0ffb',
      centerX: xCoords[ 1 ],
      top: yCoords[ 1 ]
    } ) );
    this.addChild( textResistance = new Text( Util.toFixed( model.resistance, 0 ), {
      font: new PhetFont( 30 ),
      textAlign: 'end',
      textAnchor: 'end',
      fill: '#000',
      right: xCoords[ 1 ] + 20,
      top: yCoords[ 2 ]
    } ) );
    this.addChild( new Text( resistanceUnitsString, {
      font: new PhetFont( 30 ),
      textAlign: 'start',
      textAnchor: 'start',
      fill: '#0f0ffb',
      centerX: xCoords[ 1 ] + 40,
      top: yCoords[ 3 ]
    } ) );

    // make all of the text and background unpickable, to speed up mouse/touch hit computation
    _.each( this.children, function( child ) { child.pickable = false; } );

    this.addChild( new Slider( xCoords[ 0 ], 90, 240, model.voltageProperty, sliderImage, { min: VOLTAGEMIN, max: VOLTAGEMAX } ) );
    this.addChild( new Slider( xCoords[ 1 ], 90, 240, model.resistanceProperty, sliderImage, { min: RESISTANCEMIN, max: RESISTANCEMAX } ) );

    model.voltageProperty.link( function updateTextVoltage( value ) {
      textVoltage.text = Util.toFixed( value, 1 );
      textVoltage.right = xCoords[ 0 ] + 15;
    } );
    model.resistanceProperty.link( function updateTextResistance( value ) {
      textResistance.text = Util.toFixed( value, 0 );
      textResistance.right = xCoords[ 1 ] + 15;
    } );
  }

  return inherit( Node, SlidersBox );
} );

// Copyright 2013-2015, University of Colorado Boulder

/**
 * view resistor and resist
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );

  /**
   * @param {OhmsLawModel} model
   * @param x
   * @param y
   * @param w
   * @param h
   * @constructor
   */
  function ResistorView( model, x, y, w, h ) {

    Node.call( this );

    var wBox = 260;
    var hBox = 66;
    var linearGradient1 = new LinearGradient( 0, 0, 0, hBox )
      .addColorStop( 0, '#F00' )
      .addColorStop( 0.266, '#FFF' )
      .addColorStop( 0.412, '#FCFCFC' )
      .addColorStop( 1, '#F00' );
    var resistorShape = new Shape();
    var resistorShape2 = new Shape();
    var resistorShape3 = new Shape();
    var resistor = new Node();
    resistorShape.moveTo( 5, 0 );
    resistorShape.cubicCurveTo( 15 + 5, 0, 15 + 5, hBox, 5, hBox );
    resistorShape.lineTo( wBox - 3, hBox );
    resistorShape.cubicCurveTo( wBox - 3 + 15, hBox, wBox - 3 + 15, 0, wBox - 3, 0 );
    resistorShape.close();

    resistorShape2.moveTo( 5, 0 );
    resistorShape2.cubicCurveTo( 15 + 5, 0, 15 + 5, hBox, 5, hBox );
    resistorShape2.cubicCurveTo( -15 + 5, hBox, -15 + 5, 0, 5, 0 );
    resistorShape2.close();

    resistorShape3.moveTo( 5, hBox / 2 );
    resistorShape3.lineTo( -15, hBox / 2 );

    resistor.addChild( new Path( resistorShape, {
      stroke: '#000',
      fill: linearGradient1,
      lineWidth: 1
    } ) );
    resistor.addChild( new Path( resistorShape2, {
      stroke: '#000',
      fill: '#ff9f9f',
      lineWidth: 1
    } ) );
    resistor.addChild( new Path( resistorShape3, {
      stroke: '#000',
      lineWidth: 10
    } ) );
    this.addChild( resistor );
    this.centerX = (x + w / 2);
    this.centerY = (y + h);

    var dotGroup = new Node();
    var maxPoints = 250;
    var a = (hBox - 3 ) * (wBox - 3 ) / maxPoints;    //area per dot
    var d = Math.pow( a, 0.5 ); //NN dot separation
    var nRows = Math.round( hBox / d );
    var nCols = Math.round( wBox / d );
    var c = 0; //counter

    var points = [];

    for ( var i = 1; i <= nRows; i++ ) {
      for ( var j = 1; j <= nCols; j++ ) {
        var p = new Circle( 2, { fill: '#000' } );
        p.y = i * d - d / 2 + Math.random() * d * 0.7 - 3;
        p.x = j * d - d / 2 + Math.random() * d * 0.7;
        points.push( p );
        dotGroup.addChild( p );
        c++;
      }
    }
    maxPoints = c;

    for ( i = points.length - 1; i > -1; i-- ) {
      var pos = parseInt( Math.random() * i, 10 );
      var tt = points[ i ];
      points[ i ] = points[ pos ];
      points[ pos ] = tt;
    }

    this.addChild( dotGroup );

    model.resistanceProperty.link( function updateResistor( val ) {
      var borderNumber = maxPoints * (val + 50) / 1000;
      for ( var i = 0; i < maxPoints; i++ ) {
        points[ i ].setVisible( i < borderNumber );
      }
    } );
  }

  ohmsLaw.register( 'ResistorView', ResistorView );

  return inherit( Node, ResistorView );
} );
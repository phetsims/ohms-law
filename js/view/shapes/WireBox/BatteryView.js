/**
 * Copyright 2002-2013, University of Colorado
 * View of Single Battery
 * Author: Vasily Shakhov (Mlearner)
 */

define( [
          "easel",
          'AXON/Property'
        ], function( Easel, Property ) {
  'use strict';
  return function( model, x, y, totWidth ) {
    var self = this;

    //current battery's voltage
    self.voltage = new Property( 0 );

    //sizes of parts of battery
    //default 72px and 6px, totW = 78px
    totWidth -= 4;
    var w = [totWidth * 72 / 78, totWidth * 6 / 78],
      h = 40;

    //middle
    y = y - h / 2;


    self.view = new Easel.Container().setTransform( x, y );

    //battery view
    var batView = new Easel.Shape();
    batView.$text1 = new Easel.Text( "1.5", "bold 18px Verdana" ).setTransform( 3, 1 );
    batView.$text2 = new Easel.Text( "V", "bold 18px Verdana", "blue" ).setTransform( 37, 1 );
    batView.$text3 = new Easel.Text( "", "bold 18px Verdana" ).setTransform( 3, -23 );
    batView.$text4 = new Easel.Text( "V", "bold 18px Verdana", "blue" ).setTransform( 37, -23 );

    //w1 - width of first part(grey) of battery
    var drawBattery = function( w1 ) {
      batView.graphics.clear().setStrokeStyle( 1 ).beginStroke( "black" );
      batView.graphics.beginLinearGradientFill( ['#777777', "#bdbdbd", '#2b2b2b'], [0, 0.3, 1], 0, 0, 0, h );
      batView.graphics.drawRect( 0, 0, w1, h );
      batView.graphics.beginLinearGradientFill( ['#cc4e00', "#dddad6", '#cc4e00'], [0, 0.3, 1], 0, 0, 0, h );
      batView.graphics.drawRect( w1, 0, w[1], h );
      batView.graphics.beginLinearGradientFill( ['#c3c3c3', "#f9f9f9", '#404040'], [0, 0.3, 1], 0, 0, 0, h );
      batView.graphics.drawRect( w1 + w[1], 14, 4, 12 );
    };

    //partView when voltage 1.5
    var setFull = function() {
      self.view.removeAllChildren();
      drawBattery( w[0] );
      self.view.addChild( batView );
      self.view.addChild( batView.$text1 );
      self.view.addChild( batView.$text2 );
    };

    //partView when voltage not 1.5
    var setPart = function( pct ) {
      var cWidth = pct * totWidth - 6;
      drawBattery( cWidth );

      batView.$text3.text = (Math.round( 15 * pct ) / 10).toFixed( 1 );

      self.view.removeAllChildren();
      self.view.addChild( batView );
      self.view.addChild( batView.$text3 );
      self.view.addChild( batView.$text4 );
    };

    self.voltage.link( function( val ) {
      if ( val === 0 ) {
        self.view.visible = false;
      }
      else {
        self.view.visible = true;
        if ( val === 1.5 ) {
          setFull();
        }
        else {
          setPart( val / 1.5 );
        }
      }
    } );
    return self;
  };
} );
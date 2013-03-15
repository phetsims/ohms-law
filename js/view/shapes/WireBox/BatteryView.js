/**
 * Copyright 2002-2013, University of Colorado
 * View of Single Battery
 * Author: Vasily Shakhov (Mlearner)
 */

define( [
          "easel",
          '../../../../common/phetcommon/js/model/property/Property'
        ], function ( Easel, Property ) {
  'use strict';
  return function ( model, x, y, totWidth ) {
    var self = this;

    //current battery's voltage
    self.voltage = new Property( 0 );

    //sizes of parts of battery
    //default 53px and 25px, totW = 78px
    totWidth-=4;
    var w = [totWidth * 53 / 78, totWidth * 25 / 78],
        h = 40;

    //middle
    y = y-h/2;


    self.view = new Easel.Container().setTransform( x, y );

    //full voltage view
    var fullView = new Easel.Shape();
    fullView.graphics.setStrokeStyle( 1 ).beginStroke( "black" );
    fullView.graphics.beginLinearGradientFill( ['#656565', "#afafaf", '#1e1e1e'], [0, 0.3, 1], 0, 0, 0, h );
    fullView.graphics.drawRect( 0, 0, w[0], h );
    fullView.graphics.beginLinearGradientFill( ['#cc4e00', "#dddad6", '#cc4e00'], [0, 0.3, 1], 0, 0, 0, h );
    fullView.graphics.drawRect( w[0], 0, w[1], h );
    fullView.graphics.beginLinearGradientFill( ['#c3c3c3', "#f9f9f9", '#404040'], [0, 0.3, 1], 0, 0, 0, h );
    fullView.graphics.drawRect( totWidth, 14, 4, 12 );
    fullView.$text1 = new Easel.Text( "1.5", "16px Verdana bold" ).setTransform( 3, 3 );
    fullView.$text2 = new Easel.Text( "V", "18px Verdana bold", "blue" ).setTransform( 35, 1 );

    var setFull = function () {
      self.view.removeAllChildren();
      self.view.addChild( fullView );
      self.view.addChild( fullView.$text1 );
      self.view.addChild( fullView.$text2 );
    };

    //partView when voltage not 1.5
    var partView = new Easel.Shape();
    partView.$text1 = new Easel.Text( "", "16px Verdana" ).setTransform( 3, -20 );

    var setPart = function ( pct ) {
      var cWidth = pct * totWidth;
      partView.graphics.clear().setStrokeStyle( 1 ).beginStroke( "black" );
      partView.graphics.beginLinearGradientFill( ['#c3c3c3', "#f9f9f9", '#404040'], [0, 0.3, 1], 0, 0, 0, h );
      partView.graphics.drawRect( 0, 0, cWidth, h );
      partView.graphics.drawRect( cWidth, 14, 4, 12 );

      partView.$text1.text = Math.round( 15 * pct ) / 10 + " V";

      self.view.removeAllChildren();
      self.view.addChild( partView );
      self.view.addChild( partView.$text1 );
    };
    self.voltage.addObserver( function ( val ) {
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
/**
 * Copyright 2002-2013, University of Colorado
 * view for vertical slider control
 * Author: Vasily Shakhov (Mlearner)
 */


define( [
          "easel",
          "image!images/battery.png"
        ], function ( Easel, batImage ) {
  'use strict';
  return function ( model, x, y, w ) {
    var root = new Easel.Container();

    //image template
    var imgShape = new Easel.Bitmap( batImage );

    //max number of batteries
    var maxQ = model.voltage.MAX / 1.5;

    x = x + (w - maxQ * imgShape.image.width) / 2;
    y = y - imgShape.image.height / 2;

    //batteries presentation
    var bats = new Array( Math.ceil( maxQ ) );

    for ( var i = 0, l = bats.length; i < l; i++ ) {
      var sx = x + i * imgShape.image.width;
      bats[i] = imgShape.clone().setTransform( sx, y );
      bats[i].$text = new Easel.Text( "1.5", "16px Verdana bold" ).setTransform( sx + 3, y + 3 );
      bats[i].visible = false;
      root.addChild( bats[i] );
      root.addChild( bats[i].$text );
    }

    model.voltage.addObserver( function ( val ) {
      var c = val / 1.5;
      var cCeil = Math.max( 0, Math.ceil( c - 0.0001 ) - 1 );
      for ( var i = 0, l = bats.length; i < l; i++ ) {
        if ( i <= cCeil ) {
          bats[i].visible = true;
          bats[i].$text.visible = true;
          if ( i !== cCeil ) {
            bats[i].$text.text = 1.5;
          }
          else {
            var newVal = (Math.round( 10 * (val % 1.5) ) / 10).toFixed( 1 );
            if ( newVal === "0.0" ) {
              newVal = 1.5;
            }
            bats[i].$text.text = newVal;
          }
        }
        else {
          bats[i].visible = false;
          bats[i].$text.visible = false;
        }
      }

    } );

    return root;
  };
} );
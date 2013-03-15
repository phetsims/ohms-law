/**
 * Copyright 2002-2013, University of Colorado
 * view for vertical slider control
 * Author: Vasily Shakhov (Mlearner)
 */

define( [
          "easel"
        ], function ( Easel ) {
  'use strict';
  function showPointer() {
    document.body.style.cursor = "pointer";
  }

  function showDefault() {
    document.body.style.cursor = "default";
  }

  function setCursorHand( displayObject ) {
    displayObject.onMouseOver = showPointer;
    displayObject.onMouseOut = showDefault;
  }

  return function ( view, x, y, h, targetProperty, img ) {
    var root = new Easel.Container();

    //background
    var back = new Easel.Shape();
    back.graphics.setStrokeStyle( 6 ).beginStroke( "#000" );
    back.graphics.moveTo( x, y ).lineTo( x, y + h );
    root.addChild( back );

    //image
    var imgShape = new Easel.Bitmap( img ).setTransform( x - img.width / 2, y );
    setCursorHand( imgShape );
    root.addChild( imgShape );

    //drag
    var offset = {};
    h = h - img.height;

    imgShape.onPress = function ( e ) {
      offset = {x: e.stageX / view.stage.scaleX - imgShape.x, y: e.stageY / view.stage.scaleY - imgShape.y};
      e.onMouseMove = drag;
    };
    imgShape.onMouseUp = function ( e ) {
      e.onMouseOver = showPointer;
    };
    var drag = function ( e ) {
      var ty = e.stageY / view.stage.scaleX - offset.y;
      ty = Math.max( y, Math.min( ty, y + h ) );
      imgShape.y = ty;
      targetProperty.set( targetProperty.MIN + (targetProperty.MAX - targetProperty.MIN) * (y - ty + h) / h );
    };

    //observer, set position when changed
    targetProperty.addObserver( function () {
      imgShape.y = y + h - h * (targetProperty.get() - targetProperty.MIN) / (targetProperty.MAX - targetProperty.MIN);
    } );

    return root;
  };
} );
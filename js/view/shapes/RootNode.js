// Copyright 2002-2013, University of Colorado Boulder

/**
 * Copyright 2002-2013, University of Colorado
 * Main container for all part of scene
 * Author: Vasily Shakhov (Mlearner)
 */

define( [
          'easel',
          'view/shapes/WireBox',
          'view/shapes/SlidersBox',
          'view/shapes/FormulaView'
        ], function( Easel, WireBox, SlidersBox, FormulaView ) {
  'use strict';
  return function( model, view ) {
    var root = new Easel.Container();

    //background
    var background = new Easel.Shape();
    background.graphics.beginFill( '#ffffdf' ).rect( 0, 0, view.defaultW, view.defaultH );
    root.addChild( background );


    root.addChild( new FormulaView( model ) );
    root.addChild( new WireBox( model ) );
    root.addChild( new SlidersBox( model, view ) );

    return root;
  };
} );
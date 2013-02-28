/**
 * Copyright 2002-2013, University of Colorado
 * Main container for all part of scene
 * Author: Vasily Shakhov (Mlearner)
 */

define( [
  'easel',
  'view/shapes/StaticElements',
  'view/shapes/CurrentValueBox',
  'view/shapes/SlidersBox',
  'view/shapes/FormulaView'
], function ( Easel, StaticElements, CurrentValueBox, SlidersBox, FormulaView ) {

  return function ( model, view ) {
    var root = new Easel.Container();

    root.addChild( new StaticElements( view ) );
    root.addChild( new FormulaView( model ) );
    root.addChild( new CurrentValueBox( model, view ) );
    root.addChild( new SlidersBox( model, view ) );

    return root;
  };
} );
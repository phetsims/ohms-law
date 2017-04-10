// Copyright 2016, University of Colorado Boulder

/**
 * Main container for all part of scene
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var FormulaView = require( 'OHMS_LAW/ohms-law/view/FormulaView' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var SlidersBox = require( 'OHMS_LAW/ohms-law/view/SlidersBox' );
  var WireBox = require( 'OHMS_LAW/ohms-law/view/WireBox' );

  /**
   * @param {OhmsLawModel} model
   * @constructor
   */
  function RootNode( model ) {
    Node.call( this );
    this.addChild( new FormulaView( model ).mutate( { pickable: false } ) );
    this.addChild( new WireBox( model ).mutate( { pickable: false } ) );
    this.addChild( new SlidersBox( model ) );
  }

  ohmsLaw.register( 'RootNode', RootNode );

  return inherit( Node, RootNode );
} );

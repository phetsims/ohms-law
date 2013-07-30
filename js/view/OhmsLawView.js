// Copyright 2002-2013, University of Colorado Boulder

/**
 * Copyright 2002-2013, University of Colorado
 * View for OhmsLaw simulations. main TabView, button, main stage
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var OhmsLawStage = require( 'view/OhmsLawStage' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ResetAllButton = require( 'view/ResetAllButton' );
  var ToggleButton = require( 'SUN/ToggleButton' );
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var TabView = require( 'JOIST/TabView' );
  var inherit = require( 'PHET_CORE/inherit' );

  function OhmsLawView( model ) {
    TabView.call( this, { renderer: 'svg' } );
    //main stage
    this.addChild( new OhmsLawStage( model ) );
    //reset button
    this.addChild( new Node( { scale: 0.8, x: 600, y: 400, children: [ new ResetAllButton( function() {model.reset();} )]} ) );
    //sound on/off toggle
    this.addChild( new Node( { scale: 1, x: 700, y: 400, children: [
      new ToggleButton(
        new FontAwesomeNode( 'volume_up', {fill: "#FFF"} ),
        new FontAwesomeNode( 'volume_off', {fill: "#FFF"} ),
        model.soundActiveProperty,
        {addRectangle: true, label: 'Sound', fill: "#F00"} )] } ) );
  }

  inherit( TabView, OhmsLawView );
  return OhmsLawView;

} )
;

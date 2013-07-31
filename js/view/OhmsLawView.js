/**
 * Copyright 2002-2013, University of Colorado
 * View for OhmsLaw simulations. main TabView, main stage
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var OhmsLawStage = require( 'view/OhmsLawStage' );
  var TabView = require( 'JOIST/TabView' );
  var inherit = require( 'PHET_CORE/inherit' );

  function OhmsLawView( model ) {
    TabView.call( this, { renderer: 'svg' } );
    //main stage
    this.addChild( new OhmsLawStage( model ) );

  }

  inherit( TabView, OhmsLawView );
  return OhmsLawView;

} )
;

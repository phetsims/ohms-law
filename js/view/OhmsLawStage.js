/**
 * Copyright 2002-2013, University of Colorado
 * Stage for the "OhmsLaw" module, sets up the scene.
 * Author: Vasily Shakhov (Mlearner)
 */

define(
  [
    'easel',
    'view/shapes/RootNode'
  ],
  function ( Easel, RootNode ) {

    function OhmsLawStage( canvas, model ) {
      var self = this;
      self.model = model;

      this.stage = new Easel.Stage( canvas );
      this.defaultW = 1000;
      this.defaultH = 640;

      // rendering order
      this.stage.addChild( new RootNode( self.model, self ) );

      // resize handler
      var handleResize = function () {

        //Gets rid of scroll bars
        var width = $( window ).width();
        var height = $( window ).height();

        var scale = Math.min( width / self.defaultW, height / self.defaultH );
        var canvasW = scale * self.defaultW;
        var canvasH = scale * self.defaultH;

        //Allow the canvas to fill the screen, but still center the content within the window.
        canvas.setAttribute( 'width', canvasW + 'px' );
        canvas.setAttribute( 'height', canvasH + 'px' );

        self.stage.scaleX = self.stage.scaleY = scale;

        // force rendering update
        self.stage.update();
      };

      $( window ).resize( handleResize );
      handleResize(); // initial size

      //Enable touch and prevent default
      Easel.Touch.enable( this.stage, false, true );

      //mouseover events
      this.stage.enableMouseOver();

      //update when any value changed
      model.voltage.addObserver( function() {
        self.stage.update();
      });

      model.resistance.addObserver( function() {
        self.stage.update();
      });

    }

    return OhmsLawStage;
  } );

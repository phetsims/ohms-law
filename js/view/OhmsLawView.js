/**
 * Copyright 2002-2013, University of Colorado
 * View for OhmsLaw simulations. Contains 2 elements : canvas + htmlControls
 * Author: Vasily Shakhov (Mlearner)
 */

define(
  [
    'view/OhmsLawStage',
    'view/HTMLElements'
  ],
  function ( OhmsLawStage, HTMLElements ) {
    'use strict';
    function OhmsLawView( container, model ) {
      var self = this;
      self.model = model;

      this.$canvas = container.find( "canvas" ).css( 'position', 'relative' );
      this.$stage = new OhmsLawStage( this.$canvas[0], model );
      this.$htmlElements = new HTMLElements( container, model );
      this.defaultW = 1000;
      this.defaultH = 640;

      // resize handler
      var handleResize = function () {

        //Gets rid of scroll bars
        var width = $( window ).width();
        var height = $( window ).height();

        var scale = Math.min( width / self.defaultW, height / self.defaultH );
        var canvasW = scale * self.defaultW;
        var canvasH = scale * self.defaultH;

        //Allow the canvas to fill the screen, but still center the content within the window.
        self.$canvas[0].setAttribute( 'width', canvasW + 'px' );
        self.$canvas[0].setAttribute( 'height', canvasH + 'px' );

        //resize main container
        container.css( {
          width: canvasW + 'px',
          height: canvasH + 'px',
          left : (width - canvasW) / 2 + 'px'
        } );

        self.$stage.resize( scale );

      };

      //prevent default scrolling on iPad
      this.$canvas[0].addEventListener("touchstart",function(e){
        e.preventDefault();
      });

      $( window ).resize( handleResize );
      handleResize(); // initial size
    }

    return OhmsLawView;

  } )
;

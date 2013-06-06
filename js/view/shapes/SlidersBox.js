/**
 * Copyright 2002-2013, University of Colorado
 * Container for sliders and circumjacent text
 * Author: Vasily Shakhov (Mlearner)
 */


define( [
          "easel",
          "OhmsLawStrings",
          "view/shapes/WhiteBox",
          "view/shapes/SliderBox/Slider",
          "imageLoader"
        ], function( Easel, Strings, WhiteBox, Slider, imageLoader ) {
  'use strict';
  return function( model, view ) {

    var root = new Easel.Container();

    //rect around sliders
    var rectW = 270,
      rectH = 400,
      rectX = 720,
      rectY = 80;
    root.addChild( new WhiteBox( rectX, rectY, rectW, rectH ) );

    //texts for slider1, slider2
    var defaultFont = "30px Verdana",
      defaultColor = "#0f0ffb";
    var texts = [
      [
        {
          val: "V",
          font: "bold 60px Times New Roman"
        },
        {
          val: Strings.voltage,
          font: "16px Verdana"
        },
        {
          val: model.voltage.get(),
          color: "#000",
          textAlign: "end",
          dx: 15
        },
        {
          val: "V",
          dx: 30
        }
      ],
      [
        {
          val: "R",
          font: "bold 60px Times New Roman"
        },
        {
          val: Strings.resistance,
          font: "16px Verdana"
        },
        {
          val: model.resistance.get(),
          color: "#000",
          textAlign: "end",
          dx: 20
        },
        {
          val: "Ω",
          dx: 40
        }
      ]
    ];
    //xy Grid
    var yCoords = [5, 60, 340 , 340];
    var xCoords = [70, 190];

    //set texts
    for ( var i = 0, l = texts.length; i < l; i++ ) {
      var textI = texts[i];
      for ( var j = 0, l1 = textI.length; j < l1; j++ ) {
        textI[j].view = new Easel.Text( textI[j].val, textI[j].font || defaultFont, textI[j].color || defaultColor );
        textI[j].view.setTransform( rectX + xCoords[i] + (textI[j].dx || 0), rectY + yCoords[j] );
        textI[j].view.textAlign = textI[j].textAlign || "center";
        root.addChild( textI[j].view );
      }
    }

    //observer, changes view when resistance or voltage value changes
    model.voltage.addObserver( function( val ) {
      texts[0][2].view.text = val;
    } );

    model.resistance.addObserver( function( val ) {
      texts[1][2].view.text = val;
    } );

    //sliders
    root.addChild( new Slider( view, rectX + xCoords[0], rectY + 90, 240, model.voltage, imageLoader.getImage( 'slider.png' ) ) );
    root.addChild( new Slider( view, rectX + xCoords[1], rectY + 90, 240, model.resistance, imageLoader.getImage( 'slider.png' ) ) );

    return root;
  };
} );
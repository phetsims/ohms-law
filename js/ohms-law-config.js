// Copyright 2002-2013, University of Colorado Boulder

/**
 * Copyright 2002-2013, University of Colorado
 * RequireJS configuration file for Ohm's Law simulation.
 * Author: Vasily Shakhov (Mlearner)
 */


require.config( {
  deps: ["ohms-law-main"],

  paths: {
    // libs
    easel: "../lib/easel-0.5.0",
    i18n: "../lib/i18n/i18n",
    tpl: "../lib/tpl-0.2",

    // common directories, uppercase names to identify them in require imports
    ASSERT: '../../assert/js',
    AXON: '../../axon/js',
    PHETCOMMON: "../common/phetcommon/js",
    DOT: '../../dot/js',
    PHET_CORE: '../../phet-core/js',
    // PhET libs, uppercase names to identify them in require.js imports
    JOIST: "../../joist/js",
    KITE: "../../kite/js",
    SCENERY: "../../scenery/js",
    SCENERY_PHET: "../../scenery-phet/js",
    SUN: "../../sun/js"
  },

  shim: {
    easel: {
      exports: "createjs"
    }
  },

  urlArgs: new Date().getTime()  // cache buster to make browser refresh load all included scripts

} );

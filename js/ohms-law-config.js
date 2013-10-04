/**
 * Copyright 2002-2013, University of Colorado
 * RequireJS configuration file for Ohm's Law simulation.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */


require.config( {
  deps: ["ohms-law-main"],

  config: {
    i18n: {
      locale: 'en_us'
    }
  },

  paths: {

    // third party libs
    text: '../../sherpa/text',

    // plugins
    audio: '../../chipper/requirejs-plugins/audio',
    image: '../../chipper/requirejs-plugins/image',
    string: '../../chipper/requirejs-plugins/string',

    // PhET libs, uppercase names to identify them in require.js imports
    ASSERT: '../../assert/js',
    AXON: '../../axon/js',
    DOT: '../../dot/js',
    JOIST: '../../joist/js',
    KITE: '../../kite/js',
    NITROGLYCERIN: '../../nitroglycerin/js',
    PHET_CORE: '../../phet-core/js',
    PHETCOMMON: '../../phetcommon/js',
    SCENERY: '../../scenery/js',
    SCENERY_PHET: '../../scenery-phet/js',
    SHERPA: '../../sherpa',
    SUN: '../../sun/js',
    VIBE: '../../vibe/js',

    // This sim
    OHMS_LAW: '.'
  },

  urlArgs: new Date().getTime()  // cache buster to make browser refresh load all included scripts

} );

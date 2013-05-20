/**
 * Copyright 2002-2013, University of Colorado
 * RequireJS configuration file for Ohm's Law simulation.
 * Author: Vasily Shakhov (Mlearner)
 */


require.config( {
                  deps: ["ohms-law-main"],

                  paths: {
                    // contrib
                    easel: "../lib/easel-0.5.0",
                    i18n: "../lib/i18n/i18n",
                    tpl: "../lib/tpl-0.2",
                    imagesloaded: '../lib/jquery.imagesloaded',

                    // common directories, uppercase names to identify them in require imports
                    ASSERT: '../../assert/js',
                    PHETCOMMON: "../common/phetcommon/js"
                  },

                  shim: {
                    easel: {
                      exports: "createjs"
                    }
                  },

                  urlArgs: new Date().getTime()  // cache buster to make browser refresh load all included scripts

                } );

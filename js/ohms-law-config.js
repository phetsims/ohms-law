// Copyright 2002-2013, University of Colorado

// RequireJS configuration file for Ohm's Law simulation.
require.config( {
                    deps:["ohms-law-main"],

                    paths:{
                        underscore:"../../../contrib/underscore-1.4.2",
                        easel:"../../../contrib/easel-0.5.0",
                        tpl:"../../../contrib/tpl-0.2",

                        // common
                        phetcommon:"../../../common/phetcommon/js",
                        phetcommon_html:"../../../common/phetcommon/html",
                        'easel-phet':"../../../common/easel-phet/js"
                    },

                    shim:{

                        underscore:{
                            exports:"_"
                        },

                        easel:{
                            exports:"createjs"
                        }
                    },

                    urlArgs:new Date().getTime()  // cache buster to make browser refresh load all included scripts

                } );

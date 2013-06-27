// Copyright 2002-2013, University of Colorado Boulder

//The string plugin loader has problems if you try to load the strings from different relative paths
//So just load them once and make them easily available
define( function( require ) {
  "use strict";

  //Only the strings specified in the config file get loaded unless you explicitly require them,
  // see https://github.com/phetsims/ohms-law/issues/16
  require( "i18n!../nls/ar/ohms-law-strings" );
  require( "i18n!../nls/ar-sa/ohms-law-strings" );
  require( "i18n!../nls/cs/ohms-law-strings" );
  require( "i18n!../nls/da/ohms-law-strings" );
  require( "i18n!../nls/de/ohms-law-strings" );
  require( "i18n!../nls/el/ohms-law-strings" );
  require( "i18n!../nls/es/ohms-law-strings" );
  require( "i18n!../nls/es-pe/ohms-law-strings" );
  require( "i18n!../nls/et/ohms-law-strings" );
  require( "i18n!../nls/eu/ohms-law-strings" );
  require( "i18n!../nls/fa/ohms-law-strings" );
  require( "i18n!../nls/fi/ohms-law-strings" );
  require( "i18n!../nls/fr/ohms-law-strings" );
  require( "i18n!../nls/gl/ohms-law-strings" );
  require( "i18n!../nls/hr/ohms-law-strings" );
  require( "i18n!../nls/hu/ohms-law-strings" );
  require( "i18n!../nls/in/ohms-law-strings" );
  require( "i18n!../nls/it/ohms-law-strings" );
  require( "i18n!../nls/iw/ohms-law-strings" );
  require( "i18n!../nls/ja/ohms-law-strings" );
  require( "i18n!../nls/ka/ohms-law-strings" );
  require( "i18n!../nls/ko/ohms-law-strings" );
  require( "i18n!../nls/lv/ohms-law-strings" );
  require( "i18n!../nls/mk/ohms-law-strings" );
  require( "i18n!../nls/mn/ohms-law-strings" );
  require( "i18n!../nls/mr/ohms-law-strings" );
  require( "i18n!../nls/ms/ohms-law-strings" );
  require( "i18n!../nls/nb/ohms-law-strings" );
  require( "i18n!../nls/nl/ohms-law-strings" );
  require( "i18n!../nls/pl/ohms-law-strings" );
  require( "i18n!../nls/pt/ohms-law-strings" );
  require( "i18n!../nls/pt-br/ohms-law-strings" );
  require( "i18n!../nls/ro/ohms-law-strings" );
  require( "i18n!../nls/ru/ohms-law-strings" );
  require( "i18n!../nls/sk/ohms-law-strings" );
  require( "i18n!../nls/sl/ohms-law-strings" );
  require( "i18n!../nls/sr/ohms-law-strings" );
  require( "i18n!../nls/sv/ohms-law-strings" );
  require( "i18n!../nls/ta/ohms-law-strings" );
  require( "i18n!../nls/tk/ohms-law-strings" );
  require( "i18n!../nls/tr/ohms-law-strings" );
  require( "i18n!../nls/uk/ohms-law-strings" );
  require( "i18n!../nls/vi/ohms-law-strings" );
  require( "i18n!../nls/zh-cn/ohms-law-strings" );
  require( "i18n!../nls/zh-tw/ohms-law-strings" );

  var Strings = require( "i18n!../nls/ohms-law-strings" );
  return Strings;
} );
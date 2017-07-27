// Copyright 2017, University of Colorado Boulder

/**
 * Content for the "Hot Keys and Help" dialog that can be brought up from the sim navigation bar.
 * @author Jesse Greenberg
 * @author  Michael Barlow
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Text = require( 'SCENERY/nodes/Text' );
  var RichText = require( 'SCENERY_PHET/RichText' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var Panel = require( 'SUN/Panel' );
  var ArrowKeyNode = require( 'SCENERY_PHET/keyboard/ArrowKeyNode' );
  var TabKeyNode = require( 'SCENERY_PHET/keyboard/TabKeyNode' );
  var ShiftKeyNode = require( 'SCENERY_PHET/keyboard/ShiftKeyNode' );
  var EscapeKeyNode = require( 'SCENERY_PHET/keyboard/EscapeKeyNode' );
  var FunctionKeyNode = require( 'SCENERY_PHET/keyboard/FunctionKeyNode' );
  var PageUpKeyNode = require( 'SCENERY_PHET/keyboard/PageUpKeyNode' );
  var PageDownKeyNode = require( 'SCENERY_PHET/keyboard/PageDownKeyNode' );
  var HomeKeyNode = require( 'SCENERY_PHET/keyboard/HomeKeyNode' );
  var EndKeyNode = require( 'SCENERY_PHET/keyboard/EndKeyNode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var PlusNode = require( 'SCENERY_PHET/PlusNode' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Spacer = require( 'SCENERY/nodes/Spacer' );
  var AlignGroup = require( 'SCENERY/nodes/AlignGroup' );

  // constants
  var LAYOUT_SPACING = 10;
  var DIALOG_MARGIN = 25;
  var ICON_VERTICAL_SPACING = 8;
  var TEXT_KEY_WIDTH = 42;
  var DESCRIPTION_FONT = new PhetFont( 14 );
  var TEXT_MAX_WIDTH = 300;

  // strings
  var orString = require( 'string!OHMS_LAW/or' );
  var sliderControlsString = require( 'string!OHMS_LAW/sliderControls' );
  var generalNavigationString = require( 'string!OHMS_LAW/generalNavigation' );
  var arrowKeysMoveSliderString = require( 'string!OHMS_LAW/arrowKeysMoveSlider' );
  var tabKeyDescriptionString = require( 'string!OHMS_LAW/tabKeyDescription' );
  var functionKeyDescriptionString = require( 'string!OHMS_LAW/functionKeyDescription' );
  var shiftKeyDescriptionString = require( 'string!OHMS_LAW/shiftKeyDescription' );
  var homeEndKeysDescriptionString = require( 'string!OHMS_LAW/homeEndKeysDescription' );
  var shiftTabKeyDescriptionString = require( 'string!OHMS_LAW/shiftTabKeyDescription' );
  var escapeKeyDescriptionString = require( 'string!OHMS_LAW/escapeKeyDescription' );

  /**
   * Constructor.
   * @param {Tandem} tandem
   * @constructor
   */
  function OhmsLawKeyboardHelpContent( tandem ) {

    // section labels
    var sliderControlsHeading = new RichText( sliderControlsString, {
      tandem: tandem.createTandem( 'sliderControlsHeading' ),
      maxWidth: TEXT_MAX_WIDTH
    } );

    var generalNavigationHeading = new RichText( generalNavigationString, {
      tandem: tandem.createTandem( 'generalNavigationHeading' ),
      maxWidth: TEXT_MAX_WIDTH
    } );

    // icons
    // arrow keys, separated by 'or' text
    var leftArrowKeyNode = new ArrowKeyNode( 'left', {
      tandem: tandem.createTandem( 'leftArrowKeyNode' )
    } );
    var rightArrowKeyNode = new ArrowKeyNode( 'right', {
      tandem: tandem.createTandem( 'rightArrowKeyNode' )
    } );
    var upArrowKeyNode = new ArrowKeyNode( 'up', {
      tandem: tandem.createTandem( 'upArrowKeyNode' )
    } );
    var downArrowKeyNode = new ArrowKeyNode( 'down', {
      tandem: tandem.createTandem( 'downArrowKeyNode' )
    } );

    var upDownArrowVBox = new VBox( {
      children: [ upArrowKeyNode, downArrowKeyNode ],
      spacing: LAYOUT_SPACING / 2
    } );

    var orText = new Text( orString, {
      font: new PhetFont( 12 ),
      tandem: tandem.createTandem( 'orText' ),
      maxWidth: TEXT_MAX_WIDTH / 4
    } );
    var arrowKeysIconHBox = new HBox( {
      children: [ leftArrowKeyNode, upDownArrowVBox, rightArrowKeyNode ],
      spacing: LAYOUT_SPACING / 2,
      tandem: tandem.createTandem( 'arrowKeysIconHBox' ),
      align: 'bottom'
    } );

    // fn key
    var functionKeyIcon = new FunctionKeyNode( {
      minKeyWidth: TEXT_KEY_WIDTH,
      maxKeyWidth: TEXT_KEY_WIDTH,
      tandem: tandem.createTandem( 'functionKeyIcon' )
    } );

    // page up/page down keys
    var pageUpKeyIcon = new PageUpKeyNode( {
      tandem: tandem.createTandem( 'pageUpKeyNode' )
    } );
    var pageDownKeyIcon = new PageDownKeyNode( {
      tandem: tandem.createTandem( 'pageDownKeyNode' )
    } );

    // home/end keys
    var homeKeyIcon = new HomeKeyNode( {
      tandem: tandem.createTandem( 'homeKeyNode' )
    } );
    var endKeyIcon = new EndKeyNode( {
      tandem: tandem.createTandem( 'endKeyNode' )
    } );

    // single tab key
    var singleTabKeyIcon = new TabKeyNode( {
      minKeyWidth: TEXT_KEY_WIDTH, // in ScreenView coordinates
      maxKeyWidth: TEXT_KEY_WIDTH,
      tandem: tandem.createTandem( 'singleTabKeyIcon' )
    } );

    // shift and tab keys, separated by plus sign
    var shiftKeyIcon = new ShiftKeyNode( {
      minKeyWidth: TEXT_KEY_WIDTH, // in ScreenView coordinates
      maxKeyWidth: TEXT_KEY_WIDTH,
      tandem: tandem.createTandem( 'shiftKeyIcon' )
    } );
    var plusIconNode = new PlusNode( {
      size: new Dimension2( 10, 1.5 ),
      tandem: tandem.createTandem( 'plusIconNode' )
    } );
    var shiftPlusTabIconHBox = new HBox( {
      children: [ shiftKeyIcon, plusIconNode, new TabKeyNode( {
        minKeyWidth: TEXT_KEY_WIDTH,
        maxKeyWidth: TEXT_KEY_WIDTH
      } ) ],
      spacing: 10,
      tandem: tandem.createTandem( 'shiftPlusTabIconHBox' )
    } );

    // escape key
    var escapeKeyIconNode = new EscapeKeyNode( {
      tandem: tandem.createTandem( 'escapeKeyNode' )
    } );

    // descriptions
    var descriptionOptions = {
      font: DESCRIPTION_FONT,

      // a11y options
      tagName: 'p',
      parentContainerTagName: 'li'
    };
    var arrowKeyDescription = new RichText( arrowKeysMoveSliderString, _.extend( {
      tandem: tandem.createTandem( 'arrowKeyDescription' ),
      accessibleLabel: arrowKeysMoveSliderString,
      maxWidth: TEXT_MAX_WIDTH
    }, descriptionOptions ) );
    var tabKeyDescription = new RichText( tabKeyDescriptionString, _.extend( {
      tandem: tandem.createTandem( 'tabKeyDescription' ),
      accessibleLabel: tabKeyDescriptionString,
      maxWidth: TEXT_MAX_WIDTH
    }, descriptionOptions ) );
    var shiftPlusTabDescription = new RichText( shiftTabKeyDescriptionString, _.extend( {
      tandem: tandem.createTandem( 'shiftPlusTabDescription' ),
      accessibleLabel: shiftTabKeyDescriptionString,
      maxWidth: TEXT_MAX_WIDTH
    }, descriptionOptions ) );
    var escapeKeyDescription = new RichText( escapeKeyDescriptionString, _.extend( {
      tandem: tandem.createTandem( 'escapeKeyDescription' ),
      accessibleLabel: escapeKeyDescriptionString,
      maxWidth: TEXT_MAX_WIDTH
    }, descriptionOptions ) );
    var functionKeyDescription = new RichText( functionKeyDescriptionString, _.extend( {
      tandem: tandem.createTandem( 'functionKeyDescription' ),
      accessibleLabel: functionKeyDescriptionString,
      maxWidth: TEXT_MAX_WIDTH
    } ) );

    /**
     * Align the icon and its description vertically by placing in a vertical align group
     * @param  {Node} icon
     * @param  {RichText} description
     * @returns {object} - keys icon {Node} and its description {RichText}
     */
    var createContentRow = function( icon, description ) {
      var alignGroup = new AlignGroup( { matchHorizontal: false } );
      var iconBox = alignGroup.createBox( icon );
      var descriptionBox = alignGroup.createBox( description );

      return {
        icon: iconBox,
        description: descriptionBox
      };
    };

    // align the icons with their content
    var arrowKeyContentRow = createContentRow( arrowKeysIconHBox, arrowKeyDescription );
    var tabKeyContentRow = createContentRow( singleTabKeyIcon, tabKeyDescription );
    var shiftPlusTabContentRow = createContentRow( shiftPlusTabIconHBox, shiftPlusTabDescription );
    var escapeKeyContentRow = createContentRow( escapeKeyIconNode, escapeKeyDescription );
    var functionKeyContentRow = createContentRow( functionKeyIcon, functionKeyDescription );

    // place icons in a right aligned vbox
    var sliderControlsIconVBox = new VBox( {
      children: [ 
        arrowKeyContentRow.icon,
        functionKeyContentRow.icon ],
      align: 'right',
      spacing: ICON_VERTICAL_SPACING,
      tandem: tandem.createTandem( 'sliderControlsIconVBox' )
    } );

    var generalNavigationIconVBox = new VBox( {
      children: [
        tabKeyContentRow.icon,
        shiftPlusTabContentRow.icon,
        escapeKeyContentRow.icon
      ],
      align: 'right',
      spacing: ICON_VERTICAL_SPACING,
      tandem: tandem.createTandem( 'generalNavigationIconVBox' )
    } );

    // place descriptions in a left aligned box
    var sliderControlsDescriptionVBox = new VBox( {
      children: [
        arrowKeyContentRow.description,
        functionKeyContentRow.description ],
      align: 'left',
      spacing: ICON_VERTICAL_SPACING,
      tandem: tandem.createTandem( 'sliderControlsDescriptionVBox' ),

      // a11y - wrap all descriptions in an unordered list
      tagName: 'ul'
    } );

    var generalNavigationDescriptionVBox = new VBox( {
      children: [
        tabKeyContentRow.description,
        shiftPlusTabContentRow.description,
        escapeKeyContentRow.description ],
      align: 'left',
      spacing: ICON_VERTICAL_SPACING,
      tandem: tandem.createTandem( 'generalNavigationDescriptionVBox' ),

      // a11y - wrap all descriptions in an unordered list
      tagName: 'ul'
    } );

    // the two boxes are aligned horizontally, vertical spacing is guaranteed
    // to be corrected by the AlignGroup
    var sliderControlsContentHBox = new HBox( {
      children: [ sliderControlsIconVBox, sliderControlsDescriptionVBox ],
      spacing: 15,
      tandem: tandem.createTandem( 'contentHBox' ),
    } );

    var sliderControlsContentAndHeadingVbox = new VBox( {
      children: [ sliderControlsHeading, sliderControlsContentHBox ],
      spacing: 15
    } );

    var generalNavigationContentHBox = new HBox( {
      children: [ generalNavigationIconVBox, generalNavigationDescriptionVBox ],
      spacing: 15
    } );

    var generalNavigationContentAndHeadingVBox = new VBox( {
      children: [ generalNavigationHeading, generalNavigationContentHBox ],
      spacing: 15
    } );

    var contentHBox = new HBox( {
      children: [ sliderControlsContentAndHeadingVbox, generalNavigationContentAndHeadingVBox ],
      spacing: 15
    } );

    Panel.call( this, contentHBox, {
      stroke: null,
      fill: 'rgb( 214, 237, 249 )',
      tandem: tandem,

      // a11y
      tagName: 'div'
    } );

    // the content should be centered in the dialog relative to the description text
    var oldCenter = contentHBox.centerX;
    var newCenter = sliderControlsDescriptionVBox.centerX;
    var spacerWidth = newCenter - oldCenter + 2 * DIALOG_MARGIN;
    contentHBox.addChild( new Spacer( spacerWidth, 0, {
      tandem: tandem.createTandem( 'spacer' )
    } ) );
  }

  ohmsLaw.register( 'OhmsLawKeyboardHelpContent', OhmsLawKeyboardHelpContent );

  return inherit( Panel, OhmsLawKeyboardHelpContent );
} );
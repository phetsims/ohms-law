// Copyright 2017-2022, University of Colorado Boulder

/**
 * The main screen class for the 'Ohms Law' simulation.  This is where the main model and view instances are
 * created and inserted into the framework.
 *
 * @author Martin Veillette (Berea College)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import SliderControlsAndBasicActionsKeyboardHelpContent from '../../../scenery-phet/js/keyboard/help/SliderControlsAndBasicActionsKeyboardHelpContent.js';
import { Color } from '../../../scenery/js/imports.js';
import ohmsLaw from '../ohmsLaw.js';
import OhmsLawModel from './model/OhmsLawModel.js';
import OhmsLawScreenView from './view/OhmsLawScreenView.js';

class OhmsLawScreen extends Screen {
  constructor( tandem ) {
    super(
      () => new OhmsLawModel( tandem.createTandem( 'model' ) ),
      model => new OhmsLawScreenView( model, tandem.createTandem( 'view' ) ),
      {
        backgroundColorProperty: new Property( new Color( '#ffffdf' ), {
          tandem: tandem.createTandem( 'backgroundColorProperty' ),
          phetioValueType: Color.ColorIO
        } ),
        tandem: tandem,

        createKeyboardHelpNode: () => new SliderControlsAndBasicActionsKeyboardHelpContent()
      }
    );
  }
}

ohmsLaw.register( 'OhmsLawScreen', OhmsLawScreen );
export default OhmsLawScreen;
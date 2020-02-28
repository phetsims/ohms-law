// Copyright 2017-2020, University of Colorado Boulder

/**
 * The main screen class for the 'Ohms Law' simulation.  This is where the main model and view instances are
 * created and inserted into the framework.
 *
 * @author Martin Veillette (Berea College)
 */

import Property from '../../../axon/js/Property.js';
import PropertyIO from '../../../axon/js/PropertyIO.js';
import Screen from '../../../joist/js/Screen.js';
import inherit from '../../../phet-core/js/inherit.js';
import Color from '../../../scenery/js/util/Color.js';
import ColorIO from '../../../scenery/js/util/ColorIO.js';
import ohmsLaw from '../ohmsLaw.js';
import OhmsLawModel from './model/OhmsLawModel.js';
import OhmsLawScreenView from './view/OhmsLawScreenView.js';

/**
 * @constructor
 */
function OhmsLawScreen( tandem ) {
  Screen.call( this,
    function() { return new OhmsLawModel( tandem.createTandem( 'model' ) ); },
    function( model ) { return new OhmsLawScreenView( model, tandem.createTandem( 'view' ) ); },
    {
      backgroundColorProperty: new Property( new Color( '#ffffdf' ), {
        tandem: tandem.createTandem( 'backgroundColorProperty' ),
        phetioType: PropertyIO( ColorIO )
      } ),
      tandem: tandem
    }
  );
}

ohmsLaw.register( 'OhmsLawScreen', OhmsLawScreen );

inherit( Screen, OhmsLawScreen );
export default OhmsLawScreen;
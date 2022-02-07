// Copyright 2019-2022, University of Colorado Boulder

/**
 * A sound generator used to indicate the amount of current flowing in the Ohm's Law simulation.  This monitors the
 * current property, plays a loop for a while when the current changes, alters the nature of the loop as the amount of
 * current changes, and fades the sound in and out once the current stabilizes at a new level.
 *
 * @author John Blanco
 */

import merge from '../../../../phet-core/js/merge.js';
import SoundClip from '../../../../tambo/js/sound-generators/SoundClip.js';
import currentV3Loop_mp3 from '../../../sounds/currentV3Loop_mp3.js';
import ohmsLaw from '../../ohmsLaw.js';
import OhmsLawConstants from '../OhmsLawConstants.js';

// constants
const PRE_FADE_TIME = 0.1; // in seconds
const FADE_OUT_TIME_CONSTANT = 3; // in seconds, larger values indicate faster fade out, see usage for details
const FADE_COMPLETE_OUTPUT_LEVEL = 0.001; // level at which fade out is considered complete and level is set to zero

class CurrentSoundGenerator extends SoundClip {

  /**
   * {NumberProperty} currentProperty
   * @constructor
   */
  constructor( currentProperty, options ) {

    options = merge( {
      initialOutputLevel: 1
    }, options );
    options.loop = true; // must be a loop to work properly

    super( currentV3Loop_mp3, options );

    // @private {number} - max output level, used for fading
    this.maxOutputLevel = options.initialOutputLevel;

    // countdown timer used to play the current sound for a while, then stop
    this.fadeCountdownTimer = Number.NEGATIVE_INFINITY;

    // function to turn loop on/off and update playback rate
    const updateSoundGeneration = current => {

      // any change turns on the playback
      if ( !this.isPlaying ) {
        this.play();
      }
      this.fadeCountdownTimer = PRE_FADE_TIME;

      // calculate the normalized current value using a logarithmic formula to better handle the large range
      const normalizedCurrent = Math.log( ( current / 1000 ) / OhmsLawConstants.CURRENT_RANGE.min ) /
                                Math.log( OhmsLawConstants.CURRENT_RANGE.max / OhmsLawConstants.CURRENT_RANGE.min );

      // Calculate the playback rate based on the normalized current.  The formula came from the design document, and
      // ranges from 0.5 to 2.0 times the default playback rate.
      const playbackRate = 0.5 + 1.5 * Math.pow( normalizedCurrent, 2 );

      // set the playback rate for all loops
      this.setPlaybackRate( playbackRate );
    };

    // start the loop playing when the current changes
    currentProperty.lazyLink( updateSoundGeneration );

    this.disposeCurrentSoundGenerator = () => { currentProperty.unlink( updateSoundGeneration ); };
  }

  /**
   * @param {number} dt
   * @public
   */
  step( dt ) {
    if ( this.fadeCountdownTimer > Number.NEGATIVE_INFINITY ) {

      // decrement the fade countdown timer
      this.fadeCountdownTimer -= dt;

      // if the countdown timer is greater than the pre-fade time, stay at max output level
      if ( this.fadeCountdownTimer > 0 ) {

        // not fading out yet, keep the level at the max
        this.setOutputLevel( this.maxOutputLevel );
      }
      else if ( this.fadeCountdownTimer > Number.NEGATIVE_INFINITY ) {

        // fading out, calculate the level using the exponential decay formula
        const level = this.maxOutputLevel * Math.pow( Math.E, FADE_OUT_TIME_CONSTANT * this.fadeCountdownTimer );
        if ( level > FADE_COMPLETE_OUTPUT_LEVEL ) {
          this.setOutputLevel( level );
        }
        else {

          // fade out complete
          this.setOutputLevel( 0 );
          this.fadeCountdownTimer = Number.NEGATIVE_INFINITY;
        }
      }
    }
  }

  /**
   * @public
   */
  reset() {
    if ( this.isPlaying ) {
      this.stop();
    }
    this.fadeCountdownTimer = Number.NEGATIVE_INFINITY;
  }

  /**
   * @public
   */
  dispose() {
    this.disposeCurrentSoundGenerator();
  }

}

ohmsLaw.register( 'CurrentSoundGenerator', CurrentSoundGenerator );

export default CurrentSoundGenerator;
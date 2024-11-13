/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,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';
const soundByteArray = base64SoundToByteArray( phetAudioContext, soundURI );
const unlock = asyncLoader.createLock( soundURI );
const wrappedAudioBuffer = new WrappedAudioBuffer();

// safe way to unlock
let unlocked = false;
const safeUnlock = () => {
  if ( !unlocked ) {
    unlock();
    unlocked = true;
  }
};

const onDecodeSuccess = decodedAudio => {
  if ( wrappedAudioBuffer.audioBufferProperty.value === null ) {
    wrappedAudioBuffer.audioBufferProperty.set( decodedAudio );
    safeUnlock();
  }
};
const onDecodeError = decodeError => {
  console.warn( 'decode of audio data failed, using stubbed sound, error: ' + decodeError );
  wrappedAudioBuffer.audioBufferProperty.set( phetAudioContext.createBuffer( 1, 1, phetAudioContext.sampleRate ) );
  safeUnlock();
};
const decodePromise = phetAudioContext.decodeAudioData( soundByteArray.buffer, onDecodeSuccess, onDecodeError );
if ( decodePromise ) {
  decodePromise
    .then( decodedAudio => {
      if ( wrappedAudioBuffer.audioBufferProperty.value === null ) {
        wrappedAudioBuffer.audioBufferProperty.set( decodedAudio );
        safeUnlock();
      }
    } )
    .catch( e => {
      console.warn( 'promise rejection caught for audio decode, error = ' + e );
      safeUnlock();
    } );
}
export default wrappedAudioBuffer;
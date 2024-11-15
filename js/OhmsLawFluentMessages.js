// Copyright 2024, University of Colorado Boulder

/**
 * Prototype for preparing fluent strings for Ohm's Law. Fluent strings are loaded in a preload script. They are then
 * processed into Properties so that they can be used in the simulation.
 *
 * This is for a proof of concept. By creating Properties, we get a good sense of what usages would be like in simulation
 * code. But it is a partial implementation. The full solution needs to consider PhET-iO control, and be more integrated
 * into PhET's string modules.
 *
 * Classes in this file support converting fluent data types into Properties and strings. Fluent has the following concepts:
 * - Bundle: A collection of messages for a single locale.
 * - Message: An data structure in a FluentBundle. The message can be formatted with arguments into a final string.
 *            If there are no arguments, the message is a string.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import DerivedProperty from '../../axon/js/DerivedProperty.js';
import { isTReadOnlyProperty } from '../../axon/js/TReadOnlyProperty.js';
import localeProperty from '../../joist/js/i18n/localeProperty.js';

// TODO: Create a bundle for every supported locale, https://github.com/phetsims/joist/issues/992
const englishBundle = new Fluent.FluentBundle( 'en' );
const bundleMap = new Map();

bundleMap.set( 'en', englishBundle );

// Currently, we pre-load english strings. Each bundle needs to load its own language.
const resource = Fluent.FluentResource.fromString( phet.chipper.fluentStrings );
englishBundle.addResource( resource );

/**
 * A Property that provides the current bundle for the current locale.
 * TODO: We should only need one instance of this, right? Could be more efficient, https://github.com/phetsims/joist/issues/992
 */
class LocalizedBundleProperty extends DerivedProperty {
  constructor( id ) {

    // Just to get Property interface working, but this needs to be bi-directional
    // and use LocalizedString/LocalizedStringProperty.
    super( [ localeProperty ], locale => {

      // fall back to the english bundle
      const bundleToUse = bundleMap.has( locale ) ? bundleMap.get( locale ) : englishBundle;

      // Fall back to the english bundle if the bundleToUse does not have the message.
      return bundleToUse.hasMessage( id ) ? bundleToUse : englishBundle;
    } );
  }
}

/**
 * A Property whose value is a message from a bundle.
 */
class LocalizedMessageProperty extends DerivedProperty {
  constructor( bundleProperty, id ) {

    // Just to get Property interface working, but this needs to be bi-directional
    // and use LocalizedString/LocalizedStringProperty stack.
    super( [ bundleProperty ], locale => {
      return bundleProperty.value.getMessage( id );
    } );

    this.bundleProperty = bundleProperty;
  }
}

/**
 * A Property whose value is a message from a bundle with arguments. Each argument can be a Property,
 * and the message will be updated either the message or the argument changes..
 */
class PatternMessageProperty extends DerivedProperty {
  constructor( messageProperty, values ) {
    const dependencies = [ messageProperty ];
    const keys = Object.keys( values );
    keys.forEach( key => {
      if ( isTReadOnlyProperty( values[ key ] ) ) {
        dependencies.push( values[ key ] );
      }
    } );

    super( dependencies, ( message, ...unusedArgs ) => {
      const args = {};
      keys.forEach( key => {
        let value = values[ key ];

        // If the value is a Property, get the value.
        if ( isTReadOnlyProperty( value ) ) {
          value = value.value;
        }

        // If the value is an EnumerationValue, automatically use the enum name.
        if ( value && value.name ) {
          value = value.name;
        }

        args[ key ] = value;
      } );

      // Format the message with the arguments to resolve a string.
      return messageProperty.bundleProperty.value.format( message, args );
    } );
  }
}

/**
 * Converts a camelCase id to a message key. For example, 'choose-unit-for-current' becomes
 * 'chooseUnitForCurrentMessageProperty'.
 */
const fluentIdToMessageKey = id => {
  return `${id.replace( /-([a-z])/g, ( match, letter ) => letter.toUpperCase() )}MessageProperty`;
};

const OhmsLawFluentMessages = {};
for ( const [ id ] of englishBundle.messages ) {

  // So that you can look up fluent strings with camelCase.
  OhmsLawFluentMessages[ fluentIdToMessageKey( id ) ] = new LocalizedMessageProperty(
    new LocalizedBundleProperty( id ), id
  );
}

export default OhmsLawFluentMessages;
export { PatternMessageProperty };
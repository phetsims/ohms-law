// Copyright 2021-2022, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import TReadOnlyProperty from '../../axon/js/TReadOnlyProperty.js';
import ohmsLaw from './ohmsLaw.js';

type StringsType = {
  'ohms-law': {
    'title': string;
    'titleProperty': TReadOnlyProperty<string>;
  };
  'current': string;
  'currentProperty': TReadOnlyProperty<string>;
  'resistance': string;
  'resistanceProperty': TReadOnlyProperty<string>;
  'voltage': string;
  'voltageProperty': TReadOnlyProperty<string>;
  'voltageSymbol': string;
  'voltageSymbolProperty': TReadOnlyProperty<string>;
  'resistanceSymbol': string;
  'resistanceSymbolProperty': TReadOnlyProperty<string>;
  'currentSymbol': string;
  'currentSymbolProperty': TReadOnlyProperty<string>;
  'voltageUnits': string;
  'voltageUnitsProperty': TReadOnlyProperty<string>;
  'currentUnits': string;
  'currentUnitsProperty': TReadOnlyProperty<string>;
  'currentAmpUnits': string;
  'currentAmpUnitsProperty': TReadOnlyProperty<string>;
  'units': string;
  'unitsProperty': TReadOnlyProperty<string>;
  'milliampsMA': string;
  'milliampsMAProperty': TReadOnlyProperty<string>;
  'ampsA': string;
  'ampsAProperty': TReadOnlyProperty<string>;
};

const ohmsLawStrings = getStringModule( 'OHMS_LAW' ) as StringsType;

ohmsLaw.register( 'ohmsLawStrings', ohmsLawStrings );

export default ohmsLawStrings;

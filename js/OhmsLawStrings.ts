// Copyright 2021-2022, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import LinkableProperty from '../../axon/js/LinkableProperty.js';
import ohmsLaw from './ohmsLaw.js';

type StringsType = {
  'ohms-law': {
    'title': string;
    'titleStringProperty': LinkableProperty<string>;
  };
  'current': string;
  'currentStringProperty': LinkableProperty<string>;
  'resistance': string;
  'resistanceStringProperty': LinkableProperty<string>;
  'voltage': string;
  'voltageStringProperty': LinkableProperty<string>;
  'voltageSymbol': string;
  'voltageSymbolStringProperty': LinkableProperty<string>;
  'resistanceSymbol': string;
  'resistanceSymbolStringProperty': LinkableProperty<string>;
  'currentSymbol': string;
  'currentSymbolStringProperty': LinkableProperty<string>;
  'voltageUnits': string;
  'voltageUnitsStringProperty': LinkableProperty<string>;
  'currentUnits': string;
  'currentUnitsStringProperty': LinkableProperty<string>;
  'currentAmpUnits': string;
  'currentAmpUnitsStringProperty': LinkableProperty<string>;
  'units': string;
  'unitsStringProperty': LinkableProperty<string>;
  'milliampsMA': string;
  'milliampsMAStringProperty': LinkableProperty<string>;
  'ampsA': string;
  'ampsAStringProperty': LinkableProperty<string>;
};

const OhmsLawStrings = getStringModule( 'OHMS_LAW' ) as StringsType;

ohmsLaw.register( 'OhmsLawStrings', OhmsLawStrings );

export default OhmsLawStrings;

// Copyright 2024-2025, University of Colorado Boulder
    
/* eslint-disable */
/* @formatter:off */

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */

import getFluentModule from '../../../chipper/js/browser/getFluentModule.js';
import ohmsLaw from '../../js/ohmsLaw.js';
import LocalizedMessageProperty from '../../../chipper/js/browser/LocalizedMessageProperty.js';

type OhmsLawFluentType = {
  'summaryPlayArea': LocalizedMessageProperty;
  'summaryControlArea': LocalizedMessageProperty;
  'rightNow': LocalizedMessageProperty;
  'voltageSummaryPattern': LocalizedMessageProperty;
  'resistanceSummaryPattern': LocalizedMessageProperty;
  'currentSummaryPattern': LocalizedMessageProperty;
  'summaryLookForSliders': LocalizedMessageProperty;
  'ohmsLawEquation': LocalizedMessageProperty;
  'ohmsLawDefinition': LocalizedMessageProperty;
  'relativeSizePattern': LocalizedMessageProperty;
  'circuitLabel': LocalizedMessageProperty;
  'circuitDescription': LocalizedMessageProperty;
  'batteriesSupplyPattern': LocalizedMessageProperty;
  'resistanceDotsPattern': LocalizedMessageProperty;
  'currentDescriptionPattern': LocalizedMessageProperty;
  'sliderControls': LocalizedMessageProperty;
  'slidersDescription': LocalizedMessageProperty;
  'resistanceUnitsPattern': LocalizedMessageProperty;
  'voltageUnitsPattern': LocalizedMessageProperty;
  'resistanceSliderLabel': LocalizedMessageProperty;
  'voltageSliderLabel': LocalizedMessageProperty;
  'sliderChangeAlertPattern': LocalizedMessageProperty;
  'chooseUnitForCurrent': LocalizedMessageProperty;
};

const OhmsLawMessages = getFluentModule( {
  "en": "-amps = amps\n-milliamps = milliamps\n\nsummaryPlayArea = In the Play Area you find the equation for Ohm's Law, <strong>V</strong> equals <strong>I</strong> times <strong>R</strong>, and a circuit. Voltage and resistance sliders allow changes to the equation and circuit.\nsummaryControlArea = The Control Area has radio buttons to switch between milliamps and amps, and a button to reset the sim.\n\nrightNow = Right now,\n\nvoltageSummaryPattern = voltage, <strong>V</strong>, is <em>{ $value } volts</em>\nresistanceSummaryPattern = resistance, <strong>R</strong>, is <em>{ $value } ohms</em>\ncurrentSummaryPattern = current, <strong>I</strong>, is <em>{ $value } { $unit ->\n  [AMPS] { -amps }\n  *[MILLIAMPS] { -milliamps }\n}</em>\n\nsummaryLookForSliders = Look for voltage and resistance sliders to play, or read on for details about equation and circuit.\n\nohmsLawEquation = Ohm's Law Equation\nohmsLawDefinition = Voltage, <strong>V</strong>, is equal to Current, <strong>I</strong>, times Resistance, <strong>R</strong>.\n\n-muchMuchSmaller = much much smaller than\n-muchSmaller = much smaller than\n-slightlySmaller = slightly smaller than\n-comparable = comparable to\n-slightlyLarger = slightly larger than\n-muchLarger = much larger than\n-muchMuchLarger = much much larger than\n\nrelativeSizePattern = In equation, <strong>letter V</strong> is <em>{ $iComparison ->\n  [ MUCH_MUCH_SMALLER ] { -muchMuchSmaller }\n  [ MUCH_SMALLER ] { -muchSmaller }\n  [ SLIGHTLY_SMALLER ] { -slightlySmaller }\n  [ COMPARABLE ] { -comparable }\n  [ SLIGHTLY_LARGER ] { -slightlyLarger }\n  [ MUCH_LARGER ] { -muchLarger }\n  *[ MUCH_MUCH_LARGER ] { -muchMuchLarger }\n}</em> <strong>letter I</strong> and <em>{ $rComparison ->\n  [ MUCH_MUCH_SMALLER ] { -muchMuchSmaller }\n  [ MUCH_SMALLER ] { -muchSmaller }\n  [ SLIGHTLY_SMALLER ] { -slightlySmaller }\n  [ COMPARABLE ] { -comparable }\n  [ SLIGHTLY_LARGER ] { -slightlyLarger }\n  [ MUCH_LARGER ] { -muchLarger }\n  *[ MUCH_MUCH_LARGER ] { -muchMuchLarger }\n}</em> <strong>letter R</strong>.\n\ncircuitLabel = The Circuit\ncircuitDescription = A pair of wires connect a resistor to a series of batteries. In circuit,\n\nbatteriesSupplyPattern = batteries supply <em>{ $voltage } volts</em>\n\nresistanceDotsPattern = resistor shows <em> a { $impurities ->\n  [TINY] tiny\n  [VERY_SMALL] very small\n  [SMALL] small\n  [MEDIUM] medium\n  [LARGE] large\n  [VERY_LARGE] very large\n  *[HUGE] huge\n} amount of impurities</em>\n\ncurrentDescriptionPattern = <em>{ $arrowSize ->\n  [TINY] Tiny\n  [VERY_SMALL] Very small\n  [SMALL] Small\n  [MEDIUM] Medium size\n  [LARGE] Large\n  [VERY_LARGE] Very large\n  *[HUGE] Huge\n} arrows</em> indicate a current flowing clockwise at <em>{ $value } { $unit ->\n  [AMPS] { -amps }\n  *[MILLIAMPS] { -milliamps }\n}</em>\n\n\nsliderControls = Slider Controls\nslidersDescription = Voltage and resistance sliders allow changes to equation and circuit.\n\nresistanceUnitsPattern = { $value } Ohms\nvoltageUnitsPattern = { $value } Volts\n\nresistanceSliderLabel = R, Resistance\nvoltageSliderLabel = V, Voltage\n\n-letterR = R\n-letterV = V\n-shrinks = shrinks\n-grows = grows\n-shrinksALot = shrinks a lot\n-growsALot = grows a lot\nsliderChangeAlertPattern = As letter { $firstLetter ->\n  [R] { -letterR }\n  *[V] { -letterV }\n} { $firstSizeChange ->\n  [SHRINKS] { -shrinks }\n  [SHRINKS_A_LOT] { -shrinksALot }\n  [GROWS] { -grows }\n  *[GROWS_A_LOT] { -growsALot }\n}, letter I { $iSizeChange ->\n  [SHRINKS] { -shrinks }\n  [SHRINKS_A_LOT] { -shrinksALot }\n  [GROWS] { -grows }\n  *[GROWS_A_LOT] { -growsALot }\n}. Current now { $currentVal } { $unit ->\n  [AMPS] { -amps }\n  *[MILLIAMPS] { -milliamps }\n}.\n\nchooseUnitForCurrent = Choose unit for current.\n",
  "fr": "contents-in-french = Some french string"
} ) as OhmsLawFluentType;

ohmsLaw.register( 'OhmsLawMessages', OhmsLawMessages );

export default OhmsLawMessages;

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
  "en": "-amps = amps\r\n-milliamps = milliamps\r\n\r\nsummaryPlayArea = In the Play Area you find the equation for Ohm's Law, <strong>V</strong> equals <strong>I</strong> times <strong>R</strong>, and a circuit. Voltage and resistance sliders allow changes to the equation and circuit.\r\nsummaryControlArea = The Control Area has radio buttons to switch between milliamps and amps, and a button to reset the sim.\r\n\r\nrightNow = Right now,\r\n\r\nvoltageSummaryPattern = voltage, <strong>V</strong>, is <em>{ $value } volts</em>\r\nresistanceSummaryPattern = resistance, <strong>R</strong>, is <em>{ $value } ohms</em>\r\ncurrentSummaryPattern = current, <strong>I</strong>, is <em>{ $value } { $unit ->\r\n  [AMPS] { -amps }\r\n  *[MILLIAMPS] { -milliamps }\r\n}</em>\r\n\r\nsummaryLookForSliders = Look for voltage and resistance sliders to play, or read on for details about equation and circuit.\r\n\r\nohmsLawEquation = Ohm's Law Equation\r\nohmsLawDefinition = Voltage, <strong>V</strong>, is equal to Current, <strong>I</strong>, times Resistance, <strong>R</strong>.\r\n\r\n-muchMuchSmaller = much much smaller than\r\n-muchSmaller = much smaller than\r\n-slightlySmaller = slightly smaller than\r\n-comparable = comparable to\r\n-slightlyLarger = slightly larger than\r\n-muchLarger = much larger than\r\n-muchMuchLarger = much much larger than\r\n\r\nrelativeSizePattern = In equation, <strong>letter V</strong> is <em>{ $iComparison ->\r\n  [ MUCH_MUCH_SMALLER ] { -muchMuchSmaller }\r\n  [ MUCH_SMALLER ] { -muchSmaller }\r\n  [ SLIGHTLY_SMALLER ] { -slightlySmaller }\r\n  [ COMPARABLE ] { -comparable }\r\n  [ SLIGHTLY_LARGER ] { -slightlyLarger }\r\n  [ MUCH_LARGER ] { -muchLarger }\r\n  *[ MUCH_MUCH_LARGER ] { -muchMuchLarger }\r\n}</em> <strong>letter I</strong> and <em>{ $rComparison ->\r\n  [ MUCH_MUCH_SMALLER ] { -muchMuchSmaller }\r\n  [ MUCH_SMALLER ] { -muchSmaller }\r\n  [ SLIGHTLY_SMALLER ] { -slightlySmaller }\r\n  [ COMPARABLE ] { -comparable }\r\n  [ SLIGHTLY_LARGER ] { -slightlyLarger }\r\n  [ MUCH_LARGER ] { -muchLarger }\r\n  *[ MUCH_MUCH_LARGER ] { -muchMuchLarger }\r\n}</em> <strong>letter R</strong>.\r\n\r\ncircuitLabel = The Circuit\r\ncircuitDescription = A pair of wires connect a resistor to a series of batteries. In circuit,\r\n\r\nbatteriesSupplyPattern = batteries supply <em>{ $voltage } volts</em>\r\n\r\nresistanceDotsPattern = resistor shows <em> a { $impurities ->\r\n  [TINY] tiny\r\n  [VERY_SMALL] very small\r\n  [SMALL] small\r\n  [MEDIUM] medium\r\n  [LARGE] large\r\n  [VERY_LARGE] very large\r\n  *[HUGE] huge\r\n} amount of impurities</em>\r\n\r\ncurrentDescriptionPattern = <em>{ $arrowSize ->\r\n  [TINY] Tiny\r\n  [VERY_SMALL] Very small\r\n  [SMALL] Small\r\n  [MEDIUM] Medium size\r\n  [LARGE] Large\r\n  [VERY_LARGE] Very large\r\n  *[HUGE] Huge\r\n} arrows</em> indicate a current flowing clockwise at <em>{ $value } { $unit ->\r\n  [AMPS] { -amps }\r\n  *[MILLIAMPS] { -milliamps }\r\n}</em>\r\n\r\n\r\nsliderControls = Slider Controls\r\nslidersDescription = Voltage and resistance sliders allow changes to equation and circuit.\r\n\r\nresistanceUnitsPattern = { $value } Ohms\r\nvoltageUnitsPattern = { $value } Volts\r\n\r\nresistanceSliderLabel = R, Resistance\r\nvoltageSliderLabel = V, Voltage\r\n\r\n-letterR = R\r\n-letterV = V\r\n-shrinks = shrinks\r\n-grows = grows\r\n-shrinksALot = shrinks a lot\r\n-growsALot = grows a lot\r\nsliderChangeAlertPattern = As letter { $firstLetter ->\r\n  [R] { -letterR }\r\n  *[V] { -letterV }\r\n} { $firstSizeChange ->\r\n  [SHRINKS] { -shrinks }\r\n  [SHRINKS_A_LOT] { -shrinksALot }\r\n  [GROWS] { -grows }\r\n  *[GROWS_A_LOT] { -growsALot }\r\n}, letter I { $iSizeChange ->\r\n  [SHRINKS] { -shrinks }\r\n  [SHRINKS_A_LOT] { -shrinksALot }\r\n  [GROWS] { -grows }\r\n  *[GROWS_A_LOT] { -growsALot }\r\n}. Current now { $currentVal } { $unit ->\r\n  [AMPS] { -amps }\r\n  *[MILLIAMPS] { -milliamps }\r\n}.\r\n\r\nchooseUnitForCurrent = Choose unit for current.\r\n",
  "fr": "contents-in-french = Some french string"
} ) as OhmsLawFluentType;

ohmsLaw.register( 'OhmsLawMessages', OhmsLawMessages );

export default OhmsLawMessages;

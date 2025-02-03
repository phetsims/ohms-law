// Copyright 2024-2025, University of Colorado Boulder
    
/* eslint-disable */
/* @formatter:off */

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */

import getFluentModule from '../../../chipper/js/browser/getFluentModule.js';
import ohmsLaw from '../../js/ohmsLaw.js';
import LocalizedMessageProperty from '../../../chipper/js/browser/LocalizedMessageProperty.js';
import type TReadOnlyProperty from '../../../axon/js/TReadOnlyProperty.js';

type OhmsLawFluentType = {
  'summaryPlayAreaMessageProperty': TReadOnlyProperty<string>;
  'summaryControlAreaMessageProperty': TReadOnlyProperty<string>;
  'rightNowMessageProperty': TReadOnlyProperty<string>;
  'voltageSummaryPatternMessageProperty': LocalizedMessageProperty;
  'resistanceSummaryPatternMessageProperty': LocalizedMessageProperty;
  'currentSummaryPatternMessageProperty': LocalizedMessageProperty;
  'summaryLookForSlidersMessageProperty': TReadOnlyProperty<string>;
  'ohmsLawEquationMessageProperty': TReadOnlyProperty<string>;
  'ohmsLawDefinitionMessageProperty': TReadOnlyProperty<string>;
  'relativeSizePatternMessageProperty': LocalizedMessageProperty;
  'circuitLabelMessageProperty': TReadOnlyProperty<string>;
  'circuitDescriptionMessageProperty': TReadOnlyProperty<string>;
  'batteriesSupplyPatternMessageProperty': LocalizedMessageProperty;
  'resistanceDotsPatternMessageProperty': LocalizedMessageProperty;
  'currentDescriptionPatternMessageProperty': LocalizedMessageProperty;
  'sliderControlsMessageProperty': TReadOnlyProperty<string>;
  'slidersDescriptionMessageProperty': TReadOnlyProperty<string>;
  'resistanceUnitsPatternMessageProperty': LocalizedMessageProperty;
  'voltageUnitsPatternMessageProperty': LocalizedMessageProperty;
  'resistanceSliderLabelMessageProperty': TReadOnlyProperty<string>;
  'voltageSliderLabelMessageProperty': TReadOnlyProperty<string>;
  'sliderChangeAlertPatternMessageProperty': LocalizedMessageProperty;
  'chooseUnitForCurrentMessageProperty': TReadOnlyProperty<string>;
};

const OhmsLawMessages = getFluentModule( {
  "en": "\n-amps = amps\n-milliamps = milliamps\n\n-muchMuchSmaller = much much smaller than\n-muchSmaller = much smaller than\n-slightlySmaller = slightly smaller than\n-comparable = comparable to\n-slightlyLarger = slightly larger than\n-muchLarger = much larger than\n-muchMuchLarger = much much larger than\n\n-letterR = R\n-letterV = V\n-shrinks = shrinks\n-grows = grows\n-shrinksALot = shrinks a lot\n-growsALot = grows a lot\n\n\n\nsummaryPlayArea = In the Play Area you find the equation for Ohm's Law, <strong>V</strong> equals <strong>I</strong> times <strong>R</strong>, and a circuit. Voltage and resistance sliders allow changes to the equation and circuit.\n\nsummaryControlArea = The Control Area has radio buttons to switch between milliamps and amps, and a button to reset the sim.\n\n\nrightNow = Right now,\nvoltageSummaryPattern = voltage, <strong>V</strong>, is <em>{ $value } volts</em>\nresistanceSummaryPattern = resistance, <strong>R</strong>, is <em>{ $value } ohms</em>\ncurrentSummaryPattern = current, <strong>I</strong>, is <em>{ $value } { $unit ->\n  [AMPS] { -amps }\n  *[MILLIAMPS] { -milliamps }\n}</em>\n\nsummaryLookForSliders = Look for voltage and resistance sliders to play, or read on for details about equation and circuit.\n\n\nohmsLawEquation = Ohm's Law Equation\nohmsLawDefinition = Voltage, <strong>V</strong>, is equal to Current, <strong>I</strong>, times Resistance, <strong>R</strong>.\n\nrelativeSizePattern = In equation, <strong>letter V</strong> is <em>{ $iComparison ->\n  [ MUCH_MUCH_SMALLER ] { -muchMuchSmaller }\n  [ MUCH_SMALLER ] { -muchSmaller }\n  [ SLIGHTLY_SMALLER ] { -slightlySmaller }\n  [ COMPARABLE ] { -comparable }\n  [ SLIGHTLY_LARGER ] { -slightlyLarger }\n  [ MUCH_LARGER ] { -muchLarger }\n  *[ MUCH_MUCH_LARGER ] { -muchMuchLarger }\n}</em> <strong>letter I</strong> and <em>{ $rComparison ->\n  [ MUCH_MUCH_SMALLER ] { -muchMuchSmaller }\n  [ MUCH_SMALLER ] { -muchSmaller }\n  [ SLIGHTLY_SMALLER ] { -slightlySmaller }\n  [ COMPARABLE ] { -comparable }\n  [ SLIGHTLY_LARGER ] { -slightlyLarger }\n  [ MUCH_LARGER ] { -muchLarger }\n  *[ MUCH_MUCH_LARGER ] { -muchMuchLarger }\n}</em> <strong>letter R</strong>.\n\n\ncircuitLabel = The Circuit\ncircuitDescription = A pair of wires connect a resistor to a series of batteries. In circuit,\nbatteriesSupplyPattern = batteries supply <em>{ $voltage } volts</em>\nresistanceDotsPattern = resistor shows <em> a { $impurities ->\n  [TINY] tiny\n  [VERY_SMALL] very small\n  [SMALL] small\n  [MEDIUM] medium\n  [LARGE] large\n  [VERY_LARGE] very large\n  *[HUGE] huge\n} amount of impurities</em>\ncurrentDescriptionPattern = <em>{ $arrowSize ->\n  [TINY] tiny\n  [VERY_SMALL] very small\n  [SMALL] small\n  [MEDIUM] medium size\n  [LARGE] large\n  [VERY_LARGE] very large\n  *[HUGE] huge\n} arrows</em> indicate a current flowing clockwise at <em>{ $value } { $unit ->\n  [AMPS] { -amps }\n  *[MILLIAMPS] { -milliamps }\n}</em>\n\n\nsliderControls = Slider Controls\nslidersDescription = Voltage and resistance sliders allow changes to equation and circuit.\n \nresistanceUnitsPattern = { $value } Ohms\nvoltageUnitsPattern = { $value } Volts\n\nresistanceSliderLabel = R, Resistance\nvoltageSliderLabel = V, Voltage\n\n\n\n\n\nsliderChangeAlertPattern = As letter { $firstLetter ->\n  [R] { -letterR }\n  *[V] { -letterV }\n} { $firstSizeChange ->\n  [SHRINKS] { -shrinks }\n  [SHRINKS_A_LOT] { -shrinksALot }\n  [GROWS] { -grows }\n  *[GROWS_A_LOT] { -growsALot }\n}, letter I { $iSizeChange ->\n  [SHRINKS] { -shrinks }\n  [SHRINKS_A_LOT] { -shrinksALot }\n  [GROWS] { -grows }\n  *[GROWS_A_LOT] { -growsALot }\n}. Current now { $currentVal } { $unit ->\n  [AMPS] { -amps }\n  *[MILLIAMPS] { -milliamps }\n}.\n\nchooseUnitForCurrent = Choose unit for current.\n",
  "fr": "-amps = ampères\n-milliamps = milliampères\n\nsummaryPlayArea = Dans la zone de jeu, vous trouverez l'équation de la loi d'Ohm, <strong>V</strong> égale <strong>I</strong> multiplié par <strong>R</strong>, et un circuit. Les curseurs de tension et de résistance permettent de modifier l'équation et le circuit.\nsummaryControlArea = La zone de contrôle possède des boutons radio pour basculer entre milliampères et ampères, ainsi qu'un bouton pour réinitialiser la simulation."
} ) as unknown as OhmsLawFluentType;

ohmsLaw.register( 'OhmsLawMessages', OhmsLawMessages );

export default OhmsLawMessages;

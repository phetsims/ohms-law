# ....................................................................
# REUSABLE STRINGS
# Strings that may be used in multiple patterns below to assemble 
# accessible descriptions for both State and Responsive Descriptions.
# ....................................................................

# ..
# Resusable strings for units of current.
-amps = amps
-milliamps = milliamps

# ..
# Resusable strings for relative sizes of letters in the equation
-muchMuchSmaller = much much smaller than
-muchSmaller = much smaller than
-slightlySmaller = slightly smaller than
-comparable = comparable to
-slightlyLarger = slightly larger than
-muchLarger = much larger than
-muchMuchLarger = much much larger than

# ..
# Resusable strings for context response for changing size of letters
-letterR = R
-letterV = V
-shrinks = shrinks
-grows = grows
-shrinksALot = shrinks a lot
-growsALot = grows a lot

# ..................................................
# State descriptions for SCREEN SUMMARY 
# - Sim Overview
# - Current Details
# - Interaction Hint 
# ..................................................

# ..........
# Sim Overview

summaryPlayArea = In the Play Area you find the equation for Ohm's Law, <strong>V</strong> equals <strong>I</strong> times <strong>R</strong>, and a circuit. Voltage and resistance sliders allow changes to the equation and circuit.

summaryControlArea = The Control Area has radio buttons to switch between milliamps and amps, and a button to reset the sim.

# ..........
# Current Details
# Individual items describing the current values of voltage, resistance, and current.
# EXAMPLE: Right now,
#   voltage, V, is ⁨6.8⁩ volts
#   resistance, R, is ⁨821⁩ ohms
#   current, I, is ⁨8.3⁩ ⁨milliamps⁩

rightNow = Right now,
voltageSummaryPattern = voltage, <strong>V</strong>, is <em>{ $value } volts</em>
resistanceSummaryPattern = resistance, <strong>R</strong>, is <em>{ $value } ohms</em>
currentSummaryPattern = current, <strong>I</strong>, is <em>{ $value } { $unit ->
  [AMPS] { -amps }
  *[MILLIAMPS] { -milliamps }
}</em>

# ..........
# Interaction Hint
summaryLookForSliders = Look for voltage and resistance sliders to play, or read on for details about equation and circuit.
# COPY FOR REFERENCE: Look for voltage and resistance sliders to play, or read on for details about equation and circuit.

# ..................................................
# State descriptions for PLAY AREA
# ..................................................

# ..........
# Descriptions for Ohm's Law Equation
ohmsLawEquation = Ohm's Law Equation
ohmsLawDefinition = Voltage, <strong>V</strong>, is equal to Current, <strong>I</strong>, times Resistance, <strong>R</strong>.
# COPY FOR REFERENCE: Voltage, <strong>V</strong>, is equal to Current, <strong>I</strong>, times Resistance, <strong>R</strong>

# Description for the relative sizes of the letters in the equation
# EXAMPLE: In equation, letter V is ⁨{much much larger than}⁩ letter I and ⁨{comparable to⁩} letter R.
relativeSizePattern = In equation, <strong>letter V</strong> is <em>{ $iComparison ->
  [ MUCH_MUCH_SMALLER ] { -muchMuchSmaller }
  [ MUCH_SMALLER ] { -muchSmaller }
  [ SLIGHTLY_SMALLER ] { -slightlySmaller }
  [ COMPARABLE ] { -comparable }
  [ SLIGHTLY_LARGER ] { -slightlyLarger }
  [ MUCH_LARGER ] { -muchLarger }
  *[ MUCH_MUCH_LARGER ] { -muchMuchLarger }
}</em> <strong>letter I</strong> and <em>{ $rComparison ->
  [ MUCH_MUCH_SMALLER ] { -muchMuchSmaller }
  [ MUCH_SMALLER ] { -muchSmaller }
  [ SLIGHTLY_SMALLER ] { -slightlySmaller }
  [ COMPARABLE ] { -comparable }
  [ SLIGHTLY_LARGER ] { -slightlyLarger }
  [ MUCH_LARGER ] { -muchLarger }
  *[ MUCH_MUCH_LARGER ] { -muchMuchLarger }
}</em> <strong>letter R</strong>.

# ............
# Descriptions for The Cicuit

circuitLabel = The Circuit
circuitDescription = A pair of wires connect a resistor to a series of batteries. In circuit,
# ..
# DETAIL 1: Description for batteries and voltage
# EXAMPLE: batteries supply ⁨{6.8}⁩ volts
batteriesSupplyPattern = batteries supply <em>{ $voltage } volts</em>
# ..
# DETAIL 2: Description for resistor and impurities
# EXAMPLE: resistor shows {a ⁨very large⁩ amount of impurities}
resistanceDotsPattern = resistor shows <em> a { $impurities ->
  [TINY] tiny
  [VERY_SMALL] very small
  [SMALL] small
  [MEDIUM] medium
  [LARGE] large
  [VERY_LARGE] very large
  *[HUGE] huge
} amount of impurities</em>
# ..
# DETAIL 3: Description of the arrows and current.
# EXAMPLE: {very small⁩ arrows} indicate a current flowing clockwise at ⁨{9.0⁩} ⁨{milliamps⁩}
currentDescriptionPattern = <em>{ $arrowSize ->
  [TINY] tiny
  [VERY_SMALL] very small
  [SMALL] small
  [MEDIUM] medium size
  [LARGE] large
  [VERY_LARGE] very large
  *[HUGE] huge
} arrows</em> indicate a current flowing clockwise at <em>{ $value } { $unit ->
  [AMPS] { -amps }
  *[MILLIAMPS] { -milliamps }
}</em>

# ..........
# Descriptions for the voltage and resistance sliders.

# .. 
# Slider Controls and Help Text
sliderControls = Slider Controls
slidersDescription = Voltage and resistance sliders allow changes to equation and circuit.
 
# Values for Slider Controls
resistanceUnitsPattern = { $value } Ohms
voltageUnitsPattern = { $value } Volts

# Names/Labels for Slider Controls
resistanceSliderLabel = R, Resistance
voltageSliderLabel = V, Voltage

# ..................................................
# Object Responses for the voltage and resistance sliders.
# ..................................................
# EXAMPLE on focus of either slider
# {6.8} Volts, V, Voltage, slider
# {821} Ohms, R, Resistance, slider

# EXAMPLE on change of a slider
# {7.0} Volts
# {840} Ohms		

# ..................................................
# Context Responses for the voltage and resistance sliders.
# ..................................................

# ..
# Context response for changing size of letters
# EXAMPLE as voltage increases to 7.0 volts: 
#  As letter ⁨{V}⁩ {⁨grows}⁩, letter I {grows}⁩. Current now ⁨{8.3}⁩ {⁨milliamps}⁩.
# EXAMPLE as resistance increases to 840 ohms: 
#  As letter ⁨{R}⁩ ⁨{grows}⁩, letter I ⁨{shrinks⁩}. Current now ⁨{8.3⁩} {⁨milliamps⁩}.

sliderChangeAlertPattern = As letter { $firstLetter ->
  [R] { -letterR }
  *[V] { -letterV }
} { $firstSizeChange ->
  [SHRINKS] { -shrinks }
  [SHRINKS_A_LOT] { -shrinksALot }
  [GROWS] { -grows }
  *[GROWS_A_LOT] { -growsALot }
}, letter I { $iSizeChange ->
  [SHRINKS] { -shrinks }
  [SHRINKS_A_LOT] { -shrinksALot }
  [GROWS] { -grows }
  *[GROWS_A_LOT] { -growsALot }
}. Current now { $currentVal } { $unit ->
  [AMPS] { -amps }
  *[MILLIAMPS] { -milliamps }
}.

# .. 
# Units radio button group Help Text
chooseUnitForCurrent = Choose unit for current.
# NOTE: Group name and radio button names are visible strings 
# translated in the PhET Translation Utility.

# Reusable strings for the units of current.
-amps = amps
-milliamps = milliamps

# ..................................................................
# Overall screen summary descriptions.
# ..................................................................
summaryPlayArea = In the Play Area you find the equation for Ohm's Law, <strong>V</strong> equals <strong>I</strong> times <strong>R</strong>, and a circuit. Voltage and resistance sliders allow changes to the equation and circuit.
summaryControlArea = The Control Area has radio buttons to switch between milliamps and amps, and a button to reset the sim.

# ...
# Individual items describing the current values of voltage, resistance, and current.
rightNow = Right now,

voltageSummaryPattern = voltage, <strong>V</strong>, is <em>{ $value } volts</em>
resistanceSummaryPattern = resistance, <strong>R</strong>, is <em>{ $value } ohms</em>
currentSummaryPattern = current, <strong>I</strong>, is <em>{ $value } { $unit ->
  [AMPS] { -amps }
  *[MILLIAMPS] { -milliamps }
}</em>

summaryLookForSliders = Look for voltage and resistance sliders to play, or read on for details about equation and circuit.

# ..................................................................
# Description of the Ohm's Law equation.
# ..................................................................
# Equation strings
ohmsLawEquation = Ohm's Law Equation
ohmsLawDefinition = Voltage, <strong>V</strong>, is equal to Current, <strong>I</strong>, times Resistance, <strong>R</strong>.

# Reusable strings for the relative sizes of letters in the equation
-muchMuchSmaller = much much smaller than
-muchSmaller = much smaller than
-slightlySmaller = slightly smaller than
-comparable = comparable to
-slightlyLarger = slightly larger than
-muchLarger = much larger than
-muchMuchLarger = much much larger than

# Description for the relative sizes of the letters in the equation
relativeSizePattern = In equation, <strong>letter V</strong> is <em>{ $iComparison ->
  [ MUCH_MUCH_SMALLER ] { -much-much-smaller }
  [ MUCH_SMALLER ] { -much-smaller }
  [ SLIGHTLY_SMALLER ] { -slightly-smaller }
  [ COMPARABLE ] { -comparable }
  [ SLIGHTLY_LARGER ] { -slightly-larger }
  [ MUCH_LARGER ] { -much-larger }
  *[ MUCH_MUCH_LARGER ] { -much-much-larger }
}</em> <strong>letter I</strong> and <em>{ $rComparison ->
  [ MUCH_MUCH_SMALLER ] { -much-much-smaller }
  [ MUCH_SMALLER ] { -much-smaller }
  [ SLIGHTLY_SMALLER ] { -slightly-smaller }
  [ COMPARABLE ] { -comparable }
  [ SLIGHTLY_LARGER ] { -slightly-larger }
  [ MUCH_LARGER ] { -much-larger }
  *[ MUCH_MUCH_LARGER ] { -much-much-larger }
}</em> <strong>letter R</strong>.

# ..................................................................
# Description of the circuit.
# ..................................................................
circuitLabel = The Circuit
circuitDescription = A pair of wires connect a resistor to a series of batteries. In circuit,

# ...
# Item describing the state of the batteries
batteriesSupplyPattern = batteries supply <em>{ $voltage } volts</em>

# ...
# Description for the state of the resistor.
resistanceDotsPattern = resistor shows <em> a { $impurities ->
  [TINY] tiny
  [VERY_SMALL] very small
  [SMALL] small
  [MEDIUM] medium
  [LARGE] large
  [VERY_LARGE] very large
  *[HUGE] huge
} amount of impurities</em>

# ...
# Description of the arrows representing current.
currentDescriptionPattern = <em>{ $arrowSize ->
  [TINY] Tiny
  [VERY_SMALL] Very small
  [SMALL] Small
  [MEDIUM] Medium size
  [LARGE] Large
  [VERY_LARGE] Very large
  *[HUGE] Huge
} arrows</em> indicate a current flowing clockwise at <em>{ $value } { $unit ->
  [AMPS] { -amps }
  *[MILLIAMPS] { -milliamps }
}</em>

# ..................................................................
# Descriptions for the voltage and resistance sliders.
# ..................................................................

# Heading for the slider controls.
sliderControls = Slider Controls
slidersDescription = Voltage and resistance sliders allow changes to equation and circuit.

resistanceUnitsPattern = { $value } Ohms
voltageUnitsPattern = { $value } Volts

# Labels for the sliders.
resistanceSliderLabel = R, Resistance
voltageSliderLabel = V, Voltage

# Reusable strings for the context responses that occur when the sliders are changed.
-letterR = R
-letterV = V
-shrinks = shrinks
-grows = grows
-shrinksALot = shrinks a lot
-growsALot = grows a lot
sliderChangeAlertPattern = As letter { $firstLetter ->
  [R] { -letter-r }
  *[V] { -letter-v }
} { $firstSizeChange ->
  [SHRINKS] { -shrinks }
  [SHRINKS_A_LOT] { -shrinks-a-lot }
  [GROWS] { -grows }
  *[GROWS_A_LOT] { -grows-a-lot }
}, letter I { $iSizeChange ->
  [SHRINKS] { -shrinks }
  [SHRINKS_A_LOT] { -shrinks-a-lot }
  [GROWS] { -grows }
  *[GROWS_A_LOT] { -grows-a-lot }
}. Current now { $currentVal } { $unit ->
  [AMPS] { -amps }
  *[MILLIAMPS] { -milliamps }
}.

# Help text for the units radio buttons.
chooseUnitForCurrent = Choose unit for current.

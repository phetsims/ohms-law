# Reusable strings for the units of current.
-amps = amps
-milliamps = milliamps

# ..................................................................
# Overall screen summary descriptions.
# ..................................................................
summary-look-for-sliders = Look for voltage and resistance sliders to play, or read on for details about equation and circuit.
summary-play-area = In the Play Area you find the equation for Ohm's Law, <strong>V</strong> equals <strong>I</strong> times <strong>R</strong>, and a circuit. Voltage and resistance sliders allow changes to the equation and circuit.
summary-control-area = The Control Area has radio buttons to switch between milliamps and amps, and a button to reset the sim.
state-of-sim = State of Sim
right-now = Right now,

# Individual items describing the current values of voltage, resistance, and current.
voltage-summary-pattern = voltage, <strong>V</strong>, is <em>{ $value } volts</em>
resistance-summary-pattern = resistance, <strong>R</strong>, is <em>{ $value } ohms</em>
current-summary-pattern = current, <strong>I</strong>, is <em>{ $value } { $unit ->
  [AMPS] { -amps }
  *[MILLIAMPS] { -milliamps }
}</em>

# ..................................................................
# Description of the Ohm's Law equation.
# ..................................................................
# Equation strings
ohms-law-equation = Ohm's Law Equation
ohms-law-definition = Voltage, <strong>V</strong>, is equal to Current, <strong>I</strong>, times Resistance, <strong>R</strong>.

# Reusable strings for the relative sizes of letters in the equation
-much-much-smaller = much much smaller than
-much-smaller = much smaller than
-slightly-smaller = slightly smaller than
-comparable = comparable to
-slightly-larger = slightly larger than
-much-larger = much larger than
-much-much-larger = much much larger than

# Description for the relative sizes of the letters in the equation
relative-size-pattern = In equation, <strong>letter V</strong> is <em>{ $iComparison ->
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
circuit-label = The Circuit
circuit-description = A pair of wires connect a resistor to a series of batteries. In circuit,

# Item describing the state of the batteries
batteries-supply-pattern = batteries supply <em>{ $voltage } volts</em>

# Description of the arrows representing current.
current-description-pattern = <em>{ $arrowSize ->
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

# Description for the state of the resistor.
resistance-dots-pattern = resistor shows <em> a { $impurities ->
  [TINY] tiny
  [VERY_SMALL] very small
  [SMALL] small
  [MEDIUM] medium
  [LARGE] large
  [VERY_LARGE] very large
  *[HUGE] huge
} amount of impurities</em>

# ..................................................................
# Descriptions for the voltage and resistance sliders.
# ..................................................................
resistance-units-pattern = { $value } Ohms
voltage-units-pattern = { $value } Volts

# Labels for the sliders.
resistance-slider-label = R, Resistance
voltage-slider-label = V, Voltage

# Heading for the slider controls.
slider-controls = Slider Controls
sliders-description = Voltage and resistance sliders allow changes to equation and circuit.

# Reusable strings for the context responses that occur when the sliders are changed.
-letter-r = R
-letter-v = V
-shrinks = shrinks
-grows = grows
-shrinks-a-lot = shrinks a lot
-grows-a-lot = grows a lot
slider-change-alert-pattern = As letter { $firstLetter ->
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
choose-unit-for-current = Choose unit for current.
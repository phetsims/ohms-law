resistance-units-pattern = { $value } Ohms
voltage-units-pattern = { $value } Volts
resistance-slider-label = R, Resistance
voltage-slider-label = V, Voltage
choose-unit-for-current = Choose unit for current.

-amps = amps
-milliamps = milliamps

# Relative size strings
relative-size-pattern = In equation, <strong>letter V</strong> is <em>{ $iComparison ->
  [ MUCH_MUCH_SMALLER ] much much smaller than
  [ MUCH_SMALLER ] much smaller than
  [ SLIGHTLY_SMALLER ] slightly smaller than
  [ COMPARABLE ] comparable to
  [ SLIGHTLY_LARGER ] slightly larger than
  [ MUCH_LARGER ] much larger than
  *[ MUCH_MUCH_LARGER ] much much larger than
}</em> <strong>letter I</strong> and <em>{ $rComparison ->
  [ MUCH_MUCH_SMALLER ] much much smaller than
  [ MUCH_SMALLER ] much smaller than
  [ SLIGHTLY_SMALLER ] slightly smaller than
  [ COMPARABLE ] comparable to
  [ SLIGHTLY_LARGER ] slightly larger than
  [ MUCH_LARGER ] much larger than
  *[ MUCH_MUCH_LARGER ] much much larger than
}</em> <strong>letter R</strong>.

# Equation strings
ohms-law-equation = Ohm's Law Equation
ohms-law-definition = Voltage, <strong>V</strong>, is equal to Current, <strong>I</strong>, times Resistance, <strong>R</strong>.

# Circuit strings
circuit-label = The Circuit
circuit-description = A pair of wires connect a resistor to a series of batteries. In circuit,

# Battery strings
batteries-supply-pattern = batteries supply <em>{ $voltage } volts</em>

# Current strings
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

# Resistance strings
resistance-dots-pattern = resistor shows <em> a { $impurities ->
  [TINY] tiny
  [VERY_SMALL] very small
  [SMALL] small
  [MEDIUM] medium
  [LARGE] large
  [VERY_LARGE] very large
  *[HUGE] huge
} amount of impurities</em>

# Screen summary strings
summary-look-for-sliders = Look for voltage and resistance sliders to play, or read on for details about equation and circuit.
summary-play-area = In the Play Area you find the equation for Ohm's Law, <strong>V</strong> equals <strong>I</strong> times <strong>R</strong>, and a circuit. Voltage and resistance sliders allow changes to the equation and circuit.
summary-control-area = The Control Area has radio buttons to switch between milliamps and amps, and a button to reset the sim.
state-of-sim = State of Sim
right-now = Right now,

voltage-summary-pattern = voltage, <strong>V</strong>, is <em>{ $value } volts</em>
resistance-summary-pattern = resistance, <strong>R</strong>, is <em>{ $value } ohms</em>
current-summary-pattern = current, <strong>I</strong>, is <em>{ $value } { $unit ->
  [AMPS] { -amps }
  *[MILLIAMPS] { -milliamps }
}</em>

# Slider strings
slider-controls = Slider Controls
sliders-description = Voltage and resistance sliders allow changes to equation and circuit.
slider-change-alert-pattern = As letter { $initLetter } { $initSizeChange }, letter I { $iSizeChange }.  Current now { $currentVal } { $unit }.
letter-r = R
letter-v = V
shrinks = shrinks
grows = grows
a-lot = a lot
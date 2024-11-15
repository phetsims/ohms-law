resistance-units-pattern = { $value } Ohms
voltage-units-pattern = { $value } Volts
resistance-slider-label = R, Resistance
voltage-slider-label = V, Voltage
current-amps = amps
current-milliamps = milliamps
choose-unit-for-current = Choose unit for current.

# Relative size strings
number-of-sizes = 6
tiny = Tiny
very-small = Very small
small = Small
medium-size = Medium size
large = Large
very-large = Very large
huge = Huge
much-much-smaller-than = much much smaller than
much-smaller-than = much smaller than
slightly-smaller-than = slightly smaller than
comparable-to = comparable to
slightly-larger-than = slightly larger than
much-larger-than = much larger than
much-much-larger-than = much much larger than
relative-size-pattern = In equation, <strong>letter V</strong> is <em>{ $iComparison }</em> <strong>letter I</strong> and <em>{ $rComparison }</em> <strong>letter R</strong>.

# Equation strings
ohms-law-equation = Ohm's Law Equation
ohms-law-definition = Voltage, <strong>V</strong>, is equal to Current, <strong>I</strong>, times Resistance, <strong>R</strong>.

# Circuit strings
circuit-label = The Circuit
circuit-description = A pair of wires connect a resistor to a series of batteries. In circuit,

# Battery strings
batteries-supply-pattern = batteries supply <em>{ $voltage } volts</em>

# Current strings
current-description-pattern = <em>{ $arrowSize } arrows</em> indicate a current flowing clockwise at <em>{ $value } { $unit }</em>

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
  [AMPS] amps
  *[MILLIAMPS] milliamps
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
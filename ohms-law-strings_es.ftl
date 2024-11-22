# Reusable strings for the units of current.
-amps = amperios
-milliamps = miliamperios

# ..................................................................
# Overall screen summary descriptions.
# ..................................................................
summary-look-for-sliders = Busca los deslizadores de voltaje y resistencia para jugar, o sigue leyendo para más detalles sobre la ecuación y el circuito.
summary-play-area = En el Área de Juego encuentras la ecuación de la Ley de Ohm, <strong>V</strong> es igual a <strong>I</strong> multiplicado por <strong>R</strong>, y un circuito. Los deslizadores de voltaje y resistencia permiten cambiar la ecuación y el circuito.
summary-control-area = El Área de Control tiene botones de radio para cambiar entre miliamperios y amperios, y un botón para reiniciar la simulación.
state-of-sim = Estado de la Sim
right-now = Ahora mismo,

# Individual items describing the current values of voltage, resistance, and current.
voltage-summary-pattern = voltaje, <strong>V</strong>, es <em>{ $value } voltios</em>
resistance-summary-pattern = resistencia, <strong>R</strong>, es <em>{ $value } ohmios</em>
current-summary-pattern = corriente, <strong>I</strong>, es <em>{ $value } { $unit ->
  [AMPS] { -amps }
  *[MILLIAMPS] { -milliamps }
}</em>

# ..................................................................
# Description of the Ohm's Law equation.
# ..................................................................
# Equation strings
ohms-law-equation = Ecuación de la Ley de Ohm
ohms-law-definition = Voltaje, <strong>V</strong>, es igual a Corriente, <strong>I</strong>, multiplicado por Resistencia, <strong>R</strong>.

# Reusable strings for the relative sizes of letters in the equation.
# (According to ChatGPT) these are masculine because the size concept has an implied masculine
# gender for adjective agreement in Spanish.
-much-much-smaller = mucho mucho más pequeño que
-much-smaller = mucho más pequeño que
-slightly-smaller = ligeramente más pequeño que
-comparable = comparable con
-slightly-larger = ligeramente más grande que
-much-larger = mucho más grande que
-much-much-larger = mucho mucho más grande que

# Description for the relative sizes of the letters in the equation
relative-size-pattern = En la ecuación, <strong>la letra V</strong> es <em>{ $iComparison ->
  [ MUCH_MUCH_SMALLER ] { -much-much-smaller }
  [ MUCH_SMALLER ] { -much-smaller }
  [ SLIGHTLY_SMALLER ] { -slightly-smaller }
  [ COMPARABLE ] { -comparable }
  [ SLIGHTLY_LARGER ] { -slightly-larger }
  [ MUCH_LARGER ] { -much-larger }
  *[ MUCH_MUCH_LARGER ] { -much-much-larger }
}</em> <strong>la letra I</strong> y <em>{ $rComparison ->
  [ MUCH_MUCH_SMALLER ] { -much-much-smaller }
  [ MUCH_SMALLER ] { -much-smaller }
  [ SLIGHTLY_SMALLER ] { -slightly-smaller }
  [ COMPARABLE ] { -comparable }
  [ SLIGHTLY_LARGER ] { -slightly-larger }
  [ MUCH_LARGER ] { -much-larger }
  *[ MUCH_MUCH_LARGER ] { -much-much-larger }
}</em> <strong>la letra R</strong>.

# ..................................................................
# Description of the circuit.
# ..................................................................
circuit-label = El Circuito
circuit-description = Un par de cables conecta un resistor a una serie de baterías. En el circuito,

# Item describing the state of the batteries
batteries-supply-pattern = las baterías suministran <em>{ $voltage } voltios</em>

# Description of the arrows representing current.
current-description-pattern = <em>{ $arrowSize ->
  [TINY] Muy pequeñas
  [VERY_SMALL] Muy pequeñas
  [SMALL] Pequeñas
  [MEDIUM] De tamaño medio
  [LARGE] Grandes
  [VERY_LARGE] Muy grandes
  *[HUGE] Enormes
} flechas</em> indican una corriente que fluye en el sentido de las agujas del reloj a <em>{ $value } { $unit ->
  [AMPS] { -amps }
  *[MILLIAMPS] { -milliamps }
}</em>

# Description for the state of the resistor.
resistance-dots-pattern = el resistor muestra <em> una cantidad { $impurities ->
  [TINY] diminuta
  [VERY_SMALL] muy pequeña
  [SMALL] pequeña
  [MEDIUM] media
  [LARGE] grande
  [VERY_LARGE] muy grande
  *[HUGE] enorme
} de impurezas</em>

# ..................................................................
# Descriptions for the voltage and resistance sliders.
# ..................................................................
resistance-units-pattern = { $value } Ohmios
voltage-units-pattern = { $value } Voltios

# Labels for the sliders.
resistance-slider-label = R, Resistencia
voltage-slider-label = V, Voltaje

# Heading for the slider controls.
slider-controls = Controles de Deslizadores
sliders-description = Los deslizadores de voltaje y resistencia permiten cambios en la ecuación y el circuito.

# Reusable strings for the context responses that occur when the sliders are changed.
-letter-r = R
-letter-v = V
-shrinks = se reduce
-grows = aumenta
-shrinks-a-lot = se reduce mucho
-grows-a-lot = aumenta mucho
slider-change-alert-pattern = A medida que la letra { $firstLetter ->
  [R] { -letter-r }
  *[V] { -letter-v }
} { $firstSizeChange ->
  [SHRINKS] { -shrinks }
  [SHRINKS_A_LOT] { -shrinks-a-lot }
  [GROWS] { -grows }
  *[GROWS_A_LOT] { -grows-a-lot }
}, la letra I { $iSizeChange ->
  [SHRINKS] { -shrinks }
  [SHRINKS_A_LOT] { -shrinks-a-lot }
  [GROWS] { -grows }
  *[GROWS_A_LOT] { -grows-a-lot }
}. La corriente ahora { $currentVal } { $unit ->
  [AMPS] { -amps }
  *[MILLIAMPS] { -milliamps }
}.

# Help text for the units radio buttons.
choose-unit-for-current = Elige la unidad para la corriente.
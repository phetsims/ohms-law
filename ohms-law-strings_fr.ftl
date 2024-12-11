# Reusable strings for the units of current.
-amps = ampères
-milliamps = milliampères

# ..................................................................
# Overall screen summary descriptions.
# ..................................................................
summary-play-area = Dans la zone de jeu, vous trouverez l'équation de la loi d'Ohm, <strong>V</strong> égale <strong>I</strong> multiplié par <strong>R</strong>, et un circuit. Les curseurs de tension et de résistance permettent des modifications de l'équation et du circuit.
summary-control-area = La zone de contrôle comporte des boutons radio pour passer de milliampères à ampères, et un bouton pour réinitialiser la simulation.

# ...
# Individual items describing the current values of voltage, resistance, and current.
right-now = En ce moment,

voltage-summary-pattern = la tension, <strong>V</strong>, est <em>{ $value } volts</em>
resistance-summary-pattern = la résistance, <strong>R</strong>, est <em>{ $value } ohms</em>
current-summary-pattern = le courant, <strong>I</strong>, est <em>{ $value } { $unit ->
[AMPS] { -amps }
*[MILLIAMPS] { -milliamps }
}</em>

summary-look-for-sliders = Cherchez les curseurs de tension et de résistance pour jouer, ou lisez pour plus de détails sur l'équation et le circuit.

# ..................................................................
# Description of the Ohm's Law equation.
# ..................................................................
# Equation strings
ohms-law-equation = Équation de la loi d'Ohm
ohms-law-definition = La tension, <strong>V</strong>, est égale au courant, <strong>I</strong>, multiplié par la résistance, <strong>R</strong>.

# Reusable strings for the relative sizes of letters in the equation
-much-much-smaller = beaucoup beaucoup plus petit que
-much-smaller = beaucoup plus petit que
-slightly-smaller = légèrement plus petit que
-comparable = comparable à
-slightly-larger = légèrement plus grand que
-much-larger = beaucoup plus grand que
-much-much-larger = beaucoup beaucoup plus grand que

# Description for the relative sizes of the letters in the equation
relative-size-pattern = Dans l'équation, <strong>la lettre V</strong> est <em>{ $iComparison ->
[ MUCH_MUCH_SMALLER ] { -much-much-smaller }
[ MUCH_SMALLER ] { -much-smaller }
[ SLIGHTLY_SMALLER ] { -slightly-smaller }
[ COMPARABLE ] { -comparable }
[ SLIGHTLY_LARGER ] { -slightly-larger }
[ MUCH_LARGER ] { -much-larger }
*[ MUCH_MUCH_LARGER ] { -much-much-larger }
}</em> que <strong>la lettre I</strong> et <em>{ $rComparison ->
[ MUCH_MUCH_SMALLER ] { -much-much-smaller }
[ MUCH_SMALLER ] { -much-smaller }
[ SLIGHTLY_SMALLER ] { -slightly-smaller }
[ COMPARABLE ] { -comparable }
[ SLIGHTLY_LARGER ] { -slightly-larger }
[ MUCH_LARGER ] { -much-larger }
*[ MUCH_MUCH_LARGER ] { -much-much-larger }
}</em> que <strong>la lettre R</strong>.

# ..................................................................
# Description of the circuit.
# ..................................................................
circuit-label = Le Circuit
circuit-description = Une paire de fils connecte une résistance à une série de batteries. Dans le circuit,

# ...
# Item describing the state of the batteries
batteries-supply-pattern = les batteries fournissent <em>{ $voltage } volts</em>

# ...
# Description for the state of the resistor.
resistance-dots-pattern = la résistance montre <em> une quantité { $impurities ->
[TINY] minuscule
[VERY_SMALL] très petite
[SMALL] petite
[MEDIUM] moyenne
[LARGE] grande
[VERY_LARGE] très grande
*[HUGE] énorme
} d'impuretés</em>

# ...
# Description of the arrows representing current.
current-description-pattern = <em>{ $arrowSize ->
[TINY] Minuscules
[VERY_SMALL] Très petites
[SMALL] Petites
[MEDIUM] De taille moyenne
[LARGE] Grandes
[VERY_LARGE] Très grandes
*[HUGE] Énormes
} flèches</em> indiquent un courant qui circule dans le sens horaire à <em>{ $value } { $unit ->
[AMPS] { -amps }
*[MILLIAMPS] { -milliamps }
}</em>

# ..................................................................
# Descriptions for the voltage and resistance sliders.
# ..................................................................

# Heading for the slider controls.
slider-controls = Commandes des curseurs
sliders-description = Les curseurs de tension et de résistance permettent de modifier l'équation et le circuit.

resistance-units-pattern = { $value } Ohms
voltage-units-pattern = { $value } Volts

# Labels for the sliders.
resistance-slider-label = R, Résistance
voltage-slider-label = V, Tension

# Reusable strings for the context responses that occur when the sliders are changed.
-letter-r = R
-letter-v = V
-shrinks = rétrécit
-grows = grossit
-shrinks-a-lot = rétrécit beaucoup
-grows-a-lot = grossit beaucoup
slider-change-alert-pattern = Comme la lettre { $firstLetter ->
[R] { -letter-r }
*[V] { -letter-v }
} { $firstSizeChange ->
[SHRINKS] { -shrinks }
[SHRINKS_A_LOT] { -shrinks-a-lot }
[GROWS] { -grows }
*[GROWS_A_LOT] { -grows-a-lot }
}, lettre I { $iSizeChange ->
[SHRINKS] { -shrinks }
[SHRINKS_A_LOT] { -shrinks-a-lot }
[GROWS] { -grows }
*[GROWS_A_LOT] { -grows-a-lot }
}. Le courant maintenant { $currentVal } { $unit ->
[AMPS] { -amps }
*[MILLIAMPS] { -milliamps }
}.

# Help text for the units radio buttons.
choose-unit-for-current = Choisissez l'unité pour le courant.
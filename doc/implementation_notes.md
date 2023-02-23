# Ohm's Law - Implementation Notes

This document contains notes that will be helpful to developers and future maintainers of this simulation.

## Model

This sim uses phet.axon.Property in the model for storage of properties to keep track of the Ohm's Law formula. Current is
a phet.axon.DerivedProperty that is dependent on the resistance and voltage properties.

Start by reading the model description model.md
 
## View

There is only one screen for this simulation. Please see `OhmsLawScreenView.js` for the main launchpoint for the view.
The view consists of three main components.

The `FormulaNode` is responsible for drawing the formula, with symbols that change size proportional their values.

The `ControlPanel` is to the left in the simulation view, and serves as a legend for the formula. It also displays 
the exact values of the formula variables, and provides sliders to manipulate them. The `ControlPanel` is divided up into 
`SliderUnit`, one for each variable on the left side of the formula (voltage and resistance). An `HSlider` (oriented 
vertically) controls the value of the property. In each `SliderUnit`, there is a `Text` for each of the following: the
symbol from the formula, the word it represents, and the value of the variable (with the unit).

The `WireBox` is the graphical representation of Ohm's Law. It is a drawn circuit with illustrated current directional
arrows (`RightAngleArrow`), with Batteries on one side of it for the voltage (`BatteriesView`), and a resistor on the other
side (`ResistorNode`). In the center of the `WireBox`, a readout of the value of current is displayed (`ReadoutNode`).
Depending on the voltage, more or less AA batteries will show on the top of the wireBox (each represent 1.5 volts). 
Depending on the resistance, more or less dots are drawn on the resistor.

The sound is also controlled in the view. Sounds are played based on interactions with the sliders and on changes to the
amount of current flowing in the circuit.
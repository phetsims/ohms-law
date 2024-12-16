# Reusable strings for the units of current.
-amps = أمبيرات
-milliamps = ميلي أمبير

# ..................................................................
# Overall screen summary descriptions.
# ..................................................................
summary-play-area = في منطقة اللعب، تجد معادلة قانون أوم، <strong>V</strong> يساوي <strong>I</strong> مضروب بـ <strong>R</strong>، ودائرة كهربائية. منزلقات الجهد والمقاومة تتيح تغييرات على المعادلة والدائرة.
summary-control-area = تحتوي منطقة التحكم على أزرار راديوية للتبديل بين الميلي أمبير والأمبير، وزر لإعادة تعيين المحاكاة.

# ...
# Individual items describing the current values of voltage, resistance, and current.
right-now = حاليًا،

voltage-summary-pattern = الجهد، <strong>V</strong>، هو <em>{ $value } فولت</em>
resistance-summary-pattern = المقاومة، <strong>R</strong>، هي <em>{ $value } أوم</em>
current-summary-pattern = التيار، <strong>I</strong>، هو <em>{ $value } { $unit ->
  [AMPS] { -amps }
  *[MILLIAMPS] { -milliamps }
}</em>

summary-look-for-sliders = ابحث عن منزلقات الجهد والمقاومة للعب، أو اقرأ المزيد للتفاصيل عن المعادلة والدائرة.

# ..................................................................
# Description of the Ohm's Law equation.
# ..................................................................
# Equation strings
ohms-law-equation = معادلة قانون أوم
ohms-law-definition = الجهد، <strong>V</strong>، يساوي التيار، <strong>I</strong>، مضروب بالمقاومة، <strong>R</strong>.

# Reusable strings for the relative sizes of letters in the equation
-much-much-smaller = أصغر بكثير جدا من
-much-smaller = أصغر بكثير من
-slightly-smaller = أصغر قليلا من
-comparable = مماثل لـ
-slightly-larger = أكبر قليلا من
-much-larger = أكبر بكثير من
-much-much-larger = أكبر بكثير جدا من

# Description for the relative sizes of the letters in the equation
relative-size-pattern = في المعادلة، <strong>الحرف V</strong> هو <em>{ $iComparison ->
  [MUCH_MUCH_SMALLER] { -much-much-smaller }
  [MUCH_SMALLER] { -much-smaller }
  [SLIGHTLY_SMALLER] { -slightly-smaller }
  [COMPARABLE] { -comparable }
  [SLIGHTLY_LARGER] { -slightly-larger }
  [MUCH_LARGER] { -much-larger }
  *[MUCH_MUCH_LARGER] { -much-much-larger }
}</em> <strong>الحرف I</strong> و <em>{ $rComparison ->
  [MUCH_MUCH_SMALLER] { -much-much-smaller }
  [MUCH_SMALLER] { -much-smaller }
  [SLIGHTLY_SMALLER] { -slightly-smaller }
  [COMPARABLE] { -comparable }
  [SLIGHTLY_LARGER] { -slightly-larger }
  [MUCH_LARGER] { -much-larger }
  *[MUCH_MUCH_LARGER] { -much-much-larger }
}</em> <strong>الحرف R</strong>.

# ..................................................................
# Description of the circuit.
# ..................................................................
circuit-label = الدائرة
circuit-description = زوج من الأسلاك يربط مقاوم بسلسلة من البطاريات. في الدائرة،

# ...
# Item describing the state of the batteries
batteries-supply-pattern = البطاريات تزود <em>{ $voltage } فولت</em>

# ...
# Description for the state of the resistor.
resistance-dots-pattern = المقاوم يظهر <em> كمية { $impurities ->
  [TINY] ضئيلة
  [VERY_SMALL] صغيرة جدًا
  [SMALL] صغيرة
  [MEDIUM] متوسطة
  [LARGE] كبيرة
  [VERY_LARGE] كبيرة جدًا
  *[HUGE] ضخمة
} من الشوائب</em>

# ...
# Description of the arrows representing current.
current-description-pattern = <em>{ $arrowSize ->
  [TINY] ضئيلة
  [VERY_SMALL] صغيرة جدًا
  [SMALL] صغيرة
  [MEDIUM] متوسطة الحجم
  [LARGE] كبيرة
  [VERY_LARGE] كبيرة جدًا
  *[HUGE] ضخمة
} أسهم</em> تشير إلى تَدفق تيار باتجاه عقارب الساعة بـ <em>{ $value } { $unit ->
  [AMPS] { -amps }
  *[MILLIAMPS] { -milliamps }
}</em>

# ..................................................................
# Descriptions for the voltage and resistance sliders.
# ..................................................................

# Heading for the slider controls.
slider-controls = تحكم المنزلقات
sliders-description = منزلقات الجهد والمقاومة تتيح تغييرات على المعادلة والدائرة.

resistance-units-pattern = { $value } أوم
voltage-units-pattern = { $value } فولت

# Labels for the sliders.
resistance-slider-label = R، مقاومة
voltage-slider-label = V، جهد

# Reusable strings for the context responses that occur when the sliders are changed.
-letter-r = R
-letter-v = V
-shrinks = يتقلص
-grows = يكبر
-shrinks-a-lot = يتقلص كثيرا
-grows-a-lot = يكبر كثيرا
slider-change-alert-pattern = عندما { $firstLetter ->
  [R] { -letter-r }
  *[V] { -letter-v }
} { $firstSizeChange ->
  [SHRINKS] { -shrinks }
  [SHRINKS_A_LOT] { -shrinks-a-lot }
  [GROWS] { -grows }
  *[GROWS_A_LOT] { -grows-a-lot }
}، الحرف I { $iSizeChange ->
  [SHRINKS] { -shrinks }
  [SHRINKS_A_LOT] { -shrinks-a-lot }
  [GROWS] { -grows }
  *[GROWS_A_LOT] { -grows-a-lot }
}. التيار الآن { $currentVal } { $unit ->
  [AMPS] { -amps }
  *[MILLIAMPS] { -milliamps }
}.

# Help text for the units radio buttons.
choose-unit-for-current = اختر الوحدة للتيار.
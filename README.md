# gridle (v1.3.38)


One grid system to rule them all (.scss)

Gridle is a set of complete and simple settings, mixins and classes that make the creation and usage of grid systems (even complex ones) really simple. All of this with full responsive capabilities

## [Visit Website](http://gridle.org/) for full documentation



## Quick start
	
Importing gridle

```scss
import "gridle/gridle"
```

Configure your grid :

```scss
@include gridle_setup( (
	context : 12,
	gutter-width : 20px,
	direction : rtl,
	// etc...
) );
```

Register states (media queries) (optional) :

```scss
@include gridle_register_state ( mobile , (
	max-width : 480px 
) );
@include gridle_register_state ( tablet , (
	min-width : 481px,
	max-width : 1024px
) ) ;

// even with full custom queries :
@include gridle_register_state ( landscape, (
	query : "(orientation : landscape)"
) );
```

Generate all classes :

```scss
@include gridle_generate_classes();
```

Use your grid in hrml :

```markup
<div class="container">
	<div class="grid-12 hide-print">
		Header
	</div>
	<div class="grid-8 grid-mobile-12">
		Content
	</div>
	<div class="grid-4 grid-mobile-12 hide-print">
		Sidebar
	</div>
</div>
```

Or with mixins :

```scss
.container {
	@include gridle_container();
	max-width:960px;
	margin:0 auto;
}
#header {
	@include gridle(12);
}
#sidebar {
	@include gridle(8);
	@include gridle(12,  mobile );
}
#sidebar {
	@include gridle(4);
	@include gridle_hide( mobile );
}
@footer {
	@include gridle(12);
}
```

Customize your content look and feel with Gridle mixins

```scss
#sidebar {
	background : red;

	@include gridle_state(mobile) {
		background : green;
	}
}
```

## Generate custom classes

Gridle allows you to generate custom classes that will be available for each of your states. Here's an exemple

```scss
@include gridle_generate_custom_class( ( 'center', '-', '%state' ) ) {
	text-align : center;
}
```

This will produce the classes : center, center-mobile, center-tablet and center-landscape automatically


## Set multiple grid properties at one

Gridle offer you multiple ways to set grid properties on your elements, the gridle_set is one of these ways

```scss
#sidebar {
	@include gridle_set((
		grid : 8,
		push : 4,
		tablet : (
			grid : 10,
			push : 2
		),
		mobile : (
			grid : 12,
			push : 0
		)
	));
}
```


## More control with Gridle{.js}

Gridle{.js} allows you to be notified when states changes. It find automatically your states registered in your sass. Simple but powerful

```javascript
Gridle.on('update', function(updatedStates, activeStates, unactiveStates) {
	// do something here...
});
// see documentation for more informations...
```
# Gridle <small>3.0.0</small>

One grid system to rule them all (.scss)

Gridle is a set of complete and simple settings, mixins and classes that make the creation and usage of grid systems (even complex ones) really simple. All of this with full responsive capabilities

## Install

Gridle is available through NPM. To install it, just launch this command line:

```npm install git+https://git@github.com/Coffeekraken/gridle.git#release/3.0.0 --save```

## Quick start

Importing gridle

```scss
import 'node_modules/coffeekraken-gridle/index';
```

Configure your grid :

```scss
@include g-setup( (
	context : 12,
	gutter-width : 20px,
	direction : rtl,
	// etc...
) );
```

Register states (media queries) (optional) :

```scss
@include g-register-state ( mobile , (
	max-width : 480px
) );
@include g-register-state ( tablet , (
	min-width : 481px,
	max-width : 1024px
) ) ;

// even with full custom queries :
@include g-register-state ( landscape, (
	query : "(orientation : landscape)"
) );
```

Generate all classes :

```scss
@include g-classes();
```

Use your grid in hrml :

```markup
<div class="row">
	<div class="gr-12 hide-print">
		Header
	</div>
	<div class="gr-8 gr-12@mobile">
		Content
	</div>
	<div class="gr-4 gr-12@mobile">
		Sidebar
	</div>
</div>
```

Or with mixins :

```scss
.row {
	@include g-row();
	max-width:960px;
	margin:0 auto;
}
#header {
	@include g-grid(12);
}
#sidebar {
	@include g-grid(8);
	@include g-state( mobile tablet ) {
		@include g-grid(12);
		content : "#{g-current-state-name()}";
	}
}
#sidebar {
	@include g-set( (
		grid : 4,
		mobile : (
			hide : true
		)
	) );
}
@footer {
	@include g-grid(12);
}
```

Customize your content look and feel with Gridle mixins

```scss
#sidebar {
	background : red;

	@include g-state(mobile) {
		background : green;
	}
}
```

## Element queries support

Gridle has support for element queries with an easy mixin as all the rest of the framework. Thanks to [Marc J Schmidt](https://github.com/marcj/css-element-queries) for his awesome work on the hight efficient "polyfill".

```scss
.component {
	background: yellow;

	@include g-eq(+600px) {
		// when the component is 600px and greater
		background: pink;
	}
	@include g-eq(-300px) {
		// when the component is 300px and lower
		background: green;
	}
	@include g-eq(-100px) {
		// when the component is 100px and lower
		background: black;

		.my-nested-element {
			display: none;
		}
	}
}
```

## Flex as a choice

Gridle allows you to choose between a standard grid generated with float, etc... and a flex one that use the flexbox model. All of this power with the same exact classes.

```scss
// default driver
@import 'coffeekraken-gridle/index';
// flex driver
@import 'coffeekraken-gridle/flex';
```

## Generate custom classes

Gridle allows you to generate custom classes that will be available for each of your states. Here's an exemple

```scss
@include g-custom-class( ( 'center', '-', '%state' ) ) {
	text-align : center;
}
```

This will produce the classes : center, center-mobile, center-tablet and center-landscape automatically


## Set multiple grid properties at one

Gridle offer you multiple ways to set grid properties on your elements, the g-set and gridle universal mixin are some of these ways

```scss
#sidebar {
	@include g-set((
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

	// same with universal mixin
	@include gridle(8 push 4 tablet 10 push 2 mobile 12 push 0);
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


## And more...

That's not finished. Gridle offer you a lot of features and advanced settings that you can discover on the full website. When I say that Gridle is powerful and fully customizable, I really mean it!

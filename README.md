# gridle (v2.0.48)


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
	@include gridle_row();
	max-width:960px;
	margin:0 auto;
}
#header {
	@include gridle_grid(12);
}
#sidebar {
	@include gridle_grid(8);
	@include gridle_state( mobile tablet ) {
		@include gridle_grid(12);
		content : "#{gridle_current_state_name()}";
	}
}
#sidebar {
	@include gridle_set( (
		grid : 4,
		mobile : (
			hide : true
		)
	) );
}
@footer {
	@include gridle_grid(12);
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

## Element queries support

Gridle has support for element queries with an easy mixin as all the rest of the framework. Thanks to [Marc J Schmidt](https://github.com/marcj/css-element-queries) for his awesome work on the hight efficient "polyfill".

```scss
.component {
	background: yellow;

	@include gridle_eq(+600px) {
		// when the component is 600px and greater
		background: pink;
	}
	@include gridle_eq(-300px) {
		// when the component is 300px and lower
		background: green;
	}
	@include gridle_eq(-100px) {
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

## Generate custom classes

Gridle allows you to generate custom classes that will be available for each of your states. Here's an exemple

```scss
@include gridle_generate_custom_class( ( 'center', '-', '%state' ) ) {
	text-align : center;
}
```

This will produce the classes : center, center-mobile, center-tablet and center-landscape automatically


## Set multiple grid properties at one

Gridle offer you multiple ways to set grid properties on your elements, the gridle_set and gridle universal mixin are some of these ways

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

## [Visit Website](http://gridle.org/) for full documentation


## Tested with

|    | Generator |  Version  |
| ------------- | ------------- | ------------- |
| <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/1280px-Sass_Logo_Color.svg.png" height="20" />  |  Grunt Sass  |  1.0.0  |
| <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/1280px-Sass_Logo_Color.svg.png" height="20" />  |  Gulp Sass  |  2.2.0  |
| <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/1280px-Sass_Logo_Color.svg.png" height="20" />  |  Node Sass  |  3.4.2  |
| <img src="http://www.codingpedia.org/wp-content/uploads/2014/04/gulp-2x.png" height="30" />  |  Gulp  | 3.9.0  |
| <img src="https://www.npmjs.com/static/images/npm-logo.svg" height="20" />  |  NPM  | 2.5.1  |
| <img src="https://cms-assets.tutsplus.com/uploads/users/30/posts/23114/preview_image/libsass.png" height="20" />  |  Libsass  | 3.3.3  |
|  <img src="http://rhumaric.com/wp-content/uploads/2013/05/bower-logo.png" height="20" />  |  Grunt  |  0.4.4  |

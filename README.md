# Coffeekraken Gridle <img src=".resources/coffeekraken-logo.jpg" height="25px" />

<p>
	<!-- <a href="https://travis-ci.org/Coffeekraken/gridle">
		<img src="https://img.shields.io/travis/Coffeekraken/gridle.svg?style=flat-square" />
	</a> -->
	<a href="https://www.npmjs.com/package/coffeekraken-gridle">
		<img src="https://img.shields.io/npm/v/coffeekraken-gridle.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/gridle/blob/master/LICENSE.txt">
		<img src="https://img.shields.io/npm/l/coffeekraken-gridle.svg?style=flat-square" />
	</a>
	<!-- <a href="https://github.com/coffeekraken/gridle">
		<img src="https://img.shields.io/npm/dt/coffeekraken-gridle.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/gridle">
		<img src="https://img.shields.io/github/forks/coffeekraken/gridle.svg?style=social&label=Fork&style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/gridle">
		<img src="https://img.shields.io/github/stars/coffeekraken/gridle.svg?style=social&label=Star&style=flat-square" />
	</a> -->
	<a href="https://twitter.com/coffeekrakenio">
		<img src="https://img.shields.io/twitter/url/http/coffeekrakenio.svg?style=social&style=flat-square" />
	</a>
	<a href="http://coffeekraken.io">
		<img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=flat-square&label=coffeekraken.io&colorB=f2bc2b&style=flat-square" />
	</a>
</p>

> One grid system to rule them all (.scss)

<p class="lead">Gridle is a set of complete and simple settings, mixins and classes that make the creation and usage of grid systems (even complex ones) really simple. All of this with full responsive capabilities</p>

## Table of content

1. [Install](#install)
2. [Get started](doc/00.get-started.md)
3. [Setup](doc/01.setup.md)
4. [States](doc/02.states.md)
5. [Mobile first](doc/03.modile-first.md)
6. [Classes](doc/04.classes.md)
7. [Mixins](doc/05.mixins.md)
8. [Functions](doc/06.functions.md)
9. [Advanced settings](doc/07.advanced-settings.md)
10. [Gridle JS](doc/08.gridle-js.md)
11. [Browsers Support](#readme-browsers-support)
12. [Contribute](#readme-contribute)
13. [Who are Coffeekraken](#readme-who-are-coffeekraken)
14. [License](#readme-license)

## Install

Gridle is available through NPM. To install it, just launch this command line:

```
npm install coffeekraken-gridle --save
```

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

Use your grid in html :

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
@import 'node_modules/coffeekraken-gridle/index';
// flex driver
@import 'node_modules/coffeekraken-gridle/flex';
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
import Gridle from 'coffeekraken-gridle';
Gridle.on('update', function(updatedStates, activeStates, unactiveStates) {
	// do something here...
});
// see documentation for more informations...
```


## And more...

That's not finished. Gridle offer you a lot of features and advanced settings that you can discover on the full website. When I say that Gridle is powerful and fully customizable, I really mean it!


<a id="readme-browsers-support"></a>
## Browsers support

| <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" /></br>IE / Edge | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" /></br>Firefox | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" /></br>Chrome | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" /></br>Safari |
| --------- | --------- | --------- | --------- |
| IE11+ | last 2 versions| last 2 versions| last 2 versions

> As browsers are automatically updated, we will keep as reference the last two versions of each but this package can work on older ones as well.

<a id="readme-contribute"></a>
## Contribute

This is an open source project and will ever be! You are more that welcomed to contribute to his development and make it more awesome every day.
To do so, you have several possibilities:

1. [Share the love ❤️](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-share-the-love)
2. [Declare issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-declare-issues)
3. [Fix issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-fix-issues)
4. [Add features](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-add-features)
5. [Build web component](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-build-web-component)

<a id="readme-who-are-coffeekraken"></a>
## Who are Coffeekraken

We try to be **some cool guys** that build **some cool tools** to make our (and yours hopefully) **every day life better**.  

#### [More on who we are](https://github.com/Coffeekraken/coffeekraken/blob/master/who-are-we.md)

<a id="readme-license"></a>
## License

The code is available under the [MIT license](LICENSE.txt). This mean that you can use, modify, or do whatever you want with it. This mean also that it is shipped to you for free, so don't be a hater and if you find some issues, etc... feel free to [contribute](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md) instead of sharing your frustrations on social networks like an asshole...

![Gridle](.resources/gridle-head.png)

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

Gridle is a simple but powerful and convenient grid that make use of the CSS grid model. It has been rewritten from the ground up to be more simple to use without loosing his principle goals that are the flexibility and his responsive capabilities.

## Table of content

1. [Install](#install)
2. [Get started](doc/00.get-started.md)
3. [Settings](doc/02.settings.md)
4. [States](doc/02.states.md)
5. [Classes](doc/03.classes.md)
6. [Functions](doc/04.functions.md)
7. [Mixins](doc/05.mixins.md)
8. [Browsers Support](#readme-browsers-support)
9. [Contribute](#readme-contribute)
10. [Who are Coffeekraken](#readme-who-are-coffeekraken)
11. [License](#readme-license)

<a id="readme-install"></a>
## Install

Gridle is available through NPM. To install it, just launch this command line:

```
npm install coffeekraken-gridle@4.0.0-beta.2 --save
```

## Quick start

Importing gridle

```scss
import 'node_modules/coffeekraken-gridle/index';
```

Configure your grid :

```scss
@include g-setup((
	columns: 12,
	column-width: 60, // unitless value
	width: 1200, // unitless value
	container-width: 85vw, // absolute value
	container-max-width: 1440px
));
```

Register states (media queries) (optional) :

```scss
@include g-register-state(tablet, (
	min-width : 640px
));
@include g-register-state(desktop, (
	min-width : 992px
));

// even with full custom queries :
@include g-register-state (landscape, (
	query : "(orientation : landscape)"
));
```

Generate all classes :

```scss
@include g-classes();
```

Use your grid in html :

```html
<div class="gr">
	<div class="col col--12 hide@tablet">
		Header
	</div>
	<div class="col col--12 col--4@tablet">
		Content
	</div>
	<div class="col col--12 col--4@tablet">
		Sidebar
	</div>
</div>
```

Customize your content look and feel with Gridle mixins

```scss
#sidebar {
	background : red;

	@include g-state(tablet) {
		background : green;
	}
}
```

## Generate custom classes

Gridle allows you to generate custom classes that will be available for each of your states. Here's an exemple

```scss
@include g-custom-class('center') {
	text-align : center;
}
```

This will produce the classes : center, center@tablet, center@desktop and center@landscape automatically


<a id="readme-browsers-support"></a>
## Browsers support

| <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" /></br>Edge | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" /></br>Firefox | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" /></br>Chrome | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" /></br>Safari |
| --------- | --------- | --------- | --------- |
| Edge16+ | last 2 versions| last 2 versions| last 2 versions

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

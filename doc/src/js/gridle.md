# Gridle.js

This little js file allow you to detect which or your gridle state is active, when states changes, etc...


### Example
```js
	import 'coffeekraken-gridle';
// optional setup
Gridle.init({settings});
```
Author : Olivier Bossel <olivier.bossel@gmail.com>





## Settings

Here's the list of available settings.

### onUpdate:

Callback when the state has changed

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **null**


### debug:

Activate of not the debug outputs

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **false**


### ignoredStates:

Set some states to ignore completely

Type : **{ [Array](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array) }**

Default : **[]**



## Methods


### init:

Init gridle with some custom settings


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
settings  |  **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**  |  Some settings to override  |  required  |

Default : **function(settings) {**
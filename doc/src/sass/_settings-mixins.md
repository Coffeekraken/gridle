# Setting mixins

This are all the mixins that are exposed by gridle for the setting up your grid.


## Mixins


### g-setup

Setting up your grid


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$settings  |  **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }**  |  Your default grid settings  |  required  |

#### Example
```scss
	// default settings
$_gridle-settings : (
name : default,
min-width : null,
max-width : null,
query : null,
classes : true,
context : 12,
column-width : null,
gutter-width : 20px,
gutter-height : 0,
gutter-top : 0,
gutter-right : 10px,
gutter-bottom : 0,
gutter-left : 10px,
direction : ltr,
dir-attribute : false,
name-multiplicator : 1,
states-classes : false,
classes-prefix : null
);

// setting up your grid
@include g-setup((
	context : 12
	// other settings
));
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-register-state

Register a new state with some settings


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$name  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The new state name  |  required  |
$settings  |  **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }**  |  The state settings  |  required  |

#### Example
```scss
	@include g-register-state(mobile, (
	max-width : 600px
));
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-register-clear-each

Register some clear each that will been generated in classes


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$count  |  **{ Integer }**  |  The n each item to clear  |  required  |
$what  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  What to clear (left, right, both)  |  required  |

#### Example
```scss
	@include g-register-clear-each(2, left);
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-register-column




Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$name  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The column name  |  required  |
$columns  |  **{ Integer }**  |  The column width  |  required  |
$context  |  **{ Integer }**  |  The context on which to calculate the column width  |  required  |

#### Example
```scss
	@include g-register-column(1on5, 1, 5);
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-set-classname-map




Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$package  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The package name to specify the pattern for  |  required  |
$pattern  |  **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }**  |  The new classname pattern  |  required  |

#### Example
```scss
	@include g-set-classname-map(grid, ('grid','-','%count','@','%state'));
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-set-generic-selector

Set a generic selector for a specific package. This generic selector will be used to target some elements like [class*="gr-"].
If not specified for a package, the generic selector will be generated automatically but sometimes it's better to hardcode it.


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$package  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The package to specify the generic selector for  |  required  |
$selector  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The generic selector like [class*="gr-"], or whatever...  |  required  |

#### Example
```scss
	@include g-set-generic-selector(grid, '[class*="gr-"]');
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-register-default-states

Register some basics states:

- mobile : 0 to 480px
- tablet : 481px to 1024px


#### Example
```scss
	@include g-register-default-states();
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-register-mobile-first-states

Register some basics mobile first states:

- mobile : 320px to infinite
- tablet : 640px to infinite
- desktop : 992px to infinite
- large : 1200px to infinite


#### Example
```scss
	@include g-register-mobile-first-states();
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-register-bootstrap3-states

Register bootstrap 3 states

- xs : 0 to 750px
- sm : 750px to infinite
- md : 970px to infinite
- lg : 1170px to infinite


#### Example
```scss
	@include g-register-bootstrap3-states();
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-register-bootstrap4-states

Register bootstrap 4 states

- xs : 0 to 576px
- sm : 576px to infinite
- md : 970px to infinite
- lg : 1200px to infinite


#### Example
```scss
	@include g-register-bootstrap4-states();
```
Author : Olivier Bossel <olivier.bossel@gmail.com>
# Base API

This are all the base API mixins that are exposed by gridle.


## Mixins


### g-layout

Specify a layout using a single call like in the example bellow


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$layout  |  **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }**  |  The map layout wanted  |  required  |
$context  |  **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) , [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) , [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The context in which to apply the layout  |  optional  |  null

#### Example
```scss
	body {
	@include g-layout((
	 	'#header' : 12,
	 	'#sidebar' : 4 mobile 12,
	 	'#content' : 8 mobile 12,
	 	'#footer' : 12
	));
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-state

Apply some styling in a passed state


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$states  |  **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) , [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) , [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The states to apply the css for. Can be a state map, a list of states or a state name  |  required  |

#### Example
```scss
	.my-cool-element {
	// specify a register state name
	@include g-state(mobile) {
		// your css code here...
	}
	// specify more than one register states
	@include g-state(mobile tablet) {
		// your css code here...
	}
 // specify a min and max width
	@include g-state(200px, 500px) {
		// your css code here...
	}
	// passing a state map (complexe usage)
	@include g-state((
		query : 'print only'
	)) {
		// your code here...
	}
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-eq

Apply some css depending on the element size (element queries)
**Using this mixin requires that you import the ```gridle-eq.js``` file into your javascript code**


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$size  |  **{ Number }**  |  The size to take care of. If negative, mean lower than, if positive, mean greater than.  |  required  |
$height  |  **{ Boolean }**  |  Set to true to handle height instead of width  |  optional  |  false

#### Example
```scss
	.my-cool-element {
 	@include g-eq(-400px) {
 		// your css that will be applied when element
 		// is between 0 and 399px wide
 	}
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-state-context

Basically, this is the same as the ```g-state``` mixin, with the difference that it will not print any media queries. It will just create a state context in which your inside code will refer.


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$states  |  **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) , [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) , [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The states to apply the css for. Can be a state map, a list of states or a state name  |  required  |

#### Example
```scss
	}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-selector

Will print the generated selector depending on the "package" wanted, the state and some optional values that might be needed by the package (like for row-align that need a "side" value)


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$package  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The package to generate the selector for (see _settings.scss file)  |  required  |
$states  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) , List<String }**  |  The list of state to generate the selector for. If not specified, will generate for all registered states  |  optional  |  null
$value  |  **{ Mixed }**  |  The value that will be used to replace the "%{tokenName}" inside the package pattern  |  optional  |  null

#### Example
```scss
	@include g-selector(grid, mobile, 2) {
	// your code here
	// The selector will be .gr-2@mobile
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### gridle

Helper gridle mixin that let you specify the grid properties through ```g-set``` map, or a list of properties like "8 push 2 mobile 12 push 0"


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$properties  |  **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) , [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }**  |  The grid properties to apply  |  required  |

#### Example
```scss
	#content {
	// using list
	@include gridle(8 mobile 12);
	// using a map
	@include gridle((
		grid : 8,
		mobile : (
			grid : 12
		)
	));
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-set

Helper mixin that let you specify the grid properties through map formated like in the example bellow.
Here's the possible properties:

- ```grid``` {Integer} : The grid column count
- ```container``` {Boolean} : Set the element as container
- ```grid-grow``` {Boolean} : Set the element a grid column that grow
- ```grid-adapt``` {Boolean} : Set the element a grid column that adapt
- ```grid-table``` {Boolean} : Set the element a grid column of type table
- ```push``` {Integer} : Set the push count
- ```pull``` {Integer} : Set the pull count
- ```prefix``` {Integer} : Set the prefix count
- ```suffix``` {Integer} : Set the suffix count
- ```clear-each``` {Integer} : Set the clear each count
- ```grid-centered``` {Boolean} : Set the grid column as centered
- ```row``` {Boolean} : Set the element as a grid row
- ```row-full``` {Boolean} : Set the element as a grid row full
- ```col``` {Boolean} : Set the element as a grid column (vertical)
- ```row-align``` {String} : Set the row alignement
- ```row-no-gutter``` {Boolean} : Remove the gutters on columns inside this row
- ```nowrap``` {Boolean} : Set a nowrap on the row
- ```wrap``` {Boolean} : Reset the wrap property on the row
- ```order``` {Integer} : Set the order of the column (flex driver)
- ```hide``` {Boolean} : Hide the element
- ```show``` {Boolean} : Show the element
- ```visible``` {Boolean} : Set the visibility of the element to visible
- ```not-visible``` {Boolean} : Set the visibility of the element to hidden
- ```invisible``` {Boolean} : Set the visibility of the element to hidden
- ```show-inline``` {Boolean} : Set the display of the element to inline-block
- ```float``` {String} : Set the specified float of the element
- ```clear``` {String} : Clear the specified float of the element
- ```no-gutter``` {Boolean|String|List<String>} : Remove the specified gutters
- ```gutter``` {Boolean|String|List<String>} : Apply the specified gutters



Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$properties  |  **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }**  |  The grid map properties to apply  |  required  |

#### Example
```scss
	#content {
	// using a map
	@include gridle((
		grid : 8,
		push : 2
		mobile : (
			grid : 12
		),
		{stateName} : {mapProperties}
	));
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-push

Set the push count for the column


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$columns  |  **{ Integer }**  |  The number of columns to push this column  |  required  |
$context  |  **{ Integer }**  |  The context on which to calculate the push value. By default, it is the default context setted with ```g-setup```.  |  optional  |  null

#### Example
```scss
	.my-cool-column {
	@include g-push(2);
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-pull

Set the pull count for the column


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$columns  |  **{ Integer }**  |  The number of columns to pull this column  |  required  |
$context  |  **{ Integer }**  |  The context on which to calculate the pull value. By default, it is the default context setted with ```g-setup```.  |  optional  |  null

#### Example
```scss
	.my-cool-column {
	@include g-pull(2);
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-prefix

Set the prefix count for the column


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$columns  |  **{ Integer }**  |  The number of columns to prefix this column  |  required  |
$context  |  **{ Integer }**  |  The context on which to calculate the prefix value. By default, it is the default context setted with ```g-setup```.  |  optional  |  null

#### Example
```scss
	.my-cool-column {
	@include g-prefix(2);
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-suffix

Set the suffix count for the column


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$columns  |  **{ Integer }**  |  The number of columns to suffix this column  |  required  |
$context  |  **{ Integer }**  |  The context on which to calculate the suffix value. By default, it is the default context setted with ```g-setup```.  |  optional  |  null

#### Example
```scss
	.my-cool-column {
	@include g-suffix(2);
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-row-debug

Display a debug grid on top of the row

#### Example
```scss
	.my-row {
	@include g-row-debug();
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-container

Make the element a grid container

#### Example
```scss
	.my-cool-container {
	@include g-container();
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-row-no-gutter

Remove the gutters on each columns inside the row


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$sides  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) , List<String> }**  |  The sides to clear  |  optional  |  top right bottom left

#### Example
```scss
	.my-cool-row {
	@include g-row-no-gutter(left right);
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-grid-centered

Make a column centered

#### Example
```scss
	.my-cool-column {
	@include g-grid-centered();
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-hide

Hide an element

#### Example
```scss
	.my-cool-element {
	@include g-hide();
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-not-visible

Set the visibility of an element to hidden

#### Example
```scss
	.my-cool-element {
	@include g-not-visible();
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-invisible

Set the visibility of an element to hidden

#### Example
```scss
	.my-cool-element {
	@include g-invisible();
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-show

Set the display of an element to block

#### Example
```scss
	.my-cool-element {
	@include g-show();
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-show-inline

Set the display of an element to inline-block

#### Example
```scss
	.my-cool-element {
	@include g-show();
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-show-flex

Set the display of an element to flex

#### Example
```scss
	.my-cool-element {
	@include g-show-flex();
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-show-inline-flex

Set the display of an element to inline-flex

#### Example
```scss
	.my-cool-element {
	@include g-show-inline-flex();
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-visible

Set the visibility of an element to visible

#### Example
```scss
	.my-cool-element {
	@include g-show();
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-float

Set the float property of the element to the specified direction


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$float  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The float direction to set  |  optional  |  left

#### Example
```scss
	.my-cool-element {
	@include g-float(right);
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-clear

Clear the float property of the element to the specified direction


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$float  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The float direction to clear  |  optional  |  left

#### Example
```scss
	.my-cool-element {
	@include g-clear(right);
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-no-gutter

Remove the gutters on the column


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$sides  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) , List<String> }**  |  The sides to clear  |  optional  |  top right bottom left

#### Example
```scss
	.my-cool-column {
	@include g-no-gutter(left right);
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-gutter

Set the gutters on the column


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$sides  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) , List<String> }**  |  The sides to apply gutters on  |  optional  |  top right bottom left

#### Example
```scss
	.my-cool-column {
	@include g-gutter(left right);
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>
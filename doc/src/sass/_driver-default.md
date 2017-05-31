# Default driver API

This are all the API mixins that are exposed by gridle for the default driver.


## Mixins


### g-row

Set the element as a row


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$reverse  |  **{ Boolean }**  |  Revert the columns order if true  |  optional  |  false

#### Example
```scss
	.my-cool-row {
	@include g-row();
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-col

Set the element as a col


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$reverse  |  **{ Boolean }**  |  Revert the columns order if true  |  optional  |  false

#### Example
```scss
	.my-cool-col {
	@include g-col();
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-nowrap

Apply a nowrap on the element

#### Example
```scss
	.my-cool-element {
	@include g-nowrap();
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-wrap

Reset the nowrap on the element

#### Example
```scss
	.my-cool-element {
	@include g-wrap();
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-grid

Apply a column width on the element


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$columns  |  **{ Integer , [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The column count to apply or a registered column name  |  required  |
$context  |  **{ Integer }**  |  The context on which to calculate the column width. If null, take the context setted with ```g-setup```  |  optional  |  null

#### Example
```scss
	.my-cool-column {
	@include g-grid(2);
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-grid-table

Set the grid element as a table display type

#### Example
```scss
	.my-cool-column {
	@include g-grid(2);
	@include g-grid-table();
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-row-full

Set the width of the row element to full viewport width

#### Example
```scss
	.my-cool-row {
 @include g-row();
	@include g-row-full();
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-grid-adapt

Set the width of the grid element to adapt to his content

#### Example
```scss
	.my-cool-column {
 @include g-grid-adapt();
 // or
 @include g-grid(adapt);
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-grid-grow

Set the width of the grid element to grow depending on the place it has at disposal

#### Example
```scss
	.my-cool-column {
 @include g-grid-grow();
 // or
 @include g-grid(grow);
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-clear-each

Clear each n childs

#### Example
```scss
	.my-cool-row {
 @include g-clear-each(2);
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-row-align

Set the alignement of the columns inside the row using these alignement properties:

- top : Align vertical top
- middle : Align vertical middle
- bottom : Align vertical bottom
- left : Align horizontal left
- center : Align horizontal center
- right : Align horizontal right


#### Example
```scss
	.my-cool-row {
 @include g-row-align(middle center);
 @include g-row-align(right);
 @include g-row-align(middle);
 // etc...
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>
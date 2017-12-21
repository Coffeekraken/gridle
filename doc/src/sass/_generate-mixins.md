# Generate mixins

This are all the mixins that you can use to generate classes to use inside your HTML codebase


## Mixins


### g-custom-class

Generate a custom class for all the states


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$pattern  |  **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }**  |  The name pattern of the class  |  required  |
$statesNames  |  **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }**  |  The states names to generate. If null or all, will generate the class for all registered states  |  optional  |  null

#### Example
```scss
	@include g-generate-custom-class(('my','-','cool','-','class','-','%state')) {
	color: pink;
	padding: g-get-state-var(gutter-left);
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-classes




Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$states  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) , List<String> }**  |  The states to generate the classes for  |  optional  |  all
$package  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) , List<String> }**  |  The packages to generate the classes for  |  optional  |  all
$scope  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  A classname to scope the classes in  |  optional  |  null

#### Example
```scss
	// generate all the classes
@include g-classes();
// generate only certain states
@include g-classes(mobile tablet);
// generate only the helpers for all the states
@include g-classes(all, helpers);
```
Author : Olivier Bossel <olivier.bossel@gmail.com>
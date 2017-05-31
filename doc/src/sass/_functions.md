# Functions API

This are all the API functions that are exposed by gridle.



## Functions


### g-states-count

Get states count

Return **{ Integer }** The number of states defined

Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-current-state

Get the current state map

Return **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }** The current state map

Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-current-state-name

Get the current state name

Return **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** The current state name

Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-column-width

Get the column width in percent for the global or a specific context



Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$columns  |  **{ Integer }**  |  The number of columns to calculate  |  optional  |  1
$stateMap-or-stateName  |  **{ Integer }**  |  The state to calculate the column width for  |  optional  |  current

Return **{ Percent }** The width in percent

Author : Olivier Bossel <olivier.bossel@gmail.com>



### g-has-state

Check if a state exist :


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$name  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The name of the state to check  |  required  |

Return **{ Boolean }** true if exist

Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-get-state-var

Get a state variable



Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$varName  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The variable name  |  required  |
$stateMap-or-stateName  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The state name or a map state value  |  optional  |  current

Return **{ Mixed }** The finded value


### g-set-state-var

Set a variable in a state


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$var  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  Variable name to assign  |  required  |
$newValue  |  **{ Mixed }**  |  The new value to assign  |  required  |
$state  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The state to apply the variable for  |  optional  |  current

Return **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }** The states list (full)

Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-states

get the registered gridle states

Return **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }** All the registered states

Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-states-names

get the registered gridle states names

Return **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }** All the registered states names

Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-get-columns

Get the register columns map


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$state  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) , List<String> }**  |  The state name or map  |  optional  |  current

Return **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }** The map of registered columns for the specified state

Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-selector

Will return the generated selector depending on the "package" wanted, the state and some optional values that might be needed by the package (like for row-align that need a "side" value)


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$package  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The package to generate the selector for (see _settings.scss file)  |  required  |
$states  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) , List<String }**  |  The list of state to generate the selector for. If not specified, will generate for all registered states  |  optional  |  null
$value  |  **{ Mixed }**  |  The value that will be used to replace the "%{tokenName}" inside the package pattern  |  optional  |  null

#### Example
```scss
	#{g-selector(grid, mobile, 2)} {
	// your code here
	// The selector will be .gr-2@mobile
}
```
Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-driver

Return the current used driver

Return **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** The used driver like default or driver

Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-is-driver

Check if the used driver is the specified one


Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$driver  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The driver to check  |  required  |

Return **{ Boolean }** True if is the current driver

Author : Olivier Bossel <olivier.bossel@gmail.com>


### g-get-media-query

Get the media query for a particular state, or width, etc...



Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$stateName-or-stateMap  |  **{ Mixed }**  |  The state name of the min width  |  optional  |  current

Return **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** The media query string without the @media
# 3.0.0-rc.1

- Renaming package
	- Gridle package name is now **```coffeekraken-gridle```**


- Transform all mixins, functions and variables names to:
	- **dash-case**
	- replace all "gridle" by "g"
	- Mean ```gridle_setup``` has became ```g-setup```, etc...

- Mobile first:
	- Remove the ```gridle_register_default_mobile_first_states()```
	- Add the ```g-register-mobile-first-states()``` mixin
	- Add the ```g-register-bootstrap3-states()``` mixin
	- Add the ```g-register-bootstrap4-states()``` mixin

- Move directory:
 	- From : [https://github.com/olivierbossel/gridle](https://github.com/olivierbossel/gridle)
 	- To : [https://github.com/coffeekraken/gridle](https://github.com/coffeekraken/gridle)


- Stop supporting bower and ruby gem package distribution.
	- Gridle will be available **only through NPM** or by direct download


- Remove Gulp and Bower in profit of simple node scripts defined in the package.json file
- Clean and restructure the repository
	- Add an install script that clean some files
	- Add to the root the ```_index.scss``` file to be able to import gridle easily
	- Add to the root the ```_flex.scss``` file to be able to import gridle flex driver easily
- Rename ```gridle_generate_classes``` to ```g-classes```
- Rename ```gridle_generate_custom_class``` to ```g-custom-class```
- Removing totally the obvious and unused default states (tv, retina, etc...)
- Adding auto-generated API documentation and docblocks through the [coffeekraken-docblock-to-markdown](https://github.com/coffeekraken/docblock-to-markdown) node module
- Adding some styleguide docblock to work with the [coffeekraken-carpenter](https://github.com/coffeekraken/carpenter) web styleguide and documentation interface
	- Display the states informations
	- Display all the available columns
- Remove the changelog.md file in documentation and use the default CHANGELOG.md root file for that.

## 2.0.47

- Add the support for the row/col-reverse class in the default driver
- Fix minor nested grids classes to not use too generic one

## 2.0.46

- Do not generate the row-reverse and the col-reverse class in default driver

#### Allow direct state in universal mixin

- Allow to make direct state assignation in the universal mixin like @include gridle(mobile 12 push 4)

## 2.0.45

- Fix the no-gutter in gridle set documentation that was refering to no_gutter and not no-gutter
- Fix the call to apply_css_for in non generate phase that was at the base of some issues like not applying the state gutter when using the mixins only, etc...

## 2.0.44

- Remove the debug statement that print out "generate classes for mobile", etc...
- Correct the gridle parameter conversion when there's only 1 parameter that need to be passed to a mixin
- Add the ```g-set-generic-class``` mixin. This allows you to tell the framework which generic class to use when generate classes for some element targeting like [class*="no-gutter"] > .row { ...
- Improve clear-each classes to target grid element even if others elements are injected in the html between grids (thanks Robert Krieg)

## 2.0.43

- By default, do not register default states like tv, retina, etc. If you want them, set $gridle-default-states to true

## 2.0.42

- Due to some weird things, on firefox the row-align middle need to have a tiny margin-right applied to avoid line breaks

## 2.0.41

- Due to float that have been removed in 2.0.4, the clear and clear-each did not worked properly anymore. It's now all ok
- Some weird issues happend when extend in an at-root statement.

## 2.0.4

- Add ```gridle``` universal mixin. The universal mixin allows you to write complexe gridle instructions in 1 line
- Add the dir attribute support. You can now specify that a part of your layout has a different direction with the dir="rtl" html attribute
- Add support for the column-width setting in setup. This has to be used only if you now what you are doing. By default gridle is a percentage based grid system...

## 2.0.3

- Your grid will now have the full container width available cause all the rows will expand themselves by the gutter width. This is a better behavior.
- There's now a LICENSE.txt file in the repo.

## 2.0.2

- You have now support for element queries.

## 2.0.0

- To handle the nested grids, previous version had a parent class. This is no more needed.
- The new row class is at some point a replacement for the parent one. This class has to wrap each "lines" of columns. You will have more control over your columns alignement, etc...
- The grid-... classes has now became gr-... . It's 2 letters I know but this mean a lot in a large project...
- Now all of the grid classes stay in the same format. To scope a class in a particular state, just add @{stateName} at the end of your classname.
- The all new gr-grow and gr-adapt classes allows you to create columns that will behave dpending of the column content instead of a specific width.
- The all new row-align-... classes allows you to align your columns as you want (top, middle, bottom, left, center, right).
- Gridle has now a full flex version. To use this version, check out the driver section on the documentation. Some features are only available in a specific driver
- Gridle has now multiple drivers that you can use to generate your grid. For now the default and the flex driver are available. Some features are only available in a specific driver (cf. documentation).
- These classes are useful in conjunction with the gr-adapt and gr-grow to handle complexe layouts.
- The new row-full class allows you to make a row take the entire screen width.
- Some new classes to order your columns
- You can now nest your gridle_... mixins in a gridle_state one
- Some new functions have been added to the api (cd. documentation)
- Update all comments to avoid comments in generated css

### 1.3.39

- Fix compatibility with gridle_state(min-width, max-width) mixin
- Expose some functions to public API and document them

### 1.3.38

- Adding a gridle.min.js that to not fetch .map file

### 1.3.37

- Fix issue with gridle.js and regexp to grab states in css file

### 1.3.36

- Fix some deprecated messages warning (thanks to omgmog)
- publish to npm

### 1.3.35

- Fix issue with gridle mixin when want to specify a context as second parameter
- Add ability to use custom registered columns in gridle mixin like so : @include gridle('1on5');
- Add tests.scss file to make sure nothing will be broken in future releases
- Optimize output css to avoid multiple css declaration when not needed

### 1.3.33

- Fix issue with gridle_float (thanks to jeton <https://github.com/jeton> for pointing this issue)

### 1.3.32

- Fix issue with sass 3.4 !global thing...

### 1.3.31

- Fix issue with the ddpx shit in chrome (you're welcome Luca Pillonel, my dear collegue that yield for this """"""issue"""""" since... I can't even remember.....)

### 1.3.30

- Add gridle_set mixin to help users that use mixins apply more than 1 gridle mixin on an item

### 1.3.29

- Fix some classes generation issues when setting up classes : false
- Register default helpful states like retina, print, tv, etc... that does not generate classes by default
- Adding a global setting to generate or not the json settings in css (used by gridle.js)

### 1.3.28

- Make the mixins gridle, gridle_push, pull, etc... handle the name multiplicator. So if you have a context of 20 and a name multiplicator, when you want a full with column, you need to set gridle(100, mobile). The 100 is not 100%, but your context 20 * your name multiplicator 5

### 1.3.25

- Add compass gem support

### 1.3.24

- Update gridle.js to 1.0.1
- Add "cssPath" setting to make gridle fetch only this css file to find states

### 1.3.23

- Make the gridle_generate_classes mixin handler order of requested "what" classes

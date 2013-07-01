# gridle


One grid system to rule them all (.scss)

Gridle is a set of complete and simple settings, mixins and classes that make the creation and usage of grid systems (even complex ones) really simple. All of this with full responsive capabilities

## [Visit Website](http://gridle.org/) for full documentation



## Quick start
	
Importing gridle

	import "gridle/gridle"

Configure your grid :

	$gridle-columns-count : 12;
	$gridle-gutter-width : 20px;
	- and many more options...

Register states (media queries) (optional) :

	@include gridle_register_state('tablet',401px,767px);
	@include gridle_register_state('mobile',0,400px);
	- make the use of media queries really easy

Generate all classes :

	@include gridle_generate_classes();

Use your grid in hrml :

	<div class="container">
		<div class="grid-12">
			Header
		</div>
		<div class="grid-8 grid-mobile-12">
			Content
		</div>
		<div class="grid-4 grid-mobile-12">
			Sidebar
		</div>
	</div>

Customize your content look and feel with Gridle mixins

	#sidebar {
		background : red;

		@include gridle_responseTo('mobile') {
			background : green;
		}
	}
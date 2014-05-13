# gridle (v1.2.0)


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
	@include gridle_register_state('print', 'only print');
	- make the use of media queries really easy

Generate all classes :

	@include gridle_generate_classes();

Use your grid in hrml :

	<div class="container">
		<div class="grid-12 hide-print">
			Header
		</div>
		<div class="grid-8 grid-mobile-12">
			Content
		</div>
		<div class="grid-4 grid-mobile-12 hide-print">
			Sidebar
		</div>
	</div>

Or with mixins :

	.container {
		@include gridle_container();
		max-width:960px;
		margin:0 auto;
	}
	#header {
		@include gridle(12);
	}
	#sidebar {
		@include gridle(8);
		@include gridle(12, 'mobile');
	}
	#sidebar {
		@include gridle(4);
		@include gridle_hide('mobile');
	}
	@footer {
		@include gridle(12);
	}

Customize your content look and feel with Gridle mixins

	#sidebar {
		background : red;

		@include gridle_state('mobile') {
			background : green;
		}
	}
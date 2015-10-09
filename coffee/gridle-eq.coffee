###
# Gridle-eq.js
#
# This little file is a bridge to support the element queries
# @copyright marcj https://github.com/marcj/css-element-queries
#
# @author 	Olivier Bossel <olivier.bossel@gmail.com>
# @created 	20.05.14
# @updated 	09.10.15
# @version 	1.0.0
###
((factory) ->
	if typeof define == 'function' and define.amd
		# AMD. Register as an anonymous module.
		define [ ], factory
	else if typeof exports == 'object'
		# Node/CommonJS
		factory()
	else
		# Browser globals
		factory()
	return
) () ->

	###
	# Define class
	###
	class GridleEq

		###
		# Init
		###
		constructor : () ->

			# element queries
			eq = new ElementQueries()
			eq.init()

		###
		# Update
		###
		update : () ->
			ElementQueries.update()

	# Init and set in window
	window.GridleEq = new GridleEq()
	
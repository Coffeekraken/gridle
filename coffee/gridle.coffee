###
# Gridle.js
#
# This little js file allow you to detect which or your gridle state is active, when states changes, etc...
#
# @author 	Olivier Bossel <olivier.bossel@gmail.com>
# @created 	20.05.14
# @updated 	09.10.15
# @version 	1.0.14
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
	Little smokesignals implementation
	###
	smokesignals =
		convert : (obj, handlers) ->
			handlers = {}
			obj.on = (eventName, handler) ->
				(handlers[eventName] = handlers[eventName] || []).push handler
				return obj
			obj.emit = (eventName) ->
				return if not handlers[eventName]
				for handler in handlers[eventName]
					handler.apply obj, Array.prototype.slice.call(arguments, 1)
					continue
				return obj
			return obj

	###
	Gridle.js
	###
	window.Gridle =

		# store if already initialised or not
		_inited : false

		# save the ready status
		# this will be true when the states are finded or if no states exists in css (if gridle is not used)
		_isReady : false

		# save the states finded in css
		_statesInCss : null

		# boolean to save when the states are finded in css
		# this is used to stop search when the states are finded
		_statesFindedInCss : false,

		# settings finded in css (getted by an ajax request)
		_cssSettings : []

		# store states
		_states : []
		_activeStates : []
		_activeStatesNames : []
		_inactiveStates : [],
		_inactiveStatesNames : [],
		_updatedStates : [],
		_updatedStatesNames : [],

		# resize timeout to not update every ms on resize
		resizeTimeout : null,

		# default settings that can be overrided on init
		_settings :
			onUpdate : null
			debug : null
			ignoredStates : []

		###
		Init
		###
		init : (settings) ->

			# update inited status
			@_inited = true

			# process settings
			if settings?.ignoredStates? and (default_index = settings.ignoredStates.indexOf 'default') > -1
				settings.ignoredStates.splice default_index, 1

			@_settings = @_extend @_settings, settings if settings


			@_debug 'waiting for content to be fully loaded'

			domLoaded () =>
				@_parseCss()

		###
		Extending object function
		###
		_extend : (object, properties) ->
			for key, val of properties
				object[key] = val
			object

		###
		Load and parse css
		###
		_parseCss : () ->

			# try to find gridle settings
			i = 0
			j = document.styleSheets.length
			settings_found = false
			while i < j
				try
					rules = document.styleSheets[i].cssText or document.styleSheets[i].cssRules or document.styleSheets[i].rules
					if typeof rules is 'string'
						# try to find settings in css
						settings = rules.match(/#gridle-settings(?:\s*)\{(?:\s*)content(?:\s*):(?:\s*)\"(.+)\"(;\s*|\s*)\}/) && RegExp.$1;
						if settings
							# parse settings to json
							settings = settings.toString().replace(/\\/g,'');
							settings = JSON.parse settings;
							@_cssSettings = settings;
							settings_found = true
							@_cssSettings = settings
							@_statesInCss = settings.states
					else
						for idx, rule of rules
							if /#gridle-settings/.test(rule.cssText)
								settings = rule.cssText.toString().match(/:(.*);/) && RegExp.$1;
								settings = settings.toString().replace(/\\/g,'');
								settings = settings.trim()
								settings = settings.substr(1)
								settings = settings.substr(0,settings.length-1)
								settings = JSON.parse settings;
								if settings?.states?
									@_cssSettings = settings
									@_statesInCss = settings.states
									settings_found = true
									continue
				catch e
					if e.name != 'SecurityError'
						throw e
				i++

			# process states
			if @_statesInCss
				@_processFindedStates()
			else
				@_debug "no states found..."

		###
		Process finded states
		###
		_processFindedStates : ->

			@_debug 'begin process finded states in css'

			# loop on each states
			for name, query of @_statesInCss

				if @_settings.ignoredStates.indexOf(name) == -1
					# register a state
					@_registerState name, query


			# launch the app
			@_launch()

		###
		Launch
		###
		_launch : ->

			@_debug 'launch'

			# mark app as ready
			@_isReady = true

			# emit ready event
			@_crossEmit 'ready'

			# listen for window resize
			@_addEvent window, 'resize', (e) =>
				clearTimeout @resizeTimeout
				@resizeTimeout = setTimeout =>
					@_onResize()
				, 100

			#trigger first resize
			@_onResize()

		###
		On window resize
		###
		_onResize : ->

			# track updated states
			updatedStates = []

			# update states status
			@_updateStatesStatus()

			# debug
			@_debug 'active states', @getActiveStatesNames().join(',') if @getActiveStatesNames().length
			@_debug 'inactive states', @getInactiveStatesNames().join(',') if @getInactiveStatesNames().length
			@_debug 'updated states', @getUpdatedStatesNames().join(',') if @getUpdatedStatesNames().length

		###
		Register a state
		###
		_registerState : (name, state, updateOnResize) ->

			# make info object
			infos =
				name : name
				query : state.query
				settings : state
				status : null
				previous_status : null
				updateOnResize : if updateOnResize? then updateOnResize else true

			# push new state
			@_states.push infos

			@_debug '|--- register state', name, infos

		###
		Update states status
		###
		_updateStatesStatus : ->

			# check if was default state
			defaultState = @getDefaultState()
			defaultStateIdx = @_states.indexOf defaultState
			wasDefault = defaultState.status

			# reset trackings arrays
			@_activeStates = [];
			@_activeStatesNames = [];
			@_inactiveStates = [];
			@_inactiveStatesNames = [];
			@_updatedStates = [];
			@_updatedStatesNames = [];

			# loop on each states
			for key, state of @_states

				# do not take care if not update on resize
				continue if not state.updateOnResize

				# save status
				@_states[key].previous_status = state.status

				# check is state is active
				if @_validateState state

					# check is status has changed
					if not @_states[key].status

						# save this state has changed one
						@_updatedStates.push state
						@_updatedStatesNames.push state.name

					# update status
					@_states[key].status = true

					# add in active state
					@_activeStates.push state
					@_activeStatesNames.push state.name

				# the state is not active
				else if state.name != 'default'

					# check is status has changed
					if @_states[key].status

						# add state in changed ones
						@_updatedStates.push state
						@_updatedStatesNames.push state.name

					# update status
					@_states[key].status = false

					# add state in unactives
					@_inactiveStates.push state
					@_inactiveStatesNames.push state.name

			# if no states are active, set the default one
			if not @_activeStates.length
				@_states[defaultStateIdx].status = true
				@_activeStates.push defaultState
				@_activeStatesNames.push 'default'
				if not wasDefault
					@_updatedStates.push defaultState
					@_updatedStatesNames.push 'default'
			else
				@_states[defaultStateIdx].status = false
				@_inactiveStates.push defaultState
				@_inactiveStatesNames.push 'default'
				if wasDefault
					@_updatedStates.push defaultState
					@_updatedStatesNames.push 'default'

			# trigger events if needed
			@_crossEmit 'update', @_updatedStates, @_activeStates, @_inactiveStates if @_updatedStates.length
			@_settings.onUpdate @_updatedStates, @_activeStates, @_inactiveStates if @_updatedStates.length and @_settings.onUpdate

		###
		Validate state
		###
		_validateState : (state) =>

			# validate state using matchmedia
			return matchMedia(state.query).matches

		###
		Add event
		###
		_addEvent : (elm, type, handler) ->

			# check params
			return false if not elm

			# if addeventlistener exist
			if elm.addEventListener
				elm.addEventListener type, handler, false
			else if elm.attachEvent
				elm.attachEvent 'on'+type, handler
			else
				elm['on'+type] = handler

		###
		Cross emit for supporting jquery libs, etc...
		###
		_crossEmit : (eventName) ->

			# jquery
			if jQuery?
				# trigger event on Gridle object
				jQuery(@).trigger eventName, Array.prototype.slice.call(arguments, 1)
				# trigget event trough the body
				jQuery('body').trigger('gridle.'+eventName, Array.prototype.slice.call(arguments, 1))

			# emit from smokesignals
			@emit.apply @, arguments

		###
		Ajax proxy
		###
		_ajax : (opts) ->

			# process arguments
			args =
				type : opts.type || 'GET'
				url : opts.url
				success : opts.success
				error : opts.error
				dataType : opts.dataType || 'text'
				context : opts.context

			# create http request object
			http = new XMLHttpRequest;

			# set context
			http.context = args.context if args.context

			# open connexion
			http.open args.type, args.url, true

			# listen state change
			http.onreadystatechange = ->

				# do not care if the state is not success
				return false if http.readyState != 4

				# check response status
				switch http.status

					# when success
					when 200

						# switch on dataType to send back correct response
						switch args.dataType

							when 'json'
								response = JSON.parse http.responseText
							else
								response = http.responseText

						# call success callback if exist
						args.success response, http.status, http if args.success
			# send request
			http.send()

		###
		Get default state
		###
		getDefaultState : ->
			for state in @getRegisteredStates()
				return state if state.name is 'default'

		###
		Get registered states
		###
		getRegisteredStates : -> @_states

		###
		Get changes states
		###
		getUpdatedStates : -> @_updatedStates

		###
		Get changes states names
		###
		getUpdatedStatesNames : -> @_updatedStatesNames

		###
		Get active states
		###
		getActiveStates : -> @_activeStates

		###
		Get active states names
		###
		getActiveStatesNames : -> @_activeStatesNames

		###
		Get unactive states
		###
		getInactiveStates : -> @_inactiveStates

		###
		Get unactive states names
		###
		getInactiveStatesNames : -> @_inactiveStatesNames

		###
		Check is a state is active
		###
		isActive : (stateName) ->

			# isActive
			isActive = false;

			# loop on each active states
			for index, name of @_activeStatesNames
				isActive = true if stateName == name

			# return if is active or not
			return isActive

		###
		Check if gridle is ready
		###
		isReady : ->
			return @_isReady


		###
		Debug
		###
		_debug : ->
			console.log 'GRIDLE', arguments if @_settings.debug


	###
	# DomLoaded
	###
	_domLoaded = false
	domLoaded = (callback) ->

		_loaded = (callback) ->

			if _domLoaded
				callback()
				return

			if document.readyState is 'complete'
				_domLoaded = true
				callback()
				return

			`/* Internet Explorer */
			/*@cc_on
			@if (@_win32 || @_win64)
				document.write('<script id="ieScriptLoad" defer src="//:"><\/script>');
				document.getElementById('ieScriptLoad').onreadystatechange = function() {
					if (this.readyState == 'complete') {
						_domLoaded = true;
						callback();
					}
				};
			@end @*/
			/* Mozilla, Chrome, Opera */
			if (document.addEventListener) {
				document.addEventListener('DOMContentLoaded', function() {
					_domLoaded = true;
					callback();
				}, false);
			}
			/* Safari, iCab, Konqueror */
			if (/KHTML|WebKit|iCab/i.test(navigator.userAgent)) {
				var DOMLoadTimer = setInterval(function () {
					if (/loaded|complete/i.test(document.readyState)) {
						_domLoaded = true;
						callback();
						clearInterval(DOMLoadTimer);
					}
				}, 10);
			}
			/* Other web browsers */
			window.onload = function() {
				_domLoaded = true;
				callback();
			};`

		if window.addEventListener
			window.addEventListener 'load', () =>
				_domLoaded = true
				callback()
			, false
		else
			window.attachEvent 'onload', () =>
				_domLoaded = true
				callback()
		_loaded () =>
			callback()

	# make gridle event dipatcher
	smokesignals.convert window.Gridle

	# init if not already done :
	domLoaded () ->
		setTimeout ->
			Gridle.init() if not Gridle._inited
		, 500

	# return the gridle object
	Gridle

###
# Gridle.js
#
# This little js file allow you to detect witch or your gridle state is active, when states changes, etc...
#
# @author 	Olivier Bossel <olivier.bossel@gmail.com>
# @created 	20.05.14
# @updated 	09.02.15
# @version 	1.0.12
###
do ->

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
		
		# all the css link tag in the page
		_cssLinks : []

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
			cssPath : null 				# if set, only this css will be fetched
			onUpdate : null
			debug : null

		###
		Init
		###
		init : (settings) ->

			# update inited status
			@_inited = true

			# process settings
			@_settings = settings if settings?
			@_settings.debug ? settings.debug if settings and settings.debug?
			@_settings.onStatesChange ? settings.onStatesChange if settings and settings.onStatesChange?

			@_debug 'ajax request on stylesheets to find gridle states'

			# check if a cssPath exist in options to fetch only that one
			if @_settings.cssPath
				@_cssLinks.push
					href : @_settings.cssPath
			else
				# loop on each link tag to get each css url :
				_cssLinks = document.getElementsByTagName 'link'
				for index, link of _cssLinks
					return false if not link
					@_cssLinks.push link

			# parse the css links :
			@_loadAndParseCss if @_cssLinks.length

			# else, launch
			else @_launch

		###
		Load and parse css
		###
		_loadAndParseCss : ->

			# loop on each links
			for index, link of @_cssLinks
			
				# stop if stated finded
				return false if @_statesFindedInCss

				# if no href, continue
				continue if not link or not link.href

				@_debug '|--- ajax request on ', link.href

				# process ajax request on link
				@_ajax
					async : true,
					url : link.href
					success : (response) =>

						return false if @_statesFindedInCss

						# if no response, tell that the response is processed and stop
						if not response
							@_noSettingsFindedInThisCss link
							return false

						# try to find settings in css
						settings = response.match(/#gridle-settings(?:\s*)\{(?:\s*)content(?:\s*):(?:\s*)\'(.+)\'(;\s*|\s*)\}/) && RegExp.$1;

						console.log 'settings', settings

						# stop if no settings
						if not settings
							@_noSettingsFindedInThisCss link
							return false

						# parse settings to json
						settings = JSON.parse settings;
						@_cssSettings = settings;

						# check query :
						if not settings.states
							@_debug 'no queries finded in css'
							@_noSettingsFindedInThisCss link
							return false;

						@_debug '|--- states finded in', link.href

						# update states finded status 
						@_statesFindedInCss = true

						# save states :
						@_statesInCss = settings.states

						# process finded states
						@_processFindedStates()

					error : (error) =>

						# check if already finded
						return false if @_statesFindedInCss

						# simulate processed link
						@_noSettingsFindedInThisCss link

					dataType : 'text'

		###
		Css link processed
		###
		_noSettingsFindedInThisCss : (link) ->

			# remove link from array
			@_cssLinks.shift

			# check if no more links to launch
			if not @_cssLinks.length	

				@_debug 'no settings finded in css'

				# launch anyway
				# @_launch

		###
		Process finded states
		###
		_processFindedStates : ->

			@_debug 'begin process finded states in css'

			# loop on each states
			for name, query of @_statesInCss

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
				else

					# check is status has changed 
					if @_states[key].status

						# add state in changed ones
						@_updatedStates.push state
						@_updatedStatesNames.push state

					# update status
					@_states[key].status = false

					# add state in unactives
					@_inactiveStates.push state
					@_inactiveStatesNames.push state.name

			# trigger events if needed
			@_crossEmit 'update', @_updatedStates, @_activeStates, @_inactiveStates if @_updatedStates.length
			@_settings.onUpdate @_updatedStates, @_activeStates, @_inactiveStates if @_updatedStates.length and @_settings.onUpdate

		###
		Validate state
		###
		_validateState : (state) ->

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
			http.open args.type, args.url, false

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
		Get registered states
		###
		getRegisteredStates : ->return @_states

		###
		Get changes states
		###
		getUpdatedStates : -> return @_updatedStates

		###
		Get changes states names
		###
		getUpdatedStatesNames : -> return @_updatedStatesNames

		###
		Get active states
		###
		getActiveStates : -> return @_activeStates

		###
		Get active states names
		###
		getActiveStatesNames : -> return @_activeStatesNames

		###
		Get unactive states
		###
		getInactiveStates : -> return @_inactiveStates

		###
		Get unactive states names
		###
		getInactiveStatesNames : -> return @_inactiveStatesNames

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

	# make gridle event dipatcher
	smokesignals.convert window.Gridle

	# init if not already done :
	setTimeout ->
		Gridle.init() if not Gridle._inited
	, 500

	# support AMD
	if typeof window.define is 'function' && window.define.amd
		window.define [], -> window.Gridle

###
# Gridle.js
#
# This little js file allow you to detect witch or your gridle state is active, when states changes, etc...
#
# @author 	Olivier Bossel <olivier.bossel@gmail.com>
# @created 	20.05.14
# @updated 	20.05.14
# @version 	1.0
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
				for index, handler of handlers[eventName]
					handler.apply obj, arguments
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
		isReady : false

		# save the states finded in css
		statesInCss : null

		# boolean to save when the states are finded in css
		# this is used to stop search when the states are finded
		statesFindedInCss : false,
		
		# all the css link tag in the page
		cssLinks : []

		# settings finded in css (getted by an ajax request)
		cssSettings : []

		# store states
		states : []
		activeStates : []
		activeStatesNames : []
		unactiveStates : [],
		unactiveStatesNames : [],
		changedStates : [],
		changedStatesNames : [],

		# resize timeout to not update every ms on resize
		resizeTimeout : null,

		# default settings that can be overrided on init
		settings :
			onUpdate : null
			debug : null

		###
		Init
		###
		init : (settings) ->

			# update inited status
			@_inited = true

			# process settings
			@settings = settings if settings?
			@settings.debug ? settings.debug if settings and settings.debug?
			@settings.onStatesChange ? settings.onStatesChange if settings and settings.onStatesChange?

			@_debug 'ajax request on stylesheets to find gridle states'

			# loop on each link tag to get each css url :
			cssLinks = document.getElementsByTagName 'link'
			for index, link of cssLinks
				return false if not link
				@cssLinks.push link

			# parse the css links :
			@loadAndParseCss if cssLinks.length

			# else, launch
			else @_launch

		###
		Load and parse css
		###
		loadAndParseCss : ->

			# loop on each links
			for index, link of @cssLinks
			
				# stop if stated finded
				return false if @statesFindedInCss

				@_debug '|--- ajax request on ', link.href

				# process ajax request on link
				@ajax
					async : true,
					url : link.href
					success : (response) =>

						return false if @statesFindedInCss

						# if no response, tell that the response is processed and stop
						if not response
							@_noSettingsFindedInThisCss link
							return false

						# try to find settings in css
						settings = response.match(/#gridle-settings(?:\s*)\{(?:\s*)content(?:\s*):(?:\s*)\'(.+)\';?(?:\s*)\}/gi )&& RegExp.$1 

						# stop if no settings
						if not settings
							@_noSettingsFindedInThisCss link
							return false

						# parse settings to json
						settings = JSON.parse settings;
						@cssSettings = settings;

						# check query :
						if not settings.states
							@_debug 'no queries finded in css'
							@_noSettingsFindedInThisCss link
							return false;

						@_debug '|--- states finded in', link.href

						# update states finded status 
						@statesFindedInCss = true

						# save states :
						@statesInCss = settings.states

						# process finded states
						@_processFindedStates()

					error : (error) =>

						# check if already finded
						return false if @statesFindedInCss

						# simulate processed link
						@_noSettingsFindedInThisCss link

					dataType : 'text'

		###
		Css link processed
		###
		_noSettingsFindedInThisCss : (link) ->

			# remove link from array
			@cssLinks.shift

			# check if no more links to launch
			if not @cssLinks.length	

				@_debug 'no settings finded in css'

				# launch anyway
				# @_launch

		###
		Process finded states
		###
		_processFindedStates : ->

			@_debug 'begin process finded states in css'

			# loop on each states
			for name, query of @statesInCss

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
			@isReady = true

			# emit ready event
			@_crossEmit 'ready'

			# listen for window resize
			@addEvent window, 'resize', (e) =>
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
			@states.push infos

			@_debug '|--- register state', name, infos

		###
		Update states status
		###
		_updateStatesStatus : ->

			# reset trackings arrays
			@activeStates = [];
			@activeStatesNames = [];
			@unactiveStates = [];
			@unactiveStatesNames = [];
			@changedStates = [];
			@changedStatesNames = [];

			# loop on each states
			for key, state of @states

				# do not take care if not update on resize
				continue if not state.updateOnResize

				# save status
				@states[key].previous_status = state.status

				# check is state is active
				if @validateState state

					# check is status has changed
					if not @states[key].status

						# save this state has changed one
						@changedStates.push state
						@changedStatesNames.push state.name

					# update status
					@states[key].status = true

					# add in active state
					@activeStates.push state
					@activeStatesNames.push state.name

				# the state is not active
				else

					# check is status has changed 
					if @states[key].status

						# add state in changed ones
						@changedStates.push state
						@changedStatesNames.push state

					# update status
					@states[key].status = false

					# add state in unactives
					@unactiveStates.push state
					@unactiveStatesNames.push state.name

			# trigger events if needed
			@_crossEmit 'update', @changedStates, @activeStates, @unactiveStates if @changedStates.length
			@settings.onUpdate @changedStates, @activeStates, @unactiveStates if @changedStates.length and @settings.onUpdate

		###
		Validate state
		###
		validateState : (state) ->

			# validate state using matchmedia
			return matchMedia(state.query).matches

		###
		Add event
		###
		addEvent : (elm, type, handler) ->

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
				jQuery(@).trigger 'gridle.'+eventName, Array.prototype.slice.call(arguments, 1)
				# trigget event trough the body
				jQuery('body').trigger('gridle.'+eventName, Array.prototype.slice.call(arguments, 1))

			# emit from smokesignals
			@emit.apply @, arguments

		###
		Ajax proxy
		###
		ajax : (opts) ->

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
		getRegisteredStates : ->return @states

		###
		Get changes states
		###
		getChangedStates : -> return @changedStates

		###
		Get changes states names
		###
		getChangedStatesNames : -> return @changedStatesNames

		###
		Get active states
		###
		getActiveStates : -> return @activeStates

		###
		Get active states names
		###
		getActiveStatesNames : -> return @activeStatesNames

		###
		Get unactive states
		###
		getUnactiveStates : -> return @unactiveStates

		###
		Get unactive states names
		###
		getUnactiveStatesNames : -> return @unactiveStatesNames

		###
		Check is a state is active
		###
		isActive : (stateName) ->

			# isActive
			isActive = false;

			# loop on each active states
			for index, name of @activeStatesNames
				isActive = true if stateName == name

			# return if is active or not
			return isActive


		###
		Debug
		###
		_debug : ->
			console.log 'GRIDLE', arguments if @settings.debug

	# make gridle event dipatcher
	smokesignals.convert window.Gridle

	# init if not already done :
	setTimeout ->
		Gridle.init() if not Gridle._inited
	, 500

'use strict';

exports.__esModule = true;

var _domready = require('domready');

var _domready2 = _interopRequireDefault(_domready);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name 	Gridle.js
 * This little js file allow you to detect which or your gridle state is active, when states changes, etc...
 *
 * @example 	js
 * import 'coffeekraken-gridle';
 * // optional setup
 * Gridle.init({settings});
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 * @version 	1.0.0
 */

require('matchmedia-polyfill');


// smokesignals
var smokesignals;
smokesignals = {
	convert: function convert(obj, handlers) {
		handlers = {};
		obj.on = function (eventName, handler) {
			(handlers[eventName] = handlers[eventName] || []).push(handler);
			return obj;
		};
		obj.emit = function (eventName) {
			var handler, k, len, ref;
			if (!handlers[eventName]) {
				return;
			}
			ref = handlers[eventName];
			for (k = 0, len = ref.length; k < len; k++) {
				handler = ref[k];
				handler.apply(obj, Array.prototype.slice.call(arguments, 1));
				continue;
			}
			return obj;
		};
		return obj;
	}
};

// gridle object
var Gridle = {
	_inited: false,
	_isReady: false,
	_statesInCss: null,
	_statesFindedInCss: false,
	_cssSettings: [],
	_states: [],
	_activeStates: [],
	_activeStatesNames: [],
	_inactiveStates: [],
	_inactiveStatesNames: [],
	_updatedStates: [],
	_updatedStatesNames: [],
	resizeTimeout: null,
	_settings: {

		/**
   * Callback when the state has changed
   * @setting
   * @type 	 {Function}
   */
		onUpdate: null,

		/**
   * Activate of not the debug outputs
   * @setting
   * @type 	{Boolean}
   */
		debug: false,

		/**
   * Set some states to ignore completely
   * @setting
   * @type 	{Array}
   */
		ignoredStates: []
	},

	/**
  * Init gridle with some custom settings
  * @param 		{Object} 		settings 		Some settings to override
  */
	init: function init(settings) {
		var default_index;
		this._inited = true;
		if ((settings != null ? settings.ignoredStates : void 0) != null && (default_index = settings.ignoredStates.indexOf('default')) > -1) {
			settings.ignoredStates.splice(default_index, 1);
		}
		if (settings) {
			this._settings = this._extend(this._settings, settings);
		}
		this._debug('waiting for content to be fully loaded');
		return (0, _domready2.default)(function (_this) {
			return function () {
				return _this._parseCss();
			};
		}(this));
	},

	/*
  * Extending object function
  */
	_extend: function _extend(object, properties) {
		var key, val;
		for (key in properties) {
			val = properties[key];
			object[key] = val;
		}
		return object;
	},

	/*
  * Load and parse css
  */
	_parseCss: function _parseCss() {
		var e, error, i, idx, j, rule, rules, settings, settings_found;
		i = 0;
		j = document.styleSheets.length;
		settings_found = false;
		while (i < j) {
			try {
				rules = document.styleSheets[i].cssText || document.styleSheets[i].cssRules || document.styleSheets[i].rules;
				if (typeof rules === 'string') {
					settings = rules.match(/#gridle-settings(?:\s*)\{(?:\s*)content(?:\s*):(?:\s*)\"(.+)\"(;\s*|\s*)\}/) && RegExp.$1;
					if (settings) {
						settings = settings.toString().replace(/\\/g, '');
						settings = JSON.parse(settings);
						this._cssSettings = settings;
						settings_found = true;
						this._cssSettings = settings;
						this._statesInCss = settings.states;
					}
				} else {
					for (idx in rules) {
						rule = rules[idx];
						if (/#gridle-settings/.test(rule.cssText)) {
							settings = rule.cssText.toString().match(/:(.*);/) && RegExp.$1;
							settings = settings.toString().replace(/\\/g, '');
							settings = settings.trim();
							settings = settings.substr(1);
							settings = settings.substr(0, settings.length - 1);
							settings = JSON.parse(settings);
							if ((settings != null ? settings.states : void 0) != null) {
								this._cssSettings = settings;
								this._statesInCss = settings.states;
								settings_found = true;
								continue;
							}
						}
					}
				}
			} catch (error) {
				e = error;
				if (e.name !== 'SecurityError') {
					throw e;
				}
			}
			i++;
		}
		if (this._statesInCss) {
			return this._processFindedStates();
		} else {
			return this._debug("no states found...");
		}
	},

	/*
  * Process finded states
  */
	_processFindedStates: function _processFindedStates() {
		var name, query, ref;
		this._debug('begin process finded states in css');
		ref = this._statesInCss;
		for (name in ref) {
			query = ref[name];
			if (this._settings.ignoredStates.indexOf(name) === -1) {
				this._registerState(name, query);
			}
		}
		return this._launch();
	},

	/*
  * Launch
  */
	_launch: function _launch() {
		this._debug('launch');
		this._isReady = true;
		this._crossEmit('ready');
		this._addEvent(window, 'resize', function (_this) {
			return function (e) {
				clearTimeout(_this.resizeTimeout);
				return _this.resizeTimeout = setTimeout(function () {
					return _this._onResize();
				}, 100);
			};
		}(this));
		return this._onResize();
	},

	/*
  * On window resize
  */
	_onResize: function _onResize() {
		var updatedStates;
		updatedStates = [];
		this._updateStatesStatus();
		if (this.getActiveStatesNames().length) {
			this._debug('active states', this.getActiveStatesNames().join(','));
		}
		if (this.getInactiveStatesNames().length) {
			this._debug('inactive states', this.getInactiveStatesNames().join(','));
		}
		if (this.getUpdatedStatesNames().length) {
			return this._debug('updated states', this.getUpdatedStatesNames().join(','));
		}
	},

	/*
  * Register a state
  */
	_registerState: function _registerState(name, state, updateOnResize) {
		var infos;
		infos = {
			name: name,
			query: state.query,
			settings: state,
			status: null,
			previous_status: null,
			updateOnResize: updateOnResize != null ? updateOnResize : true
		};
		this._states.push(infos);
		return this._debug('|--- register state', name, infos);
	},

	/*
  * Update states status
  */
	_updateStatesStatus: function _updateStatesStatus() {
		var defaultState, defaultStateIdx, key, ref, state, wasDefault;
		defaultState = this.getDefaultState();
		defaultStateIdx = this._states.indexOf(defaultState);
		wasDefault = defaultState.status;
		this._activeStates = [];
		this._activeStatesNames = [];
		this._inactiveStates = [];
		this._inactiveStatesNames = [];
		this._updatedStates = [];
		this._updatedStatesNames = [];
		ref = this._states;
		for (key in ref) {
			state = ref[key];
			if (!state.updateOnResize) {
				continue;
			}
			this._states[key].previous_status = state.status;
			if (this._validateState(state)) {
				if (!this._states[key].status) {
					this._updatedStates.push(state);
					this._updatedStatesNames.push(state.name);
				}
				this._states[key].status = true;
				this._activeStates.push(state);
				this._activeStatesNames.push(state.name);
			} else if (state.name !== 'default') {
				if (this._states[key].status) {
					this._updatedStates.push(state);
					this._updatedStatesNames.push(state.name);
				}
				this._states[key].status = false;
				this._inactiveStates.push(state);
				this._inactiveStatesNames.push(state.name);
			}
		}
		if (!this._activeStates.length) {
			this._states[defaultStateIdx].status = true;
			this._activeStates.push(defaultState);
			this._activeStatesNames.push('default');
			if (!wasDefault) {
				this._updatedStates.push(defaultState);
				this._updatedStatesNames.push('default');
			}
		} else {
			this._states[defaultStateIdx].status = false;
			this._inactiveStates.push(defaultState);
			this._inactiveStatesNames.push('default');
			if (wasDefault) {
				this._updatedStates.push(defaultState);
				this._updatedStatesNames.push('default');
			}
		}
		if (this._updatedStates.length) {
			this._crossEmit('update', this._updatedStates, this._activeStates, this._inactiveStates);
		}
		if (this._updatedStates.length && this._settings.onUpdate) {
			return this._settings.onUpdate(this._updatedStates, this._activeStates, this._inactiveStates);
		}
	},

	/*
  * Validate state
  */
	_validateState: function (_this) {
		return function (state) {
			return matchMedia(state.query).matches;
		};
	}(undefined),

	/*
  * Add event
  */
	_addEvent: function _addEvent(elm, type, handler) {
		if (!elm) {
			return false;
		}
		if (elm.addEventListener) {
			return elm.addEventListener(type, handler, false);
		} else if (elm.attachEvent) {
			return elm.attachEvent('on' + type, handler);
		} else {
			return elm['on' + type] = handler;
		}
	},

	/*
  * Cross emit for supporting jquery libs, etc...
  */
	_crossEmit: function _crossEmit(eventName) {
		if (typeof jQuery !== "undefined" && jQuery !== null) {
			jQuery(this).trigger(eventName, Array.prototype.slice.call(arguments, 1));
			jQuery('body').trigger('gridle.' + eventName, Array.prototype.slice.call(arguments, 1));
		}
		return this.emit.apply(this, arguments);
	},

	/*
  * Ajax proxy
  */
	_ajax: function _ajax(opts) {
		var args, http;
		args = {
			type: opts.type || 'GET',
			url: opts.url,
			success: opts.success,
			error: opts.error,
			dataType: opts.dataType || 'text',
			context: opts.context
		};
		http = new XMLHttpRequest();
		if (args.context) {
			http.context = args.context;
		}
		http.open(args.type, args.url, true);
		http.onreadystatechange = function () {
			var response;
			if (http.readyState !== 4) {
				return false;
			}
			switch (http.status) {
				case 200:
					switch (args.dataType) {
						case 'json':
							response = JSON.parse(http.responseText);
							break;
						default:
							response = http.responseText;
					}
					if (args.success) {
						return args.success(response, http.status, http);
					}
			}
		};
		return http.send();
	},

	/*
  * Get default state
  * @return 		{Object} 		The default state object
  */
	getDefaultState: function getDefaultState() {
		var k, len, ref, state;
		ref = this.getRegisteredStates();
		for (k = 0, len = ref.length; k < len; k++) {
			state = ref[k];
			if (state.name === 'default') {
				return state;
			}
		}
	},

	/*
  * Get registered states
  * @return 		{Array} 		The array of all the registere states objects
  */
	getRegisteredStates: function getRegisteredStates() {
		return this._states;
	},

	/*
  * Get changes states
  * @return 		{Array} 		The array of all the updated states objects
  */
	getUpdatedStates: function getUpdatedStates() {
		return this._updatedStates;
	},

	/*
  * Get changes states names
  * @return 		{Array} 		The array of all the updated states names
  */
	getUpdatedStatesNames: function getUpdatedStatesNames() {
		return this._updatedStatesNames;
	},

	/*
  * Get active states
  * @return 		{Array} 		The array of all the current active states objects
  */
	getActiveStates: function getActiveStates() {
		return this._activeStates;
	},

	/*
  * Get active states names
  * @return 		{Array} 		The array of all the current active states names
  */
	getActiveStatesNames: function getActiveStatesNames() {
		return this._activeStatesNames;
	},

	/*
  * Get unactive states
  * @return 		{Array} 		The array of all the current inactive states objects
  */
	getInactiveStates: function getInactiveStates() {
		return this._inactiveStates;
	},

	/*
  * Get unactive states names
  * @return 		{Array} 		The array of all the current inactive states names
  */
	getInactiveStatesNames: function getInactiveStatesNames() {
		return this._inactiveStatesNames;
	},

	/*
  * Check is a state is active
  * @param 		{String} 		stateName 		The state name to check
  * @return 		{Boolean} 						If the specified state is active or not
  */
	isActive: function isActive(stateName) {
		var index, isActive, name, ref;
		isActive = false;
		ref = this._activeStatesNames;
		for (index in ref) {
			name = ref[index];
			if (stateName === name) {
				isActive = true;
			}
		}
		return isActive;
	},

	/*
  * Check if gridle is ready
  * @return 		{Boolean} 			If Gridle.js is ready or not
  */
	isReady: function isReady() {
		return this._isReady;
	},

	/*
  * Debug
  */
	_debug: function _debug() {
		if (this._settings.debug) {
			return console.log('GRIDLE', arguments);
		}
	}
};

// convert to smokesignals
smokesignals.convert(Gridle);

// auto init after 500ms if not inited by hand
(0, _domready2.default)(function () {
	return setTimeout(function () {
		if (!Gridle._inited) {
			Gridle.init();
		}
	}, 500);
});

// export
exports.default = Gridle;
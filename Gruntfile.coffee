module.exports = (grunt) ->

	paths =
		compass:
			cwd: 'sass'
			src: '**/*.scss'
			dest: 'css'
		coffee:
			cwd: 'coffee'
			src: '**/*.coffee'
			dest: 'js'

	# Configuration
	# =============
	grunt.initConfig
		
		pkg: grunt.file.readJSON 'package.json'

		compass:
			options:
				config: 'config.rb'
			dist:
				environment: 'development'
				outputStyle: 'expanded'			

		sass:
			options:
				sourceMap: false
			dist:
				# files:
				# 	'css/grid.css':'sass/grid.scss'
				# 	'css/style.css':'sass/style.scss'
				files: [
					expand: true
					cwd: paths.compass.cwd
					src: paths.compass.src
					dest: paths.compass.dest
					ext: '.css'
				]

		coffee:
			options: 
				bare: true
				sourceMap : true
			dist:
				files: [
					expand: true
					cwd: paths.coffee.cwd
					src: paths.coffee.src
					dest: paths.coffee.dest
					ext: '.js'
				]

		cssmin:
			options:
				shorthandCompacting: false
			target:
				files: [{
					expand: true,
					cwd: 'css',
					src: ['*.css', '!*.min.css'],
					dest: 'css',
					ext: '.min.css'
				}]
			
		uglify:
			my_target:
				files:
					'js/gridle.min.js': 'js/gridle.js'
		watch:
			livereload:
				options:
					livereload: 12345
				files: [
					'css/*.css'
					'js/*.js'
					'*.html'
				]
			html:
				files: 'index.html'
				tasks: ['notify:default']
			sass:
				files: paths.compass.cwd + '/' + paths.compass.src
				tasks: ['compass', 'cssmin', 'notify:compass']
			coffee:
				files: paths.coffee.cwd+'/'+paths.coffee.src
				tasks: ['coffee', 'uglify', 'notify:coffee']

		notify:
			default:
				options:
					title:'Grunt'
					message: 'All tasks where processed'
			compass:
				options:
					title:'Grunt watcher'
					message: 'SASS files where processed'
			coffee:
				options:
					title:'Grunt watcher'
					message: 'Coffee files where processed'
		

	grunt.loadNpmTasks 'grunt-sass'
	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-compass'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-contrib-cssmin'
	grunt.loadNpmTasks 'grunt-notify'
	grunt.loadNpmTasks 'grunt-contrib-uglify'

	grunt.registerTask 'default', [
		'compass'
		'cssmin'
		'coffee'
		'uglify'
		'notify:default'
	]
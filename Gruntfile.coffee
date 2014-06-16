module.exports = (grunt) ->

	paths =
		compass:
			files: 'sass/**/*.scss'
			src: 'sass'
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
			development:
				options:
					environment: 'development'
					outputStyle: 'expanded'
			production:
				options:
					environment: 'production'
					outputStyle: 'compressed'

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
			compass:
				files: paths.compass.files
				tasks: ['compass:development', 'notify:compass']
			coffee:
				files: paths.coffee.cwd+'/'+paths.coffee.src
				tasks: ['coffee', 'notify:coffee']

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
			


	grunt.loadNpmTasks 'grunt-contrib-clean'
	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-compass'
	grunt.loadNpmTasks 'grunt-contrib-concat'
	grunt.loadNpmTasks 'grunt-contrib-copy'
	grunt.loadNpmTasks 'grunt-contrib-imagemin'
	grunt.loadNpmTasks 'grunt-contrib-uglify'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-notify'
	grunt.loadNpmTasks 'grunt-styleguide'
	grunt.loadNpmTasks 'grunt-svgmin'
	grunt.loadNpmTasks 'grunt-webfont'


	grunt.registerTask 'default', [
		'compass:development'
		'coffee'
		'notify:default'
	]
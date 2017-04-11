module.exports = function(grunt) {
    // 配置
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        copy : {
            main : {
                files : [
                    {expand: true, cwd :'src/', src: ['static/img/**', 'static/lib/**'], dest: ""},
                    {expand: true, cwd :'src/', src: '*.html', dest: ''}
                ]
            }
        },
        connect : {//服务
            options: {
                port : 8001,
                base : 'src',
                hostname : "localhost",
                livereload: true,
                open : true
            },
            livereload: {
            },
            dest : {
                options : {
                    port : 8002,
                    base : '',
                    hostname : "localhost",
                    open : false
                }
            }
        },
        watch: {//监听
            livereload: {
                options: {
                    livereload: true
                },
                files: 'src/**/*.*'
            },
            style:{
                files: ['src/less/*/*.less','src/less/*.less',],
                tasks: ['less']
            },
            includes : {
                files : ['src/html/*.html','src/include/*.tpl'],
                tasks : ['includes']
            }
        },
        less : {
            compile: {
                files: [{
                    expand : true,
                    cwd : 'src/less',
                    src : ['*.less', '!_*.less'],
                    dest : 'src/static/css',
                    ext : '.css'
                }]
            }
        },
        includes : {//嵌套
            files: {
                options: {
                    includePath: 'src/include'
                },
                flatten: true,
                cwd: '.',
                src: 'src/html/*.*',
                dest: 'src' 
            }
        },
        useminPrepare : {
            html: '*.html',
            options: {
                root: 'src',
                dest: './'
            }
        },
        usemin:{
            html: '*.html'
        },
        clean : ['.tmp']
    });
    require('load-grunt-tasks')(grunt);
    //监听
    grunt.registerTask('coding', ["connect", "watch"]);
    //构建
    grunt.registerTask('build', ["copy", 'useminPrepare', 'concat:generated', 'cssmin:generated', 'uglify:generated', 'usemin', 'clean']);
};
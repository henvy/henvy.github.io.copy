module.exports = function(grunt) {
    // 配置
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        copy : {
            main : {
                files : [
                    {expand: true, cwd :'src/', src: 'img/**', dest: 'dest/'},
                    {expand: true, cwd :'src/', src: '*.html', dest: 'dest/'},
                    {expand: true, cwd :'src/', src: 'lib/**', dest: 'dest/'}
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
                    base : 'dest',
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
                files: 'src/style/*.less',
                tasks: ['less']
            },
            includes : {
                files : ['src/tpl/*.html','src/tpl/include/*.tpl'],
                tasks : ['includes']
            }
        },
        less : {
            compile: {
                options: {
                    compress: false,
                    yuicompress: false
                },
                files: {
                  "src/index.css": "src/style/index.less"
                }
            }
        },
        includes : {//嵌套
            files: {
                options: {
                    includePath: 'src/tpl/include'
                },
                flatten: true,
                cwd: '.',
                src: 'src/tpl/*.html',
                dest: 'src/' 
            }
        },
        useminPrepare : {
            html: 'dest/*.html',
            options: {
                root: 'src',
                dest: 'dest'
            }
        },
        usemin:{
            html: 'dest/*.html'
        },
        clean : ['.tmp']
    });
    require('load-grunt-tasks')(grunt);
    //监听
    grunt.registerTask('coding', ["connect", "watch"]);
    //构建
    grunt.registerTask('build', ["copy", 'useminPrepare', 'concat:generated', 'cssmin:generated', 'uglify:generated', 'usemin', 'clean']);
};
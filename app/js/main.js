
requirejs.config({
    paths : {
        text: '../bower_components/text/text',
        greensock: '../bower_components/gsap/src/minified',
        jsProgramsFolder: '../assets/jsPrograms',
    },
    
    map: {
        "*": { 
            'TweenLite': 'greensock/TweenLite.min'
        }
    },
    
    // this just makes sure aero is loaded first
    shim: {
        'greensock/easing/EasePack.min': ['greensock/TweenLite.min'], 
        "../assets/jsPrograms/time.js": ['aero'],
        "../assets/jsPrograms/sine.js": ['aero'],
        "../assets/jsPrograms/polyJon.js": ['aero'],
        "../assets/jsPrograms/textSlide.js": ['aero']
    }
});

window.OBLIO = window.OBLIO || {};

require([
        'text!paths/top.json',
        'text!paths/left.json',
        'text!paths/bottom.json',
        'text!paths/right.json',
        'text!paths/full.json',
        'aero',
        'greensock/TweenLite.min',
        'greensock/easing/EasePack.min',
        
        "../assets/jsPrograms/time.js",
        "../assets/jsPrograms/sine.js",
        "../assets/jsPrograms/polyJon.js",
        "../assets/jsPrograms/textSlide.js",
        
        'OBLIO/utils/ArrayExecuter'
    ], function(topPath, leftPath, bottomPath, rightPath, fullPath) {
    
    var settings = {};
    
    var sceneSettings = {
        "settings": {
            "dimensions": {
                "width": 512,
                "height": 512
            },
            "preserveDrawingBuffer": false
        },

        "textures": {
            "text1": {"src": "images/text1.jpg"},
            "text2": {"src": "images/text2.jpg"},
            "text3": {"src": "images/text3.jpg"},
            "text4": {"src": "images/text4.jpg"},
            "text5": {"src": "images/text5.jpg"}
        },

        "JSPrograms": {
            "time": {
                "id": "time"
            },
            "sine": {
                "id": "sine",
                "range": [0, 2]
            },
            "polyJon": {
                "id": "polyJon",
                "paths": {
                    top: new Float32Array(JSON.parse(topPath)),
                    left: new Float32Array(JSON.parse(leftPath)), 
                    bottom: new Float32Array(JSON.parse(bottomPath)), 
                    right: new Float32Array(JSON.parse(rightPath)),
                    full: new Float32Array(JSON.parse(fullPath))
                },
                "vertexShader": "assets/shaders/vert/polyJon.vert",
                "fragmentShader": "assets/shaders/frag/polyJon.frag",
                "uniforms": {
                    "u_lerp": {
                        "type":     "1f",
                        "val":      0
                    }
                }
            },
            "textSlide": {
                "id": "textSlide",
                "vertexShader": "assets/shaders/vert/textSlide.vert",
                "fragmentShader": "assets/shaders/frag/textSlide.frag",
                "uniforms": {
                    "u_imageTex": {
                        "type":     "t",
                        "val":      null
                    },
                    "u_reveal": {
                        "type":     "1f",
                        "val":      1
                    },
                    "u_scale": {
                        "type":     "1f",
                        "val":      1
                    }
                }
            }
        },

        "GLPrograms": {
            "test": {
                "vertexShader": "assets/shaders/vert/standard.vert",
                "fragmentShader": "assets/shaders/frag/test.frag",
                "uniforms": {
                    "u_bright": {
                        "type":     "1f",
                        "val":      1
                    }
                }
            },
            "composite": {
                "vertexShader": "assets/shaders/vert/standard.vert",
                "fragmentShader": "assets/shaders/frag/composite.frag",
                "uniforms": {
                    "u_imageText": {
                        "type":     "t",
                        "val":      null
                    },
                    "u_imagePoly": {
                        "type":     "t",
                        "val":      null
                    }
                }
            }
        },

        "connections": [
            {
                "source":   {   "id":   "text1"},
                "dest":     {   "id":   "textSlide",
                                "var":  "u_imageTex"  }
            },
            {
                "source":   {   "id":   "time",
                                "var":  "value"},
                "dest":     {   "id":   "sine",
                                "var":  "value"}
            },
            // {
            //     "source":   {   "id":   "sine",
            //                     "var":  "value"},
            //     "dest":     {   "id":   "textSlide",
            //                     "var":  "u_reveal"}
            // },
            {
                "source":   {   "id":   "textSlide",  "var":  "texUnit" },
                "dest":     {   "id":   "composite",
                                "var":  "u_imageText"}
            },
            {
                "source":   {   "id":   "polyJon",  "var":  "texUnit" },
                "dest":     {   "id":   "composite",
                                "var":  "u_imagePoly"}
            },
            {
                "source":   {   "id":   "composite" },
                "dest":     {   "id":   "canvas" }
            }
        ]
    };
    
    var slides = [
        {
            text: "text1",
            bg: "top",
        },
        {
            text: "text2",
            bg: "bottom",
        },
        {
            text: "text3",
            bg: "full",
        },
        {
            text: "text4",
            bg: "right",
        },
        {
            text: "text5",
            bg: "left",
        }
    ], currSlide = 0, prevSlide = 0, busy = true;
    
    function Main() {
        console.log('init');
        console.log(JSON.parse(topPath).length);
        
                
        this.scene = new Aero.Scene(sceneSettings, {onReady:onReady.bind(this), canvas:document.getElementById('glCanvas')});
        
        
        document.body.addEventListener( 'mousedown', onClick.bind(this), false );
        document.body.addEventListener( 'touchstart', onClick.bind(this), false );
    }
    
    function introAnim(){
        this.scene.nodes.polyJon.setBuffer(1, slides[4]['bg']);
        this.scene.nodes.polyJon.setBuffer(2, slides[0]['bg']);
        this.scene.nodes.polyJon.inputs.u_lerp = 0.25;
        TweenLite.to(this.scene.nodes.polyJon.inputs, 2, {u_lerp: 1, ease:Power4.easeOut, onComplete:function(){
            busy = false;
        }});
        
        this.scene.nodes.textSlide.inputs.u_reveal = 0;
                    
        TweenLite.to(this.scene.nodes.textSlide.inputs, 1,{u_reveal:1, ease:Power4.easeOut, delay:2});
    }
    
    function gotoSlide(num){
        if(busy)return;
        if(num == undefined)num = (currSlide + 1) % slides.length;
        if(!slides[num])return;
        prevSlide = currSlide;
        currSlide = num;
        busy = true;
        
        this.scene.nodes.polyJon.setBuffer(1, slides[prevSlide]['bg']);
        this.scene.nodes.polyJon.setBuffer(2, slides[currSlide]['bg']);
        this.scene.nodes.polyJon.inputs.u_lerp = 0;
        TweenLite.to(this.scene.nodes.polyJon.inputs, 3, {u_lerp: 1, delay:0.25, ease:Power4.easeInOut, onComplete:function(){
            busy = false;
        }});
        
        TweenLite.to(this.scene.nodes.textSlide.inputs, 1, {u_reveal:2, ease:Power4.easeIn, onComplete:function(){
            
            this.scene.updateConnection(this.scene.connectionSearch('dest', 'textSlide')[0].id, 'source', slides[currSlide]['text']);
            TweenLite.fromTo(this.scene.nodes.textSlide.inputs, 1, {u_reveal:0}, {u_reveal:1, ease:Power4.easeOut, delay:2});
        }.bind(this)});
        
    }
    
    function onClick(){
        console.log('onClick!');
        gotoSlide.call(this);
    }
    
    
    function onReady(){
        
        window.onresize = onResize.bind(this);
        window.onorientationchange = onResize.bind(this);
        onResize.call(this);
        
        introAnim.call(this);
        
        this.scene.renderer.start();
    }
    
    function onResize(){
        settings.w = window.innerWidth;
        settings.h = window.innerHeight;
        
        this.scene.renderer.setSize(settings.w, settings.h);
    }
    
    // call init on document ready
    window.OBLIO.main = new Main();

});

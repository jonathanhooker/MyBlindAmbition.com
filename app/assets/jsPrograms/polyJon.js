;Aero.registerJSProgram('polyJon', function () {
    'use strict';

    var program = function (_settings, _scene) {

        this.scene = _scene;

        this.inputs = {
            
        };

        this.outputs = {
            
        };
        
        this.draws = true;
        this.clearBuffer = true;

        this.init = function(callbackFn){
            console.log("polyJon init!");
            console.log(_settings);
            
            this.programObj = new Aero.GLProgram(_settings, this.scene);
                        
            var buffer1Attr = [
              {
                id: "a_Position1",
                num: 2,
                stride: 5,
                start: 0
              },
              {
                id: "a_Color1",
                num: 3,
                stride: 5,
                start: 2
              }
            ];

            this.buffer1 = this.scene.renderer.createCustomBuffer(_settings.paths.left, buffer1Attr);
            
            
            var buffer2Attr = [
              {
                id: "a_Position2",
                num: 2,
                stride: 5,
                start: 0
              },
              {
                id: "a_Color2",
                num: 3,
                stride: 5,
                start: 2
              }
            ];

            this.buffer2 = this.scene.renderer.createCustomBuffer(_settings.paths.top, buffer2Attr);
            
            this.numPoints = _settings.paths.full.length/5;

            this.programObj.init(function(){
                
                this.inputs = this.programObj.inputs;
                callbackFn();
            }.bind(this));
            
        }
        
        this.setBuffer = function(index, imageId){
            var buffer = (index == 1)?this.buffer1:this.buffer2;
            buffer.data = _settings.paths[imageId];
            this.scene.renderer.updateCustomBuffer(buffer);
        }

        this.run = function(){
            var gl = this.scene.gl;
            
            // attach the program and bind the buffers
            gl.useProgram(this.programObj.program);
            gl.program = this.programObj.program;
            
            this.scene.renderer.useCustomBuffer(this.buffer1);
            this.scene.renderer.useCustomBuffer(this.buffer2);
            
            this.programObj.updateUniforms();
            
            gl.clear(gl.DEPTH_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, this.numPoints);
        }
        
        this.resize = function(w,h){
            console.log('polyJon resize: '+w+', '+h);
            this.w = w;
            this.h = h;
            this.programObj.resize(w,h);
        }
    }

    return program;

}());

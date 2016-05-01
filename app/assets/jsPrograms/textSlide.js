;Aero.registerJSProgram('textSlide', function () {
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
            
            this.line1 = this.createLineObject(60, 225);
            this.line2 = this.createLineObject(334, 225);
            this.line3 = this.createLineObject(620, 225);
            
            this.line1.reveal = 1;

            this.programObj.init(function(){
                
                this.inputs = this.programObj.inputs;
                callbackFn();
            }.bind(this));
            
        }
        
        this.createLineObject = function(y, height){
            // create a buffer with 3 sets of positions and UVs
            // one for start, one for open, one for end
            
            var imgHeight = 1000,
                points = [],
                bufferAttr = [
                  {
                    id: "a_Position_1",
                    num: 2,
                    stride: 12,
                    start: 0
                  },
                  {
                    id: "a_UV_1",
                    num: 2,
                    stride: 12,
                    start: 2
                  },              
                  {
                    id: "a_Position_2",
                    num: 2,
                    stride: 12,
                    start: 4
                  },
                  {
                    id: "a_UV_2",
                    num: 2,
                    stride: 12,
                    start: 6
                  },
                  {
                    id: "a_Position_3",
                    num: 2,
                    stride: 12,
                    start: 8
                  },
                  {
                    id: "a_UV_3",
                    num: 2,
                    stride: 12,
                    start: 10
                  }
                ];
            
            var pointsA = [],
                pointsB = [],
                pointsC = [];
                
            // start 
            pointsA.push(0); pointsA.push((y+height)/1000); //position
            pointsA.push(0); pointsA.push(1-(y/1000)); //uv
            pointsA.push(0); pointsA.push((y+height)/1000); //position
            pointsA.push(0); pointsA.push(1-(y/1000)); //uv
            pointsA.push(1); pointsA.push((y+height)/1000); //position
            pointsA.push(1); pointsA.push(1-(y/1000)); //uv
            pointsA.push(1); pointsA.push((y+height)/1000); //position
            pointsA.push(1); pointsA.push(1-(y/1000)); //uv
            
            // open 
            pointsB.push(0); pointsB.push(y/1000); //position
            pointsB.push(0); pointsB.push(1-(y/1000)); //uv
            pointsB.push(0); pointsB.push((y+height)/1000); //position
            pointsB.push(0); pointsB.push(1-((y+height)/1000)); //uv
            pointsB.push(1); pointsB.push(y/1000); //position
            pointsB.push(1); pointsB.push(1-(y/1000)); //uv
            pointsB.push(1); pointsB.push((y+height)/1000); //position
            pointsB.push(1); pointsB.push(1-((y+height)/1000)); //uv
                              
            // end 
            pointsC.push(0); pointsC.push((y)/1000); //position
            pointsC.push(0); pointsC.push(1-((y+height)/1000)); //uv
            pointsC.push(0); pointsC.push((y)/1000); //position
            pointsC.push(0); pointsC.push(1-((y+height)/1000)); //uv
            pointsC.push(1); pointsC.push((y)/1000); //position
            pointsC.push(1); pointsC.push(1-((y+height)/1000)); //uv          
            pointsC.push(1); pointsC.push((y)/1000); //position
            pointsC.push(1); pointsC.push(1-((y+height)/1000)); //uv  
            
            points.push(pointsA[0]);points.push(pointsA[1]);
            points.push(pointsA[2]);points.push(pointsA[3]);
            points.push(pointsB[0]);points.push(pointsB[1]);
            points.push(pointsB[2]);points.push(pointsB[3]);
            points.push(pointsC[0]);points.push(pointsC[1]);
            points.push(pointsC[2]);points.push(pointsC[3]);
            
            points.push(pointsA[4]);points.push(pointsA[5]);
            points.push(pointsA[6]);points.push(pointsA[7]);
            points.push(pointsB[4]);points.push(pointsB[5]);
            points.push(pointsB[6]);points.push(pointsB[7]);
            points.push(pointsC[4]);points.push(pointsC[5]);
            points.push(pointsC[6]);points.push(pointsC[7]);
            
            points.push(pointsA[8]);points.push(pointsA[9]);
            points.push(pointsA[10]);points.push(pointsA[11]);
            points.push(pointsB[8]);points.push(pointsB[9]);
            points.push(pointsB[10]);points.push(pointsB[11]);
            points.push(pointsC[8]);points.push(pointsC[9]);
            points.push(pointsC[10]);points.push(pointsC[11]);   
            
            points.push(pointsA[8]);points.push(pointsA[9]);
            points.push(pointsA[10]);points.push(pointsA[11]);
            points.push(pointsB[8]);points.push(pointsB[9]);
            points.push(pointsB[10]);points.push(pointsB[11]);
            points.push(pointsC[8]);points.push(pointsC[9]);
            points.push(pointsC[10]);points.push(pointsC[11]);   
            
            points.push(pointsA[4]);points.push(pointsA[5]);
            points.push(pointsA[6]);points.push(pointsA[7]);
            points.push(pointsB[4]);points.push(pointsB[5]);
            points.push(pointsB[6]);points.push(pointsB[7]);
            points.push(pointsC[4]);points.push(pointsC[5]);
            points.push(pointsC[6]);points.push(pointsC[7]);                        
            
            points.push(pointsA[12]);points.push(pointsA[13]);
            points.push(pointsA[14]);points.push(pointsA[15]);
            points.push(pointsB[12]);points.push(pointsB[13]);
            points.push(pointsB[14]);points.push(pointsB[15]);
            points.push(pointsC[12]);points.push(pointsC[13]);
            points.push(pointsC[14]);points.push(pointsC[15]);
              
            
            console.log(points);
            
            return {
                reveal: 0,
                buffer: this.scene.renderer.createCustomBuffer(new Float32Array(points), bufferAttr)
            }
            
        }

        this.run = function(){
            var gl = this.scene.gl;
            
            // attach the program and bind the buffers
            gl.useProgram(this.programObj.program);
            gl.program = this.programObj.program;
            
            gl.clear(gl.DEPTH_BUFFER_BIT);
            
            // draw line 1
            this.scene.renderer.useCustomBuffer(this.line1.buffer);            
            this.programObj.updateUniforms();  
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            
            this.scene.renderer.useCustomBuffer(this.line2.buffer);            
            this.programObj.updateUniforms();  
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            
            this.scene.renderer.useCustomBuffer(this.line3.buffer);            
            this.programObj.updateUniforms();  
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            
            
        }
        
        this.resize = function(w,h){
            console.log('polyJon resize: '+w+', '+h);
            this.w = w;
            this.h = h;
            this.programObj.resize(w,h);
            
            var wScale = w/1600;
            var hScale = h/1000;
            
            this.inputs.u_scale = Math.min(1, hScale/wScale);
        }
    }

    return program;

}());

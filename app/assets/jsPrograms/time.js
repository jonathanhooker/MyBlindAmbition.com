;Aero.registerJSProgram('time', function () {
    'use strict';

    var program = function (_settings, _scene) {

        this.scene = _scene;

        this.inputs = {
        };

        this.outputs = {
            'value': 0
        };

        this.init = function(callbackFn){
            // console.log('init mousePos');
            this.startTime = Number(new Date().getTime())/1000;

            callbackFn();
        }

        this.run = function(){
            this.outputs.value = (Number(new Date().getTime())/1000)-this.startTime;
        }
    }

    return program;

}());

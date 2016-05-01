;Aero.registerJSProgram('sine', function () {
    'use strict';

    var program = function (_settings, _scene) {

        this.scene = _scene;

        this.inputs = {
            'value': 0,
            'cosine': (String(_settings.cosine).toLowerCase() == "true")?true:false,
            'range': (_settings.range)?_settings.range:[0,1]
        };

        this.outputs = {
            'value': 0
        };

        this.init = function(callbackFn){
            // console.log('init mousePos');
            this.inputs.min = this.inputs.range[0];
            this.inputs.spread = this.inputs.range[1]-this.inputs.range[0];

            callbackFn();
        }

        this.run = function(){
            if(this.inputs.cosine){
              this.outputs.value = this.inputs.min+((1+Math.cos(this.inputs.value))/2)*this.inputs.spread;
            } else {
              this.outputs.value = this.inputs.min+((1+Math.sin(this.inputs.value))/2)*this.inputs.spread;
            }
        }
    }
    
    return program;

}());

precision mediump float;

uniform float u_bright;

void main() {

    gl_FragColor = vec4(vec3(u_bright), 1.0);

    // gl_FragColor = vec4(1.,0.,0., 1.0);

}

precision mediump float;

varying vec2 v_texCoord;

uniform sampler2D u_imageTex;

void main() {
    gl_FragColor = vec4(texture2D( u_imageTex, v_texCoord));
}

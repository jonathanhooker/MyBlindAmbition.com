precision mediump float;

varying vec2 v_texCoord;

uniform sampler2D u_imageText;
uniform sampler2D u_imagePoly;

void main() {
	vec4 base = vec4(texture2D( u_imagePoly, v_texCoord));
	vec4 blend = vec4(texture2D( u_imageText, v_texCoord));

    gl_FragColor = vec4(abs(base.rgb-blend.rgb),1.);
    // gl_FragColor = abs(blend);
    // gl_FragColor = vec4(1.0,0.,0.,1.);

}

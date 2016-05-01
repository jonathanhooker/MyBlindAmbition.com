
attribute vec2 a_Position_1;
attribute vec2 a_UV_1;
attribute vec2 a_Position_2;
attribute vec2 a_UV_2;
attribute vec2 a_Position_3;
attribute vec2 a_UV_3;

uniform float u_reveal;
uniform vec2 u_resolution;
uniform float u_scale;

varying vec2 v_texCoord;

void main() {
	// vec2 localized = a_Position/vec2(825.5, 563.);
	vec2 pos = mix(mix(a_Position_1, a_Position_2, clamp(u_reveal, 0., 1.)), a_Position_3, clamp(u_reveal-1., 0., 1.));
	// vec2 pos = mix(mix(a_Position_1, a_Position_2, clamp(u_reveal, 0., 1.)), a_Position_3, clamp(u_reveal-1., 0., 1.));
	v_texCoord = mix(mix(a_UV_1, a_UV_2, clamp(u_reveal, 0., 1.)), a_UV_3, clamp(u_reveal-1., 0., 1.));
	
	// pos = a_Position_2;
	
	// pos.y = pos.y/ (u_resolution.y/u_resolution.x) ;
	pos = pos*u_scale;
	pos.x = -1.+pos.x*2.;
	pos.y = (1./1.6)*(pos.y*2.)/ (u_resolution.y/u_resolution.x) ;
	
	gl_Position = vec4(pos.x, 1.-pos.y, 0., 1.);
}
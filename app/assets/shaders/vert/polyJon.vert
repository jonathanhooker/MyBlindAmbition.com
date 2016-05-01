
attribute vec2 a_Position1;
attribute vec3 a_Color1;
attribute vec2 a_Position2;
attribute vec3 a_Color2;

uniform vec2 u_resolution;
uniform float u_lerp;

varying vec3 v_color;

void main() {
	vec2 pos1 = vec2((a_Position1.x/563.)*(u_resolution.y/u_resolution.x), a_Position1.y/563.);
	vec2 pos2 = vec2((a_Position2.x/563.)*(u_resolution.y/u_resolution.x), a_Position2.y/563.);
	
	float lerpEase = pow(u_lerp, 1.+(1.-abs(pos1.x))*(1.-abs(pos1.y)));
	vec2 pos = mix(
			pos1,
			pos2,
			lerpEase
		);
	pos = pos*(1.+sin(lerpEase*3.14159));
	gl_Position = vec4(pos, 0., 1.);
	v_color = mix(a_Color1, a_Color2, u_lerp)/255.;
}
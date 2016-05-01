
attribute vec4 a_Position;
attribute vec2 a_TexCoord;
varying vec2 v_texCoord;

void main() {
	gl_Position = a_Position;
	v_texCoord = a_TexCoord;
}
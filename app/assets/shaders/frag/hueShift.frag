/**
 * @author Jonathan Hooker / http://www.oblio.io/
 *
 * hue adjustment
 *
 */

precision mediump float;

// our texture
uniform sampler2D u_imageTex;

// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;

uniform float u_shift;

void main() {

    // original vector (color) to rotate
    vec3 v = texture2D( u_imageTex, v_texCoord).rgb;

    // unit length vector to rotate around
    vec3 p = vec3(0.5773502691896257, 0.5773502691896257, 0.5773502691896257);

    // degress of rotation
    float a = 3.141592653589793*u_shift;

    // axis angle rotation using Rodrigues' rotation formula
    vec3 newColor = v*cos(a) + dot(v, p)*p*(1.0-cos(a))+(cross(p, v)*sin(a));

    gl_FragColor = vec4(newColor, 1.0);

}

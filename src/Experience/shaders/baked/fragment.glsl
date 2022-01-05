uniform sampler2D uBakedDayTexture;
uniform sampler2D uBakedNightTexture;
uniform sampler2D uLightMapTexture;

uniform float uNightMix;

uniform vec3 uLightWindowColor;
uniform float uLightWindowStrength; 

uniform vec3 uLightLamOtherolor;
uniform float uLightLampStrength; 

uniform vec3 uLightOtherColor;
uniform float uLightOtherStrength; 

varying vec2 vUv;

// #pragma glslify: blend = require(glsl-blend/add)
// #pragma glslify: blend = require(glsl-blend/lighten) // 混合
#pragma glslify: blend = require(glsl-blend/normal)
// #pragma glslify: blend = require(glsl-blend/screen)

void main()
{
    vec3 bakedDayColor = texture2D(uBakedDayTexture, vUv).rgb;
    vec3 bakedNightColor = texture2D(uBakedNightTexture, vUv).rgb;
    vec3 bakedColor = mix(bakedDayColor, bakedNightColor, uNightMix);
    vec3 lightMaOtherolor = texture2D(uLightMapTexture, vUv).rgb;

    float lightLightStrength = lightMaOtherolor.b * uLightWindowStrength;
    bakedColor = blend(bakedColor, uLightWindowColor, lightLightStrength);

    float lightOtherStrength = lightMaOtherolor.g * uLightOtherStrength;
    bakedColor = blend(bakedColor, uLightOtherColor, lightOtherStrength);

    float lightLampStrength = lightMaOtherolor.r * uLightLampStrength;
    bakedColor = blend(bakedColor, uLightLamOtherolor, lightLampStrength);

    gl_FragColor = vec4(bakedColor, 1.0);
}
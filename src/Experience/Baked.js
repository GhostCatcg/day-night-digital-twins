import * as THREE from "three";

import Experience from "./Experience.js";
import vertexShader from "./shaders/baked/vertex.glsl";
import fragmentShader from "./shaders/baked/fragment.glsl";
import gsap from "gsap";
export default class Baked {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;

    // Debug
    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: "智慧园区",
        expanded: true,
      });
    }

    this.setModel();
  }

  setModel() {
    this.model = {};

    this.model.mesh = this.resources.items.roomModel.scene.children[0];

    this.model.bakedDayTexture = this.resources.items.bakedDayTexture;
    this.model.bakedDayTexture.encoding = THREE.sRGBEncoding;
    this.model.bakedDayTexture.flipY = false;

    this.model.bakedNightTexture = this.resources.items.bakedNightTexture;
    this.model.bakedNightTexture.encoding = THREE.sRGBEncoding;
    this.model.bakedNightTexture.flipY = false;

    this.model.lightMapTexture = this.resources.items.lightMapTexture;
    this.model.lightMapTexture.encoding = THREE.sRGBEncoding;
    this.model.lightMapTexture.flipY = false;

    this.colors = {};
    this.colors.window = "#ffffff";
    this.colors.lamp = "#ffffff";
    this.colors.other = "#ffffff";

    this.model.material = new THREE.ShaderMaterial({
      uniforms: {
        uBakedDayTexture: { value: this.model.bakedDayTexture },
        uBakedNightTexture: { value: this.model.bakedNightTexture },
        // uBakedNeutralTexture: { value: this.model.bakedNeutralTexture },
        uLightMapTexture: { value: this.model.lightMapTexture },

        uNightMix: { value: 0 },
        uNeutralMix: { value: 0 },

        uLightWindowColor: { value: new THREE.Color(this.colors.window) },
        uLightWindowStrength: { value: 0 },

        uLightLamOtherolor: { value: new THREE.Color(this.colors.lamp) },
        uLightLampStrength: { value: 0 },

        uLightOtherColor: { value: new THREE.Color(this.colors.other) },
        uLightOtherStrength: { value: 0 },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    this.model.mesh.traverse((_child) => {
      if (_child instanceof THREE.Mesh) {
        _child.material = this.model.material;
      }
    });

    this.scene.add(this.model.mesh);

    // Debug
    if (this.debug) {
      const btn = this.debugFolder.addButton({
        title: "切换",
        label: "白天/夜晚",
      });

      // this.debugFolder.addInput(
      //   this.model.material.uniforms.uNightMix,
      //   "value",
      //   { label: "白天/夜晚", min: 0, max: 1 }
      // );

      btn.on("click", () => {
        const number =
          this.model.material.uniforms.uNightMix.value === 1 ? 0 : 1;
        gsap.to(this.model.material.uniforms.uNightMix, {
          duration: 1,
          value: number,
        });
      });

      this.debugFolder
        .addInput(this.colors, "window", { view: "color" })
        .on("change", () => {
          this.model.material.uniforms.uLightWindowColor.value.set(
            this.colors.window
          );
        });

      this.debugFolder.addInput(
        this.model.material.uniforms.uLightWindowStrength,
        "value",
        { label: "窗户灯光强度", min: 0, max: 1 }
      );

      this.debugFolder
        .addInput(this.colors, "lamp", { view: "color" })
        .on("change", () => {
          this.model.material.uniforms.uLightLamOtherolor.value.set(
            this.colors.lamp
          );
        });

      this.debugFolder.addInput(
        this.model.material.uniforms.uLightLampStrength,
        "value",
        { label: "路灯灯光强度", min: 0, max: 3 }
      );

      this.debugFolder
        .addInput(this.colors, "other", { view: "color" })
        .on("change", () => {
          this.model.material.uniforms.uLightOtherColor.value.set(
            this.colors.other
          );
        });

      this.debugFolder.addInput(
        this.model.material.uniforms.uLightOtherStrength,
        "value",
        { label: "装饰灯光强度", min: 0, max: 3 }
      );
    }
  }
}

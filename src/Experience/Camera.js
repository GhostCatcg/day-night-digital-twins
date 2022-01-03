import * as THREE from "three";
import Experience from "./Experience.js";

export default class Camera {
  constructor(_options) {
    // Options
    this.experience = new Experience();
    this.config = this.experience.config;
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;

    // Set up
    this.mode = "default"; // default \ debug

    this.setInstance();
  }

  setInstance() {
    // Set up
    this.instance = new THREE.PerspectiveCamera(
      45,
      this.config.width / this.config.height,
      0.1,
      15000
    );
    this.instance.position.set(-2.7,76,151)
    this.scene.add(this.instance);
  }

  resize() {
    this.instance.aspect = this.config.width / this.config.height;
    this.instance.updateProjectionMatrix();
  }

}

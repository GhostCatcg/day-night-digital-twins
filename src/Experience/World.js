import Experience from "./Experience.js";
import Baked from "./Baked.js";

export default class World {
  constructor(_options) {
    this.experience = new Experience();
    this.resources = this.experience.resources;

    this.resources.on("groupEnd", (_group) => {
      if (_group.name === "base") {
        this.setBaked();
      }
    });
  }

  setBaked() {
    this.baked = new Baked();
  }

}

import View from './three-view.es6';
import World from './three-world.es6';
import MenuHandler from './menuhandler.es6';

class Controller {
    constructor(a, b) {
        this.view = new View();
        this.world = new World([
            this.view.cameraControlObject, 
            this.view.transformControlObject
        ]);
        this.menu = new MenuHandler();

        this.menu.events.imgUploaded = (data) => { 
            this.world.addPlane(data)
                .then(mesh => {
                    this.view.attachTransformControls(mesh);
                }); 
        };

        this.mainLoop();
    }

    mainLoop() {
      window.requestAnimationFrame(() => {
       this.mainLoop();
      });

      this.world.update();
      this.view.render(this.world.scene);
    }
}

document.addEventListener("DOMContentLoaded", e => {
    const c = new Controller();
});
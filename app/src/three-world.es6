export default class World {
    constructor(additionalObjs) {
      this.floorObject = this.getFloorObject();
      this.lights = this.getLights();
      this.skybox = this.getSkybox();
      this.scene = this.getScene();

      additionalObjs.forEach( obj => {
          this.scene.add(obj);
      })
    }
  
    /*
    * 'Public' methods
    */
  
    update() {
      //this.worldObject.rotation.x += 0.01;
      //this.worldObject.rotation.z += 0.01;
    }

    addPlane(image) {
      return new Promise( resolve => {
        console.log(image);
        const material = new THREE.MeshBasicMaterial( { 
          map: new THREE.TextureLoader().load( image.url ),
          side: THREE.DoubleSide
        } );
  
        const scale = 1 / Math.max(image.width, image.height);
  
        const geometry = new THREE.PlaneGeometry( image.width*scale, image.height*scale );
  
        const plane = new THREE.Mesh( geometry, material );
        this.scene.add( plane );

        resolve(plane);
      })
    }
  
    /*
     * 'Private' methods
     */
  
    /*
     *  'Init' methods
     */
  
    getLights() {
      const lights = [];
      let l;
  
      l = new THREE.PointLight( 0xffffff, 2, 0 );
      l.position.set( 0, 10, 0 );
      lights.push(l);
  
      return lights;
    }
  
    getSkybox() {
      const imagePrefix = "/assets/skybox/clouds/";
      const directions = ["WEST", "EAST", "TOP", "BOTTOM", "SOUTH", "NORTH"];
      const imageSuffix = ".jpg";
  
      const skyGeometry = new THREE.BoxGeometry(100, 100, 100);
      const loader = new THREE.TextureLoader();
  
      const skyMaterial = [];
      for (var i = 0; i < 6; i++) {
          skyMaterial.push(new THREE.MeshBasicMaterial({
              map: loader.load(imagePrefix + directions[i] + imageSuffix),
              side: THREE.BackSide,
          }));
      }
  
      return new THREE.Mesh(skyGeometry, skyMaterial);
    }
  
    getScene() {
      const scene = new THREE.Scene();
  
      this.lights.forEach( l => {
        scene.add(l);
      })
  
      scene.add(this.skybox);
      scene.add(this.floorObject);
  
      return scene;
    }
  
    getFloorObject() {
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry( 1000, 1000, 1 ),
        new THREE.MeshStandardMaterial( { color: 0xffffff } )
      );
      plane.rotation.x -= Math.PI/2;
      return plane;
    }
  }
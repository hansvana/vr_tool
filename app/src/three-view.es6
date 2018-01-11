export default class View {
    constructor() {
        this.camera = this.getCamera();
        this.renderer = this.getRenderer();
        this.cameraControls = this.getCameraControls();
        this.transformControls = this.getTransformControls();
  
        window.addEventListener('resize', e => {
          this.resizeHandler(e.target.innerWidth, e.target.innerHeight);
        });
    }
  
    /*
     * 'Public' methods
     */
  
    render(scene) {
      this.renderer.render(scene, this.camera);
    }

    get cameraControlObject() {
        return this.cameraControls.getObject();
    }

    get transformControlObject() {
      return this.transformControls;
    }

    get domElement() {
      return this.renderer.domElement;
    }

    attachTransformControls( mesh ) {
      this.transformControls.attach( mesh );
    }
  
    /*
     * 'Private' methods
     */
  
    resizeHandler(w, h) {
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.camera.useQuaternions = true;
      this.renderer.setSize(w, h);
    }
  
    /*
     *  'Init' methods
     */
  
    getCamera() {
      const cam = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
  
      return cam
    }

    getCameraControls() {
        const controls = new THREE.PointerLockControls( this.camera );

        controls.getObject().position.y = 1;
        controls.getObject().position.z = 5;

        document.addEventListener('mousedown', e => {
         if (e.button == 2) controls.enabled = true; 
        });
        document.addEventListener('mouseup', () => { controls.enabled = false; });
        document.addEventListener('contextmenu', e => {
          e.preventDefault();
        });

        document.addEventListener( 'keydown', e => {
					switch ( e.keyCode ) {	
						case 17: // Ctrl
              this.transformControls.setTranslationSnap( 100 );
							this.transformControls.setRotationSnap( THREE.Math.degToRad( 15 ) );
							break;            					
						case 77: // M
              this.transformControls.setMode( "translate" );
							break;
						case 82: // R
              this.transformControls.setMode( "rotate" );
							break;
						case 83: // S
              this.transformControls.setMode( "scale" );
							break;
					}
				});

				document.addEventListener( 'keyup', e => {
					switch ( e.keyCode ) {
						case 17: // Ctrl
              this.transformControls.setTranslationSnap( null );
							this.transformControls.setRotationSnap( null );
							break;
					}
				});
        return controls;
    }

    getTransformControls() {
      return new THREE.TransformControls( this.camera, this.renderer.domElement );
      //control.addEventListener( 'change', render );
    }
  
    getRenderer() {
      const r = new THREE.WebGLRenderer();
      r.setClearColor(0x000000, 1);
      r.setSize(window.innerWidth, window.innerHeight);
      r.shadowMap.enabled = true;
      document.body.appendChild(r.domElement);
      return r;
    }
}
  
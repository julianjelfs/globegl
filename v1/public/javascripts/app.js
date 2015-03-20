window.onload = function() {
    function createCloud (){
        var canvasResult	= document.createElement('canvas');
        canvasResult.width	= 1024;
        canvasResult.height	= 512;
        var contextResult	= canvasResult.getContext('2d');

        var imageMap = new Image();
        imageMap.addEventListener("load", function() {
            
            // create dataMap ImageData for earthcloudmap
            var canvasMap	= document.createElement('canvas');
            canvasMap.width	= imageMap.width;
            canvasMap.height= imageMap.height;
            var contextMap	= canvasMap.getContext('2d');
            contextMap.drawImage(imageMap, 0, 0);
            var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height);

            // load earthcloudmaptrans
            var imageTrans	= new Image();
            imageTrans.addEventListener("load", function(){
                // create dataTrans ImageData for earthcloudmaptrans
                var canvasTrans		= document.createElement('canvas');
                canvasTrans.width	= imageTrans.width;
                canvasTrans.height	= imageTrans.height;
                var contextTrans	= canvasTrans.getContext('2d');
                contextTrans.drawImage(imageTrans, 0, 0);
                var dataTrans		= contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height);
                // merge dataMap + dataTrans into dataResult
                var dataResult		= contextMap.createImageData(canvasMap.width, canvasMap.height);
                for(var y = 0, offset = 0; y < imageMap.height; y++){
                    for(var x = 0; x < imageMap.width; x++, offset += 4){
                        dataResult.data[offset+0]	= dataMap.data[offset+0]
                        dataResult.data[offset+1]	= dataMap.data[offset+1]
                        dataResult.data[offset+2]	= dataMap.data[offset+2]
                        dataResult.data[offset+3]	= 255 - dataTrans.data[offset+0]
                    }
                }
                // update texture with result
                contextResult.putImageData(dataResult,0,0);	
                material.map.needsUpdate = true;
            })
            imageTrans.src	= 'images/earthcloudmaptrans.jpg';
        }, false);
        imageMap.src	= 'images/earthcloudmap.jpg';
        
        var geometry	= new THREE.SphereGeometry(0.51, 32, 32)
        var material	= new THREE.MeshPhongMaterial({
            map		: new THREE.Texture(canvasResult),
            side		: THREE.DoubleSide,
            transparent	: true,
            opacity		: 0.8,
        })
        return new THREE.Mesh(geometry, material)
    }

    function createEarth(){
        var geometry	= new THREE.SphereGeometry(0.5, 32, 32);
        var material	= new THREE.MeshPhongMaterial({
            map	: THREE.ImageUtils.loadTexture('images/earthmap4k.jpg'),
            bumpMap	: THREE.ImageUtils.loadTexture('images/earthbump4k.jpg'),
            bumpScale : 0.02,
            specularMap	: THREE.ImageUtils.loadTexture('images/earthspec4k.jpg'),
            specular : new THREE.Color('grey'),
        });
        return new THREE.Mesh(geometry, material);
    }

    function createStarField() {
        var geometry  = new THREE.SphereGeometry(90, 32, 32);
        var material  = new THREE.MeshBasicMaterial();
        material.map   = THREE.ImageUtils.loadTexture('images/galaxy_starfield.png');
        material.side  = THREE.BackSide;
        return new THREE.Mesh(geometry, material)
    }

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var light = new THREE.PointLight( 0xffffff, 2, 100 );
    light.position.set( 50, 50, 50 );
    scene.add( light );

    var light2 = new THREE.AmbientLight( 0xffffff );
    scene.add( light2 );

    var earthMesh = createEarth();
    scene.add(earthMesh);

    var cloudMesh = createCloud();
    scene.add(cloudMesh);

    var stars = createStarField();
    scene.add(stars);

    camera.position.z = 2;

    var onRenderFcts = [];

    onRenderFcts.push(function(delta, now) {
        earthMesh.rotateY(1/16 * delta);
    });

    onRenderFcts.push(function(delta, now) {
        cloudMesh.rotateY(1/8 * delta);
    });

    onRenderFcts.push(function(){
        renderer.render(scene, camera);
    });

    var lastTimeMsec= null;
	requestAnimationFrame(function animate(nowMsec){
		requestAnimationFrame( animate );
		lastTimeMsec	= lastTimeMsec || nowMsec-1000/60;
		var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec);
		lastTimeMsec	= nowMsec;
		onRenderFcts.forEach(function(onRenderFct){
			onRenderFct(deltaMsec/1000, nowMsec/1000);
		})
	});
}

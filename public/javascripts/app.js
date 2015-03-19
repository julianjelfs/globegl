console.log('hello from express');

window.onload = function() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var geometry = new THREE.SphereGeometry(0.5, 32, 32);
    var material = new THREE.MeshPhongMaterial();
    material.map = THREE.ImageUtils.loadTexture('images/earthmap4k.jpg');
    material.bumpMap = THREE.ImageUtils.loadTexture('images/earthbump4k.jpg');
    material.bumpScale = 0.1;
    material.specularMap = THREE.ImageUtils.loadTexture('images/earthspec4k.jpg');
    material.specular = new THREE.Color('grey');


    var sphere = new THREE.Mesh( geometry, material );

    var light = new THREE.PointLight( 0xffffff, 2, 100 );
    light.position.set( 50, 50, 50 );
    scene.add( light );

    var light2 = new THREE.AmbientLight( 0xffffff );
    scene.add( light2 );

    scene.add( sphere );

    camera.position.z = 2;

    function render() {
        requestAnimationFrame(render);
        sphere.rotation.y += 0.005;
        // sphere.rotation.x += 0.005;
        renderer.render(scene, camera);
    }

    render();
}

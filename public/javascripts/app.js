console.log('hello from express');

window.onload = function() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // var geometry = new THREE.SphereGeometry(0.5, 32, 32);
    // var material = new THREE.MeshPhongMaterial();
    // var earthMesh = new THREE.Mesh(geometry, material);
    // scene.add(earthMesh);

    // camera.position.z = 1.5;

    var geometry = new THREE.BoxGeometry( 2, 2, 2 );
    // var geometry = new THREE.SphereGeometry(5, 32, 32);
    // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var material = new THREE.MeshPhongMaterial();
    var cube = new THREE.Mesh( geometry, material );
    var light = new THREE.AmbientLight( 0x888888 ); // soft white light
    scene.add( light );
    scene.add( cube );

    camera.position.z = 5;

    function render() {
        requestAnimationFrame(render);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    render();
}

window.onload = function() {
if(!Detector.webgl){
    Detector.addGetWebGLMessage();
} else {

    // var years = ['1990','1995','2000'];
    var container = document.getElementById('container');
    var globe = new DAT.Globe(container, {imgDir:'images/'});
    // globe.animate();

    console.log(globe);

    var xhr;


    xhr = new XMLHttpRequest();
    xhr.open('GET', '/data/population909500.json', true);
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                window.data = data;
                for (i=0;i<data.length;i++) {
                    globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
                }
                globe.createPoints();
                globe.animate();
                document.body.style.backgroundImage = 'none'; // remove loading
            }
        }
    };
    xhr.send(null);
}
}

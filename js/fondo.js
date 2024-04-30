 // Crear líneas negras
 var linesContainer = document.getElementById('lines');
 for (var i = 0; i < window.innerWidth; i += 5) {
     var line = document.createElement('div');
     line.classList.add('line');
     line.style.left = i + 'px';
     linesContainer.appendChild(line);
 }

 // Crear efecto de lluvia
 for (var i = 0; i < 100; i++) {
     createRainDrop();
 }

 // Función para crear una gota de lluvia
 function createRainDrop() {
     var rainDrop = document.createElement('div');
     rainDrop.classList.add('rain-drop');
     rainDrop.style.left = Math.random() * window.innerWidth + 'px';
     rainDrop.style.top = Math.random() * window.innerHeight + 'px';
     rainDrop.style.animationDuration = Math.random() * 2 + 1 + 's';
     document.body.appendChild(rainDrop);
     setTimeout(function () {
         rainDrop.remove();
     }, 3000);
 }
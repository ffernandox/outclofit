const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const openCameraButton = document.getElementById('openCamera');
const changeImageButton = document.getElementById('changeImage');

// Predefinir las imágenes de las prendas
const shirtImg = new Image();
shirtImg.src = 'playeranegra.png'; // Imagen de la camisa

const hoodieImg = new Image();
hoodieImg.src = 'playerainsana.png'; // Imagen de la sudadera

const tshirtImg = new Image();
tshirtImg.src = 'playera.png'; // Imagen de la playera

let overlayImg = tshirtImg; // Imagen predeterminada: playera

// Función para iniciar la cámara
function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(error => {
      console.error('Error al acceder a la cámara:', error);
    });
}

// Función para dibujar en el canvas
function drawOverlay() {
  // Dibuja el video en el canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Dibuja la imagen superpuesta
  if (overlayImg) {
    const x = canvas.width / 2 - 20; // Centrar horizontalmente
    const y = canvas.height / 2 - 15; // Ajustar posición vertical
    const width = 130; // Ancho de la imagen
    const height = 100; // Alto de la imagen
    ctx.drawImage(overlayImg, x, y, width, height);
  }

  // Llama a esta función en el próximo frame
  requestAnimationFrame(drawOverlay);
}

// Evento para abrir la cámara
openCameraButton.addEventListener('click', () => {
  startCamera();
  drawOverlay();
});

// Evento para cambiar la imagen superpuesta entre las opciones predeterminadas
changeImageButton.addEventListener('click', () => {
  // Cambia la imagen entre la camisa, sudadera y playera
  if (overlayImg === tshirtImg) {
    overlayImg = shirtImg; // Cambia a la camisa
  } else if (overlayImg === shirtImg) {
    overlayImg = hoodieImg; // Cambia a la sudadera
  } else {
    overlayImg = tshirtImg; // Cambia a la playera
  }
});

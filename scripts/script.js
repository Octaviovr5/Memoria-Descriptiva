document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.page');
  let currentIndex = 0;
  let isAnimating = false; // Bloquea mientras se anima

  const scrollToPage = (index) => {
    if (isAnimating || index < 0 || index >= pages.length) return;

    isAnimating = true; // Bloquea animaciones adicionales

    // Agrega una clase de fade-out a la página actual
    pages[currentIndex].classList.add('fade-out');

    setTimeout(() => {
      // Realiza el scroll a la nueva página
      pages[index].scrollIntoView({ behavior: 'smooth' });

      // Remueve la clase fade-out de la página anterior
      pages[currentIndex].classList.remove('fade-out');

      // Actualiza el índice
      currentIndex = index;

      // Desbloquea después de la animación
      setTimeout(() => {
        isAnimating = false;
      }, 800); // Duración de la animación CSS
    }, 500); // Tiempo para completar el desvanecimiento
  };

  const handleScroll = (event) => {
    if (isAnimating) return;

    // Detecta la dirección del scroll
    const direction = event.deltaY > 0 ? 1 : -1;

    const nextIndex = currentIndex + direction;

    // Evitar que se salga de los límites (Primera y última página)
    if (nextIndex >= 0 && nextIndex < pages.length) {
      scrollToPage(nextIndex);
    }
  };

  // Event listener para la rueda del ratón (desplazamiento con el ratón)
  document.addEventListener('wheel', handleScroll);

  // Variables para controlar el deslizamiento táctil
  let touchStartY = 0;
  let touchEndY = 0;
  let isTouching = false;

  const handleTouchStart = (event) => {
    // Registrar el punto de inicio del toque
    touchStartY = event.touches[0].clientY;
    isTouching = true;
  };

  const handleTouchMove = (event) => {
    // Registrar el punto de finalización del toque
    touchEndY = event.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!isTouching) return;

    const direction = touchEndY - touchStartY;

    if (direction > 50) {
      // Si el usuario desliza hacia abajo
      scrollToPage(currentIndex - 1);
    } else if (direction < -50) {
      // Si el usuario desliza hacia arriba
      scrollToPage(currentIndex + 1);
    }

    // Restablecer el estado de la interacción táctil
    isTouching = false;
  };

  // Agregar eventos para manejo táctil
  document.addEventListener('touchstart', handleTouchStart);
  document.addEventListener('touchmove', handleTouchMove);
  document.addEventListener('touchend', handleTouchEnd);
});

// Creamos el observer para detectar cuando los elementos entran en la vista
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // Si el elemento es visible
    if (entry.isIntersecting) {
      const target = entry.target;

      // Verificamos qué elemento está siendo observado y aplicamos animaciones específicas
      if (target.id === 'map-container') {
        // Animación para el contenedor del mapa
        target.classList.add('animate__zoomIn', 'animate__delay-1s');
        target.style.opacity = 1; // Hacemos visible el contenedor
      } else if (target.id === 'boton') {
        // Animación para el botón
        target.classList.add('animate__headShake', 'animate__delay-2s', 'animate__repeat-3');
        target.style.opacity = 1; // Hacemos visible el botón
      } else if (target.id === 'sala-container') {
        // Animación para imágenes de sala
        target.classList.add('animate__fadeInLeft', 'animate__delay-4s');
        target.style.opacity = 1; // Hacemos visible el contenedor sala
      } else if (target.id === 'sala-container2') {
        // Animación para imágenes de sala
        target.classList.add('animate__fadeInRight', 'animate__delay-5s');
        target.style.opacity = 1;
      }

      // Dejamos de observar el elemento una vez que se ha animado
      observer.unobserve(target);
    }
  });
}, {
  threshold: 0.5 // El 50% del elemento debe ser visible para activar la animación
});

// Seleccionamos los elementos a observar
const mapContainer = document.getElementById('map-container');
const boton = document.getElementById('boton');
const contenedorSala = document.getElementById('sala-container');
const contenedorSala2 = document.getElementById('sala-container2');

// Empezamos a observar los elementos
observer.observe(mapContainer);
observer.observe(boton);
observer.observe(contenedorSala);
observer.observe(contenedorSala2);

document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.page');
  let currentIndex = 0;
  let isAnimating = false; // Bloquea mientras se anima
  let touchStartY = 0; // Para almacenar la posición inicial del toque

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

    let direction;

    // Para eventos de rueda de ratón
    if (event.deltaY !== undefined) {
      direction = event.deltaY > 0 ? 1 : -1;
    }
    // Para eventos táctiles (móviles)
    else if (event.touches) {
      const touchEndY = event.changedTouches[0].screenY;
      direction = touchEndY < touchStartY ? 1 : -1;  // Cambié la comparación para invertir la dirección
    }

    if (direction !== undefined) {
      const nextIndex = currentIndex + direction;
      scrollToPage(nextIndex);
    }
  };

  // Event listener para la rueda del ratón
  document.addEventListener('wheel', handleScroll);

  // Event listeners para el toque en pantallas táctiles
  document.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].screenY; // Guardar la posición del toque inicial
  });

  document.addEventListener('touchend', handleScroll); // Detectar cuando se suelta el toque
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
        // Animación para imagenes sala
        target.classList.add('animate__fadeInLeft', 'animate__delay-4s');
        target.style.opacity = 1; // Hacemos visible el contenedor sala
      } else if (target.id === 'sala-container2') {
        // Animación para imagenes sala
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

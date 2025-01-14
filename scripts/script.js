document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.page');
  let currentIndex = 0;
  let isAnimating = false; // Bloquea mientras se anima
  let debounceTimeout;

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

    clearTimeout(debounceTimeout); // Limpiar el timeout anterior
    debounceTimeout = setTimeout(() => {
      const direction = event.deltaY > 0 ? 1 : -1;
      const nextIndex = currentIndex + direction;

      if (nextIndex >= 0 && nextIndex < pages.length) {
        scrollToPage(nextIndex);
      }
    }, 150); // Retraso de 150ms para evitar múltiples ejecuciones rápidas
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
    const target = entry.target;

    if (entry.isIntersecting) {
      // Elemento ha entrado en la vista

      // Verificamos qué elemento está siendo observado y aplicamos animaciones específicas
      if (target.id === 'map-container') {
        // Limpiar animaciones previas y agregar nueva animación
        target.classList.remove('animate__zoomIn', 'animate__fadeInLeft', 'animate__headShake');
        target.classList.add('animate__zoomIn', 'animate__delay-1s');
        target.style.opacity = 1;
      } else if (target.id === 'boton') {
        target.classList.remove('animate__headShake', 'animate__fadeInLeft', 'animate__zoomIn');
        target.classList.add('animate__headShake', 'animate__delay-2s', 'animate__repeat-3');
        target.style.opacity = 1;
      } else if (target.id === 'sala-container') {
        target.classList.remove('animate__fadeInLeft', 'animate__zoomIn', 'animate__headShake');
        target.classList.add('animate__bounceInLeft', 'animate__delay-3s');
        target.style.opacity = 1;
      } else if (target.id === 'sala-container2') {
        target.classList.remove('animate__fadeInRight', 'animate__zoomIn', 'animate__headShake');
        target.classList.add('animate__bounceInRight', 'animate__delay-4s');
        target.style.opacity = 1;
      }
    } else {
      // Elemento ha salido de la vista, eliminamos las animaciones
      target.classList.remove('animate__zoomIn', 'animate__fadeInLeft', 'animate__headShake', 'animate__fadeInRight');
      target.style.opacity = 0;
    }
  });
}, {
  threshold: 0.8, // El 50% del elemento debe ser visible para activar la animación
  rootMargin: '0px 0px -50px 0px' // Anticipamos la animación antes de que el elemento sea 50% visible
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

// Aseguramos una transición suave de opacidad en CSS
const style = document.createElement('style');
style.innerHTML = `
  .animate__fadeInLeft, .animate__zoomIn, .animate__headShake, .animate__bounceInLeft, .animate__bounceInRight {
    transition: opacity 0.5s ease-in-out;
  }
`;
document.head.appendChild(style);

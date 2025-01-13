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

    // Determina la dirección del scroll
    const direction = event.deltaY > 0 ? 1 : -1;

    // Calcula el nuevo índice
    const nextIndex = currentIndex + direction;

    // Llama a scrollToPage con el nuevo índice
    scrollToPage(nextIndex);
  };

  document.addEventListener('wheel', handleScroll);
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
        target.classList.add('animate__headShake', 'animate__delay-2s' ,'animate__repeat-3');
        target.style.opacity = 1; // Hacemos visible el botón
      }
        else if (target.id === 'sala-container') {
      // Animación para imagenes sala
      target.classList.add('animate__fadeInLeft', 'animate__delay-4s');
      target.style.opacity = 1; // Hacemos visible el contenedorsala
      }
      else if (target.id === 'sala-container2') {
        //animación para imagenes sala
        target.classList.add('animate__fadeInRight','animate__delay-5s')
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
const contenedorSala = document.getElementById ('sala-container')
const contenedorSala2 = document.getElementById ('sala-container2')

// Empezamos a observar los elementos
observer.observe(mapContainer);
observer.observe(boton);
observer.observe(contenedorSala)
observer.observe(contenedorSala2)
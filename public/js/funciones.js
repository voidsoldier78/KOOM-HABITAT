  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
  });

  // js/funciones.js (Ejemplo de JavaScript PURO)

// 1. Espera a que la página cargue
document.addEventListener('DOMContentLoaded', function() {
  
  // 2. Encuentra la barra de navegación (necesita un ID)
  const miBarraNav = document.getElementById('mi-nav-global');
  
  // 3. Escucha el evento 'scroll' en la ventana
  window.addEventListener('scroll', function() {
    // Verificamos la posición vertical
    const verticalOffset = window.pageYOffset || document.documentElement.scrollTop;

    // 4. Lógica para añadir/quitar la clase
    if (verticalOffset > 10) {
      miBarraNav.classList.add('nav-scrolled');
    } else {
      miBarraNav.classList.remove('nav-scrolled');
    }
  });

  // 5. Lógica para el botón de 'scroll to top'
  const miLogo = document.getElementById('logo'); // El logo necesita un ID
  miLogo.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

});
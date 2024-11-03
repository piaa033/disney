document.addEventListener('DOMContentLoaded', function() {
  const buscador = document.getElementById('buscador');
  const contenedor = document.getElementById('personajes');
  let personajes = []; // Almacena todos los personajes

  // Obtener todos los personajes al cargar
  for(i=1;i<150;i++){
    document.addEventListener('DOMContentLoaded', function() {
  const buscador = document.getElementById('buscador');
  const contenedor = document.getElementById('personajes');
  let personajes = []; // Almacena todos los personajes

  // Obtener todos los personajes al cargar
  fetch('https://api.disneyapi.dev/character')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      personajes = data.data; // Almacenar datos
    })
    .catch(error => {
      console.error('Error fetching characters:', error);
    });

  buscador.addEventListener('input', function() {
      const query = buscador.value.toLowerCase();
      const filtrados = personajes.filter(character => {
        return character.name.toLowerCase().includes(query) ||
               character.films.some(film => film.toLowerCase().includes(query)) ||
               character.shortFilms.some(shortFilm => shortFilm.toLowerCase().includes(query)) ||
               character.tvShows.some(tvShow => tvShow.toLowerCase().includes(query)) ||
               character.parkAttractions.some(attraction => attraction.toLowerCase().includes(query)) ||
               character.videoGames.some(videoGame => videoGame.toLowerCase().includes(query));
      });

      // Limpiar el contenedor antes de mostrar nuevos resultados
      contenedor.innerHTML = '';

      // Mostrar los personajes filtrados
      if (filtrados.length > 0) {
        filtrados.forEach(character => {
          const personajeDiv = document.createElement('div');
          personajeDiv.className = 'personaje';
          personajeDiv.innerHTML = `
            <h2>${character.name}</h2>
            <img src="${character.imageUrl}" alt="${character.name}">
            <p><a href="${character.sourceUrl}" target="_blank">Más información</a></p>
          `;
          contenedor.appendChild(personajeDiv);
        });
      } else {
        contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
      }
    });
  });
});

  

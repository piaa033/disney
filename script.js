document.addEventListener('DOMContentLoaded', function() {
  const buscador = document.getElementById('buscador');
  const contenedor = document.getElementById('personajes');
  const btn = document.getElementById('btn');
  let personajes = []; // Almacena todos los personajes

  // Obtener todos los personajes al cargar
  const fetchCharacters = async () => {
    for (let i = 1; i < 150; i++) {
      try {
        const response = await fetch(`https://api.disneyapi.dev/character/${i}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        // Asegúrate de que `data.data` sea un array antes de intentar usarlo
        if (data.data) {
          personajes.push(data.data); // Almacenar datos
        }
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    }
  };

  // Ejecutar la función para obtener personajes
  fetchCharacters().then(() => {
    btn.addEventListener('click', function(event) {
      event.preventDefault(); // Evitar el comportamiento por defecto del botón
      const query = buscador.value.toLowerCase();

      // Filtrar personajes
      const filtrados = personajes.flat().filter(character => { // Usar flat() para aplanar el array
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
          personajeDiv.className = 'col-md-4 mb-4'; // Tres tarjetas por fila
          personajeDiv.innerHTML = `
            <div class="card">
              <img src="${character.imageUrl}" class="card-img-top" alt="${character.name}">
              <div class="card-body">
                <h5 class="card-title">${character.name}</h5>
                <p class="card-text"><strong>Películas:</strong> ${character.films.join(', ') || 'N/A'}</p>
                <p class="card-text"><strong>Series:</strong> ${character.tvShows.join(', ') || 'N/A'}</p>
                <p class="card-text"><strong>Cortos:</strong> ${character.shortFilms.join(', ') || 'N/A'}</p>
                <p class="card-text"><strong>Videojuegos:</strong> ${character.videoGames.join(', ') || 'N/A'}</p>
                <p class="card-text"><strong>Parques Disney:</strong> ${character.parkAttractions.join(', ') || 'N/A'}</p>
                <p class="card-text"><a href="${character.sourceUrl}" target="_blank">Más información</a></p>
              </div>
            </div>
          `;
          contenedor.appendChild(personajeDiv);
        });
      } else {
        contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
      }
    });
  });
});

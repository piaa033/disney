document.addEventListener('DOMContentLoaded', function() {
  const buscador = document.getElementById('buscador');
  const contenedor = document.getElementById('personajes'); // Corregido 'docunt' a 'document'

  buscador.addEventListener('input', function() {
    const query = buscador.value; // Obtiene el valor del buscador

    if (query.length > 0) { // Solo realiza la búsqueda si hay texto
      fetch('https://api.disneyapi.dev/characters') // Asegúrate de que la URL es correcta
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Filtrar los datos según la consulta
          const filteredData = data.data.filter(character => // Accede a 'data' dentro de la respuesta
            character.name.toLowerCase().includes(query.toLowerCase())
          );

          // Limpiar el contenedor antes de mostrar nuevos resultados
          contenedor.innerHTML = '';

          // Mostrar los personajes filtrados
          filteredData.forEach(character => {
            const personajeDiv = document.createElement('div');
            personajeDiv.className = 'personaje';
            personajeDiv.innerHTML = `
              <h2>${character.name}</h2>
              <img src="${character.imageUrl}" alt="${character.name}">
              <p><a href="${character.sourceUrl}" target="_blank">Más información</a></p>
            `;
            contenedor.appendChild(personajeDiv);
          });
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    } else {
      // Limpiar el contenedor si el campo está vacío
      contenedor.innerHTML = '';
    }
  });
});

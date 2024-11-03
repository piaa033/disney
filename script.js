document.addEventListener('DOMContentLoaded', function() {
  const buscador = document.getElementById('buscador');
  const contenedor = document.getElementById('personajes'); // Corregido 'docunt' a 'document'

  buscador.addEventListener('input', function() {
    const query = buscador.value; // Obtiene el valor del buscador
    const filtrados = [];

    if (query.length > 0) { // Solo realiza la búsqueda si hay texto
      for(i=1;i<150;i++){
        fetch('https://api.disneyapi.dev/character') // Asegúrate de que la URL es correcta
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Filtrar los datos según la consulta
          let pers = data.data
          for(i=0;i<data.info.count;i++){
            for(g=0; g<pers[i].films.length;g++){
              for(h=0; h<pers[i].shortFilms.length;h++){
                for(k=0; k<pers[i].tvShows.length;k++){
                   for(l=0; l<pers[i].parkAttractions.length;l++){
                     for(m=0; m<pers[i].videoGames.length;m++){
                       if(pers[i].films[g].includes(query) || pers[i].shortFilms[h].includes(query) || pers[i].tvShows[k].includes(query) || pers[i].parkAttractions[l].includes(query) || pers[i].videoGames[m].includes(query) || pers[i].id.includes() || pers[i].name.includes()){
                         filtrados.push(pers[i])
                       }
                     }
                   }
                }
              }
            }}

          // Limpiar el contenedor antes de mostrar nuevos resultados
          contenedor.innerHTML = '';

          // Mostrar los personajes filtrados
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
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    } 
  });
      }                     
    else {
      // Limpiar el contenedor si el campo está vacío
      contenedor.innerHTML = '';
    }
});

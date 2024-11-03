document.addEventListener('DOMContentLoaded', function() {
  const buscador = document.getElementById('buscador');

  buscador.addEventListener('input', function() {
    const query = buscador.value; // Obtiene el valor del buscador

    if (query.length > 0) { // Solo realiza la búsqueda si hay texto
      fetch('https://api.disneyapi.dev/characters')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Filtrar los datos según la consulta
          const filteredData = data.filter(character =>
            character.name.toLowerCase().includes(query.toLowerCase())
          );

          console.log(filteredData); // Aquí puedes hacer algo con los datos filtrados
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    }
  });
});


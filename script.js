let contenedorPersonajes = document.getElementById("personajes");

// Crear el modal
const modal = document.createElement('div');
modal.classList.add('modal', 'fade');
modal.id = 'modalPersonaje';
modal.tabIndex = -1; // Para que sea accesible por teclado
modal.innerHTML = `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalPersonajeLabel"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <img id="modalImage" src="" alt="" class="img-fluid mb-3">
                <p><strong>Especie:</strong> <span id="modalEspecie"></span></p>
                <p><strong>Origen:</strong> <span id="modalOrigen"></span></p>
                <p><strong>Creado:</strong> <span id="modalFecha"></span></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
`;
document.body.appendChild(modal); 

// Obtener datos de la API y crear las tarjetas
fetch("https://rickandmortyapi.com/api/character")
    .then((response) => response.json())
    .then((datos) => {
        datos.results.forEach(({ name, species, origin, created, image }) => {
            const personajes = document.createElement('div');
            personajes.classList.add('col-12', 'col-md-6', 'col-lg-4');

            // Formato de fecha
            const formattedDate = new Date(created).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });

            personajes.innerHTML = `
                <div class="p-3">
                    <div class="card fade-in"> 
                        <img src="${image}" class="card-img-top" alt="${name}">
                        <div class="card-body">
                            <h4 class="card-title">${name}</h4>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><h6>Especie: ${species}</h6></li>
                            <li class="list-group-item"><h6>Origen: ${origin.name}</h6></li>
                            <li class="list-group-item"><h6>Creado: ${formattedDate}</h6></li>
                        </ul>
                    </div>
                </div>
            `;

            // Evento de clic para mostrar el modal con detalles del personaje
            personajes.addEventListener('click', () => {
                // Llenar datos en el modal
                document.getElementById('modalPersonajeLabel').textContent = name;
                document.getElementById('modalImage').src = image;
                document.getElementById('modalEspecie').textContent = species;
                document.getElementById('modalOrigen').textContent = origin.name;
                document.getElementById('modalFecha').textContent = formattedDate;

                // Mostrar el modal
                const modalInstance = new bootstrap.Modal(modal); 
                modalInstance.show(); // Mostrar el modal
            });

            contenedorPersonajes.appendChild(personajes);
        });

        // Efecto de aparición en las tarjetas al cargar la página
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            setTimeout(() => {
                card.classList.add('fade-in'); // Aplicar la clase fade-in a cada tarjeta
            },index * 500); // Puedes ajustar el tiempo de espera si lo deseas
        });
    })
    .catch((error) => console.error('Error fetching data:', error));

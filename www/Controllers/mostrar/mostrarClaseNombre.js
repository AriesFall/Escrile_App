function mostrarClaseNombre() {
    const token = localStorage.getItem('token'); 
    const email = localStorage.getItem('correo');

    fetch(showClasses_route, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener las clases');
        }
        return response.json();
    })
    .then(clases => {
        const filteredClases = clases.filter(clase => clase.Alumnos.includes(email));

        let clasesHTML = '';
        const promises = filteredClases.map(clase => {
            const url = `${getProfessorName_route}${encodeURIComponent(clase.CreadorCorreo)}`;

            return fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener el nombre del usuario');
                }
                return response.json();
            })
            .then(data => {
                // Accede a la propiedad correcta del objeto recibido
                const nombreCompleto = data.NombreCompleto || 'Nombre no disponible';
                
                clasesHTML += `<a
                    href="../user/clases.html?id=${clase.Id}"  
                    class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
                  >
                    <div
                      class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <p class="mb-2 text-sm font-medium text-gray-600 ">
                      ${nombreCompleto}
                      </p>
                      <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                         ${clase.Nombre || 'Nombre no disponible'}
                      </p>
                    </div>
                  </a>`;
            })
            .catch(error => {
                console.error('Error al obtener el nombre del profesor:', error);
            });
        });

        Promise.all(promises)
            .then(() => {
                document.getElementById('clasesCreadas').innerHTML = clasesHTML;
            })
            .catch(error => {
                console.error('Error al procesar las promesas:', error);
                document.getElementById('clasesCreadas').innerText = 'Error al obtener las clases. Consulta la consola para más detalles.';
            });
    })
    .catch(error => {
        console.error('Error al obtener las clases:', error);
        document.getElementById('clasesCreadas').innerText = 'Error al obtener las clases. Consulta la consola para más detalles.';
    });
}

mostrarClaseNombre();

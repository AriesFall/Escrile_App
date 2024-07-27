let usuarios = [];
const rowsPerPage = 10;
let currentPage = 1;
let sortColumn = '';
let sortOrder = 'ascending';

const columnMap = {
    'Usuario': 'NombreCompleto',
    'Correo': 'Correo',
    'Fecha': 'Fecha'
};

const rolMap = {
    1: 'Administrador',
    2: 'Profesor',
    3: 'Alumno'
};

function displayPage(page) {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = page * rowsPerPage;
    const usuariosToDisplay = usuarios.slice(startIndex, endIndex);

    const tbody = document.getElementById('allUsers');
    tbody.innerHTML = '';
    usuariosToDisplay.forEach(usuario => {
        const rol = rolMap[usuario.NivelCuenta] || 'Desconocido';

        const row = `<tr class="text-gray-700 dark:text-gray-400">
                        <td class="px-4 py-3">
                          <div class="flex items-center text-sm">
                            <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                              <img class="object-cover w-full h-full rounded-full" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" alt="" loading="lazy" />
                              <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                            </div>
                            <div>
                              <p class="font-semibold">${usuario.NombreCompleto}</p>
                              <p class="text-xs text-gray-600 dark:text-gray-400">
                                ${rol}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-3 text-sm">${usuario.Correo}</td>
                        <td class="px-4 py-3 text-sm">${usuario.Fecha}</td>
                        <td class="px-4 py-3">
                          <div class="flex items-center space-x-4 text-sm">
                            <button class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                              <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                              </svg>
                            </button>
                            <button class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
                              <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    });

    document.getElementById('rangeDisplay').textContent = `${startIndex + 1}-${Math.min(endIndex, usuarios.length)} de ${usuarios.length}`;
}

function createPaginationControls() {
    const totalPages = Math.ceil(usuarios.length / rowsPerPage);
    const ul = document.getElementById('paginationControls');
    ul.innerHTML = '';

    const prevButton = document.createElement('li');
    prevButton.innerHTML = `<button class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple" aria-label="Previous" onclick="changePage(${currentPage - 1})">
                              <svg class="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                                <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path>
                              </svg>
                            </button>`;
    ul.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('li');
      pageButton.innerHTML = `<button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple ${i === currentPage ? 'bg-purple-600 text-white' : ''}" onclick="changePage(${i})">${i}</button>`;
      ul.appendChild(pageButton);
    }

    const nextButton = document.createElement('li');
    nextButton.innerHTML = `<button class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple" aria-label="Next" onclick="changePage(${currentPage + 1})">
                              <svg class="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                                <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 01-1.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path>
                              </svg>
                            </button>`;
    ul.appendChild(nextButton);
}

function changePage(page) {
    const totalPages = Math.ceil(usuarios.length / rowsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    displayPage(currentPage);
    createPaginationControls();
}

function handleSort(th) {
    const table = th.closest('table');
    const index = Array.from(th.parentNode.children).indexOf(th);
    const columnName = th.textContent.trim();
    const columnKey = columnMap[columnName] || columnName;

    const currentSort = th.getAttribute('aria-sort');
    const newSort = currentSort === 'ascending' ? 'descending' : 'ascending';
    
    Array.from(table.querySelectorAll('th')).forEach(header => {
        header.setAttribute('aria-sort', 'none');
    });
    th.setAttribute('aria-sort', newSort);
    
    usuarios.sort((a, b) => {
        const aValue = a[columnKey];
        const bValue = b[columnKey];

        if (columnKey === 'Fecha') {
            const parseDate = (dateStr) => {
                const [day, month, year] = dateStr.split('/');
                return new Date(`${year}-${month}-${day}`);
            };

            const dateA = parseDate(aValue);
            const dateB = parseDate(bValue);

            if (newSort === 'ascending') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        } else if (typeof aValue === 'string') {
            return newSort === 'ascending' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else {
            return newSort === 'ascending' ? aValue - bValue : bValue - aValue;
        }
    });

    displayPage(currentPage);
    createPaginationControls();
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarUsuarios();
});

function mostrarUsuarios() {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('Token no encontrado en localStorage.');
        return;
    }

    fetch(showUsers_route, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los usuarios: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // Filtra los usuarios para que solo se incluyan aquellos con NivelCuenta = 1
        usuarios = data.filter(usuario => usuario.NivelCuenta === 3);
        usuarios.forEach(usuario => {
            usuario.Rol = rolMap[usuario.NivelCuenta] || 'Desconocido';
        });
        changePage(1);
    })
    .catch(error => {
        console.error('Error al obtener los usuarios:', error);
        var allUsersElement = document.getElementById('allUsers');
        if (allUsersElement) {
            allUsersElement.innerText = 'Error al obtener los usuarios. Consulta la consola para más detalles.';
        } else {
            console.error('Elemento con ID allUsers no encontrado en el DOM.');
        }
    });
}

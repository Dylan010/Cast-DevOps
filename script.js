let API_KEY;

async function getApiKey() {
  const response = await fetch('/api/key');
  const data = await response.json();
  API_KEY = data.API_KEY;
}

// Llama a esta función al inicio
getApiKey();

// Funciones de autenticación
function register(username, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(user => user.username === username)) {
        alert('El nombre de usuario ya existe');
        return false;
    }
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

function login(username, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        localStorage.setItem('currentUser', username);
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem('currentUser');
    updateAuthStatus();
}

function isLoggedIn() {
    return !!localStorage.getItem('currentUser');
}

// Funciones para la página principal
function updateAuthStatus() {
    const authStatus = document.getElementById('auth-status');
    const newCatBtn = document.getElementById('new-cat-btn');
    const authLinks = document.getElementById('auth-links');
    if (isLoggedIn()) {
        const username = localStorage.getItem('currentUser');
        authStatus.innerHTML = `Bienvenido, ${username}! <button onclick="logout()">Cerrar sesión</button>`;
        newCatBtn.disabled = false;
        if (authLinks) authLinks.style.display = 'none';
    } else {
        authStatus.innerHTML = 'Por favor, inicia sesión o regístrate para ver gatos.';
        newCatBtn.disabled = true;
        if (authLinks) authLinks.style.display = 'block';
    }
}

async function fetchCatImage() {
    const catImage = document.getElementById('cat-image');
    const newCatBtn = document.getElementById('new-cat-btn');
    const loadingText = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');

    newCatBtn.disabled = true;
    catImage.style.display = 'none';
    loadingText.style.display = 'block';
    errorMessage.textContent = '';

    try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search', {
            headers: {
                'x-api-key': API_KEY
            }
        });
        const data = await response.json();
        if (data && data[0] && data[0].url) {
            catImage.src = data[0].url;
            catImage.style.display = 'block';
        } else {
            throw new Error('No se pudo obtener la imagen del gato');
        }
    } catch (err) {
        errorMessage.textContent = 'Error al cargar la imagen. Por favor, intenta de nuevo.';
    } finally {
        loadingText.style.display = 'none';
        newCatBtn.disabled = false;
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const newCatBtn = document.getElementById('new-cat-btn');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (register(username, password)) {
                alert('Registro exitoso. Por favor, inicia sesión.');
                window.location.href = 'login.html';
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (login(username, password)) {
                alert('Inicio de sesión exitoso');
                window.location.href = 'index.html';
            } else {
                alert('Nombre de usuario o contraseña incorrectos');
            }
        });
    }

    if (newCatBtn) {
        newCatBtn.addEventListener('click', fetchCatImage);
        updateAuthStatus();
    }
});

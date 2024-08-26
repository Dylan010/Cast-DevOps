const catImage = document.getElementById('cat-image');
const loadingText = document.getElementById('loading');
const newCatBtn = document.getElementById('new-cat-btn');

function fetchCatImage() {
    loadingText.style.display = 'block';
    catImage.style.display = 'none';

    fetch('https://api.thecatapi.com/v1/images/search', {
        headers: {
            'x-api-key': 'API_KEY_PLACEHOLDER'
        }
    })
        .then(response => response.json())
        .then(data => {
            catImage.src = data[0].url;
            catImage.style.display = 'block';
            loadingText.style.display = 'none';
        })
        .catch(error => {
            console.error('Error:', error);
            loadingText.textContent = 'Error al cargar la imagen. Intente nuevamente.';
        });
}

newCatBtn.addEventListener('click', fetchCatImage);

fetchCatImage();
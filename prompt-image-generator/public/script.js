document.getElementById('generate-button').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt').value;
    const errorMessage = document.getElementById('error-message');
    const imageContainer = document.getElementById('image-container');
    
    errorMessage.textContent = '';  // Clear any previous error message
    imageContainer.innerHTML = '';  // Clear previous images

    try {
        const response = await fetch('/generate-image', { // This matches the server-side endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: prompt })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Handle potential non-JSON response
        const data = await response.json();
        if (data.imageUrl) {
            const img = document.createElement('img');
            img.src = data.imageUrl;
            img.alt = 'Generated Image';
            imageContainer.appendChild(img);
        } else {
            errorMessage.textContent = 'No image URL returned.';
        }
    } catch (error) {
        console.error('Error generating image:', error);
        errorMessage.textContent = `Error generating image: ${error.message}. Please try again.`;
    }
});

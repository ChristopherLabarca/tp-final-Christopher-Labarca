"use strict";
/**
 * Pet service with breed image fetching
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageForBreed = void 0;
/**
 * Fetches an image URL for a pet based on species and breed
 * Uses external APIs when available (dog.ceo, thecatapi)
 */
const getImageForBreed = async (especie, raza) => {
    try {
        if (especie.toLowerCase() === 'perro') {
            return await getDogImageByBreed(raza);
        }
        else if (especie.toLowerCase() === 'gato') {
            return await getCatImageByBreed(raza);
        }
    }
    catch (error) {
        console.log(`Could not fetch image for ${especie} - ${raza}:`, error);
    }
    // Fallback to placeholder
    return 'https://via.placeholder.com/200?text=Mascota';
};
exports.getImageForBreed = getImageForBreed;
/**
 * Fetches a dog image from the Dog API (dog.ceo) with retry logic
 */
async function getDogImageByBreed(raza) {
    const maxRetries = 2;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            // Normalize breed name (convert to lowercase, replace spaces with hyphens)
            const breedParam = raza.toLowerCase().replace(/\s+/g, '-');
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
            const response = await fetch(`https://dog.ceo/api/breed/${breedParam}/images`, {
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const data = await response.json();
            if (data.status === 'success' && data.message && data.message.length > 0) {
                // Return a random image from the breed
                const randomImage = data.message[Math.floor(Math.random() * data.message.length)];
                return randomImage;
            }
        }
        catch (error) {
            console.log(`Dog API attempt ${attempt + 1} failed for breed ${raza}:`, error);
            if (attempt < maxRetries) {
                // Wait before retrying
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
    return 'https://via.placeholder.com/200?text=Perro';
}
/**
 * Fetches a cat image from The Cat API with retry logic
 */
async function getCatImageByBreed(raza) {
    const maxRetries = 2;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
            // TheCatAPI returns random image by breed search
            const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=${raza.toLowerCase()}`, {
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0 && data[0].url) {
                return data[0].url;
            }
        }
        catch (error) {
            console.log(`Cat API attempt ${attempt + 1} failed for breed ${raza}:`, error);
            if (attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
    // Fallback: try a generic cat image
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const genericResponse = await fetch('https://api.thecatapi.com/v1/images/search?limit=1', {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        const genericData = await genericResponse.json();
        if (Array.isArray(genericData) && genericData.length > 0 && genericData[0].url) {
            return genericData[0].url;
        }
    }
    catch (error) {
        console.log(`Cat API generic fallback failed:`, error);
    }
    return 'https://via.placeholder.com/200?text=Gato';
}

// Travel recommendations data with beaches, temples, and countries
const travelRecommendations = {
    beaches: [
        {
            name: "Maldives Paradise Beach",
            description: "Experience the ultimate tropical paradise with crystal-clear turquoise waters, pristine white sand beaches, and luxurious overwater bungalows. Perfect for honeymoons, diving, and relaxation.",
            imageUrl1: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600",
            imageUrl2: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600"
        },
        {
            name: "Bali Beaches",
            description: "Discover Bali's stunning coastline with world-class surfing spots, vibrant beach clubs, and breathtaking sunsets. From the lively Seminyak to the serene Nusa Dua, Bali offers diverse beach experiences.",
            imageUrl1: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600",
            imageUrl2: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600"
        }
    ],
    temples: [
        {
            name: "Angkor Wat, Cambodia",
            description: "Explore the magnificent Angkor Wat, the largest religious monument in the world. This 12th-century temple complex showcases stunning Khmer architecture and intricate stone carvings, offering a glimpse into ancient civilization.",
            imageUrl1: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600",
            imageUrl2: "https://images.unsplash.com/photo-1563620614-e890f5e92944?w=600"
        },
        {
            name: "Kyoto Temples, Japan",
            description: "Immerse yourself in Japan's spiritual heart with over 2,000 temples and shrines in Kyoto. Visit the golden Kinkaku-ji, the serene Ryoan-ji rock garden, and the iconic Fushimi Inari with its thousands of red torii gates.",
            imageUrl1: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600",
            imageUrl2: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600"
        }
    ],
    countries: [
        {
            name: "Australia",
            description: "From the iconic Sydney Opera House to the Great Barrier Reef, the rugged Outback to cosmopolitan cities, Australia offers incredible diversity. Experience unique wildlife, world-class beaches, and vibrant cultural scenes.",
            imageUrl1: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600",
            imageUrl2: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600"
        },
        {
            name: "Brazil",
            description: "Experience the vibrant energy of Brazil, from the rhythm of Rio de Janeiro's Carnival to the natural wonder of the Amazon rainforest. Discover stunning beaches, diverse ecosystems, and passionate culture.",
            imageUrl1: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600",
            imageUrl2: "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=600"
        }
    ]
};

// Function to search recommendations based on user input
function searchRecommendations() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
    const recommendationsDiv = document.getElementById('recommendations');
    const resultsSection = document.getElementById('resultsSection');
    
    // Clear previous results
    recommendationsDiv.innerHTML = '';
    
    if (searchInput === '') {
        alert('Please enter a search term');
        return;
    }
    
    let results = [];
    let searchType = '';
    
    // Search in beaches
    if (searchInput.includes('beach') || searchInput.includes('tropical') || searchInput.includes('sand') || 
        searchInput.includes('maldives') || searchInput.includes('bali')) {
        results = travelRecommendations.beaches;
        searchType = 'beaches';
    }
    // Search in temples
    else if (searchInput.includes('temple') || searchInput.includes('spiritual') || searchInput.includes('sacred') ||
             searchInput.includes('angkor') || searchInput.includes('kyoto') || searchInput.includes('cambodia') || 
             searchInput.includes('japan')) {
        results = travelRecommendations.temples;
        searchType = 'temples';
    }
    // Search in countries
    else if (searchInput.includes('country') || searchInput.includes('countries') || 
             searchInput.includes('australia') || searchInput.includes('brazil')) {
        results = travelRecommendations.countries;
        searchType = 'countries';
    }
    // General search - search across all categories
    else {
        // Check all categories
        const allResults = [
            ...travelRecommendations.beaches,
            ...travelRecommendations.temples,
            ...travelRecommendations.countries
        ];
        
        results = allResults.filter(item => 
            item.name.toLowerCase().includes(searchInput) || 
            item.description.toLowerCase().includes(searchInput)
        );
        searchType = 'all';
    }
    
    // Display results
    if (results.length > 0) {
        resultsSection.style.display = 'block';
        
        results.forEach(item => {
            const card = createRecommendationCard(item);
            recommendationsDiv.appendChild(card);
        });
        
        // Smooth scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        resultsSection.style.display = 'block';
        recommendationsDiv.innerHTML = `
            <div style="text-align: center; padding: 3rem; grid-column: 1/-1;">
                <h3 style="color: #e74c3c; font-size: 1.5rem;">No recommendations found</h3>
                <p style="margin-top: 1rem; font-size: 1.1rem;">Try searching for "beaches", "temples", or "countries"</p>
            </div>
        `;
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Function to create a recommendation card
function createRecommendationCard(item) {
    const card = document.createElement('div');
    card.className = 'recommendation-card';
    
    card.innerHTML = `
        <div class="recommendation-images">
            <img src="${item.imageUrl1}" alt="${item.name} - Image 1">
            <img src="${item.imageUrl2}" alt="${item.name} - Image 2">
        </div>
        <div class="recommendation-content">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <button class="visit-btn" onclick="alert('Booking feature coming soon for ${item.name}!')">Visit Now</button>
        </div>
    `;
    
    return card;
}

// Function to clear search results
function clearResults() {
    const searchInput = document.getElementById('searchInput');
    const recommendationsDiv = document.getElementById('recommendations');
    const resultsSection = document.getElementById('resultsSection');
    
    searchInput.value = '';
    recommendationsDiv.innerHTML = '';
    resultsSection.style.display = 'none';
    
    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Allow searching with Enter key
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchRecommendations();
            }
        });
    }
});

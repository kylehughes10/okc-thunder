document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the button click
    document.querySelector('.myBtn').addEventListener('click', function() {
        // Select the content-section and apply a transition to move it up
        const contentSection = document.querySelector('.content-section');
        contentSection.style.transition = 'transform 1s';
        contentSection.style.transform = 'translateY(-100vh)'; // Moves up out of view

        // After the content-section has moved up, display and animate the statsSection
        setTimeout(() => {
            const statsSection = document.getElementById('statsSection');
            // Position the statsSection off-screen before making it block display
            statsSection.style.transform = 'translateY(100vh)';
            statsSection.style.display = 'block';

            // Use requestAnimationFrame to ensure the browser has repainted after the display change
            requestAnimationFrame(() => {
                statsSection.style.transition = 'transform 1s';
                statsSection.style.transform = 'translateY(0)'; // Move into view
            });

            // Fetch and display the stats data
            loadStats();
        }, 1000); // This timeout should match the duration of the content-section transition
    });
});

function typeOutText(text, element, index, interval) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(function() {
            typeOutText(text, element, index + 1, interval);
        }, interval);
    }
}

function loadStats() {
    fetch('http://127.0.0.1:5000/') // Make sure this points to your Flask server's address
        .then(response => response.json())
        .then(data => {
            const statsSection = document.getElementById('statsSection');

            // Create the HTML with the data returned from the Flask server
            const statsHtml = `
                <h3>Leading Scorer</h3>
                <p>Name: ${data.leading_scorer_name}</p>
                <p>Points Per Game: ${data.leading_scorer_points}</p>
            `;
            statsSection.innerHTML = statsHtml;

            // Check if the leading scorer's name is "Shai Gilgeous-Alexander"
            if (data.leading_scorer_name === "Shai Gilgeous-Alexander") {
                statsSection.classList.add('shai-background'); // Add class to apply background with opacity
            } else {
                statsSection.classList.remove('shai-background'); // Ensure class is removed if not Shai
            }

            // Make the section visible
            statsSection.style.display = 'block';
            statsSection.style.transition = 'transform 1s';
            statsSection.style.transform = 'translateY(0)';
        })
        .catch(error => {
            console.error('Error fetching stats:', error);
            // Handle errors appropriately
        });
}

document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.getElementById('checkbox');

    checkbox.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
});
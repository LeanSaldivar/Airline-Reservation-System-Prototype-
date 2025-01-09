const form = document.querySelector('#add-flight-form'); // Form element for adding flights
const cancelFlightFormElement = document.querySelector('.cancel-flights-form'); // Selects the form

async function cancelFlightForm(e) {
    e.preventDefault(); // Prevent default form submission

    if (!cancelFlightFormElement) {
        console.error('Cancel Flight Form not found.');
        return;
    }

    const formData = new FormData(cancelFlightFormElement);
    const flightId = formData.get('flight-id'); // Get the value of the field with name="flight-id" in the form id

    if (!flightId) {
        console.error('Flight ID is required to cancel a flight.');
        return;
    }

    try {
        // Send PUT request
        const res = await fetch(`http://localhost:1000/web/api/posts/${flightId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ flightStatus: 'Cancelled' }),
        });

        if (!res.ok) {
            throw new Error(`Failed to cancel flight: ${res.statusText}`);
        }

        const updatedFlight = await res.json();
        console.log('Flight updated successfully:', updatedFlight);

        const postEl = document.createElement('div');
        postEl.textContent = `Flight ${updatedFlight.flightCode} has been cancelled.`;
        document.querySelector('#output').appendChild(postEl);

    } catch (error) {
        console.error('Error:', error.message);
        document.querySelector('#output').textContent = 'Failed to cancel the flight. Please try again later.';
    }
}

async function flightForm(e) {
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData(form); // Gather the form data
    const flyingFrom = formData.get('flying-from');
    const movingTo = formData.get('moving-to');
    const departureDate = formData.get('departure-date');
    const returnDate = formData.get('return-date');
    const travelClass = formData.get('travel-class');

    try {
        // Send POST request with form data
        const res = await fetch('http://localhost:1000/web/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ flyingFrom, movingTo, departureDate, returnDate, travelClass}),
        });

        // Check if the request was successful
        if (!res.ok) {
            throw new Error('Failed to add post');
        }

        // Parse the response
        const newPost = await res.json();

        const postEl = document.createElement('div');
        postEl.textContent = newPost.name || 'No Name';
        document.querySelector('#output').appendChild(postEl);

        // Reset the form fields after successful submission
        form.reset();

    } catch (error) {
        console.error('Error:', error.message);
        document.querySelector('#output').textContent = 'Failed to load posts. Please try again later.';
    }
}

// Attach the submit event listener to the form
form.addEventListener('submit', flightForm);
cancelFlightFormElement.addEventListener('submit', cancelFlightForm);
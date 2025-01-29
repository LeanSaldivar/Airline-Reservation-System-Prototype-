const bookFlightFormElement = document.querySelector('#add-flight-form'); // Form element for adding flights
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
        // Send PATCH request
        const res = await fetch(`http://localhost:1000/web/api/users/${flightId}`, {
            method: 'PATCH',
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

async function fetchAuthenticatedUser() {
    try {
        const res = await fetch('http://localhost:1000/web/api/account/auth/status', {
            method: 'GET',
            credentials: 'include',
        });

        if (!res.ok) {
            throw new Error(`Authentication failed: ${res.statusText}`);
        }

        const user = await res.json();
        console.log("User data:", user);

        const flightUserEl = document.querySelector('#flight-user');  // Use the correct ID
        if (flightUserEl) {
            flightUserEl.value = user.googleId;
        } else {
            console.warn("Element #flight-user not found.");
        }
        document.querySelector('#flightId').value = `flight-${user.googleId}-${Date.now()}`;

    } catch (error) {
        console.error('Error fetching user details:', error.message);
    }
}

async function flightForm(e) {
    e.preventDefault();

    if (!bookFlightFormElement ) {
        console.error('Flight booking form not found!');
        return;
    }

    const formData = new FormData(bookFlightFormElement);
    const flyingFrom = formData.get('flying-from');
    const flyingTo = formData.get('flying-to');
    const departureDate = formData.get('departure-date');
    const departureTime = formData.get('departure-time');
    const returnDate = formData.get('return-date');
    const returnTime = formData.get('return-time');
    const travelClass = formData.get('travel-class');
    const flightUser = formData.get('flight-user');
    const flightUserId = formData.get('flightId');

    try {
        const res = await fetch('http://localhost:1000/web/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                flyingFrom,
                flyingTo,
                departureDate,
                departureTime,
                returnDate,
                returnTime,
                travelClass,
                flightUser,
                flightUserId,
            }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Failed to add flight: ${res.status} - ${errorText}`);
        }

        const newFlight = await res.json();
        console.log("Flight added:", newFlight);

        const postEl = document.createElement('div');
        postEl.textContent = `Flight booked successfully: ${newFlight.flightCode || 'No Flight Code'}`;
        document.querySelector('#output').appendChild(postEl);

    } catch (error) {
        console.error('Error:', error.message);
        document.querySelector('#output').textContent = 'Failed to book the flight. Please try again later.';
    }
}


// Attach the submit event listener to the form
bookFlightFormElement.addEventListener('submit', flightForm);
cancelFlightFormElement.addEventListener('submit', cancelFlightForm);

fetchAuthenticatedUser().catch(error => console.error("Failed to fetch user:", error));
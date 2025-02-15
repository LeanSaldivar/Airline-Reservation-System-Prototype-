class FlightDataService {
    //Transforms Mongo DB into a simplified view for Customers
    static toCustomerView(flightData) {
        return {
            flightCode: flightData.flightCode,
            route: `${flightData.flyingFrom} - ${flightData.flyingTo}`,
            dates: `${flightData.departureDate} - ${flightData.returnDate || 'One-way'}`,
            times: `${flightData.departureTime} - ${flightData.returnTime || 'N/A'}`,
            class: flightData.travelClass,
            status: flightData.flightStatus
        };
    }

    static toDatabaseView(customerView, additionalData) {
        return {
            flightCode: customerView.flightCode,
            flightUserId: additionalData.userId,
            flightUser: additionalData.userRef,
            flightItinerary: customerView.route,
            flyingFrom: customerView.route.split(' - ')[0],
            flyingTo: customerView.route.split(' - ')[1],
            departureDate: customerView.dates.split(' - ')[0],
            departureTime: customerView.times.split(' - ')[0],
            returnDate: customerView.dates.split(' - ')[1] || null,
            returnTime: customerView.times.split(' - ')[1] || null,
            travelClass: customerView.class,
            flightStatus: customerView.status
        };
    }
}

export default FlightDataService;
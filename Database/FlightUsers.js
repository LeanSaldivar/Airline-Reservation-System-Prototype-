//Generates random id
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

//sample database for flight customers
export let users = [
    { id: 1, flightCode: makeid(5),
        flyingFrom: 'New York',
        movingTo: 'Paris',
        departureDate: '12/29/2024',
        returnDate: '12/30/2024',
        travelClass: 'Business',
        flightStatus: 'TBA'},


    { id: 2, flightCode: makeid(5), flyingFrom: 'Tokyo', movingTo: 'Sydney', departureDate: '12/31/2024', returnDate: '1/25/2025', travelClass: 'Economy',  flightStatus: 'TBA'},
    { id: 3, flightCode: makeid(5), flyingFrom: 'London', movingTo: 'Paris', departureDate: '12/29/2024', returnDate: '12/30/2024', travelClass: 'FirstClass', flightStatus: 'TBA'},
];

// Removes duplicate ID's
export function makeUniqueId(length) {
    let id;
    do {
        id = makeid(length);
    } while (users.some((user) => user.flightCode === id));
    return id;
}


export default {users, makeUniqueId}

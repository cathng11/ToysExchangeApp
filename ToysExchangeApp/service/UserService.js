export async function signIn(Username, Password) {
    const response = await fetch('http://192.168.1.128:3070/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Username: Username, Password: Password })
    });
    return await response.json();
}
export async function signUp(Name, Country, Phone, Email, Username, Password, Avatar) {
    const response = await fetch('http://192.168.1.128:3070/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Name: Name,
            Country: Country,
            Phone: Phone,
            Email: Email,
            Username: Username,
            Password: Password,
            Avatar: Avatar
        })
    });
    return await response.json();
}
export async function addToy(Image, Name, _idCategory, _idUser, Datetime, Description, Address) {
    const response = await fetch('http://192.168.1.128:3070/api/toy/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Image: Image, Name: Name, _idCategory: _idCategory, _idUser: _idUser, Datetime: Datetime,
            Description: Description, Address: Address
        })
    });
    return await response.json();
}
export async function getUserToy(_idUser) {
    const response = await fetch('http://192.168.1.128:3070/api/toy/getbyuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({_idUser: _idUser})
    });
    return await response.json();
}
export async function getAllToy() {
    const response = await fetch('http://192.168.1.128:3070/api/toy/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
}
export async function sendRequest(_idToy, _idSender, _idReceiver) {
    const response = await fetch('http://192.168.1.128:3070/api/request/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({_idToy: _idToy, _idSender: _idSender, _idReceiver: _idReceiver})
    });
    return await response.json();
}
export async function getListRequest(_idUser) {
    const response = await fetch('http://192.168.1.128:3070/api/request/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({_idUser: _idUser})
    });
    return await response.json();
}
export async function rejectRequest(_idToy) {
    const response = await fetch('http://192.168.1.128:3070/api/request/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({_idToy:_idToy})
    });
    return await response.json();
}

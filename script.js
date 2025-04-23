document.getElementById('party-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const partyDate = document.getElementById('party-date').value;
    const partyDescription = document.getElementById('party-description').value;
    
    if (partyDate && partyDescription) {
        localStorage.setItem('partyDate', partyDate);
        localStorage.setItem('partyDescription', partyDescription);
        alert('Party details set successfully!');
    }
});

document.getElementById('save-invite').addEventListener('click', function () {
    const inviteMessage = document.getElementById('invite-message').value;
    if (inviteMessage) {
        localStorage.setItem('inviteMessage', inviteMessage);
        alert('Invite message saved successfully!');
    }
});

document.getElementById('registration-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;

    if (name && surname) {
        let guests = JSON.parse(localStorage.getItem('guests')) || [];
        guests.push({ name, surname });
        localStorage.setItem('guests', JSON.stringify(guests));

        const guestList = document.getElementById('guest-list');
        const li = document.createElement('li');
        li.textContent = `${name} ${surname}`;
        guestList.appendChild(li);
    }
});

// Load saved data
window.onload = function () {
    const partyDate = localStorage.getItem('partyDate');
    const partyDescription = localStorage.getItem('partyDescription');
    const inviteMessage = localStorage.getItem('inviteMessage');
    const guests = JSON.parse(localStorage.getItem('guests')) || [];

    if (partyDate && partyDescription) {
        document.getElementById('party-date').value = partyDate;
        document.getElementById('party-description').value = partyDescription;
    }
    if (inviteMessage) {
        document.getElementById('invite-message').value = inviteMessage;
    }

    const guestList = document.getElementById('guest-list');
    guests.forEach(guest => {
        const li = document.createElement('li');
        li.textContent = `${guest.name} ${guest.surname}`;
        guestList.appendChild(li);
    });
};

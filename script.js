// Helper: show toast
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.getElementById('toast-container').appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
  
  // Real-time validation helpers
  function validateField(id, errorId, validator, msg) {
    const el = document.getElementById(id);
    const err = document.getElementById(errorId);
    if (!validator(el.value)) {
      err.textContent = msg;
      return false;
    }
    err.textContent = '';
    return true;
  }
  
  // Party form
  const partyForm = document.getElementById('party-form');
  partyForm.addEventListener('submit', e => {
    e.preventDefault();
    const validDate = validateField('party-date','date-error',v=>v,'Date is required');
    const validDesc = validateField('party-description','desc-error',v=>v.trim(),'Description is required');
    if (!validDate || !validDesc) return;
    localStorage.setItem('partyDate', partyForm['party-date'].value);
    localStorage.setItem('partyDescription', partyForm['party-description'].value);
    showToast('🎉 Party details saved!', 'success');
  });
  
  // Invite message
  document.getElementById('save-invite').addEventListener('click', () => {
    const msg = document.getElementById('invite-message').value.trim();
    localStorage.setItem('inviteMessage', msg);
    showToast('✉️ Invite message saved!', 'success');
  });
  
  // Registration
  const regForm = document.getElementById('registration-form');
  regForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = regForm['name'].value.trim();
    const surname = regForm['surname'].value.trim();
    const validName = validateField('name','name-error',v=>v,'Name is required');
    const validSurname = validateField('surname','surname-error',v=>v,'Surname is required');
    if (!validName || !validSurname) return;
    const guests = JSON.parse(localStorage.getItem('guests')||'[]');
    if (guests.some(g=>g.name===name&&g.surname===surname)) {
      showToast('❗ You have already registered.', 'error');
      return;
    }
    guests.push({name,surname});
    localStorage.setItem('guests', JSON.stringify(guests));
    addGuestToList(name,surname);
    showToast('✅ Successfully registered!', 'success');
  });
  
  // Render guests
  function addGuestToList(name,surname) {
    const li = document.createElement('li');
    li.textContent = `${name} ${surname}`;
    document.getElementById('guest-list').appendChild(li);
  }
  
  // On load
  window.addEventListener('DOMContentLoaded', () => {
    const date = localStorage.getItem('partyDate');
    const desc = localStorage.getItem('partyDescription');
    const invite = localStorage.getItem('inviteMessage');
    if (date) partyForm['party-date'].value = date;
    if (desc) partyForm['party-description'].value = desc;
    if (invite) document.getElementById('invite-message').value = invite;
    JSON.parse(localStorage.getItem('guests')||'[]')
      .forEach(g=>addGuestToList(g.name,g.surname));
  });
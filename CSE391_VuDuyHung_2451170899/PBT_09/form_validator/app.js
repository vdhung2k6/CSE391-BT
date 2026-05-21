const form = document.getElementById('regForm');
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm = document.getElementById('confirmPassword');
const phone = document.getElementById('phone');
const strengthBar = document.getElementById('strengthBar');

// Password Strength
password.addEventListener('input', () => {
    const val = password.value;
    let strength = 0;
    if (val.length >= 8) strength += 33;
    if (/[A-Z]/.test(val) && /[0-9]/.test(val)) strength += 33;
    if (/[!@#$%^&*]/.test(val)) strength += 34;
    strengthBar.style.width = strength + '%';
    strengthBar.style.background = strength < 50 ? 'red' : (strength < 80 ? 'yellow' : 'green');
});

// Phone format
phone.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 3 && val.length <= 6) val = val.slice(0,3) + '-' + val.slice(3);
    else if (val.length > 6) val = val.slice(0,3) + '-' + val.slice(3,6) + '-' + val.slice(6,10);
    e.target.value = val;
});

// Submit logic
form.addEventListener('input', () => {
    const isVal = name.value.length >= 2 && email.value.includes('@');
    document.getElementById('submitBtn').disabled = !isVal;
});
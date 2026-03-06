const username = document.getElementById('username');
const password = document.getElementById('password');
const btn = document.getElementById('btn');

btn.addEventListener('click', (event) => {
    if(username.value === 'admin' && password.value === 'admin123'){
        const newHref = `home.html`;
        btn.href = newHref;
    }
    else{
        event.preventDefault();
        alert('❌ Invalid username or password!')
    }
})
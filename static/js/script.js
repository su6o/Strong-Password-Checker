document.getElementById('password-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const password = document.getElementById('password').value;

    fetch('/check_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'password=' + encodeURIComponent(password),
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('result');
        const copyIcon = document.getElementById('copy-icon');
        resultDiv.innerHTML = '';
        resultDiv.style.display = 'block';

        if (data.strong) {
            resultDiv.innerHTML = `<p style="color: chartreuse;text-align: center;">😉 Strong Password!</p>`;
            copyIcon.style.display = 'block';
        } else {
            resultDiv.innerHTML = `<p style="color: orangered;">😢 Weak Password.</p><ul>`;
            if (data.errors.length_error) resultDiv.innerHTML += '<li>At least 8 characters long</li>';
            if (data.errors.digit_error) resultDiv.innerHTML += '<li>At least one digit</li>';
            if (data.errors.uppercase_error) resultDiv.innerHTML += '<li>At least one uppercase letter</li>';
            if (data.errors.lowercase_error) resultDiv.innerHTML += '<li>At least one lowercase letter</li>';
            if (data.errors.symbol_error) resultDiv.innerHTML += '<li>At least one special character</li>';
            resultDiv.innerHTML += '</ul>';
            copyIcon.style.display = 'none';
        }
    });
});

document.getElementById('copy-icon').addEventListener('click', function () {
    const password = document.getElementById('password').value;
    const el = document.createElement('textarea');
    el.value = password;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    const popup = document.getElementById('popup');
    popup.style.display = 'block';
    document.querySelector('.close').onclick = function() {
        popup.style.display = 'none';
    }
    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    }
});

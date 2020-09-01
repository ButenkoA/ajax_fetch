document.querySelector('.time').innerText
    = new Date ().toLocaleTimeString();

document.querySelector('.get-ajax-html').addEventListener('click', getAjaxHTML);

function getAjaxHTML() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.querySelector('.html-container')
                .innerHTML = xhr.responseText;
        }
    }
    xhr.open('get', 'client-data.html', true);
    xhr.send();
}

document.querySelector('.fetch-html').addEventListener('click', fetchHtml);

function fetchHtml() {
    fetch('client-data.html')
        .then( responce => responce.text() )
        .then( html => document.querySelector('.html-container').innerHTML = html);
}

async function fetchHtml() {
    const response = await fetch('client-data.html');
    const html = await response.text();
    document.querySelector('.html-container').innerHTML = html
}

document.querySelector('.get-ajax-json').addEventListener('click', getAjaxJson);

function getAjaxJson() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            document.querySelector('.name').innerText = data.name;
            document.querySelector('.balance').innerText = data.balance;
                }
    }
    xhr.open('get', 'client-data.json', true);
    xhr.send();
}

document.querySelector('.fetch-json').addEventListener('click', fetchJson);

async function fetchJson() {
    const response = await fetch('client-data.json');
    const data = await response.json();
    document.querySelector('.name').innerText = data.name;
    document.querySelector('.balance').innerText = data.balance;
}


document.querySelector('.login-form input[type=submit]')
    .addEventListener('click', login);
    
function login(e) {
    e.preventDefault();
    fetch('login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            name: document.querySelector('.login-form input[name=name]').value,
            password: document.querySelector('.login-form input[name=password]').value
        })
    })
    .then(_ => document.querySelector('.login-form').reset());
}
const UI = require('./ui');
const Github = require('./github');
const {
    client_id,
    client_secret
} = require('./config.json');

const github = new Github(client_id, client_secret);
const ui = new UI();

const userForm = document.getElementById('userform');

userForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const textSearch = document.getElementById('textSearch').value;
    if (textSearch !== '') {
        github.fetchUser(textSearch)
            .then(data => {
                console.log(data);
                if (data.profile.message === 'Not Found') {
                    ui.showMessage('User not Found', 'alert alert-danger mt-2 col-md-12');
                } else {
                    ui.clearMessage();
                    ui.showProfile(data.profile);
                    ui.showRepositories(data.repositories);
                }
            });
    }
});
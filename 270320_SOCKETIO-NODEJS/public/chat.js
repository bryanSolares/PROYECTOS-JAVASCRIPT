const socket = io();

//DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let send = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

send.addEventListener('click', () => {
    socket.emit('chat:message', {
        message: message.value,
        username: username.value

    });
    console.log();
});

message.addEventListener('keypress', function () {
    socket.emit('chat:typing', username.value);
})

socket.on('chat:message', function (data) {
    actions.innerHTML = '';
    output.innerHTML += `
    <p><strong>${data.username}</strong>: ${data.message}</p>
    `
});

socket.on('chat:typing',function(data){
    actions.innerHTML = `
    <p><em>${data} is typing message.... </em></p>
    `;
});
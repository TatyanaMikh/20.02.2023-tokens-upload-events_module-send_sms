const socket = io('http://localhost:3000');

const message_container = document.querySelector('#message_container');
const send_container = document.querySelector('#send_container');
const message_input = document.querySelector('#message_input');

const appendMessage = (message)=>{
    const message_element = document.createElement('div');
    message_element.textContent = message;
    message_container.append(message_element);
};

const user_name = prompt('what is your name');
appendMessage('You joined');

socket.emit('new-user',user_name);

socket.on('user-connected',(user_name)=>{

    appendMessage(`${user_name} connected`);

});

socket.on('user-disconnected',(user_name)=>{
    appendMessage(`${user_name} disconnected`);
})


socket.on('chat-message', (obj)=>{

    appendMessage(`${obj.name} : ${obj.message}`);

})

send_container.addEventListener('submit',(event)=>{

    event.preventDefault();
    const message = message_input.value;
    appendMessage(`You : ${message}`);
    socket.emit('send-chat-message',message);
    message_input.value = '';
})

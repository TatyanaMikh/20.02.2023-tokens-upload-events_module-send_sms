const socket = io('http://localhost:3000');

const colors = [
    "yellow",
    'green',
    "red",
    "blue"
]

socket.on('change-color',()=>{

    let random = Math.floor(Math.random() * 4 );

    document.querySelector('body').style.backgroundColor = colors[random];


})


const chat = () => {
  let socket = io.connect('http://localhost:3000');

  let message = document.querySelector('#message');
  let username = document.querySelector('#username');
  let send_message = document.querySelector('#send_message');
  let send_username = document.querySelector('#send_username');
  let chatroom = document.querySelector('#chatroom');

  let min = 1;
  let max = 6;
  let alertClass;

  send_message.addEventListener('click', () => {
    socket.emit('new_message', {
      message: message.value,
      className: alertClass,
    });
  });

  const getRandomValue = () => {
    let random = Math.floor(Math.random() * (max - min)) + min;

    // Устаналиваем класс в переменную в зависимости от случайного числа
    // Эти классы взяты из Bootstrap стилей
    switch (random) {
      case 1:
        alertClass = 'secondary';
        break;
      case 2:
        alertClass = 'danger';
        break;
      case 3:
        alertClass = 'success';
        break;
      case 4:
        alertClass = 'warning';
        break;
      case 5:
        alertClass = 'info';
        break;
      case 6:
        alertClass = 'light';
        break;
    }
  };

  socket.on('add_mess', (data) => {
    message.value = '';
    getRandomValue();
    let div = document.createElement('div');
    div.className = `alert alert-${data.className}`;
    div.innerHTML = `<p>${data.username}: ${data.message}</p>`;
    chatroom.append(div);
  });

  send_username.addEventListener('click', () => {
    socket.emit('change_username', { username: username.value });
  });

  message.addEventListener('keypress', () => {
    socket.emit('typing');
  });
};

chat();

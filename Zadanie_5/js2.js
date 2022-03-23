const btn1 = document.querySelector('.btn-snd');
const btn2 = document.querySelector('.btn-geo');
const div1 = document.querySelector('.div1');
const inp1 = document.querySelector('.inp');

// WebSocket
let websocket;
let url1 = "wss://ws.ifelse.io";
console.log("start");
  websocket = new WebSocket(url1);
  websocket.onopen = function(evt) {
    console.log("CONNECTED");
  };
  websocket.onclose = function(evt) {
    console.log("DISCONNECTED");
  };
function otv(){
  websocket.onmessage = function(evt) {
    console.log('<span style="color: blue;">RESPONSE: ' + evt.data+'</span>');
    div1.innerHTML += `<p class="p2">${evt.data}</p>`;
  };
};
  websocket.onerror = function(evt) {
    console.log('<span style="color: red;">ERROR:</span> ' + evt.data);
  };

 // Кнопка отправить
btn1.addEventListener('click', () =>{
  const message = inp1.value;
  div1.innerHTML += `<p class="p1">${message}</p>`;
  otv();
  websocket.send(message);
  inp1.value = "";
});

 // Кнопка геолокации
 btn2.addEventListener('click', () =>{
  getObj();
});

// Функция запроса и ответа
function getObj(){
  if (!navigator.geolocation) {
    console.log('Geolocation не поддерживается вашим браузером');
  } else {
    console.log('Определение местоположения…');
    navigator.geolocation.getCurrentPosition(success, error);
  };

// Функция, выводящая текст об ошибке
function error() {
  console.log("error!");
  div1.innerHTML = 'Информация о местоположении недоступна.';
  };
};
// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(latitude, longitude);
  div1.innerHTML += `<p class="p2">
                      <a href="https://www.openstreetmap.org/#map=17/${latitude}/${longitude}">
                      Гео-локация</a>
                    </p>`;
 };
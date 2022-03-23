const btn = document.querySelector('.btn');
const div1 = document.querySelector('.div1');
const div2 = document.querySelector('.div2');

// Функция, выводящая текст об ошибке
function error() {
  console.log("error!");
  div1.innerHTML = 'Информация о местоположении недоступна.';
};

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(latitude, longitude);
  getObj(latitude, longitude);
};

 // Кнопка запроса
btn.addEventListener('click', () =>{
  if (!navigator.geolocation) {
    div1.innerHTML = 'Geolocation не поддерживается вашим браузером';
  } else {
    div1.innerHTML = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }; 
});

// Функция запроса и ответа
function getObj(lat, lon){
 fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${lat}&long=${lon}`)
  .then((Response)=>{console.log('response', Response);
    const result = Response.json();
    console.log('result', result);
    return result;})
  .then((data) => {
    console.log('data', data);
    if(data == ""){
      console.log("Ошибка! Нет данных!");
    }
    else{
      div1.innerHTML = "";
      div2.innerHTML = `временная зона, в которой находится пользователь: ${data.timezone}</br>
                        местные дата и время: ${data.date_time_txt}`;
    };
  })
  .catch(() => {console.log('error')})
};
const btn = document.querySelector('.btn');
const div1 = document.querySelector('.div1');
const div2 = document.querySelector('.div2');

// Функция, выводящая текст об ошибке
function error() {
  console.log("error!");
  div2.innerHTML = 'Информация о местоположении недоступна.';
};

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(latitude, longitude);
  div2.innerHTML = `<h3>Координаты местонахождения пользователя:</h3></bp> ${latitude}, ${longitude}.`;
};

//Кнопка запроса
btn.addEventListener('click', () =>{
  let raz_w = window.screen.width;
  let raz_h =  window.screen.height;
  div1.innerHTML = `<h3>Размеры экрана:</h3></bp>
                    <p>Ширина окна: ${raz_w}</p>
                    <p>Высота окна: ${raz_h}</p>`;
  if (!navigator.geolocation) {
    div2.innerHTML = 'Geolocation не поддерживается вашим браузером';
  } else {
    div2.innerHTML = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  };        
})
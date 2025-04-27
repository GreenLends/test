let timerInterval;
let clickCount = 0;
let counterValue = 0; // Переменная для хранения значения счётчика
let testRunning = false; // Переменная для отслеживания состояния теста
let testDuration = 5; // Длительность теста в секундах

// Обработчик события для кнопки "Начать тест / Кликай!"
document.getElementById('testButton').addEventListener('click', function() {
    if (!testRunning) {
        startTest();
    } else {
        clickCount++;
        document.getElementById('clickCount').textContent = clickCount;
    }
});

// Функция начала теста
function startTest() {
    testRunning = true;

    // Сброс значений перед началом теста
    clickCount = 0;
    document.getElementById('clickCount').textContent = clickCount;

    // Установить таймер на 5 секунд
    let timeLeft = testDuration;

    // Обновление таймера каждую секунду
    document.getElementById('timer').textContent = timeLeft;

    timerInterval = setInterval(function() {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endTest();
        }
        
    }, 1000);

     // Изменяем текст кнопки на "Кликай!"
     document.getElementById('testButton').textContent = 'Кликай!';
}

// Функция завершения теста
function endTest() {
     testRunning = false;

     const resultPanel = document.querySelector('.result-panel');
     resultPanel.style.display = 'block';
     document.getElementById('resultCount').textContent = clickCount;

     // Вычисляем среднее количество кликов в секунду
     const cps = (clickCount / testDuration).toFixed(2); // Округляем до двух знаков после запятой
     document.getElementById('cpsCount').textContent = cps;

     // Изменяем текст кнопки обратно на "Начать тест (5 секунд)"
     const testButton = document.getElementById('testButton');
     testButton.textContent = 'Начать тест (5 секунд)';
     
     // Отключаем кнопку и устанавливаем задержку в 5 секунд перед повторным использованием
     testButton.disabled = true;
     setTimeout(() => {
         testButton.disabled = false; // Включаем кнопку снова через 5 секунд
     }, 5000);
}

// Обработчики событий для кнопок счётчика
document.getElementById('increase').addEventListener('click', function() {
     counterValue++;
     document.getElementById('counter').textContent = counterValue;
});

document.getElementById('decrease').addEventListener('click', function() {
     if (counterValue > 0) { // Проверка на минимальное значение
         counterValue--;
         document.getElementById('counter').textContent = counterValue;
     }
});

document.getElementById('reset').addEventListener('click', function() {
     counterValue = 0;
     document.getElementById('counter').textContent = counterValue;
});
// ==================== ОСНОВНЫЕ ПЕРЕМЕННЫЕ И ДАННЫЕ ====================


// Данные для квиза
const quizData = [
    {
        image: "images/mayakovskaya.jpg",
        correctAnswer: "Маяковская",
        wrongAnswers: ["Чеховская", "Пушкинская", "Тверская"]
    },
    {
        image: "images/komsomolskaya.jpg",
        correctAnswer: "Комсомольская",
        wrongAnswers: ["Курская", "Киевская", "Белорусская"]
    },
    {
        image: "images/ploshad-revolutsii.jpg", 
        correctAnswer: "Площадь Революции",
        wrongAnswers: ["Театральная", "Охотный ряд", "Арбатская"]
    },
    {
        image: "images/novoslobodskaya.jpg",
        correctAnswer: "Новослободская",
        wrongAnswers: ["Белорусская", "Проспект Мира", "Цветной бульвар"]
    },
    {
        image: "images/kievskaya.jpg",
        correctAnswer: "Киевская",
        wrongAnswers: ["Смоленская", "Краснопресненская", "Баррикадная"]
    }
];

// Данные для фактов
const metroFacts = [
    {
        title: "Самая глубокая станция",
        text: "Станция 'Парк Победы' — самая глубокая в московском метро. Её глубина составляет 84 метра, что равно высоте 28-этажного дома!"
    },
    {
        title: "Самая длинная эскалаторная лента", 
        text: "Самый длинный эскалатор находится на станции 'Парк Победы' — его длина 126 метров. Подъём занимает около 3 минут!"
    },
    {
        title: "Первая станция метро",
        text: "Первая линия московского метро открылась 15 мая 1935 года. Она шла от станции 'Сокольники' до 'Парка культуры'."
    },
    {
        title: "Метро-призрак",
        text: "Станция 'Советская' между 'Тверской' и 'Театральной' была построена, но никогда не использовалась. Сейчас там расположен командный пункт метрополитена."
    },
    {
        title: "Самый загруженный день",
        text: "Рекорд посещаемости московского метро был установлен 26 декабря 2014 года — 10,1 миллиона пассажиров за сутки!"
    },
    {
        title: "Подземные дворцы",
        text: "44 станции московского метро являются объектами культурного наследия. Их украшают мрамор, бронза, витражи и мозаики."
    },
    {
        title: "Секретный метрополитен",
        text: "Существует система Метро-2 — засекреченные правительственные линии, соединяющие важные государственные объекты."
    },
    {
        title: "Кольцевая линия — случайность",
        text: "Кольцевая линия появилась из-за капли кофе! При обсуждении планов метро Сталин поставил чашку на схему, и от кольцевого пятна родилась идея."
    },
    {
        title: "Бронзовый пёс",
        text: "На станции 'Площадь Революции' есть скульптура собаки, нос которой натёрт до блеска. Студенты верят, что прикосновение приносит удачу на экзаменах."
    },
    {
        title: "Ночной сон",
        text: "Метро работает с 5:30 утра до 1:00 ночи. Всего 4,5 часа отводится на техническое обслуживание путей и составов."
    }
];

// Данные для головоломки "Найди лишнюю станцию"
const stationPuzzles = [
    {
        stations: ["Краснопресненская", "Баррикадная", "Кузнецкий мост", "Киевская"],
        correct: "Киевская",
        hint: "Три станции находятся на одной линии, а одна - на другой"
    },
    {
        stations: ["Парк Победы", "Славянский бульвар", "Минская", "Александровский сад"],
        correct: "Александровский сад",
        hint: "Обрати внимание на глубину станций"
    },
    {
        stations: ["Воробьёвы горы", "Лужники", "Спортивная", "Библиотека им. Ленина"],
        correct: "Библиотека им. Ленина",
        hint: "Три станции связаны со спортом"
    },
    {
        stations: ["Охотный ряд", "Театральная", "Площадь Революции", "Новослободская"],
        correct: "Новослободская",
        hint: "Три станции находятся в самом центре"
    }
];

// Переменные состояния
let currentQuestion = 0;
let score = 0;
let selectedStation = null;
let currentPuzzleIndex = 0;

// ==================== ОСНОВНАЯ НАВИГАЦИЯ ====================

// Показать главную страницу
function goHome() {
    hideAllPages();
    document.getElementById('main-page').classList.add('active');
}

// Показать страницу фактов
function showFacts() {
    hideAllPages();
    document.getElementById('facts-page').classList.add('active');
    displayFacts();
}

// Показать страницу головоломок
function showPuzzles() {
    hideAllPages();
    document.getElementById('puzzles-page').classList.add('active');
    showPuzzlesMenu();
}

// Показать страницу помощи
function showHelpPage() {
    hideAllPages();
    document.getElementById('help-page').classList.add('active');
}

// Скрыть все страницы
function hideAllPages() {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
}

// ==================== КВИЗ ====================

// Начать квиз
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    hideAllPages();
    document.getElementById('quiz-page').classList.add('active');
    showQuestion();
}

// Показать текущий вопрос
function showQuestion() {
    const question = quizData[currentQuestion];
    
    // Обновляем прогресс
    document.getElementById('quiz-progress').textContent = `Вопрос ${currentQuestion + 1}/${quizData.length}`;
    document.getElementById('quiz-score').textContent = `Очки: ${score}`;
    
    // Показываем изображение
    document.getElementById('station-image').src = question.image;
    document.getElementById('station-image').alt = `Станция метро ${question.correctAnswer}`;
    
    // Очищаем предыдущие ответы
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    
    // Создаём массив всех ответов и перемешиваем их
    const allAnswers = [question.correctAnswer, ...question.wrongAnswers];
    const shuffledAnswers = shuffleArray(allAnswers);
    
    // Создаём кнопки для каждого ответа
    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.className = 'answer-btn';
        button.onclick = () => checkAnswer(answer, button);
        answersContainer.appendChild(button);
    });
    
    // Скрываем кнопку "Следующий вопрос"
    document.getElementById('next-btn').style.display = 'none';
}

// Проверить выбранный ответ
function checkAnswer(selectedAnswer, button) {
    const correctAnswer = quizData[currentQuestion].correctAnswer;
    const allButtons = document.querySelectorAll('.answer-btn');
    
    // Блокируем все кнопки после выбора
    allButtons.forEach(btn => {
        btn.disabled = true;
    });
    
    // Показываем правильные/неправильные ответы
    allButtons.forEach(btn => {
        if (btn.textContent === correctAnswer) {
            btn.classList.add('correct');
        }
        if (btn.textContent === selectedAnswer && selectedAnswer !== correctAnswer) {
            btn.classList.add('wrong');
        }
    });
    
    // Увеличиваем счёт за правильный ответ
    if (selectedAnswer === correctAnswer) {
        score++;
        document.getElementById('quiz-score').textContent = `Очки: ${score}`;
    }
    
    // Показываем кнопку "Следующий вопрос"
    document.getElementById('next-btn').style.display = 'inline-block';
}

// Следующий вопрос
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Показать результаты квиза
function showResults() {
    hideAllPages();
    document.getElementById('results-page').classList.add('active');
    
    const finalScoreElement = document.getElementById('final-score');
    let message = '';
    
    if (score === quizData.length) {
        message = '🎉 Идеально! Ты настоящий эксперт метро!';
    } else if (score >= quizData.length * 0.7) {
        message = '👍 Отличный результат! Ты хорошо знаешь метро!';
    } else if (score >= quizData.length * 0.5) {
        message = '😊 Хорошо! Но есть куда расти!';
    } else {
        message = '📚 Попробуй ещё раз! Ты сможешь лучше!';
    }
    
    finalScoreElement.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 1rem;">${score}/${quizData.length}</div>
        <div style="font-size: 1.5rem;">${message}</div>
    `;
}

// Перезапустить квиз
function restartQuiz() {
    hideAllPages();
    document.getElementById('main-page').classList.add('active');
}

// ==================== ФАКТЫ ====================

// Отобразить факты на странице
function displayFacts() {
    const factsContainer = document.querySelector('.facts-container');
    factsContainer.innerHTML = '';
    
    metroFacts.forEach((fact, index) => {
        const factCard = document.createElement('div');
        factCard.className = 'fact-card';
        
        factCard.innerHTML = `
            <div class="fact-title">
                <span class="fact-number">${index + 1}</span>
                ${fact.title}
            </div>
            <div class="fact-text">${fact.text}</div>
        `;
        
        factsContainer.appendChild(factCard);
    });
}

// ==================== ГОЛОВОЛОМКИ ====================

// Показать меню головоломок
function showPuzzlesMenu() {
    document.querySelector('.puzzles-menu').style.display = 'grid';
    document.querySelectorAll('.puzzle-container').forEach(puzzle => {
        puzzle.classList.remove('active');
    });
}

// Показать конкретную головоломку
function showPuzzle(puzzleId) {
    document.querySelector('.puzzles-menu').style.display = 'none';
    document.querySelectorAll('.puzzle-container').forEach(puzzle => {
        puzzle.classList.remove('active');
    });
    document.getElementById(puzzleId).classList.add('active');
    
    // Инициализируем головоломку
    if (puzzleId === 'find-extra') {
        initExtraStationPuzzle();
    } else if (puzzleId === 'build-map') {
        initMapPuzzle();
    }
}

// ==================== ГОЛОВОЛОМКА 1: НАЙДИ ЛИШНЮЮ СТАНЦИЮ ====================

// Инициализация головоломки
function initExtraStationPuzzle() {
    const puzzle = stationPuzzles[currentPuzzleIndex];
    const container = document.getElementById('stations-container');
    const feedback = document.getElementById('puzzle1-feedback');
    
    feedback.textContent = '';
    feedback.className = 'feedback';
    selectedStation = null;
    
    container.innerHTML = '';
    
    puzzle.stations.forEach(station => {
        const stationElement = document.createElement('div');
        stationElement.className = 'station-option';
        stationElement.textContent = station;
        stationElement.onclick = () => selectStation(station, stationElement);
        container.appendChild(stationElement);
    });
}

// Выбрать станцию
function selectStation(station, element) {
    // Снимаем выделение со всех станций
    document.querySelectorAll('.station-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Выделяем выбранную станцию
    element.classList.add('selected');
    selectedStation = station;
}

// Проверить ответ в головоломке
function checkExtraStation() {
    const feedback = document.getElementById('puzzle1-feedback');
    const puzzle = stationPuzzles[currentPuzzleIndex];
    
    if (!selectedStation) {
        feedback.textContent = 'Сначала выбери станцию!';
        feedback.className = 'feedback incorrect';
        return;
    }
    
    if (selectedStation === puzzle.correct) {
        feedback.textContent = '✅ Правильно! ' + puzzle.hint;
        feedback.className = 'feedback correct';
    } else {
        feedback.textContent = '❌ Неправильно! Попробуй ещё раз. Подсказка: ' + puzzle.hint;
        feedback.className = 'feedback incorrect';
    }
}

// Новая головоломка
function newExtraStationPuzzle() {
    currentPuzzleIndex = (currentPuzzleIndex + 1) % stationPuzzles.length;
    initExtraStationPuzzle();
}

// ==================== ГОЛОВОЛОМКА 2: СОБЕРИ СХЕМУ МЕТРО ====================

// Инициализация головоломки с картой
function initMapPuzzle() {
    // Перемешиваем станции в пуле
    const stationsPool = document.querySelector('.drag-stations');
    const stations = Array.from(stationsPool.children);
    
    // Перемешиваем массив
    for (let i = stations.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        stationsPool.appendChild(stations[j]);
    }
    
    // Очищаем слоты
    document.querySelectorAll('.station-slot').forEach(slot => {
        slot.innerHTML = '';
        slot.className = 'station-slot';
    });
    
    document.getElementById('puzzle2-feedback').textContent = '';
}

// Функции для Drag & Drop
function allowDrop(ev) {
    ev.preventDefault();
    ev.currentTarget.classList.add('hover');
}

function dragStation(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.target.classList.add('dragging');
}

function dropStation(ev) {
    ev.preventDefault();
    ev.currentTarget.classList.remove('hover');
    
    const data = ev.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    
    // Удаляем элемент из предыдущего места
    if (draggedElement.parentNode) {
        draggedElement.parentNode.removeChild(draggedElement);
    }
    
    // Добавляем в новый слот
    ev.currentTarget.innerHTML = '';
    ev.currentTarget.appendChild(draggedElement);
    draggedElement.classList.remove('dragging');
    
    // Делаем элемент снова перетаскиваемым
    draggedElement.setAttribute('draggable', 'true');
    draggedElement.ondragstart = dragStation;
}

// Проверить головоломку с картой
function checkMapPuzzle() {
    const slots = document.querySelectorAll('.station-slot');
    let correctCount = 0;
    const totalSlots = slots.length;
    
    slots.forEach(slot => {
        const stationElement = slot.querySelector('.station-item');
        
        if (stationElement && stationElement.textContent === slot.dataset.correct) {
            slot.classList.add('correct');
            slot.classList.remove('incorrect');
            correctCount++;
        } else {
            slot.classList.add('incorrect');
            slot.classList.remove('correct');
        }
    });
    
    const feedback = document.getElementById('puzzle2-feedback');
    
    if (correctCount === totalSlots) {
        feedback.textContent = '🎉 Отлично! Ты правильно собрал схему метро!';
        feedback.className = 'feedback correct';
    } else {
        feedback.textContent = `Правильно размещено ${correctCount} из ${totalSlots} станций. Попробуй ещё!`;
        feedback.className = 'feedback incorrect';
    }
}

// Сбросить головоломку с картой
function resetMapPuzzle() {
    initMapPuzzle();
}

// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================

// Перемешать массив
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// ==================== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ ====================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚇 МетроКвест успешно загружен!');
    
    // Обновляем год в футере
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-content span');
    if (yearElement) {
        yearElement.textContent = `МетроКвест © ${currentYear}`;
    }
    
    // Инициализируем первую головоломку
    initExtraStationPuzzle();
});

// Глобальная функция для отладки
window.showDebugInfo = function() {
    console.log('=== ДЕБАГ ИНФОРМАЦИЯ ===');
    console.log('Текущий вопрос:', currentQuestion);
    console.log('Счёт:', score);
    console.log('Выбранная станция:', selectedStation);
    console.log('Текущая головоломка:', currentPuzzleIndex);
    console.log('========================');
};

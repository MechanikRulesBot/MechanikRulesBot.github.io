document.addEventListener('DOMContentLoaded', () => {
    const userIdInput = document.getElementById('user-id');
    const reasonInput = document.getElementById('reason');
    const timeInput = document.getElementById('time');
    const groupList = document.getElementById('group-list');
    const logs = document.getElementById('logs');
    
    const warnBtn = document.getElementById('warn-btn');
    const unwarnBtn = document.getElementById('unwarn-btn');
    const muteBtn = document.getElementById('mute-btn');
    const kickBtn = document.getElementById('kick-btn');
    const banBtn = document.getElementById('ban-btn');
    const unbanBtn = document.getElementById('unban-btn');

    // Функция для логирования сообщений в интерфейсе
    function logMessage(message, type = 'info') {
        const p = document.createElement('p');
        p.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        p.style.color = type === 'error' ? 'red' : (type === 'success' ? 'green' : 'black');
        logs.appendChild(p);
        logs.scrollTop = logs.scrollHeight;
    }

    // Заполнение списка групп
    // В реальном приложении этот список должен передаваться из бота
    // Для демонстрации используем заглушку
    const mockGroups = [
        { id: '-100223456789', title: 'Пример группы 1' },
        { id: '-100987654321', title: 'Пример группы 2' }
    ];
    
    if (mockGroups.length > 0) {
        mockGroups.forEach(group => {
            const option = document.createElement('option');
            option.value = group.id;
            option.textContent = group.title;
            groupList.appendChild(option);
        });
    } else {
        const option = document.createElement('option');
        option.textContent = "Нет доступных групп";
        groupList.appendChild(option);
        groupList.disabled = true;
    }

    // Функция для отправки данных на сервер
    async function sendAction(action, data) {
        // Используем относительный путь, так как Flask-сервер будет
        // обслуживать и веб-приложение, и API в одном домене.
        // Замените этот URL на реальный адрес вашего хостинга, если он отличается от GitHub Pages.
        const backendUrl = 'https://mechanikrulesbot.github.io/moderation'; 
        
        logMessage(`Отправка команды "${action}"...`);
        
        try {
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            
            if (result.success) {
                logMessage(`Успех: ${result.message}`, 'success');
            } else {
                logMessage(`Ошибка: ${result.message}`, 'error');
            }
        } catch (error) {
            logMessage(`Критическая ошибка при отправке запроса: ${error.message}`, 'error');
        }
    }

    // Обработчики для кнопок
    warnBtn.addEventListener('click', () => {
        const userId = userIdInput.value;
        const reason = reasonInput.value;
        const chatId = groupList.value;
        if (userId && reason && chatId) {
            sendAction('warn', { userId, reason, chatId });
        } else {
            logMessage('Введите ID пользователя, причину и выберите группу.', 'error');
        }
    });

    unwarnBtn.addEventListener('click', () => {
        const userId = userIdInput.value;
        const reason = reasonInput.value || 'Не указана';
        const chatId = groupList.value;
        if (userId && chatId) {
            sendAction('unwarn', { userId, reason, chatId });
        } else {
            logMessage('Введите ID пользователя и выберите группу.', 'error');
        }
    });

    muteBtn.addEventListener('click', () => {
        const userId = userIdInput.value;
        const reason = reasonInput.value;
        const time = timeInput.value;
        const chatId = groupList.value;
        if (userId && reason && time && chatId) {
            sendAction('mute', { userId, reason, time, chatId });
        } else {
            logMessage('Введите ID пользователя, причину, время и выберите группу.', 'error');
        }
    });

    kickBtn.addEventListener('click', () => {
        const userId = userIdInput.value;
        const reason = reasonInput.value;
        const chatId = groupList.value;
        if (userId && reason && chatId) {
            sendAction('kick', { userId, reason, chatId });
        } else {
            logMessage('Введите ID пользователя, причину и выберите группу.', 'error');
        }
    });

    banBtn.addEventListener('click', () => {
        const userId = userIdInput.value;
        const reason = reasonInput.value;
        const time = timeInput.value;
        const chatId = groupList.value;
        if (userId && reason && time && chatId) {
            sendAction('ban', { userId, reason, time, chatId });
        } else {
            logMessage('Введите ID пользователя, причину, время и выберите группу.', 'error');
        }
    });

    unbanBtn.addEventListener('click', () => {
        const userId = userIdInput.value;
        const reason = reasonInput.value || 'Не указана';
        const chatId = groupList.value;
        if (userId && chatId) {
            sendAction('unban', { userId, reason, chatId });
        } else {
            logMessage('Введите ID пользователя и выберите группу.', 'error');
        }
    });
});

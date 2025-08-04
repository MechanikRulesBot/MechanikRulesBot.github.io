document.addEventListener('DOMContentLoaded', () => {
    const userIdInput = document.getElementById('user-id');
    const reasonInput = document.getElementById('reason');
    const timeInput = document.getElementById('time');
    const logs = document.getElementById('logs');

    // Кнопки
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

    // Заглушка для имитации отправки данных на сервер
    async function sendAction(action, data) {
        // Здесь должен быть URL вашего бэкенда, который будет обрабатывать команды
        const backendUrl = 'https://your-backend-api.com/moderation'; 

        logMessage(`Отправка команды "${action}"...`);

        try {
            // В реальном приложении здесь будет запрос к вашему бэкенду
            // const response = await fetch(backendUrl, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ action, ...data })
            // });

            // const result = await response.json();

            // Имитация ответа
            await new Promise(resolve => setTimeout(resolve, 1000));
            const result = { success: true, message: `Команда "${action}" выполнена успешно.` };

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
        if (userId && reason) {
            sendAction('warn', { userId, reason });
        } else {
            logMessage('Введите ID пользователя и причину.', 'error');
        }
    });

    unwarnBtn.addEventListener('click', () => {
        const userId = userIdInput.value;
        const reason = reasonInput.value;
        const amount = 1; // Упрощенно, снимаем 1 предупреждение
        if (userId && reason) {
            sendAction('unwarn', { userId, reason, amount });
        } else {
            logMessage('Введите ID пользователя и причину.', 'error');
        }
    });

    muteBtn.addEventListener('click', () => {
        const userId = userIdInput.value;
        const reason = reasonInput.value;
        const time = timeInput.value;
        if (userId && reason && time) {
            sendAction('mute', { userId, reason, time });
        } else {
            logMessage('Введите ID пользователя, причину и время.', 'error');
        }
    });

    kickBtn.addEventListener('click', () => {
        const userId = userIdInput.value;
        const reason = reasonInput.value;
        if (userId && reason) {
            sendAction('kick', { userId, reason });
        } else {
            logMessage('Введите ID пользователя и причину.', 'error');
        }
    });

    banBtn.addEventListener('click', () => {
        const userId = userIdInput.value;
        const reason = reasonInput.value;
        const time = timeInput.value;
        if (userId && reason && time) {
            sendAction('ban', { userId, reason, time });
        } else {
            logMessage('Введите ID пользователя, причину и время.', 'error');
        }
    });

    unbanBtn.addEventListener('click', () => {
        const userId = userIdInput.value;
        const reason = reasonInput.value || 'Не указана';
        if (userId) {
            sendAction('unban', { userId, reason });
        } else {
            logMessage('Введите ID пользователя.', 'error');
        }
    });
});

// Получаем форму и все поля
const form = document.getElementById('survey-form');
const inputs = form.querySelectorAll('input, select');
const submitBtn = form.querySelector('button[type="submit"]');

// Восстанавливаем данные из localStorage при загрузке страницы
inputs.forEach(input => {
    const savedValue = localStorage.getItem(input.name);
    if (savedValue) {
        input.value = savedValue;
    }

    // Сохраняем данные в localStorage при каждом изменении
    input.addEventListener('input', () => {
        localStorage.setItem(input.name, input.value);
    });
});

// Обработка отправки формы
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // отменяем стандартную отправку

    const formData = new FormData(form);

    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Отправка...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Анкета отправлена! Спасибо!");
            form.reset();

            // очищаем localStorage для всех полей формы
            inputs.forEach(input => localStorage.removeItem(input.name));
        } else {
            alert("Ошибка: " + data.message);
        }

    } catch (error) {
        alert("Что-то пошло не так. Попробуйте еще раз.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});


function showSidebar() {
    const sideBar = document.querySelector('.side-bar');
    sideBar.style.display = 'flex';
}

function hideSidebar() {
    const sideBar = document.querySelector('.side-bar');
    sideBar.style.display = 'none';
}
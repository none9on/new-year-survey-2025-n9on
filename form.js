const form = document.getElementById('survey-form');
const inputs = form.querySelectorAll('input, select, textarea');
const submitBtn = form.querySelector('button[type="submit"]');


inputs.forEach(input => {
    const savedValue = localStorage.getItem(input.name);
    if (savedValue) {
        input.value = savedValue;
    }

    
    input.addEventListener('input', () => {
        localStorage.setItem(input.name, input.value);
    });
});


form.addEventListener('submit', async (e) => {
    e.preventDefault(); 

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


function enableMobileStack() {
    const container = document.querySelector(".mobile-stack");
    if (!container) return;

    let photos = Array.from(container.querySelectorAll("img"));

    photos.forEach(img => {
        img.addEventListener("click", () => {
            let first = photos.shift();
            photos.push(first);

           
            photos.forEach((img, i) => {
                img.style.zIndex = photos.length - i;

              
            });
        });
    });
}


if (window.innerWidth <= 540) {
    enableMobileStack();
}

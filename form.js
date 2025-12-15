// const form = document.getElementById('survey-form');
// const inputs = form.querySelectorAll('input, select, textarea');
// const submitBtn = form.querySelector('button[type="submit"]');


// inputs.forEach(input => {
//     const savedValue = localStorage.getItem(input.name);
//     if (savedValue) {
//         input.value = savedValue;
//     }

    
//     input.addEventListener('input', () => {
//         localStorage.setItem(input.name, input.value);
//     });
// });


// form.addEventListener('submit', async (e) => {
//     e.preventDefault(); 

//     const formData = new FormData(form);

//     const originalText = submitBtn.textContent;
//     submitBtn.textContent = "Отправка...";
//     submitBtn.disabled = true;

//     try {
//         const response = await fetch("https://api.web3forms.com/submit", {
//             method: "POST",
//             body: formData
//         });

//         const data = await response.json();

//         if (response.ok) {
//             alert("Анкета отправлена! Спасибо!");
//             form.reset();

            
//             inputs.forEach(input => localStorage.removeItem(input.name));
//         } else {
//             alert("Ошибка: " + data.message);
//         }

//     } catch (error) {
//         alert("Что-то пошло не так. Попробуйте еще раз.");
//     } finally {
//         submitBtn.textContent = originalText;
//         submitBtn.disabled = false;
//     }
// });


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

const form = document.getElementById('survey-form');

document.querySelectorAll('.next-btn').forEach(button => {
    button.addEventListener('click', async () => {
        const currentPart = button.parentElement;
        const nextPartId = button.getAttribute('data-next');
        const nextPart = document.getElementById(nextPartId);

        const formData = new FormData();
        currentPart.querySelectorAll('input, textarea').forEach(input => {
            if(input.value.trim() !== '') {
                formData.append(input.name, input.value);
            }
        });
        formData.append('access_key', '046ab3ea-c2ac-4eee-a29d-da90b2750ab1');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                currentPart.style.display = 'none';
                nextPart.style.display = 'block';
            } else {
                console.log(result);
                alert('Ошибка при отправке, проверьте данные формы.');
            }
        } catch (error) {
            console.error(error);
            alert('Ошибка сети, попробуйте снова.');
        }
    });
});

// Последняя часть - submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const lastPart = document.getElementById('part3');

    const formData = new FormData();
    lastPart.querySelectorAll('input, textarea').forEach(input => {
        if(input.value.trim() !== '') {
            formData.append(input.name, input.value);
        }
    });
    formData.append('access_key', '046ab3ea-c2ac-4eee-a29d-da90b2750ab1');

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            document.getElementById('success-message').style.display = 'block';
            lastPart.querySelector('button[type="submit"]').style.display = 'none';
        } else {
            console.log(result);
            alert('Ошибка при отправке, попробуйте снова');
        }
    } catch (error) {
        console.error(error);
        alert('Ошибка сети, попробуйте снова');
    }
});

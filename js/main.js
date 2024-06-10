//desplazamiento del header
let nav = document.querySelector(".navbar");
window.onscroll = function () {
    if(document.documentElement.scrollTop > 20){
        nav.classList.add("header-scrolled");
    }else{
        nav.classList.remove("header-scrolled");
    }
} 

//ocultar los nav
let navBar = document.querySelectorAll(".nav-link");
let navCollapse = document.querySelector(".navbar-collapse.collapse");
navBar.forEach(function (a){
    a.addEventListener("click", function(){
        navCollapse.classList.remove("show");
    })
})

//animacion porcentaje barra
document.addEventListener('DOMContentLoaded', function() {
    const progressBars = document.querySelectorAll('.progress-bar-w > .progress-bar');

    const resetProgressBars = () => {
        progressBars.forEach(bar => {
            bar.style.width = '0';
        });
    };

    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const value = bar.getAttribute('aria-valuenow');
            bar.style.width = value + '%';
        });
    };

    resetProgressBars();

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => {
        observer.observe(bar);
    });

    window.addEventListener('beforeunload', resetProgressBars);
});

//animacion porcentaje circular
document.addEventListener('DOMContentLoaded', function() {
    function resetAnimations() {
        document.querySelectorAll('.circular-progress').forEach(circle => {
            circle.querySelector('.circle').style.strokeDasharray = '0, 100';
        });
    }

    function animateProgressBars() {
        document.querySelectorAll('.circular-progress').forEach(circle => {
            const percentage = circle.getAttribute('data-percentage');
            const radius = 15.9155;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (percentage / 100 * circumference);
            circle.querySelector('.circle').style.strokeDasharray = `${circumference - offset}, ${offset}`;
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
            }
        });
    }, observerOptions);

    document.querySelectorAll('.circular-progress').forEach(element => {
        observer.observe(element);
    });

    window.addEventListener('beforeunload', () => {
        resetAnimations();
    });

    resetAnimations();
});

//envio emails
const contactForm = document.getElementById('contact-form'), contactMessage = document.getElementById('c-message')
const sendEmail = (e) => {
    e.preventDefault()

    emailjs.sendForm('service_ci5do88', 'template_hio90od', '#contact-form', 'jkAMBRLQzDSi_Da3l')
        .then(() =>{
            contactMessage.textContent = 'Mensaje enviado con éxito ✅'
            
            setTimeout(() => {
                contactMessage.textContent = ''
            }, 3000)

            contactForm.reset()

        }, () =>{
            contactMessage.textContent = 'Mensaje no enviado (error de servicio) ❌'
        })
}

contactForm.addEventListener('submit', sendEmail)
/* MENU SHOW Y HIDDEN */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');


/* MENU SHOW */
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/* MENU HIDDEN */
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/* REMOVE MENU MOBILE */
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/* ACCORDION SKILLS */
const skillsContent = document.getElementsByClassName('skills__content');
const skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills() {
    let itemClass = this.parentNode.className;

    for (i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills__content skills__close';
    }

    if (itemClass === 'skills__content skills__close') {
        this.parentNode.className = 'skills__content skills__open';
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills);
});

/* QUALIFICATION TABS */
const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification__active');
        });
        target.classList.add('qualification__active')

        tabs.forEach(tab => {
            tab.classList.remove('qualification__active');
        });
        tab.classList.add('qualification__active');
    });
});

/* SERVICES MODAL */
const modalViews = document.querySelectorAll('.services__modal');
const modalBtns = document.querySelectorAll('.services__button');
const modalCloses = document.querySelectorAll('.services__modal-close');

let modal = function (modalClick) {
    modalViews[modalClick].classList.add('active-modal');
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i);
    });
});

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal');
        });
    });
});

/* PORTFOLIO SWIPER  */
var swiper = new Swiper(".portfolio__container", {
    cssMode: true,
    loop: true,

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

/* SHOW SCROLL UP */
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 560)
        scrollUp.classList.add('show-scroll');
    else
        scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);


/* CV ERROR MESSAGE */
document.addEventListener('DOMContentLoaded', function () {
    const downloadButton = document.getElementById('downloadButton');
    const errorMessage = document.getElementById('errorMessage');

    downloadButton.addEventListener('click', function (e) {
        e.preventDefault();
        errorMessage.style.display = 'block';

        // Set a timer to hide the error message after 3000 milliseconds (3 seconds)
        setTimeout(function () {
            errorMessage.style.display = 'none';
        }, 3000); // Adjust the time in milliseconds as needed
    });
});

/* CONTACT FORM SUBMISSION */
document.addEventListener('DOMContentLoaded', function () {
    console.log('JavaScript loaded'); // Check if JavaScript is loaded

    const submitButton = document.getElementById('submit-button');

    submitButton.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent the default link behavior

        console.log('Button clicked'); // Check if the button click event is triggered

        // Get the form input values
        const accessKey = document.querySelector('.contact__input[name="access_key"]').value;
        const name = document.querySelector('.contact__input[name="name"]').value;
        const email = document.querySelector('.contact__input[name="email"]').value;
        const project = document.querySelector('.contact__input[name="project"]').value;
        const message = document.querySelector('.contact__input[name="message"]').value;

        // Log the collected data
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Project:', project);
        console.log('Message:', message);

        // Create an object with the data to send to the API
        const formData = {
            access_key:accessKey,
            name: name,
            email: email,
            project: project,
            message: message,
        };

        // Send the data to the API endpoint using the fetch API
        fetch('https://api.web3forms.com/submit', {
            method: 'POST', // Use the appropriate HTTP method (POST)
            headers: {
                'Content-Type': 'application/json', // Specify the content type as JSON
                'access_key': '3b4b520f-990b-4021-83ec-83d18814c3e7',
            },
            body: JSON.stringify(formData), // Convert the data to JSON format
            mode: 'no-cors', // Set 'no-cors' mode

        })
         .then(response => {
            console.log('Response status code:', response.status); // Log the status code

                if (response.ok) {
                    return response.json(); // Parse the response data if needed
                } else {
                    throw new Error('Failed to submit the form data.');
                }
            })
            .then(data => {
                // Handle the API response data as needed
                console.log('API Response:', data);
            })
            .catch(error => {
                // Handle any errors that occurred during the API request
                console.error('API Error:', error);
            });

        document.getElementById('submit-form').reset();
    });
});

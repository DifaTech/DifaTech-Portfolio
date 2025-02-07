let sections = document.querySelectorAll('.section');
let currentSection = 'about'; // Default section
let animation = {
    about: {
        classIn :'animate__zoomIn',
        classOut :'animate__slideOutRight',
        moveDirection  : 'back'

    },
    skills: {
        classIn : 'animate__slideInLeft',
        classOut :'animate__zoomOut',
        moveDirection  : 'right'
    },
}
function changeSection(sectionId) {

    // Hide all sections
    sections.forEach(sec => sec.classList.add('hidden'));

    // Remove active class from all links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('text-amber-400');
    });

    // Add active class to the clicked link
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-amber-400');
        }
    });

    navigateToSection(sectionId);

}

document.addEventListener('DOMContentLoaded', () => {
    changeSection(currentSection);
});

function navigateToSection(sectionId){
    let previousSection = currentSection
    currentSection = sectionId;
    // Show the selected section
    let section = document.getElementById(sectionId);
    section.classList.remove('hidden');

    // Add Animate.css classes for the zoom-in effect
    section.classList.add('animate__animated', animation[sectionId].classIn);
    move(animation[sectionId].moveDirection)
    // Optionally scroll to the "About" section smoothly
    section.scrollIntoView({ behavior: 'smooth' });

    // Optionally remove the animation class after the animation completes
    section.addEventListener('animationend', () => {
        section.classList.remove(animation[sectionId].classIn);
    });

}



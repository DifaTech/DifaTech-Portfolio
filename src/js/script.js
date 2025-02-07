let sections = document.querySelectorAll('.section');
let currentSection = 'about'; // Default section

function changeSection(sectionId) {
    // Hide all sections
    sections.forEach(sec => sec.classList.add('hidden'));

    // Show the selected section
    document.getElementById(sectionId).classList.remove('hidden');

    currentSection = sectionId;
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
}

document.addEventListener('DOMContentLoaded', () => {
    changeSection(currentSection);
});

function checkIfInView() {
    const aboutSection = document.querySelector('.about');
    const sectionPosition = aboutSection.getBoundingClientRect();

    if (sectionPosition.top < window.innerHeight && sectionPosition.bottom >= 0) {
        aboutSection.classList.add('zoomed');
    } else {
        aboutSection.classList.remove('zoomed');
    }
}

// Listen for scroll events
window.addEventListener('scroll', checkIfInView);

// Run the function on page load in case it's already in view
checkIfInView();

move('back');
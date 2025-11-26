document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. NAVBAR SCROLL AND HAMBURGER TOGGLE ---

    const header = document.querySelector('.nav-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Scroll effect for header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Hamburger menu toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked (for mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // --- 2. HOME SECTION TEXT ANIMATION ---

    const changingTextContainer = document.querySelector('.changing-text');
    const words = ["Developer", "Designer", "Architect"]; // Words to cycle through
    let wordIndex = 0;

    function animateText() {
        if (!changingTextContainer) return;

        // Reset container content
        changingTextContainer.innerHTML = '';
        const currentWord = words[wordIndex];

        // Create the span for the word
        const wordSpan = document.createElement('span');
        wordSpan.classList.add('changing-text-word');
        wordSpan.textContent = currentWord;
        
        // Stagger the animation timing for the subsequent words
        if (wordIndex > 0) {
            wordSpan.style.animationDelay = `-${wordIndex * 2}s`; // Adjust start time for infinite loop
        }

        changingTextContainer.appendChild(wordSpan);

        // Move to the next word
        wordIndex = (wordIndex + 1) % words.length;

        // Re-run animation for the next word after one cycle completes (6s)
        setTimeout(animateText, 6000); 
    }

    // Initialize the animation cycle
    // We don't need a timeout here as the CSS animation handles the loop, 
    // but the word list needs to be built.
    if (changingTextContainer) {
         // Clear the placeholder "Architect" and start the animated sequence immediately
        changingTextContainer.innerHTML = '';
        words.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.classList.add('changing-text-word');
            wordSpan.textContent = word;
            // Calculate delay for staggered entry: 0s, 2s, 4s, 6s...
            wordSpan.style.animationDelay = `${index * 2}s`; 
            changingTextContainer.appendChild(wordSpan);
        });
    }


    // --- 3. SCROLL ANIMATION LOGIC (Intersection Observer) ---

    // Select all elements that need scroll animation
    const animatedElements = document.querySelectorAll(
        '.about-image, .about-text, .project-card'
    );

    // Define the observer options
    const observerOptions = {
        // Trigger point 50px up from the bottom of the viewport
        rootMargin: '0px 0px -50px 0px', 
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    // Define the observer callback function
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Handle Project Card Staggering
                if (element.classList.contains('project-card')) {
                    // Get the index of the current card to calculate delay
                    const index = Array.from(element.parentNode.children).indexOf(element);
                    // Apply a delay based on the index (0.2s, 0.4s, 0.6s, etc.)
                    element.style.animationDelay = `${index * 0.2}s`;
                }

                // Apply the animation class and remove the hidden class
                element.classList.remove('animate-hidden');
                element.classList.add('animate-show');

                // Stop observing the element once it has animated
                observer.unobserve(element);
            }
        });
    };

    // Create and start the observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each element
    animatedElements.forEach(element => {
        observer.observe(element);
    });

});

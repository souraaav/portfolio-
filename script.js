(function() {
    // --- Global Elements ---
    const btn = document.getElementById("themeToggle");
    const body = document.body;
    const yearEl = document.getElementById("year");
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const heroH1 = document.querySelector(".hero h1");
    const heroP = document.querySelector(".hero p");
    const heroCta = document.querySelector(".cta-button");
    const socialLinks = document.querySelector(".social-links");
    
    // --- Utility Icons (SVG for smooth morphing) ---
    // These paths are simple enough to be used directly in the JS
    const sunIcon = '<svg viewBox="0 0 24 24"><path d="M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-12c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1v2c0 .55.45 1 1 1zm0 20c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1v2c0 .55.45 1 1 1zm-9-9c0 .55-.45 1-1 1H2c-.55 0-1-.45-1-1s.45-1 1-1h2c.55 0 1 .45 1 1zm20 0c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1s.45-1 1-1h2c.55 0 1 .45 1 1zm-1.95-6.95c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-1.41 1.41c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41l1.41-1.41zM5.36 19.05c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-1.41 1.41c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41l1.41-1.41zm14.69 1.41c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-1.41 1.41c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41l1.41-1.41zM5.36 4.95c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L5.36 6.36c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41l1.41-1.41z"/></svg>';
    const moonIcon = '<svg viewBox="0 0 24 24"><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/></svg>';
    
    // Set current year in footer
    yearEl.textContent = new Date().getFullYear();

    // --- Theme Logic ---

    // Function to update the toggle button icon
    function updateToggleIcon() {
        const isDark = !body.classList.contains("light");
        btn.innerHTML = isDark ? sunIcon : moonIcon;
    }
    
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        body.classList.add("light");
    } else {
        // Default to dark
        body.classList.remove("light");
    }
    updateToggleIcon();

    // Toggle logic on click
    btn.addEventListener("click", () => {
        // Add a temporary class to trigger a quick, subtle transition/animation
        btn.classList.add('animate-toggle');
        
        // After a brief delay, toggle theme and remove class
        setTimeout(() => {
            body.classList.toggle("light");
            const isLight = body.classList.contains("light");
            localStorage.setItem("theme", isLight ? "light" : "dark");
            updateToggleIcon();
            btn.classList.remove('animate-toggle');
        }, 50); // Small delay for visual feedback
    });


    // --- Hero Entrance Animation (Staggered Fade-In) ---
    function runHeroAnimation() {
        // Initialize state (CSS handles this, but explicitly set opacity 0 for safety)
        heroH1.style.opacity = 0;
        heroP.style.opacity = 0;
        heroCta.style.opacity = 0;
        socialLinks.style.opacity = 0;

        // Apply transitions after setting initial state
        const transitionStyle = 'opacity 1s ease-out, transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        setTimeout(() => {
            heroH1.style.transition = transitionStyle;
            heroH1.style.opacity = 1;
            heroH1.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                heroP.style.transition = transitionStyle;
                heroP.style.opacity = 1;
                heroP.style.transform = 'translateY(0)';

                setTimeout(() => {
                    heroCta.style.transition = transitionStyle;
                    heroCta.style.opacity = 1;
                    heroCta.style.transform = 'translateY(0)';
                    
                    setTimeout(() => {
                        socialLinks.style.transition = transitionStyle;
                        socialLinks.style.opacity = 1;
                        socialLinks.style.transform = 'translateY(0)';
                    }, 200);

                }, 200);

            }, 200);
            
        }, 100);
    }
    
    // Run the Hero animation on load
    runHeroAnimation();


    // --- Scroll Reveal Logic for ALL Cards and Sections ---
    const revealElements = document.querySelectorAll(".card-item, .about-text");

    // Staggered delay for scroll reveal animation
    revealElements.forEach((el, index) => {
        // Apply the staggering delay only to the elements
        el.style.transitionDelay = `${index * 90}ms`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal");
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the item is visible
        rootMargin: "0px 0px -60px 0px" // Start trigger a bit earlier
    });

    revealElements.forEach(el => observer.observe(el));

    // --- Contact Form Handling ---
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent actual form submission

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Display a success message
        formMessage.textContent = `Thank you, ${name}! Your message has been noted. (In a real app, this would be sent to a server.)`;
        formMessage.style.color = 'var(--accent-color)';
        formMessage.style.opacity = 1;

        // Reset the form
        contactForm.reset();

        // Clear message after a few seconds with a fade-out
        setTimeout(() => {
            formMessage.style.opacity = 0;
            setTimeout(() => {
                formMessage.textContent = '';
            }, 300); // Wait for fade-out transition
        }, 5000);
    });

})();
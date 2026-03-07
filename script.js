(function() {
    const btn = document.getElementById("themeToggle");
    const body = document.body;
    const yearEl = document.getElementById("year");
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const heroH1 = document.querySelector(".hero h1");
    const heroP = document.querySelector(".hero p");
    const heroCta = document.querySelector(".cta-button");
    const socialLinks = document.querySelector(".social-links");
    const sunIcon = '<svg viewBox="0 0 24 24"><path d="M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-12c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1v2c0 .55.45 1 1 1zm0 20c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1v2c0 .55.45 1 1 1zm-9-9c0 .55-.45 1-1 1H2c-.55 0-1-.45-1-1s.45-1 1-1h2c.55 0 1 .45 1 1zm20 0c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1s.45-1 1-1h2c.55 0 1 .45 1 1zm-1.95-6.95c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-1.41 1.41c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41l1.41-1.41zM5.36 19.05c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-1.41 1.41c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41l1.41-1.41zM5.36 4.95c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L5.36 6.36c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41l1.41-1.41z"/></svg>';
    const moonIcon = '<svg viewBox="0 0 24 24"><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/></svg>';

    yearEl.textContent = new Date().getFullYear();

    function updateToggleIcon() {
        const isDark = !body.classList.contains("light");
        btn.innerHTML = isDark ? sunIcon : moonIcon;
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        body.classList.add("light");
    } else {
        body.classList.remove("light");
    }
    updateToggleIcon();

    btn.addEventListener("click", () => {
        btn.classList.add('animate-toggle');

        setTimeout(() => {
            body.classList.toggle("light");
            const isLight = body.classList.contains("light");
            localStorage.setItem("theme", isLight ? "light" : "dark");
            updateToggleIcon();
            btn.classList.remove('animate-toggle');
        }, 50);
    });

    function runHeroAnimation() {
        heroH1.style.opacity = 0;
        heroP.style.opacity = 0;
        heroCta.style.opacity = 0;
        socialLinks.style.opacity = 0;

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

    runHeroAnimation();

    const revealElements = document.querySelectorAll(".card-item, .about-text");

    revealElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 90}ms`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal");
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1, 
        rootMargin: "0px 0px -60px 0px"
    });

    revealElements.forEach(el => observer.observe(el));

    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault(); 
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        try {
            // Send email via EmailJS
            await emailjs.send('service_55eiod2', 'template_hbg5gmp', {
                from_name: name,
                from_email: email,
                message: message,
                to_email: 'sujitc079@gmail.com'  // Replace with your Gmail address
            });

            // Optionally, still save to Firestore
            const docRef = await window.addDoc(window.collection(window.db, "contacts"), {
                name: name,
                email: email,
                message: message,
                timestamp: new Date()
            });
            console.log("Document written with ID: ", docRef.id);

            formMessage.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
            formMessage.style.color = 'var(--accent-color)';
            formMessage.style.opacity = 1;
            contactForm.reset();
        } catch (error) {
            console.error("Error: ", error);
            formMessage.textContent = 'Oops! There was a problem sending your message. Please try again.';
            formMessage.style.color = '#ff6b6b';
            formMessage.style.opacity = 1;
        } finally {
            setTimeout(() => {
                formMessage.style.opacity = 0;
                setTimeout(() => {
                    formMessage.textContent = '';
                }, 300);
            }, 5000);
        }
    });
})();
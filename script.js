document.addEventListener('DOMContentLoaded', function() {
    // Loader
    const loader = document.querySelector('.loader');
    
    // Hide loader after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('loader-hidden');
            // Remove loader from DOM after animation completes
            loader.addEventListener('transitionend', function() {
                document.body.removeChild(loader);
            });
        }, 1500);
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.navbar-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinkItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinkItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.querySelector('.skills');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
            bar.style.width = width;
        });
    }
    
    // Intersection Observer for skill bars animation
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(skillsSection);

    // CV Download button
    const downloadCvBtn = document.getElementById('download-cv');
    downloadCvBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // In a real implementation, this would link to your actual CV file
        alert('CV download would start here in a real implementation.');
        // window.location.href = 'path-to-your-cv.pdf';
    });

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Nav link animation
    const animation = document.querySelector('.animation');
    const navLinksContainer = document.querySelector('.navbar-links');
    
    navLinkItems.forEach(link => {
        link.addEventListener('mouseover', function() {
            const linkWidth = this.offsetWidth;
            const linkPosition = this.offsetLeft;
            animation.style.width = `${linkWidth}px`;
            animation.style.left = `${linkPosition}px`;
        });
    });
    
    navLinksContainer.addEventListener('mouseleave', function() {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            const linkWidth = activeLink.offsetWidth;
            const linkPosition = activeLink.offsetLeft;
            animation.style.width = `${linkWidth}px`;
            animation.style.left = `${linkPosition}px`;
        } else {
            animation.style.width = '0';
        }
    });

    // Initialize animation for active link on page load
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
        const linkWidth = activeLink.offsetWidth;
        const linkPosition = activeLink.offsetLeft;
        animation.style.width = `${linkWidth}px`;
        animation.style.left = `${linkPosition}px`;
    }
});
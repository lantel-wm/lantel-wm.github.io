// script.js
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null, // 观察整个视口
        rootMargin: '-20% 0px -80% 0px', // 顶部20%和底部80%作为判断区域
        threshold: 0 // 只要有一点点交叉就触发
    };

    const observer = new IntersectionObserver((entries) => {
        let currentActiveSectionId = null;

        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];
            if (entry.isIntersecting) {
                if (!currentActiveSectionId || entry.boundingClientRect.top <= 0) {
                    currentActiveSectionId = entry.target.id;
                    if (entry.intersectionRatio > 0.5 || entry.boundingClientRect.top >= 0) {
                        break;
                    }
                }
            }
        }

        if (!currentActiveSectionId && window.scrollY < sections[0].offsetTop + sections[0].offsetHeight / 2) {
            currentActiveSectionId = sections[0].id;
        } else if (!currentActiveSectionId) {
            const lastSection = sections[sections.length - 1];
            if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 50) {
                currentActiveSectionId = lastSection.id;
            }
        }

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref && linkHref.substring(1) === currentActiveSectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    const initialCheck = () => {
        let initialActiveSectionId = sections[0].id;
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.top <= window.innerHeight / 3) {
                initialActiveSectionId = section.id;
                break;
            } else if (rect.top < 0 && rect.bottom > 0) {
                initialActiveSectionId = section.id;
            }
        }

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref && linkHref.substring(1) === initialActiveSectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    window.addEventListener('load', initialCheck);
});
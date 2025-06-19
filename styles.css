document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Preloader-ის ლოგიკა (განახლებული) ---
    const preloader = document.getElementById('preloader');
    const siteWrapper = document.getElementById('site-wrapper');
    const startTime = Date.now();
    const minDisplayTime = 3000; // 3 წამი

    // ფუნქცია, რომელიც მალავს Preloader-ს
    function hidePreloader() {
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                preloader.style.display = 'none';
                if (siteWrapper) {
                    siteWrapper.classList.add('visible');
                }
            }, 500);
        }
    }

    // ვამოწმებთ, ხომ არ გვინახავს Preloader-ი ამ სესიაში
    if (sessionStorage.getItem('preloaderShown')) {
        // თუ უკვე ნანახი გვაქვს, მაშინვე ვმალავთ
        if (preloader) preloader.style.display = 'none';
        if (siteWrapper) siteWrapper.classList.add('visible');
    } else {
        // თუ პირველად ვხსნით, ვიწყებთ ჩატვირთვის პროცესს
        window.addEventListener('load', function() {
            const endTime = Date.now();
            const elapsedTime = endTime - startTime;
            const remainingTime = minDisplayTime - elapsedTime;
            const delay = remainingTime > 0 ? remainingTime : 0;

            setTimeout(function() {
                hidePreloader();
                // ვიმახსოვრებთ, რომ ამ სესიაში Preloader-ი უკვე ვაჩვენეთ
                sessionStorage.setItem('preloaderShown', 'true');
            }, delay);
        });
    }

    // --- 2. დინამიური ჰედერისა და "Back to Top" ღილაკის ლოგიკა (უცვლელი) ---
    const header = document.querySelector('.site-header');
    const backToTopButton = document.getElementById('back-to-top');

    if(header && backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            if (window.scrollY > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });

        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

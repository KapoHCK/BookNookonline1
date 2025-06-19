document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Preloader-ის ლოგიკა ---
    const preloader = document.getElementById('preloader');
    const siteWrapper = document.getElementById('site-wrapper');
    const startTime = Date.now();
    const minDisplayTime = 3000; // 3 წამი

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

    if (sessionStorage.getItem('preloaderShown')) {
        if (preloader) preloader.style.display = 'none';
        if (siteWrapper) siteWrapper.classList.add('visible');
    } else {
        window.addEventListener('load', function() {
            const endTime = Date.now();
            const elapsedTime = endTime - startTime;
            const remainingTime = Math.max(0, minDisplayTime - elapsedTime); // Use Math.max to ensure non-negative delay

            setTimeout(function() {
                hidePreloader();
                sessionStorage.setItem('preloaderShown', 'true');
            }, delay);
        });
    }

    // --- 2. დინამიური ჰედერისა და "Back to Top" ღილაკის ლოგიკა ---
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

    // --- 3. Book Preview Modal ლოგიკა (ახალი, ინტეგრირებული) ---
    const bookPreviewModal = document.getElementById('bookPreviewModal');
    // შეამოწმეთ არსებობს თუ არა მოდალი, სანამ მის ელემენტებს ვეძებთ
    if (bookPreviewModal) { 
        const closeModalButton = bookPreviewModal.querySelector('.close-button');
        const modalBookCover = document.getElementById('modalBookCover');
        const modalBookTitle = document.getElementById('modalBookTitle');
        const modalBookAuthor = document.getElementById('modalBookAuthor');
        const bookPreviewPagesContainer = bookPreviewModal.querySelector('.book-preview-pages');
        const prevPageBtn = document.getElementById('prevPageBtn');
        const nextPageBtn = document.getElementById('nextPageBtn');
        const pageCounter = document.getElementById('pageCounter');
        let currentPage = 0;
        let totalPages = 0;
        let currentBookPages = []; 

        function openBookPreview(bookData) {
            modalBookCover.src = bookData.cover;
            modalBookTitle.textContent = bookData.title;
            modalBookAuthor.textContent = bookData.author;

            bookPreviewPagesContainer.innerHTML = ''; 
            currentBookPages = bookData.pages;
            totalPages = currentBookPages.length;

            currentBookPages.forEach((pageText, index) => {
                const pageDiv = document.createElement('div');
                pageDiv.classList.add('page-content');
                pageDiv.id = `page${index + 1}`;
                pageDiv.innerHTML = pageText; 
                bookPreviewPagesContainer.appendChild(pageDiv);
            });

            currentPage = 0; 
            showPage(currentPage);

            bookPreviewModal.classList.add('active'); 
            document.body.style.overflow = 'hidden'; 
        }

        function showPage(index) {
            const pages = bookPreviewPagesContainer.querySelectorAll('.page-content');
            pages.forEach((page, i) => {
                page.classList.remove('active-page');
                page.style.animation = 'none';
                page.offsetHeight; 
            });

            if (pages[index]) {
                pages[index].classList.add('active-page');
                pages[index].style.animation = 'pageFlipIn 0.5s ease-out'; 
            }
            
            prevPageBtn.disabled = index === 0;
            nextPageBtn.disabled = index === totalPages - 1;
            pageCounter.textContent = `${index + 1} / ${totalPages}`;
        }

        function closeBookPreview() {
            bookPreviewModal.classList.remove('active'); 
            document.body.style.overflow = ''; 
        }

        closeModalButton.addEventListener('click', closeBookPreview);

        window.addEventListener('click', function(event) {
            if (event.target === bookPreviewModal) {
                closeBookPreview();
            }
        });

        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 0) {
                currentPage--;
                showPage(currentPage);
            }
        });

        nextPageBtn.addEventListener('click', function() {
            if (currentPage < totalPages - 1) {
                currentPage++;
                showPage(currentPage);
            }
        });

        // --- 4. წიგნის ბარათებზე დაკლიკების ლოგიკა ---
        const bookCardLinks = document.querySelectorAll('.book-card-link');

        const bookDataExample = {
            title: 'როგორ ვიმუშაოთ საკუთარ თავზე',
            author: 'ანა მორჩილაძე',
            cover: 'images/rogror_vimushaot.png', 
            pages: [
                `<h3>წინასიტყვაობა</h3><p>ეს არის გულწრფელი და პრაქტიკული სახელმძღვანელო ყველასთვის, ვისაც სურს შეწყვიტოს ერთ ადგილზე დგომა და დაიწყოს რეალური ზრდა. ის გასწავლით, თუ როგორ გადააქციოთ საკუთარი თავი თქვენი ცხოვრების მთავარ პროექტად.</p><p>დამატებითი ტექსტი წინასიტყვაობიდან, რომელიც განმარტავს წიგნის მნიშვნელობას და მის სარგებელს მკითხველისთვის. წინასიტყვაობა ხშირად შეიცავს ავტორის პირად ხედვას ან წიგნის შექმნის ისტორიას.</p>`,
                `<h3>თავი 1: გაცნობა</h3><p>ეს არის წიგნის პირველი გვერდის ამონარიდი. აქ დაიწყება ძირითადი თხრობა ან თემის განხილვა. მკითხველი გაეცნობა პირველ კონცეფციებს ან პერსონაჟებს, რომლებიც წიგნში გამოჩნდება.</p><p>დამატებითი ტექსტი პირველი თავიდან, რომელიც ავითარებს საწყის იდეებს და ნელ-ნელა ჩაითრევს მკითხველს წიგნის სამყაროში. გვერდების გადაფურცვლის ანიმაცია აქტიურდება.</p>`,
            ]
        };

        bookCardLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault(); 
                openBookPreview(bookDataExample);
            });
        });
    } // End if (bookPreviewModal) check
}); // DOMContentLoaded end

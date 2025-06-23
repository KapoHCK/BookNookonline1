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
            }, 500); // CSS transition duration for fade-out
        }
    }

    if (sessionStorage.getItem('preloaderShown')) {
        if (preloader) preloader.style.display = 'none';
        if (siteWrapper) siteWrapper.classList.add('visible');
    } else {
        window.addEventListener('load', function() {
            const endTime = Date.now();
            const elapsedTime = endTime - startTime;
            const delay = Math.max(0, minDisplayTime - elapsedTime); 

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

    // --- 3. Book Preview Modal ლოგიკა ---
    const bookPreviewModal = document.getElementById('bookPreviewModal');
    let currentPage = 0;
    let totalPages = 0;
    let currentBookPages = []; 

    // თუ მოდალი HTML-ში არსებობს (რადგან ის rogor-vimushaot-sakutar-tavze.html-ზე გვჭირდება)
    if (bookPreviewModal) { 
        const closeModalButton = bookPreviewModal.querySelector('.close-button');
        const modalBookCover = document.getElementById('modalBookCover');
        const modalBookTitle = document.getElementById('modalBookTitle');
        const modalBookAuthor = document.getElementById('modalBookAuthor');
        const bookPreviewPagesContainer = bookPreviewModal.querySelector('.book-preview-pages');
        const prevPageBtn = document.getElementById('prevPageBtn');
        const nextPageBtn = document.getElementById('nextPageBtn');
        const pageCounter = document.getElementById('pageCounter');

        // ფუნქცია, რომელიც აჩვენებს მოდალს
        function openBookPreview(bookData) {
            modalBookCover.src = bookData.cover;
            modalBookTitle.textContent = bookData.title;
            modalBookAuthor.textContent = bookData.author;

            bookPreviewPagesContainer.innerHTML = ''; // ვასუფთავებთ ძველ გვერდებს
            currentBookPages = bookData.pages;
            totalPages = currentBookPages.length;

            currentBookPages.forEach((pageText, index) => {
                const pageDiv = document.createElement('div');
                pageDiv.classList.add('page-content');
                pageDiv.id = `modal-page-${index + 1}`; // ID changed for clarity and consistency
                pageDiv.innerHTML = pageText; 
                bookPreviewPagesContainer.appendChild(pageDiv);
            });

            currentPage = 0; 
            showPage(currentPage);

            bookPreviewModal.classList.add('active'); 
            document.body.style.overflow = 'hidden'; 
        }

        // ფუნქცია, რომელიც აჩვენებს კონკრეტულ გვერდს
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

        // ფუნქცია, რომელიც ხურავს მოდალს
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
    } // End if (bookPreviewModal) check


    // --- 5. "ამონარიდის ნახვა" ღილაკის ლოგიკა (rogor-vimushaot-sakutar-tavze.html-ზე) ---
    const openPreviewModalBtn = document.getElementById('openPreviewModalBtn');

    if (openPreviewModalBtn && bookPreviewModal) { // ვამოწმებთ, რომ ღილაკი და მოდალი არსებობს
        // ეს bookDataForThisPage ობიექტი უნდა შეავსოთ კონკრეტული წიგნის მონაცემებით.
        // ამ მაგალითისთვის ვიყენებთ "როგორ ვიმუშაოთ საკუთარ თავზე" მონაცემებს.
        const bookDataForThisPage = {
            title: 'როგორ ვიმუშაოთ საკუთარ თავზე',
            author: 'ანა მორჩილაძე',
            cover: 'images/rogror_vimushaot.png', // ყდის სურათი
            pages: [
                // წინასიტყვაობა
                `<h3>წინასიტყვაობა</h3><p>ეს არის გულწრფელი და პრაქტიკული სახელმძღვანელო ყველასთვის, ვისაც სურს შეწყვიტოს ერთ ადგილზე დგომა და დაიწყოს რეალური ზრდა. ის გასწავლით, თუ როგორ გადააქციოთ საკუთარი თავი თქვენი ცხოვრების მთავარ პროექტად.</p><p>დამატებითი ტექსტი წინასიტყვაობიდან, რომელიც განმარტავს წიგნის მნიშვნელობას და მის სარგებელს მკითხველისთვის. წინასიტყვაობა ხშირად შეიცავს ავტორის პირად ხედვას ან წიგნის შექმნის ისტორიას.</p>`,
                // გვერდი 1
                `<h3>თავი 1: გაცნობა</h3><p>ეს არის წიგნის პირველი გვერდის ამონარიდი. აქ დაიწყება ძირითადი თხრობა ან თემის განხილვა. მკითხველი გაეცნობა პირველ კონცეფციებს ან პერსონაჟებს, რომლებიც წიგნში გამოჩნდება.</p><p>დამატებითი ტექსტი პირველი თავიდან, რომელიც ავითარებს საწყის იდეებს და ნელ-ნელა ჩაითრევს მკითხველს წიგნის სამყაროში. გვერდების გადაფურცვლის ანიმაცია აქტიურდება.</p>`,
                // შეგიძლიათ დაამატოთ მეტი გვერდი აქ:
                // `<h3>თავი 1: გვერდი 2</h3><p>კიდევ ერთი გვერდის ტექსტი...</p>`,
                // `<h3>დასკვნა</h3><p>მოკლე დასკვნა ან ეპილოგი...</p>`
            ]
        };

        openPreviewModalBtn.addEventListener('click', function(e) {
            e.preventDefault(); 
            openBookPreview(bookDataForThisPage);
        });
    }

}); // DOMContentLoaded end

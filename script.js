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


document.addEventListener('DOMContentLoaded', function() {
    // ... (არსებული Preloader და Header/Back to Top ლოგიკა) ...

    // --- 3. Book Preview Modal ლოგიკა ---
    const bookPreviewModal = document.getElementById('bookPreviewModal');
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
    let currentBookPages = []; // აქ შევინახავთ კონკრეტული წიგნის გვერდებს

    // ფუნქცია, რომელიც აჩვენებს მოდალს
    function openBookPreview(bookData) {
        modalBookCover.src = bookData.cover;
        modalBookTitle.textContent = bookData.title;
        modalBookAuthor.textContent = bookData.author;

        // გვერდების დინამიური ჩატვირთვა
        bookPreviewPagesContainer.innerHTML = ''; // ვასუფთავებთ ძველ გვერდებს
        currentBookPages = bookData.pages;
        totalPages = currentBookPages.length;

        currentBookPages.forEach((pageText, index) => {
            const pageDiv = document.createElement('div');
            pageDiv.classList.add('page-content');
            pageDiv.id = `page${index + 1}`;
            pageDiv.innerHTML = pageText; // გვერდის HTML კონტენტი

            bookPreviewPagesContainer.appendChild(pageDiv);
        });

        currentPage = 0; // ვიწყებთ პირველი გვერდიდან
        showPage(currentPage);

        bookPreviewModal.classList.add('active'); // მოდალის გამოჩენა
        document.body.style.overflow = 'hidden'; // გვერდის სქროლვის დაბლოკვა
    }

    // ფუნქცია, რომელიც აჩვენებს კონკრეტულ გვერდს
    function showPage(index) {
        const pages = bookPreviewPagesContainer.querySelectorAll('.page-content');
        pages.forEach((page, i) => {
            page.classList.remove('active-page');
            // გვერდის "გადაფურცვლის" ანიმაციის წაშლა ყოველი გვერდის შეცვლაზე
            page.style.animation = 'none';
            page.offsetHeight; // force reflow
        });

        if (pages[index]) {
            pages[index].classList.add('active-page');
            pages[index].style.animation = 'pageFlipIn 0.5s ease-out'; // ანიმაციის ხელახლა დამატება
        }
        
        // ღილაკების აქტივაცია/დეაქტივაცია
        prevPageBtn.disabled = index === 0;
        nextPageBtn.disabled = index === totalPages - 1;
        pageCounter.textContent = `${index + 1} / ${totalPages}`;
    }

    // ფუნქცია, რომელიც ხურავს მოდალს
    function closeBookPreview() {
        bookPreviewModal.classList.remove('active'); // მოდალის დამალვა
        document.body.style.overflow = ''; // გვერდის სქროლვის აღდგენა
    }

    // ღილაკზე დახურვა
    closeModalButton.addEventListener('click', closeBookPreview);

    // მოდალის გარეთ დაკლიკებით დახურვა
    window.addEventListener('click', function(event) {
        if (event.target === bookPreviewModal) {
            closeBookPreview();
        }
    });

    // გვერდებს შორის ნავიგაცია
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
    // ეს არის მაგალითი! თქვენ დაგჭირდებათ მეტი bookData ობიექტი
    // თითოეული წიგნისთვის.

    // ვპოულობთ ყველა წიგნის ბარათს
    const bookCardLinks = document.querySelectorAll('.book-card-link');

    // მაგალითი: წიგნის მონაცემები (ეს უნდა მოიტანოთ სერვერიდან ან JSON ფაილიდან რეალურ პროექტში)
    const bookDataExample = {
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

    bookCardLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // არ გადახვიდეს rogor-vimushaot-sakutar-tavze.html გვერდზე
            
            // ამ წიგნის მონაცემები აქ უნდა იყოს რეალურად დინამიურად მოტანილი
            // (მაგ. data-attributes-დან ან ობიექტიდან ID-ით)
            // ამ მაგალითისთვის პირდაპირ bookDataExample-ს ვიყენებ
            openBookPreview(bookDataExample);
        });
    });

}); // DOMContentLoaded end

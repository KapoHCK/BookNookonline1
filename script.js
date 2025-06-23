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

    // --- Book Data (ყველა წიგნის მონაცემი ერთ ადგილას) ---
    // აქ შეგიძლიათ დაამატოთ თქვენი სხვა წიგნების მონაცემები
    const allBooksData = {
        'rogor-vimushaot-sakutar-tavze': {
            id: 'rogor-vimushaot-sakutar-tavze',
            title: 'როგორ ვიმუშაოთ საკუთარ თავზე',
            author: 'ანა მორჩილაძე',
            cover: 'images/rogror_vimushaot.png', // ყდის სურათი
            price: '12 ₾',
            description: `
                <p>ეს არის გულწრფელი და პრაქტიკული სახელმძღვანელო ყველასთვის, ვისაც სურს შეწყვიტოს ერთ ადგილზე დგომა და დაიწყოს რეალური ზრდა. ის გასწავლით, თუ როგორ გადააქციოთ საკუთარი თავი თქვენი ცხოვრების მთავარ პროექტად.</p>
                <p>თქვენ შეისწავლით მეთოდებს, რომლებიც დაგეხმარებათ ააშენოთ თავდაჯერებულობა, გაიმყაროთ ნებისყოფა და მოიპოვოთ კონტროლი საკუთარ ბედზე.</p>
            `,
            pages: [
                `<h3>წინასიტყვაობა</h3><p>ეს არის გულწრფელი და პრაქტიკული სახელმძღვანელო ყველასთვის, ვისაც სურს შეწყვიტოს ერთ ადგილზე დგომა და დაიწყოს რეალური ზრდა. ის გასწავლით, თუ როგორ გადააქციოთ საკუთარი თავი თქვენი ცხოვრების მთავარ პროექტად.</p><p>დამატებითი ტექსტი წინასიტყვაობიდან, რომელიც განმარტავს წიგნის მნიშვნელობას და მის სარგებელს მკითხველისთვის. წინასიტყვაობა ხშირად შეიცავს ავტორის პირად ხედვას ან წიგნის შექმნის ისტორიას.</p>`,
                `<h3>თავი 1: გაცნობა</h3><p>ეს არის წიგნის პირველი გვერდის ამონარიდი. აქ დაიწყება ძირითადი თხრობა ან თემის განხილვა. მკითხველი გაეცნობა პირველ კონცეფციებს ან პერსონაჟებს, რომლებიც წიგნში გამოჩნდება.</p><p>დამატებითი ტექსტი პირველი თავიდან, რომელიც ავითარებს საწყის იდეებს და ნელ-ნელა ჩაითრევს მკითხველს წიგნის სამყაროში. გვერდების გადაფურცვლის ანიმაცია აქტიურდება.</p>`,
                // შეგიძლიათ დაამატოთ მეტი გვერდი აქ:
                // `<h3>თავი 1: გვერდი 2</h3><p>კიდევ ერთი გვერდის ტექსტი...</p>`,
                // `<h3>დასკვნა</h3><p>მოკლე დასკვნა ან ეპილოგი...</p>`
            ]
        },
        // აქ შეგიძლიათ დაამატოთ სხვა წიგნები:
        'sxva-cigni': {
            id: 'sxva-cigni',
            title: 'სხვა წიგნი - მაგალითი',
            author: 'სხვა ავტორი',
            cover: 'images/rogror_vimushaot.png', // შეგიძლიათ შეცვალოთ სხვა სურათით
            price: '15 ₾',
            description: `<p>ეს არის მეორე წიგნის აღწერა. ის ასევე დაგეხმარებათ პიროვნულ განვითარებაში.</p><p>წაიკითხეთ ამონარიდი, რათა გაიგოთ მეტი.</p>`,
            pages: [
                `<h3>ახალი წიგნის შესავალი</h3><p>ეს არის ახალი წიგნის შესავალი გვერდი.</p>`,
                `<h3>თავი 2: ძირითადი იდეები</h3><p>ეს არის მეორე წიგნის პირველი თავის ამონარიდი.</p>`
            ]
        }
    };


    // --- Book Preview Modal ლოგიკა (ცენტრალიზებული) ---
    const bookPreviewModal = document.getElementById('bookPreviewModal');
    let currentPage = 0;
    let totalPages = 0;
    let currentBookPages = []; 

    if (bookPreviewModal) { 
        const closeModalButton = bookPreviewModal.querySelector('.close-button');
        const modalBookCover = document.getElementById('modalBookCover');
        const modalBookTitle = document.getElementById('modalBookTitle');
        const modalBookAuthor = document.getElementById('modalBookAuthor');
        const bookPreviewPagesContainer = bookPreviewModal.querySelector('.book-preview-pages');
        const prevPageBtn = document.getElementById('prevPageBtn');
        const nextPageBtn = document.getElementById('nextPageBtn');
        const pageCounter = document.getElementById('pageCounter');

        function openBookPreview(bookId) { // ახლა იღებს bookId-ს
            const bookData = allBooksData[bookId]; // ვიღებთ მონაცემებს allBooksData-დან
            if (!bookData) {
                console.error('Book data not found for ID:', bookId);
                return;
            }

            modalBookCover.src = bookData.cover;
            modalBookTitle.textContent = bookData.title;
            modalBookAuthor.textContent = bookData.author;

            bookPreviewPagesContainer.innerHTML = ''; 
            currentBookPages = bookData.pages;
            totalPages = currentBookPages.length;

            currentBookPages.forEach((pageText, index) => {
                const pageDiv = document.createElement('div');
                pageDiv.classList.add('page-content');
                pageDiv.id = `modal-page-${index + 1}`; 
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
    } // End if (bookPreviewModal) check

    // --- Index.html გვერდის ლოგიკა ---
    // Book Card Links (არ ხსნის მოდალს, გადადის დეტალურ გვერდზე)
    const bookCardLinks = document.querySelectorAll('.book-card-link');
    bookCardLinks.forEach(link => {
        // არ ვამატებთ e.preventDefault() აქ, რადგან გვინდა, რომ ლინკმა გვერდზე გადაგვიყვანოს
        // HTML-ში href="rogor-vimushaot-sakutar-tavze.html" უნდა იყოს.
        // თუ book-card-link-ს ექნება data-book-id ატრიბუტი, შეგვიძლია მომავალში გამოვიყენოთ.
    });


    // --- rogor-vimushaot-sakutar-tavze.html გვერდის ლოგიკა ---
    const openPreviewModalBtn = document.getElementById('openPreviewModalBtn');

    if (openPreviewModalBtn && bookPreviewModal) { // ვამოწმებთ, რომ ღილაკი და მოდალი არსებობს
        openPreviewModalBtn.addEventListener('click', function(e) {
            e.preventDefault(); 
            openBookPreview('rogor-vimushaot-sakutar-tavze'); // გადავცემთ წიგნის ID-ს
        });
    }

    // --- books.html გვერდის ლოგიკა (ახალი) ---
    const booksListPage = document.getElementById('books-list');

    function loadBooksPage() {
        if (booksListPage) { // ვამოწმებთ, რომ books-list ელემენტი არსებობს ამ გვერდზე
            booksListPage.innerHTML = ''; // ვასუფთავებთ კონტეინერს

            // ციკლი ყველა წიგნზე allBooksData ობიექტიდან
            for (const bookId in allBooksData) {
                const book = allBooksData[bookId];

                // ვაშენებთ HTML-ს თითოეული წიგნისთვის
                // ეს HTML არის "ბარათის" სტილის, როგორც index.html-ზე
                const bookCardHtml = `
                    <a href="rogor-vimushaot-sakutar-tavze.html?bookid=${book.id}" class="book-card-link book-list-card" data-aos="fade-up">
                        <div class="book-card">
                            <img src="${book.cover}" alt="${book.title}" class="book-cover">
                            <div class="book-info">
                                <h3 class="book-title">${book.title}</h3>
                                <p class="book-author">${book.author}</p>
                            </div>
                        </div>
                    </a>
                `;
                booksListPage.innerHTML += bookCardHtml;
            }
            // AOS-ის ხელახალი ინიციალიზაცია ახალი ელემენტებისთვის, თუ გამოიყენება
            if (typeof AOS !== 'undefined') {
                AOS.refreshHard(); 
            }
        }
    }
    
    // --- rogor-vimushaot-sakutar-tavze.html გვერდის კონტენტის დინამიური ჩატვირთვა ---
    const bookDetailPageWrapper = document.querySelector('.book-detail-wrapper');
    if (bookDetailPageWrapper && window.location.pathname.includes('rogor-vimushaot-sakutar-tavze.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const bookId = urlParams.get('bookid') || 'rogor-vimushaot-sakutar-tavze'; // თუ bookid არ არის, ნაგულისხმევად აჩვენებს "როგორ ვიმუშაოთ საკუთარ თავზე"

        const book = allBooksData[bookId];
        if (book) {
            bookDetailPageWrapper.innerHTML = `
                <div class="book-image-column">
                    <img src="${book.cover}" alt="${book.title}">
                </div>
                <div class="book-content-column">
                    <p class="book-byline">${book.author}</p>
                    <h1 class="book-main-title">${book.title}</h1>
                    <div class="book-full-description">
                        ${book.description}
                    </div>
                    
                    <div class="purchase-box">
                        <div class="price-tag">${book.price}</div>
                        <a href="https://www.facebook.com/profile.php?id=61562893725953" class="purchase-button" target="_blank">Facebook-ზე დაკავშირება</a>
                    </div>

                    <button id="openPreviewModalBtn" class="hero-button preview-button" data-book-id="${book.id}">ამონარიდის ნახვა</button>

                    <a href="index.html" class="back-to-catalog">← კატალოგში დაბრუნება</a> 
                </div>
            `;
            // ხელახლა ვეძებთ ღილაკს დინამიურად ჩატვირთვის შემდეგ
            const dynamicallyLoadedOpenPreviewModalBtn = document.getElementById('openPreviewModalBtn');
            if (dynamicallyLoadedOpenPreviewModalBtn && bookPreviewModal) {
                dynamicallyLoadedOpenPreviewModalBtn.addEventListener('click', function(e) {
                    e.preventDefault(); 
                    openBookPreview(this.dataset.bookId); // ვიყენებთ data-book-id-ს
                });
            }
        } else {
            bookDetailPageWrapper.innerHTML = `<h2 class="content-title">წიგნი ვერ მოიძებნა.</h2><p style="text-align: center;">გთხოვთ, დაბრუნდით <a href="books.html">წიგნების სიაში</a>.</p>`;
        }
    }


    // --- გვერდების ჩატვირთვის კონტროლი ---
    const currentPagePath = window.location.pathname;

    if (currentPagePath.includes('books.html')) {
        loadBooksPage();
    } 
    // თუ rogor-vimushaot-sakutar-tavze.html გვერდზე ვართ, კონტენტი უკვე ზემოთ ჩაიტვირთება
    // ამიტომ აქ აღარ გვჭირდება loadBooksPage().
    // else if (currentPagePath.includes('rogor-vimushaot-sakutar-tavze.html')) {
    //     // content already handled by specific logic above
    // }

}); // DOMContentLoaded end

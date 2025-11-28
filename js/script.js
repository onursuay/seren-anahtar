// ===== MOBİL MENÜ =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Menü dışına tıklanınca kapat
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Menü linkine tıklanınca kapat
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ===== SLIDER =====
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const sliderDotsContainer = document.getElementById('sliderDots');
let slideInterval;
let dots = [];

// Slider noktalarını oluştur
if (sliderDotsContainer && slides.length > 0) {
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        sliderDotsContainer.appendChild(dot);
    });
    dots = document.querySelectorAll('.slider-dot');
}

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('active');
    }
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function goToSlide(index) {
    showSlide(index);
    resetSlideInterval();
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 2500); // 2.5 saniye
}

// Slider butonları
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetSlideInterval();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetSlideInterval();
    });
}

// Otomatik slider başlat
if (slides.length > 0) {
    slideInterval = setInterval(nextSlide, 2500);
}

// Hover'da slider'ı durdur
const sliderContainer = document.querySelector('.slider');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 2500);
    });
}

// ===== AKORDEON (SSS) =====
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const isActive = accordionItem.classList.contains('active');
        
        // Tüm açık olanları kapat
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Tıklanan öğeyi aç (eğer kapalıysa)
        if (!isActive) {
            accordionItem.classList.add('active');
        }
    });
});

// ===== SCROLL ANIMASYONLARI =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animasyon için elementleri hazırla
document.querySelectorAll('.service-card, .service-box, .testimonial-card, .bike-service-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== FORM GÖNDERİMİ =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // WhatsApp'a yönlendir
        const whatsappMessage = `Merhaba, ben ${name}. ${message}`;
        const whatsappUrl = `https://wa.me/905324771516?text=${encodeURIComponent(whatsappMessage)}`;
        
        window.open(whatsappUrl, '_blank');
        
        // Formu temizle
        contactForm.reset();
        
        // Başarı mesajı
        alert('Mesajınız WhatsApp üzerinden gönderilecek!');
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===== TELEFON NUMARASI FORMATLAMA =====
const phoneInputs = document.querySelectorAll('input[type="tel"]');

phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        e.target.value = value;
    });
});

// ===== LAZY LOADING İÇİN =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== SAYFA YÜKLENME ANIMASYONU =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===== AKTİF SAYFA MENU İŞARETLEME =====
const currentLocation = window.location.pathname;
const menuItems = document.querySelectorAll('.nav-menu a');

menuItems.forEach(item => {
    if (item.getAttribute('href') === currentLocation.split('/').pop() || 
        (currentLocation.includes(item.getAttribute('href')) && item.getAttribute('href') !== 'index.html')) {
        item.classList.add('active');
    } else if (currentLocation === '/' || currentLocation.endsWith('/') && item.getAttribute('href') === 'index.html') {
        item.classList.add('active');
    }
});

// ===== CONSOLE LOGO =====
console.log('%c🔑 Seren Anahtar', 'color: #ff8c42; font-size: 24px; font-weight: bold;');
console.log('%c7/24 Dikmen Acil Çilingir Hizmeti', 'color: #1a2847; font-size: 14px;');
console.log('%cTelefon: 0532 477 15 16', 'color: #27ae60; font-size: 12px;');


document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation on Scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksList = document.getElementById('nav-links');

  mobileToggle.addEventListener('click', () => {
    navLinksList.classList.toggle('active');
    // If we wanted a fully-animated burger icon, we'd toggle a class on mobileToggle
    mobileToggle.classList.toggle('open');
  });

  // Mobile menu CSS dynamically appended for mobile toggling if needed
  const style = document.createElement('style');
  style.innerHTML = `
    @media (max-width: 768px) {
      .nav-links {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: rgba(92, 6, 29, 0.98);
        padding: 30px 24px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        gap: 20px;
        text-align: center;
        border-top: 1px solid rgba(255,255,255,0.08);
      }
      .nav-links.active {
        display: flex;
      }
      .mobile-nav-toggle.open span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 6px);
      }
      .mobile-nav-toggle.open span:nth-child(2) {
        opacity: 0;
      }
      .mobile-nav-toggle.open span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -6px);
      }
    }
  `;
  document.head.appendChild(style);

  // Close mobile menu on clicking any link
  navLinksList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksList.classList.remove('active');
      mobileToggle.classList.remove('open');
    });
  });

  // 3. Category Filter for Classes
  const filterBtns = document.querySelectorAll('.filter-btn');
  const classCards = document.querySelectorAll('.class-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons and add to this one
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      classCards.forEach(card => {
        if (filterValue === 'all') {
          card.style.display = 'block';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          const category = card.getAttribute('data-category');
          if (category === filterValue) {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 50);
          } else {
            card.style.opacity = '0';
            card.style.display = 'none';
          }
        }
      });
    });
  });

  // 4. Lightbox for Gallery
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.getAttribute('data-image');
      lightboxImg.setAttribute('src', imgSrc);
      lightbox.classList.add('active');
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  // 5. Registration Form Submission
  const enrollmentForm = document.getElementById('enrollment-form');
  const formSuccessMsg = document.getElementById('form-success-msg');

  enrollmentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // In a live app, this is where we send form data to a backend API (e.g., using fetch)
    const formData = {
      studentName: document.getElementById('student-name').value,
      studentAge: document.getElementById('student-age').value,
      experience: document.getElementById('experience').value,
      parentName: document.getElementById('parent-name').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
    };

    console.log('Enrollment Application Submitted:', formData);

    // Smooth transition to Success message
    enrollmentForm.style.transition = 'opacity 0.3s ease';
    enrollmentForm.style.opacity = '0';
    
    setTimeout(() => {
      enrollmentForm.style.display = 'none';
      formSuccessMsg.style.display = 'block';
      formSuccessMsg.style.opacity = '0';
      formSuccessMsg.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        formSuccessMsg.style.opacity = '1';
      }, 50);
    }, 300);
  });
});

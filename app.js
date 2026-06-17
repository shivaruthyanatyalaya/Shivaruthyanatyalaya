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

  // 5. Registration Form Submission (GitHub Pages compatible using Web3Forms)
  const enrollmentForm = document.getElementById('enrollment-form');
  const formSuccessMsg = document.getElementById('form-success-msg');
  const submitBtn = enrollmentForm.querySelector('.form-submit-btn');

  // --- FORM CONFIGURATION ---
  // To receive real email notifications for form submissions on GitHub Pages:
  // 1. Go to https://web3forms.com/ and enter your email (shivaruthyanatyalaya@gmail.com) to get a free Access Key.
  // 2. Paste your Access Key between the quotes below:
  const WEB3FORMS_ACCESS_KEY = "c0e8bcf6-3dc7-4bf7-93f9-a87a121d4369"; 

  enrollmentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const studentName = document.getElementById('student-name').value;
    const studentAge = document.getElementById('student-age').value;
    const experience = document.getElementById('experience').value;
    const parentName = document.getElementById('parent-name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const showSuccess = () => {
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
    };

    if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY.trim() !== "") {
      // Disable button during submit
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      // Prepare payload for Web3Forms
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Academy Application: ${studentName}`,
        from_name: "Shivaruthyanatyalaya Website",
        "Student Name": studentName,
        "Student Age": studentAge,
        "Prior Experience": experience,
        "Parent/Guardian": parentName || "N/A",
        "Contact Phone": phone,
        "Contact Email": email
      };

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          showSuccess();
        } else {
          console.error(json);
          alert("Something went wrong: " + (json.message || "Failed to submit."));
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit Application";
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Submission failed. Please check your internet connection.");
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Application";
      });
    } else {
      // Fallback/Demo mode: Log data and transition directly to success screen
      console.log('Demo Mode - Form Data:', { studentName, studentAge, experience, parentName, phone, email });
      showSuccess();
    }
  });
});

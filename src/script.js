document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');
  const bookingForm = document.getElementById('bookingForm');
  const successModal = document.getElementById('successModal');

  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');

      if (window.innerWidth <= 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });

  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const cards = document.querySelectorAll('.about-card, .gallery-item, .contact-card');
  cards.forEach(card => {
    observer.observe(card);
  });

  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const mobile = document.getElementById('mobile').value;
    const fromDate = document.getElementById('fromDate').value;
    const fromplace = document.getElementById('fromplace').value;
    const toplace = document.getElementById('toplace').value;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedFromDate = new Date(fromDate);

    if (selectedFromDate < today) {
      alert('From date cannot be in the past');
      return;
    }

    if (!fromplace.trim()) {
      alert('Please enter pickup location');
      return;
    }

    if (!toplace.trim()) {
      alert('Please enter destination');
      return;
    }

    // Show success message immediately
    successModal.classList.add('show');

    // Format the booking message with all details
    const formattedMessage = `🚗 *New Car Booking Request*

*Customer Details:*
👤 Name: ${name}
📱 Mobile: ${mobile}

*Booking Details:*
📅 From Date: ${fromDate}
📍 From Place: ${fromplace}
📍 To Place: ${toplace}

Thank you!`;

    // Reset form immediately
    bookingForm.reset();

    // Open WhatsApp with booking details after a short delay
    setTimeout(() => {
      const encodedMessage = encodeURIComponent(formattedMessage);
      const whatsappURL = `https://wa.me/919791861149?text=${encodedMessage}`;
      
      // Automatically open WhatsApp with pre-filled message
      window.open(whatsappURL, '_blank');
    }, 1500);
  });

  const today = new Date().toISOString().split('T')[0];
  const fromDateInput = document.getElementById('fromDate');
  if (fromDateInput) {
    fromDateInput.setAttribute('min', today);
  }
});

function closeModal() {
  const modal = document.getElementById('successModal');
  modal.classList.remove('show');
}

window.onclick = function(event) {
  const modal = document.getElementById('successModal');
  if (event.target === modal) {
    modal.classList.remove('show');
  }
};

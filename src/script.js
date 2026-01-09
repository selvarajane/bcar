document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');
  const bookingForm = document.getElementById('bookingForm');
  const successModal = document.getElementById('successModal');

  // Check if elements exist
  if (!bookingForm) {
    console.error('Booking form not found!');
    return;
  }
  if (!successModal) {
    console.error('Success modal not found!');
    return;
  }

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

    // Get form values
    const name = document.getElementById('name')?.value || '';
    const mobile = document.getElementById('mobile')?.value || '';
    const fromDate = document.getElementById('fromDate')?.value || '';
    const fromplace = document.getElementById('fromplace')?.value || '';
    const toplace = document.getElementById('toplace')?.value || '';

    // Validation
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }

    if (!mobile.trim()) {
      alert('Please enter your mobile number');
      return;
    }

    if (!fromDate) {
      alert('Please select a date');
      return;
    }

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

    // Show success modal with animation
    successModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

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

    // Reset form
    bookingForm.reset();

    // Open WhatsApp with booking details after animation delay
    setTimeout(() => {
      const encodedMessage = encodeURIComponent(formattedMessage);
      const whatsappURL = `https://wa.me/919791861149?text=${encodedMessage}`;
      
      // Automatically open WhatsApp with pre-filled message
      window.open(whatsappURL, '_blank');
    }, 1000);
  });

  const today = new Date().toISOString().split('T')[0];
  const fromDateInput = document.getElementById('fromDate');
  if (fromDateInput) {
    fromDateInput.setAttribute('min', today);
  }

  // Load gallery images
  loadGalleryImages();
});

function closeModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
    
    // Automatically scroll to home section
    setTimeout(() => {
      const homeSection = document.getElementById('home');
      if (homeSection) {
        homeSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      } else {
        // Fallback: scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 300); // Small delay for modal close animation
  }
}

window.onclick = function(event) {
  const modal = document.getElementById('successModal');
  if (event.target === modal) {
    modal.classList.remove('show');
  }
};

// Function to load all images from the image folder
function loadGalleryImages() {
  const galleryGrid = document.getElementById('galleryGrid');
  if (!galleryGrid) return;

  // List of all image filenames from the image folder
  const imageFiles = [
    { name: 'visiting.jpg', title: 'Our Premium Vehicle' },
    { name: 'WhatsApp Image 2026-01-03 at 21.33.58 (1).jpeg', title: 'Spacious Interior' },
    { name: 'WhatsApp Image 2026-01-03 at 21.33.58 (2).jpeg', title: 'Comfortable Seating' },
    { name: 'WhatsApp Image 2026-01-03 at 21.33.58.jpeg', title: 'Premium Cabin' },
    { name: 'WhatsApp Image 2026-01-03 at 21.33.59 (1).jpeg', title: 'Modern Dashboard' },
    { name: 'WhatsApp Image 2026-01-03 at 21.33.59 (2).jpeg', title: 'Luxury Interior' },
    { name: 'WhatsApp Image 2026-01-03 at 21.33.59.jpeg', title: 'Premium Seats' },
    { name: 'WhatsApp Image 2026-01-03 at 21.34.20 (1).jpeg', title: 'Vehicle Exterior' },
    { name: 'WhatsApp Image 2026-01-03 at 21.34.20 (2).jpeg', title: 'Side View' },
    { name: 'WhatsApp Image 2026-01-03 at 21.34.20.jpeg', title: 'Our Fleet' },
    { name: 'WhatsApp Image 2026-01-03 at 21.34.21 (1).jpeg', title: 'Toyota Innova' },
    { name: 'WhatsApp Image 2026-01-03 at 21.34.21 (2).jpeg', title: 'Premium Vehicle' },
    { name: 'WhatsApp Image 2026-01-03 at 21.34.21.jpeg', title: 'Comfort & Style' }
  ];

  // Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Try to load each image
  imageFiles.forEach((imageFile, index) => {
    const img = new Image();
    img.onload = function() {
      // Image exists, add it to gallery
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      galleryItem.style.opacity = '0';
      galleryItem.style.transform = 'translateY(30px)';
      
      const imgElement = document.createElement('img');
      // Use proper path for images - Vite serves public folder at root
      const encodedImageName = encodeURIComponent(imageFile.name);
      imgElement.src = `/image/${encodedImageName}`;
      imgElement.alt = imageFile.title;
      imgElement.loading = 'lazy';
      
      const overlay = document.createElement('div');
      overlay.className = 'gallery-overlay';
      const overlayText = document.createElement('p');
      overlayText.textContent = imageFile.title;
      overlay.appendChild(overlayText);
      
      galleryItem.appendChild(imgElement);
      galleryItem.appendChild(overlay);
      galleryGrid.appendChild(galleryItem);
      
      // Observe the new item for animations
      imageObserver.observe(galleryItem);
      
      // Animate in
      setTimeout(() => {
        galleryItem.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        galleryItem.style.opacity = '1';
        galleryItem.style.transform = 'translateY(0)';
      }, index * 50);
    };
    img.onerror = function() {
      // Image doesn't exist, skip it
      console.log(`Image not found: ${imageFile.name}`);
    };
    // Vite serves public folder at root, so /image/ works
    const encodedName = encodeURIComponent(imageFile.name);
    img.src = `/image/${encodedName}`;
  });
}

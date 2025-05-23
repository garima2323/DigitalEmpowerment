// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add smooth scrolling for anchor links
  const links = document.querySelectorAll('a[href^="#"]');

  for (const link of links) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  }

  // Add parallax effect to header
  const header = document.querySelector('header') || document.querySelector('.unit-header');
  if (header) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      header.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
    });
  }

  // Add hover effect to unit cards
  const unitCards = document.querySelectorAll('.unit-card');
  unitCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top; // y position within the element
      
      // Calculate rotation based on mouse position
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      setTimeout(() => {
        card.style.transition = 'transform 0.5s ease';
      }, 100);
    });
    
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });

  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.unit-content, section, .image-gallery img');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('visible');
      }
    });
  };
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
  // Run once on page load
  animateOnScroll();

  // Add typing effect to headers
  const mainHeader = document.querySelector('header h1') || document.querySelector('.unit-header h1');
  if (mainHeader && !mainHeader.classList.contains('typing-animation-applied')) {
    const text = mainHeader.textContent;
    mainHeader.textContent = '';
    mainHeader.classList.add('typing-animation-applied');
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        mainHeader.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    
    setTimeout(typeWriter, 500);
  }

  // Add pulse effect to buttons and links
  const buttons = document.querySelectorAll('.resource-link, .back-link');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.classList.add('pulse');
    });
    
    button.addEventListener('animationend', () => {
      button.classList.remove('pulse');
    });
  });

  // Add image zoom effect on click
  const galleryImages = document.querySelectorAll('.image-gallery img');
  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      // Create overlay
      const overlay = document.createElement('div');
      overlay.classList.add('image-overlay');
      
      // Create image container
      const imgContainer = document.createElement('div');
      imgContainer.classList.add('overlay-image-container');
      
      // Create image element
      const imgElement = document.createElement('img');
      imgElement.src = img.src;
      imgElement.alt = img.alt;
      
      // Create close button
      const closeBtn = document.createElement('button');
      closeBtn.classList.add('overlay-close');
      closeBtn.innerHTML = '&times;';
      closeBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
        document.body.style.overflow = 'auto';
      });
      
      // Append elements
      imgContainer.appendChild(imgElement);
      overlay.appendChild(imgContainer);
      overlay.appendChild(closeBtn);
      
      // Add to body
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';
      
      // Close on overlay click
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          document.body.removeChild(overlay);
          document.body.style.overflow = 'auto';
        }
      });
    });
  });
});

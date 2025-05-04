document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  const lucide = window.lucide // Declare lucide variable
  lucide.createIcons()

  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Mobile menu toggle
  const menuToggle = document.querySelector(".mobile-menu-toggle")
  const mobileNav = document.querySelector(".mobile-nav")

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", function () {
      this.classList.toggle("active")
      mobileNav.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking a link
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active")
      mobileNav.classList.remove("active")
    })
  })

  // Header scroll effect
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Form submission handling
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const message = document.getElementById("message").value

      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalBtnText = submitBtn.innerHTML

      submitBtn.disabled = true
      submitBtn.innerHTML =
        '<span class="btn-text">Sending...</span><i data-lucide="loader" class="btn-icon animate-spin"></i>'

      // Refresh Lucide icons to show the loader
      lucide.createIcons()

      // Simulate API call with timeout
      setTimeout(() => {
        // Reset form
        contactForm.reset()

        // Show success message
        const formGroup = document.createElement("div")
        formGroup.className = "form-group"
        formGroup.innerHTML = `
          <div class="success-message">
            <i data-lucide="check-circle" class="success-icon"></i>
            <p>Thank you for your message! I'll get back to you soon.</p>
          </div>
        `

        contactForm.appendChild(formGroup)
        lucide.createIcons()

        // Reset button
        submitBtn.disabled = false
        submitBtn.innerHTML = originalBtnText
        lucide.createIcons()

        // Remove success message after 5 seconds
        setTimeout(() => {
          formGroup.remove()
        }, 5000)
      }, 1500)
    })
  }

  // Loading screen
  const loadingScreen = document.getElementById("loading-screen")

  if (loadingScreen) {
    // Hide loading screen after animations complete
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 4000)
  }

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add animation classes based on data attributes
        if (entry.target.classList.contains("skill-card")) {
          entry.target.classList.add("animate-fade-in")
        } else if (entry.target.classList.contains("project-card")) {
          entry.target.classList.add("animate-slide-in-bottom")
        } else if (entry.target.classList.contains("timeline-item")) {
          entry.target.classList.add("animate-slide-in-left")
        } else if (entry.target.classList.contains("contact-form-container")) {
          entry.target.classList.add("animate-slide-in-left")
        } else if (entry.target.classList.contains("contact-info-container")) {
          entry.target.classList.add("animate-slide-in-right")
        }

        // Unobserve after animation is added
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document
    .querySelectorAll(".skill-card, .project-card, .timeline-item, .contact-form-container, .contact-info-container")
    .forEach((element) => {
      observer.observe(element)
    })
})

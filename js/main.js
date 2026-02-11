// Main JavaScript File

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavigation();
    initScrollEffects();
    initAnimations();
    initOrderButtons();
});

// Navigation functionality
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
    
    // Active link highlighting based on current page
    const currentLocation = window.location.pathname;
    const menuItems = document.querySelectorAll('.nav-menu a');
    
    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentLocation.split('/').pop()) {
            item.classList.add('active');
        }
    });
}

// Scroll effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add background on scroll
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll direction
        if (currentScroll > lastScroll && currentScroll > 500) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// Animations on scroll
function initAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .menu-card, .testimonial-card, .section-header');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Order button functionality
function initOrderButtons() {
    const orderButtons = document.querySelectorAll('.btn-add, .order-online-btn');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create and show order modal
            showOrderModal();
        });
    });
}

// Order modal
function showOrderModal() {
    // Remove existing modal if any
    const existingModal = document.querySelector('.order-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'order-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>Start Your Order</h2>
            <p>Choose how you'd like to order</p>
            <div class="modal-options">
                <a href="#" class="modal-option delivery">
                    <span class="option-icon">🚚</span>
                    <span class="option-title">Delivery</span>
                    <span class="option-desc">Get it delivered to your door</span>
                </a>
                <a href="#" class="modal-option pickup">
                    <span class="option-icon">🏪</span>
                    <span class="option-title">Pickup</span>
                    <span class="option-desc">Pick up at Nedbank Plaza</span>
                </a>
                <a href="#" class="modal-option whatsapp">
                    <span class="option-icon">💬</span>
                    <span class="option-title">WhatsApp</span>
                    <span class="option-desc">Order via WhatsApp</span>
                </a>
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .order-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background-color: white;
            padding: 40px;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            position: relative;
            animation: slideUp 0.3s ease;
        }
        
        .modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
            transition: color 0.3s;
        }
        
        .modal-close:hover {
            color: #FFD700;
        }
        
        .modal-content h2 {
            color: #000;
            margin-bottom: 10px;
        }
        
        .modal-content p {
            color: #666;
            margin-bottom: 30px;
        }
        
        .modal-options {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .modal-option {
            display: flex;
            align-items: center;
            padding: 20px;
            border: 2px solid #eee;
            border-radius: 12px;
            text-decoration: none;
            color: inherit;
            transition: all 0.3s;
        }
        
        .modal-option:hover {
            border-color: #FFD700;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255,215,0,0.2);
        }
        
        .option-icon {
            font-size: 32px;
            margin-right: 15px;
        }
        
        .option-title {
            font-weight: 600;
            font-size: 18px;
            margin-bottom: 4px;
        }
        
        .option-desc {
            font-size: 14px;
            color: #666;
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Loading screen
window.addEventListener('load', function() {
    const loading = document.querySelector('.loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.remove();
            }, 500);
        }, 500);
    }
});

// Smooth scroll for anchor links
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
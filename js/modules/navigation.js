// Navigation Module
const Navigation = {
    init: function() {
        this.cacheDOM();
        this.bindEvents();
        this.setActiveLink();
    },
    
    cacheDOM: function() {
        this.header = document.querySelector('.header');
        this.mobileBtn = document.getElementById('mobileMenuBtn');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-menu a');
    },
    
    bindEvents: function() {
        if (this.mobileBtn) {
            this.mobileBtn.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
        
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
    },
    
    toggleMobileMenu: function() {
        this.mobileBtn.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    },
    
    closeMobileMenu: function() {
        this.mobileBtn.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    },
    
    handleScroll: function() {
        if (window.scrollY > 100) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    },
    
    handleResize: function() {
        if (window.innerWidth > 768 && this.navMenu.classList.contains('active')) {
            this.closeMobileMenu();
        }
    },
    
    setActiveLink: function() {
        const currentPath = window.location.pathname;
        this.navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (currentPath.endsWith(linkPath) || 
                (currentPath === '/' && linkPath === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
};

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
});
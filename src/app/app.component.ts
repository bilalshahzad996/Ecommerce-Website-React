import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isScrolled = false;
  activeSection = 'home';
  displayedText = '';
  currentRoleIndex = 0;
  isDeleting = false;
  typingSpeed = 100;
  scrollRotation = 0;
  scrollProgress = 0;
  private typingTimer: any;
  private observerMap = new Map<Element, IntersectionObserver>();

  roles = [
    'Business Central Developer',
    'UI/UX Designer',
    'F&O Technical Consultant',
    'Front End Developer',
    'Odoo Developer'
  ];

  skills = [
    { name: 'Business Central / AL', level: 92, icon: 'fa-solid fa-database', color: '#7c3aed' },
    { name: 'F&O / X++', level: 88, icon: 'fa-solid fa-gears', color: '#06b6d4' },
    { name: 'Odoo / Python', level: 85, icon: 'fa-brands fa-python', color: '#a78bfa' },
    { name: 'UI/UX Design', level: 90, icon: 'fa-solid fa-pen-ruler', color: '#f59e0b' },
    { name: 'HTML / CSS / SCSS', level: 94, icon: 'fa-brands fa-html5', color: '#f97316' },
    { name: 'Angular / TypeScript', level: 87, icon: 'fa-brands fa-angular', color: '#ef4444' },
    { name: 'JavaScript', level: 89, icon: 'fa-brands fa-js', color: '#eab308' },
  ];

  services = [
    {
      icon: 'fa-solid fa-building-columns',
      title: 'Business Central Dev',
      desc: 'Custom AL extensions, integrations, and workflow automation for Microsoft Dynamics 365 Business Central.',
      gradient: 'linear-gradient(135deg, #7c3aed, #4f46e5)'
    },
    {
      icon: 'fa-solid fa-pen-nib',
      title: 'UI/UX Design',
      desc: 'User-centered interface design with Figma — wireframes, prototypes, and design systems that delight users.',
      gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)'
    },
    {
      icon: 'fa-solid fa-industry',
      title: 'F&O Technical Consulting',
      desc: 'Microsoft Dynamics 365 Finance & Operations customizations, X++ development, and technical architecture.',
      gradient: 'linear-gradient(135deg, #06b6d4, #0ea5e9)'
    },
    {
      icon: 'fa-solid fa-code',
      title: 'Front End Development',
      desc: 'Modern, responsive web apps using Angular, TypeScript, HTML5, SCSS, and component-driven architecture.',
      gradient: 'linear-gradient(135deg, #f97316, #eab308)'
    },
    {
      icon: 'fa-solid fa-cubes',
      title: 'Odoo Development',
      desc: 'Custom Odoo modules, business process automation, and ERP integrations using Python and OWL framework.',
      gradient: 'linear-gradient(135deg, #a78bfa, #7c3aed)'
    },
    {
      icon: 'fa-solid fa-plug-circle-bolt',
      title: 'ERP Integrations',
      desc: 'Seamless integrations between ERP platforms, third-party APIs, payment gateways, and external systems.',
      gradient: 'linear-gradient(135deg, #22c55e, #06b6d4)'
    }
  ];

  stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '10+', label: 'Projects Delivered' },
    { value: '15+', label: 'Happy Clients' },
    { value: '5', label: 'Core Specializations' }
  ];

  navLinks = ['Home', 'About', 'Skills', 'Services', 'Contact'];

  ngOnInit() {
    this.startTyping();
    this.initScrollObserver();
    this.updateScrollCircle();
  }

  ngOnDestroy() {
    if (this.typingTimer) clearTimeout(this.typingTimer);
    this.observerMap.forEach(obs => obs.disconnect());
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 50;
    this.updateActiveSection();
    this.updateScrollCircle();
  }

  updateScrollCircle() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    this.scrollRotation = ratio * 720;
    this.scrollProgress = ratio * 100;
  }

  updateActiveSection() {
    const sections = ['home', 'about', 'skills', 'services', 'contact'];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          this.activeSection = id;
          break;
        }
      }
    }
  }

  initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
    }, 100);
  }

  startTyping() {
    const currentRole = this.roles[this.currentRoleIndex];

    if (!this.isDeleting) {
      this.displayedText = currentRole.substring(0, this.displayedText.length + 1);
      this.typingSpeed = 100;
    } else {
      this.displayedText = currentRole.substring(0, this.displayedText.length - 1);
      this.typingSpeed = 50;
    }

    if (!this.isDeleting && this.displayedText === currentRole) {
      this.typingSpeed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.displayedText === '') {
      this.isDeleting = false;
      this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
      this.typingSpeed = 300;
    }

    this.typingTimer = setTimeout(() => this.startTyping(), this.typingSpeed);
  }

  scrollTo(section: string) {
    const el = document.getElementById(section.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    this.isMenuOpen = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  downloadCV() {
    alert('CV download coming soon!');
  }
}

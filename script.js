document.addEventListener('DOMContentLoaded', function() {
    // Console Easter Egg
    console.log(
        '%cPare! 🛑 Você encontrou a área secreta dos devs! 🕵️‍♂️\n' +
        '%cSe você está aqui, provavelmente sabe o que está fazendo... ou está apenas curioso. 👀\n' +
        '%cGostou do que viu? Vamos trabalhar juntos! 🚀\n' +
        '%cEmail: danubiolagoa@gmail.com',
        'color: #ff5252; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 0px #000;',
        'color: #4facfe; font-size: 16px; margin-top: 10px;',
        'color: #00f260; font-size: 16px; margin-top: 5px; font-weight: bold;',
        'color: #fff; font-size: 14px; margin-top: 5px; padding: 5px; background: #333; border-radius: 4px;'
    );

    // Pixel Mode Toggle
    const pixelToggle = document.querySelector('.pixel-toggle');
    const body = document.body;
    
    // Check local storage
    if (localStorage.getItem('pixelMode') === 'enabled') {
        body.classList.add('pixel-mode');
        updatePixelButton();
    }
    
    if (pixelToggle) {
        pixelToggle.addEventListener('click', function() {
            body.classList.toggle('pixel-mode');
            
            if (body.classList.contains('pixel-mode')) {
                localStorage.setItem('pixelMode', 'enabled');
            } else {
                localStorage.setItem('pixelMode', 'disabled');
            }
            updatePixelButton();
        });
    }

    function updatePixelButton() {
        if (pixelToggle) {
            const isPixel = body.classList.contains('pixel-mode');
            pixelToggle.innerHTML = isPixel ? '<span class="pixel-icon">✨</span>' : '<span class="pixel-icon">👾</span>';
            pixelToggle.setAttribute('title', isPixel ? 'Voltar ao Modo Moderno' : 'Ativar Modo Pixel Art');
        }
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Typing Effect
    class TypeWriter {
        constructor(element, words, wait = 3000) {
            this.element = element;
            this.words = words;
            this.txt = '';
            this.wordIndex = 0;
            this.wait = parseInt(wait, 10);
            this.type();
            this.isDeleting = false;
        }

        type() {
            const current = this.wordIndex % this.words.length;
            const fullTxt = this.words[current];

            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.element.textContent = this.txt;

            let typeSpeed = 100;

            if (this.isDeleting) {
                typeSpeed /= 2;
            }

            if (!this.isDeleting && this.txt === fullTxt) {
                typeSpeed = this.wait;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.wordIndex++;
                typeSpeed = 500;
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }

    const typingText = document.querySelector('.typing-text');
    const words = ['Vibe Coder', 'Especialista em IA', 'React & Angular Dev', 'TypeScript Enthusiast', 'Inovador em Tecnologia'];
    
    if (typingText) {
        new TypeWriter(typingText, words);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.reveal, .skill-card, .project-card').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            header.style.background = 'rgba(15, 23, 42, 0.9)';
        }

        lastScroll = currentScroll;
    });

    // Active navigation link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'Enviando...';
            btn.disabled = true;

            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    btn.textContent = 'Mensagem Enviada!';
                    btn.style.background = '#22c55e';
                    contactForm.reset();
                } else {
                    btn.textContent = 'Erro no envio';
                    btn.style.background = '#ef4444';
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                btn.textContent = 'Erro no envio';
                btn.style.background = '#ef4444';
            })
            .finally(() => {
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            });
        });
    }

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-card');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    const width = progressBar.style.getPropertyValue('--progress');
                    progressBar.style.width = '0';
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 100);
                }
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Add parallax effect to hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });

    // Contact Mini-Cards Animation
    const contactCards = document.querySelectorAll('.contact-mini-card');
    contactCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px)';
        card.style.transition = 'all 0.5s ease forwards';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateX(0)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
    });

    // ID Card 3D Effect with Glare
    const card = document.getElementById('id-card');
    if (card) {
        card.addEventListener('mousemove', (e) => {
            // Disable on mobile/touch devices
            if (window.innerWidth <= 768) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Update mouse position for glare effect
            const mouseX = (x / rect.width) * 100;
            const mouseY = (y / rect.height) * 100;
            card.style.setProperty('--mouse-x', `${mouseX}%`);
            card.style.setProperty('--mouse-y', `${mouseY}%`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg)';
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
        });
    }

    // GitHub Stats and Contribution Graph
    const GITHUB_USERNAME = 'danubiolagoa';
    
    // Initialize GitHub Calendar
    if (typeof GitHubCalendar !== 'undefined') {
        GitHubCalendar(".calendar", GITHUB_USERNAME, {
            responsive: true,
            tooltips: true,
            global_stats: false
        }).then(function() {
            // Tentar atualizar o contador de commits se possível
            const calendarGraph = document.querySelector('.js-yearly-contributions');
            if (calendarGraph) {
                const contributionText = calendarGraph.querySelector('h2');
                if (contributionText) {
                    // Texto ex: "2,345 contributions in the last year"
                    // Regex para pegar o primeiro número (pode ter vírgula ou ponto)
                    const text = contributionText.textContent;
                    const match = text.match(/([\d,.]+)\s/);
                    if (match) {
                        const count = match[1];
                        const commitsEl = document.getElementById('github-commits');
                        if (commitsEl) commitsEl.textContent = count;
                    }
                }
            }
        }).catch(err => {
            console.error("Erro ao carregar GitHub Calendar:", err);
            const container = document.querySelector('.calendar');
            if (container) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 2rem; color: var(--gray);">
                        <p>Não foi possível carregar o gráfico de contribuições.</p>
                        <p style="font-size: 0.8rem; margin-top: 0.5rem; opacity: 0.8;">${err.message}</p>
                        <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" style="color: var(--accent); margin-top: 1rem; display: inline-block;">Ver no GitHub</a>
                    </div>
                `;
            }
        });
    }

    async function fetchGitHubStats() {
        try {
            // 1. Fetch user profile for total repos
            const profileResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
            if (!profileResponse.ok) throw new Error('Falha ao buscar perfil');
            const profileData = await profileResponse.json();
            
            const reposEl = document.getElementById('github-repos');
            if (reposEl) reposEl.textContent = profileData.public_repos || 0;

            // 2. Fetch repositories for stars and languages
            // Limit 100, sort by pushed (most recent activity first)
            const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`);
            if (!reposResponse.ok) throw new Error('Falha ao buscar repositórios');
            const repos = await reposResponse.json();

            // Calculate Stars (sum of stargazers_count from all fetched repos)
            const totalStars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
            const starsEl = document.getElementById('github-stars');
            if (starsEl) starsEl.textContent = totalStars;

            // Calculate Languages
            const languages = {};
            repos.forEach(repo => {
                if (repo.language) {
                    languages[repo.language] = (languages[repo.language] || 0) + 1;
                }
            });

            // Sort by usage (descending)
            const sortedLangs = Object.entries(languages)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5); // Top 5

            const languagesList = document.getElementById('languages-list');
            
            if (languagesList) {
                if (sortedLangs.length === 0) {
                    languagesList.innerHTML = '<div class="lang-item">Nenhuma linguagem encontrada</div>';
                } else {
                    languagesList.innerHTML = sortedLangs.map(([lang, count]) => `
                        <div class="lang-item">
                            <span class="lang-color" style="background: ${getLangColor(lang)}"></span>
                            ${lang}
                        </div>
                    `).join('');
                }
            }

        } catch (error) {
            console.error('GitHub stats fetch error:', error);
            // Fallback content in case of error
            const reposEl = document.getElementById('github-repos');
            const starsEl = document.getElementById('github-stars');
            if (reposEl && reposEl.textContent === '0') reposEl.textContent = '-';
            if (starsEl && starsEl.textContent === '0') starsEl.textContent = '-';
        }
    }
    
    function getLangColor(lang) {
        const colors = {
            'JavaScript': '#f7df1e',
            'TypeScript': '#3178c6',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'Python': '#3776ab',
            'Java': '#b07219',
            'React': '#61dafb',
            'Angular': '#dd0031',
            'Vue': '#4fc08d',
            'PHP': '#4F5D95',
            'C#': '#178600',
            'Shell': '#89e051',
            'Dart': '#00B4AB',
            'Go': '#00ADD8',
            'Rust': '#dea584'
        };
        return colors[lang] || '#6366f1';
    }

    // Initialize stats
    fetchGitHubStats();

    // Image Modal Logic
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementsByClassName("modal-close")[0];

    document.querySelectorAll('.project-image').forEach(imgContainer => {
        imgContainer.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                modal.style.display = "block";
                modalImg.src = img.src;
                captionText.innerHTML = img.alt || "Imagem do Projeto";
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });

    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = "none";
            document.body.style.overflow = 'auto'; // Enable scrolling
        }
    }

    if (modal) {
        modal.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = 'auto'; // Enable scrolling
            }
        }
    }

    // Close on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape" && modal && modal.style.display === "block") {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    });
});

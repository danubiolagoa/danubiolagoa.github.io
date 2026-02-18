document.addEventListener('DOMContentLoaded', function() {
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

    /* 
    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            animateValue(stat, 0, target, 2000);
        });
    }
    */

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                /*
                if (entry.target.classList.contains('hero-stats')) {
                    animateStats();
                }
                */
            }
        });
    }, observerOptions);

    // Observe elements
    // document.querySelectorAll('.reveal, .hero-stats, .skill-card, .project-card').forEach(el => {
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
            
            // Show success message
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'Mensagem Enviada!';
            btn.style.background = '#22c55e';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
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

    // GitHub Stats and Contribution Graph
    const GITHUB_USERNAME = 'danubiolagoa';
    
    async function fetchGitHubStats() {
        try {
            // Fetch user data
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
            const data = await response.json();
            
            // Update stats
            document.getElementById('github-repos').textContent = data.public_repos || 0;
            document.getElementById('github-stars').textContent = data.public_gists || 0;
            
            // Estimate commits (this is a rough estimate based on public activity)
            const eventsResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`);
            const events = await eventsResponse.json();
            const commitEvents = events.filter(event => event.type === 'PushEvent');
            const totalCommits = commitEvents.reduce((acc, event) => acc + event.payload.commits.length, 0);
            document.getElementById('github-commits').textContent = totalCommits > 0 ? totalCommits : '100+';
            
        } catch (error) {
            console.log('GitHub stats fetch error:', error);
            // Fallback values
            document.getElementById('github-repos').textContent = '10+';
            document.getElementById('github-commits').textContent = '100+';
            document.getElementById('github-stars').textContent = '5+';
        }
    }
    
    async function fetchGitHubLanguages() {
        try {
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
            const repos = await response.json();
            
            const languages = {};
            repos.forEach(repo => {
                if (repo.language) {
                    languages[repo.language] = (languages[repo.language] || 0) + 1;
                }
            });
            
            // Sort by usage
            const sortedLangs = Object.entries(languages)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5);
            
            const languagesList = document.getElementById('languages-list');
            
            if (sortedLangs.length === 0) {
                languagesList.innerHTML = `
                    <div class="lang-item"><span class="lang-color" style="background: #3178c6"></span>TypeScript</div>
                    <div class="lang-item"><span class="lang-color" style="background: #f7df1e"></span>JavaScript</div>
                    <div class="lang-item"><span class="lang-color" style="background: #e34c26"></span>HTML</div>
                    <div class="lang-item"><span class="lang-color" style="background: #563d7c"></span>CSS</div>
                `;
            } else {
                languagesList.innerHTML = sortedLangs.map(([lang, count]) => `
                    <div class="lang-item">
                        <span class="lang-color" style="background: ${getLangColor(lang)}"></span>
                        ${lang}
                    </div>
                `).join('');
            }
        } catch (error) {
            console.log('GitHub languages fetch error:', error);
            document.getElementById('languages-list').innerHTML = `
                <div class="lang-item"><span class="lang-color" style="background: #3178c6"></span>TypeScript</div>
                <div class="lang-item"><span class="lang-color" style="background: #f7df1e"></span>JavaScript</div>
                <div class="lang-item"><span class="lang-color" style="background: #dd0031"></span>Angular</div>
                <div class="lang-item"><span class="lang-color" style="background: #61dafb"></span>React</div>
            `;
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
            'PHP': '#4F5D95'
        };
        return colors[lang] || '#6366f1';
    }
    
    async function fetchContributionGraph() {
        const container = document.getElementById('contribution-graph');
        
        try {
            // Try to fetch from the generated JSON file
            const response = await fetch('github-stats.json');
            
            if (!response.ok) {
                throw new Error('Stats file not found');
            }
            
            const data = await response.json();
            
            if (data.error || !data.weeks || data.weeks.length === 0) {
                throw new Error('Invalid stats data');
            }
            
            // Update total contributions in stats
            const commitsElement = document.getElementById('github-commits');
            if (commitsElement && data.totalContributions) {
                commitsElement.textContent = data.totalContributions;
            }
            
            renderContributionGraph(data.weeks);
            
        } catch (error) {
            console.log('Error loading contribution graph:', error);
            // Show configuration message
            showSetupMessage();
        }
    }
    
    function showSetupMessage() {
        const container = document.getElementById('contribution-graph');
        
        container.innerHTML = `
            <div class="contribution-setup">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <h4>Configure o Gráfico de Contribuições</h4>
                <p>Para mostrar seus commits reais do GitHub:</p>
                <ol>
                    <li>Acesse <strong>Settings</strong> → <strong>Developer settings</strong> → <strong>Personal access tokens</strong> → <strong>Tokens (classic)</strong></li>
                    <li>Gere um novo token com a permissão <strong>read:user</strong></li>
                    <li>Vá em <strong>Settings</strong> → <strong>Secrets and variables</strong> → <strong>Actions</strong> do seu repositório</li>
                    <li>Adicione uma secret chamada <strong>GH_TOKEN</strong> com seu token</li>
                    <li>O workflow irá atualizar automaticamente</li>
                </ol>
                <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener noreferrer" class="github-view-link">
                    Ver no GitHub
                </a>
            </div>
        `;
    }
    
    function showContributionGraphError() {
        const container = document.getElementById('contribution-graph');
        
        container.innerHTML = `
            <div class="contribution-error">
                <svg width="32" height="32" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                <p>Não foi possível carregar o gráfico de contribuições.</p>
                <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener noreferrer" class="github-view-link">
                    Ver contribuições no GitHub
                </a>
            </div>
        `;
    }
    
    function renderContributionGraph(weeks) {
        const container = document.getElementById('contribution-graph');
        
        const graphHTML = `
            <div class="contribution-graph">
                ${weeks.map((week, weekIndex) => `
                    <div class="contribution-week">
                        ${week.map((day, dayIndex) => `
                            <div class="contribution-day level-${day.level}" 
                                 title="${formatDate(day.date)}: ${day.count} ${day.count === 1 ? 'contribuição' : 'contribuições'}"></div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
            <div class="contribution-legend">
                <span>Menos</span>
                <div class="legend-box level-0"></div>
                <div class="legend-box level-1"></div>
                <div class="legend-box level-2"></div>
                <div class="legend-box level-3"></div>
                <div class="legend-box level-4"></div>
                <span>Mais</span>
            </div>
        `;
        
        container.innerHTML = graphHTML;
    }
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
        });
    }
    

    
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

    // Initialize GitHub data
    fetchGitHubStats();
    fetchGitHubLanguages();
    fetchContributionGraph();

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
                captionText.innerHTML = img.alt;
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
        if (event.key === "Escape" && modal.style.display === "block") {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    });
});
const fs = require('fs');
let content = fs.readFileSync('./public/watch.html', 'utf8');

// 1. Replace tailwind config and fonts
const oldHeadStart = content.indexOf('<link href="https://fonts.googleapis.com/css2?family=Poppins');
const oldHeadEnd = content.indexOf('</style>') + 8;
const newHeadCode = `    <link
        href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Pixelify+Sans:wght@400;700&family=Atomic+Age&family=Exo+2:wght@400;700&display=swap"
        rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/alpinejs/3.10.3/cdn.min.js" defer></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="sources.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Pixelify Sans', 'sans-serif'],
                        mono: ['Space Mono', 'monospace'],
                        display: ['Atomic Age', 'cursive'],
                        logo: ['Exo 2', 'sans-serif'],
                    },
                    colors: {
                        vyper: {
                            bg: '#111',
                            text: '#C4C4C4',
                            accent: '#58F00C',
                            error: '#ff6666'
                        }
                    }
                },
            },
        }
    </script>
    <style>
        .glass-effect {
            background: rgba(17, 17, 17, 0.7);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }

        .backdrop-gradient {
            background: linear-gradient(to bottom, rgba(17, 17, 17, 0) 0%, rgba(17, 17, 17, 1) 100%);
        }

        .nav-link {
            position: relative;
            transition: all 0.3s ease;
            padding: 0.5rem 0;
            font-family: 'Space Mono', monospace;
        }

        .nav-link::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: 0;
            left: 50%;
            background: #58F00C;
            transition: all 0.3s ease;
            transform: translateX(-50%);
        }

        .nav-link:hover {
            color: #58F00C;
        }

        .nav-link:hover::after {
            width: 100%;
        }

        .section-header {
            cursor: pointer;
            user-select: none;
        }

        .section-content {
            transition: all 0.3s ease;
            overflow: hidden;
        }

        .section-content.collapsed {
            max-height: 0;
            opacity: 0;
            padding-top: 0;
            padding-bottom: 0;
        }

        .section-content.expanded {
            max-height: 2000px;
            opacity: 1;
        }

        .card-hover {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 30px -10px rgba(88, 240, 12, 0.2);
        }

        .card-hover:hover .card-overlay {
            opacity: 1;
        }

        .card-overlay {
            opacity: 0;
            transition: opacity 0.3s ease;
            background: linear-gradient(
                to top,
                rgba(17, 17, 17, 0.9) 0%,
                rgba(17, 17, 17, 0.7) 50%,
                rgba(17, 17, 17, 0.3) 100%
            );
        }

        @keyframes textColorAnimation {
            0% { color: #58F00C; text-shadow: 0 0 6px #58F00C; }
            50% { color: #88ff44; text-shadow: 0 0 12px #58F00C; }
            100% { color: #58F00C; text-shadow: 0 0 6px #58F00C; }
        }
        .animated-text {
            animation: textColorAnimation 2s ease-in-out infinite;
            font-family: 'Space Mono', monospace;
        }

        .card-hover:hover img {
            filter: blur(3px);
            transition: filter 0.3s ease;
        }

        .card-hover img {
            transition: filter 0.3s ease;
        }

        .search-container::before {
            background: radial-gradient(
                circle at var(--mouse-x, center) var(--mouse-y, center),
                rgba(88, 240, 12, 0.2) 0%,
                rgba(88, 240, 12, 0.1) 25%,
                transparent 70%
            );
        }

        .search-input:focus {
            box-shadow: 0 0 20px rgba(88, 240, 12, 0.2);
            transform: scale(1.02);
            background: rgba(17, 17, 17, 0.9);
        }

        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(180deg);
            }
        }

        .settings-icon {
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .settings-icon:hover {
            transform: rotate(180deg);
        }
    </style>`;
if (oldHeadStart > -1 && oldHeadEnd > -1) {
    content = content.substring(0, oldHeadStart) + newHeadCode + content.substring(oldHeadEnd);
}

// 2. Replace body class
content = content.replace('<body class="bg-gray-900 text-white min-h-screen" x-data="app()">', '<body class="bg-vyper-bg text-vyper-text min-h-screen" x-data="app()">');

// 3. Replace Navbar
const oldNavStart = content.indexOf('<!-- navigation -->');
const oldNavEnd = content.indexOf('</nav>') + 6;
const newNavCode = `<!-- navigation -->
    <nav class="fixed w-full z-50 glass-effect" style="width: 100%; top: 0; left: 0; margin-left: 0;">
        <div class="container mx-auto px-6 py-3">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4 md:space-x-8">
                    <a href="index.html" class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                        <img src="logo.png" alt="Vyper Logo" class="h-8 w-8 md:h-10 md:w-10">
                        <span class="text-2xl md:text-3xl font-bold font-logo text-vyper-accent"
                            style="text-shadow: 0 0 6px #58F00C, 0 0 12px #58F00C;">Vyper</span>
                    </a>
                    <div class="hidden md:flex space-x-6">
                            <a href="index.html" class="nav-link">Browse</a>
                            <button @click="showWatchLater = true" class="nav-link flex items-center space-x-2">
                                <span>Watch Later</span>
                                <span x-show="watchLaterCount > 0"
                                    class="bg-vyper-accent text-vyper-bg text-xs flex items-center justify-center rounded-full w-6 h-6"
                                    x-text="watchLaterCount"></span>
                            </button>
                            <a href="https://github.com/AzureLiqhtningl/Vyper" target="_blank"
                                class="nav-link flex items-center">
                                <span>GitHub</span>
                            </a>
                            <a href="https://discord.gg/yGfnw6vk" target="_blank"
                                class="nav-link flex items-center">
                                <span>Discord</span>
                            </a>
                        </div>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="settings.html" class="text-gray-400 hover:text-vyper-accent transition-colors duration-300" title="Settings">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 settings-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </a>
                    <button @click="mobileMenu = !mobileMenu" class="md:hidden text-gray-300 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
            
            <div x-show="mobileMenu" 
                x-transition:enter="transition ease-out duration-200"
                x-transition:enter-start="opacity-0 transform -translate-y-2"
                x-transition:enter-end="opacity-100 transform translate-y-0"
                x-transition:leave="transition ease-in duration-150"
                x-transition:leave-start="opacity-100 transform translate-y-0"
                x-transition:leave-end="opacity-0 transform -translate-y-2"
                class="md:hidden mt-4 pb-4">
                <div class="flex flex-col space-y-4">
                    <a href="index.html" class="px-4 py-2 hover:bg-vyper-bg rounded-lg transition-colors border border-transparent hover:border-white/10">Browse</a>
                    <button @click="showWatchLater = true; mobileMenu = false" 
                            class="flex items-center justify-between px-4 py-2 hover:bg-vyper-bg rounded-lg transition-colors border border-transparent hover:border-white/10">
                        <span>Watch Later</span>
                        <span x-show="watchLaterCount > 0" 
                              class="bg-vyper-accent text-vyper-bg text-xs flex items-center justify-center rounded-full w-6 h-6" 
                              x-text="watchLaterCount"></span>
                    </button>
                    <a href="https://github.com/AzureLiqhtningl/Vyper" target="_blank" 
                       class="px-4 py-2 hover:bg-vyper-bg rounded-lg transition-colors border border-transparent hover:border-white/10">GitHub</a>
                    <a href="https://discord.gg/yGfnw6vk" target="_blank" 
                       class="px-4 py-2 hover:bg-vyper-bg rounded-lg transition-colors border border-transparent hover:border-white/10">Discord</a>
                </div>
            </div>
        </div>
    </nav>`;

if (oldNavStart > -1 && oldNavEnd > -1) {
    content = content.substring(0, oldNavStart) + newNavCode + content.substring(oldNavEnd);
}

// 4. Global color replacements
content = content.replace(/bg-gray-900/g, 'bg-vyper-bg');
content = content.replace(/bg-gray-800/g, 'bg-vyper-bg border border-white/10');
content = content.replace(/bg-gray-700/g, 'bg-vyper-bg border border-white/5');
content = content.replace(/bg-purple-600 text-white/g, 'bg-vyper-accent text-vyper-bg hover:opacity-90');
content = content.replace(/bg-purple-600/g, 'bg-vyper-accent text-vyper-bg');
content = content.replace(/text-purple-400/g, 'text-vyper-accent');
content = content.replace(/text-purple-500/g, 'text-vyper-accent');
content = content.replace(/ring-purple-500/g, 'ring-vyper-accent');
content = content.replace(/hover:text-purple-400/g, 'hover:text-vyper-accent');
content = content.replace(/hover:text-purple-300/g, 'hover:text-vyper-accent/80');
content = content.replace(/hover:bg-purple-700/g, 'hover:bg-vyper-accent/80');
content = content.replace(/hover:bg-purple-600/g, 'hover:bg-vyper-accent/90');
content = content.replace(/from-purple-400 to-violet-800/g, 'from-vyper-accent to-green-800');
content = content.replace(/text-white/g, 'text-vyper-text');
content = content.replace(/text-gray-200/g, 'text-vyper-text');
content = content.replace(/text-gray-300/g, 'text-gray-400'); // Dimmer text

// Fix nova to vyper text
content = content.replace(/>Nova</g, '>Vyper<');
content = content.replace(/> Watch - Nova</g, '> Watch - Vyper<');
content = content.replace(/<title>Watch - Nova<\/title>/, '<title>Watch - Vyper</title>');

fs.writeFileSync('./public/watch.html', content, 'utf8');
console.log('done watch.html');

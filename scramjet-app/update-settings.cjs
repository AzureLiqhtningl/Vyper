const fs = require('fs');
let content = fs.readFileSync('./public/settings.html', 'utf8');

// 1. Replace tailwind config and fonts
const oldHeadStart = content.indexOf('<link href="https://fonts.googleapis.com/css2?family=Poppins');
const oldHeadEnd = content.indexOf('</style>') + 8;
const newHeadCode = `    <link
        href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Pixelify+Sans:wght@400;700&family=Atomic+Age&family=Exo+2:wght@400;700&display=swap"
        rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/alpinejs/3.10.3/cdn.min.js" defer></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="sources.js"></script>
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
        .settings-sidebar {
            background: rgba(17, 17, 17, 0.5);
            backdrop-filter: blur(10px);
            border-right: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .settings-content {
            background: rgba(17, 17, 17, 0.3);
        }

        .source-option {
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }

        .source-option:hover {
            background: rgba(255, 255, 255, 0.05);
        }

        .source-option.selected {
            border-color: #58F00C;
            background: rgba(88, 240, 12, 0.1);
        }

        .source-option.disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .glass-effect {
            background: rgba(17, 17, 17, 0.7);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
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
    </style>`;
if (oldHeadStart > -1 && oldHeadEnd > -1) {
    content = content.substring(0, oldHeadStart) + newHeadCode + content.substring(oldHeadEnd);
}

// 2. Replace body class
content = content.replace('<body class="bg-gray-900 text-white min-h-screen font-sans"', '<body class="bg-vyper-bg text-vyper-text min-h-screen font-sans"');

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
                            <button @click="window.location.href='index.html?watchlater=true'" class="nav-link flex items-center space-x-2">
                                <span>Watch Later</span>
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
                    <button @click="window.location.href='index.html?watchlater=true'" 
                            class="flex items-center justify-between px-4 py-2 hover:bg-vyper-bg rounded-lg transition-colors border border-transparent hover:border-white/10">
                        <span>Watch Later</span>
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

// 4. Global color and text replacements
content = content.replace(/bg-gray-900/g, 'bg-vyper-bg');
content = content.replace(/bg-gray-800/g, 'bg-vyper-bg border border-white/10');
content = content.replace(/bg-slate-800\/50/g, 'bg-vyper-bg border border-white/10');
content = content.replace(/bg-gray-700/g, 'bg-vyper-bg border border-white/5');

content = content.replace(/bg-purple-600 text-white/g, 'bg-vyper-accent text-vyper-bg hover:opacity-90');
content = content.replace(/bg-purple-600\/50/g, 'bg-vyper-accent/50');
content = content.replace(/bg-purple-600/g, 'bg-vyper-accent');
content = content.replace(/bg-purple-500\/10/g, 'bg-vyper-accent/10');
content = content.replace(/bg-purple-500\/20/g, 'bg-vyper-accent/20');
content = content.replace(/border-purple-500\/20/g, 'border-vyper-accent/20');

content = content.replace(/text-purple-400/g, 'text-vyper-accent');
content = content.replace(/text-purple-500/g, 'text-vyper-accent');
content = content.replace(/border-purple-500/g, 'border-vyper-accent');
content = content.replace(/bg-purple-500/g, 'bg-vyper-accent');
content = content.replace(/ring-purple-400/g, 'ring-vyper-accent');
content = content.replace(/hover:text-purple-400/g, 'hover:text-vyper-accent');
content = content.replace(/hover:bg-purple-700/g, 'hover:bg-vyper-accent/80 hover:text-vyper-bg');
content = content.replace(/hover:bg-purple-600/g, 'hover:bg-vyper-accent/90 hover:text-vyper-bg');
content = content.replace(/hover:bg-purple-600\/50/g, 'hover:bg-vyper-accent/50');

// Fix gradients
content = content.replace(/from-purple-500\/10 via-purple-500\/20 to-purple-500\/10/g, 'from-vyper-accent/10 via-vyper-accent/20 to-vyper-accent/10');

// Fix text colors
content = content.replace(/text-white/g, 'text-vyper-text');
content = content.replace(/text-slate-400/g, 'text-gray-400');
content = content.replace(/text-slate-300/g, 'text-gray-300');

// Meta info
content = content.replace(/<title>Settings - Nova<\/title>/, '<title>Settings - Vyper</title>');
content = content.replace(/<meta content="Nova" property="og:title"\/>/, '<meta content="Vyper" property="og:title"/>');
content = content.replace(/content="#A17FC0"/, 'content="#58F00C"');

// Fix Nova to Vyper text
content = content.replace(/Nova's/g, "Vyper's");
content = content.replace(/Nova/g, 'Vyper');

// ASCII Art replace
const asciiIndex = content.indexOf('<!--\\r\\n _   _                 \\r\\n| \\ | | _____   ____ _ \\r\\n|  \\| |/ _ \\ \\ / / _` |\\r\\n| |\\  | (_) \\ V / (_| |\\r\\n|_| \\_|\\___/ \\_/ \\__,_|\\r\\n-->');
if (asciiIndex === -1) {
    // try with \n
    const asciiIndex2 = content.indexOf('<!--\n _   _                 \n| \\ | | _____   ____ _ \n|  \\| |/ _ \\ \\ / / _` |\n| |\\  | (_) \\ V / (_| |\n|_| \\_|\\___/ \\_/ \\__,_|\n-->');
    if (asciiIndex2 > -1) {
        content = content.replace('<!--\n _   _                 \n| \\ | | _____   ____ _ \n|  \\| |/ _ \\ \\ / / _` |\n| |\\  | (_) \\ V / (_| |\n|_| \\_|\\___/ \\_/ \\__,_|\n-->', '<!--\n\\ \\    / /_ _ __  ___ _ _ \n \\ \\/ /| || | \'_ \\/ -_) \'_|\n  \\__/  \\_, | .__/\\___|_|  \n        |__/|_|            \n-->');
    }
} else {
    content = content.replace('<!--\r\n _   _                 \r\n| \\ | | _____   ____ _ \r\n|  \\| |/ _ \\ \\ / / _` |\r\n| |\\  | (_) \\ V / (_| |\r\n|_| \\_|\\___/ \\_/ \\__,_|\r\n-->', '<!--\r\n\\ \\    / /_ _ __  ___ _ _ \r\n \\ \\/ /| || | \'_ \\/ -_) \'_|\r\n  \\__/  \\_, | .__/\\___|_|  \r\n        |__/|_|            \r\n-->');
}

fs.writeFileSync('./public/settings.html', content, 'utf8');
console.log('done settings.html');

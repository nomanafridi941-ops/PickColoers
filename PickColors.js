        window.onerror = function (msg, url, line, col, error) {
            console.error("Global Error:", msg, "at", line + ":" + col);
            alert("⚠️ Error: " + msg + " (check console)");
        };


        // Tools Dropdown: Desktop hover, mobile tap
        function isMobileNav() {
            return window.innerWidth <= 900;
        }
        function closeAllDropdowns() {
            document.querySelectorAll('.dropdown.open').forEach(el => el.classList.remove('open'));
        }
        function toggleToolsDropdown(e) {
            e.preventDefault();
            const dropdown = document.getElementById('toolsDropdown');
            if (isMobileNav()) {
                dropdown.classList.toggle('open');
            }
        }
        document.addEventListener('DOMContentLoaded', function () {
            const dropdown = document.getElementById('toolsDropdown');
            if (dropdown) {
                // Always start closed
                dropdown.classList.remove('open');
                window.addEventListener('resize', function () {
                    dropdown.classList.remove('open');
                });
                // Desktop: open on hover, close on leave
                dropdown.addEventListener('mouseenter', function () {
                    if (!isMobileNav()) dropdown.classList.add('open');
                });
                dropdown.addEventListener('mouseleave', function () {
                    if (!isMobileNav()) dropdown.classList.remove('open');
                });
                // Close dropdown if click outside (desktop/mobile)
                document.addEventListener('click', function (e) {
                    if (!dropdown.contains(e.target) && dropdown.classList.contains('open')) {
                        dropdown.classList.remove('open');
                    }
                });
            }
            // Always close dropdown after clicking any dropdown link
            document.querySelectorAll('.dropdown-menu a').forEach(link => {
                link.addEventListener('click', function () {
                    const dd = document.getElementById('toolsDropdown');
                    if (dd) dd.classList.remove('open');
                });
            });
        });
        // Global variables
        let currentPage = 'home';

        // Navigation functions
        function showPage(pageId) {
            // Hide all pages
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));

            // Show selected page
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
                currentPage = pageId;
            }

            // Update navigation active state
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => link.classList.remove('active'));

            // Find and activate the corresponding nav link
            const activeLink = document.querySelector(`a[onclick="showPage('${pageId}')"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }

            // Close mobile menu if open
            document.getElementById('navLinks').classList.remove('show');
        }

        function toggleMobileMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('show');
        }

        // Utility functions
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                showToast('Copied to clipboard!');
            });
        }


        // Color conversion utilities
        // Utility: HEX to RGB object (for accessibility checker)
        function hexToRgbA(hex) {
            hex = hex.replace('#', '');
            if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
            let num = parseInt(hex, 16);
            return {
                r: (num >> 16) & 255,
                g: (num >> 8) & 255,
                b: num & 255
            };
        }

        function hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        function rgbToHex(r, g, b) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }

        function rgbToHsl(r, g, b) {
            r /= 255; g /= 255; b /= 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;

            if (max === min) {
                h = s = 0;
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            return {
                h: Math.round(h * 360),
                s: Math.round(s * 100),
                l: Math.round(l * 100)
            };
        }

        function rgbToHsv(r, g, b) {
            r /= 255; g /= 255; b /= 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h, s, v = max;

            const d = max - min;
            s = max === 0 ? 0 : d / max;

            if (max === min) {
                h = 0;
            } else {
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }

            return {
                h: Math.round(h * 360),
                s: Math.round(s * 100),
                v: Math.round(v * 100)
            };
        }

        function rgbToCmyk(r, g, b) {
            r /= 255; g /= 255; b /= 255;
            const k = 1 - Math.max(r, g, b);
            const c = (1 - r - k) / (1 - k) || 0;
            const m = (1 - g - k) / (1 - k) || 0;
            const y = (1 - b - k) / (1 - k) || 0;

            return {
                c: Math.round(c * 100),
                m: Math.round(m * 100),
                y: Math.round(y * 100),
                k: Math.round(k * 100)
            };
        }

        function hslToRgb(h, s, l) {
            h /= 360; s /= 100; l /= 100;
            const c = (1 - Math.abs(2 * l - 1)) * s;
            const x = c * (1 - Math.abs((h * 6) % 2 - 1));
            const m = l - c / 2;
            let r = 0, g = 0, b = 0;

            if (0 <= h && h < 1 / 6) {
                r = c; g = x; b = 0;
            } else if (1 / 6 <= h && h < 1 / 3) {
                r = x; g = c; b = 0;
            } else if (1 / 3 <= h && h < 1 / 2) {
                r = 0; g = c; b = x;
            } else if (1 / 2 <= h && h < 2 / 3) {
                r = 0; g = x; b = c;
            } else if (2 / 3 <= h && h < 5 / 6) {
                r = x; g = 0; b = c;
            } else if (5 / 6 <= h && h < 1) {
                r = c; g = 0; b = x;
            }

            r = Math.round((r + m) * 255);
            g = Math.round((g + m) * 255);
            b = Math.round((b + m) * 255);

            return { r, g, b };
        }

        function hslToHex(h, s, l) {
            const rgb = hslToRgb(h, s, l);
            return rgbToHex(rgb.r, rgb.g, rgb.b);
        }
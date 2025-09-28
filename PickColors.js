<<<<<<< HEAD
        window.onerror = function (msg, url, line, col, error) {
=======
 window.onerror = function (msg, url, line, col, error) {
>>>>>>> 4f5670392bc01543c0ae55781be6163beae920e7
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
<<<<<<< HEAD
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }

        function rgbToHsl(r, g, b) {
            r /= 255; g /= 255; b /= 255;
=======
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


        // ======================= Color Picker Functions =======================

        // ======= Utility Functions =======
        function hexToRgb(hex) {
            hex = hex.replace("#", "");
            if (hex.length === 3) hex = hex.split("").map(h => h + h).join("");
            const bigint = parseInt(hex, 16);
            return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
        }

        function rgbToHsl(r, g, b) {
            r /= 255; g /= 255; b /= 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;
            if (max === min) h = s = 0;
            else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h *= 60;
            }
            return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
        }

        function rgbToHsv(r, g, b) {
            r /= 255; g /= 255; b /= 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            const v = max;
            const d = max - min;
            const s = max === 0 ? 0 : d / max;
            let h = 0;
            if (d !== 0) {
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h *= 60;
            }
            return { h: Math.round(h), s: Math.round(s * 100), v: Math.round(v * 100) };
        }

        function rgbToCmyk(r, g, b) {
            if (r === 0 && g === 0 && b === 0) return { c: 0, m: 0, y: 0, k: 100 };
            let c = 1 - r / 255, m = 1 - g / 255, y = 1 - b / 255;
            let k = Math.min(c, m, y);
            c = (c - k) / (1 - k); m = (m - k) / (1 - k); y = (y - k) / (1 - k);
            return { c: Math.round(c * 100), m: Math.round(m * 100), y: Math.round(y * 100), k: Math.round(k * 100) };
        }

        // ======= Update Color Info =======
        function updateColorInfo(hex) {
            const rgb = hexToRgb(hex);
            if (!rgb) return;

            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
            const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

            document.getElementById('colorPreview').style.backgroundColor = hex;
            document.getElementById('colorPreview').textContent = hex.toUpperCase();
            document.getElementById('hexOutput').textContent = hex.toUpperCase();
            document.getElementById('rgbOutput').textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            document.getElementById('hslOutput').textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
            document.getElementById('hsvOutput').textContent = `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
            document.getElementById('cmykOutput').textContent = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
        }

        // ======= Copy Color with Toast =======
        function copyColorValue(text) {
            navigator.clipboard.writeText(text).then(() => {
                const toast = document.createElement('div');
                toast.className = 'toast';
                toast.textContent = `Copied: ${text}`;
                toast.style.background = 'linear-gradient(135deg, #38a169, #2f855a)';
                document.body.appendChild(toast);
                setTimeout(() => toast.classList.add('show'), 100);
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => toast.remove(), 300);
                }, 2500);
            }).catch(() => {
                const toast = document.createElement('div');
                toast.className = 'toast';
                toast.textContent = 'Failed to copy!';
                toast.style.background = 'linear-gradient(135deg, #e53e3e, #c53030)';
                document.body.appendChild(toast);
                setTimeout(() => toast.classList.add('show'), 100);
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => toast.remove(), 300);
                }, 2500);
            });
        }

        // ======= Event Listeners =======
        document.addEventListener('DOMContentLoaded', function () {
            const colorPickerInput = document.getElementById('colorPickerInput');
            const hexInputField = document.getElementById('hexInputField');

            colorPickerInput.addEventListener('input', function () {
                const hex = colorPickerInput.value;
                hexInputField.value = hex;
                updateColorInfo(hex);
            });

            hexInputField.addEventListener('input', function () {
                const hex = hexInputField.value;
                if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
                    colorPickerInput.value = hex;
                    updateColorInfo(hex);
                }
            });

            // Copy on clicking color values
            document.querySelectorAll('.color-value, #colorPreview').forEach(el => {
                el.addEventListener('click', () => copyColorValue(el.textContent));
            });

            // Initialize default
            updateColorInfo('#667eea');
        });











        //========================== Gradient functions Tool =========================
        function generateAdvancedGradient() {
            const direction = document.getElementById('gradientDirection').value;
            const stopGroups = document.querySelectorAll('#gradientStops .color-input-group');
            let stops = [];
            stopGroups.forEach(group => {
                const color = group.querySelector('input[type="color"]').value;
                const pos = group.querySelector('input[type="number"]').value + "%";
                stops.push(`${color} ${pos}`);
            });

            let gradientCSS;
            if (direction === 'radial') {
                gradientCSS = `radial-gradient(circle, ${stops.join(', ')})`;
            } else {
                gradientCSS = `linear-gradient(${direction}, ${stops.join(', ')})`;
            }

            const preview = document.getElementById('gradientPreview');
            preview.style.background = gradientCSS;
            document.getElementById('gradientCSS').textContent = `background: ${gradientCSS};`;
        }

        function addGradientStop() {
            const stopsContainer = document.getElementById('gradientStops');
            const newStop = document.createElement('div');
            newStop.className = 'color-input-group';
            newStop.innerHTML = `
        <label>Stop:</label>
        <input type="color" value="#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}">
        <input type="number" value="50" min="0" max="100" step="1">%
        <button type="button" class="remove-stop">❌</button>
    `;

            newStop.querySelector('.remove-stop').addEventListener('click', () => {
                newStop.remove();
                generateAdvancedGradient();
            });

            stopsContainer.appendChild(newStop);
        }

        document.addEventListener("DOMContentLoaded", () => {
            document.getElementById("generateGradientBtn").addEventListener("click", generateAdvancedGradient);
            document.getElementById("addStopBtn").addEventListener("click", addGradientStop);
        });



        // 🎯 Color Harmonies ======================= START

        function generateHarmony() {
            let baseColor = document.getElementById('harmonyBaseColor').value;
            const harmonyType = document.getElementById('harmonyType').value;
            const dominance = document.getElementById('dominance').value;

            const rgb = hexToRgb(baseColor);
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

            let palette = [];
            let ratios = [];

            switch (harmonyType) {
                case 'complementary':
                    palette = [baseColor, hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l)];
                    ratios = dominance === "balanced" ? [50, 50] : [65, 35];
                    break;

                case 'split':
                    palette = [
                        baseColor,
                        hslToHex((hsl.h + 150) % 360, hsl.s, hsl.l),
                        hslToHex((hsl.h + 210) % 360, hsl.s, hsl.l)
                    ];
                    ratios = dominance === "balanced" ? [33, 33, 33] : [60, 30, 10];
                    break;

                case 'analogous':
                    palette = [
                        hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
                        baseColor,
                        hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l)
                    ];
                    ratios = dominance === "balanced" ? [33, 33, 33] : [60, 30, 10];
                    break;

                case 'triadic':
                    palette = [
                        baseColor,
                        hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
                        hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l)
                    ];
                    ratios = dominance === "balanced" ? [33, 33, 33] : [60, 30, 10];
                    break;

                case 'analogous-complementary':
                    palette = [
                        hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
                        baseColor,
                        hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
                        hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l)
                    ];
                    ratios = dominance === "balanced" ? [25, 25, 25, 25] : [55, 35, 10, 10];
                    break;

                case 'tetradic':
                case 'square':
                    palette = [
                        baseColor,
                        hslToHex((hsl.h + 90) % 360, hsl.s, hsl.l),
                        hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
                        hslToHex((hsl.h + 270) % 360, hsl.s, hsl.l)
                    ];
                    ratios = dominance === "balanced" ? [25, 25, 25, 25] : [55, 35, 10, 10];
                    break;

                default:
                    palette = [baseColor];
                    ratios = [100];
            }

            displayPalette(palette, ratios, 'harmonyPalette');
        }

        // Display Palette as bar chart
        function displayPalette(palette, ratios, containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;
            container.innerHTML = '';

            // Total ratio ka sum (safety ke liye)
            const total = ratios.reduce((a, b) => a + b, 0);

            // Row layout → sab bars ek hi line me
            container.style.display = "flex";
            container.style.flexDirection = "row";
            container.style.height = "450px"; // bar ki height fix

            palette.forEach((color, i) => {
                const block = document.createElement('div');
                block.className = 'harmony-bar-block';
                block.style.backgroundColor = color;

                // width ratio ke hisaab se
                const widthPercent = (ratios[i] / total) * 100;
                block.style.width = widthPercent + "%";
                block.style.height = "430px"; // sab bars ki height equal

                // label overlay (andar show hoga)
                block.innerHTML = `<div class="harmony-bar-label">${ratios[i]}%</div>`;

                block.onclick = () => {
                    copyToClipboard(color.toUpperCase());
                    showToast(`Copied: ${color.toUpperCase()}`);
                };

                container.appendChild(block);
            });
        }


        // Utility: Copy + Toast
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).catch(() => { });
        }
        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2500);
        }

        // Color conversion helpers
        function hexToRgb(hex) {
            const bigint = parseInt(hex.slice(1), 16);
            return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
        }
        function rgbToHsl(r, g, b) {
            r /= 255; g /= 255; b /= 255;
            let max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;
            if (max === min) { h = s = 0; }
            else {
                let d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h = Math.round(h * 60);
            }
            return { h: h, s: s * 100, l: l * 100 };
        }
        function hslToHex(h, s, l) {
            s /= 100; l /= 100;
            let c = (1 - Math.abs(2 * l - 1)) * s;
            let x = c * (1 - Math.abs((h / 60) % 2 - 1));
            let m = l - c / 2;
            let r = 0, g = 0, b = 0;
            if (h < 60) { r = c; g = x; b = 0; }
            else if (h < 120) { r = x; g = c; b = 0; }
            else if (h < 180) { r = 0; g = c; b = x; }
            else if (h < 240) { r = 0; g = x; b = c; }
            else if (h < 300) { r = c; g = 0; b = x; }
            else { r = x; g = 0; b = c; }
            r = Math.round((r + m) * 255);
            g = Math.round((g + m) * 255);
            b = Math.round((b + m) * 255);
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }

        // 🎯 Color Harmonies ======================= END





        // ♿ Accessibility Contrast Checker ======================= START

        function checkContrast() {
            const fg = document.getElementById('foregroundColor').value;
            const bg = document.getElementById('backgroundColor').value;
            const fgRgb = hexToRgb(fg);
            const bgRgb = hexToRgb(bg);
            const contrast = calculateContrastRatio(fgRgb, bgRgb);

            const preview = document.getElementById('contrastPreview');
            preview.style.color = fg;
            preview.style.backgroundColor = bg;
            preview.textContent = `Sample text with ${contrast.toFixed(2)}:1 contrast ratio`;

            document.getElementById('contrastRatio').textContent = `${contrast.toFixed(2)}:1`;
            updateAccessibilityBadges(contrast);
        }

        function calculateContrastRatio(rgb1, rgb2) {
            const l1 = getRelativeLuminance(rgb1);
            const l2 = getRelativeLuminance(rgb2);
            const lighter = Math.max(l1, l2);
            const darker = Math.min(l1, l2);
            return (lighter + 0.05) / (darker + 0.05);
        }

        function getRelativeLuminance(rgb) {
            const rsRGB = rgb.r / 255;
            const gsRGB = rgb.g / 255;
            const bsRGB = rgb.b / 255;

            const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
            const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
            const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        }

        function hexToRgb(hex) {
            const bigint = parseInt(hex.slice(1), 16);
            return {
                r: (bigint >> 16) & 255,
                g: (bigint >> 8) & 255,
                b: bigint & 255
            };
        }

        function updateAccessibilityBadges(contrast) {
            const badges = {
                normalText: { element: document.getElementById('normalText'), threshold: 4.5 },
                largeText: { element: document.getElementById('largeText'), threshold: 3 },
                normalTextAAA: { element: document.getElementById('normalTextAAA'), threshold: 7 },
                largeTextAAA: { element: document.getElementById('largeTextAAA'), threshold: 4.5 }
            };

            Object.values(badges).forEach(badge => {
                const passes = contrast >= badge.threshold;
                badge.element.className = `accessibility-badge ${passes ? 'pass' : 'fail'}`;
                badge.element.children[1].textContent = passes ?
                    (badge.element.id.includes('AAA') ? 'AAA ✓' : 'AA ✓') :
                    (badge.element.id.includes('AAA') ? 'AAA ✗' : 'AA ✗');
            });
        }

        // ♿ Accessibility Contrast Checker ======================= END


        // ======================= 🖌️ Image Color Extractor =======================


        document.addEventListener('DOMContentLoaded', () => {
            function rgbToHex(r, g, b) { return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase(); }
            function copyToClipboard(t) { navigator.clipboard.writeText(t).then(() => showToast); }
            // Global Toast Function
            function showToast(message, type = 'info') {
                const toast = document.createElement('div');
                toast.className = 'toast';
                toast.textContent = message;
                // Add type styling
                if (type === 'success') toast.style.background = '#38a169';
                else if (type === 'error') toast.style.background = '#e53e3e';
                else toast.style.background = '#222';
                document.body.appendChild(toast);
                setTimeout(() => toast.classList.add('show'), 100);
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => toast.remove(), 300);
                }, 2500);
            }

            let currentPalette = [];
            let uploadedImage = null;
            const imageUpload = document.getElementById('imageUpload');
            const imageUploadBox = document.getElementById('imageUploadBox');
            const imageCanvas = document.getElementById('imageCanvas');
            const canvasCtx = imageCanvas.getContext('2d');

            imageUploadBox.addEventListener('click', () => imageUpload.click());

            // Add drag and drop functionality
            imageUploadBox.addEventListener('dragover', (e) => {
                e.preventDefault();
                imageUploadBox.style.borderColor = '#667eea';
            });

            imageUploadBox.addEventListener('dragleave', (e) => {
                e.preventDefault();
                imageUploadBox.style.borderColor = '#764ba2';
            });

            imageUploadBox.addEventListener('drop', (e) => {
                e.preventDefault();
                imageUploadBox.style.borderColor = '#764ba2';
                const file = e.dataTransfer.files[0];
                if (file) {
                    processImageFile(file);
                }
            });

            imageUpload.addEventListener('change', e => {
                const file = e.target.files[0];
                if (file) {
                    processImageFile(file);
                }
            });

            function processImageFile(file) {
                if (!file.type.startsWith('image/')) {
                    showToast('⚠️ Please select an image file', 'error');
                    return;
                }
                if (file.size > 5 * 1024 * 1024) {
                    showToast('⚠️ File too large (max 5MB)', 'error');
                    return;
                }

                const reader = new FileReader();
                reader.onload = function (ev) {
                    const img = new Image();
                    img.onload = function () {
                        // Show canvas
                        imageCanvas.style.display = "block";

                        // Calculate proper dimensions
                        const maxWidth = 600;
                        const maxHeight = 400;
                        let { width, height } = img;

                        // Scale down if too large
                        if (width > maxWidth || height > maxHeight) {
                            const ratio = Math.min(maxWidth / width, maxHeight / height);
                            width = Math.floor(width * ratio);
                            height = Math.floor(height * ratio);
                        }

                        // Set canvas size
                        imageCanvas.width = width;
                        imageCanvas.height = height;

                        // Clear and draw image
                        canvasCtx.clearRect(0, 0, width, height);
                        canvasCtx.drawImage(img, 0, 0, width, height);

                        uploadedImage = img;
                        showToast("✅ Image loaded! Click to pick colors or extract all.", 'success');
                    };
                    img.onerror = () => showToast('⚠️ Failed to load image', 'error');
                    img.src = ev.target.result;
                };
                reader.onerror = () => showToast('⚠️ Failed to read file', 'error');
                reader.readAsDataURL(file);
            }

            imageCanvas.addEventListener('click', e => {
                if (!uploadedImage) {
                    showToast('⚠️ Please upload an image first', 'error');
                    return;
                }

                const rect = imageCanvas.getBoundingClientRect();
                const x = Math.floor((e.clientX - rect.left) * (imageCanvas.width / rect.width));
                const y = Math.floor((e.clientY - rect.top) * (imageCanvas.height / rect.height));

                // Make sure coordinates are within bounds
                if (x >= 0 && x < imageCanvas.width && y >= 0 && y < imageCanvas.height) {
                    const pixel = canvasCtx.getImageData(x, y, 1, 1).data;
                    const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);

                    if (!currentPalette.includes(hex)) {
                        currentPalette.push(hex);
                        renderPalette();
                        showToast(`🎨 Added ${hex}`, 'success');
                    } else {
                        showToast(`🎨 ${hex} already in palette`, 'info');
                    }
                }
            });

            function renderPalette() {
                const div = document.getElementById('extractedPalette');
                div.innerHTML = '';

                currentPalette.forEach((hex, index) => {
                    const colorDiv = document.createElement('div');
                    colorDiv.className = 'palette-color';
                    colorDiv.style.backgroundColor = hex;
                    colorDiv.textContent = hex;
                    colorDiv.title = `Click to copy ${hex}`;
                    colorDiv.onclick = () => {
                        copyToClipboard(hex);
                        showToast(`📋 Copied ${hex}`, 'success');
                    };
                    div.appendChild(colorDiv);
                });
            }

            function extractAllColors(maxColors = 20) {
                if (!uploadedImage) {
                    showToast("⚠️ Please upload an image first", 'error');
                    return;
                }

                try {
                    // Get image data
                    const imageData = canvasCtx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
                    const data = imageData.data;
                    const colorMap = new Map();

                    // Better sampling - every 2nd pixel for more accurate color detection
                    const totalPixels = data.length / 4;
                    const step = Math.max(1, Math.floor(totalPixels / 15000)); // Sample up to 15k pixels

                    for (let i = 0; i < data.length; i += 4 * step) {
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];
                        const a = data[i + 3];

                        // Skip transparent pixels
                        if (a < 100) continue;

                        // Human eye perception - use smaller grouping for natural colors
                        const roundedR = Math.round(r / 8) * 8; // More precise color grouping
                        const roundedG = Math.round(g / 8) * 8;
                        const roundedB = Math.round(b / 8) * 8;

                        const hex = rgbToHex(roundedR, roundedG, roundedB);

                        // Better brightness filtering for human-visible colors
                        const brightness = (roundedR * 0.299 + roundedG * 0.587 + roundedB * 0.114); // Human eye luminance
                        if (brightness < 15 || brightness > 240) continue;

                        // Calculate color saturation to prefer vibrant colors
                        const max = Math.max(roundedR, roundedG, roundedB);
                        const min = Math.min(roundedR, roundedG, roundedB);
                        const saturation = max === 0 ? 0 : (max - min) / max;

                        // Weight colors by saturation and frequency
                        const weight = saturation > 0.1 ? 2 : 1; // Prefer more saturated colors
                        colorMap.set(hex, (colorMap.get(hex) || 0) + weight);
                    }

                    if (colorMap.size === 0) {
                        showToast('⚠️ No distinct colors found in image', 'error');
                        return;
                    }

                    // Enhanced color sorting - prefer diverse and vibrant colors
                    const sortedColors = Array.from(colorMap.entries())
                        .sort((a, b) => {
                            // Sort by weighted frequency
                            return b[1] - a[1];
                        })
                        .map(entry => entry[0])
                        .filter(hex => hex && hex.length === 7 && hex.startsWith('#')); // Extra validation

                    // Smart color selection - avoid too similar colors
                    const selectedColors = [];
                    for (const color of sortedColors) {
                        if (selectedColors.length >= maxColors) break;

                        // Check if this color is too similar to already selected colors
                        const isSimilar = selectedColors.some(existingColor => {
                            const rgb1 = hexToRgb(color);
                            const rgb2 = hexToRgb(existingColor);
                            const distance = Math.sqrt(
                                Math.pow(rgb1.r - rgb2.r, 2) +
                                Math.pow(rgb1.g - rgb2.g, 2) +
                                Math.pow(rgb1.b - rgb2.b, 2)
                            );
                            return distance < 40; // Minimum color distance threshold
                        });

                        if (!isSimilar) {
                            selectedColors.push(color);
                        }
                    }

                    // Add new colors to palette (avoid duplicates)
                    const newColors = selectedColors.filter(color => !currentPalette.includes(color));
                    currentPalette = [...currentPalette, ...newColors];

                    renderPalette();
                    showToast(`🎨 Extracted ${newColors.length} distinct natural colors`, 'success');

                } catch (error) {
                    console.error('Error extracting colors:', error);
                    showToast('⚠️ Error extracting colors', 'error');
                }
            }

            // Helper function to convert hex to RGB - more robust
            function hexToRgb(hex) {
                // Remove # if present and ensure valid hex
                hex = hex.replace('#', '');

                // Validate hex format
                if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
                    console.warn('Invalid hex color:', hex);
                    return null;
                }

                return {
                    r: parseInt(hex.substring(0, 2), 16),
                    g: parseInt(hex.substring(2, 4), 16),
                    b: parseInt(hex.substring(4, 6), 16)
                };
            }

            // Event listeners
            document.getElementById('extractAllColorsBtn').onclick = extractAllColors;

            document.getElementById('exportJSONBtn').onclick = () => {
                if (!currentPalette.length) {
                    showToast('⚠️ No colors in palette', 'error');
                    return;
                }
                const blob = new Blob([JSON.stringify(currentPalette, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'color-palette.json';
                a.click();
                URL.revokeObjectURL(url);
                showToast('📁 JSON exported', 'success');
            };

            document.getElementById('exportCSSBtn').onclick = () => {
                if (!currentPalette.length) {
                    showToast('⚠️ No colors in palette', 'error');
                    return;
                }
                let css = ':root {\n';
                currentPalette.forEach((color, i) => css += `  --color-${i + 1}: ${color};\n`);
                css += '}';

                const blob = new Blob([css], { type: 'text/css' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'color-palette.css';
                a.click();
                URL.revokeObjectURL(url);
                showToast('📁 CSS exported', 'success');
            };

            document.getElementById('copyHEXBtn').onclick = () => {
                if (!currentPalette.length) {
                    showToast('⚠️ No colors in palette', 'error');
                    return;
                }
                copyToClipboard(currentPalette.join('\n'));
                showToast('📋 All colors copied', 'success');
            };

            document.getElementById('clearPaletteBtn').onclick = () => {
                currentPalette = [];
                renderPalette();

                // Reset upload box to original state
                imageCanvas.style.display = 'none';
                imageUploadBox.classList.remove('has-image');
                canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
                uploadedImage = null;
                imageUpload.value = '';

                showToast('🗑️ Palette cleared & image removed', 'info');
            };
        });





        // ======================= 🎨 Name That Color =======================
        // Convert RGB to HEX
        function rgbToHex(r, g, b) {
            return "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("").toUpperCase();
        }
        function hexToRgb(hex) {
            hex = hex.replace("#", "");
            if (hex.length === 3) hex = hex.split("").map(h => h + h).join("");
            const bigint = parseInt(hex, 16);
            return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
        }
        function parseColorInput(input) {
            input = input.trim(); let rgb = null;
            if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(input)) rgb = hexToRgb(input);
            else if (/^rgba?\(/.test(input)) {
                const vals = input.replace(/rgba?\(|\)/g, "").split(",").map(v => parseInt(v.trim()));
                if (vals.length >= 3) rgb = { r: vals[0], g: vals[1], b: vals[2] };
            }
            return rgb;
        }
        function colorDistance(c1, c2) { return Math.sqrt((c1.r - c2.r) ** 2 + (c1.g - c2.g) ** 2 + (c1.b - c2.b) ** 2); }

        // HSL conversion
        function rgbToHsl(r, g, b) {
            r /= 255; g /= 255; b /= 255;
            let max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;
            if (max === min) { h = s = 0; } else {
                let d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) { case r: h = (g - b) / d + (g < b ? 6 : 0); break; case g: h = (b - r) / d + 2; break; case b: h = (r - g) / d + 4; break; }
                h = Math.round(h * 60);
            }
            return { h: h, s: Math.round(s * 100), l: Math.round(l * 100) };
        }
        // HSV
        function rgbToHsv(r, g, b) {
            r /= 255; g /= 255; b /= 255;
            let max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
            let h, s, v = max, sat = max === 0 ? 0 : d / max;
            if (max === min) { h = 0; } else {
                switch (max) { case r: h = (g - b) / d + (g < b ? 6 : 0); break; case g: h = (b - r) / d + 2; break; case b: h = (r - g) / d + 4; break; }
                h = Math.round(h * 60);
            }
            return { h: h, s: Math.round(s * 100), v: Math.round(v * 100) };
        }
        // CMYK
        function rgbToCmyk(r, g, b) {
            let c = 1 - r / 255, m = 1 - g / 255, y = 1 - b / 255;
            let k = Math.min(c, m, y);
            if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
            return {
                c: Math.round((c - k) / (1 - k) * 100),
                m: Math.round((m - k) / (1 - k) * 100),
                y: Math.round((y - k) / (1 - k) * 100),
                k: Math.round(k * 100)
            };
        }
        // Contrast
        function luminance(r, g, b) {
            let a = [r, g, b].map(v => {
                v /= 255;
                return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
            });
            return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
        }
        function contrastRatio(c1, c2) {
            const l1 = luminance(c1.r, c1.g, c1.b), l2 = luminance(c2.r, c2.g, c2.b);
            return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        }

        // ======= CSS Colors List (147 Named Colors) =======
        const cssColors = [
            { name: "aliceblue", friendly: "Alice Blue", hex: "#F0F8FF" },
            { name: "antiquewhite", friendly: "Antique White", hex: "#FAEBD7" },
            { name: "aqua", friendly: "Aqua", hex: "#00FFFF" },
            { name: "aquamarine", friendly: "Aquamarine", hex: "#7FFFD4" },
            { name: "azure", friendly: "Azure", hex: "#F0FFFF" },
            { name: "beige", friendly: "Beige", hex: "#F5F5DC" },
            { name: "bisque", friendly: "Bisque", hex: "#FFE4C4" },
            { name: "black", friendly: "Black", hex: "#000000" },
            { name: "blanchedalmond", friendly: "Blanched Almond", hex: "#FFEBCD" },
            { name: "blue", friendly: "Blue", hex: "#0000FF" },
            { name: "blueviolet", friendly: "Blue Violet", hex: "#8A2BE2" },
            { name: "brown", friendly: "Brown", hex: "#A52A2A" },
            { name: "burlywood", friendly: "Burly Wood", hex: "#DEB887" },
            { name: "cadetblue", friendly: "Cadet Blue", hex: "#5F9EA0" },
            { name: "chartreuse", friendly: "Chartreuse", hex: "#7FFF00" },
            { name: "chocolate", friendly: "Chocolate", hex: "#D2691E" },
            { name: "coral", friendly: "Coral", hex: "#FF7F50" },
            { name: "cornflowerblue", friendly: "Cornflower Blue", hex: "#6495ED" },
            { name: "cornsilk", friendly: "Cornsilk", hex: "#FFF8DC" },
            { name: "crimson", friendly: "Crimson", hex: "#DC143C" },
            { name: "cyan", friendly: "Cyan", hex: "#00FFFF" },
            { name: "darkblue", friendly: "Dark Blue", hex: "#00008B" },
            { name: "darkcyan", friendly: "Dark Cyan", hex: "#008B8B" },
            { name: "darkgoldenrod", friendly: "Dark Goldenrod", hex: "#B8860B" },
            { name: "darkgray", friendly: "Dark Gray", hex: "#A9A9A9" },
            { name: "darkgreen", friendly: "Dark Green", hex: "#006400" },
            { name: "darkgrey", friendly: "Dark Grey", hex: "#A9A9A9" },
            { name: "darkkhaki", friendly: "Dark Khaki", hex: "#BDB76B" },
            { name: "darkmagenta", friendly: "Dark Magenta", hex: "#8B008B" },
            { name: "darkolivegreen", friendly: "Dark Olive Green", hex: "#556B2F" },
            { name: "darkorange", friendly: "Dark Orange", hex: "#FF8C00" },
            { name: "darkorchid", friendly: "Dark Orchid", hex: "#9932CC" },
            { name: "darkred", friendly: "Dark Red", hex: "#8B0000" },
            { name: "darksalmon", friendly: "Dark Salmon", hex: "#E9967A" },
            { name: "darkseagreen", friendly: "Dark Sea Green", hex: "#8FBC8F" },
            { name: "darkslateblue", friendly: "Dark Slate Blue", hex: "#483D8B" },
            { name: "darkslategray", friendly: "Dark Slate Gray", hex: "#2F4F4F" },
            { name: "darkslategrey", friendly: "Dark Slate Grey", hex: "#2F4F4F" },
            { name: "darkturquoise", friendly: "Dark Turquoise", hex: "#00CED1" },
            { name: "darkviolet", friendly: "Dark Violet", hex: "#9400D3" },
            { name: "deeppink", friendly: "Deep Pink", hex: "#FF1493" },
            { name: "deepskyblue", friendly: "Deep Sky Blue", hex: "#00BFFF" },
            { name: "dimgray", friendly: "Dim Gray", hex: "#696969" },
            { name: "dimgrey", friendly: "Dim Grey", hex: "#696969" },
            { name: "dodgerblue", friendly: "Dodger Blue", hex: "#1E90FF" },
            { name: "firebrick", friendly: "Firebrick", hex: "#B22222" },
            { name: "floralwhite", friendly: "Floral White", hex: "#FFFAF0" },
            { name: "forestgreen", friendly: "Forest Green", hex: "#228B22" },
            { name: "fuchsia", friendly: "Fuchsia", hex: "#FF00FF" },
            { name: "gainsboro", friendly: "Gainsboro", hex: "#DCDCDC" },
            { name: "ghostwhite", friendly: "Ghost White", hex: "#F8F8FF" },
            { name: "gold", friendly: "Gold", hex: "#FFD700" },
            { name: "goldenrod", friendly: "Goldenrod", hex: "#DAA520" },
            { name: "gray", friendly: "Gray", hex: "#808080" },
            { name: "green", friendly: "Green", hex: "#008000" },
            { name: "greenyellow", friendly: "Green Yellow", hex: "#ADFF2F" },
            { name: "grey", friendly: "Grey", hex: "#808080" },
            { name: "honeydew", friendly: "Honeydew", hex: "#F0FFF0" },
            { name: "hotpink", friendly: "Hot Pink", hex: "#FF69B4" },
            { name: "indianred", friendly: "Indian Red", hex: "#CD5C5C" },
            { name: "indigo", friendly: "Indigo", hex: "#4B0082" },
            { name: "ivory", friendly: "Ivory", hex: "#FFFFF0" },
            { name: "khaki", friendly: "Khaki", hex: "#F0E68C" },
            { name: "lavender", friendly: "Lavender", hex: "#E6E6FA" },
            { name: "lavenderblush", friendly: "Lavender Blush", hex: "#FFF0F5" },
            { name: "lawngreen", friendly: "Lawn Green", hex: "#7CFC00" },
            { name: "lemonchiffon", friendly: "Lemon Chiffon", hex: "#FFFACD" },
            { name: "lightblue", friendly: "Light Blue", hex: "#ADD8E6" },
            { name: "lightcoral", friendly: "Light Coral", hex: "#F08080" },
            { name: "lightcyan", friendly: "Light Cyan", hex: "#E0FFFF" },
            { name: "lightgoldenrodyellow", friendly: "Light Goldenrod Yellow", hex: "#FAFAD2" },
            { name: "lightgray", friendly: "Light Gray", hex: "#D3D3D3" },
            { name: "lightgreen", friendly: "Light Green", hex: "#90EE90" },
            { name: "lightgrey", friendly: "Light Grey", hex: "#D3D3D3" },
            { name: "lightpink", friendly: "Light Pink", hex: "#FFB6C1" },
            { name: "lightsalmon", friendly: "Light Salmon", hex: "#FFA07A" },
            { name: "lightseagreen", friendly: "Light Sea Green", hex: "#20B2AA" },
            { name: "lightskyblue", friendly: "Light Sky Blue", hex: "#87CEFA" },
            { name: "lightslategray", friendly: "Light Slate Gray", hex: "#778899" },
            { name: "lightslategrey", friendly: "Light Slate Grey", hex: "#778899" },
            { name: "lightsteelblue", friendly: "Light Steel Blue", hex: "#B0C4DE" },
            { name: "lightyellow", friendly: "Light Yellow", hex: "#FFFFE0" },
            { name: "lime", friendly: "Lime", hex: "#00FF00" },
            { name: "limegreen", friendly: "Lime Green", hex: "#32CD32" },
            { name: "linen", friendly: "Linen", hex: "#FAF0E6" },
            { name: "magenta", friendly: "Magenta", hex: "#FF00FF" },
            { name: "maroon", friendly: "Maroon", hex: "#800000" },
            { name: "mediumaquamarine", friendly: "Medium Aquamarine", hex: "#66CDAA" },
            { name: "mediumblue", friendly: "Medium Blue", hex: "#0000CD" },
            { name: "mediumorchid", friendly: "Medium Orchid", hex: "#BA55D3" },
            { name: "mediumpurple", friendly: "Medium Purple", hex: "#9370DB" },
            { name: "mediumseagreen", friendly: "Medium Sea Green", hex: "#3CB371" },
            { name: "mediumslateblue", friendly: "Medium Slate Blue", hex: "#7B68EE" },
            { name: "mediumspringgreen", friendly: "Medium Spring Green", hex: "#00FA9A" },
            { name: "mediumturquoise", friendly: "Medium Turquoise", hex: "#48D1CC" },
            { name: "mediumvioletred", friendly: "Medium Violet Red", hex: "#C71585" },
            { name: "midnightblue", friendly: "Midnight Blue", hex: "#191970" },
            { name: "mintcream", friendly: "Mint Cream", hex: "#F5FFFA" },
            { name: "mistyrose", friendly: "Misty Rose", hex: "#FFE4E1" },
            { name: "moccasin", friendly: "Moccasin", hex: "#FFE4B5" },
            { name: "navajowhite", friendly: "Navajo White", hex: "#FFDEAD" },
            { name: "navy", friendly: "Navy", hex: "#000080" },
            { name: "oldlace", friendly: "Old Lace", hex: "#FDF5E6" },
            { name: "olive", friendly: "Olive", hex: "#808000" },
            { name: "olivedrab", friendly: "Olive Drab", hex: "#6B8E23" },
            { name: "orange", friendly: "Orange", hex: "#FFA500" },
            { name: "orangered", friendly: "Orange Red", hex: "#FF4500" },
            { name: "orchid", friendly: "Orchid", hex: "#DA70D6" },
            { name: "palegoldenrod", friendly: "Pale Goldenrod", hex: "#EEE8AA" },
            { name: "palegreen", friendly: "Pale Green", hex: "#98FB98" },
            { name: "paleturquoise", friendly: "Pale Turquoise", hex: "#AFEEEE" },
            { name: "palevioletred", friendly: "Pale Violet Red", hex: "#DB7093" },
            { name: "papayawhip", friendly: "Papaya Whip", hex: "#FFEFD5" },
            { name: "peachpuff", friendly: "Peach Puff", hex: "#FFDAB9" },
            { name: "peru", friendly: "Peru", hex: "#CD853F" },
            { name: "pink", friendly: "Pink", hex: "#FFC0CB" },
            { name: "plum", friendly: "Plum", hex: "#DDA0DD" },
            { name: "powderblue", friendly: "Powder Blue", hex: "#B0E0E6" },
            { name: "purple", friendly: "Purple", hex: "#800080" },
            { name: "rebeccapurple", friendly: "Rebecca Purple", hex: "#663399" },
            { name: "red", friendly: "Red", hex: "#FF0000" },
            { name: "rosybrown", friendly: "Rosy Brown", hex: "#BC8F8F" },
            { name: "royalblue", friendly: "Royal Blue", hex: "#4169E1" },
            { name: "saddlebrown", friendly: "Saddle Brown", hex: "#8B4513" },
            { name: "salmon", friendly: "Salmon", hex: "#FA8072" },
            { name: "sandybrown", friendly: "Sandy Brown", hex: "#F4A460" },
            { name: "seagreen", friendly: "Sea Green", hex: "#2E8B57" },
            { name: "seashell", friendly: "Seashell", hex: "#FFF5EE" },
            { name: "sienna", friendly: "Sienna", hex: "#A0522D" },
            { name: "silver", friendly: "Silver", hex: "#C0C0C0" },
            { name: "skyblue", friendly: "Sky Blue", hex: "#87CEEB" },
            { name: "slateblue", friendly: "Slate Blue", hex: "#6A5ACD" },
            { name: "slategray", friendly: "Slate Gray", hex: "#708090" },
            { name: "slategrey", friendly: "Slate Grey", hex: "#708090" },
            { name: "snow", friendly: "Snow", hex: "#FFFAFA" },
            { name: "springgreen", friendly: "Spring Green", hex: "#00FF7F" },
            { name: "steelblue", friendly: "Steel Blue", hex: "#4682B4" },
            { name: "tan", friendly: "Tan", hex: "#D2B48C" },
            { name: "teal", friendly: "Teal", hex: "#008080" },
            { name: "thistle", friendly: "Thistle", hex: "#D8BFD8" },
            { name: "tomato", friendly: "Tomato", hex: "#FF6347" },
            { name: "turquoise", friendly: "Turquoise", hex: "#40E0D0" },
            { name: "violet", friendly: "Violet", hex: "#EE82EE" },
            { name: "wheat", friendly: "Wheat", hex: "#F5DEB3" },
            { name: "white", friendly: "White", hex: "#FFFFFF" },
            { name: "whitesmoke", friendly: "White Smoke", hex: "#F5F5F5" },
            { name: "yellow", friendly: "Yellow", hex: "#FFFF00" },
            { name: "yellowgreen", friendly: "Yellow Green", hex: "#9ACD32" }
        ];

        // Find closest
        function findClosestColor(rgb) {
            let minDist = Infinity, closest = null;
            cssColors.forEach(c => {
                const dist = colorDistance(rgb, hexToRgb(c.hex));
                if (dist < minDist) { minDist = dist; closest = c; }
            });
            return closest;
        }

        // ======= DOM Elements =======
        const colorInput = document.getElementById("colorInput");
        const swatch = document.getElementById("colorSwatch");
        const hexValue = document.getElementById("hexValue");
        const rgbValue = document.getElementById("rgbValue");
        const hslValue = document.getElementById("hslValue");
        const hsvValue = document.getElementById("hsvValue");
        const cmykValue = document.getElementById("cmykValue");
        const cssName = document.getElementById("cssName");
        const friendlyName = document.getElementById("friendlyName");
        const contrastInfo = document.getElementById("contrastInfo");
        const previewWhite = document.getElementById("previewWhite");
        const previewBlack = document.getElementById("previewBlack");
        const copyBtn = document.getElementById("copyColorBtn");
        const colorPickerBtn = document.getElementById("colorPickerBtn");
        const similarColorsDiv = document.getElementById("similarColors");

        // ======= Update Display =======
        function updateColorDisplay(rgb, closest) {
            const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
            swatch.style.backgroundColor = hex;
            hexValue.textContent = `HEX: ${hex}`;
            rgbValue.textContent = `RGB: rgb(${rgb.r},${rgb.g},${rgb.b})`;

            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
            const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

            hslValue.textContent = `HSL: hsl(${hsl.h},${hsl.s}%,${hsl.l}%)`;
            hsvValue.textContent = `HSV: hsv(${hsv.h},${hsv.s}%,${hsv.v}%)`;
            cmykValue.textContent = `CMYK: ${cmyk.c}%,${cmyk.m}%,${cmyk.y}%,${cmyk.k}%`;

            cssName.textContent = `CSS Name: ${closest.name}`;
            friendlyName.textContent = `Friendly Name: ${closest.friendly}`;

            // Contrast
            const white = { r: 255, g: 255, b: 255 }, black = { r: 0, g: 0, b: 0 };
            const contrastW = contrastRatio(rgb, white), contrastB = contrastRatio(rgb, black);
            const best = contrastW > contrastB ? "White Text" : "Black Text";
            contrastInfo.textContent = `Best Contrast: ${best}`;

            previewWhite.style.backgroundColor = hex;
            previewWhite.style.color = "white";
            previewBlack.style.backgroundColor = hex;
            previewBlack.style.color = "black";

            // Similar colors
            similarColorsDiv.innerHTML = "";
            const sorted = cssColors.map(c => ({ ...c, dist: colorDistance(rgb, hexToRgb(c.hex)) }))
                .sort((a, b) => a.dist - b.dist)
                .slice(1, 4);
            sorted.forEach(c => {
                const div = document.createElement("div");
                div.className = "similar-color-swatch";
                div.style.backgroundColor = c.hex;
                div.title = `${c.friendly} (${c.hex})`;
                similarColorsDiv.appendChild(div);
            });
        }

        // ======= Events =======
        function handleInput() {
            const rgb = parseColorInput(colorInput.value);
            if (!rgb) { alert("Invalid format! Use HEX (#FFF or #FFFFFF) or RGB."); return; }
            const closest = findClosestColor(rgb);
            updateColorDisplay(rgb, closest);
        }
        colorInput.addEventListener("keydown", e => { if (e.key === "Enter") handleInput(); });
        colorPickerBtn.addEventListener("click", handleInput);
        copyBtn.addEventListener("click", () => {
            // Prefer copying the HEX value, fallback to RGB if not found
            var hex = document.getElementById("hexValue");
            var rgb = document.getElementById("rgbValue");
            var toCopy = hex ? hex.textContent.replace("HEX: ", "") : "";
            if (!toCopy && rgb) toCopy = rgb.textContent.replace("RGB: ", "");
            if (toCopy) {
                navigator.clipboard.writeText(toCopy).then(() => {
                    showToast("Copied: " + toCopy);
                }).catch(err => {
                    showToast("Failed to copy color!");
                    console.error(err);
                });
            } else {
                showToast("Nothing to copy!");
            }
        });


        // Default load
        document.addEventListener("DOMContentLoaded", () => {
            const rgb = hexToRgb("#764BA2");
            const closest = findClosestColor(rgb);
            updateColorDisplay(rgb, closest);
            colorInput.value = "#764BA2";
        });


        /*=================================================== 🔍 Color Finder by Code ====================================*/
        (function () {
            // Helpers
            function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
            function hexToRgb(hex) {
                if (!hex) return null;
                hex = hex.trim().replace('#', '');
                if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
                if (hex.length !== 6) return null;
                const n = parseInt(hex, 16);
                return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
            }
            function rgbToHex(r, g, b) {
                return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();
            }
            function parseRgbString(s) {
                const m = s.match(/rgba?\s*\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
                if (!m) return null;
                return { r: Math.round(+m[1]), g: Math.round(+m[2]), b: Math.round(+m[3]) };
            }

            // HSL conversions
            function rgbToHsl(r, g, b) {
                r /= 255; g /= 255; b /= 255;
                const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
                let h = 0, s = 0, l = (max + min) / 2;
                if (d !== 0) {
                    s = d / (1 - Math.abs(2 * l - 1));
                    switch (max) {
                        case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
                        case g: h = ((b - r) / d + 2); break;
                        case b: h = ((r - g) / d + 4); break;
                    }
                    h *= 60;
                }
                return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
            }
            function hslToRgb(h, s, l) {
                s /= 100; l /= 100; h /= 360;
                if (s === 0) { const v = Math.round(l * 255); return { r: v, g: v, b: v }; }
                function hue2rgb(p, q, t) {
                    if (t < 0) t += 1; if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                }
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                const r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
                const g = Math.round(hue2rgb(p, q, h) * 255);
                const b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
                return { r, g, b };
            }

            function distanceRgb(a, b) {
                return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
            }

            // UI helpers
            const $ = id => document.getElementById(id);
            // Use global showToast function for all tools
            function copyText(t) {
                navigator.clipboard.writeText(t).then(() => showToast('Copied: ' + t), () => showToast('Copy failed'));
            }

            // Generate shades
            function generateShadesFromRgb(rgb, count, mode) {
                const baseHsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                const shades = [];
                for (let i = 0; i < count; i++) {
                    const t = (i / (count - 1)) * 2 - 1; // -1 → 1
                    const hueShift = (Math.sign(t) * Math.pow(Math.abs(t), 1.1)) * 8;
                    let satAdj = (-t * 18);
                    let lightAdj = (-t * 22);
                    if (mode === 'lightness-only') satAdj = 0;
                    const h = (baseHsl.h + hueShift + 360) % 360;
                    const s = clamp(baseHsl.s + satAdj, 6, 98);
                    const l = clamp(baseHsl.l + lightAdj, 4, 96);
                    const rgbNew = hslToRgb(h, s, l);
                    const hex = rgbToHex(rgbNew.r, rgbNew.g, rgbNew.b);
                    const dist = distanceRgb(rgb, rgbNew);
                    shades.push({ hex, rgb: rgbNew, hsl: { h, s, l }, dist });
                }
                return shades.sort((a, b) => a.dist - b.dist);
            }

            // DOM elements
            const input = $('cfColorInput');
            const picker = $('cfPicker');
            const generateBtn = $('cfGenerate');
            const countEl = $('cfCount');
            const modeEl = $('cfMode');
            const origSwatch = $('cfOriginalSwatch');
            const origHex = $('cfOriginalHex');
            const origRgb = $('cfOriginalRgb');
            const grid = $('cfShadesGrid');
            const paletteRow = $('cfPalette');

            // palette store
            let finderPalette = [];

            // render functions
            function renderOriginal(rgb) {
                const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
                origSwatch.style.background = hex;
                origSwatch.textContent = hex;
                origHex.textContent = 'HEX: ' + hex;
                origRgb.textContent = `RGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            }

            function renderShades(shades) {
                grid.innerHTML = '';
                shades.forEach(s => {
                    const card = document.createElement('div');
                    card.className = 'shade-card';
                    card.setAttribute("data-color", s.hex);

                    const colorDiv = document.createElement('div');
                    colorDiv.className = 'shade-color';
                    colorDiv.style.background = s.hex;

                    const info = document.createElement('div');
                    info.className = 'shade-info';
                    info.innerHTML = `<strong>${s.hex}</strong><div>rgb(${s.rgb.r}, ${s.rgb.g}, ${s.rgb.b})</div>`;

                    card.appendChild(colorDiv);
                    card.appendChild(info);

                    card.addEventListener('click', () => copyText(s.hex));
                    card.addEventListener('dblclick', () => addToPalette(s.hex));

                    grid.appendChild(card);
                });
            }

            function renderPalette() {
                paletteRow.innerHTML = '';
                palette.forEach(hex => {
                    const el = document.createElement('div');
                    el.className = 'palette-color';
                    el.style.background = hex;
                    el.title = hex;
                    el.addEventListener('click', () => copyText(hex));
                    el.addEventListener('contextmenu', e => {
                        e.preventDefault();
                        palette = palette.filter(h => h !== hex);
                        renderPalette();
                    });
                    paletteRow.appendChild(el);
                });
            }

            function addToPalette(hex) {
                if (!palette.includes(hex)) palette.push(hex);
                renderPalette();
                showToast('Added to palette: ' + hex);
            }

            // generate handler
            function handleGenerate() {
                const raw = input.value.trim() || picker.value;
                let rgb = null;
                if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(raw)) rgb = hexToRgb(raw);
                else rgb = parseRgbString(raw);
                if (!rgb) { showToast('Invalid color. Use #HEX or rgb(...)'); return; }
                renderOriginal(rgb);
                const count = Math.max(4, Math.min(48, parseInt(countEl.value) || 12));
                const mode = modeEl ? modeEl.value : 'default';
                const shades = generateShadesFromRgb(rgb, count, mode);
                renderShades(shades);
            }

            // ✅ Export JSON
            function exportJSON() {
                const shades = document.querySelectorAll(".shade-card");
                let data = [];
                shades.forEach(shade => {
                    const color = shade.getAttribute("data-color");
                    if (color) data.push(color);
                });
                if (data.length === 0) return showToast("⚠️ No colors to export.");
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "colors.json";
                a.click();
                URL.revokeObjectURL(url);
                showToast("✅ JSON Exported");
            }

            // ✅ Export CSS Variables
            function exportCSSVars() {
                const shades = document.querySelectorAll(".shade-card");
                let cssVars = ":root {\n";
                shades.forEach((shade, i) => {
                    const color = shade.getAttribute("data-color");
                    if (color) cssVars += `  --color-${i + 1}: ${color};\n`;
                });
                cssVars += "}";
                if (cssVars === ":root {\n}") return showToast("⚠️ No colors to export.");
                const blob = new Blob([cssVars], { type: "text/css" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "colors.css";
                a.click();
                URL.revokeObjectURL(url);
                showToast("✅ CSS Exported");
            }

            // ✅ Copy HEX List
            function copyHEXList() {
                const shades = document.querySelectorAll(".shade-card");
                let hexList = [];
                shades.forEach(shade => {
                    const color = shade.getAttribute("data-color");
                    if (color) hexList.push(color);
                });
                if (hexList.length === 0) return showToast("⚠️ No colors to copy.");
                navigator.clipboard.writeText(hexList.join(", ")).then(() => {
                    showToast("📋 HEX list copied!");
                });
            }

            // ✅ Clear Results
            function clearResults() {
                origSwatch.style.background = "transparent";
                origSwatch.textContent = "";
                origHex.textContent = "";
                origRgb.textContent = "";
                grid.innerHTML = "";
                paletteRow.innerHTML = "";
                palette = [];
                showToast("🧹 Cleared");
            }
            /* ---------- Toast + Copy helpers (reusable) ---------- */
            function showToast(message) {
                let toast = document.getElementById("cfToast");
                if (!toast) {
                    toast = document.createElement("div");
                    toast.id = "cfToast";
                    toast.className = "toast";
                    document.body.appendChild(toast);
                }
                toast.textContent = message;
                toast.classList.add("show");
                // remove show after timeout (match your CSS)
                setTimeout(() => toast.classList.remove("show"), 1800);
            }

            function copyToClipboard(text) {
                // Use navigator.clipboard when available for silent copy + toast
                if (navigator.clipboard && window.isSecureContext) {
                    return navigator.clipboard.writeText(text)
                        .then(() => { showToast("Copied to clipboard!"); })
                        .catch(() => { showToast("Copy failed"); });
                }
                // Fallback: create textarea and execCommand
                try {
                    const ta = document.createElement("textarea");
                    ta.value = text;
                    ta.style.position = "fixed";
                    ta.style.left = "-9999px";
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand("copy");
                    document.body.removeChild(ta);
                    showToast("Copied to clipboard!");
                    return Promise.resolve();
                } catch (e) {
                    showToast("Copy failed");
                    return Promise.reject(e);
                }
            }

            /* ---------- Export JSON (downloads colors from shade cards) ---------- */
            function exportJSON() {
                const shades = document.querySelectorAll(".shade-card");
                const data = [];
                shades.forEach(shade => {
                    const color = shade.getAttribute("data-color") || shade.dataset.color;
                    if (color) data.push(color);
                });
                if (data.length === 0) {
                    showToast("⚠️ No colors to export.");
                    return;
                }
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "colors.json";
                document.body.appendChild(a);
                a.click();
                a.remove();
                // revoke after a tick
                setTimeout(() => URL.revokeObjectURL(url), 500);
                showToast("✅ JSON exported");
            }

            /* ---------- Export CSS Variables (downloads :root vars) ---------- */
            function exportCSSVars() {
                const shades = document.querySelectorAll(".shade-card");
                const vars = [];
                shades.forEach((shade, i) => {
                    const color = shade.getAttribute("data-color") || shade.dataset.color;
                    if (color) vars.push({ index: i + 1, color });
                });
                if (vars.length === 0) {
                    showToast("⚠️ No colors to export.");
                    return;
                }
                let css = ":root {\n";
                vars.forEach(v => {
                    css += `  --color-${v.index}: ${v.color};\n`;
                });
                css += "}\n";
                const blob = new Blob([css], { type: "text/css" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "colors.css";
                document.body.appendChild(a);
                a.click();
                a.remove();
                setTimeout(() => URL.revokeObjectURL(url), 500);
                showToast("✅ CSS variables exported");
            }

            /* ---------- Copy HEX List (copies comma/newline separated list) ---------- */
            function copyHEXList() {
                const shades = document.querySelectorAll(".shade-card");
                const hexList = [];
                shades.forEach(shade => {
                    const color = shade.getAttribute("data-color") || shade.dataset.color;
                    if (color) hexList.push(color);
                });
                if (hexList.length === 0) {
                    showToast("⚠️ No colors to copy.");
                    return;
                }
                // prefer newline-separated (easier to paste), use join(", ") if you prefer commas
                const text = hexList.join("\n");
                copyToClipboard(text).then(() => {
                    /* toast shown by copyToClipboard */
                }).catch(() => {
                    showToast("Copy failed");
                });
            }

            /* ---------- Clear Results (clears original, shades grid and palette) ---------- */
            function clearResults() {
                // original swatch elements (IDs used earlier)
                const origSwatch = document.getElementById("cfOriginalSwatch") || document.getElementById("original-color");
                const origHex = document.getElementById("cfOriginalHex");
                const origRgb = document.getElementById("cfOriginalRgb");

                if (origSwatch) {
                    origSwatch.style.background = "transparent";
                    origSwatch.textContent = "";
                }
                if (origHex) origHex.textContent = "";
                if (origRgb) origRgb.textContent = "";

                // clear shades grid
                const grid = document.getElementById("cfShadesGrid") || document.getElementById("shades");
                if (grid) grid.innerHTML = "";

                // clear palette container
                const palette = document.getElementById("cfPalette") || document.getElementById("palette") || document.getElementById("cfPaletteRow");
                if (palette) palette.innerHTML = "";

                // reset internal palette array if you use one
                if (typeof window.palette !== "undefined") window.palette = [];
                showToast("🧹 Cleared");
            }


            // wire events
            document.addEventListener('DOMContentLoaded', () => {
                input.value = picker.value;
                handleGenerate();

                picker.addEventListener('input', e => {
                    input.value = e.target.value;
                    handleGenerate();
                });
                generateBtn.addEventListener('click', handleGenerate);

                $('cfExportJSON').addEventListener('click', exportJSON);
                $('cfExportCSS').addEventListener('click', exportCSSVars);
                $('cfCopyList').addEventListener('click', copyHEXList);
                $('cfClearPalette').addEventListener('click', clearResults);
            });
        })();

// ================== 🎬 Video/GIF Color Palette Extractor ===========================
const videoUpload = document.getElementById("videoUpload");
const videoPlayer = document.getElementById("videoPreview");
const captureBtn = document.getElementById("captureFrame");
const canvas = document.getElementById("videoCanvas");
let ctx = null;
if (canvas) {
    ctx = canvas.getContext("2d");
} else {
    console.error("videoCanvas not found");
}
const paletteDiv = document.getElementById("videoPalette");

let videoPalette = [];

// Upload video
videoUpload.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    if (!(file.type.startsWith("video/") || file.type === "image/gif")) {
        return alert("Please select a valid video or GIF.");
    }
    if (file.size > 20 * 1024 * 1024) {
        return alert("File must be under 20MB.");
    }
    const url = URL.createObjectURL(file);
    videoPlayer.src = url;
});

// Capture frame
captureBtn.addEventListener("click", () => {
    if (videoPlayer.readyState < 2) return alert("Video not ready yet!");
    canvas.width = videoPlayer.videoWidth;
    canvas.height = videoPlayer.videoHeight;
    ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
    canvas.style.display = "block";
});

// Pick color from canvas
canvas.addEventListener("click", e => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = rgbToHex(pixel[0], pixel[1], pixel[2]).toUpperCase();

    if (!videoPalette.includes(hex)) {
        videoPalette.push(hex);
        renderVideoPalette();
        showToast(`🎨 Added ${hex}`);
    }
});

// Extract ALL visible colors (no max limit)
function extractColorsFromCanvas() {
    if (canvas.style.display === "none") {
        showToast("⚠️ Capture a frame first!");
        paletteDiv.innerHTML = "<div style='color:#c00; padding:1em;'>Please capture a frame from the video before extracting colors.</div>";
        return;
    }

    let data;
    try {
        data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    } catch (e) {
        paletteDiv.innerHTML = "<div style='color:#c00; padding:1em;'>Unable to read canvas data. Make sure a video frame is captured and the video is from a supported source.</div>";
        showToast("❌ Unable to read canvas data");
        return;
    }

    const colorMap = new Map();

    // ⚡ Reduce granularity slightly (step = 16 → ~4M possible colors, safe for browsers)
    for (let i = 0; i < data.length; i += 4) {
        let r = Math.round(data[i] / 16) * 16;
        let g = Math.round(data[i + 1] / 16) * 16;
        let b = Math.round(data[i + 2] / 16) * 16;
        const hex = rgbToHex(r, g, b).toUpperCase();
        colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
    }

    // Sare unique colors frequency ke sath
    const sorted = Array.from(colorMap.entries()).sort((a, b) => b[1] - a[1]);
    const newPalette = sorted.map(entry => entry[0]); // ✅ sabhi colors

    if (newPalette.length === 0) {
        paletteDiv.innerHTML = "<div style='color:#c00; padding:1em;'>No colors found. Try capturing a different frame or using a different video.</div>";
        showToast("⚠️ No colors found");
        return;
    }

    // Duplicate avoid karo
    videoPalette = [...new Set([...videoPalette, ...newPalette])];
    renderVideoPalette();
    showToast(`✅ Extracted ${newPalette.length} unique colors`);
}

// Render palette
function renderVideoPalette() {
    paletteDiv.innerHTML = "";
    videoPalette.forEach(hex => {
        const div = document.createElement("div");
        div.className = "palette-color";
        div.style.background = hex;
        div.textContent = hex;
        div.onclick = () => {
            copyToClipboard(hex);
            showToast(`📋 Copied ${hex}`);
        };
        paletteDiv.appendChild(div);
    });
}

// ✅ Helper: Download any blob as file
function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Export JSON
function exportJSON() {
    if (videoPalette.length === 0) return showToast("⚠️ No colors to export.");
    const blob = new Blob([JSON.stringify(videoPalette, null, 2)], { type: "application/json" });
    downloadBlob(blob, "palette.json");
    showToast("✅ JSON Exported");
}

// Export CSS Vars
function exportCSSVars() {
    if (videoPalette.length === 0) return showToast("⚠️ No colors to export.");
    let css = ":root {\n";
    videoPalette.forEach((c, i) => css += `  --color-${i + 1}: ${c};\n`);
    css += "}";
    const blob = new Blob([css], { type: "text/css" });
    downloadBlob(blob, "palette.css");
    showToast("✅ CSS Vars Exported");
}

// Copy HEX List
function copyHEXList() {
    if (videoPalette.length === 0) return showToast("⚠️ No colors to copy.");
    copyToClipboard(videoPalette.join(", "));
    showToast("📋 HEX list copied");
}

// Clear Palette
function clearPalette() {
    videoPalette = [];
    renderVideoPalette();
    showToast("🧹 Cleared");
}

// Wire buttons AFTER DOM loaded
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("exportJSON").onclick = exportJSON;
    document.getElementById("exportCSS").onclick = exportCSSVars;
    document.getElementById("copyHEX").onclick = copyHEXList;
    document.getElementById("clearPalette").onclick = clearPalette;
    document.getElementById("extractAll").onclick = () => extractColorsFromCanvas();
});





        /* 🧭 Readability Tester START (JS) */
        document.getElementById("readTestBtn").onclick = function () {
            const text = document.getElementById("readText").value || "Sample text";
            const bg = document.getElementById("readBg").value;
            const fg = document.getElementById("readFg").value;
            document.getElementById("readPreview").style.background = bg;
            document.getElementById("readPreview").style.color = fg;
            document.getElementById("readPreview").textContent = text;
            // Contrast check
            function hexToRgb(hex) {
                hex = hex.replace(/^#/, "");
                if (hex.length === 3) hex = hex.split("").map(x => x + x).join("");
                const num = parseInt(hex, 16);
                return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
            }
            function luminance(r, g, b) {
                r /= 255; g /= 255; b /= 255;
                [r, g, b] = [r, g, b].map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
                return 0.2126 * r + 0.7152 * g + 0.0722 * b;
            }
            function contrastRatio(rgb1, rgb2) {
                const l1 = luminance(rgb1.r, rgb1.g, rgb1.b);
                const l2 = luminance(rgb2.r, rgb2.g, rgb2.b);
                return ((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2);
            }
            const ratio = contrastRatio(hexToRgb(bg), hexToRgb(fg));
            let pass = ratio >= 4.5 ? "<span style='color:#38a169'>Readable (Pass)</span>" : "<span style='color:#e53e3e'>Not Readable (Fail)</span>";
            document.getElementById("readResult").innerHTML = `Contrast Ratio: <b>${ratio}</b> ${pass}`;
        };
        /* 🧭 Readability Tester END (JS) */

        /* 🎨 Mood Board Generator START (JS) */
        document.getElementById("moodGenBtn").onclick = function () {
            const keyword = document.getElementById("moodKeyword").value.trim().toLowerCase();

            const palettes = {
                // Nature
                sunrise: { colors: ["#FF512F", "#F09819", "#FFD194", "#D1913C", "#FFD89B", "#FF6E7F", "#FF8A80", "#FFB74D", "#FFCC02", "#FF7043", "#FF5722", "#E65100", "#FFC947", "#FFB300", "#FF6F00"] },
                desert: { colors: ["#EDC9AF", "#C19A6B", "#C2B280", "#E1C699", "#BC8F8F", "#F4A460", "#D2B48C", "#DEB887", "#F5DEB3", "#CD853F", "#A0522D", "#8B4513", "#D2691E", "#FFE4C4", "#FAEBD7"] },
                volcano: { colors: ["#FF4500", "#8B0000", "#FF6347", "#B22222", "#CD5C5C", "#F08080", "#DC143C", "#FF0000", "#FF1493", "#C71585", "#8B008B", "#4B0082", "#FF7F50", "#FF4500", "#FF4500"] },
                glacier: { colors: ["#B0E0E6", "#E0FFFF", "#AFEEEE", "#ADD8E6", "#4682B4", "#5F9EA0", "#87CEEB", "#87CEFA", "#00CED1", "#48D1CC", "#40E0D0", "#00FFFF", "#E0F6FF", "#F0F8FF", "#F0F8FF"] },
                meadow: { colors: ["#7CFC00", "#ADFF2F", "#32CD32", "#006400", "#9ACD32", "#2E8B57", "#228B22", "#00FF00", "#00FF7F", "#00FA9A", "#98FB98", "#90EE90", "#8FBC8F", "#3CB371", "#66CDAA"] },
                canyon: { colors: ["#E97451", "#FF8243", "#A0522D", "#8B4513", "#D2691E", "#BC8F8F", "#CD853F", "#DEB887", "#F4A460", "#DAA520", "#B8860B", "#FF7F50", "#FA8072", "#E9967A", "#FFA07A"] },
                aurora: { colors: ["#00FFEF", "#14F195", "#38BDF8", "#9333EA", "#EC4899", "#F43F5E", "#06FFA5", "#39FF14", "#CCFF00", "#ADFF2F", "#9AFF9A", "#7FFF00", "#00FF7F", "#00FFFF", "#1E90FF"] },
                arctic: { colors: ["#E0F7FA", "#B2EBF2", "#80DEEA", "#4DD0E1", "#26C6DA", "#00BCD4", "#F0F8FF", "#E6E6FA", "#D8BFD8", "#C0C0C0", "#B0C4DE", "#87CEEB", "#AFEEEE", "#AFEEEE", "#E0FFFF"] },
                jungle: { colors: ["#006400", "#228B22", "#2E8B57", "#556B2F", "#66CDAA", "#8FBC8F", "#20B2AA", "#32CD32", "#00FF32", "#7CFC00", "#ADFF2F", "#9ACD32", "#6B8E23", "#808000", "#556B2F"] },
                blossom: { colors: ["#FFC0CB", "#FFB6C1", "#FF69B4", "#FF1493", "#DB7093", "#C71585", "#FFE4E1", "#FFCCCB", "#F8BBD9", "#E6E6FA", "#DDA0DD", "#DA70D6", "#BA55D3", "#9370DB", "#8A2BE2"] },

                // Food & Drink
                chocolate: { colors: ["#3E2723", "#5D4037", "#795548", "#8D6E63", "#A1887F", "#D7CCC8", "#4E342E", "#6D4C41", "#8D6E63", "#A1887F", "#BCAAA4", "#D7CCC8", "#EFEBE9", "#8B4513", "#A0522D"] },
                honey: { colors: ["#FFD700", "#FFC300", "#FFB700", "#E6AC00", "#CC9900", "#B8860B", "#DAA520", "#FFDB58", "#F0E68C", "#EEE8AA", "#BDB76B", "#9ACD32", "#FFE135", "#FFEF94", "#FFF8DC"] },
                mint: { colors: ["#98FF98", "#AAF0D1", "#77DD77", "#00FA9A", "#66CDAA", "#20B2AA", "#7FFFD4", "#40E0D0", "#48D1CC", "#00CED1", "#5F9EA0", "#4682B4", "#B0E0E6", "#AFEEEE", "#E0FFFF"] },
                berry: { colors: ["#8A2BE2", "#9400D3", "#9932CC", "#BA55D3", "#DA70D6", "#EE82EE", "#DDA0DD", "#D8BFD8", "#E6E6FA", "#C71585", "#FF1493", "#FF69B4", "#FFB6C1", "#FFC0CB", "#FFCCCB"] },
                lemon: { colors: ["#FFF44F", "#FFFF99", "#F5F5DC", "#FFEB3B", "#FFD700", "#FFC107", "#FFFF00", "#FFFACD", "#FFFACD", "#FAFAD2", "#FFF8DC", "#FFFFF0", "#FFFFE0", "#FFF8DC", "#FFFFF0"] },
                coffee: { colors: ["#4B3832", "#854442", "#FFF4E6", "#3C2F2F", "#BE9B7B", "#DAB49D", "#6F4E37", "#8B4513", "#A0522D", "#CD853F", "#DEB887", "#F4A460", "#D2B48C", "#BC9A6A", "#C19A6B"] },
                wine: { colors: ["#722F37", "#8B0000", "#B22222", "#A52A2A", "#D2691E", "#CD5C5C", "#DC143C", "#FF0000", "#FF6347", "#FA8072", "#E9967A", "#FFA07A", "#FFA07A", "#FFE4E1", "#FFE4E1"] },
                peach: { colors: ["#FFDAB9", "#FFE5B4", "#FFCBA4", "#FFB07C", "#FF9966", "#FF7F50", "#FFDAB9", "#FFDEAD", "#FFE4B5", "#FFE4C4", "#FFEBCD", "#FFEFD5", "#FFE4E1", "#FAF0E6", "#FFF5EE"] },
                avocado: { colors: ["#568203", "#6B8E23", "#9ACD32", "#B2EC5D", "#A9BA9D", "#8FBC8F", "#556B2F", "#808000", "#32CD32", "#7CFC00", "#ADFF2F", "#ADFF2F", "#7FFF00", "#7CFC00", "#00FF00"] },
                coconut: { colors: ["#F5F5DC", "#FFF8DC", "#FAEBD7", "#FFEBCD", "#D2B48C", "#8B4513", "#FFF8DC", "#FFFFF0", "#F0FFF0", "#F5FFFA", "#F0FFFF", "#F0F8FF", "#F8F8FF", "#F5F5F5", "#FFFFFF"] },

                // Seasons
                spring: { colors: ["#FFFAF0", "#FFFACD", "#E6E6FA", "#F0FFF0", "#F5FFFA", "#F0FFFF", "#98FB98", "#90EE90", "#FFB6C1", "#FFC0CB", "#FFE4E1", "#F0F8FF", "#E0FFFF", "#F5FFFA", "#F5FFFA"] },
                summer: { colors: ["#FFD700", "#FF7F50", "#FF6347", "#FF4500", "#FFA500", "#FF8C00", "#FFFF00", "#ADFF2F", "#7CFC00", "#32CD32", "#00FF00", "#00FA9A", "#40E0D0", "#00BFFF", "#1E90FF"] },
                autumn: { colors: ["#FF7F50", "#D2691E", "#8B4513", "#A0522D", "#DEB887", "#FF6347", "#CD853F", "#DAA520", "#B8860B", "#FF8C00", "#FFA500", "#FFD700", "#F0E68C", "#BDB76B", "#9ACD32"] },
                winter: { colors: ["#00BFFF", "#1E90FF", "#4682B4", "#5F9EA0", "#87CEEB", "#B0E0E6", "#E0FFFF", "#F0F8FF", "#F8F8FF", "#FFFAFA", "#F5F5F5", "#C0C0C0", "#D3D3D3", "#DCDCDC", "#FFFFFF"] },

                // Abstract / Creative
                galaxy: { colors: ["#0F0C29", "#302B63", "#24243E", "#6A0572", "#A6036D", "#FF6F91", "#4B0082", "#8A2BE2", "#9400D3", "#9932CC", "#BA55D3", "#DA70D6", "#FF00FF", "#FF1493", "#C71585"] },
                rainbow: { colors: ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#8B00FF", "#FF4500", "#FFA500", "#ADFF2F", "#32CD32", "#1E90FF", "#9400D3", "#FF69B4", "#00FFFF", "#FF6347"] },
                cyberpunk: { colors: ["#FF007F", "#FF00FF", "#7F00FF", "#00FFFF", "#39FF14", "#FF3131", "#FF0080", "#8A2BE2", "#9400D3", "#00CED1", "#ADFF2F", "#FF1493", "#00FF7F", "#FF4500", "#DC143C"] },
                futuristic: { colors: ["#00FFFF", "#00CED1", "#4682B4", "#2E8B57", "#7FFFD4", "#20B2AA", "#40E0D0", "#48D1CC", "#00BFFF", "#1E90FF", "#6495ED", "#87CEEB", "#87CEFA", "#B0E0E6", "#E0F6FF"] },
                marble: { colors: ["#F5F5F5", "#E5E4E2", "#DCDCDC", "#C0C0C0", "#A9A9A9", "#808080", "#F5F5F5", "#DCDCDC", "#D3D3D3", "#C0C0C0", "#A9A9A9", "#808080", "#696969", "#778899", "#708090"] },
                ink: { colors: ["#000000", "#111111", "#222222", "#333333", "#444444", "#555555", "#191970", "#000080", "#00008B", "#0000CD", "#0000FF", "#4169E1", "#6495ED", "#4682B4", "#5F9EA0"] },

                // Events
                christmas: { colors: ["#FF0000", "#008000", "#FFD700", "#FFFFFF", "#800000", "#006400", "#DC143C", "#228B22", "#DAA520", "#F5F5DC", "#B22222", "#2E8B57", "#CD853F", "#F0F8FF", "#FFE4E1"] },
                halloween: { colors: ["#FF7518", "#000000", "#FFD700", "#FF4500", "#8B0000", "#4B0082", "#FF8C00", "#2F4F4F", "#DAA520", "#FFA500", "#B22222", "#800080", "#191970", "#8B008B", "#483D8B"] },
                easter: { colors: ["#FFB6C1", "#FFDAB9", "#FFFACD", "#E6E6FA", "#B0E0E6", "#98FB98", "#FFC0CB", "#FFDAB9", "#E0FFFF", "#E6E6FA", "#ADD8E6", "#90EE90", "#FFE4E1", "#F0FFF0", "#FFF5EE"] },
                valentines: { colors: ["#FF69B4", "#FF1493", "#DB7093", "#C71585", "#FF6F91", "#FF85A2", "#DC143C", "#FF0000", "#FFB6C1", "#FFC0CB", "#FFCCCB", "#FFE4E1", "#F0F8FF", "#FFF0F5", "#FFE4E1"] },
                newyear: { colors: ["#FFD700", "#DAA520", "#FFEC8B", "#C0C0C0", "#B8860B", "#D4AF37", "#F0E68C", "#BDB76B", "#EEE8AA", "#EEE8AA", "#F0E68C", "#FAFAD2", "#FFF8DC", "#FFFFF0", "#FFFFE0"] },
                wedding: { colors: ["#F8E1E7", "#FFE6E6", "#F2D0D9", "#D291BC", "#957DAD", "#D9C7E3", "#FFF0F5", "#FFE4E1", "#FAF0E6", "#FFF5EE", "#FDF5E6", "#FFFAF0", "#FFFFF0", "#F0FFF0", "#F5FFFA"] },
                birthday: { colors: ["#FF6F61", "#FFD700", "#87CEFA", "#32CD32", "#FF69B4", "#FFA07A", "#FF7F50", "#20B2AA", "#9370DB", "#F0E68C", "#DDA0DD", "#98FB98", "#F5DEB3", "#FFB6C1", "#AFEEEE"] },

                // Travel & Culture
                paris: { colors: ["#C71585", "#DB7093", "#FFB6C1", "#FFDAB9", "#FFEFD5", "#FFF0F5", "#FF1493", "#DA70D6", "#DDA0DD", "#E6E6FA", "#F5F5DC", "#FFFACD", "#FDF5E6", "#FAF0E6", "#FAEBD7"] },
                tokyo: { colors: ["#DC143C", "#C71585", "#9932CC", "#4682B4", "#32CD32", "#FFD700", "#FF0000", "#FF69B4", "#8A2BE2", "#1E90FF", "#00FF00", "#F0E68C", "#FF4500", "#00CED1", "#7CFC00"] },
                cairo: { colors: ["#DAA520", "#F0E68C", "#BDB76B", "#CD853F", "#A0522D", "#8B4513", "#B8860B", "#EEE8AA", "#9ACD32", "#D2691E", "#BC8F8F", "#F4A460", "#DEB887", "#F5DEB3", "#C19A6B"] },
                nyc: { colors: ["#708090", "#2F4F4F", "#A9A9A9", "#DCDCDC", "#000000", "#1C1C1C", "#696969", "#778899", "#C0C0C0", "#D3D3D3", "#191970", "#483D8B", "#6A5ACD", "#9370DB", "#8B008B"] },
                dubai: { colors: ["#FFD700", "#DAA520", "#C0C0C0", "#B8860B", "#A0522D", "#F0E68C", "#CD853F", "#D2691E", "#BDB76B", "#EEE8AA", "#F0E68C", "#FAFAD2", "#FFF8DC", "#FFFFF0", "#FFFFE0"] },

                // Nature & Environment
                rainforest: { colors: ["#013220", "#116530", "#228B22", "#2E8B57", "#6B8E23", "#8FBC8F", "#006400", "#32CD32", "#00FF32", "#7CFC00", "#ADFF2F", "#9ACD32", "#556B2F", "#808000", "#66CDAA"] },
                savanna: { colors: ["#DAA520", "#FFD700", "#EEE8AA", "#C2B280", "#8B6914", "#CD853F", "#B8860B", "#F0E68C", "#BDB76B", "#9ACD32", "#D2691E", "#A0522D", "#DEB887", "#F4A460", "#BC8F8F"] },
                tundra: { colors: ["#F0F8FF", "#E6E6FA", "#D8BFD8", "#778899", "#708090", "#2F4F4F", "#F8F8FF", "#E6E6FA", "#D8BFD8", "#778899", "#B0C4DE", "#C0C0C0", "#D3D3D3", "#DCDCDC", "#A9A9A9"] },
                coralreef: { colors: ["#FF7F50", "#FF6347", "#FFDAB9", "#00CED1", "#20B2AA", "#4682B4", "#FA8072", "#FFA07A", "#FFDAB9", "#40E0D0", "#48D1CC", "#4682B4", "#FFA07A", "#FF7F50", "#FF6347"] },
                waterfall: { colors: ["#00BFFF", "#1E90FF", "#4682B4", "#87CEFA", "#B0E0E6", "#ADD8E6", "#00BFFF", "#1E90FF", "#4682B4", "#87CEEB", "#B0E0E6", "#ADD8E6", "#87CEFA", "#AFEEEE", "#E0FFFF"] },
                sanddunes: { colors: ["#EDC9AF", "#DEB887", "#D2B48C", "#F5DEB3", "#FFE4C4", "#C2B280", "#F4A460", "#DEB887", "#D2B48C", "#F5DEB3", "#FFE4C4", "#FFDAB9", "#FFEBCD", "#FFF8DC", "#FFF5EE"] },
                thunderstorm: { colors: ["#2C3E50", "#34495E", "#1C1C1C", "#95A5A6", "#7F8C8D", "#BDC3C7", "#2F4F4F", "#696969", "#708090", "#A9A9A9", "#D3D3D3", "#191970", "#000080", "#4B0082", "#483D8B"] },
                eclipse: { colors: ["#000000", "#2C3E50", "#4B0082", "#191970", "#483D8B", "#800000", "#111111", "#1C1C1C", "#2F2F4F", "#191970", "#483D8B", "#4B0082", "#8B0000", "#B22222", "#A52A2A"] },
                wildfire: { colors: ["#FF4500", "#FF6347", "#FFD700", "#FFA500", "#FF8C00", "#8B0000", "#FF0000", "#DC143C", "#B22222", "#CD5C5C", "#F08080", "#FA8072", "#E9967A", "#FFA07A", "#FA8072"] },
                iceberg: { colors: ["#E0FFFF", "#AFEEEE", "#B0E0E6", "#ADD8E6", "#5F9EA0", "#4682B4", "#E0FFFF", "#AFEEEE", "#B0E0E6", "#ADD8E6", "#5F9EA0", "#4682B4", "#87CEEB", "#B0C4DE", "#E6E6FA"] },

                // Food
                strawberry: { colors: ["#FF4C4C", "#FF6666", "#FF9999", "#C71585", "#8B0000", "#FFB6C1", "#FF0000", "#DC143C", "#B22222", "#CD5C5C", "#F08080", "#FA8072", "#FFC0CB", "#FFE4E1", "#FFB6C1"] },
                blueberry: { colors: ["#191970", "#000080", "#00008B", "#4169E1", "#4682B4", "#87CEEB", "#191970", "#000080", "#00008B", "#4169E1", "#4682B4", "#6495ED", "#B0C4DE", "#ADD8E6", "#87CEFA"] },
                watermelon: { colors: ["#FF3B3F", "#FF6F61", "#00C853", "#2E7D32", "#81C784", "#C62828", "#FF5722", "#4CAF50", "#8BC34A", "#CDDC39", "#FF1744", "#D32F2F", "#388E3C", "#689F38", "#827717"] },
                pumpkin: { colors: ["#FF7518", "#FF8C00", "#FFA500", "#FFD580", "#CD853F", "#8B4513", "#FF6347", "#FF4500", "#FF4500", "#FF8C00", "#FFA500", "#DAA520", "#B8860B", "#A0522D", "#8B4513"] },
                grape: { colors: ["#4B0082", "#800080", "#8A2BE2", "#9400D3", "#9932CC", "#BA55D3", "#4B0082", "#800080", "#8A2BE2", "#9400D3", "#9932CC", "#BA55D3", "#DA70D6", "#EE82EE", "#DDA0DD"] },
                apple: { colors: ["#FF0800", "#FF2400", "#FF4500", "#ADFF2F", "#7CFC00", "#228B22", "#FF0000", "#DC143C", "#ADFF2F", "#7FFF00", "#32CD32", "#00FF00", "#228B22", "#006400", "#2E8B57"] },
                banana: { colors: ["#FFF44F", "#FFFF99", "#FFEB3B", "#FFD700", "#FBC02D", "#FDD835", "#FFFF00", "#FFFFE0", "#FFFFF0", "#FAFAD2", "#FFFACD", "#F5DEB3", "#FFE4B5", "#FFEBCD", "#FFF8DC"] },
                coconutmilk: { colors: ["#FFF5EE", "#FFF8DC", "#FAEBD7", "#FFFDD0", "#D2B48C", "#FFE4C4", "#FFF5EE", "#FFF8DC", "#FAEBD7", "#FFFDD0", "#D2B48C", "#FFE4C4", "#FFEBCD", "#FFF8DC", "#FAFAD2"] },
                caramel: { colors: ["#FFD59A", "#FFB347", "#FF8C00", "#CD853F", "#A0522D", "#8B4513", "#F4A460", "#DAA520", "#B8860B", "#A0522D", "#8B4513", "#A0522D", "#8B4513", "#A0522D", "#8B4513"] },
                olive: { colors: ["#808000", "#556B2F", "#6B8E23", "#9ACD32", "#BDB76B", "#808000", "#808000", "#556B2F", "#6B8E23", "#9ACD32", "#BDB76B", "#C0C080", "#9ACD32", "#ADFF2F", "#7CFC00"] },

                // Cities & Cultures
                london: { colors: ["#708090", "#2F4F4F", "#A9A9A9", "#800000", "#8B0000", "#000000", "#708090", "#2F4F4F", "#A9A9A9", "#800000", "#8B0000", "#000000", "#2F4F4F", "#696969", "#A9A9A9"] },
                venice: { colors: ["#FFB347", "#FFD700", "#CD853F", "#8B4513", "#2E8B57", "#4682B4", "#F4A460", "#DAA520", "#B8860B", "#A0522D", "#20B2AA", "#4682B4", "#DDA0DD", "#B0E0E6", "#5F9EA0"] },
                sydney: { colors: ["#1E90FF", "#00BFFF", "#20B2AA", "#32CD32", "#FFD700", "#FF4500", "#1E90FF", "#00BFFF", "#20B2AA", "#32CD32", "#FFD700", "#FF4500", "#228B22", "#FF6347", "#FFA500"] },
                rio: { colors: ["#00FF00", "#FFFF00", "#FF0000", "#0000FF", "#FF69B4", "#FFA500", "#00FF00", "#FFFF00", "#FF0000", "#0000FF", "#FF69B4", "#FFA500", "#ADFF2F", "#00CED1", "#FF4500"] },
                moscow: { colors: ["#FF0000", "#800000", "#FFD700", "#DAA520", "#000000", "#2F4F4F", "#FF0000", "#800000", "#FFD700", "#DAA520", "#000000", "#2F4F4F", "#8B0000", "#B22222", "#A52A2A"] },
                berlin: { colors: ["#000000", "#FF0000", "#FFD700", "#708090", "#2F4F4F", "#A9A9A9", "#000000", "#FF0000", "#FFD700", "#708090", "#2F4F4F", "#A9A9A9", "#696969", "#808080", "#A9A9A9"] },
                athens: { colors: ["#1E90FF", "#4682B4", "#B0E0E6", "#FAEBD7", "#FFEBCD", "#FFDAB9", "#1E90FF", "#4682B4", "#B0E0E6", "#FAEBD7", "#FFEBCD", "#FFDAB9", "#6495ED", "#ADD8E6", "#87CEFA"] },
                beijing: { colors: ["#FF0000", "#FFD700", "#DAA520", "#000000", "#2F4F4F", "#800000", "#FF0000", "#FFD700", "#DAA520", "#000000", "#2F4F4F", "#800000", "#8B0000", "#B22222", "#A52A2A"] },
                istanbul: { colors: ["#FF7F50", "#FFD700", "#DAA520", "#8B4513", "#2E8B57", "#4682B4", "#FF7F50", "#FFD700", "#DAA520", "#8B4513", "#2E8B57", "#4682B4", "#FF6347", "#FFA500", "#FF4500"] },
                mexico: { colors: ["#FF4500", "#FFD700", "#008000", "#00CED1", "#FF69B4", "#8B0000", "#FF4500", "#FFD700", "#008000", "#00CED1", "#FF69B4", "#8B0000", "#FF0000", "#32CD32", "#FF1493"] },

                // Art / Abstract
                bauhaus: { colors: ["#FF0000", "#0000FF", "#FFFF00", "#000000", "#808080", "#FFFFFF", "#FF0000", "#0000FF", "#FFFF00", "#000000", "#808080", "#FFFFFF", "#A9A9A9", "#D3D3D3", "#F5F5F5"] },
                memphis: { colors: ["#FF69B4", "#FFD700", "#00CED1", "#40E0D0", "#8A2BE2", "#FF4500", "#FF69B4", "#FFD700", "#00CED1", "#40E0D0", "#8A2BE2", "#FF4500", "#DA70D6", "#7FFFD4", "#00FA9A"] },
                popart: { colors: ["#FF0000", "#FFFF00", "#00FF00", "#0000FF", "#FF69B4", "#FFA500", "#FF0000", "#FFFF00", "#00FF00", "#0000FF", "#FF69B4", "#FFA500", "#00FF7F", "#ADFF2F", "#1E90FF"] },
                minimal: { colors: ["#FFFFFF", "#F5F5F5", "#D3D3D3", "#A9A9A9", "#696969", "#000000", "#FFFFFF", "#F5F5F5", "#D3D3D3", "#A9A9A9", "#696969", "#000000", "#DCDCDC", "#C0C0C0", "#808080"] },
                cubism: { colors: ["#8A2BE2", "#FFD700", "#FF4500", "#008000", "#4682B4", "#FF69B4", "#8A2BE2", "#FFD700", "#FF4500", "#008000", "#4682B4", "#FF69B4", "#32CD32", "#FF6347", "#FFA500"] },
                surreal: { colors: ["#FF00FF", "#39FF14", "#00FFFF", "#FFD700", "#000000", "#800080", "#FF00FF", "#39FF14", "#00FFFF", "#FFD700", "#000000", "#800080", "#ADFF2F", "#00CED1", "#FF1493"] },
                impressionist: { colors: ["#FFDAB9", "#FFE4B5", "#98FB98", "#87CEFA", "#FFB6C1", "#D8BFD8", "#FFDAB9", "#FFE4B5", "#98FB98", "#87CEFA", "#FFB6C1", "#D8BFD8", "#E6E6FA", "#ADD8E6", "#90EE90"] },
                renaissance: { colors: ["#8B0000", "#FFD700", "#C19A6B", "#2F4F4F", "#EEE8AA", "#556B2F", "#8B0000", "#FFD700", "#C19A6B", "#2F4F4F", "#EEE8AA", "#556B2F", "#A0522D", "#6B8E23", "#CD853F"] },
                futurism: { colors: ["#FF00FF", "#00FFFF", "#39FF14", "#FFD700", "#00CED1", "#FF1493", "#FF00FF", "#00FFFF", "#39FF14", "#FFD700", "#00CED1", "#FF1493", "#ADFF2F", "#FF4500", "#FF69B4"] },
                pixelart: { colors: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#ADFF2F", "#32CD32", "#1E90FF"] },

                // Fantasy & Sci-Fi
                starlight: { colors: ["#191970", "#000080", "#483D8B", "#FFD700", "#F5F5DC", "#F8F8FF", "#191970", "#000080", "#483D8B", "#FFD700", "#F5F5DC", "#F8F8FF", "#DCDCDC", "#E6E6FA", "#FFF5EE"] },
                steampunk: { colors: ["#A0522D", "#8B4513", "#CD853F", "#D2B48C", "#FFD700", "#C0C0C0", "#A0522D", "#8B4513", "#CD853F", "#D2B48C", "#FFD700", "#C0C0C0", "#B87333", "#DAA520", "#B8860B"] },
                elvenforest: { colors: ["#006400", "#228B22", "#2E8B57", "#556B2F", "#6B8E23", "#8FBC8F", "#006400", "#228B22", "#2E8B57", "#556B2F", "#6B8E23", "#8FBC8F", "#2E8B57", "#32CD32", "#ADFF2F"] },
                dragonfire: { colors: ["#8B0000", "#FF4500", "#FFD700", "#FFA500", "#FF6347", "#800080", "#8B0000", "#FF4500", "#FFD700", "#FFA500", "#FF6347", "#800080", "#DC143C", "#FF0000", "#B22222"] },
                frostrealm: { colors: ["#E0FFFF", "#AFEEEE", "#B0E0E6", "#4682B4", "#5F9EA0", "#2F4F4F", "#E0FFFF", "#AFEEEE", "#B0E0E6", "#4682B4", "#5F9EA0", "#2F4F4F", "#87CEEB", "#B0C4DE", "#D3D3D3"] },
                spaceodyssey: { colors: ["#000000", "#1C1C1C", "#2C3E50", "#34495E", "#7F8C8D", "#BDC3C7", "#000000", "#1C1C1C", "#2C3E50", "#34495E", "#7F8C8D", "#BDC3C7", "#696969", "#808080", "#A9A9A9"] },
                neoncity: { colors: ["#FF00FF", "#00FFFF", "#39FF14", "#FFD700", "#FF1493", "#FF3131", "#FF00FF", "#00FFFF", "#39FF14", "#FFD700", "#FF1493", "#FF3131", "#ADFF2F", "#00CED1", "#FF69B4"] },
                cybergrid: { colors: ["#00FFFF", "#00CED1", "#4682B4", "#2E8B57", "#7FFFD4", "#20B2AA", "#00FFFF", "#00CED1", "#4682B4", "#2E8B57", "#7FFFD4", "#20B2AA", "#40E0D0", "#48D1CC", "#87CEFA"] },
                darkmatter: { colors: ["#000000", "#1C1C1C", "#2C2C2C", "#333333", "#444444", "#555555", "#000000", "#1C1C1C", "#2C2C2C", "#333333", "#444444", "#555555", "#666666", "#777777", "#888888"] },
                mystic: { colors: ["#4B0082", "#8A2BE2", "#9400D3", "#9932CC", "#BA55D3", "#DA70D6", "#4B0082", "#8A2BE2", "#9400D3", "#9932CC", "#BA55D3", "#DA70D6", "#EE82EE", "#DDA0DD", "#E6E6FA"] },
                nebula: { colors: ["#FF69B4", "#FF00FF", "#9400D3", "#4B0082", "#00CED1", "#39FF14", "#FF1493", "#FF00FF", "#8A2BE2", "#4B0082", "#00CED1", "#00FF7F", "#FF1493", "#8A2BE2", "#00FA9A"] },
                apocalypse: { colors: ["#2F4F4F", "#696969", "#708090", "#A9A9A9", "#8B0000", "#FF4500", "#2F4F4F", "#696969", "#708090", "#A9A9A9", "#8B0000", "#FF4500", "#808080", "#800000", "#FF0000"] },

                // Mythology & Legends
                olympus: { colors: ["#FFD700", "#DAA520", "#EEE8AA", "#C0C0C0", "#A0522D", "#8B4513", "#FFF8DC", "#F5DEB3", "#D2B48C", "#DEB887", "#CD853F", "#B8860B", "#D4AF37", "#FFECB3", "#FAEBD7"] },
                hades: { colors: ["#000000", "#1C1C1C", "#2F4F4F", "#4B0082", "#800000", "#8B0000", "#2E2E2E", "#3C3C3C", "#5C5C5C", "#191970", "#483D8B", "#6A5ACD", "#2F2F2F", "#444444", "#555555"] },
                valhalla: { colors: ["#4682B4", "#5F9EA0", "#708090", "#778899", "#B0C4DE", "#D3D3D3", "#E6E6FA", "#87CEFA", "#ADD8E6", "#4169E1", "#191970", "#000080", "#DAA520", "#C0C0C0", "#F5F5F5"] },
                asgard: { colors: ["#FFD700", "#DAA520", "#B8860B", "#C0C0C0", "#708090", "#2F4F4F", "#D4AF37", "#EEE8AA", "#F0E68C", "#DEB887", "#A0522D", "#8B4513", "#F5DEB3", "#FFF8DC", "#C19A6B"] },
                avalon: { colors: ["#006400", "#228B22", "#2E8B57", "#6B8E23", "#8FBC8F", "#556B2F", "#32CD32", "#00FF7F", "#7CFC00", "#ADFF2F", "#98FB98", "#90EE90", "#3CB371", "#20B2AA", "#66CDAA"] },
                atlantis: { colors: ["#00CED1", "#20B2AA", "#40E0D0", "#48D1CC", "#5F9EA0", "#4682B4", "#00FFFF", "#87CEEB", "#ADD8E6", "#B0E0E6", "#AFEEEE", "#E0FFFF", "#1E90FF", "#00BFFF", "#6495ED"] },
                pandora: { colors: ["#8A2BE2", "#9400D3", "#9932CC", "#BA55D3", "#DA70D6", "#EE82EE", "#FF00FF", "#DDA0DD", "#E6E6FA", "#C71585", "#DB7093", "#FF69B4", "#FF1493", "#DC143C", "#FF4500"] },
                titan: { colors: ["#A0522D", "#8B4513", "#CD853F", "#D2691E", "#B22222", "#800000", "#FFD700", "#DAA520", "#EEE8AA", "#708090", "#2F4F4F", "#000000", "#696969", "#808080", "#A9A9A9"] },

                // Seasons
                spring: { colors: ["#FFB6C1", "#FFDAB9", "#FFFACD", "#E6E6FA", "#98FB98", "#90EE90", "#FF69B4", "#FFDEAD", "#F0E68C", "#F5DEB3", "#FAFAD2", "#FFEFD5", "#F0FFF0", "#E0FFFF", "#F5FFFA"] },
                summer: { colors: ["#FF4500", "#FF6347", "#FFD700", "#FFA500", "#FF8C00", "#00CED1", "#20B2AA", "#32CD32", "#ADFF2F", "#7FFF00", "#00FA9A", "#00FF7F", "#40E0D0", "#87CEEB", "#1E90FF"] },
                autumn: { colors: ["#FF7F50", "#FF8C00", "#FFA500", "#DAA520", "#B8860B", "#A0522D", "#8B4513", "#CD853F", "#D2691E", "#F4A460", "#DEB887", "#BC8F8F", "#C19A6B", "#D2B48C", "#F5DEB3"] },
                winter: { colors: ["#F0F8FF", "#E0FFFF", "#AFEEEE", "#B0E0E6", "#ADD8E6", "#87CEFA", "#4682B4", "#5F9EA0", "#708090", "#778899", "#DCDCDC", "#D3D3D3", "#C0C0C0", "#A9A9A9", "#F5F5F5"] },

                // Emotions
                happiness: { colors: ["#FFD700", "#FFEA00", "#FFFF00", "#FFF44F", "#FAFAD2", "#FFFACD", "#F0E68C", "#F5DEB3", "#FFEFD5", "#FFE4B5", "#FFDAB9", "#FFE4C4", "#FFF8DC", "#FFDEAD", "#FFFDD0"] },
                sadness: { colors: ["#000080", "#00008B", "#191970", "#1E90FF", "#4682B4", "#5F9EA0", "#87CEEB", "#B0C4DE", "#ADD8E6", "#6495ED", "#708090", "#778899", "#A9A9A9", "#C0C0C0", "#DCDCDC"] },
                anger: { colors: ["#8B0000", "#B22222", "#DC143C", "#FF0000", "#FF2400", "#FF4500", "#FF6347", "#CD5C5C", "#E9967A", "#F08080", "#FA8072", "#FF7F50", "#FF8C69", "#FF9999", "#FFA07A"] },
                calm: { colors: ["#E0FFFF", "#AFEEEE", "#B0E0E6", "#ADD8E6", "#87CEFA", "#00CED1", "#20B2AA", "#40E0D0", "#48D1CC", "#5F9EA0", "#7FFFD4", "#66CDAA", "#8FBC8F", "#90EE90", "#98FB98"] },
                love: { colors: ["#FF69B4", "#FF1493", "#FFB6C1", "#FFC0CB", "#DB7093", "#C71585", "#FF82AB", "#FF6EB4", "#FF00FF", "#D02090", "#E75480", "#FF3E96", "#FF91A4", "#FFA6C9", "#FFD9EC"] },
                fear: { colors: ["#000000", "#111111", "#1C1C1C", "#2F2F2F", "#333333", "#444444", "#555555", "#666666", "#696969", "#808080", "#A9A9A9", "#2F4F4F", "#191970", "#483D8B", "#4B0082"] },

                // Tech Inspired
                neonmatrix: { colors: ["#00FF00", "#39FF14", "#7FFF00", "#ADFF2F", "#00FA9A", "#00FF7F", "#7CFC00", "#32CD32", "#90EE90", "#8FBC8F", "#66CDAA", "#20B2AA", "#00CED1", "#00FFFF", "#40E0D0"] },
                synthwave: { colors: ["#FF00FF", "#FF1493", "#FF4500", "#FF6347", "#FFD700", "#00FFFF", "#1E90FF", "#8A2BE2", "#9400D3", "#9932CC", "#BA55D3", "#DA70D6", "#FF69B4", "#FF1493", "#FF00FF"] },
                vaporwave: { colors: ["#FFB6C1", "#FFC0CB", "#DB7093", "#FF69B4", "#FF82AB", "#E6E6FA", "#D8BFD8", "#BA55D3", "#9370DB", "#8A2BE2", "#7B68EE", "#6A5ACD", "#483D8B", "#4169E1", "#00BFFF"] },
                hacker: { colors: ["#000000", "#0A0A0A", "#1C1C1C", "#2E2E2E", "#39FF14", "#32CD32", "#00FF00", "#7CFC00", "#ADFF2F", "#9ACD32", "#808000", "#555555", "#666666", "#777777", "#888888"] },
                glitch: { colors: ["#FF0000", "#00FF00", "#0000FF", "#FF00FF", "#00FFFF", "#39FF14", "#FF1493", "#FFFF00", "#FF6347", "#ADFF2F", "#1E90FF", "#FF4500", "#7FFF00", "#DC143C", "#00CED1"] },

                // Misc Themes
                candyshop: { colors: ["#FFB6C1", "#FF69B4", "#FF82AB", "#FF91A4", "#FF99CC", "#FFD1DC", "#FFCCE5", "#FFB3DE", "#FF80BF", "#FF4DA6", "#FF1A8C", "#FF3399", "#FF66B2", "#FF99CC", "#FFC0CB"] },
                galaxy: { colors: ["#000000", "#191970", "#000080", "#4B0082", "#8A2BE2", "#9400D3", "#9932CC", "#BA55D3", "#DA70D6", "#EE82EE", "#FF00FF", "#FF1493", "#FF69B4", "#FF4500", "#FFD700"] },
                rainbow: { colors: ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#8F00FF", "#FF2400", "#FF4500", "#FFD700", "#ADFF2F", "#00CED1", "#1E90FF", "#9400D3", "#FF1493"] },
                monochrome: { colors: ["#000000", "#1C1C1C", "#2F2F2F", "#3C3C3C", "#4F4F4F", "#5C5C5C", "#696969", "#808080", "#999999", "#A9A9A9", "#BEBEBE", "#D3D3D3", "#DCDCDC", "#E8E8E8", "#F5F5F5"] },
                fireice: { colors: ["#FF0000", "#FF4500", "#FF6347", "#FFD700", "#FFA500", "#00FFFF", "#00CED1", "#40E0D0", "#48D1CC", "#5F9EA0", "#1E90FF", "#00BFFF", "#6495ED", "#4169E1", "#0000FF"] },
                desertnight: { colors: ["#EDC9AF", "#DEB887", "#D2B48C", "#C2B280", "#8B6914", "#2C3E50", "#191970", "#000080", "#483D8B", "#4B0082", "#6A5ACD", "#7B68EE", "#8A2BE2", "#9370DB", "#BA55D3"] },
                aurora: { colors: ["#00FF00", "#39FF14", "#ADFF2F", "#00FF7F", "#00CED1", "#1E90FF", "#8A2BE2", "#9400D3", "#FF1493", "#FF69B4", "#FFD700", "#FF8C00", "#FF4500", "#FF6347", "#FF0000"] },
                volcano: { colors: ["#8B0000", "#B22222", "#DC143C", "#FF4500", "#FF6347", "#FFA500", "#FFD700", "#A0522D", "#8B4513", "#CD853F", "#D2691E", "#F4A460", "#DEB887", "#C19A6B", "#D2B48C"] },
            };
            // ✅ check if keyword exists
            let selected = palettes[keyword];
            if (!selected) {
                const keys = Object.keys(palettes);
                selected = palettes[keys[Math.floor(Math.random() * keys.length)]];
                showToast(`⚠️ No palette found for "${keyword}". Showing random palette instead.`);
            }

            // Build color cards
            let html = (selected.colors || []).map(hex => {
                const rgb = hexToRgb(hex); // convert hex → {r,g,b}
                return `
      <div class="palette-card">
        <div class="color-block" style="background:${hex}"></div>
        <div class="color-info">
          <strong>${hex}</strong>
          rgb(${rgb.r}, ${rgb.g}, ${rgb.b})
        </div>
      </div>
    `;
            }).join("");

            // inject into container
            document.getElementById("moodBoardSwatches").innerHTML = html;
        };
        /* 🎨 Mood Board Generator END (JS) */




        /* 🎲 Random Palette Inspiration START (JS) */

        // Toast Function
        function showToast(message, type = "info") {
            const toast = document.createElement("div");
            toast.className = `toast ${type}`;
            toast.innerText = message;
            document.body.appendChild(toast);

            setTimeout(() => { toast.classList.add("show"); }, 100);
            setTimeout(() => {
                toast.classList.remove("show");
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        // Convert HEX → RGB
        function hexToRgb(hex) {
            hex = hex.replace("#", "");
            const bigint = parseInt(hex, 16);
            return {
                r: (bigint >> 16) & 255,
                g: (bigint >> 8) & 255,
                b: bigint & 255,
            };
        }

        // Convert RGB → HSL
        function rgbToHsl(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;
>>>>>>> 4f5670392bc01543c0ae55781be6163beae920e7
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

<<<<<<< HEAD
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
=======
    // ✅ Navigation active class update
    document.querySelectorAll("nav .nav-links a").forEach(link => {
      link.classList.remove("active");
      const href = link.getAttribute("href").replace("#", "");
      if (href === id) {
        link.classList.add("active");
      }
    });
  }


>>>>>>> 4f5670392bc01543c0ae55781be6163beae920e7

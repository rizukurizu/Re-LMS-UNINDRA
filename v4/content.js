console.log("[LMS Ultra Reborn] Mengeksekusi Core Script v2.0...");

// ==========================================
// 1. FONT & ICON RESOURCES (SVG INJECTION)
// ==========================================
const poppinsFontUrl = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap";

const icons = {
    help: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    msg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    logout: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>`,
    menu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
    // Sidebar Icons
    dashboard: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>`,
    course: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
    defaultIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>`
};

// ==========================================
// 2. KILLER FUNCTION (Hapus Elemen Mengganggu)
// ==========================================
function removeAnnoyingElements() {
    // 1. Musnahkan Preloader
    const preloader = document.getElementById('preloader');
    const status = document.getElementById('status');
    if (preloader) preloader.remove();
    if (status) status.remove();

    // 2. Musnahkan link logo LMS yang nyasar ke /home di halaman Login
    const loginLogos = document.querySelectorAll('a[href*="/home"], .logo');
    loginLogos.forEach(el => {
        // Pastikan hanya menghapus yang ada di area form login/auth
        if (document.querySelector('.auth-page') || window.location.pathname === '/' || window.location.pathname.includes('login')) {
            el.style.display = 'none';
        }
    });
}

// ==========================================
// 3. MAIN INITIALIZER
// ==========================================
function initReborn() {
    removeAnnoyingElements();
    
    const path = window.location.pathname;
    if (path === '/home' || path === '/home/' || path.includes('login_new')) {
        window.location.replace("https://lms.unindra.ac.id/");
        return; // Stop eksekusi agar tidak bentrok
    }

    if (!document.querySelector(`link[href="${poppinsFontUrl}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet'; link.href = poppinsFontUrl;
        document.head.appendChild(link);
    }
    document.body.style.fontFamily = "'Poppins', sans-serif";
    document.documentElement.classList.add('rizuki-reborn-active');

    const isLoginPage = document.querySelector('.auth-page') !== null || document.querySelector('.login-box') !== null || window.location.pathname === '/';

    if (isLoginPage) {
        initLoginPage();
    } else {
        initAppPage();
    }
}

// ==========================================
// 4. LOGIN PAGE OVERHAUL
// ==========================================
function initLoginPage() {
    document.body.classList.add('reborn-login-active');
    
    const rightCarousel = document.querySelector('.col-xxl-9');
    if (rightCarousel) rightCarousel.remove();

    const formContainer = document.querySelector('.col-xxl-3');
    if (formContainer) formContainer.className = 'reborn-centered-form-wrapper w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8';

    const rowG0 = document.querySelector('.row.g-0');
    if (rowG0) rowG0.className = 'flex items-center justify-center min-h-screen p-4';
}

// ==========================================
// 5. APP PAGE OVERHAUL (DASHBOARD DLL)
// ==========================================
function initAppPage() {
    rebuildHeader();
    cleanAndInjectSidebar();
    rebuildFooter();
    fixBreadcrumbsAndTitles();
    redesignDashboardCards();
    activateTerminator();
    redesignModals();
}

// ==========================================
// 5A. REBUILD HEADER & MODAL HELP FIX
// ==========================================
function rebuildHeader() {
    const mainHeader = document.querySelector('.main-header');
    if (!mainHeader) return;

    let userImg = 'https://lms.unindra.ac.id/lms_publik/images/users/thumbs/default.png';
    const imgEl = document.querySelector('.user-image');
    if (imgEl && imgEl.src) userImg = imgEl.src;

    let userName = 'Mahasiswa';
    const nameEl = document.querySelector('.user-header p');
    if (nameEl && nameEl.childNodes.length > 0) {
        userName = nameEl.childNodes[0].nodeValue.trim().replace(/\n/g, '').trim();
    }

    mainHeader.innerHTML = `
        <div class="flex items-center justify-between w-full px-4 sm:px-6 bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300" style="height: 65px;">
            <div class="flex items-center gap-3 sm:gap-5">
                <button id="reborn-hamburger" class="p-2 text-gray-500 hover:text-blue-600 bg-transparent border-none cursor-pointer">
                    ${icons.menu}
                </button>
                <div class="font-extrabold text-xl sm:text-2xl text-blue-600 select-none tracking-tight">
                    UNINDRA<span class="text-gray-800 dark:text-gray-200">LMS</span>
                </div>
            </div>
            <div class="flex items-center gap-4 sm:gap-6">
                <div class="flex items-center gap-3 sm:gap-4 border-r border-gray-300 dark:border-gray-700 pr-4 sm:pr-6">
                    <button id="reborn-help-btn" class="text-gray-500 hover:text-blue-500 bg-transparent border-none cursor-pointer transition-colors" title="Bantuan">
                        ${icons.help}
                    </button>
                    <a href="https://lms.unindra.ac.id/member/pesanmasuk" class="text-gray-500 hover:text-blue-500 transition-colors" title="Pesan Masuk">
                        ${icons.msg}
                    </a>
                </div>
                <a href="https://lms.unindra.ac.id/member/profil" class="flex items-center gap-3 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors" style="text-decoration:none;">
                    <div class="text-right hidden sm:block">
                        <p class="text-sm font-bold text-gray-800 dark:text-gray-100 m-0 leading-none capitalize">${userName.toLowerCase()}</p>
                        <p class="text-[11px] text-gray-500 m-0 mt-1 leading-none font-medium">Mahasiswa</p>
                    </div>
                    <img src="${userImg}" class="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-blue-100 dark:border-gray-700 shadow-sm" alt="Profile">
                </a>
            </div>
        </div>
    `;

    document.getElementById('reborn-hamburger')?.addEventListener('click', () => {
        document.body.classList.toggle('sidebar-collapse');
        document.body.classList.toggle('sidebar-open');
    });

    // FIX Bantuan (Menggunakan SweetAlert2 agar pasti muncul & elegan)
    document.getElementById('reborn-help-btn')?.addEventListener('click', () => {
        if (typeof Swal !== 'undefined') {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            Swal.fire({
                title: 'Pusat Bantuan',
                html: '<div style="font-size: 14px; text-align: left;"><p>Jika Anda mengalami kendala pada sistem LMS Unindra (Presensi, Tugas, atau Login), silakan hubungi:</p><ul style="padding-left: 20px; margin-top: 10px;"><li>Dosen Pengampu Mata Kuliah terkait.</li><li>Admin Program Studi masing-masing.</li></ul></div>',
                icon: 'info',
                background: isDark ? '#1e293b' : '#ffffff',
                color: isDark ? '#f8fafc' : '#0f172a',
                confirmButtonColor: '#3b82f6',
                confirmButtonText: 'Tutup'
            });
        } else {
            alert("Bantuan: Silakan hubungi Dosen atau Admin Prodi Anda.");
        }
    });
}

// ==========================================
// 5B. SIDEBAR SVG INJECTION & LOGOUT CLEANUP
// ==========================================
function cleanAndInjectSidebar() {
    const sidebarMenu = document.querySelector('.sidebar-menu');
    if(!sidebarMenu) return;

    // Hapus Logout dari sidebar
    const logoutLinks = document.querySelectorAll('.sidebar-menu a[href*="logout"]');
    logoutLinks.forEach(link => {
        const li = link.closest('li');
        if (li) li.remove(); 
    });

    // Inject SVG & bersihkan class bawaan
    const menuLinks = sidebarMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        const text = link.innerText.toLowerCase();
        let iconToUse = icons.defaultIcon;

        if (text.includes('dashboard') || text.includes('beranda')) iconToUse = icons.dashboard;
        else if (text.includes('kuliah') || text.includes('tugas')) iconToUse = icons.course;

        // Cari dan hapus icon fa utama (bukan panah dropdown)
        const oldIcon = link.querySelector('i.fa:not(.fa-angle-left):not(.pull-right)');
        if (oldIcon) oldIcon.remove();

        // Inject SVG jika belum ada
        if (!link.querySelector('.reborn-svg-icon')) {
            link.insertAdjacentHTML('afterbegin', `<span class="reborn-svg-icon" style="margin-right: 12px; display: inline-flex; align-items: center; justify-content: center;">${iconToUse}</span>`);
        }
    });
}

// ==========================================
// 5C. HANCURKAN WARNA WARNI DASHBOARD
// ==========================================
function redesignDashboardCards() {
    const boxes = document.querySelectorAll('.small-box');
    const pastelClasses = ['reborn-pastel-blue', 'reborn-pastel-purple', 'reborn-pastel-green', 'reborn-pastel-orange'];
    
    boxes.forEach((box, index) => {
        // Buang class warna bawaan AdminLTE
        box.classList.forEach(cls => {
            if(cls.startsWith('bg-')) box.classList.remove(cls);
        });
        
        // Tambahkan class pastel kita secara rotasi
        box.classList.add('reborn-pastel-card');
        box.classList.add(pastelClasses[index % pastelClasses.length]);
        
        // Bersihkan icon background transparan yang terlalu besar
        const iconContainer = box.querySelector('.icon');
        if(iconContainer) iconContainer.style.opacity = '0.2';
    });
}

// ==========================================
// 5D. CUSTOM FOOTER & LOGOUT BTN
// ==========================================
function rebuildFooter() {
    const footer = document.querySelector('.main-footer');
    if (!footer) return;

    footer.style.display = 'block';
    footer.style.padding = '15px 25px';
    footer.style.borderTop = '1px solid var(--border-color, #e2e8f0)';
    footer.style.backgroundColor = 'var(--bg-card, #ffffff)';
    footer.style.transition = 'background-color 0.3s ease, border-color 0.3s ease';

    footer.innerHTML = `
        <div class="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
            <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">
                <span class="text-blue-600 font-bold">LMS Ultra Reborn</span> &copy; 2026 | Redesigned by <span class="text-gray-800 dark:text-gray-200 font-bold">ComeOn / Rizuki</span>
            </div>
            <button id="reborn-btn-logout" class="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md cursor-pointer border-none transition-transform hover:-translate-y-0.5">
                ${icons.logout} Sign Out
            </button>
        </div>
    `;

    document.getElementById('reborn-btn-logout')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (typeof Swal !== 'undefined') {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            Swal.fire({
                title: 'Akhiri Sesi?',
                text: "Pastikan tugas dan presensimu sudah aman!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#64748b',
                confirmButtonText: 'Ya, Sign Out',
                cancelButtonText: 'Batal',
                background: isDark ? '#1e293b' : '#ffffff',
                color: isDark ? '#f8fafc' : '#0f172a'
            }).then((result) => {
                if (result.isConfirmed) window.location.href = "https://lms.unindra.ac.id/login/logout";
            });
        } else {
            if (confirm('Yakin ingin sign out?')) window.location.href = "https://lms.unindra.ac.id/login/logout";
        }
    });
}

// ==========================================
// 5E. BREADCRUMBS & COURSE TITLE
// ==========================================
function fixBreadcrumbsAndTitles() {
    const contentHeader = document.querySelector('.content-header');
    if (!contentHeader) return;
    
    const h1 = contentHeader.querySelector('h1');
    const breadcrumb = contentHeader.querySelector('.breadcrumb');

    if (h1) {
        h1.classList.add('font-bold', 'text-2xl', 'dark:text-white', 'mb-2');
        const small = h1.querySelector('small');
        if(small) small.classList.add('text-gray-500', 'font-normal', 'ml-2', 'text-sm');
    }

    if (h1 && breadcrumb) {
        breadcrumb.style.position = 'relative';
        breadcrumb.style.top = '0';
        breadcrumb.style.right = '0';
        breadcrumb.style.float = 'none';
        breadcrumb.style.padding = '0';
        breadcrumb.style.marginTop = '8px';
        breadcrumb.style.background = 'transparent';
        breadcrumb.style.borderRadius = '0';
        
        breadcrumb.classList.add('flex', 'items-center', 'text-sm', 'text-gray-500', 'dark:text-gray-400');
        h1.parentNode.insertBefore(breadcrumb, h1.nextSibling);
    }
}

// ==========================================
// 5F. MODALS OVERHAUL
// ==========================================
function redesignModals() {
    const modals = document.querySelectorAll('.modal-content');
    modals.forEach(modal => {
        modal.style.borderRadius = '16px';
        modal.style.overflow = 'hidden';
        modal.style.border = 'none';
        modal.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        
        const header = modal.querySelector('.modal-header');
        if(header) {
            header.classList.remove('header_primary');
            header.className = 'modal-header flex justify-between items-center bg-blue-600 dark:bg-slate-800 text-white p-5 border-b border-blue-700 dark:border-slate-700';
            
            const title = header.querySelector('.modal-title');
            if(title) {
                title.classList.remove('text-info');
                title.className = 'modal-title font-bold text-lg text-white m-0';
            }
            
            const closeBtn = header.querySelector('.close');
            if(closeBtn) {
                closeBtn.style.color = '#fff';
                closeBtn.style.opacity = '0.8';
                closeBtn.style.textShadow = 'none';
            }
        }

        const body = modal.querySelector('.modal-body');
        if(body) {
            body.className = 'modal-body p-6 bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200';
        }

        const footer = modal.querySelector('.modal-footer');
        if(footer) {
            footer.className = 'modal-footer p-4 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-200 dark:border-slate-700 flex justify-end';
        }
    });
}

// ==========================================
// 6. TERMINATOR BUG PRESENSI
// ==========================================
function activateTerminator() {
    const bodyObserver = new MutationObserver(() => {
        if (document.body.style.paddingRight) {
            document.body.style.paddingRight = '';
        }
        if (document.body.classList.contains('modal-open')) {
            document.body.style.overflowY = 'auto';
        }
    });
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });
}

// ==========================================
// 7. INITIALISASI TEMA DARK/LIGHT DARI STORAGE
// ==========================================
function initTheme() {
    if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.sync.get(['isDark'], (data) => {
            if (data.isDark) {
                document.documentElement.setAttribute('data-theme', 'dark');
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                document.documentElement.classList.remove('dark');
            }
        });
    }
}

// ==========================================
// START EXECUTION
// ==========================================
initTheme();
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initReborn);
} else {
    initReborn();
}
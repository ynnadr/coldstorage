document.addEventListener('DOMContentLoaded', () => {
    // Referensi Elemen DOM Utama
    const visualizer = document.getElementById('cold-chain-visualizer');
    const steps = document.querySelectorAll('.step');
    const detailsDisplayArea = document.getElementById('details-display-area');
    const placeholderText = detailsDisplayArea.querySelector('.placeholder-text');

    // Referensi untuk Menu Floating
    const floatingMenuButton = document.getElementById('floating-menu-button');
    const orientationMenu = document.getElementById('orientation-menu');
    const menuOptions = orientationMenu.querySelectorAll('.menu-option');

    // --- Fungsi Helper ---

    /**
     * Mengatur tata letak visualizer (horizontal/vertikal).
     * @param {string} layout - 'horizontal' atau 'vertical'.
     */
    function setLayout(layout) {
        visualizer.classList.remove('layout-horizontal', 'layout-vertical');
        visualizer.classList.remove('wrap'); // Hapus kelas wrap jika ada

        if (layout === 'horizontal') {
            visualizer.classList.add('layout-horizontal');
        } else if (layout === 'vertical') {
            visualizer.classList.add('layout-vertical');
        }

        // Reset state saat layout berubah
        hideDetailsArea();
        removeActiveStepHighlight();
        orientationMenu.classList.remove('visible'); // Selalu tutup menu setelah memilih
    }

    /**
     * Menyembunyikan area tampilan detail dan menampilkan placeholder.
     */
    function hideDetailsArea() {
        detailsDisplayArea.classList.remove('visible');
        // Beri sedikit waktu sebelum mengosongkan & menampilkan placeholder
        // agar transisi opacity selesai
        setTimeout(() => {
            const contentDiv = detailsDisplayArea.querySelector('.dynamic-content');
            if (contentDiv) {
                contentDiv.remove();
            }
            if (placeholderText && !detailsDisplayArea.querySelector('.dynamic-content')) {
                 placeholderText.style.display = 'block';
            }
        }, 200); // Sesuaikan dengan durasi transisi CSS jika perlu
    }

    /**
     * Menghapus kelas 'active-step' dari semua elemen step.
     */
    function removeActiveStepHighlight() {
        steps.forEach(s => s.classList.remove('active-step'));
    }

    // --- Event Listener untuk Menu Floating ---

    // Tampilkan/sembunyikan menu saat tombol hamburger diklik
    floatingMenuButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Mencegah penutupan langsung oleh listener document
        orientationMenu.classList.toggle('visible');
    });

    // Atur layout saat salah satu opsi menu diklik
    menuOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedLayout = option.getAttribute('data-layout');
            setLayout(selectedLayout);
        });
    });

    // Tutup menu jika diklik di luar area menu atau tombol hamburger
    document.addEventListener('click', (event) => {
        if (orientationMenu.classList.contains('visible') &&
            !orientationMenu.contains(event.target) &&
            !floatingMenuButton.contains(event.target)) {
            orientationMenu.classList.remove('visible');
        }
    });

     // Tutup menu jika menekan tombol Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && orientationMenu.classList.contains('visible')) {
            orientationMenu.classList.remove('visible');
        }
    });


    // --- Event Listener untuk Setiap Step ---

    steps.forEach(step => {
        const header = step.querySelector('.step-header');

        // Pastikan header ada sebelum menambahkan listener
        if (header) {
            header.style.cursor = 'pointer'; // Indikator visual bisa diklik

            header.addEventListener('click', () => {
                const detailsElement = step.querySelector('.details'); // Cari detail *di dalam* step ini

                // Pastikan elemen detail ada
                if (detailsElement) {
                    const isAlreadyActive = step.classList.contains('active-step');

                    // 1. Hapus highlight dari step lain (jika ada)
                    removeActiveStepHighlight();

                    if (isAlreadyActive) {
                        // 2a. Jika step ini sudah aktif, sembunyikan detailnya
                        hideDetailsArea();
                        // Jangan tambahkan highlight lagi
                    } else {
                        // 2b. Jika step ini belum aktif:
                        //    - Highlight step yang diklik
                        step.classList.add('active-step');

                        //    - Buat kontainer untuk konten dinamis
                        const contentDiv = document.createElement('div');
                        contentDiv.classList.add('dynamic-content');
                        //    - Salin HTML dari elemen detail yang tersembunyi
                        contentDiv.innerHTML = detailsElement.innerHTML;

                        //    - Bersihkan area display sebelum menambahkan konten baru
                        const oldContent = detailsDisplayArea.querySelector('.dynamic-content');
                        if (oldContent) oldContent.remove();
                        if (placeholderText) placeholderText.style.display = 'none'; // Sembunyikan placeholder

                        //    - Tambahkan konten baru ke area display
                        detailsDisplayArea.appendChild(contentDiv);

                        //    - Tampilkan area display (dengan transisi jika ada di CSS)
                        detailsDisplayArea.classList.add('visible');

                        //    - (Opsional) Scroll ke area detail agar terlihat oleh pengguna
                        detailsDisplayArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                } else {
                    console.warn("Elemen .details tidak ditemukan untuk step:", step);
                }
            });
        } else {
             console.warn("Elemen .step-header tidak ditemukan untuk step:", step);
        }
    });

    // --- Inisialisasi ---
    // Layout awal ditentukan oleh kelas default di HTML ('layout-horizontal')
    // jadi tidak perlu memanggil setLayout() di awal, kecuali jika
    // Anda ingin memastikan state awal atau defaultnya berbeda.
    // Contoh: Jika ingin default vertikal:
    // setLayout('vertical');

}); // Akhir DOMContentLoaded

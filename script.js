document.addEventListener('DOMContentLoaded', () => {
    const visualizer = document.getElementById('cold-chain-visualizer');
    const btnHorizontal = document.getElementById('btn-horizontal');
    const btnVertical = document.getElementById('btn-vertical');
    const steps = document.querySelectorAll('.step');
    const detailsDisplayArea = document.getElementById('details-display-area');
    const placeholderText = detailsDisplayArea.querySelector('.placeholder-text'); // Ambil elemen placeholder

    // --- Fungsi untuk Mengatur Layout ---
    function setLayout(layout) {
        visualizer.classList.remove('layout-horizontal', 'layout-vertical');
        // Hapus juga kelas wrap jika ada saat ganti layout
        visualizer.classList.remove('wrap');

        if (layout === 'horizontal') {
            visualizer.classList.add('layout-horizontal');
            btnHorizontal.classList.add('active');
            btnVertical.classList.remove('active');
            // Tambahkan logika wrap untuk layar kecil jika diperlukan (atau handle via CSS @media)
            // checkWrap();
        } else {
            visualizer.classList.add('layout-vertical');
            btnVertical.classList.add('active');
            btnHorizontal.classList.remove('active');
        }
        // Sembunyikan detail saat ganti layout (opsional tapi mungkin lebih bersih)
        hideDetailsArea();
        removeActiveStepHighlight();
    }

    // --- Fungsi untuk menyembunyikan area detail ---
    function hideDetailsArea() {
        detailsDisplayArea.classList.remove('visible');
        // Tampilkan kembali placeholder jika ada
        if(placeholderText) placeholderText.style.display = 'block';
        // Kosongkan konten agar tidak ada sisa
        // detailsDisplayArea.innerHTML = ''; // Atau kembalikan placeholder
        const contentDiv = detailsDisplayArea.querySelector('.dynamic-content');
        if(contentDiv) contentDiv.remove(); // Hapus konten dinamis saja
    }

     // --- Fungsi untuk menghapus highlight step aktif ---
    function removeActiveStepHighlight() {
         steps.forEach(s => s.classList.remove('active-step'));
    }


    // --- Event Listener untuk Tombol Layout ---
    btnHorizontal.addEventListener('click', () => setLayout('horizontal'));
    btnVertical.addEventListener('click', () => setLayout('vertical'));

    // --- Event Listener untuk Setiap Step (Sekarang Menampilkan di Area Bawah) ---
    steps.forEach(step => {
        const header = step.querySelector('.step-header');

        if (header) {
            header.style.cursor = 'pointer'; // Jadikan kursor pointer
            header.addEventListener('click', () => {
                const detailsElement = step.querySelector('.details');
                const stepTitle = step.querySelector('h3').innerText; // Ambil judul step

                if (detailsElement) {
                    // Cek apakah step ini sudah aktif
                    const isAlreadyActive = step.classList.contains('active-step');

                    // Hapus highlight dari semua step
                    removeActiveStepHighlight();

                    if (isAlreadyActive) {
                        // Jika sudah aktif, klik lagi berarti menyembunyikan detail
                        hideDetailsArea();
                    } else {
                        // Jika belum aktif, tampilkan detailnya
                        // 1. Highlight step yang diklik
                        step.classList.add('active-step');

                        // 2. Siapkan konten untuk ditampilkan
                        // Buat div baru untuk konten dinamis agar mudah dihapus nanti
                        const contentDiv = document.createElement('div');
                        contentDiv.classList.add('dynamic-content');
                        // Tambahkan judul step (opsional)
                        // const titleElement = document.createElement('h3');
                        // titleElement.innerText = stepTitle;
                        // contentDiv.appendChild(titleElement);
                        // Tambahkan konten detail
                        contentDiv.innerHTML += detailsElement.innerHTML;

                        // 3. Hapus konten lama / placeholder
                        const oldContent = detailsDisplayArea.querySelector('.dynamic-content');
                        if(oldContent) oldContent.remove();
                        if(placeholderText) placeholderText.style.display = 'none'; // Sembunyikan placeholder

                        // 4. Masukkan konten baru
                        detailsDisplayArea.appendChild(contentDiv);


                        // 5. Tampilkan area detail
                        detailsDisplayArea.classList.add('visible');

                        // Opsional: Scroll ke area detail agar terlihat
                        detailsDisplayArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                }
            });
        }
    });

    // Set layout awal
    setLayout('horizontal'); // Atau 'vertical'
});

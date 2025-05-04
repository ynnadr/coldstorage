document.addEventListener('DOMContentLoaded', () => {
    const visualizer = document.getElementById('cold-chain-visualizer');
    const btnHorizontal = document.getElementById('btn-horizontal');
    const btnVertical = document.getElementById('btn-vertical');
    const steps = document.querySelectorAll('.step');

    // --- Fungsi untuk Mengatur Layout ---
    function setLayout(layout) {
        visualizer.classList.remove('layout-horizontal', 'layout-vertical');
        if (layout === 'horizontal') {
            visualizer.classList.add('layout-horizontal');
            btnHorizontal.classList.add('active');
            btnVertical.classList.remove('active');
        } else {
            visualizer.classList.add('layout-vertical');
            btnVertical.classList.add('active');
            btnHorizontal.classList.remove('active');
        }
    }

    // --- Event Listener untuk Tombol Layout ---
    btnHorizontal.addEventListener('click', () => setLayout('horizontal'));
    btnVertical.addEventListener('click', () => setLayout('vertical'));

    // --- Event Listener untuk Setiap Step (Toggle Detail) ---
    steps.forEach(step => {
        // Cari header di dalam step (lebih baik dari klik step utuh jika ada elemen lain)
        const header = step.querySelector('.step-header');
        const details = step.querySelector('.details');

        if (header && details) {
            header.addEventListener('click', () => {
                // Cek apakah detail sedang terbuka
                const isOpen = details.style.display === 'block';

                // Tutup SEMUA detail lainnya terlebih dahulu (opsional, tapi lebih rapi)
                steps.forEach(otherStep => {
                    const otherDetails = otherStep.querySelector('.details');
                    if (otherDetails && otherDetails !== details) { // Jangan tutup diri sendiri
                        otherDetails.style.display = 'none';
                         // Optional: remove active class from other steps if you add one
                         // otherStep.classList.remove('active-step');
                    }
                });

                // Toggle detail yang diklik
                details.style.display = isOpen ? 'none' : 'block';

                // Optional: add active class to the clicked step
                // if (!isOpen) {
                //     step.classList.add('active-step');
                // } else {
                //     step.classList.remove('active-step');
                // }
            });

             // Tambahkan style cursor pointer ke header agar jelas bisa diklik
             header.style.cursor = 'pointer';
        }
    });

    // Set layout awal (misalnya horizontal)
    setLayout('horizontal'); // Atau 'vertical' jika ingin default vertikal
});

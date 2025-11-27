// --- Data Jadwal Kuliah (Hardcode) ---
const scheduleData = { /* ... (data jadwal tetap sama) ... */
    senin: "LIBUR",
    selasa: [
        { course: "Introduction to Accounting", lecturer: "Pak Fajri", time: "06:15 - 08:20", location: "Kapanjin 3-C" },
        { course: "Introduction to Management", lecturer: "Pak Bambang", time: "09:10 - 11:40", location: "Daramista 2-J" }
    ],
    rabu: "LIBUR",
    kamis: [
        { course: "Introduction to Business", lecturer: "Bu Diana", time: "12:00 - 14:10", location: "Kapanjin 3-C" }
    ],
    jumat: [
        { course: "Religion", lecturer: "Pak Edi Awan", time: "07:30 - 09:10", location: "Daramista 2-D" },
        { course: "Elementary English", lecturer: "Pak Taufiq", time: "13:20 - 14:50", location: "Kapanjin 2-E" }
    ],
    sabtu: [
        { course: "Micro Economics", lecturer: "Pak Awiyanto", time: "06:15 - 07:30", location: "Kapanjin 2-B" },
        { course: "English 1", lecturer: "Bu/Mis Yuni", time: "08:20 - 09:10", location: "Kapanjin 2-C" },
        { course: "Madura Culture", lecturer: "Pak Buhairi", time: "10:30 - 12:00", location: "Cempaka 3-B" }
    ],
    minggu: "LIBUR"
};

let lecturerContacts = []; 
let studentsData = []; // Akan menyimpan data lengkap (termasuk nomor WA)

// ------------------------------------------
// 1. FITUR LOGIN
// ------------------------------------------
async function handleLogin(event) {
    event.preventDefault();
    const npm = document.getElementById('login-npm').value.trim();
    const name = document.getElementById('login-name').value.trim();
    const messageDiv = document.getElementById('login-message');

    if (!npm || !name) return messageDiv.textContent = "NPM dan Nama harus diisi.";

    try {
        const response = await fetch('http://localhost:3000/api/auth/student-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ npm: npm, name: name })
        });

        const result = await response.json();

        if (response.ok && result.success) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loggedInUserNPM', npm);
            messageDiv.textContent = '';
            showWebsiteContent();
        } else {
            messageDiv.textContent = result.message || "NPM atau Nama tidak sesuai.";
        }
    } catch (error) {
        messageDiv.textContent = "Gagal terhubung ke server. Pastikan server.js berjalan.";
    }
}

window.logout = function() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUserNPM');
    localStorage.removeItem('adminToken'); // Pastikan token admin juga hilang
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('website-content').style.display = 'none';
}

function showWebsiteContent() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('website-content').style.display = 'block';
    // Muat semua data setelah login sukses
    updateDateTime();
    loadLecturerContacts();
    loadStudentList(); 
    showSchedule('selasa'); 
}

// ------------------------------------------
// 2. FITUR KONTAK DOSEN & SISWA (Perbaikan WA)
// ------------------------------------------
async function loadLecturerContacts() {
    // ... (Logika fetch dari /api/lecturers tetap sama) ...
    const tbody = document.getElementById('dosen-contact-list');
    tbody.innerHTML = '<tr><td colspan="4">Memuat data dari server...</td></tr>';
    try {
        const response = await fetch('http://localhost:3000/api/lecturers');
        if (!response.ok) throw new Error(`Server merespons dengan status: ${response.status}`);
        const data = await response.json();
        lecturerContacts = data; 
        tbody.innerHTML = '';
        
        lecturerContacts.forEach(dosen => {
            const row = tbody.insertRow();
            row.insertCell().textContent = dosen.name;
            row.insertCell().textContent = dosen.course;
            row.insertCell().textContent = dosen.phone.replace('+62', '0').replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3'); 
            
            const phoneClean = dosen.phone.replace(/[^0-9+]/g, '');
            const waLink = `https://wa.me/${phoneClean.startsWith('+') ? phoneClean.slice(1) : phoneClean}?text=Assalamualaikum,...`;
            
            const waCell = row.insertCell();
            waCell.innerHTML = `<a href="${waLink}" target="_blank"><button class="whatsapp-btn">Kirim WA</button></a>`;
        });
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="4" style="color:red; font-weight:bold;">❌ Gagal terhubung ke Backend Server</td></tr>';
    }
}

async function loadStudentList() {
    const tbody = document.getElementById('student-list');
    tbody.innerHTML = '<tr><td colspan="3">Memuat data mahasiswa dari server...</td></tr>';
    
    try {
        // Mengambil data siswa LENGKAP (termasuk nomor WA)
        const response = await fetch('http://localhost:3000/api/students/phone');
        studentsData = await response.json(); 
        tbody.innerHTML = '';
        
        studentsData.forEach(student => {
            const row = tbody.insertRow();
            row.insertCell().textContent = student.npm;
            row.insertCell().textContent = student.name;
            
            const chatCell = row.insertCell();
            
            const phoneClean = student.phone.replace(/[^0-9+]/g, '');
            const waLink = `https://wa.me/${phoneClean.startsWith('+') ? phoneClean.slice(1) : phoneClean}?text=Assalamualaikum%20${student.name},...`;
            
            // Perbaikan: Tombol Chat Mahasiswa sekarang menjadi link WA langsung
            chatCell.innerHTML = `<a href="${waLink}" target="_blank"><button class="chat-btn">Chat Mahasiswa</button></a>`;
        });

    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="3" style="color:red; font-weight:bold;">❌ Gagal terhubung ke Backend untuk data siswa.</td></tr>';
    }
}

// ------------------------------------------
// 3. FITUR ADMIN (Tetap Sama)
// ------------------------------------------
// Fungsi showSchedule, updateDateTime, toggleAdminPanel, handleAddLecturer (Gunakan kode yang sudah final dan terintegrasi dengan Backend sebelumnya)

window.toggleAdminPanel = async function() {
    const adminPanel = document.getElementById('admin-panel');
    const button = document.getElementById('add-contact-btn');
    
    if (adminPanel.style.display === 'none') {
        const inputCode = prompt("Masukkan Kode Komting/Owner untuk mengakses fitur penambahan kontak:");
        if (!inputCode) return; 

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: inputCode }) 
            });

            const result = await response.json();

            if (response.ok && result.success) {
                localStorage.setItem('adminToken', inputCode); 
                adminPanel.style.display = 'block';
                button.textContent = "Sembunyikan Panel Admin";
                button.style.backgroundColor = '#28a745';
                alert("Akses Berhasil! Panel Admin ditampilkan.");
            } else {
                alert(`Akses Ditolak: ${result.message}`);
            }
        } catch (error) {
            alert("Terjadi kesalahan koneksi saat verifikasi kode ke server.");
        }
    } else {
        localStorage.removeItem('adminToken'); 
        adminPanel.style.display = 'none';
        button.textContent = "Tambah Kontak (Admin)";
        button.style.backgroundColor = '#dc3545';
    }
}

window.handleAddLecturer = async function(event) {
    event.preventDefault(); 
    const adminCode = localStorage.getItem('adminToken'); 
    if (!adminCode) return alert("Anda harus login sebagai Admin terlebih dahulu!");
    const name = document.getElementById('dosen-name').value;
    const course = document.getElementById('dosen-course').value;
    const phone = document.getElementById('dosen-phone').value.replace(/[^0-9+]/g, ''); 

    if (name && course && phone) {
        try {
            const response = await fetch('http://localhost:3000/api/lecturers/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, course, phone, admin_code: adminCode }) 
            });
            const result = await response.json();
            if (response.ok) {
                alert(`SUCCESS! ${result.message}`);
                document.getElementById('add-lecturer-form').reset();
                loadLecturerContacts(); 
            } else {
                alert(`GAGAL: ${result.message}`);
            }
        } catch (error) {
            alert("Terjadi kesalahan koneksi saat menyimpan data ke server.");
        }
    } else {
        alert("Mohon lengkapi semua field.");
    }
}


// ------------------------------------------
// INISIALISASI
// ------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    const addForm = document.getElementById('add-lecturer-form');
    if (addForm) {
        addForm.addEventListener('submit', handleAddLecturer);
    }

    // Cek status login saat halaman dimuat
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showWebsiteContent();
    } else {
        document.getElementById('login-container').style.display = 'block';
        document.getElementById('website-content').style.display = 'none';
    }
});

// --- Data Peran Khusus ---
const ROLES = {
    KOMTING_NPM: "2502210213",
    WAKIL_NPM: "2502210208",
    BENDAHARA_NPM: "2502210212",
    SEKRETARIS_NPM: "2502210201",
    DOSEN_WALI: "Bapak Ahmad Syauqi Bawashir"
};

// --- Data Jadwal Kuliah ---
const scheduleData = {
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
let studentsData = [];

// ------------------------------------------
// LOGIKA LOGIN DAN UI UTAMA
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
            localStorage.setItem('loggedInUserName', name);
            showWebsiteContent();
        } else {
            messageDiv.textContent = result.message || "NPM atau Nama tidak sesuai.";
        }
    } catch (error) {
        messageDiv.textContent = "Gagal terhubung ke server. Pastikan server.js berjalan.";
    }
}

window.logout = function() {
    localStorage.clear(); 
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('website-content').style.display = 'none';
    window.location.reload(); // Muat ulang untuk membersihkan status
}

function showWebsiteContent() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('website-content').style.display = 'block';

    const npm = localStorage.getItem('loggedInUserNPM');
    const name = localStorage.getItem('loggedInUserName');
    
    // Tentukan Peran
    let role = "Mahasiswa";
    if (npm === ROLES.KOMTING_NPM) {
        role = "Komting (Ketua Kelas)";
        document.getElementById('add-contact-btn').style.display = 'block'; // Tampilkan tombol admin
    } else {
         document.getElementById('add-contact-btn').style.display = 'none'; // Sembunyikan tombol admin
    }

    // Update Header
    document.getElementById('welcome-message').textContent = `Selamat Datang, ${name}!`;
    document.getElementById('user-role').textContent = `Peran: ${role}`;

    // Muat data
    updateDateTime();
    loadLecturerContacts();
    loadStudentList(); 
    showSchedule('selasa'); 
}

// ------------------------------------------
// PERBAIKAN JADWAL
// ------------------------------------------
window.showSchedule = function(day) {
    const contentDiv = document.getElementById('schedule-content');
    const schedule = scheduleData[day];
    let html = `<h3>Jadwal Hari ${day.charAt(0).toUpperCase() + day.slice(1)}</h3>`;

    if (schedule === "LIBUR") {
        html += `<p style="color:#dc3545; font-weight:bold; padding: 15px; background-color: #f8d7da; border-radius: 5px;">TIDAK ADA JADWAL KULIAH (LIBUR)</p>`;
    } else {
        // PERBAIKAN: Memastikan semua detail muncul dan tidak hanya titik-titik
        schedule.forEach(item => {
            html += `
                <div class="schedule-item">
                    <p><strong>Mata Kuliah:</strong> ${item.course}</p>
                    <p><strong>Dosen:</strong> ${item.lecturer}</p>
                    <p><strong>Waktu:</strong> ${item.time}</p>
                    <p><strong>Tempat:</strong> ${item.location}</p>
                </div>
            `;
        });
    }
    contentDiv.innerHTML = html;
}


// ------------------------------------------
// LOGIKA CHAT MODAL (Dosen & Mahasiswa)
// ------------------------------------------
let currentTarget = {}; // Menyimpan data target chat sementara

window.openChatModal = function(phone, name, role) {
    currentTarget = { phone, name, role };
    document.getElementById('chat-target-name').textContent = name;
    document.getElementById('chat-target-role').textContent = role;
    document.getElementById('chat-modal').style.display = 'block';
}

window.closeChatModal = function() {
    document.getElementById('chat-modal').style.display = 'none';
    document.getElementById('send-message-form').reset();
}

document.getElementById('send-message-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const message = document.getElementById('chat-message-input').value;
    const phoneClean = currentTarget.phone.replace(/[^0-9+]/g, '');
    const waLink = `https://wa.me/${phoneClean.startsWith('+') ? phoneClean.slice(1) : phoneClean}?text=${encodeURIComponent(message)}`;
    
    // Arahkan ke WhatsApp
    window.open(waLink, '_blank');
    
    // Tutup modal setelah mengarahkan
    closeChatModal();
});


// ------------------------------------------
// MUAT DATA DARI BACKEND
// ------------------------------------------
async function loadLecturerContacts() {
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
            
            const waCell = row.insertCell();
            waCell.innerHTML = `<button class="whatsapp-btn" onclick="openChatModal('${dosen.phone}', '${dosen.name}', 'Dosen')">Kirim Pesan</button>`;
        });
    } catch (error) { /* ... handle error ... */ }
}

async function loadStudentList() {
    const tbody = document.getElementById('student-list');
    tbody.innerHTML = '<tr><td colspan="3">Memuat data mahasiswa dari server...</td></tr>';
    
    try {
        const response = await fetch('http://localhost:3000/api/students/phone');
        studentsData = await response.json(); 
        tbody.innerHTML = '';
        
        studentsData.forEach(student => {
            const row = tbody.insertRow();
            row.insertCell().textContent = student.npm;
            row.insertCell().textContent = student.name;
            
            const chatCell = row.insertCell();
            chatCell.innerHTML = `<button class="chat-btn" onclick="openChatModal('${student.phone}', '${student.name}', 'Mahasiswa')">Kirim Pesan</button>`;
        });

    } catch (error) { /* ... handle error ... */ }
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
        // ... (kode admin tetap sama) ...
    }

    // Cek status login saat halaman dimuat
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showWebsiteContent();
    } else {
        document.getElementById('login-container').style.display = 'block';
        document.getElementById('website-content').style.display = 'none';
    }
});

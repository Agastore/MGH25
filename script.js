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

// --- Data Kontak Dosen (Akan diisi dari Backend) ---
let lecturerContacts = []; 

// --- Data Mahasiswa Kelas MGH25 ---
const studentsData = [
    { npm: "2502210193", name: "SEFTIANA KIKI ANDIRA" },
    { npm: "2502210194", name: "MUHAMMAD FIKRI MUBAROK" },
    { npm: "2502210195", name: "DEVIT RIANASARI" },
    { npm: "2502210196", name: "MUH. SUJUDI BASIMI MALIKI" },
    { npm: "2502210197", name: "MOH. DIDIK SUPRIYADI" },
    { npm: "2502210198", name: "WIWIN ROSITA" },
    { npm: "2502210199", name: "YOGA" },
    { npm: "2502210200", name: "SINDY ROMADANI" },
    { npm: "2502210201", name: "SOFIATUL HASANAH" },
    { npm: "2502210202", name: "NAVISA NUR SANDIKY" },
    { npm: "2502210203", name: "SURYA FAJRI ABSYAH" },
    { npm: "2502210204", name: "NURUL WAHIDANAH AL UZHMA" },
    { npm: "2502210205", name: "MOHAMMAD HARIYANTO" },
    { npm: "2502210206", name: "LAILATUL NAJAD" },
    { npm: "2502210207", name: "AHMAD NASHIFUL AFIF" },
    { npm: "2502210208", name: "SIELMA NABILATUZZAHROH" },
    { npm: "2502210209", name: "AMALIATUL LATIFAH" },
    { npm: "2502210210", name: "NUR JANNAH JAMILIYAH NOUFAL OUTOMO" },
    { npm: "2502210211", name: "HENDRI WAHYUDI" },
    { npm: "2502210212", name: "WILDATURRUHMA" },
    { npm: "2502210213", name: "MOHAMMAD ANGGA KURNIAWAN FAHRAZY" },
    { npm: "2502210214", name: "REVALDA AMILIA ARWAN NINGSIH" },
    { npm: "2502210215", name: "MOH AKBAR MAULANA" },
    { npm: "2502210216", name: "YUSRIL RESTU ARIANSYAH" },
    { npm: "2502210217", name: "FARHAN MUBAROK" },
    { npm: "2502210218", name: "FILDA LIANI" },
    { npm: "2502210219", name: "MOH HERDI RAMADANI" },
    { npm: "2502210396", name: "ACH. FARQI MAULIDI" }
];

// ------------------------------------------
// FUNGSI UMUM
// ------------------------------------------
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    document.getElementById('current-datetime').textContent = now.toLocaleDateString('id-ID', options);
}
setInterval(updateDateTime, 1000); 

window.showSchedule = function(day) {
    const contentDiv = document.getElementById('schedule-content');
    const schedule = scheduleData[day];
    let html = `<h3>Jadwal Hari ${day.charAt(0).toUpperCase() + day.slice(1)}</h3>`;

    if (schedule === "LIBUR") {
        html += `<p style="color:#dc3545; font-weight:bold; padding: 15px; background-color: #f8d7da; border-radius: 5px;">TIDAK ADA JADWAL KULIAH (LIBUR)</p>`;
    } else {
        schedule.forEach(item => {
            html += `<div class="schedule-item">...</div>`; // Diringkas
        });
    }
    contentDiv.innerHTML = html;
}


// ------------------------------------------
// FITUR BACKEND INTEGRASI
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
            
            const phoneClean = dosen.phone.replace(/[^0-9+]/g, '');
            const waLink = `https://wa.me/${phoneClean.startsWith('+') ? phoneClean.slice(1) : phoneClean}?text=Assalamualaikum,...`;
            
            const waCell = row.insertCell();
            waCell.innerHTML = `<a href="${waLink}" target="_blank"><button class="whatsapp-btn">Kirim WA</button></a>`;
        });
    } catch (error) {
        console.error("Kesalahan koneksi Backend:", error);
        tbody.innerHTML = '<tr><td colspan="4" style="color:red; font-weight:bold;">❌ Gagal terhubung ke Backend Server (Pastikan server.js berjalan di port 3000)</td></tr>';
    }
}

// ------------------------------------------
// FITUR DAFTAR SISWA (Simulasi Chat)
// ------------------------------------------
function loadStudentList() {
    const tbody = document.getElementById('student-list');
    tbody.innerHTML = '';
    studentsData.forEach(student => {
        const row = tbody.insertRow();
        row.insertCell().textContent = student.npm;
        row.insertCell().textContent = student.name;
        
        const chatCell = row.insertCell();
        // Tombol Chat Siswa tetap berupa simulasi karena butuh integrasi Bot WA
        chatCell.innerHTML = `<button class="chat-btn" onclick="alert('Fitur kirim pesan ke ${student.name} memerlukan integrasi Bot WhatsApp dengan Backend Server.')">Chat Mahasiswa</button>`;
    });
}


// ------------------------------------------
// FITUR ADMIN & AUTENTIKASI BACKEND
// ------------------------------------------
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
    updateDateTime();
    loadLecturerContacts(); 
    loadStudentList();
    showSchedule('selasa'); 

    const form = document.getElementById('add-lecturer-form');
    if (form) {
        form.addEventListener('submit', handleAddLecturer);
    }
});

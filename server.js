const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DB_FILE = 'db.json';

app.use(cors()); 
app.use(express.json()); 

function readDB() {
    // ... (fungsi readDB dan writeDB tetap sama) ...
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Gagal membaca DB file:", error);
        return { lecturers: [], admin_code: "", students: [] };
    }
}
function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// ==========================================================
// A. ENDPOINT AUTH: LOGIN SISWA (BARU)
// ==========================================================
app.post('/api/auth/student-login', (req, res) => {
    const { npm, name } = req.body;
    const db = readDB();
    
    // Cari siswa yang cocok NPM dan Nama
    const student = db.students.find(s => 
        s.npm === npm && s.name.toUpperCase() === name.toUpperCase()
    );

    if (student) {
        // Login Sukses
        res.status(200).json({ success: true, message: "Login Berhasil" });
    } else {
        // Login Gagal
        res.status(401).json({ success: false, message: "NPM atau Nama tidak sesuai." });
    }
});

// ==========================================================
// B. ENDPOINT API: GET DATA SISWA (LENGKAP)
// ==========================================================
app.get('/api/students/phone', (req, res) => {
    // Endpoint ini mengembalikan data siswa LENGKAP termasuk nomor telepon
    // Ini harusnya hanya diakses oleh pengguna yang sudah login (logika sederhana)
    res.status(200).json(readDB().students); 
});


// ==========================================================
// C. ENDPOINTS LAMA (TETAP SAMA)
// ==========================================================
// Endpoint GET DATA DOSEN
app.get('/api/lecturers', (req, res) => {
    res.status(200).json(readDB().lecturers); 
});
// Endpoint AUTENTIKASI KOMTING
app.post('/api/auth/login', (req, res) => {
    // ... (Logika tetap sama) ...
    const db = readDB();
    if (req.body.code === db.admin_code) {
        res.status(200).json({ success: true, message: "Akses Komting Diberikan" });
    } else {
        res.status(401).json({ success: false, message: "Kode Komting salah." });
    }
});
// Endpoint TAMBAH KONTAK PERMANEN
app.post('/api/lecturers/add', (req, res) => {
    // ... (Logika tetap sama) ...
    const { name, course, phone, admin_code } = req.body;
    const db = readDB();
    if (admin_code !== db.admin_code) return res.status(403).json({ success: false, message: "Akses Ditolak." });
    const newLecturer = { name, course, phone };
    db.lecturers.push(newLecturer);
    writeDB(db); 
    res.status(201).json({ success: true, message: "Kontak dosen berhasil ditambahkan secara permanen." });
});


app.listen(PORT, () => {
    console.log(`Server Backend berjalan di http://localhost:${PORT}`);
});

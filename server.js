const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DB_FILE = 'db.json';

app.use(cors()); 
app.use(express.json()); 

function readDB() {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Gagal membaca DB file:", error);
        return { lecturers: [], admin_code: "" };
    }
}
function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// ENDPOINT A: GET DATA DOSEN
app.get('/api/lecturers', (req, res) => {
    const db = readDB();
    res.status(200).json(db.lecturers); 
});

// ENDPOINT B: AUTENTIKASI KOMTING
app.post('/api/auth/login', (req, res) => {
    const { code } = req.body;
    const db = readDB();
    if (code === db.admin_code) {
        res.status(200).json({ success: true, message: "Akses Komting Diberikan" });
    } else {
        res.status(401).json({ success: false, message: "Kode Komting salah." });
    }
});

// ENDPOINT C: TAMBAH KONTAK PERMANEN
app.post('/api/lecturers/add', (req, res) => {
    const { name, course, phone, admin_code } = req.body;
    const db = readDB();

    if (admin_code !== db.admin_code) {
         return res.status(403).json({ success: false, message: "Akses Ditolak. Kode Admin tidak valid." });
    }
    
    if (!name || !course || !phone) {
        return res.status(400).json({ message: "Data tidak lengkap." });
    }

    const newLecturer = { name, course, phone };
    db.lecturers.push(newLecturer);
    writeDB(db); 
    
    res.status(201).json({ success: true, lecturer: newLecturer, message: "Kontak dosen berhasil ditambahkan secara permanen." });
});

app.listen(PORT, () => {
    console.log(`Server Backend berjalan di http://localhost:${PORT}`);
});

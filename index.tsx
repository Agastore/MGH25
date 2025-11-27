import React, { useState } from 'react';
import { Calendar, Users, Image, BookOpen, Clock, MapPin, User, Mail, Instagram, ChevronRight, Sun, Coffee, Phone, MessageCircle, Search, Award } from 'lucide-react';

const App = () => {
  const [activeDay, setActiveDay] = useState('Senin');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // HELPER: Format nomor untuk Link WA
  const getWaLink = (number) => {
    return `https://wa.me/${number.replace(/[^0-9]/g, '')}`;
  };

  // DATA PENGURUS KELAS (Updated)
  const officers = [
    { 
      name: 'Mohammad Angga Kurniawan Fahrazy', 
      role: 'Komting (Ketua)', 
      image: 'https://ui-avatars.com/api/?name=Mohammad+Angga&background=4f46e5&color=fff&size=128',
      nim: '2502210213'
    },
    { 
      name: 'Moh. Sujudi Basimi Maliki', 
      role: 'Wakil Komting', 
      image: 'https://ui-avatars.com/api/?name=Moh+Sujudi&background=ec4899&color=fff&size=128',
      nim: '2502210196'
    },
    { 
      name: 'Wildaturruhma', 
      role: 'Bendahara', 
      image: 'https://ui-avatars.com/api/?name=Wildaturruhma&background=10b981&color=fff&size=128',
      nim: '2502210212'
    },
    { 
      name: 'Sofiatul Hasanah', 
      role: 'Sekretaris', 
      image: 'https://ui-avatars.com/api/?name=Sofiatul+Hasanah&background=f59e0b&color=fff&size=128',
      nim: '2502210201'
    },
  ];

  // DATA ANGGOTA KELAS LENGKAP (Dari Foto)
  const allMembers = [
    { no: 1, nim: '2502210193', name: 'SEFTIANA KIKI ANDIRA' },
    { no: 2, nim: '2502210194', name: 'MUHAMMAD FIKRI MUBAROK' },
    { no: 3, nim: '2502210195', name: 'DEVIT RIANASARI' },
    { no: 4, nim: '2502210196', name: 'MUH. SUJUDI BASIMI MALIKI' },
    { no: 5, nim: '2502210197', name: 'MOH. DIDIK SUPRIYADI' },
    { no: 6, nim: '2502210198', name: 'WIWIN ROSITA' },
    { no: 7, nim: '2502210199', name: 'YOGA' },
    { no: 8, nim: '2502210200', name: 'SINDY ROMADANI' },
    { no: 9, nim: '2502210201', name: 'SOFIATUL HASANAH' },
    { no: 10, nim: '2502210202', name: 'NAVISA NUR SANDIKY' },
    { no: 11, nim: '2502210203', name: 'SURYA FAJRI ABSYAH' },
    { no: 12, nim: '2502210204', name: 'NURUL WAHIDANAH AL UZHMA' },
    { no: 13, nim: '2502210205', name: 'MOHAMMAD HARIYANTO' },
    { no: 14, nim: '2502210206', name: 'LAILATUL NAJAD' },
    { no: 15, nim: '2502210207', name: 'AHMAD NASHIHUL AFIF' },
    { no: 16, nim: '2502210208', name: 'SIELMA NABILATUZZAHROH' },
    { no: 17, nim: '2502210209', name: 'AMALIATUL LATIFAH' },
    { no: 18, nim: '2502210210', name: 'NUR JANNAH JAMILIYAH N.O' },
    { no: 19, nim: '2502210211', name: 'HENDRI WAHYUDI' },
    { no: 20, nim: '2502210212', name: 'WILDATURRUHMA' },
    { no: 21, nim: '2502210213', name: 'MOHAMMAD ANGGA KURNIAWAN F.' },
    { no: 22, nim: '2502210214', name: 'REVALDA AMILIA ARWAN NINGSIH' },
    { no: 23, nim: '2502210215', name: 'MOH AKBAR MAULANA' },
    { no: 24, nim: '2502210216', name: 'YUSRIL RESTU ARIANSYAH' },
    { no: 25, nim: '2502210217', name: 'FARHAN MUBAROK' },
    { no: 26, nim: '2502210218', name: 'FILDA LIANI' },
    { no: 27, nim: '2502210219', name: 'MOH HERDI RAMADANI' },
    { no: 28, nim: '2502210396', name: 'ACH. FARQI MAULIDI' },
  ];

  // DATA DOSEN
  const lecturersList = [
    { name: 'Pak Fajri', phone: '+62 878-6449-5362', subject: 'Intro to Accounting' },
    { name: 'Pak Bambang', phone: '+62 813-3435-9672', subject: 'Intro to Management' },
    { name: 'Bu Diana', phone: '+62 878-7461-9327', subject: 'Intro to Business' },
    { name: 'Pak Edi Awan', phone: '+62 812-1683-7973', subject: 'Religion' },
    { name: 'Pak Taufiq', phone: '+62 817-7576-6523', subject: 'Elementary English' },
    { name: 'Pak Awiyanto', phone: '+62 821-4333-7450', subject: 'Micro Economics' },
    { name: 'Ms. Yuni', phone: '+62 857-2900-9674', subject: 'English 1' },
    { name: 'Pak Buhairi', phone: '+62 859-3461-0569', subject: 'Madura Culture' },
  ];

  // DATA JADWAL
  const scheduleData = {
    'Senin': [],
    'Selasa': [
      { time: '06:15 - 08:20', subject: 'Introduction to Accounting', room: 'Gd. Kapanjin 3-C', lecturer: 'Pak Fajri', phone: '+62 878-6449-5362' },
      { time: '09:10 - 11:40', subject: 'Introduction to Management', room: 'Gd. Daramista 2-J', lecturer: 'Pak Bambang', phone: '+62 813-3435-9672' },
    ],
    'Rabu': [],
    'Kamis': [
      { time: '12:00 - 14:10', subject: 'Introduction to Business', room: 'Gd. Kapanjin 3-C', lecturer: 'Bu Diana', phone: '+62 878-7461-9327' },
    ],
    'Jumat': [
      { time: '07:30 - 09:10', subject: 'Religion', room: 'Gd. Daramista 2-D', lecturer: 'Pak Edi Awan', phone: '+62 812-1683-7973' },
      { time: '13:20 - 14:50', subject: 'Elementary English', room: 'Gd. Kapanjin 2-E', lecturer: 'Pak Taufiq', phone: '+62 817-7576-6523' },
    ],
    'Sabtu': [
      { time: '06:15 - 07:30', subject: 'Micro Economics', room: 'Gd. Kapanjin 2-B', lecturer: 'Pak Awiyanto', phone: '+62 821-4333-7450' },
      { time: '08:20 - 09:10', subject: 'English 1', room: 'Gd. Kapanjin 2-C', lecturer: 'Ms. Yuni', phone: '+62 857-2900-9674' },
      { time: '10:30 - 12:00', subject: 'Madura Culture', room: 'Gd. Cempaka 3-B', lecturer: 'Pak Buhairi', phone: '+62 859-3461-0569' },
    ]
  };

  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  // Filter members based on search
  const filteredMembers = allMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    member.nim.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* NAVBAR */}
      <nav className="bg-indigo-900 text-white sticky top-0 z-50 shadow-xl border-b border-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 font-bold text-xl tracking-wider">
              <BookOpen className="h-6 w-6 text-yellow-400" />
              <span>KELAS MGH</span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition">Beranda</a>
                <a href="#schedule" className="hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition">Jadwal</a>
                <a href="#structure" className="hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition">Pengurus</a>
                <a href="#members" className="hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition">Daftar Anggota</a>
              </div>
            </div>

            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-md hover:bg-indigo-700 focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-indigo-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#home" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600">Beranda</a>
              <a href="#schedule" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600">Jadwal</a>
              <a href="#structure" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600">Pengurus</a>
              <a href="#members" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600">Daftar Anggota</a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
           <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
           <div className="absolute w-96 h-96 bg-pink-500 rounded-full blur-3xl bottom-0 right-0 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative z-10">
          <span className="bg-white/10 backdrop-blur-md text-yellow-300 px-6 py-2 rounded-full text-sm font-bold mb-6 border border-yellow-500/30 uppercase tracking-widest">
            Manajemen Angkatan 2025
          </span>
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            KELAS MGH
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
            Platform Akademik & Informasi Mahasiswa Manajemen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="#schedule" className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-500 hover:scale-105 transition-all shadow-lg flex justify-center items-center gap-2">
              <Calendar size={20} /> Lihat Jadwal
            </a>
            <a href="#members" className="bg-slate-800 border border-slate-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-700 transition-all flex justify-center items-center gap-2">
              <Users size={20} /> Data Anggota
            </a>
          </div>
        </div>
      </section>

      {/* SCHEDULE SECTION */}
      <section id="schedule" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
              <Calendar className="text-indigo-600" /> Jadwal Kuliah
            </h2>
            <p className="mt-2 text-slate-600">Klik tombol WA untuk menghubungi dosen.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                  activeDay === day
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg transform scale-105'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto min-h-[300px]">
            {scheduleData[activeDay].length > 0 ? (
              scheduleData[activeDay].map((item, index) => (
                <div key={index} className="bg-white border-l-4 border-indigo-500 rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">
                      {item.subject}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                       <span className="text-xs font-bold text-white bg-indigo-500 px-2 py-0.5 rounded">KULIAH</span>
                       <span className="text-sm text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded">{item.room}</span>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-slate-600">
                        <Clock size={18} className="text-slate-400" />
                        <span className="font-medium">{item.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <User size={18} className="text-slate-400" />
                        <span className="font-medium">{item.lecturer}</span>
                      </div>
                    </div>
                  </div>

                  {item.phone && (
                    <a 
                      href={getWaLink(item.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-green-50 text-green-700 border border-green-200 py-3 rounded-xl hover:bg-green-100 transition-colors font-bold text-sm"
                    >
                      <MessageCircle size={18} />
                      Hubungi Dosen
                    </a>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="bg-yellow-100 p-4 rounded-full mb-4 animate-bounce">
                   <Sun size={48} className="text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Hari ini Libur!</h3>
                <p className="text-slate-500 max-w-sm">
                  Tidak ada jadwal kuliah hari {activeDay}.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* STRUCTURE SECTION (PENGURUS) */}
      <section id="structure" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
              <Award className="text-indigo-600" /> Pengurus Kelas
            </h2>
            <p className="mt-2 text-slate-600">Struktur Organisasi Kelas MGH Periode 2025.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {officers.map((officer, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-100 relative group">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                <div className="p-8 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-indigo-500 to-purple-500 mb-4 group-hover:scale-105 transition-transform">
                    <img 
                      src={officer.image} 
                      alt={officer.name} 
                      className="w-full h-full rounded-full object-cover border-4 border-white"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1">{officer.name}</h3>
                  <p className="text-xs text-slate-400 mb-3 font-mono">{officer.nim}</p>
                  <span className="px-4 py-1 bg-indigo-50 text-indigo-700 text-sm font-bold rounded-full border border-indigo-100">
                    {officer.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERS LIST SECTION (NEW) */}
      <section id="members" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
              <Users className="text-indigo-600" /> Daftar Anggota
            </h2>
            <p className="mt-2 text-slate-600">Total {allMembers.length} Mahasiswa Manajemen Angkatan 2025</p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm transition"
              placeholder="Cari nama atau NIM..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Members Table Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-12">No</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">NIM</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Mahasiswa</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => (
                      <tr key={member.nim} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">
                          {member.no}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 font-bold font-mono">
                          {member.nim}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">
                          {member.name}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center text-slate-500">
                        Tidak ditemukan nama "{searchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-slate-400">
            * Data berdasarkan absensi kelas (Jurusan Manajemen 2025)
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center pb-8 border-b border-slate-800">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <span className="text-2xl font-bold text-white tracking-wider flex items-center gap-2">
                 <BookOpen className="text-indigo-500" /> MGH CLASS
              </span>
              <p className="text-slate-500 mt-2 text-sm">Manajemen - Angkatan 2025</p>
         

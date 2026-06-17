import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, FileSpreadsheet, FileDown, Search, Filter, Edit, Plus, UserCheck2, RefreshCw } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  phone: string;
  program: string;
  status: 'Pending' | 'Diproses' | 'Diterima' | 'Ditolak';
  notes: string;
  date: string;
}

export default function CRMAdminSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [role, setRole] = useState<'Super Admin' | 'Admin' | 'Staff'>('Super Admin');
  
  const [students, setStudents] = useState<Student[]>([
    { id: "MG-2026-001", name: "Andi Wijaya", phone: "08123456789", program: "Program Tokutei Ginou (SSW)", status: "Pending", notes: "Siswa belum melengkapi berkas ijazah.", date: "16 Juni 2026" },
    { id: "MG-2026-002", name: "Siti Rahma", phone: "085781124502", program: "Program Kaigo (Caregiver)", status: "Diproses", notes: "Sudah dihubungi, sedang mempersiapkan berkas fisik.", date: "15 Juni 2026" },
    { id: "MG-2026-003", name: "Rian Prasetyo", phone: "085536601150", program: "Program Bahasa Jepang", status: "Diterima", notes: "Sudah membayar DP pendaftaran, masuk kelas offline minggu depan.", date: "14 Juni 2026" },
    { id: "MG-2026-004", name: "Dewi Lestari", phone: "08987654321", program: "Program Kaigo (Caregiver)", status: "Ditolak", notes: "Kesehatan fisik tidak memenuhi syarat medis dasar.", date: "12 Juni 2026" }
  ]);

  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [newNote, setNewNote] = useState('');
  const [newStatus, setNewStatus] = useState<'Pending' | 'Diproses' | 'Diterima' | 'Ditolak'>('Pending');

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.program.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'Semua' || student.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [students, searchTerm, statusFilter]);

  const handleUpdateStatus = (id: string) => {
    setStudents(prev => prev.map(student => {
      if (student.id === id) {
        return { ...student, status: newStatus, notes: newNote || student.notes };
      }
      return student;
    }));
    setEditingStudent(null);
    setNewNote('');
  };

  const exportExcel = () => {
    alert("Mengekspor data pendaftar ke file format .xlsx (Excel) berhasil diunduh.");
  };

  const exportPDF = () => {
    alert("Mengekspor data pendaftar ke file format .pdf (PDF Dokumen) berhasil diunduh.");
  };

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner call to action to open dashboard */}
        <div className="bg-gradient-to-r from-primary-dark to-primary rounded-[2rem] p-8 md:p-12 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
          <div>
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20">Portal Internal Staff</span>
            <h3 className="text-2xl md:text-3xl font-bold mt-4 mb-2">Sistem CRM & Dashboard Admin</h3>
            <p className="text-primary-light/80 text-sm md:text-base max-w-xl">
              Portal pengelolaan siswa baru, pencatatan status registrasi, follow-up, serta export berkas pendaftaran.
            </p>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-8 py-4 bg-white text-primary-dark font-bold rounded-xl hover:bg-neutral-gray transition-colors shrink-0 shadow-lg"
          >
            {isOpen ? 'Tutup Dashboard' : 'Buka Dashboard Admin'}
          </button>
        </div>

        {/* Real Dynamic Admin CRM Module */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-12 bg-neutral-gray rounded-[2.5rem] border border-gray-100 p-6 md:p-10 shadow-inner"
            >
              {/* Header Dashboard & Role Switcher */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-gray-200/60">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Users className="w-6 h-6 text-primary" />
                    Manajemen Calon Siswa (CRM)
                  </h4>
                  <p className="text-sm text-gray-500">Gunakan fitur pencarian & penyaringan untuk mengelola data peserta secara responsif.</p>
                </div>
                
                {/* Switch Role demo */}
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200">
                  <span className="text-xs text-gray-400 font-bold uppercase">Role:</span>
                  <select
                    value={role}
                    onChange={(e: any) => setRole(e.target.value)}
                    className="text-xs font-bold text-primary outline-none cursor-pointer bg-transparent"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="Staff">Staff</option>
                  </select>
                </div>
              </div>

              {/* KPI Stats Cards Block */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Stat 1: Total */}
                <div className="bg-white p-5 rounded-2xl border border-gray-250/50 shadow-sm flex flex-col justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Siswa</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl sm:text-3xl font-black text-gray-900">{students.length}</span>
                    <span className="text-xs text-primary font-bold">100% Terdaftar</span>
                  </div>
                </div>
                {/* Stat 2: Pending */}
                <div className="bg-white p-5 rounded-2xl border border-gray-250/50 shadow-sm flex flex-col justify-between">
                  <span className="text-xs font-bold text-yellow-600 uppercase tracking-wider">Status: Pending</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl sm:text-3xl font-black text-yellow-600">{students.filter(s => s.status === 'Pending').length}</span>
                    <span className="text-xs text-gray-400 font-medium">Perlu review</span>
                  </div>
                </div>
                {/* Stat 3: Diproses */}
                <div className="bg-white p-5 rounded-2xl border border-gray-250/50 shadow-sm flex flex-col justify-between">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Status: Diproses</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl sm:text-3xl font-black text-blue-600">{students.filter(s => s.status === 'Diproses').length}</span>
                    <span className="text-xs text-gray-400 font-medium font-semibold">Tengah follow up</span>
                  </div>
                </div>
                {/* Stat 4: Diterima */}
                <div className="bg-white p-5 rounded-2xl border border-gray-250/50 shadow-sm flex flex-col justify-between">
                  <span className="text-xs font-bold text-green-600 uppercase tracking-wider font-bold">Lolos / Diterima</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl sm:text-3xl font-black text-green-600">{students.filter(s => s.status === 'Diterima').length}</span>
                    <span className="text-xs text-green-600 font-bold">Siap Kelas</span>
                  </div>
                </div>
              </div>

              {/* Toolbar Actions */}
              <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
                
                {/* Search & Filter */}
                <div className="flex flex-wrap items-center gap-3 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Cari nama, ID, atau program..."
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 bg-white px-3 py-2 border border-gray-200 rounded-xl">
                    <Filter className="w-3.5 h-3.5 text-gray-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="text-xs font-semibold outline-none text-gray-700 bg-transparent"
                    >
                      <option value="Semua">Semua Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Diproses">Diproses</option>
                      <option value="Diterima">Diterima</option>
                      <option value="Ditolak">Ditolak</option>
                    </select>
                  </div>
                </div>

                {/* Exporters */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={exportExcel}
                    className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    Export Excel
                  </button>
                  <button
                    onClick={exportPDF}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    <FileDown className="w-4 h-4" />
                    Export PDF
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-bold uppercase text-gray-400 tracking-wider">
                        <th className="px-6 py-4">ID Pendaftaran</th>
                        <th className="px-6 py-4">Nama Pendaftar</th>
                        <th className="px-6 py-4">Pilihan Program</th>
                        <th className="px-6 py-4">Tanggal Daftar</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Catatan Staff</th>
                        <th className="px-6 py-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => (
                          <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 font-mono text-xs font-bold text-gray-500">{student.id}</td>
                            <td className="px-6 py-4">
                              <div className="font-bold text-gray-900">{student.name}</div>
                              <div className="text-xs text-gray-400">{student.phone}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-semibold text-gray-800 text-xs">{student.program}</span>
                            </td>
                            <td className="px-6 py-4 text-gray-500 text-xs font-semibold">{student.date}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                student.status === 'Diterima' ? 'bg-green-100 text-green-700' :
                                student.status === 'Diproses' ? 'bg-blue-100 text-blue-700' :
                                student.status === 'Ditolak' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {student.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-xs font-medium text-gray-500 max-w-xs truncate">{student.notes}</td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => {
                                  setEditingStudent(student);
                                  setNewNote(student.notes);
                                  setNewStatus(student.status);
                                }}
                                className="p-2 text-primary hover:bg-primary-light rounded-lg transition-colors inline-flex items-center justify-center"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="text-center py-12 text-gray-400 font-medium">
                            Tidak ada data pendaftar ditemukan
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Editing Drawer / Modal */}
              <AnimatePresence>
                {editingStudent && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                  >
                    <motion.div
                      initial={{ scale: 0.95, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.95, y: 20 }}
                      className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-gray-100"
                    >
                      <h5 className="text-lg font-bold text-gray-900 mb-2">Perbarui Calon Siswa</h5>
                      <p className="text-xs text-gray-400 mb-6 uppercase font-mono">{editingStudent.id} - {editingStudent.name}</p>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs font-bold text-gray-500 block mb-2">Status Pendaftaran</label>
                          <select
                            value={newStatus}
                            onChange={(e: any) => setNewStatus(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Diproses">Diproses</option>
                            <option value="Diterima">Diterima</option>
                            <option value="Ditolak">Ditolak</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="text-xs font-bold text-gray-500 block mb-2">Catatan Internal / Follow-Up</label>
                          <textarea
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            rows={3}
                            placeholder="Tulis update follow up..."
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white bg-gray-50 resize-none"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 justify-end mt-8">
                        <button
                          onClick={() => setEditingStudent(null)}
                          className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors"
                        >
                          Batal
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(editingStudent.id)}
                          className="px-5 py-2 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                        >
                          Simpan Perubahan
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

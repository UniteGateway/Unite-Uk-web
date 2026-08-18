import React, { useState } from 'react';
import {
  FileText,
  Search,
  Upload,
  Download,
  FolderKanban,
  FileCode,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Eye
} from 'lucide-react';
import { DocumentRecord, AdminUser } from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';

interface DocumentsViewProps {
  currentUser: AdminUser;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({ currentUser }) => {
  const docs = adminStore.getDocuments();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const filteredDocs = docs.filter((d) => {
    const matchesQuery =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = categoryFilter === 'ALL' || d.category === categoryFilter;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-sm border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">
              Enterprise Document Management System (EDMS)
            </h1>
            <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-xs font-mono font-bold">
              {docs.length} Controlled Documents
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Electrical single line diagrams (SLD), DNO G99 connection agreements, corporate PPAs, planning approvals.
          </p>
        </div>

        <button
          onClick={() => alert('Document Upload Dialog')}
          className="px-3.5 py-2 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#8ec236] text-[#06152F] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>+ UPLOAD DOCUMENT</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search documents by filename or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-sm font-mono text-xs focus:outline-none focus:border-[#7AAA2B]"
          />
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="text-slate-400">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border border-slate-200 rounded-sm bg-white text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="CONTRACT">Contracts & Legal</option>
            <option value="ENGINEERING_SLD">Electrical SLD & Schematics</option>
            <option value="DNO_G99">DNO G99 Grid Agreements</option>
            <option value="SURVEY">Site Surveys & LiDAR</option>
            <option value="PLANNING">Planning & Council</option>
            <option value="INVOICE">Invoices & Financials</option>
          </select>
        </div>
      </div>

      {/* Document Table */}
      <div className="bg-white rounded-sm border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono font-bold uppercase text-slate-500">
                <th className="p-3.5">Doc ID</th>
                <th className="p-3.5">Document Name</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">File Size</th>
                <th className="p-3.5">Uploaded By</th>
                <th className="p-3.5">Upload Date</th>
                <th className="p-3.5">Tags</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-[#FF6321]">
                    {doc.id}
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#7AAA2B]" />
                      <span>{doc.name}</span>
                    </div>
                  </td>
                  <td className="p-3.5 font-mono">
                    <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-[10px] font-bold">
                      {doc.category.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-500 text-[11px]">
                    {doc.fileSizeMb} MB
                  </td>
                  <td className="p-3.5 text-slate-700">
                    {doc.uploadedBy}
                  </td>
                  <td className="p-3.5 font-mono text-slate-500 text-[11px]">
                    {doc.createdAt}
                  </td>
                  <td className="p-3.5">
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.map((t) => (
                        <span key={t} className="px-1.5 py-0.2 rounded-sm bg-slate-100 text-slate-600 text-[9px] font-mono">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => alert(`Downloading ${doc.name}`)}
                      className="px-2.5 py-1 rounded-sm bg-[#06152F] hover:bg-[#0A1E3A] text-white font-mono text-[11px] inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3 h-3 text-[#7AAA2B]" />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

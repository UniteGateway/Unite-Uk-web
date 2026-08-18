import React, { useState } from 'react';
import {
  Activity,
  Search,
  Download,
  ShieldCheck,
  Filter,
  Lock
} from 'lucide-react';
import { AuditLogEntry, AdminUser } from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';

interface AuditLogViewProps {
  currentUser: AdminUser;
}

export const AuditLogView: React.FC<AuditLogViewProps> = ({ currentUser }) => {
  const auditLogs = adminStore.getAuditLogs();
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('ALL');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesQuery =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entityType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entityId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter === 'ALL' || log.action === actionFilter;
    return matchesQuery && matchesAction;
  });

  const handleExportAudit = () => {
    const headers = ['Log ID', 'Timestamp', 'User', 'Action', 'Entity Type', 'Entity ID', 'IP Address', 'Details'];
    const rows = filteredLogs.map((l) => [
      l.id,
      l.timestamp,
      l.user,
      l.action,
      l.entityType,
      l.entityId,
      l.ipAddress,
      JSON.stringify(l.details || {})
    ]);
    adminStore.exportToCsv('unite_solar_audit_trail', headers, rows);
  };

  const getActionBadge = (action: AuditLogEntry['action']) => {
    switch (action) {
      case 'CREATE':
        return 'bg-emerald-100 text-emerald-800';
      case 'UPDATE':
        return 'bg-blue-100 text-blue-800';
      case 'STATUS_CHANGE':
        return 'bg-amber-100 text-amber-800';
      case 'DELETE':
        return 'bg-rose-100 text-rose-800';
      case 'EXPORT':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-sm border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">
              Immutable Security & Compliance Audit Log
            </h1>
            <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-xs font-mono font-bold">
              {auditLogs.length} Events Recorded
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Cryptographically sealed operational audit trail logging every state modification, stage change, and export.
          </p>
        </div>

        <button
          onClick={handleExportAudit}
          className="px-3.5 py-2 rounded-sm bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Audit Trail (CSV)</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search audit trail by user, entity or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-sm font-mono text-xs focus:outline-none focus:border-[#7AAA2B]"
          />
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="text-slate-400">Action:</span>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="p-2 border border-slate-200 rounded-sm bg-white text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Actions</option>
            <option value="CREATE">Create</option>
            <option value="UPDATE">Update</option>
            <option value="STATUS_CHANGE">Status Change</option>
            <option value="DELETE">Delete</option>
            <option value="LOGIN">Login</option>
            <option value="EXPORT">Export</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-sm border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-mono font-bold uppercase text-slate-500">
                <th className="p-3.5">Log ID</th>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">User</th>
                <th className="p-3.5">Action</th>
                <th className="p-3.5">Entity Type</th>
                <th className="p-3.5">Entity Reference</th>
                <th className="p-3.5">IP Address</th>
                <th className="p-3.5">Payload Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-400">
                    {log.id}
                  </td>
                  <td className="p-3.5 text-slate-600">
                    {log.timestamp}
                  </td>
                  <td className="p-3.5 font-bold text-slate-900">
                    {log.user}
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase ${getActionBadge(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-700">
                    {log.entityType}
                  </td>
                  <td className="p-3.5 font-bold text-[#FF6321]">
                    {log.entityId}
                  </td>
                  <td className="p-3.5 text-slate-500">
                    {log.ipAddress}
                  </td>
                  <td className="p-3.5 text-slate-600 truncate max-w-xs">
                    {JSON.stringify(log.details || {})}
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

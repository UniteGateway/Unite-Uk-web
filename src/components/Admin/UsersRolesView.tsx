import React from 'react';
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  Lock,
  UserCheck,
  Key,
  ShieldAlert
} from 'lucide-react';
import { AdminUser, AdminUserRole } from '../../types/adminTypes';
import { ROLE_PERMISSIONS } from '../../services/adminStore';

interface UsersRolesViewProps {
  currentUser: AdminUser;
}

export const UsersRolesView: React.FC<UsersRolesViewProps> = ({ currentUser }) => {
  const roles: { role: AdminUserRole; title: string; description: string }[] = [
    {
      role: 'SUPER_ADMIN',
      title: 'Super Administrator',
      description: 'Full unconstrained platform control, financial oversight, role editing, audit exports, and API keys.'
    },
    {
      role: 'ADMIN',
      title: 'System Administrator',
      description: 'Operational management across leads, projects, site surveys, quotations, and documents.'
    },
    {
      role: 'PROJECT_MANAGER',
      title: 'Project Engineering Manager',
      description: 'Stage transitions, technical SLD reviews, DNO G99 tracking, and contractor coordination.'
    },
    {
      role: 'SALES_LEAD',
      title: 'Commercial & Sales Origination',
      description: 'Lead management, CRM engagement, quotation generation, and customer pipeline.'
    },
    {
      role: 'SITE_SURVEYOR',
      title: 'MCS / Electrical Site Surveyor',
      description: 'LiDAR survey uploads, structural evaluations, MPAN metering and electrical checks.'
    },
    {
      role: 'FRANCHISE_PARTNER',
      title: 'Regional Franchise Partner',
      description: 'Territory pipeline access, localized CRM leads, project visibility, and commission tracking.'
    },
    {
      role: 'INVESTOR_VIEWER',
      title: 'Institutional Investor & Auditor',
      description: 'Read-only access to PPA asset performance, financial forecasts, and compliance documents.'
    }
  ];

  const permissionsList = [
    { key: 'canCreateLeads', label: 'Create & Edit Leads' },
    { key: 'canDeleteLeads', label: 'Delete CRM Records' },
    { key: 'canManageProjects', label: 'Manage Turnkey Projects' },
    { key: 'canApproveStages', label: 'Approve Engineering Stages' },
    { key: 'canGenerateQuotes', label: 'Generate Commercial Quotes' },
    { key: 'canAccessFinancials', label: 'Access Financial & PPA Yields' },
    { key: 'canManageTerritories', label: 'Manage Franchise Territories' },
    { key: 'canManageUsers', label: 'Manage User Roles & Security' },
    { key: 'canExportData', label: 'Export Data (CSV / Excel)' },
    { key: 'canViewAuditLogs', label: 'View Immutable Audit Trail' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-sm border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">
              Role-Based Access Control (RBAC) & Team Matrix
            </h1>
            <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-xs font-mono font-bold">
              7 Enterprise Roles Configured
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Granular access permissions, zero-trust security segregation and audit enforcement.
          </p>
        </div>

        <div className="px-3 py-2 rounded-sm bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600">
          Current Session: <strong className="text-slate-900">{currentUser.name}</strong> ({currentUser.role})
        </div>
      </div>

      {/* RBAC Permission Matrix Table */}
      <div className="bg-white rounded-sm border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h3 className="text-xs font-bold text-slate-900 uppercase font-mono">
            Granular Permission Matrix by Role
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-mono font-bold uppercase text-slate-500">
                <th className="p-3.5">Permission / Capability</th>
                {roles.map((r) => (
                  <th key={r.role} className="p-3.5 text-center whitespace-nowrap">
                    {r.role.replace('_', ' ')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {permissionsList.map((perm) => (
                <tr key={perm.key} className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-800">
                    {perm.label}
                  </td>
                  {roles.map((r) => {
                    const hasPerm = ROLE_PERMISSIONS[r.role]?.[perm.key as keyof typeof ROLE_PERMISSIONS[AdminUserRole]];
                    return (
                      <td key={r.role} className="p-3.5 text-center">
                        {hasPerm ? (
                          <span className="inline-block w-4 h-4 rounded-full bg-[#7AAA2B] text-white text-[10px] leading-4 text-center font-bold">
                            ✓
                          </span>
                        ) : (
                          <span className="inline-block text-slate-300">
                            —
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((r) => (
          <div key={r.role} className="p-4 bg-white rounded-sm border border-slate-200 shadow-xs space-y-1.5">
            <span className="text-[10px] font-mono font-bold text-[#FF6321] uppercase">
              {r.role}
            </span>
            <h4 className="font-bold text-sm text-slate-900">
              {r.title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              {r.description}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

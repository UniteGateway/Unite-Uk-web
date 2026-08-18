import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Plus,
  Mail,
  Phone,
  Calendar,
  User,
  Clock
} from 'lucide-react';
import { CommunicationLogItem, AdminUser } from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';

interface CommunicationViewProps {
  currentUser: AdminUser;
}

export const CommunicationView: React.FC<CommunicationViewProps> = ({ currentUser }) => {
  const comms = adminStore.getCommunications();
  const [searchQuery, setSearchQuery] = useState('');
  const [channelFilter, setChannelFilter] = useState<string>('ALL');

  const filteredComms = comms.filter((c) => {
    const matchesQuery =
      c.party.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChannel = channelFilter === 'ALL' || c.channel === channelFilter;
    return matchesQuery && matchesChannel;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-sm border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">
              Enterprise Communication & Interaction Log
            </h1>
            <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-xs font-mono font-bold">
              {comms.length} Interactions
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Direct client emails, DNO grid engineers correspondence, landowner meetings, and legal notes.
          </p>
        </div>

        <button
          onClick={() => alert('Log Interaction Dialog')}
          className="px-3.5 py-2 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#8ec236] text-[#06152F] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ LOG INTERACTION</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search communication logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-sm font-mono text-xs focus:outline-none focus:border-[#7AAA2B]"
          />
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="text-slate-400">Channel:</span>
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="p-2 border border-slate-200 rounded-sm bg-white text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Channels</option>
            <option value="EMAIL">Email</option>
            <option value="PHONE">Phone Call</option>
            <option value="MEETING">Meeting</option>
            <option value="SITE_VISIT">Site Visit</option>
          </select>
        </div>
      </div>

      {/* Communication Feed */}
      <div className="bg-white rounded-sm border border-slate-200 shadow-xs divide-y divide-slate-100">
        {filteredComms.map((item) => (
          <div key={item.id} className="p-5 space-y-2 hover:bg-slate-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-sm bg-[#06152F] text-white text-[10px] font-mono font-bold">
                  {item.channel}
                </span>
                <span className="text-xs font-bold text-slate-900 font-mono">
                  {item.party}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {item.timestamp}
              </span>
            </div>

            <h3 className="font-bold text-sm text-slate-900">
              {item.subject}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed font-sans bg-slate-50 p-3 rounded-sm border border-slate-100">
              {item.summary}
            </p>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
              <span>Logged by: <strong className="text-slate-700">{item.loggedBy}</strong></span>
              {item.linkedEntityType && (
                <span className="text-[#FF6321] font-bold">
                  Linked {item.linkedEntityType}: #{item.linkedEntityId}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

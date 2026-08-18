import React from 'react';
import { X, Bell, CheckCircle2, Users, FileText, FolderKanban, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { adminStore } from '../../services/adminStore';
import { NotificationItem, AdminActiveView } from '../../types/adminTypes';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: AdminActiveView, id?: string) => void;
  notifications: NotificationItem[];
  onRefresh: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  notifications,
  onRefresh
}) => {
  if (!isOpen) return null;

  const handleMarkAllRead = () => {
    adminStore.markAllNotificationsAsRead();
    onRefresh();
  };

  const handleNotificationClick = (notif: NotificationItem) => {
    adminStore.markNotificationAsRead(notif.id);
    onRefresh();
    onNavigate(notif.targetView as AdminActiveView, notif.targetId);
    onClose();
  };

  const getNotifIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'NEW_LEAD':
        return <Users className="w-4 h-4 text-[#FF6321]" />;
      case 'PROJECT_STATUS':
        return <FolderKanban className="w-4 h-4 text-[#7AAA2B]" />;
      case 'QUOTE_ACCEPTED':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'TASK_DUE':
        return <Clock className="w-4 h-4 text-amber-400" />;
      case 'FRANCHISE_APP':
        return <ShieldCheck className="w-4 h-4 text-purple-400" />;
      default:
        return <FileText className="w-4 h-4 text-sky-400" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-[#06152F] border-l-2 border-line text-white flex flex-col h-full shadow-2xl">
        
        {/* Header */}
        <div className="p-4 border-b border-line flex items-center justify-between bg-[#040E20]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#7AAA2B]" />
            <h3 className="font-bold text-sm tracking-wide uppercase font-display">
              Operational Notifications
            </h3>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-[#FF6321] text-white text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-[11px] text-[#7AAA2B] hover:underline font-mono cursor-pointer"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-sm hover:bg-[#0A1E3A] text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {notifications.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-400 font-mono">
              No notifications right now.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className={`p-3 rounded-sm border transition-all cursor-pointer ${
                  notif.isRead
                    ? 'bg-[#040E20]/60 border-line/40 opacity-70 hover:opacity-100 hover:bg-[#0A1E3A]'
                    : 'bg-[#0A1E3A] border-[#7AAA2B]/60 hover:border-[#7AAA2B] shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-sm bg-[#040E20] border border-line shrink-0 mt-0.5">
                    {getNotifIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-semibold text-white truncate">
                        {notif.title}
                      </span>
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-[#FF6321] shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                      {notif.message}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-2">
                      <span>{notif.timestamp}</span>
                      <span className="flex items-center gap-1 text-[#7AAA2B] group-hover:underline">
                        View record <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-line bg-[#040E20] text-center text-[10px] text-slate-500 font-mono">
          <span>Real-time webhook & system telemetry</span>
        </div>

      </div>
    </div>
  );
};

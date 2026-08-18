import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, FolderKanban, Users, FileText, Sun, MapPin, Building, ShieldCheck } from 'lucide-react';
import { adminStore } from '../../services/adminStore';
import { AdminActiveView } from '../../types/adminTypes';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: AdminActiveView, id?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length >= 2) {
      const hits = adminStore.globalSearch(query);
      setResults(hits);
    } else {
      setResults([]);
    }
  }, [query]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'Lead':
        return <Users className="w-4 h-4 text-[#FF6321]" />;
      case 'Project':
        return <FolderKanban className="w-4 h-4 text-[#7AAA2B]" />;
      case 'Customer':
        return <Building className="w-4 h-4 text-sky-400" />;
      case 'Quote':
        return <FileText className="w-4 h-4 text-amber-400" />;
      case 'Land Opportunity':
        return <Sun className="w-4 h-4 text-emerald-400" />;
      case 'Territory':
        return <MapPin className="w-4 h-4 text-purple-400" />;
      default:
        return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#06152F] border-2 border-line rounded-sm shadow-2xl max-w-2xl w-full overflow-hidden">
        
        {/* Search Header */}
        <div className="p-4 border-b border-line flex items-center gap-3 bg-[#040E20]">
          <Search className="w-5 h-5 text-[#7AAA2B]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search leads, projects, customers, quotes, land, territories, documents... (Press ESC to exit)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none placeholder-slate-500 font-mono"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-sm hover:bg-slate-800 text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim().length < 2 ? (
            <div className="p-8 text-center text-xs text-slate-400 font-mono space-y-2">
              <p>Type at least 2 characters to search across all operational records.</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2 text-[10px]">
                <span className="px-2 py-0.5 rounded-sm bg-[#040E20] border border-line">Leads</span>
                <span className="px-2 py-0.5 rounded-sm bg-[#040E20] border border-line">Projects</span>
                <span className="px-2 py-0.5 rounded-sm bg-[#040E20] border border-line">Customers</span>
                <span className="px-2 py-0.5 rounded-sm bg-[#040E20] border border-line">Quotes</span>
                <span className="px-2 py-0.5 rounded-sm bg-[#040E20] border border-line">Territories</span>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 font-mono">
              No matching records found for "{query}".
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((item, idx) => (
                <button
                  key={`${item.type}-${item.id}-${idx}`}
                  onClick={() => {
                    onNavigate(item.view as AdminActiveView, item.id);
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-sm hover:bg-[#0A1E3A] border border-transparent hover:border-line flex items-center justify-between transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-sm bg-[#040E20] border border-line">
                      {getItemIcon(item.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                          {item.type} • {item.id}
                        </span>
                        {item.badge && (
                          <span className="px-1.5 py-0.2 rounded-sm bg-slate-800 text-slate-300 text-[9px] font-mono">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-white group-hover:text-[#7AAA2B] transition-colors">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-400 font-mono">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#7AAA2B] transition-colors" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="p-2.5 bg-[#040E20] border-t border-line text-[10px] text-slate-500 font-mono flex items-center justify-between">
          <span>Enterprise Multi-Entity Index</span>
          <span>Shortcut: <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">/</kbd></span>
        </div>

      </div>
    </div>
  );
};

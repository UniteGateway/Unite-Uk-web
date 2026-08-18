import React, { useState } from 'react';
import { UniteSolarLogo, UniteGroupLogo } from '../UniteLogos';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  Eye,
  EyeOff,
  Sparkles,
  Zap,
  Globe
} from 'lucide-react';
import { AdminUser, AdminRole } from '../../types/adminTypes';
import { SEED_USERS, adminStore } from '../../services/adminStore';

interface AdminLoginProps {
  onLoginSuccess: (user: AdminUser) => void;
  onReturnToPublic: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onReturnToPublic
}) => {
  const [email, setEmail] = useState('alistair.montgomery@unitegreentech.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState<AdminRole>('SUPER_ADMIN');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Rate limiting tracker
  const [failedAttempts, setFailedAttempts] = useState(0);

  const handleRoleQuickSelect = (role: AdminRole) => {
    setSelectedRole(role);
    const targetUser = SEED_USERS.find((u) => u.role === role) || SEED_USERS[0];
    setEmail(targetUser.email);
    setPassword('••••••••••••');
    setErrorMsg(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (failedAttempts >= 5) {
      setErrorMsg('Account temporarily locked due to repeated attempts. Rate limit cooling down: 60s.');
      return;
    }

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid corporate email address.');
      setFailedAttempts((prev) => prev + 1);
      return;
    }

    setIsLoading(true);

    // Realistic authentication flow
    setTimeout(() => {
      setIsLoading(false);
      const matchedUser = SEED_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase()) || {
        id: `USR-${Date.now()}`,
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        email: email,
        role: selectedRole,
        department: 'Operations',
        lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 19),
        isActive: true,
        mfaEnabled: true
      };

      adminStore.setCurrentUser(matchedUser);
      onLoginSuccess(matchedUser);
    }, 600);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) return;
    setForgotSent(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotSent(false);
      setForgotEmail('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#040E20] flex flex-col justify-between text-white relative overflow-hidden font-sans selection:bg-[#7AAA2B] selection:text-[#06152F]">
      
      {/* Background Energy Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(6,21,47,0.8),#020A17)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4E8B1E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF6321]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <header className="p-6 relative z-10 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <UniteSolarLogo size="md" theme="dark" />
          <div className="hidden sm:flex flex-col pl-3 border-l border-slate-700/80">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#7AAA2B]">
              Operating OS // Admin Portal
            </span>
            <span className="text-[9px] text-slate-400">
              Unite Greentek Limited (UK)
            </span>
          </div>
        </div>

        <button
          onClick={onReturnToPublic}
          className="px-3.5 py-1.5 rounded-sm bg-[#06152F] hover:bg-[#0A1E3A] border border-line text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5 text-[#7AAA2B]" />
          <span>Return to Public Website</span>
        </button>
      </header>

      {/* Main Login Card */}
      <div className="relative z-10 max-w-md w-full mx-auto px-4 py-8">
        <div className="bg-[#06152F] border-2 border-line rounded-sm shadow-2xl p-8 space-y-6">
          
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-[#0A1E3A] border border-line text-[#7AAA2B] text-[10px] font-mono font-bold uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>SECURE ENTERPRISE ACCESS</span>
            </div>
            <h2 className="text-2xl font-black text-white font-display uppercase tracking-tight">
              ADMINISTRATOR LOGIN
            </h2>
            <p className="text-xs text-slate-400 font-light">
              Enter your credentials to access the Unite Solar CRM & Project Management Operating System.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-sm bg-rose-950/50 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-mono mb-1">Corporate Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@unitegreentech.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-sm bg-[#040E20] border border-line text-white focus:outline-none focus:border-[#7AAA2B] font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-300 font-mono">Password</label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[11px] text-[#7AAA2B] hover:underline font-mono cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter master password"
                  className="w-full pl-9 pr-10 py-2.5 rounded-sm bg-[#040E20] border border-line text-white focus:outline-none focus:border-[#7AAA2B] font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Demo Role Switcher */}
            <div className="pt-2 border-t border-line/60 space-y-1.5">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">
                Quick Role Sandbox Switcher:
              </span>
              <div className="grid grid-cols-3 gap-1 text-[10px] font-mono">
                {[
                  { label: 'Super Admin', role: 'SUPER_ADMIN' as AdminRole },
                  { label: 'Sales / PPA', role: 'SALES' as AdminRole },
                  { label: 'Project Mgr', role: 'PROJECT_MANAGER' as AdminRole },
                  { label: 'Engineering', role: 'ENGINEERING' as AdminRole },
                  { label: 'Franchise Desk', role: 'FRANCHISE_MANAGER' as AdminRole },
                  { label: 'View Only', role: 'VIEW_ONLY' as AdminRole }
                ].map((item) => (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => handleRoleQuickSelect(item.role)}
                    className={`p-1.5 rounded-sm border text-center transition-colors cursor-pointer truncate ${
                      selectedRole === item.role
                        ? 'bg-[#7AAA2B] text-[#06152F] font-bold border-[#7AAA2B]'
                        : 'bg-[#040E20] border-line text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-[#040E20] text-[#7AAA2B] focus:ring-0"
                />
                <span className="text-slate-400 text-[11px] font-mono">Remember this session</span>
              </label>

              <span className="text-[10px] text-slate-500 font-mono">MFA Ready (v2.4)</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-sm mini-tag bg-gradient-to-r from-[#4E8B1E] to-[#7AAA2B] hover:from-[#5aa222] hover:to-[#8bc232] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
            >
              {isLoading ? (
                <span>AUTHENTICATING SECURE SESSION...</span>
              ) : (
                <>
                  <span>AUTHENTICATE & LAUNCH OS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-line/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>TLS 1.3 // 256-Bit SHA</span>
            <span>Unite Greentek UK</span>
          </div>

        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#06152F] border-2 border-line rounded-sm p-6 max-w-sm w-full space-y-4 relative">
            <h3 className="text-base font-bold text-white uppercase font-display">
              Reset Security Credentials
            </h3>
            {forgotSent ? (
              <div className="p-3 rounded-sm bg-[#7AAA2B]/20 border border-[#7AAA2B] text-[#7AAA2B] text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Password reset dispatch sent to {forgotEmail}. Check your corporate inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-3 text-xs">
                <p className="text-slate-400">
                  Enter your registered corporate email to receive a single-use authentication token.
                </p>
                <input
                  type="email"
                  required
                  placeholder="name@unitegreentech.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full p-2.5 rounded-sm bg-[#040E20] border border-line text-white font-mono focus:outline-none focus:border-[#7AAA2B]"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-3 py-1.5 rounded-sm bg-[#040E20] border border-line text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-sm mini-tag bg-[#7AAA2B] text-[#06152F] font-bold"
                  >
                    Send Reset Token
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer Disclaimer */}
      <footer className="p-4 text-center text-[10px] text-slate-500 font-mono relative z-10 border-t border-line/40">
        <span>© 2026 Unite Greentek Limited (UK). Brand: Unite Solar. Parent: Unite Group Inc., USA. Authorised personnel only.</span>
      </footer>

    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SEOHead } from '../../components/ui/SEOHead';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const AdminLoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/admin';

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Invalid administrator credentials';
      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/80 flex flex-col items-center justify-center p-6 text-slate-900 relative font-sans selection:bg-slate-900 selection:text-white">
      <SEOHead
        title="Admin Login — Science Academy Ratlam"
        description="Administrator portal login for Science Academy Ratlam control center."
      />

      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-2xl p-8 sm:p-10 shadow-xl flex flex-col gap-8 relative z-10">
        
        {/* Card Header Brand Identity */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Science Academy</h1>
            <p className="text-xs uppercase font-bold tracking-wider text-slate-500 mt-1">Admin Portal & Control Center</p>
          </div>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-3 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
          
          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Administrator Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                {...register('email')}
                placeholder="admin@scienceacademy.in"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <span className="text-xs text-rose-600 font-medium mt-0.5">{errors.email.message}</span>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <span className="text-xs text-rose-600 font-medium mt-0.5">{errors.password.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Admin Portal</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="text-center border-t border-slate-100 pt-6">
          <p className="text-[11px] text-slate-500 font-medium">
            Protected Administrator Portal &bull; Science Academy Ratlam
          </p>
        </div>

      </div>
    </div>
  );
};


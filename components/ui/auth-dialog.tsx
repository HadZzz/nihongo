'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './dialog';
import { Button } from './button';
import { Input } from './input';
import { useAuth } from '@/lib/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthDialog({ isOpen, onClose }: AuthDialogProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleError = (error: any) => {
    console.error('Auth error:', error);
    if (error?.message?.includes('Rate limit')) {
      toast.error('システムが混雑しています。少々お待ちください。', {
        description: 'System is busy. Please wait a moment.',
      });
    } else if (error?.message?.includes('Invalid credentials')) {
      toast.error('メールアドレスまたはパスワードが正しくありません。', {
        description: 'Invalid email or password.',
      });
    } else if (error?.message?.includes('User already exists')) {
      toast.error('このメールアドレスは既に登録されています。', {
        description: 'This email is already registered.',
      });
    } else {
      toast.error('エラーが発生しました。', {
        description: 'An error occurred. Please try again.',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password, name);
        toast.success('アカウントが作成されました！', {
          description: 'Account created successfully!',
        });
      } else {
        await signIn(email, password);
        toast.success('ログインしました！', {
          description: 'Logged in successfully!',
        });
      }
      router.refresh();
      onClose();
      resetForm();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {isSignUp ? '新規登録' : 'ログイン'}
            <span className="mt-1 block text-sm text-gray-500">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </span>
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500">
            {isSignUp
              ? 'アカウントを作成して、すべての機能にアクセスしましょう。'
              : 'アカウントにログインして、続けましょう。'}
            <span className="mt-1 block text-xs">
              {isSignUp
                ? 'Create an account to access all features.'
                : 'Sign in to your account to continue.'}
            </span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                名前
                <span className="ml-1 text-xs text-gray-500">Name</span>
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isSignUp}
                disabled={loading}
                placeholder="Your name"
                minLength={2}
                maxLength={50}
              />
            </div>
          )}

          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              メール
              <span className="ml-1 text-xs text-gray-500">Email</span>
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              パスワード
              <span className="ml-1 text-xs text-gray-500">Password</span>
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="••••••••"
              minLength={8}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            aria-disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="mr-2">Loading...</span>
              </span>
            ) : isSignUp ? (
              '新規登録 / Sign Up'
            ) : (
              'ログイン / Sign In'
            )}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => {
              setIsSignUp(!isSignUp);
              resetForm();
            }}
            disabled={loading}
          >
            {isSignUp ? 'ログインへ / Sign In' : '新規登録へ / Sign Up'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

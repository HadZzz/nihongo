'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Twitter, Instagram, Mail } from 'lucide-react';

const footerLinks = [
  { label: 'ホーム', english: 'Home', href: '/' },
  { label: '漫画', english: 'Manga', href: '/manga' },
  { label: '文化', english: 'Culture', href: '/culture' },
  { label: 'イベント', english: 'Events', href: '/events' },
  { label: '私たちについて', english: 'About', href: '/about' },
  { label: 'お問い合わせ', english: 'Contact', href: '/contact' },
];

const socialLinks = [
  {
    label: 'GitHub',
    icon: Github,
    href: 'https://github.com',
  },
  {
    label: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com',
  },
  {
    label: 'Instagram',
    icon: Instagram,
    href: 'https://instagram.com',
  },
  {
    label: 'Email',
    icon: Mail,
    href: 'mailto:contact@example.com',
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white/50 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-950/50">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <Link href="/" className="group inline-flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary transition-colors duration-300 ease-in-out group-hover:text-primary/80">
              日本語
            </span>
            <span className="text-sm font-medium text-gray-600 transition-colors duration-300 ease-in-out group-hover:text-primary dark:text-gray-400">
              Nihongo
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group inline-flex flex-col items-center"
              >
                <span className="text-sm text-gray-600 transition-colors duration-200 ease-in-out group-hover:text-primary dark:text-gray-400 dark:group-hover:text-primary">
                  {link.label}
                </span>
                <span className="text-xs text-gray-500 transition-colors duration-200 ease-in-out group-hover:text-primary/70 dark:text-gray-500">
                  {link.english}
                </span>
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-600 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">{social.label}</span>
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p> {new Date().getFullYear()} 日本語 Explorer</p>
            <p className="mt-1 text-xs">
              日本の文化、言語、伝統を探求するプラットフォーム
              <span className="block">
                A platform to explore Japanese culture, language, and traditions
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

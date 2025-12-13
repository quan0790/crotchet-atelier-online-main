import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ReactNode } from 'react';

export function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar is fixed */}
      <Navbar />

      {/* Main content with padding-top to avoid overlap with fixed navbar */}
      <main className="flex-1 pt-24">
        {children}
      </main>

      <Footer />
    </div>
  );
}

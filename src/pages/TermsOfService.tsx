import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { FileText, Shield, ShoppingCart, CreditCard, AlertCircle, Users } from 'lucide-react';

const termsSections = [
  {
    icon: FileText,
    title: 'Acceptance of Terms',
    description:
      'By accessing or using Crochet Atelier, you agree to these Terms of Service. Please read them carefully before using our website or services.',
  },
  {
    icon: Shield,
    title: 'User Responsibilities',
    description:
      'You agree to provide accurate information, use our website lawfully, and not engage in any activity that could harm our services or reputation.',
  },
  {
    icon: ShoppingCart,
    title: 'Orders & Payment',
    description:
      'All orders are subject to availability. Prices, taxes, and shipping fees are displayed at checkout. Payments are processed securely through our payment partners.',
  },
  {
    icon: CreditCard,
    title: 'Refunds & Returns',
    description:
      'Due to the handmade nature of our products, refunds and returns are handled on a case-by-case basis. Please contact us for assistance with returns or exchanges.',
  },
  {
    icon: AlertCircle,
    title: 'Limitation of Liability',
    description:
      'Crochet Atelier is not liable for any direct or indirect damages arising from the use of our products or website, except where prohibited by law.',
  },
  {
    icon: Users,
    title: 'Governing Law',
    description:
      'These Terms are governed by the laws of Kenya. Any disputes will be resolved in accordance with local regulations and applicable laws.',
  },
];

export default function TermsOfService() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 lg:py-24 max-w-5xl">
        <h1 className="font-serif text-4xl font-bold mb-10 text-center">Terms of Service</h1>

        <p className="text-center text-muted-foreground mb-12 text-lg">
          Welcome to <strong>Crochet Atelier</strong>. These Terms outline the rules and guidelines for using our website and services.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {termsSections.map((section) => (
            <div
              key={section.title}
              className="flex gap-4 p-6 bg-card rounded-2xl shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <section.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{section.title}</h3>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-card rounded-2xl p-8 shadow-md text-center">
          <h2 className="font-serif text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-muted-foreground mb-2">
            For questions regarding these Terms, reach out to us via:
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
            <Link
              to="https://wa.me/254790264792"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
            >
              <FileText className="h-4 w-4" />
              WhatsApp
            </Link>
            <Link
              to="mailto:info@crochetatelier.com"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              <FileText className="h-4 w-4" />
              Email
            </Link>
            <Link
              to="https://www.instagram.com/crochets_atelier"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors"
            >
              <Users className="h-4 w-4" />
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

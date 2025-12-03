import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Shield, User, Settings, Activity, AlertCircle, Lock, Users, Mail } from 'lucide-react';

const sections = [
  {
    icon: User,
    title: 'Information We Collect',
    description:
      'We collect personal information you provide directly, such as your name, email, phone number, shipping address, and order details including customizations and payment info.',
  },
  {
    icon: Settings,
    title: 'How We Use Your Information',
    description:
      'Your information is used to process orders, communicate about your purchase, provide customer support, and send updates or newsletters if you opt-in.',
  },
  {
    icon: Activity,
    title: 'Cookies & Analytics',
    description:
      'We use cookies and analytics tools to enhance website performance, understand user behavior, and improve your shopping experience.',
  },
  {
    icon: AlertCircle,
    title: 'Sharing Your Information',
    description:
      'We do not sell or rent your personal data. Your information may be shared with trusted service providers to fulfill orders, manage payments, or comply with legal obligations.',
  },
  {
    icon: Lock,
    title: 'Data Security',
    description:
      'We take reasonable steps to protect your personal information from unauthorized access, disclosure, or alteration. However, no online service can guarantee 100% security.',
  },
  {
    icon: Shield,
    title: 'Your Rights',
    description:
      'You can request access to your personal data, update or correct it, or opt-out of marketing communications. Contact us to exercise these rights.',
  },
  {
    icon: Users,
    title: 'Children’s Privacy',
    description:
      'Our website and services are not intended for children under 13. We do not knowingly collect personal data from children.',
  },
];

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 lg:py-24 max-w-5xl">
        <h1 className="font-serif text-4xl font-bold mb-10 text-center">Privacy Policy</h1>

        <p className="text-center text-muted-foreground mb-12 text-lg">
          At <strong>Crochet Atelier</strong>, your privacy matters. This page explains how we collect, use, and protect your information.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
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
            For privacy questions, reach out to us via:
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
            <Link
              to="https://wa.me/254790264792"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
            >
              <Mail className="h-4 w-4" />
              WhatsApp
            </Link>
            <Link
              to="mailto:info@crochetatelier.com"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              <Mail className="h-4 w-4" />
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

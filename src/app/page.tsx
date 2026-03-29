import { HeroSection } from '@/components/landing/hero-section';
import { FeatureHighlights } from '@/components/landing/feature-highlights';

export const metadata = {
  title: 'CareBridge AI - Post-Hospital Recovery Platform',
  description:
    'Real-time monitoring and AI-powered care coordination for post-hospital recovery. Connect patients with healthcare providers instantly.',
};

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <FeatureHighlights />

      {/* Footer */}
      <footer className="w-full py-12 px-4 bg-slate-900 text-white border-t border-slate-800">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">CareBridge AI</h4>
              <p className="text-sm text-slate-400">
                Bridging the care gap between hospital and home recovery.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-3 text-sm">Product</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3 text-sm">Company</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3 text-sm">Legal</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    HIPAA
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
            <div>&copy; 2024 CareBridge AI. All rights reserved.</div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">
                Twitter
              </a>
              <a href="#" className="hover:text-white transition">
                LinkedIn
              </a>
              <a href="#" className="hover:text-white transition">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

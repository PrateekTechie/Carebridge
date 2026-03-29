'use client';

import { Button } from '@/components/ui/button';
import { ConstellationBackground } from '@/components/shared/contelation-background';
import Link from 'next/link';

export function HeroSection() {
  return (
    <div className="relative w-full min-h-screen gradient-bg flex items-center justify-center overflow-hidden">
      <ConstellationBackground />

      <div className="relative z-10 container mx-auto px-4 py-20 max-w-4xl">
        <div className="space-y-8 text-center">
          {/* Pre-heading */}
          <div className="inline-block">
            <div className="text-sm font-semibold text-primary">
              Real-time Care Coordination
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
            Bridging the Gap Between Hospital and{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Home Recovery
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            CareBridge AI connects post-hospital patients with their care team through real-time
            monitoring, AI-powered insights, and intelligent alerts. Trust the care gap to be bridged.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/doctor">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold card-hover"
              >
                For Healthcare Providers
              </Button>
            </Link>
            <Link href="/patients">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/5 px-8 py-6 text-lg font-semibold card-hover"
              >
                For Patients
              </Button>
            </Link>
          </div>

          {/* Trust Indicator */}
          <div className="pt-12 border-t border-border">
            <p className="text-sm text-muted-foreground mb-6">
              Trusted by healthcare leaders for post-operative care
            </p>
            <div className="flex justify-center gap-6 text-xs text-muted-foreground">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div>Patients Monitored</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div>Healthcare Partners</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div>Adherence Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}

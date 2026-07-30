'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, CheckCircle2, Loader2, Send } from 'lucide-react';
import { site } from '@/lib/site';
import { socials } from '@/lib/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { SocialIcons } from '@/components/ui/SocialIcons';

/**
 * Contact, a working form with progressive enhancement.
 * If NEXT_PUBLIC_FORM_ENDPOINT (e.g. a Formspree URL) is set, it POSTs there.
 * Otherwise it falls back to opening the visitor's email client via mailto.
 */
const ENDPOINT = site.formEndpoint || process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '');
    const email = String(data.get('email') || '');
    const message = String(data.get('message') || '');

    if (!ENDPOINT) {
      // Fallback: compose an email.
      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n,  ${name} (${email})`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus('sent');
      return;
    }

    try {
      setStatus('sending');
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      setStatus(res.ok ? 'sent' : 'error');
      if (res.ok) form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="section-pad border-t border-border">
      <div className="container grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's work together."
            lead="Open to roles and freelance projects in digital marketing, UX and business, in the Netherlands and remote."
          />
          <div className="mt-10 space-y-5">
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-lg hover:text-accent">
              <Mail className="h-5 w-5 text-accent" /> {site.email}
            </a>
            <p className="flex items-center gap-3 text-muted">
              <MapPin className="h-5 w-5 text-accent" /> {site.location}
            </p>
            <div className="flex items-center gap-3 text-muted">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400" />
              </span>
              Available for new opportunities
            </div>
            <SocialIcons socials={socials} className="pt-2" />
          </div>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass space-y-5 rounded-3xl p-6 md:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" type="text" required autoComplete="name" />
            <Field label="Email" name="email" type="email" required autoComplete="email" />
          </div>
          <Field label="Company (optional)" name="company" type="text" />
          <div>
            <label htmlFor="message" className="mb-2 block text-sm text-muted">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full resize-none rounded-xl border border-border bg-bg/60 px-4 py-3 text-fg outline-none transition-colors focus:border-accent"
              placeholder="Tell me about the role or project…"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button type="submit" size="lg" disabled={status === 'sending'}>
              {status === 'sending' ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
              ) : (
                <><Send className="h-4 w-4" /> Send message</>
              )}
            </Button>
            {status === 'sent' && (
              <span className="inline-flex items-center gap-2 text-sm text-green-400">
                <CheckCircle2 className="h-4 w-4" /> Thanks, I&apos;ll be in touch.
              </span>
            )}
            {status === 'error' && (
              <span className="text-sm text-red-400">Something went wrong. Please email me directly.</span>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label, name, type, required, autoComplete,
}: {
  label: string; name: string; type: string; required?: boolean; autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm text-muted">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-border bg-bg/60 px-4 py-3 text-fg outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center">
      <div className="container text-center">
        <p className="font-display text-display-lg font-semibold text-gradient">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold">This page wandered off.</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/" magnetic>Back home</Button>
        </div>
      </div>
    </section>
  );
}

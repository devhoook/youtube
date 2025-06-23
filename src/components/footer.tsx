'use client';

import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background text-foreground">
      <div className="container mx-auto flex flex-col items-center py-8 px-6 text-center">
        <p className="text-sm text-muted-foreground">
          Click on the button and it will start downloading.
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          By using our Web-app, you agree to our <Link href="#" className="underline hover:text-primary">Terms of Use.</Link>
        </p>
        <Separator className="w-full max-w-xl" />
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-sm">
          <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
            Contact
          </Link>
          <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
            Copyright Claims
          </Link>
          <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
            ToU
          </Link>
        </div>
      </div>
    </footer>
  );
}

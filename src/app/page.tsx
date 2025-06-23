'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { AlertCircle, Loader2, Music } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { convertUrl } from './actions';

interface FormState {
  success: boolean;
  error?: string | null;
  base64?: string | null;
  title?: string | null;
}

const initialState: FormState = {
  success: false,
  error: null,
  base64: null,
  title: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full sm:w-auto" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Converting...
        </>
      ) : (
        'Convert to MP3'
      )}
    </Button>
  );
}

export default function Home() {
  const [state, formAction] = useFormState(convertUrl, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && state.base64 && state.title) {
      try {
        const byteCharacters = atob(state.base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'audio/mpeg' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = state.title;
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        formRef.current?.reset();
      } catch (e) {
        console.error("Error decoding or downloading file:", e);
      }
    }
  }, [state.success, state.base64, state.title]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-xl shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Music className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline text-3xl font-bold">AudioClipper</CardTitle>
          <CardDescription className="text-muted-foreground">
            Convert any YouTube video to a high-quality MP3 file in seconds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="url-input" className="sr-only">YouTube URL</label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  id="url-input"
                  name="url"
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                  className="flex-grow text-base"
                />
                <SubmitButton />
              </div>
            </div>
          </form>
        </CardContent>
        {state.error && (
          <CardFooter>
            <Alert variant="destructive" className="w-full">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Conversion Failed</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

'use client';

import { useState, useRef } from 'react';
import { AlertCircle, Loader2, Music } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const url = formData.get('url') as string;

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ youtubeURL: url }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        
        const disposition = response.headers.get('content-disposition');
        let filename = 'audio.mp3';
        if (disposition && disposition.indexOf('attachment') !== -1) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) {
                filename = matches[1].replace(/['"]/g, '');
            }
        }
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        window.URL.revokeObjectURL(downloadUrl);
        formRef.current?.reset();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'An unknown error occurred during conversion.');
      }
    } catch (err) {
      setError('A network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] w-full flex-col items-center justify-start bg-background p-4 sm:p-8">
      <div className="w-full max-w-xl">
        <Card className="shadow-2xl">
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
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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
                    disabled={isLoading}
                  />
                  <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Converting...
                      </>
                    ) : (
                      'Convert to MP3'
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
          {error && (
            <CardFooter>
              <Alert variant="destructive" className="w-full">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Conversion Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </CardFooter>
          )}
        </Card>
      </div>

      <article className="mt-16 w-full max-w-4xl space-y-6 text-foreground">
        <h2 className="font-headline text-2xl font-bold text-primary dark:text-primary-foreground/90">YtMp3 - Youtube to Mp3 Converter Free</h2>
        <p className="text-muted-foreground">YtMp3 is a free youtube downloader and Audio Downloader. Download unlimited videos in all formats, including 4k, MP4, M4V, MKV, 3GP, WMV, AVI, FLV, MP3, and WEBM videos using our yt to mp3 downloader for free.</p>
        <p className="text-muted-foreground">You can download and convert videos from all over the internet using the search box. Try our youtube to mp3 converter today for easy and convenient downloading of your favourite content.</p>
        <p className="text-muted-foreground">Additionally, YtMp3 does not need users to create an account. Making it a convenient option for downloading videos from many video streaming websites.</p>

        <h3 className="font-headline text-xl font-semibold pt-4">The Best Video to Audio Converter</h3>
        <p className="text-muted-foreground">Our tool has an awesome feature that allows you to convert any video into audio by pasting a copied URL into the search bar.</p>
        <p className="text-muted-foreground">Select the mp3 format from the available options and convert the video to audio format. Our service also allows you to create your music playlist for your mobile device.</p>

        <h3 className="font-headline text-xl font-semibold pt-4">Why Use Our YouTube Downloader</h3>
        <p className="text-muted-foreground">When streaming videos online, you often want to download and watch them later due to a shortage of time, for you must download videos to your computer or mobile device.</p>
        <p className="text-muted-foreground">There are many video downloader apps and websites available for downloading videos. But most of them need you to install those apps on your mobile device, which can use your system resources and space.</p>
        <p className="text-muted-foreground">Our youtube to mp3 service is a free video downloader. It provides the best audio quality in different formats without downloading the app. You only have to paste the video URL from any streaming website to download on your device and enjoy it offline.</p>

        <h3 className="font-headline text-xl font-semibold pt-4">Features of Our Converter</h3>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li><strong>User-friendly interface:</strong> Our converter is easy to navigate and understand, making converting and downloading videos simple.</li>
          <li><strong>No personal information required:</strong> Users do not need to create an account or provide any personal information to use our service.</li>
          <li><strong>Wide range of streaming sites:</strong> We allow you to download videos from Youtube, Facebook, Vimeo, Instagram, Dailymotion and many other popular streaming sites.</li>
          <li><strong>Variety of download options:</strong> Our youtube to mp4 service allows users to download videos in various formats, including 4k, MP4, M4V, MKV, 3GP, WMV, AVI, FLV, MP3, and WEBM.</li>
          <li><strong>High-quality video and audio downloads:</strong> Download high-quality Videos and audio tracks, providing users with a clear and enjoyable viewing or listening experience.</li>
          <li><strong>Free to use:</strong> Our service is free and doesn’t require any subscription or payment.</li>
          <li><strong>Compatibility with a wide range of devices and platforms:</strong> YtMp3 is compatible with all devices, including computers, smartphones, and tablets.</li>
          <li><strong>Download multiple videos:</strong> Users can download multiple videos simultaneously, making it easier and more efficient to download multiple files.</li>
          <li><strong>No need for additional software:</strong> There is no need to install any additional software. Users can use the website to convert and download videos.</li>
        </ul>

        <h3 className="font-headline text-xl font-semibold pt-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">What is this youtube to mp3 service?</h4>
            <p className="text-muted-foreground">YtMp3 is a website that allows users to convert and download videos from streaming websites in various formats, such as MP4, MP3, and more. The website is free to use and does not require users to create an account or provide any personal information.</p>
          </div>
          <div>
            <h4 className="font-semibold">Is it legal to use a youtube downloader?</h4>
            <p className="text-muted-foreground">While our service itself is legal, downloading copyrighted content is not. Users should only download videos that are in the public domain or for which they have obtained permission from the copyright owner.</p>
          </div>
          <div>
            <h4 className="font-semibold">Is it safe to use a yt to mp3 converter?</h4>
            <p className="text-muted-foreground">Yes, our converter is safe to use since it does not require users to provide personal information on the website. Users can download videos without worrying about their personal information being leaked to third parties.</p>
          </div>
          <div>
            <h4 className="font-semibold">How do I download a video with this tool?</h4>
            <p className="text-muted-foreground">To download a video, go to the website, locate the search bar on the homepage, and copy the video link you want to convert and download. Paste the link in the search bar, select the format you want to download the video in and click on the “Download” button. A pop-up window may appear asking you where to save the file; select a location on your device and click “Save”.</p>
          </div>
        </div>
      </article>
    </div>
  );
}

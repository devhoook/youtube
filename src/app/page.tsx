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
    <div className="flex w-full flex-col items-center justify-start bg-background p-4 sm:p-8">
      <div className="w-full max-w-xl">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Music className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-3xl font-bold">YtMp3</CardTitle>
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
        <p className="text-muted-foreground">Sometimes other downloaders can’t save the video to your mobile device and PC. But, this tool provides complete access to the video to save it to any storage type.</p>
        <p className="text-muted-foreground">YtMp3 is a complete solution for all your video downloading requirements. You can use it on your windows PC to make downloading easy and convenient. You can also download Facebook videos through our platform, similar to a y2mate service.</p>

        <h3 className="font-headline text-xl font-semibold pt-4">Features of Our Converter</h3>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li><strong>User-friendly interface:</strong> Our converter is easy to navigate and understand, making converting and downloading videos simple.</li>
          <li><strong>No personal information required:</strong> Users do not need to create an account or provide any personal information to use our service.</li>
          <li><strong>Wide range of streaming sites:</strong> We allow you to download videos from Youtube, Facebook, Vimeo, Instagram, Dailymotion and many other popular streaming sites.</li>
          <li><strong>Variety of download options:</strong> Our youtube to mp4 service allows users to download videos in various formats, including 4k, MP4, M4V, MKV, 3GP, WMV, AVI, FLV, MP3, and WEBM.</li>
          <li><strong>High-quality video and audio downloads:</strong> Download high-quality Videos and audio tracks, providing users with a clear and enjoyable viewing or listening experience.</li>
          <li><strong>Free to use:</strong> Our service is free and doesn’t require any subscription or payment.</li>
          <li><strong>Compatibility with a wide range of devices and platforms:</strong>YtMp3 is compatible with all devices, including computers, smartphones, and tablets.</li>
          <li><strong>Download multiple videos:</strong> Users can download multiple videos simultaneously, making it easier and more efficient to download multiple files.</li>
          <li><strong>No need for additional software:</strong> There is no need to install any additional software. Users can use the website to convert and download videos.</li>
        </ul>

        <h3 className="font-headline text-xl font-semibold pt-4">Download YouTube Videos to MP3 & MP4</h3>
        <p className="text-muted-foreground">Convert & download video from YouTube, Facebook, Instagram, Vimeo, Dailymotion, etc., to 4k, MP4, M4V, MKV, 3GP, WMV, AVI, FLV, MP3, and WEBM in HD quality.</p>
        <p className="text-muted-foreground">YtMp3 is a free online youtube downloader. You can search thousands of videos by the search box without opening any streaming site.</p>
        <p className="text-muted-foreground">Our youtube to mp4 converter gives users the experience of downloading videos in MP4 format in high quality, and you can also convert videos to MP3 format.</p>
        
        <h3 className="font-headline text-xl font-semibold pt-4">Converter App for PC Download</h3>
        <p className="text-muted-foreground">You can also use our tool on your PC and enjoy all its features. You can download unlimited videos from youtube, Facebook, and Instagram. You can also share them on WhatsApp.</p>
        <p className="text-muted-foreground">Use our service today to download MP4 and MP3 songs and music for free.</p>
        <p className="text-muted-foreground">This yt to mp3 tool is a free, world-class online video downloader. It allows you to download videos from any video streaming website.</p>
        <p className="text-muted-foreground">Our downloader provides a wide variety of formats like 4k, MP4, M4V, MKV, 3GP, WMV, AVI, FLV, MP3, and WEBM.</p>
        <p className="text-muted-foreground">It lets you enjoy 4k HD videos on big screens like TV and PC. But you can download average-quality videos according to your device.</p>
        <p className="text-muted-foreground">YtMp3 allows you to watch videos offline on android, iphone phones, or tablets.</p>
        
        <h3 className="font-headline text-xl font-semibold pt-4">Online Video Downloader</h3>
        <p className="text-muted-foreground">Our downloader allows you to download videos from streaming websites in High quality. The wide range of formats available to download are 4k, MP4, M4V, MKV, 3GP, WMV, AVI, FLV, MP3, and WEBM.</p>
        <p className="text-muted-foreground">This downloader is completely free of cost and doesn’t ask its users to register. You can enjoy unlimited downloads without installing any third-party software.</p>
        
        <h3 className="font-headline text-xl font-semibold pt-4">How to Download Videos?</h3>
        <p className="text-muted-foreground">Our user interface is very easy to understand. It allows users to download their required video for free in a few clicks. The download speed is very fast.</p>
        <p className="text-muted-foreground">You don’t have to wait long to enjoy your downloaded videos.</p>
        <p className="text-muted-foreground">You can download the videos by using the following easy procedure:</p>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>Open our website.</li>
          <li>In the search bar on the homepage, enter the URL of the video that you want to convert and download.</li>
          <li>Click the “Convert” button.</li>
          <li>Wait for the video to be processed, and select the format you want to download.</li>
          <li>Click the “Download” button to begin the download process.</li>
          <li>Once the download is complete, the video will be saved to your device.</li>
        </ul>
        <p className="text-muted-foreground">Please note that downloading copyrighted content is illegal and should be avoided. Also, some countries may be unable to access the website, or some videos may be blocked.</p>
        
        <h3 className="font-headline text-xl font-semibold pt-4">MP3 & MP4 Converter</h3>
        <p className="text-muted-foreground">Our converter supports all Video and Audio formats.</p>
        <p className="text-muted-foreground">You can convert Videos to Audio formats like M4A, MP3, WAV, AAC, OGG, WMA, and FLAC, or you can download videos in formats like AVI, MP4, MPG, MOV, WMV, MKV, M4V, WEBM, FLV, 3GP.</p>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>Go to the YtMp3 website.</li>
          <li>Locate the search bar on the homepage and copy the link of the video that you want to convert and download.</li>
          <li>Paste the video link in the search bar and click “Convert”.</li>
          <li>Wait for the website to process the video. Depending on the video size and internet speed, it may take a few seconds.</li>
          <li>Select the format from the list. It could be 4k, MP4, M4V, MKV, 3GP, WMV, AVI, FLV, MP3, and WEBM.</li>
          <li>Click on the “Download” button for the format you’ve selected.</li>
          <li>A pop-up window may appear asking you where to save the file; select a location on your device and click “Save”</li>
          <li>Wait for the download to complete.</li>
          <li>Once the download is complete, you can find the video where you’ve saved it.</li>
        </ul>
        <p className="text-muted-foreground">This online Video to Audio Converter can convert videos into MP3 formats with a few clicks. The web-app supports all MP3 formats like 128kbps, 320kbps, 64kbps, 96kbps, 192kbps, 256 kbps.</p>
        
        <h3 className="font-headline text-xl font-semibold pt-4">Is It Safe to Convert YouTube Videos?</h3>
        <p className="text-muted-foreground">There are many video downloaders available on the internet. But our tool is the best and safest downloader. It does not need registration, so you don’t have to give out your personal information.</p>
        <p className="text-muted-foreground">YtMp3 is safe and secure. It provides the users with a smooth experience to enjoy their favourite content.</p>
        
        <h3 className="font-headline text-xl font-semibold pt-4">Video to Audio Converter – The best MP3 Converter & Downloader</h3>
        <p className="text-muted-foreground">Our youtube downloader is a free tool that converts videos from many streaming websites to MP3. Many formats are available, like M4A, MP3, WAV, AAC, OGG, WMA, and FLAC.</p>
        <p className="text-muted-foreground">You can choose from different audio qualities such as 128kbps, 320kbps, 64kbps, 96kbps, 192kbps, and 256 kbps.</p>
        <p className="text-muted-foreground">This tool can convert thousands of videos from streaming websites. You can download your favourite music for free. YtMp3 supports all device formats, such as Windows, Mac or Linux, Android, and iPhone.</p>
        <p className="text-muted-foreground">Our service does not need any registration to download and convert. All it needs is a video URL that you want to convert. Choose the format and click “Download” to start the conversion.</p>
        
        <h3 className="font-headline text-xl font-semibold pt-4">How to convert YouTube videos to MP3?</h3>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>Enter keywords or Video URLs into the search box.</li>
          <li>Choose MP3 with the quality you want to convert and click the “Download” button.</li>
          <li>Wait for the conversion to complete and download the file. It is very easy and fast.</li>
        </ul>
        <p className="text-muted-foreground"><strong>Pro Tip:</strong> Insert “pp” after the word “YouTube” in the link to download videos and mp3 files from YouTube in a faster way.</p>
        
        <h3 className="font-headline text-xl font-semibold pt-4">Limitations of Online Converters</h3>
        <p className="text-muted-foreground">While our service offers a convenient and efficient way to download videos from streaming websites, there are some limitations to be aware of:</p>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li><strong>Legal implications of downloading copyrighted content:</strong>Downloading copyrighted content is illegal and should be avoided. YtMp3 does not support or condone the download of copyrighted content.</li>
          <li><strong>Potential for ads and pop-ups:</strong>The website may contain ads and pop-ups, distracting and intrusive. Some of them may also contain malware or try to trick users into downloading unnecessary software.</li>
          <li><strong>Limited support for other video-sharing platforms:</strong>YtMp3 is primarily focused on downloading videos from streaming websites; it may not support other video-sharing platforms.</li>
          <li><strong>Video availability:</strong>Some videos may not be available to download due to copyright restrictions or country restrictions.</li>
          <li><strong>Quality:</strong>The quality of the final downloaded video may vary; it depends on the video’s original quality on streaming websites.</li>
          <li><strong>Not all formats may be available:</strong> The availability may depend on the video and website updates.</li>
          <li><strong>Potential security issues:</strong> As with any website, there is a risk of security issues when using online converters. Users should be careful when clicking links or downloading files and keep their computer’s anti-virus software current.</li>
        </ul>
        
        <h3 className="font-headline text-xl font-semibold pt-4">YouTube to MP3 Converter Review 2023</h3>
        <p className="text-muted-foreground">YtMp3 is currently not available for android devices. But soon, you will be able to download and install the app. You can use our service on your mobile web browser, and you can download the videos for free.</p>
        
        <h3 className="font-headline text-xl font-semibold pt-4">Our Final Thoughts</h3>
        <p className="text-muted-foreground">There are many downloader tools and websites on the internet. Most of them need you to register by entering their personal information. It may also ask you to install on their devices, which takes storage space.</p>
        <p className="text-muted-foreground">All you have to do is to enter the keyword or Video URL, and YtMp3 will do the rest.</p>
        <p className="text-muted-foreground">There are no disturbing pop-up ads on YtMp3, making it a smooth and easy experience for the users. There is also no limit for you to download the videos, which means that you can download the videos as many as you want</p>
        <p className="text-muted-foreground">YtMp3 is 100% safe and secure. The developers have made sure to make it clean from Viruses, malware, spyware, and Trojans. You can add browser extensions on Firefox, Google Chrome, Opera, and Explorer.</p>
        <p className="text-muted-foreground">YtMp3 is a very handy website because it is free and easy to use. You can download videos from thousands of streaming websites like YouTube, Facebook, Instagram, Vimeo, Dailymotion, Youku etc.</p>
        <p className="text-muted-foreground">Our tool also allows you to convert videos into any Video or Audio format, and can download videos in different qualities such as 720-WebM, 360-mp4, 1080-web and 128kbps, 320kbps, 64kbps, 96kbps, 192kbps, 256 kbps.</p>
        
        <h3 className="font-headline text-xl font-semibold pt-4">Conclusion</h3>
        <p className="text-muted-foreground">In conclusion, YtMp3 is a useful and convenient website for converting and downloading streaming websites videos in a variety of formats.</p>
        <p className="text-muted-foreground">It offers a user-friendly interface, does not require users to provide personal information, and offers high-quality video and audio downloads.</p>
        <p className="text-muted-foreground">Additionally, the website is free to use, compatible with a wide range of devices and platforms, and allows users to download multiple videos simultaneously.</p>
        <p className="text-muted-foreground">However, it’s important to note that downloading copyrighted content is illegal and should be avoided. The website may also contain ads and pop-ups, which can be distracting and intrusive. Some videos may not be available to download due to copyright or country restrictions.</p>
        <p className="text-muted-foreground">Additionally, the website may have limitations in supporting other video-sharing platforms.</p>
        <p className="text-muted-foreground">Overall, YtMp3 is a convenient and efficient way to download videos from streaming websites, but users should be aware of the limitations and not download copyrighted content.</p>
        
        <h3 className="font-headline text-xl font-semibold pt-4">Instructions</h3>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>Search by name or directly paste the link of the video you want to convert</li>
          <li>Click the “Convert” button to process converting</li>
          <li>Select the video/audio format you want to download, then click the “Download” button</li>
        </ul>
        
        <h3 className="font-headline text-xl font-semibold pt-4">Features</h3>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>Unlimited downloads and always free</li>
          <li>High-speed video converter</li>
          <li>No registration is required</li>
          <li>Support downloading with all formats</li>
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
            <p className="text-muted-foreground">To download a video, go to the website, locate the search bar on the homepage, and copy the video link you want to convert and download. Paste the link in the search bar, select the format you want to download the video in and click on the “Download” button. A pop-up window may appear asking you where to save the file; select a location on your device and click “Save”</p>
          </div>
          <div>
            <h4 className="font-semibold">Can I download videos in different formats?</h4>
            <p className="text-muted-foreground">Yes, our tool allows users to download videos in various formats, including 4k, MP4, M4V, MKV, 3GP, WMV, AVI, FLV, MP3, and WEBM.</p>
          </div>
          <div>
            <h4 className="font-semibold">Can I download multiple videos at once?</h4>
            <p className="text-muted-foreground">Yes, you can download multiple videos simultaneously, making it easier and more efficient to download multiple files.</p>
          </div>
          <div>
            <h4 className="font-semibold">Can I use this converter on my mobile device?</h4>
            <p className="text-muted-foreground">Yes, YtMp3 can be accessed on mobile devices through the web.</p>
          </div>
        </div>
      </article>
    </div>
  );
}

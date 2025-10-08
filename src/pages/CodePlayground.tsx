import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Download, Share2, Code2 } from 'lucide-react';
import { toast } from 'sonner';
import { MainNav } from '@/components/MainNav';
import { SocialMediaFooter } from '@/components/SocialMediaFooter';

export default function CodePlayground() {
  const [html, setHtml] = useState('<h1>Hello World!</h1>\n<p>Start coding here...</p>');
  const [css, setCss] = useState('body {\n  font-family: Arial, sans-serif;\n  padding: 20px;\n}\n\nh1 {\n  color: #4F46E5;\n}');
  const [js, setJs] = useState('// Write your JavaScript here\nconsole.log("Hello from Code Playground!");');
  const [output, setOutput] = useState('');
  const [activeTab, setActiveTab] = useState('html');

  useEffect(() => {
    runCode();
  }, [html, css, js]);

  const runCode = () => {
    const code = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>
            try {
              ${js}
            } catch (error) {
              console.error('Error:', error);
              document.body.innerHTML += '<div style="color: red; padding: 10px; background: #fee; margin-top: 10px;">Error: ' + error.message + '</div>';
            }
          </script>
        </body>
      </html>
    `;
    setOutput(code);
  };

  const resetCode = () => {
    setHtml('<h1>Hello World!</h1>\n<p>Start coding here...</p>');
    setCss('body {\n  font-family: Arial, sans-serif;\n  padding: 20px;\n}\n\nh1 {\n  color: #4F46E5;\n}');
    setJs('// Write your JavaScript here\nconsole.log("Hello from Code Playground!");');
    toast.success('Code reset to default');
  };

  const downloadCode = () => {
    const blob = new Blob([output], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'playground-code.html';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Code downloaded successfully');
  };

  const shareCode = async () => {
    const codeData = { html, css, js };
    const encodedData = btoa(JSON.stringify(codeData));
    const shareUrl = `${window.location.origin}/code-playground?code=${encodedData}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Share link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  // Load shared code from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedCode = params.get('code');
    if (encodedCode) {
      try {
        const decoded = JSON.parse(atob(encodedCode));
        setHtml(decoded.html || html);
        setCss(decoded.css || css);
        setJs(decoded.js || js);
        toast.success('Shared code loaded!');
      } catch (error) {
        toast.error('Failed to load shared code');
      }
    }
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Code Playground - Interactive Coding Environment",
    "description": "Practice HTML, CSS, and JavaScript with our interactive code playground. See live results as you code.",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <Helmet>
        <title>Code Playground - Interactive HTML, CSS & JavaScript Editor | Kerala Government Skills Program</title>
        <meta name="description" content="Practice coding with our interactive code playground. Write HTML, CSS, and JavaScript and see live results instantly. Perfect for learning and experimentation." />
        <meta name="keywords" content="code playground, online code editor, HTML editor, CSS editor, JavaScript editor, coding practice, web development" />
        <link rel="canonical" href="https://keralaskills.org/code-playground" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Code Playground - Interactive Coding Environment" />
        <meta property="og:description" content="Practice HTML, CSS, and JavaScript with live preview. Free interactive code editor." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://keralaskills.org/code-playground" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Code Playground - Interactive Coding Environment" />
        <meta name="twitter:description" content="Practice HTML, CSS, and JavaScript with live preview" />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
        <MainNav />
        
        <main className="container mx-auto px-4 py-8 mt-20">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary">
              <Code2 className="w-5 h-5" />
              <span className="text-sm font-medium">Interactive Code Editor</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Code Playground
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Write HTML, CSS, and JavaScript and see your code come to life instantly
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <Button onClick={runCode} className="gap-2">
              <Play className="w-4 h-4" />
              Run Code
            </Button>
            <Button onClick={resetCode} variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <Button onClick={downloadCode} variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button onClick={shareCode} variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>

          {/* Code Editor and Preview */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Code Editor */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Code Editor</h2>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="css">CSS</TabsTrigger>
                  <TabsTrigger value="js">JavaScript</TabsTrigger>
                </TabsList>

                <TabsContent value="html" className="mt-0">
                  <textarea
                    value={html}
                    onChange={(e) => setHtml(e.target.value)}
                    className="w-full h-[500px] p-4 font-mono text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Write your HTML here..."
                    spellCheck="false"
                  />
                </TabsContent>

                <TabsContent value="css" className="mt-0">
                  <textarea
                    value={css}
                    onChange={(e) => setCss(e.target.value)}
                    className="w-full h-[500px] p-4 font-mono text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Write your CSS here..."
                    spellCheck="false"
                  />
                </TabsContent>

                <TabsContent value="js" className="mt-0">
                  <textarea
                    value={js}
                    onChange={(e) => setJs(e.target.value)}
                    className="w-full h-[500px] p-4 font-mono text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Write your JavaScript here..."
                    spellCheck="false"
                  />
                </TabsContent>
              </Tabs>
            </Card>

            {/* Preview */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
              <div className="border border-border rounded-lg overflow-hidden bg-white">
                <iframe
                  srcDoc={output}
                  title="Preview"
                  sandbox="allow-scripts allow-modals"
                  className="w-full h-[560px] border-0"
                />
              </div>
            </Card>
          </div>

          {/* Tips Section */}
          <Card className="mt-8 p-6 bg-primary/5">
            <h3 className="text-lg font-semibold mb-3">💡 Quick Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Your code runs automatically as you type</li>
              <li>• Use the Share button to create a shareable link to your code</li>
              <li>• Press the Download button to save your work as an HTML file</li>
              <li>• Console messages will appear in your browser's developer console</li>
              <li>• Errors will be displayed in the preview window</li>
            </ul>
          </Card>
        </main>

        <SocialMediaFooter />
      </div>
    </>
  );
}

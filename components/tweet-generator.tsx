"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Twitter, Copy, Check, RefreshCw } from "lucide-react";

const sampleTweets = [
  "Just discovered that the best code is written after midnight with coffee ☕ Who else is guilty? #DevLife #CodingTips",
  "Hot take: AI won't replace developers, but developers who use AI will replace those who don't. Adapt or get left behind. 🚀",
  "The secret to productivity? Work in sprints, rest without guilt, and always keep learning. What's your productivity hack? 💡",
  "Remember: Every expert was once a beginner. Keep pushing, keep learning, keep growing. Your future self will thank you. 🌱",
  "Building in public is the ultimate accountability hack. When everyone watches, you ship faster. No excuses. 🔥",
];

export function TweetGenerator() {
  const [topic, setTopic] = useState("");
  const [generatedTweet, setGeneratedTweet] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateTweet = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    setGeneratedTweet("");

    // Simulate AI generation with a delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const randomTweet =
      sampleTweets[Math.floor(Math.random() * sampleTweets.length)];
    setGeneratedTweet(randomTweet);
    setIsGenerating(false);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedTweet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const regenerate = () => {
    generateTweet();
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="text-center flex flex-col gap-4">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mx-auto">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
          Tweet Generator
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto text-pretty">
          Enter a topic and let AI craft the perfect tweet for you in seconds.
        </p>
      </div>

      {/* Input Section */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Enter your topic (e.g., productivity, AI trends, web development)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generateTweet()}
            className="h-14 pl-5 pr-5 text-base bg-card border-border placeholder:text-muted-foreground/50 focus-visible:ring-primary focus-visible:border-primary"
          />
        </div>
        <Button
          onClick={generateTweet}
          disabled={!topic.trim() || isGenerating}
          className="h-12 text-base font-medium"
          size="lg"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Tweet
            </>
          )}
        </Button>
      </div>

      {/* Generated Tweet Card */}
      {generatedTweet && (
        <Card className="border-border bg-card overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Twitter className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">Your Tweet</span>
                  <span className="text-muted-foreground text-sm">
                    @username
                  </span>
                </div>
                <p className="text-foreground leading-relaxed">
                  {generatedTweet}
                </p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={copyToClipboard}
                    className="gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={regenerate}
                    disabled={isGenerating}
                    className="gap-2"
                  >
                    <RefreshCw
                      className={`h-4 w-4 ${isGenerating ? "animate-spin" : ""}`}
                    />
                    Regenerate
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!generatedTweet && !isGenerating && (
        <Card className="border-border bg-card/50 border-dashed">
          <CardContent className="p-8 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Twitter className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              Your generated tweet will appear here
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

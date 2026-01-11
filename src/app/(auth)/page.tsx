import { Github, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/forms/signin-form";
import SignUpForm from "@/components/forms/signup-form";
import OAuthContainer from "@/components/oauth-container";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthPage() {
  return (
    <main className="grid min-h-screen w-full lg:grid-cols-2">
      {/* Left Column */}
      <div className="flex flex-col justify-between px-6 py-10 md:px-12 lg:px-16 xl:px-24">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-primary flex size-10 items-center justify-center rounded-xl">
            <Wallet className="size-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">FinTrack</span>
        </div>

        {/* Content */}
        <div className="mx-auto flex w-full max-w-sm flex-col justify-center py-5">
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-foreground md:text-2xl lg:text-4xl">
              Welcome back
            </h1>
            <p className="text-muted-foreground">
              Enter your details to track your wealth.
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Create Account</TabsTrigger>
            </TabsList>
            <div className="mt-8">
              <TabsContent value="login">
                <LoginForm />
                <OAuthContainer />
              </TabsContent>
              <TabsContent value="register">
                <SignUpForm />
                <OAuthContainer />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Footer Text */}
        <div className="text-muted-foreground text-xs text-center">
          By clicking continue, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-primary">
            Privacy Policy
          </Link>
          .
        </div>
      </div>

      {/* Right Column */}
      <div className="bg-primary dark:bg-primary/50 relative hidden flex-col justify-between p-10 text-white lg:flex xl:p-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-primary to-primary/10 opacity-50" />

        {/* Placeholder for top alignment if needed */}
        <div className="relative z-10" />

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-10">
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-3xl bg-primary/10 shadow-2xl backdrop-blur-sm">
            <Image
              src="/images/hero-chart.png"
              alt="FinTrack Insights"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-2 text-center">
            <div className="inline-flex items-center rounded-full bg-primary/30 dark:bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:text-foreground backdrop-blur-md border border-primary/30">
              New Feature: AI Insights
            </div>
            <blockquote className="text-3xl font-bold leading-tight tracking-tight md:text-4xl text-pretty">
              &quot;Master your money with clarity and confidence.&quot;
            </blockquote>
            <p className="text-muted dark:text-muted-foreground">
              Join 50,000+ users tracking their net worth on FinTrack.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

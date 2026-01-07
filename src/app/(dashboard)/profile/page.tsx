"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Check, Mail } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile Information</h1>
        <p className="text-muted-foreground">
          Update your photo and personal details.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-8 pt-6">
          {/* Avatar Section */}
          <div className="flex flex-col md:flex-row gap-6 md:items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex gap-4">
                <Button variant="outline">Change Photo</Button>
                <Button variant="destructive_outline">Remove</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                JPG, GIF or PNG. Max size of 800K
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-6 w-full">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input id="displayName" defaultValue="Alex Johnson" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="email" defaultValue="alex@example.com" className="pl-9" />
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Appearance Section */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize how FinTrack looks on your device.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label>Interface Theme</Label>
            <div className="flex gap-4">
              {/* Light Theme Option */}
              <div
                className={`cursor-pointer w-40 space-y-2`}
                onClick={() => setTheme("light")}
              >
                <div className={`relative rounded-md border-2 p-1 ${theme === 'light' ? 'border-blue-600' : 'border-muted'}`}>
                  <div className="space-y-2 rounded bg-[#ecedef] p-2">
                    <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                      <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                  </div>
                  {theme === 'light' && (
                    <div className="absolute bottom-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>
                <span className="block text-sm font-medium">Light</span>
              </div>

              {/* Dark Theme Option */}
              <div
                className={`cursor-pointer w-40 space-y-2`}
                onClick={() => setTheme("dark")}
              >
                <div className={`relative rounded-md border-2 p-1 ${theme === 'dark' ? 'border-primary' : 'border-muted'}`}>
                  <div className="space-y-2 rounded bg-slate-950 p-2">
                    <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                      <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-slate-400" />
                      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-slate-400" />
                      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                  </div>
                  {theme === 'dark' && (
                    <div className="absolute bottom-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>
                <span className="block text-sm font-medium">Dark</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="ghost">Cancel</Button>
        <Button>Save Changes</Button>
      </div>

    </div>
  );
}
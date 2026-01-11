"use client";

import { Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent, CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfile } from "@/hooks/use-profile";

export default function UserInformationContainer() {
  const { data: user,
    isLoading,
    isError,
    error
  } = useProfile();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="space-y-8 pt-6">
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="space-y-8 pt-6">
          <div className="flex items-center justify-center py-8">
            <p className="text-destructive">
              Error loading profile: {error?.message || "Unknown error"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="space-y-8 pt-6">
        {/* Avatar Section */}
        <div className="flex flex-col md:flex-row gap-6 md:items-center">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user?.image} alt="User avatar" />
            <AvatarFallback>
              {user?.name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
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
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="space-y-2 flex-1">
            <Label htmlFor="displayName">Display Name</Label>
            <Input id="displayName" defaultValue={user?.name || ""} />
          </div>
          <div className="space-y-2 flex-1">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                defaultValue={user?.email || ""}
                className="pl-9"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <Button variant="ghost">Cancel</Button>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  )
}
import React from "react";
import Image from "next/image";

import AuthBGImage from "$/public/assets/auth-bg.jpg";
// import { Logo } from "@/components/logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/sonner";

type Props = {
  children: React.ReactNode;
};

export default async function AuthLayout({ children }: Props) {
  return (
    <>
      <Toaster theme="system" position="bottom-left" />
      <main className="h-screen grid md:grid-cols-4 lg:grid-cols-5 relative">
        <div className="relative hidden md:flex md:col-span-2 lg:col-span-3 w-full flex-col bg-muted p-10 text-primary-foreground">
          <div className="w-full h-[30%] bg-gradient-to-t from-transparent to-black/50 absolute top-0 left-0 z-10" />
          <div className="w-full h-[50%] bg-gradient-to-b from-transparent to-black absolute bottom-0 left-0 z-10" />

          {/* Image Area */}
          <Image
            alt=""
            src={AuthBGImage}
            fill
            className="w-full h-full object-cover"
          />

          <div className="relative z-20 items-center">{/* <Logo /> */}</div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2 text-background">
              <p className="text-base font-heading font-semibold pr-28">
                &ldquo;Rathagala.lk is most exclusive Car Dealership Ad Listing
                Platform with Unlimited Ads all around in Sri Lanka.&rdquo;
              </p>

              <footer className="text-sm opacity-50">{`A.R. Perera (CEO. Rathagala.lk)`}</footer>
            </blockquote>
          </div>
        </div>

        <ScrollArea className="relative md:col-span-2 lg:col-span-2">
          <div className="sm:py-12 py-0 sm:px-8 px-0 h-screen flex flex-col items-center justify-center">
            {children}
          </div>
        </ScrollArea>
      </main>
    </>
  );
}

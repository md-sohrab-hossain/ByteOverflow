"use client";

import Image from "next/image";
import React from "react";

import { Button } from "../ui/button";

interface SocialProvider {
  name: string;
  icon: string;
  alt: string;
}

const providers: SocialProvider[] = [
  { name: "Github", icon: "/icons/github.svg", alt: "Github Logo" },
  { name: "Google", icon: "/icons/google.svg", alt: "Google Logo" },
];

const SocialLogin = ({ onLogin }: { onLogin: (provider: string) => void }) => {
  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      {providers.map((provider) => (
        <Button
          key={provider.name}
          className="background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5"
          onClick={() => onLogin(provider.name)}
        >
          <Image
            width={20}
            height={20}
            alt={provider.alt}
            src={provider.icon}
            className="invert-colors mr-2.5 object-contain"
          />
          <span>Login with {provider.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default SocialLogin;

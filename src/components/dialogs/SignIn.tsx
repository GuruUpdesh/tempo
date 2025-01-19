"use client";

import React, { useTransition } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AuthProvider, login } from "@/actions/auth";
import { LogoChip } from "@/components/Icons";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Loader } from "lucide-react";
import { IconBaseProps } from "react-icons";

type AuthButtonProps = {
    provider: AuthProvider;
    Icon: React.ComponentType<IconBaseProps>;
}

const AuthButton = ({ provider, Icon }: AuthButtonProps) => {
    const [isPending, startTransition] = useTransition();

    const handleLogin = (provider: AuthProvider) => {
        startTransition(() => {
            login(provider);
        });
    };
    return (
        <Button
            onClick={() => handleLogin(provider)}
            className="w-full flex items-center justify-center gap-2 bg-card-foreground border-t border-border capitalize"
            variant="secondary"
            disabled={isPending}
            aria-label={`Sign in with ${provider}`}
        >
            {isPending ? (
                <Loader className="h-4 w-4 animate-spin" />
            ) : (
                <Icon />
            )}
            {provider}
        </Button>
    );
};

const SignIn = () => {
    return (
        <Dialog open={true}>
            <DialogContent blur={true} className="gap-4 p-8" showCloseButton={false}>
                <div className="flex flex-col items-center gap-2 text-center">
                    <LogoChip />
                    <h1 className="text-2xl font-bold mt-2">Welcome back</h1>
                    <p>To continue either sign in or sign up</p>
                    <DialogTitle className="hidden">
                        Sign In
                    </DialogTitle>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    <AuthButton provider="google" Icon={FaGoogle} />
                    <AuthButton provider="github" Icon={FaGithub} />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SignIn;
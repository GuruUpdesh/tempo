"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { login } from "@/actions/auth";
import { Logo } from "./Icons";
import { GithubIcon } from "lucide-react";

const SignIn = () => {
    return (
        <Dialog open={true}>
            <DialogContent className="sm:max-w-[425px] gap-4 p-8" showCloseButton={false}>
                <div className="flex flex-col items-center gap-4 text-center">
                    <Logo />
                    <DialogTitle className="hidden">
                        Sign In
                    </DialogTitle>
                    <p className="text-muted-foreground text-sm">
                        To access your account, please continue with Github.
                    </p>
                </div>

                <Button
                    onClick={login}
                    className="w-full flex items-center justify-center"
                >
                    <GithubIcon className="w-5 h-5" />
                    Sign in with Github
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default SignIn;

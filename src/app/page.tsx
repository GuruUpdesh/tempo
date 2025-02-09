import { InvoiceIcon, Logo } from "@/components/Icons";
import User from "@/components/nav/User";
import NavigationBar from "@/components/landing/NavigationBar";
import { Button } from "@/components/ui/button";
import { EntryTable } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
    Clock,
    FileText,
    Search,
    ScrollText,
    ArrowRight,
    LockIcon,
    FlameIcon,
    MousePointer2,
    SearchIcon,
    Users,
    LetterText,
    DollarSign,
    GitPullRequest,
    Shield,
    GitFork,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Outfit } from "next/font/google";
import DynamicBackground from "@/components/landing/DynamicBackground";
import WordRotate from "@/components/landing/WordRotate";
import { ScrollTimer } from "@/components/landing/ScrollTimer";
import LightWrapper from "@/components/landing/LightWrapper";
import Image from "next/image";
import Link from "next/link";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { DefaultTooltip } from "@/components/ui/tooltip";
import AnimationTrigger from "@/components/landing/AnimationTrigger";
import "./animations.css";

const OutfitSans = Outfit({
    subsets: ["latin"],
});

export default function LandingPage() {
    return (
        <div className={cn("min-h-screen relative", OutfitSans.className)}>
            <NavigationBar>
                <User landingPage />
            </NavigationBar>
            <main className="max-w-[1100px] mx-auto px-4">
                <div className="text-center pt-36 pb-40">
                    <h1 className="text-7xl text-foreground pb-4">
                        Log Work Hours
                    </h1>
                    <p className="text-2xl pb-6 font-thin text-foreground/75">
                        with <span className="text-foreground">ease</span> and{" "}
                        <span className="text-foreground">peace of mind</span>
                    </p>
                    <Button
                        className="group bg-card/50 backdrop-blur-xl hover:bg-primary border-t border-transparent hover:border-t-primary-foreground focus:border-primary-foreground focus:bg-primary"
                        variant="secondary"
                        type="button"
                        aria-label="Get Started with Tempo"
                        asChild
                    >
                        <Link href="/day/0">
                            Get Started
                            <ArrowRight className="transition-transform group-hover:translate-x-1 group-focus:translate-x-1" />
                        </Link>
                    </Button>
                </div>
                <div className="relative rounded-xl border-t border-border pb-6 bg-gradient-to-t from-[#06080a] to-background p-8 flex flex-col items-center z-10">
                    <WordRotate
                        words={[
                            {
                                title: "Private & Secure",
                                icon: <LockIcon className="w-4 h-4" />,
                            },
                            {
                                title: "Blazing Fast",
                                icon: <FlameIcon className="w-4 h-4" />,
                            },
                            {
                                title: "Simple & Intuitive",
                                icon: <MousePointer2 className="w-4 h-4" />,
                            },
                        ]}
                    />
                    <ScrollTimer />
                    <div className="pb-2 flex justify-between w-full">
                        <div className="flex items-center gap-4">
                            <DefaultTooltip title="Filter by date">
                                <div className="flex gap-1">
                                    <div className="flex gap-1 rounded-md bg-card border-t border-border p-1">
                                        <div className="flex items-center px-1.5 py-1.5 text-muted-foreground rounded">
                                            <ChevronLeft size={20} />
                                        </div>

                                        <div className="flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-accent text-foreground">
                                            Day
                                        </div>

                                        <div className="flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-muted-foreground">
                                            Week
                                        </div>

                                        <div className="flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-muted-foreground">
                                            Month
                                        </div>

                                        <div className="flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-muted-foreground">
                                            Year
                                        </div>

                                        <div className="flex items-center px-1.5 py-1.5 text-muted-foreground rounded">
                                            <ChevronRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </DefaultTooltip>
                            <DefaultTooltip title="AI Summary">
                                <span className="text-muted-foreground hover:text-foreground">
                                    <InvoiceIcon />
                                </span>
                            </DefaultTooltip>
                        </div>
                        <div className="flex items-center gap-4">
                            <DefaultTooltip title="Search">
                                <span className="text-muted-foreground hover:text-foreground">
                                    <SearchIcon />
                                </span>
                            </DefaultTooltip>
                            9h 45m
                        </div>
                    </div>
                    <EntryTable className="w-full rounded-xl overflow-clip bg-card shadow">
                        <tbody className="">
                            <tr className="group relative z-0 even:bg-card-darker hover:bg-card-foreground">
                                <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm text-muted-foreground">
                                    January 31, 2025
                                </td>
                                <td className="whitespace-nowrap py-4 text-sm text tabular-nums">
                                    08:00
                                </td>
                                <td className="py-4 px-2">
                                    <ArrowRight className="h-4 w-4" />
                                </td>
                                <td className="whitespace-nowrap py-4 text-sm text tabular-nums">
                                    12:00
                                </td>
                                <td className="whitespace-nowrap py-4 pl-3 pr-3 text-sm text-muted-foreground">
                                    4h 0m
                                </td>
                                <td className="px-1 py-4 whitespace-nowrap relative flex items-center gap-2">
                                    Design review and feedback session
                                </td>
                                <td className="w-full" />
                            </tr>
                            <tr className="group relative z-0 even:bg-card-darker hover:bg-card-foreground">
                                <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm text-muted-foreground">
                                    January 30, 2025
                                </td>
                                <td className="whitespace-nowrap py-4 text-sm text tabular-nums">
                                    02:30
                                </td>
                                <td className="py-4 px-2">
                                    <ArrowRight className="h-4 w-4" />
                                </td>
                                <td className="whitespace-nowrap py-4 text-sm text tabular-nums">
                                    5:00
                                </td>
                                <td className="whitespace-nowrap py-4 pl-3 pr-3 text-sm text-muted-foreground">
                                    2h 30m
                                </td>
                                <td className="px-1 py-4 whitespace-nowrap relative flex items-center gap-2">
                                    Backend API development and documentation
                                </td>
                                <td className="w-full" />
                            </tr>
                            <tr className="group relative z-0 even:bg-card-darker hover:bg-card-foreground">
                                <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm text-muted-foreground">
                                    January 30, 2025
                                </td>
                                <td className="whitespace-nowrap py-4 text-sm text tabular-nums">
                                    07:15
                                </td>
                                <td className="py-4 px-2">
                                    <ArrowRight className="h-4 w-4" />
                                </td>
                                <td className="whitespace-nowrap py-4 text-sm text tabular-nums">
                                    10:30
                                </td>
                                <td className="whitespace-nowrap py-4 pl-3 pr-3 text-sm text-muted-foreground">
                                    3h 15m
                                </td>
                                <td className="px-1 py-4 whitespace-nowrap relative flex items-center gap-2">
                                    Client consultation and proposal drafting
                                </td>
                                <td className="w-full" />
                            </tr>
                        </tbody>
                    </EntryTable>
                </div>
                <LightWrapper>
                    <div className=" text-center pt-16">
                        <div className="gradient-mask">
                            <h2 className="text-4xl mb-2">
                                Simple time tracking for
                            </h2>
                            <p className="text-2xl font-thin">
                                contractors, freelancers, and entrepreneurs
                            </p>
                        </div>
                    </div>
                </LightWrapper>
                <AnimationTrigger>
                    <section className="mt-24">
                        <p className="bg-primary/10 text-primary w-fit px-2 rounded mb-8 mx-auto">
                            Features
                        </p>
                        <div className="stagger-children grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <FeatureCard
                                icon={<Clock className="w-6 h-6" />}
                                title="Built in Timer"
                                description="Simple and elegant, fully integrated timer"
                            />
                            <FeatureCard
                                icon={<FileText className="w-6 h-6" />}
                                title="AI Summaries"
                                description="Summarize your days work to streamline communication"
                            />
                            <FeatureCard
                                icon={<Search className="w-6 h-6" />}
                                title="Search"
                                description="Find how much time you spent on a project"
                            />
                            <FeatureCard
                                icon={<ScrollText className="w-6 h-6" />}
                                title="Timesheets"
                                description="Keep track of hours and filter by time periods"
                            />
                        </div>
                    </section>
                </AnimationTrigger>
                <AnimationTrigger>
                    <section className="mt-36 grid md:grid-cols-2 gap-16">
                        <div className="slide-in-right flex flex-col">
                            <p className="bg-primary/10 text-primary w-fit px-2 rounded mb-4">
                                Our Pricing
                            </p>
                            <h2 className="text-4xl mb-2">Free Forever</h2>
                            <p className="text-foreground/75 max-w-[600px] text-lg">
                                We believe that technology should work for you,
                                not the other way around. This means Tempo is{" "}
                                <span className="text-foreground">
                                    open source
                                </span>{" "}
                                and{" "}
                                <span className="text-foreground">
                                    free to use
                                </span>
                                .
                            </p>
                            <div className="grid grid-cols-2 gap-8 mt-8">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded bg-primary/10 w-fit text-primary">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <p className="text-lg">Unlimited Users</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded bg-primary/10 w-fit text-primary">
                                        <LetterText className="w-5 h-5" />
                                    </div>
                                    <p className="text-lg">Unlimited Logs</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded bg-primary/10 w-fit text-primary">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <p className="text-lg">Unlimited Hours</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded bg-primary/10 w-fit text-primary">
                                        <DollarSign className="w-5 h-5" />
                                    </div>
                                    <p className="text-lg">Unlimited Profit</p>
                                </div>
                            </div>
                        </div>
                        <div className="scale-up w-full h-full bg-card rounded">
                            <Image
                                src="graph.svg"
                                width={502}
                                height={280}
                                alt="A line graph comparing pricing trends, showing a blue horizontal line at $0 representing Tempo's 'Free Forever' pricing versus a rising gray line reaching $500, illustrating competitor pricing growth over time"
                            />
                        </div>
                    </section>
                </AnimationTrigger>
                <AnimationTrigger>
                    <section className="mt-36 grid md:grid-cols-2 gap-16 mb-36">
                        <div className="scale-up w-full h-full bg-card rounded overflow-clip">
                            <Image
                                src="/code.webp"
                                width={502}
                                height={280}
                                className="mix-blend-lighten"
                                alt="Visual Studio Code editor showing TypeScript code for a time entry pause function, featuring authentication checks, database queries, and error handling in a dark theme environment. File structure is visible in the sidebar showing a typical Node.js project layout."
                            />
                        </div>

                        <div className="slide-in-left flex flex-col">
                            <p className="bg-primary/10 text-primary w-fit px-2 rounded mb-4">
                                Our Difference
                            </p>
                            <h2 className="text-4xl mb-2">Open Source</h2>
                            <p className="text-foreground/75 max-w-[600px] text-lg">
                                Transparency and control. You can see how your
                                data is handled and shape the future of the
                                software you use daily.
                            </p>
                            <div className="grid grid-cols-2 gap-8 mt-8">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded bg-primary/10 w-fit text-primary">
                                        <GitPullRequest className="w-5 h-5" />
                                    </div>
                                    <p className="text-lg">Contribute Code</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded bg-primary/10 w-fit text-primary">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    <p className="text-lg">Verify Security</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded bg-primary/10 w-fit text-primary">
                                        <GitFork className="w-5 h-5" />
                                    </div>
                                    <p className="text-lg">Fork & Customize</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded bg-primary/10 w-fit text-primary">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <p className="text-lg">Join Community</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </AnimationTrigger>
                <AnimationTrigger amount={0.5}>
                    <section className="mt-36 mb-36">
                        <p className="bg-primary/10 text-primary w-fit px-2 rounded mb-4">
                            FAQ
                        </p>
                        <h2 className="text-4xl">Common Questions</h2>

                        <Accordion
                            type="single"
                            collapsible
                            className="stagger-children"
                        >
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    How can I accurately track my working hours
                                    with Tempo?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Tempo offers an intuitive built-in timer
                                    that automatically logs your work hours with
                                    precision. Simply start the timer when you
                                    begin working and pause it during breaks.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                    What is the best way to track my freelance
                                    work hours?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Designed specifically for freelancers, Tempo
                                    ensures every billable minute is recorded
                                    accurately. You can describe and log your
                                    hours helping you maintain clear records
                                    without the need for categorization.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4">
                                <AccordionTrigger>
                                    Why should I use time tracking software for
                                    my business?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Time tracking software like Tempo helps you
                                    boost productivity, improve work estimates,
                                    and ensure accurate client billing. Gain
                                    detailed insights into how you spend your
                                    work hours, identify inefficiencies, and
                                    maintain transparent records that enhance
                                    accountability and profitability.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </section>
                </AnimationTrigger>
                <DynamicBackground />
                <div className="absolute top-0 -z-20 left-[50%] translate-x-[-50%] w-full aspect-square max-h-screen overflow-hidden fade-in-5 pointer-events-none">
                    <video
                        src="/bg-lights.webm"
                        autoPlay
                        controls={false}
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="absolute blur-xl z-0"
                        width="100%"
                        height="100%"
                    />
                    <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent from-[1%] to-background to-[80%]" />
                </div>
            </main>
            <footer className="bg-card">
                <div className="max-w-[1100px] mx-auto flex flex-col gap-4 py-4">
                    <AnimationTrigger>
                        <div className="pt-6 rounded-lg flex justify-between items-center">
                            <h2 className="slide-in-right text-4xl mb-2">
                                Ready to get started?
                            </h2>
                            <Button
                                className="slide-in-left group text-foreground border-t border-primary-foreground"
                                asChild
                            >
                                <Link href="/day/0">
                                    Join Now
                                    <ArrowRight className="transition-transform group-hover:translate-x-1 group-focus:translate-x-1" />
                                </Link>
                            </Button>
                        </div>
                    </AnimationTrigger>
                    <div className="border-t border-border py-6">
                        <div className="flex items-center justify-between mb-8">
                            <Logo />
                            <ul className="flex gap-4 text-sm text-muted-foreground">
                                <li>
                                    <Link
                                        href="/day/0"
                                        className="hover:text-foreground transition-colors duration-200"
                                    >
                                        Sign In
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/info/privacy"
                                        className="hover:text-foreground transition-colors duration-200"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://github.com/GuruUpdesh/tempo"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-foreground transition-colors duration-200"
                                    >
                                        GitHub
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            © 2025 Tempo All rights reserved
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="p-6 py-12 bg-card border-t border-border rounded-xl">
            <div className="text-primary mb-4">{icon}</div>
            <h3 className="text-xl text-foreground mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    );
}

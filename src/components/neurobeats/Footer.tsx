import { Link } from "react-router-dom";
import {
    Twitter,
    Instagram,
    Linkedin,
    Github,
} from "lucide-react";
import Logo from "@/components/neurobeats/Logo";



export default function Footer() {
    return (
        <footer className="mt-24 border-t border-border bg-background">
            <div className="container py-16">
                {/* Top grid */}
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    <FooterColumn title="Company">
                        <FooterLink to="#">About</FooterLink>
                        <FooterLink to="#">Careers</FooterLink>
                        <FooterLink to="#">Blog</FooterLink>
                        <FooterLink to="#">Press</FooterLink>
                    </FooterColumn>

                    <FooterColumn title="Product">
                        <FooterLink to="#">Features</FooterLink>
                        <FooterLink to="#">Pricing</FooterLink>
                        <FooterLink to="#">FAQ</FooterLink>
                        <FooterLink to="#">Support</FooterLink>
                    </FooterColumn>

                    <FooterColumn title="Community">
                        <FooterLink to="#">Discord</FooterLink>
                        <FooterLink to="#">Twitter</FooterLink>
                        <FooterLink to="#">Instagram</FooterLink>
                        <FooterLink to="#">LinkedIn</FooterLink>
                    </FooterColumn>

                    <FooterColumn title="Legal">
                        <FooterLink to="#">Privacy</FooterLink>
                        <FooterLink to="#">Terms</FooterLink>
                        <FooterLink to="#">Cookies</FooterLink>
                        <FooterLink to="#">Licenses</FooterLink>
                    </FooterColumn>
                </div>

                {/* Divider */}
                <div className="my-12 h-px w-full bg-border" />

                {/* Bottom row */}
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <Logo size={32} showText />
                    </div>


                    {/* Copyright */}
                    <p className="text-sm text-muted-foreground">
                        © 2025 NeuroBeats.fm. All rights reserved.
                    </p>

                    {/* Socials */}
                    <div className="flex items-center gap-4">
                        <SocialIcon href="https://twitter.com" label="Twitter">
                            <Twitter className="h-5 w-5" />
                        </SocialIcon>

                        <SocialIcon href="https://instagram.com" label="Instagram">
                            <Instagram className="h-5 w-5" />
                        </SocialIcon>

                        <SocialIcon href="https://linkedin.com" label="LinkedIn">
                            <Linkedin className="h-5 w-5" />
                        </SocialIcon>

                        <SocialIcon href="https://github.com" label="GitHub">
                            <Github className="h-5 w-5" />
                        </SocialIcon>
                    </div>

                </div>
            </div>
        </footer>
    );
}

/* ---------------- Helpers ---------------- */

function FooterColumn({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <h4 className="mb-4 text-sm font-semibold">{title}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
                {children}
            </ul>
        </div>
    );
}

function FooterLink({
    to,
    children,
}: {
    to: string;
    children: React.ReactNode;
}) {
    return (
        <li>
            <Link
                to={to}
                className="transition-colors hover:text-foreground"
            >
                {children}
            </Link>
        </li>
    );
}

function SocialIcon({
    href,
    label,
    children,
}: {
    href: string;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-muted-foreground transition-colors hover:text-foreground"
        >
            {children}
        </a>
    );
}


"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
    { name: "Privacy Policy", href: "/privacy-policy", src: "/privacyPolicy.png" },
    { name: "Terms & Conditions", href: "/terms-and-conditions", src: "/termsAndConditions.png" },
    { name: "Refund Policy", href: "/refund-policy", src: "/refundPolicy.png" },
    { name: "Responsible Disclosure Policy", href: "/responsible-disclosure-policy", src: "/privacyPolicy.png" },
    { name: "EEO Policy", href: "/eeo-policy", src: "/privacyPolicy.png" },
];

export default function PolicyNav() {
    const pathname = usePathname();
    const activeTab = tabs.find(tab => tab.href === pathname);
    return (
        <div className="flex flex-col items-center w-full">
            {activeTab && (
                <div className="w-full flex justify-center">
                    <Image
                        src={activeTab.src}
                        alt={activeTab.name}
                        width={600}
                        height={150}
                        className="mb-4 w-full max-w-[600px] h-auto object-contain px-2 sm:px-0"
                        priority
                    />
                </div>
            )}
            <nav className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 border-b border-gray-200 mb-8 w-full px-2 sm:px-0">
                {tabs.map((tab) => (
                    <Link
                        key={tab.href}
                        href={tab.href}
                        className={`pb-2 font-bold transition-colors duration-150 text-center ${pathname === tab.href
                            ? "border-b-3 border-[oklch(84.5%_.18_83.6)] text-black "
                            : "text-gray-900 hover:text-black"
                            }`}
                    >
                        {tab.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
} 
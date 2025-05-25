import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
     bio?: string;
    photo?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; 
}


export interface DropdownProps {
    align?: 'left' | 'right';
    width?: string;
    contentClasses?: string;
    trigger: React.ReactNode;
    children: React.ReactNode;
}


export interface Projet {
    id: number;
    title: string;
    description: string;
    github_link: string;
    demo_link: string;
    image: string;
    created_at: string;
    updated_at: string;
    technologies?: string[]
    additionalContent?: string
    [key: string]: string | File | null;
}

export interface Experience {
    id: number;
    title: string;
    company: string;
    start_date: string;
    end_date: string | null;
    description: string;
    created_at: string;
    updated_at: string;
}
export interface Skills {
    id: number;
    name: string;
    level: string;
    percentage: number;
    category: string;
    logo: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: string | number | null;
}

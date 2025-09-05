import React from 'react';
import { Link } from '@inertiajs/react';

interface DropdownLinkProps {
  href: string;
  children: React.ReactNode;
}

const DropdownLink = ({ href, children }: DropdownLinkProps) => {
  return (
    <Link href={href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
      {children}
    </Link>
  );
};

export default DropdownLink;

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';


interface DropdownProps {
    align?: 'left' | 'right';
    width?: string;
    contentClasses?: string;
    trigger: React.ReactNode;
    children: React.ReactNode;
}

export default function Dropdown({
    align = 'right',
    width = '48',
    contentClasses = 'py-1 bg-white',
    trigger,
    children,
}: DropdownProps) {
    let alignmentClasses = 'origin-top';

    if (align === 'left') {
        alignmentClasses = 'origin-top-left left-0';
    } else if (align === 'right') {
        alignmentClasses = 'origin-top-right right-0';
    }

    let widthClasses = '';

    if (width === '48') {
        widthClasses = 'w-48';
    }

    return (
        <Menu as="div" className="relative">
            {({ open }) => (
                <>
                    <Menu.Button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
                        {trigger}
                    </Menu.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items
                            className={`absolute z-50 mt-2 ${widthClasses} rounded-md shadow-lg ${alignmentClasses} ring-1 ring-black ring-opacity-5 focus:outline-none`}
                        >
                            <div className={`rounded-md ring-1 ring-black ring-opacity-5 ${contentClasses}`}>
                                {children}
                            </div>
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    );
} 
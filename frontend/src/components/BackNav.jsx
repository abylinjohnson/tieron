import { useState } from 'react';
const BackNav = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        // Implement your logout logic here
        setIsDropdownOpen(false);
    };

    return (
        <nav className="bg-white text-white py-4 px-8 flex items-center justify-between shadow ">
            <div className="flex items-center space-x-4">
            <button className="bg-white text-black px-4 py-2 rounded shadow">Back</button>
            </div>
            <div className="flex items-center space-x-4">
            </div>
        </nav>
    );
};

export default BackNav;

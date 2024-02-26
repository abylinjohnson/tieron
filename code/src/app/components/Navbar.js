import { useState } from 'react';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        // Implement your logout logic here
        setIsDropdownOpen(false);
    };

    return (
        <nav className="bg-black text-white py-4 px-8 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <span className="text-xl font-bold">Tieron</span>
            </div>
            <div className="flex items-center space-x-4">
                <button className="bg-white text-black px-4 py-2 rounded shadow">Create</button>
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="focus:outline-none"
                    >
                        <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonscout.com%2Ffree-icon%2Favatar-370&psig=AOvVaw3uva-nCQm98bKtHpuCqBQ-&ust=1709025509215000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOD9labWyIQDFQAAAAAdAAAAABAD" alt="Avatar" className="h-8 w-8 rounded-full" />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                            <button onClick={handleLogout} className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

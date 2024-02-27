import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignOut } from '@nhost/react'; 
const Navbar = () => {
    const { signOut } = useSignOut()
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigateToCreate= () => {
        navigate('/create');
      };
    const handleLogout = () => {
        // Implement your logout logic here
        setIsDropdownOpen(false);
    };

    return (
        <nav className="bg-white text-black py-4 px-8 flex items-center justify-between shadow ">
            <div className="flex items-center space-x-4">
                <span className="text-xl font-bold">Tieron</span>
            </div>
            <div className="flex items-center space-x-4">
                <button className="bg-black text-white px-4 py-2 rounded shadow" onClick={navigateToCreate}>Create Tieron</button>
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="focus:outline-none"
                    >
                        <img src="https://avatars.githubusercontent.com/u/81345003?v=4" alt="Avatar" className="h-8 w-8 rounded-full" />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                            <button onClick={() => signOut()} className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200">
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

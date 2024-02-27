import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BackNav = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/')
    };

    return (
        <nav className="bg-white text-white py-4 px-8 flex items-center justify-between shadow ">
            <div className="flex items-center space-x-4">
            <button className="bg-white text-black px-4 py-2 rounded shadow" onClick={handleBack}>Back</button>
            </div>
            <div className="flex items-center space-x-4">
            </div>
        </nav>
    );
};

export default BackNav;

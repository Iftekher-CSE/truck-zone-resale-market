import React from "react";

const PrimaryButton = ({ children, classes, handler }) => {
    return (
        <button onClick={handler} className={`hover:text-gray-100 bg-[#FBE122] text-[#23292E] ${classes}`}>
            {children}
        </button>
    );
};

export default PrimaryButton;

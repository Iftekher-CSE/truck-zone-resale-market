import React from "react";

const SectionHeader = ({ children }) => {
    return (
        <h2 className="text-3xl font-bold text-center text-white py-2 rounded-xl bg-gradient-to-r from-[#FBE122] to-[#23292E]">
            {" "}
            {children}
        </h2>
    );
};

export default SectionHeader;

import React from "react";

const ConfirmModal = ({ title, message, successAction, modalData, successBtnName }) => {
    return (
        <div>
            <input type="checkbox" id="confirm-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="confirm-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
                        ✕
                    </label>
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="py-4">{message}</p>
                    <button onClick={() => successAction(modalData)} className="btn btn-primary">
                        {successBtnName}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;

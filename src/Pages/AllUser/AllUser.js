import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import ConfirmModal from "../../Components/ConfirmModal/ConfirmModal";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";

const AllUser = () => {
    const [deleteUser, setDeleteUser] = useState(null);

    const { data: users = [], refetch } = useQuery({
        queryKey: ["user-account"],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/allUsers?accountType=user-account`);
            const data = await res.json();
            return data;
        },
    });

    const deleteHandler = user => {
        fetch(`${process.env.REACT_APP_API_URL}/user/admin/${user.email}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.deletedCount > 0) {
                    toast.success("Deleted Confirmed");
                    setDeleteUser(null);
                    refetch();
                }
            });
    };

    return (
        <div className="overflow-x-auto">
            <SectionHeader>All User List</SectionHeader>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Sl</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, i) => (
                        <tr key={user._id}>
                            <th>{i + 1}</th>
                            <td>{user.displayName}</td>
                            <td>{user.email}</td>
                            <td>
                                <PrimaryButton classes="px-2 py-1">Make Admin</PrimaryButton>
                            </td>
                            <td>
                                <label
                                    onClick={() => setDeleteUser(user)}
                                    htmlFor="confirm-modal"
                                    className="btn bg-red-500 btn-sm"
                                >
                                    Delete
                                </label>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {deleteUser && (
                <ConfirmModal
                    modalData={deleteUser}
                    title={`Delete User`}
                    message={`Are you sure wants to delete ${deleteUser?.displayName}?`}
                    successAction={deleteHandler}
                    successBtnName={"Delete"}
                ></ConfirmModal>
            )}
        </div>
    );
};

export default AllUser;

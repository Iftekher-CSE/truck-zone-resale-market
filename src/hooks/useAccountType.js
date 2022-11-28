import { useEffect, useState } from "react";

const useAccountType = email => {
    const [accountType, setAccountType] = useState("");
    const [isAccountTypeLoading, setIsAccountTypeLoading] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`${process.env.REACT_APP_API_URL}/users/account/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log("accountType:", data.accountType);
                    setAccountType(data.accountType);
                    // console.log("isAdmin", isAdmin);
                    setIsAccountTypeLoading(false);
                });
        }
    }, [email]);
    return [accountType, isAccountTypeLoading];
};

export default useAccountType;

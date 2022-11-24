export const userJWT = (user, accountType) => {
    console.log(user);
    const userInfo = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        accountType: accountType,
    };

    // save user,get jwt, save jwt
    fetch(`${process.env.REACT_APP_API_URL}/user/${user.email}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(userInfo),
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            localStorage.setItem("truckZone-token", data.token);
        });
};

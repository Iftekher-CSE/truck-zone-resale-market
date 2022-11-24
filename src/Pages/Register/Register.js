import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Link, useNavigate } from "react-router-dom";
import { userJWT } from "../../api/userJWT";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import SmallSpinner from "../../Components/Spinner/SmallSpinner";
import { AuthContext } from "../../contexts/AuthProvider";

const Register = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const { createUser, updateUserProfile, signInWithGoogle, setUser, loading, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    const handelSignUp = event => {
        setErrorMessage("");
        setLoading(true);
        event.preventDefault();
        const name = event.target.name.value;
        const accountType = event.target.radioAccount.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const image = event.target.image.files[0];
        console.log(name, email, password, image, accountType);

        const formData = new FormData();
        formData.append("image", image);
        // console.log(formData);

        // 0c1263ea8fd9c400053f888911233802
        const imageBBurl = `https://api.imgbb.com/1/upload?key=${"0c1263ea8fd9c400053f888911233802"}`;

        fetch(imageBBurl, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(imageData => {
                // console.log(imageData.data.display_url);
                createUser(email, password)
                    .then(result => {
                        const user = result.user;
                        console.log(user);
                        updateUserProfile(name, imageData.data.display_url)
                            .then(() => {
                                toast.success("You have registered successfully");
                                userJWT(user, accountType);
                                setLoading(false);
                                navigate("/");
                            })
                            .catch(err => {
                                setErrorMessage(err.message);
                                setLoading(false);
                                console.error(err);
                            });
                    })
                    .catch(err => {
                        setErrorMessage(err.message);
                        setLoading(false);
                        console.error(err);
                    });
            })
            .catch(err => {
                setLoading(false);
                console.error(err);
            });
    };

    const handelGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                console.log(user);
                setUser(user);
                toast.success("You have registered successfully");
                userJWT(user, "user-account");
                setLoading(false);
                navigate("/");
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="flex justify-center items-center pt-8">
            <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Register</h1>
                </div>
                <form
                    onSubmit={handelSignUp}
                    noValidate=""
                    action=""
                    className="space-y-12 ng-untouched ng-pristine ng-valid"
                >
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                placeholder="Enter Your Name Here"
                                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#FBE122] bg-gray-200 text-gray-900"
                                data-temp-mail-org="0"
                            />
                        </div>
                        <div>
                            <label htmlFor="image" className="block mb-2 text-sm">
                                Select your account type:
                            </label>
                            <div>
                                <label className="label cursor-pointer">
                                    <span className="label-text">User Account</span>
                                    <input
                                        type="radio"
                                        name="radioAccount"
                                        value="user-account"
                                        className="radio checked:bg-[#FBE122]"
                                        checked
                                    />
                                </label>{" "}
                                <label className="label cursor-pointer">
                                    <span className="label-text">Seller Account</span>
                                    <input
                                        type="radio"
                                        name="radioAccount"
                                        value="seller-account"
                                        className="radio checked:bg-[#FBE122]"
                                    />
                                </label>{" "}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="image" className="block mb-2 text-sm">
                                Select Image:
                            </label>
                            <input type="file" id="image" name="image" accept="image/*" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">
                                Email address
                            </label>
                            <input
                                required
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter Your Email Here"
                                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#FBE122] bg-gray-200 text-[#23292E]"
                                data-temp-mail-org="0"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm">
                                    Password
                                </label>
                            </div>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                required
                                placeholder="*******"
                                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200 focus:outline-[#FBE122] text-[#23292E]"
                            />
                        </div>
                    </div>
                    <p className="text-red-500">{errorMessage && errorMessage}</p>
                    <div className="space-y-2">
                        <div>
                            <PrimaryButton type="submit" classes="w-full px-8 py-3 font-semibold">
                                {loading ? <SmallSpinner></SmallSpinner> : "Register"}
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
                <div className="divider">OR</div>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={handelGoogleSignIn}
                        aria-label="Log in with Google"
                        className="hover:cursor-pointer hover:bg-gray-300 bg-gray-200 p-3 rounded-full"
                    >
                        <FcGoogle></FcGoogle>
                    </button>
                    <button
                        aria-label="Log in with Facebook"
                        className="hover:cursor-pointer hover:bg-gray-300 bg-gray-200 p-3 rounded-full"
                    >
                        <FaFacebook></FaFacebook>
                    </button>
                    <button
                        aria-label="Log in with Linkdin"
                        className="hover:cursor-pointer hover:bg-gray-300 bg-gray-200 p-3 rounded-full"
                    >
                        <FaLinkedinIn></FaLinkedinIn>
                    </button>
                </div>

                <p className="px-6 text-sm text-center text-gray-400">
                    Already have an account yet?{" "}
                    <Link to="/login" className="hover:underline text-[#23292E]">
                        Sign In
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default Register;

import "./../styles/profile-menu.css";
import { useState } from "react";
import { SignUpPopup } from "./SignUpPopup";
import { LoginPopup } from "./LoginPopup";

export const ProfileMenu = ({ isUserLoggedIn }: { isUserLoggedIn: boolean }) => {
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    return (
        <div className="profile-container" >
            {isUserLoggedIn ? (
                <div className="profile-menu" >
                    <span className="profile-name">User Name</span>
                    <ul className="profile-options">
                        <li>Profile</li>
                        <li>Settings</li>
                        <li>Logout</li>
                    </ul>
                </div>
            ) : (
                <div className='button-group-auth'>
                    <button
                        className="login-button"
                        onClick={() => {
                            setIsLoginOpen(!isLoginOpen);
                            setIsSignupOpen(false);
                        }}>
                        Login</button>
                    {isLoginOpen && (
                        <div className="login-popup">
                            <LoginPopup isOpen={isLoginOpen} />
                        </div>
                    )}
                    <button className="signup-button" onClick={() => {
                            setIsSignupOpen(!isSignupOpen);
                            setIsLoginOpen(false);
                        }}>Sign Up</button>
                    {isSignupOpen && (
                        <div className="signup-popup">
                            <SignUpPopup isOpen={isSignupOpen} />
                        </div>
                    )}
                    {/* Ensure only one popup is open at a time */}
                </div>
            )}

        </div>






    )
}
export default ProfileMenu;

import "./../styles/profile-menu.css";
import { useState } from "react";
import { SignUpPopup } from "./SignUpPopup";
export const ProfileMenu = ({ isUserLoggedIn }: { isUserLoggedIn: boolean }) => {
    const [isSignupOpen, setIsSignupOpen] = useState(false);
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
                    <button className="login-button">Login</button>
                    <button className="signup-button" onClick={() => setIsSignupOpen(!isSignupOpen)}>Sign Up</button>
                    {isSignupOpen && (
                        <div className="signup-popup">
                            <SignUpPopup isOpen={isSignupOpen} />
                        </div>
                    )}
                </div>
            )}

        </div>






    )
}
export default ProfileMenu;

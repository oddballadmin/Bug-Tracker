import "./../styles/profile-menu.css";
export const ProfileMenu = ({ isUserLoggedIn }: { isUserLoggedIn: boolean }) => {
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
                    <button className="signup-button">Sign Up</button>
                </div>
            )}
        </div>


    )
}
export default ProfileMenu;

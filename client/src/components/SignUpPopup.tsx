import { useState } from "react";
import { signUp } from "../dataHelpers/users";

export const SignUpPopup = ({ isOpen }: { isOpen: boolean }) => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await signUp(formData);
            console.log("Sign up successful:", response);
            // Handle successful sign up (e.g., close popup, show success message)
        } catch (error) {
            console.error("Sign up failed:", error);
            // Handle error (e.g., show error message)
        }
    };

    if (!isOpen) return null;
    return (
        <div className="signup-form">
            <form >
                <h2>Sign Up</h2>
                <label>
                    Username:
                    <input type="text" name="username" required value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </label>
                <button type="submit" onClick={handleSubmit}>Sign Up</button>
            </form>
        </div>
    )
}

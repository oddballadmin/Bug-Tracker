import { useState } from "react";
import { login } from "../dataHelpers/users";

export const LoginPopup = ({ isOpen }: { isOpen: boolean }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await login(formData);

            console.log("Login successful:", response);
            // Handle successful login (e.g., close popup, show success message)
        } catch (error) {
            console.error("Login failed:", error);
            // Handle error (e.g., show error message)
        }
    };

    if (!isOpen) return null;
    return (
        <div className="login-form">
            <form >
                <h2>Login</h2>

                <label>
                    Username:
                    <input type="text" name="username" required value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </label>
                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
        </div>
    )
}

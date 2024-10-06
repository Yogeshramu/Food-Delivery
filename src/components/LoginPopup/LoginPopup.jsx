import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [selectedRole, setSelectedRole] = useState("");

  const roles = ['Customer', 'Restaurant Owner', 'Delivery Person'];

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setCurrState(`${role} Sign Up`); // Update currState based on selected role
  };

  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>

        {currState === "Login" ? (
          <div className="login-popup-inputs">
            <input type="text" placeholder='Enter Email' required />
            <input type="password" placeholder='Enter Password' required />
            <div className="login-popup-condition">
              <input type="checkbox" required />
              <p>By continuing, I agree to the terms of use & privacy policy.</p>
            </div>
            <button>Login</button>
          </div>
        ) : (
          <div>
            {selectedRole === "" ? (
              <div className="role-selection">
                <p>Select Your Role</p>
                {roles.map((role) => (
                  <button
                    key={role}
                    className={selectedRole === role ? 'selected' : ''}
                    onClick={() => handleRoleSelection(role)} // Use the handler
                  >
                    {role}
                  </button>
                ))}
              </div>
            ) : (
              <div className="login-popup-inputs">
                {selectedRole === "Restaurant Owner" && (
                  <>
                    <input type="text" placeholder="Restaurant Name" required />
                    <input type="file" required />
                    <input type="text" placeholder="Owner's Name" required />
                    <input type="file" required />
                    <input type="email" placeholder="Email" required />
                    <input type="tel" placeholder="Phone Number" required />
                    <input type="text" placeholder="Restaurant Address" required />
                    <input type="text" placeholder="City" required />
                    <input type="text" placeholder="Pincode" required />
                    <input type="time" placeholder="Opening Hours" required />
                    <input type="time" placeholder="Closing Hours" required />
                    <button>Create Account</button>
                  </>
                )}
                {selectedRole === "Delivery Person" && (
                  <>
                    <input type="text" placeholder="Full Name" required />
                    <input type="email" placeholder="Email" required />
                    <input type="tel" placeholder="Phone Number" required />
                    <input type="text" placeholder="Account Number" required />
                    <input type="file" required />
                    <input type="text" placeholder="Delivery Address" required />
                    <input type="text" placeholder="City" required />
                    <input type="text" placeholder="Pincode" required />
                    <button>Create Account</button>
                  </>
                )}
                {selectedRole === "Customer" && (
                  <>
                    <input type="text" placeholder='Full Name' required />
                    <input type="email" placeholder='Enter Email' required />
                    <input type="password" placeholder='Enter Password' required />
                    <input type="tel" placeholder='Phone Number' required />
                    <input type="text" placeholder='Delivery Address' required />
                    <input type="text" placeholder='City' required />
                    <input type="text" placeholder='Pincode' required />
                    <button>Create Account</button>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {currState !== "Login" && (
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        )}
        {currState === "Login" && (
          <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Sign Up here</span></p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;

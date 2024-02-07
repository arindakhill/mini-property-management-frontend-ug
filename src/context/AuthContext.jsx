// src/context/AuthContext.jsx
import { useContext, createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')));

  const signIn = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find((u) => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
    } else {
      throw new Error('Account not found');
    }
  };

  const signUp = (userData) => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some((u) => u.email === userData.email )) {
      throw new Error(`User with email ${userData.email} already exists.`);
    }
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    // Automatically sign the user in after registration
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };


  //updateUserPassword
  const updateUserPassword = async (currentPassword, newPassword, confirmNewPassword) => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));


    //check if a user is signed in
    if (!currentUser || users.length === 0) {
      throw new Error('No user is currently signed in.');
    }

    //find the current user in the list of users
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex === -1) {
      throw new Error('User not found.');
    }

    //Check if the current passwor is correct
    if (users[userIndex].password !== currentPassword) {
      throw new Error('Current password is incorrect.');
    }


 

    // Validate the new password length
  if (newPassword.length < 6) {
    throw new Error('New password must be at least 6 characters long.');
  }

   // Check if the new password is different from the current password
    if (currentPassword === newPassword) {
      throw new Error('New password must be different from the current password.');
    }

// Ensure the new password and confirm new password match
if (newPassword !== confirmNewPassword) {
    throw new Error('New password and confirm new password do not match.');
  }






    // Update the user's password
    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));

    // Optionally update currentUser in local storage if needed
    currentUser.password = newPassword;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Update state to reflect the change
    setUser(currentUser);

    return true; // Indicate success
  };





  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, updateUserPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

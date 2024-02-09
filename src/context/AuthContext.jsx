// src/context/AuthContext.jsx
import { useContext, createContext, useState } from "react";
import  {jwtDecode} from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const apirurl = 'http://localhost:8080/api/v1/auth';


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if(decodedToken.exp * 1000 > Date.now()) {
        return decodedToken;
      } else {
        sessionStorage.removeItem('token');
      }
    }
    return null;
  });



  const signIn = async ({ email, password }) => {
    try {
      // Authenticate the user and get the access token
      const response = await axios.post(`${apirurl}/authenticate`, { email, password });
      const { access_token } = response.data;
      sessionStorage.setItem('token', access_token);
  
      // Decode the token to get user information
      const decodedToken = jwtDecode(access_token);
  
      // Wait for 2 seconds before making the next call
     // await new Promise(resolve => setTimeout(resolve, 1000));
  
      // Fetch additional user details using the access token
      const userDetailsResponse = await axios.get(`http://localhost:8080/api/v1/users/${decodedToken.sub}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
  
      // Set the user state with information from the token and additional user details
      setUser({
        ...decodedToken,
        ...userDetailsResponse.data, // This contains the additional user details
      });
  
    } catch (error) {
      // If there's an error in the above block, remove any stored token and reset user state
      sessionStorage.removeItem('token');
      setUser(null);
  
      // Re-throw the error to be caught by the calling code, which might want to display the error message to the user
      throw error;
    }
  };
  
  

  const signUp = async (userData, endpoint) => {
   try{
    const response = await axios.post(`${apirurl}/${endpoint}`, userData);
   const { access_token } = response.data
   sessionStorage.setItem('token', access_token); 



    const decodedToken = jwtDecode(access_token);


 // Fetch additional user details using the access token
 const userDetailsResponse = await axios.get(`http://localhost:8080/api/v1/users/${decodedToken.sub}`, {
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});

// Set the user state with information from the token and additional user details
setUser({
  ...decodedToken,
  ...userDetailsResponse.data, // This contains the additional user details
});


    
  }catch(error){
    throw new Error('Sign up failed');
  }
};

  const signOut = async () => {
   try{
    await axios.post(`${apirurl}/logout`,null, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
    });
    setUser(null);
    sessionStorage.removeItem('token');
   //const navigate = useNavigate();
    //navigate('/signin');
  }catch(error){
    throw new Error('Sign out failed',error.message);
  }
};


const updateUserPassword = async (currentPassword, newPassword, confirmNewPassword) => {
  try {
    const accessToken = sessionStorage.getItem('token');
    // Make sure accessToken is available
    if (!accessToken) {
      throw new Error('Access token not found.');
    }

    // Validate the new password length
    if (newPassword.length < 4) {
      throw new Error('New password must be at least 4 characters long.');
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
    const response = await axios.patch('http://localhost:8080/api/v1/users', {
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmationPassword: confirmNewPassword
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });

    // Handle success response
    return response.data;
  } catch (error) {
    // Handle error
    throw new Error(error.message);
  }
};





  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, updateUserPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

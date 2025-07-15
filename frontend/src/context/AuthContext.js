import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
    // State to hold user info and token
    const [user, setUser] = useState(null); // Will store { id, username, role }
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true); // To check if initial auth check is done

    // Function to update token and user in state and localStorage
    const updateAuthInfo = (newToken, newUser) => {
        setToken(newToken);
        setUser(newUser);
        if (newToken) {
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(newUser)); // Store user object as string
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    };

    // Function to check initial login status from localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setToken(storedToken);
                setUser(parsedUser);
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
                // Clear invalid data
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
        setLoading(false); // Mark loading as complete
    }, []); // Run only once on component mount

    // Function to handle login
    const login = async (username, password) => {
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            const { token: newToken, user: newUser } = res.data;
            updateAuthInfo(newToken, newUser);
            setLoading(false);
            return { success: true, message: 'Login successful!' };
        } catch (err) {
            console.error('Login error:', err.response?.data?.msg || err.message);
            setLoading(false);
            return { success: false, message: err.response?.data?.msg || 'Login failed.' };
        }
    };

    // Function to handle registration (optional, can be done outside context if preferred)
    const register = async (username, password, role = 'user') => {
         setLoading(true);
         try {
             const res = await axios.post('http://localhost:5000/api/auth/register', { username, password, role });
             const { token: newToken, user: newUser } = res.data;
             updateAuthInfo(newToken, newUser); // Auto-login after registration
             setLoading(false);
             return { success: true, message: 'Registration successful and logged in!' };
         } catch (err) {
             console.error('Registration error:', err.response?.data?.msg || err.message);
             setLoading(false);
             return { success: false, message: err.response?.data?.msg || 'Registration failed.' };
         }
     };


    // Function to handle logout
    const logout = () => {
        updateAuthInfo(null, null); // Clear token and user
    };

    // Value to be provided to consumers
    const authContextValue = {
        user,
        token,
        loading,
        isAuthenticated: !!token && !!user, // True if both token and user exist
        login,
        register,
        logout,
        updateAuthInfo, // Useful if you need to update auth info from other places
    };

    // Render the children components, providing the context value
    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Create a Custom Hook to easily consume the context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const USERS = [
  { id: 1, username: 'lars',    password: 'password123', displayName: 'Lars' },
  { id: 2, username: 'maya',    password: 'sunshine99',  displayName: 'Maya' },
  { id: 3, username: 'devking', password: 'react2025',   displayName: 'DevKing' },
  { id: 4, username: 'tiana',   password: 'hello456',    displayName: 'Tiana' },
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem('currentUser');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  function login(username, password) {
    const user = USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password.' };
  }

  function logout() {
    setCurrentUser(null);
    sessionStorage.removeItem('currentUser');
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

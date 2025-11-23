import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  username: string;
  email: string;
  password: string;
  displayName: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateUserPassword: (email: string, newPassword: string) => void;
  addUser: (newUser: User) => boolean;
  deleteUser: (email: string) => boolean;
  isAdmin: boolean;
}

const AUTHORIZED_USERS: User[] = [
  { username: 'PE_NICC', email: 'Claudionicholas12@gmail.com', password: 'AAaa1234**', displayName: 'PE_NICC', isAdmin: true },
  { username: 'BM_YULITA', email: 'yulitagreacelia0507@gmail.com', password: 'AAaa1234**', displayName: 'BM_YULITA' },
  { username: 'PE_YOHANA', email: 'fyohana09@gmail.com', password: 'AAaa1234**', displayName: 'PE_YOHANA' },
  { username: 'PE_XANN', email: 'shengwangli2002@gmail.com', password: 'AAaa1234**', displayName: 'PE_XANN' },
  { username: 'M1_MATTHEW', email: 'matthewl010713@gmail.com', password: 'AAaa1234**', displayName: 'M1_MATTHEW' },
  { username: 'WP_REBECCA', email: 'evewong123001@gmail.com', password: 'AAaa1234**', displayName: 'WP_REBECCA' },
  { username: 'WP_ERIC', email: 'ericleong147258@gmail.com', password: 'AAaa1234**', displayName: 'WP_ERIC' },
  { username: 'BM_DANIAL', email: 'crsnnexmax@gmail.com', password: 'AAaa1234**', displayName: 'BM_DANIAL' },
  { username: 'BM_JANET', email: 'sreynichchin66@gmail.com', password: 'AAaa1234**', displayName: 'BM_JANET' }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(() => {
    const stored = localStorage.getItem('authorized_users');
    return stored ? JSON.parse(stored) : AUTHORIZED_USERS;
  });

  useEffect(() => {
    localStorage.setItem('authorized_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    const storedUser = localStorage.getItem('current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('current_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('current_user');
  };

  const updateUserPassword = (email: string, newPassword: string) => {
    setUsers(prevUsers => {
      const updated = prevUsers.map(u => 
        u.email === email ? { ...u, password: newPassword } : u
      );
      return updated;
    });
    
    if (user && user.email === email) {
      const updatedUser = { ...user, password: newPassword };
      setUser(updatedUser);
      localStorage.setItem('current_user', JSON.stringify(updatedUser));
    }
  };

  const addUser = (newUser: User): boolean => {
    if (!user?.isAdmin) {
      return false;
    }
    
    const userExists = users.some(u => u.email === newUser.email);
    if (userExists) {
      return false;
    }
    
    setUsers(prevUsers => [...prevUsers, newUser]);
    return true;
  };

  const deleteUser = (email: string): boolean => {
    if (!user?.isAdmin) {
      return false;
    }
    
    if (email === 'Claudionicholas12@gmail.com') {
      return false;
    }
    
    setUsers(prevUsers => prevUsers.filter(u => u.email !== email));
    return true;
  };

  const isAdmin = user?.isAdmin === true;

  return (
    <AuthContext.Provider value={{ user, users, login, logout, updateUserPassword, addUser, deleteUser, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
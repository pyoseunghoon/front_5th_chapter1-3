import React, {createContext, useContext, useState, ReactNode, useCallback} from "react";
import { User } from "./common";

interface UserContextType {
    user: User | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = useCallback((email: string) => {
        setUser({ id: 1, name: "홍길동", email });
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUserContext must be used within UserProvider");
    return context;
};

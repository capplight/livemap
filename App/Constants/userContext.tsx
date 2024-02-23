import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type UserTokenContextType = {
  token: {[key: string]: any} | null;
  setToken: Dispatch<SetStateAction<{[key: string]: any} | null>>;
};

const UserTokenContext = createContext<UserTokenContextType | undefined>(
  undefined,
);

function useToken(): UserTokenContextType {
  const context = useContext(UserTokenContext);
  if (!context) {
    throw new Error('useUserToken must be used within an UserTokenProvider');
  }
  return context;
}

const UserTokenProvider = (props: {children: ReactNode}): ReactElement => {
  const [token, setToken] = useState<{[key: string]: any} | null>(null);

  return <UserTokenContext.Provider {...props} value={{token, setToken}} />;
};

export {UserTokenProvider, useToken};

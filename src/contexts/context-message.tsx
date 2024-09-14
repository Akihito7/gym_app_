import { createContext, SetStateAction, useEffect, useState } from "react";

type TypeContextMessage = {
  message: TypeMessage;
  setMessage: React.Dispatch<SetStateAction<TypeMessage>>;
};

type TypeContextMessageProvider = {
  children: React.ReactNode;
};

type TypeMessage = {
  message: string;
  type: "sucess" | "failure";
};

export const ContextMessage = createContext({} as TypeContextMessage);

export function ContextMessageProvider({ children }: TypeContextMessageProvider) {
  const [message, setMessage] = useState({} as TypeMessage);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (message.message) {
      timeoutId = setTimeout(() => {
        setMessage({} as TypeMessage);
      }, 5000); 
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [message.message]);

  return (
    <ContextMessage.Provider
      value={{
        message,
        setMessage,
      }}
    >
      {children}
    </ContextMessage.Provider>
  );
}

'use client'
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

const Context = createContext(null);

const Provider = ({children}) => {
  const [categories, setCategories] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
      const fetchCategories = async () => {
          try {
              const response = await axios.get('/api/categories');
              setCategories(response.data);
              setIsUpdated(false);
          } catch (error) {
              console.error("Error fetching categories:", error);
          }
      };

      fetchCategories();
  }, [isUpdated]);

  useEffect(() => {
    axios.get('/api/post')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
    setIsUpdated(false);
  }, [isUpdated]);

  const [posts, setPosts] = useState([]);

  const [isSubscribe, setIsSubscribe] = useState(false);

  return (
    <SessionProvider>
      <Context.Provider value={{posts, categories, isSubscribe, setIsSubscribe, setIsUpdated, setPosts}}>
        {children}
      </Context.Provider>
    </SessionProvider>
  );
}

export {Context, Provider};

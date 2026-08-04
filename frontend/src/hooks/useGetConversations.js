import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../utils/api";
import useConversation from "../zustand/useConversation";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const { conversations, setConversations } = useConversation();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);

      try {
        const res = await fetch(`${API_BASE_URL}/api/users`, {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load conversations");
        }

        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, [setConversations]);

  return { loading, conversations };
};

export default useGetConversations;
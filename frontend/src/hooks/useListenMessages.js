import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation"; // or wherever your state manager is

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        if (!socket) return;

        // Listen for the "newMessage" event emitted by your backend controller
        socket.on("newMessage", (newMessage) => {
            // OPTIONAL: Play an alert sound when a message lands
            const sound = new Audio("/src/assets/sounds/notification.mp3");
            sound.play().catch((e) => console.log("Sound play blocked or missing file"));
            
            // Instantly append the message to the active UI chat thread state array
            setMessages([...messages, newMessage]);
        });

        // Clean up the listener when the chat window unmounts
        return () => socket.off("newMessage");
    }, [socket, setMessages, messages]);
};

export default useListenMessages;
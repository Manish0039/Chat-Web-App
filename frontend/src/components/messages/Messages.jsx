import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages"; // <-- 1. IMPORT YOUR NEW HOOK

const Messages = () => {
    const { messages, loading } = useGetMessages();
    
    useListenMessages(); // <-- 2. EXECUTE IT HERE TO LISTEN LIVE!

    const lastMessageRef = useRef();

    // Auto-scroll to the bottom when a new message lands
    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {!loading && messages.length > 0 && messages.map((message) => (
                <div key={message._id} ref={lastMessageRef}>
                    <Message message={message} />
                </div>
            ))}
            {/* ... your loading and fallback text states */}
        </div>
    );
};

export default Messages;
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";
    const shakeClass = message.shouldShake ? "shake" : "";

    // 1. Get sender name safely
    const userName = fromMe 
        ? (authUser?.fullName || authUser?.username || "Me") 
        : (selectedConversation?.fullName || selectedConversation?.username || "User");

    // 2. Extract first letter in uppercase
    const initialLetter = userName.charAt(0).toUpperCase();

    // 3. Set different colors for sent vs received
    const avatarBg = fromMe ? "bg-blue-600" : "bg-purple-600";

    return (
        <div className={`chat ${chatClassName}`}>
            {/* Replaced 'avatar' class with direct flexbox container for dead-center alignment */}
            <div className='chat-image self-center'>
                <div className={`w-9 h-9 rounded-full ${avatarBg} text-white flex items-center justify-center font-bold text-sm leading-none shadow-sm select-none`}>
                    {initialLetter}
                </div>
            </div>
            
            <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
                {message.message}
            </div>
            
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
                {formattedTime}
            </div>
        </div>
    );
};

export default Message;
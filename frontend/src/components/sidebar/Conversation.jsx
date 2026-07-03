import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			<div
				onClick={() => setSelectedConversation(conversation)}
				className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200
				${
					isSelected
						? "bg-sky-600 shadow-md"
						: "bg-slate-800/60 hover:bg-slate-700/80"
				}`}
			>
				<div className="flex items-center gap-3">
					<div className="avatar">
  <div className="w-12 h-12 rounded-full bg-sky-600 flex items-center justify-center overflow-hidden">
    
    {conversation.profilePic ? (
      <img
        src={conversation.profilePic}
        alt="profile"
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
    ) : null}

    <div className="w-12 h-12 rounded-full bg-sky-600 flex items-center justify-center flex-shrink-0">
  <span className="text-white font-bold text-lg select-none">
    {conversation.fullName?.charAt(0)?.toUpperCase() || "U"}
  </span>
</div>

  </div>
</div>
					
					

					<div>
						<p className="font-semibold text-white">
							{conversation.fullName}
						</p>

						<p
							className={`text-xs ${
								isOnline ? "text-green-400" : "text-gray-400"
							}`}
						>
							{isOnline ? "Online" : "Offline"}
						</p>
					</div>
				</div>

				<span className="text-xl">{emoji}</span>
			</div>

			{!lastIdx && <div className="h-3"></div>}
		</>
	);
};

export default Conversation;
import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { FiPhone, FiVideo, FiMoreVertical } from "react-icons/fi";
import { useSocketContext } from "../../context/SocketContext";
const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { onlineUsers } = useSocketContext();

const isOnline =
	selectedConversation &&
	onlineUsers.includes(selectedConversation._id);

	useEffect(() => {
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className="flex-1 flex flex-col bg-slate-800/30">
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-800/70">
						<div>
							<h2 className="text-lg font-semibold text-white">
								{selectedConversation.fullName}
							</h2>
							<p
	className={`text-sm ${
		isOnline ? "text-green-400" : "text-red-400"
	}`}
>
	● {isOnline ? "Online" : "Offline"}
</p>
						</div>

						<div className="flex items-center gap-5 text-xl text-gray-300">
							<FiPhone className="cursor-pointer hover:text-white" />
							<FiVideo className="cursor-pointer hover:text-white" />
							<FiMoreVertical className="cursor-pointer hover:text-white" />
						</div>
					</div>

					{/* Messages */}
					<div className="flex-1 overflow-y-auto">
						<Messages />
					</div>

					{/* Input */}
					<div className="border-t border-white/10">
						<MessageInput />
					</div>
				</>
			)}
		</div>
	);
};

export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();

	return (
		<div className="flex flex-1 items-center justify-center">
			<div className="text-center">
				<TiMessages className="mx-auto text-7xl text-violet-500 mb-5" />
				<h1 className="text-3xl font-bold text-white">
					Welcome, {authUser.fullName}
				</h1>
				<p className="mt-2 text-gray-400">
					Select a conversation to start chatting.
				</p>
			</div>
		</div>
	);
};
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	return (
		<div className="w-[320px] flex-shrink-0 border-r border-slate-700 p-4 flex flex-col bg-slate-900/40">
			
			{/* Logo */}
			<div className="p-5 border-b border-white/10">
				<h1 className="text-2xl font-bold text-white">
					💬 ChatSphere
				</h1>

				<p className="text-sm text-gray-400">
					Real-time Messaging
				</p>
			</div>

			{/* Search */}
			<div className="p-4">
				<SearchInput />
			</div>

			{/* Conversations */}
			<div className="flex-1 overflow-auto px-2">
				<Conversations />
			</div>

			{/* Logout */}
			<div className="border-t border-white/10 p-4">
				<LogoutButton />
			</div>
		</div>
	);
};

export default Sidebar;
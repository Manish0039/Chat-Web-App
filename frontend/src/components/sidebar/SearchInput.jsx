import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};
	return (
		<form onSubmit={handleSubmit} className="flex items-center gap-3 mb-3">
			<input
	  type="text"
	placeholder="Search users..."
	value={search}
	onChange={(e) => setSearch(e.target.value)}
	className="w-full px-4 py-3 rounded-full bg-white text-black placeholder:text-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
/><button
	type="submit"
	className="w-12 h-12 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition"
>
	<IoSearchSharp className="text-2xl" />
</button>
		</form>
	);
};
export default SearchInput;



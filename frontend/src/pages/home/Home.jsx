import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className="h-screen flex items-center justify-center px-6 py-4">
			<div className="w-full max-w-[1450px] h-[92vh] flex rounded-2xl overflow-hidden bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl">
				<Sidebar />
				<MessageContainer />
			</div>
		</div>
	);
};

export default Home;
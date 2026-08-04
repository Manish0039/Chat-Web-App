import { create } from "zustand";

const useConversation = create((set) => ({
  // Selected conversation
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),

  // All conversations
  conversations: [],
  setConversations: (conversations) =>
    set({ conversations }),

  // Messages
  messages: [],
  setMessages: (messages) =>
    set({ messages }),
}));

export default useConversation;
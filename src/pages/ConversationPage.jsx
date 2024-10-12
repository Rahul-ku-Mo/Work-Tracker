import { MessageCircle, Video, Users, Send } from "lucide-react";
import Container from "../layouts/Container";

const ConversationList = () => (
  <div className="w-1/3 border-r border-zinc-200 dark:border-zinc-700 h-full overflow-y-auto">
    <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
      <input
        type="text"
        placeholder="Search conversations..."
        className="w-full p-2 rounded-md bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-white"
      />
    </div>
    {[
      "Team Alpha",
      "Project Beta",
      "John Doe",
      "Jane Smith",
      "Jane Smith",
      "Jane Smith",
      "Jane Smith",
      "Jane Smith",
    ].map((name, index) => (
      <div
        key={index}
        className="p-4 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer"
      >
        <h3 className="font-semibold text-zinc-800 dark:text-white">{name}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Last message preview...
        </p>
      </div>
    ))}
  </div>
);

const ChatArea = () => (
  <div className="flex-1 flex flex-col">
    <div className="p-4 border-b border-zinc-200 dark:border-zinc-700 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-zinc-800 dark:text-white">
        Team Alpha
      </h2>
      <div className="flex space-x-2">
        <button className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700">
          <Video className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
        </button>
        <button className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700">
          <Users className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
        </button>
      </div>
    </div>
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {/* Chat messages would go here */}
    </div>
    <div className="p-4 border-t border-zinc-200 dark:border-zinc-700">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-md bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-white"
        />
        <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);

export default function ConversationsComponent() {
  return (
    <Container>
      <div className="flex bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white h-full overflow-hidden">
        <ConversationList />
        <ChatArea />
      </div>
    </Container>
  );
}

import Markdown from "react-markdown";
import Spinner from "./Spinner";
import Image from "next/image";
import userLogo from "@/public/user.png";
import errorLogo from "@/public/error.png";

export type Role = "user" | "assistant" | "system";

export interface Message {
  id: string; // unique id for stable React keys
  role: Role;
  content?: string | null; // could be null while streaming/loading
  loading?: boolean;
  error?: string | boolean | null; // can hold error message or true
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading?: boolean; // overall loading indicator (optional)
}

export default function ChatMessages({
  messages,
  isLoading = false,
}: ChatMessagesProps) {
  //   const scrollContentRef = useAutoScroll(isLoading);

  return (
    <div className="grow space-y-4">
      {messages.map(({ role, content, loading, error }, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-4 py-4 px-3 rounded-xl ${
            role === "user" ? "bg-primary-blue/10" : ""
          }`}
        >
          {role === "user" && (
            <Image
              src={userLogo}
              alt="Example"
              width={50}
              height={50}
              priority
            />
          )}
          <div>
            <div className="markdown-container">
              {loading && !content ? (
                <Spinner />
              ) : role === "assistant" ? (
                <Markdown>{content}</Markdown>
              ) : (
                <div className="whitespace-pre-line">{content}</div>
              )}
            </div>
            {error && (
              <div
                className={`flex items-center gap-1 text-sm text-error-red ${
                  content && "mt-2"
                }`}
              >
                <Image
                  src={errorLogo}
                  alt="Example"
                  width={50}
                  height={50}
                  priority
                />
                <span>Error generating the response</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

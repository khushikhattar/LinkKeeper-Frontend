import { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { ContentCard } from "../../content/ContentCard";

type ContentType = {
  _id: string;
  title: string;
  link: string;
  type: string;
};

type SharedData = {
  username: string;
  content: ContentType[];
};

export const SharedContent: React.FC = () => {
  const [hash, setHash] = useState("");
  const [data, setData] = useState<SharedData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSharedContent = async () => {
    if (!hash.trim()) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await axiosInstance.get(`/content/${hash}`);
      if (!res.data || !res.data.username) {
        setError("Invalid link or user does not exist");
      } else {
        setData(res.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 bg-background text-foreground">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        View Shared Content
      </h1>

      {/* Input for hash */}
      <div className="flex w-full max-w-md gap-2 mb-6">
        <input
          type="text"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          placeholder="Paste shareable link hash"
          className="flex-grow px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-card dark:bg-gray-700 text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={fetchSharedContent}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-md font-semibold transition-colors"
        >
          Fetch
        </button>
      </div>

      {/* Loading/Error */}
      {loading && <p className="text-blue-500">Loading content...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Shared content */}
      {data && (
        <div className="w-full max-w-3xl mt-6 space-y-6">
          <h2 className="text-xl font-semibold text-center text-card-foreground">
            {data.username}’s Shared Content
          </h2>

          {data.content.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No content shared yet.
            </p>
          ) : (
            <div className="grid gap-6">
              {data.content.map((item) => (
                <ContentCard
                  key={item._id}
                  _id={item._id}
                  title={item.title}
                  link={item.link}
                  type={item.type}
                  onDelete={() => {}} // Disable delete on shared content
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

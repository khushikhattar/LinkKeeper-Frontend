import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  const { hash } = useParams<{ hash: string }>();
  const [data, setData] = useState<SharedData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSharedContent = async () => {
      if (!hash) return;

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

    fetchSharedContent();
  }, [hash]);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 bg-background text-foreground">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        {data ? `${data.username}’s Shared Content` : "View Shared Content"}
      </h1>

      {loading && <p className="text-blue-500">Loading content...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {data && (
        <div className="w-full max-w-3xl mt-6 space-y-6">
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
                  isReadOnly={true} 
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

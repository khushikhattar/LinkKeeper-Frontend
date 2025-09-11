import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { ContentCard } from "../../content/ContentCard";

type ContentType = {
  _id: string;
  title: string;
  link: string;
  type: string;
};

export const UserContent: React.FC = () => {
  const [content, setContent] = useState<ContentType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/content/user-content");
        setContent(response.data.content);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch content");
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/content/${id}`);
      setContent((prev) => prev.filter((item) => item._id !== id));
      alert("Content deleted successfully");
    } catch (err) {
      alert("Failed to delete content");
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
        Loading content...
      </p>
    );
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      {content.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No content found.
        </p>
      ) : (
        content.map((item) => (
          <ContentCard
            key={item._id}
            _id={item._id}
            title={item.title}
            link={item.link}
            type={item.type}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

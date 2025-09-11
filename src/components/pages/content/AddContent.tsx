import { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ContentCard } from "../../content/ContentCard";

const addSchema = z.object({
  link: z.string().url("Invalid URL"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  type: z.enum(["image", "video", "article", "audio", "document", "tweet"]),
});

type AddContentForm = z.infer<typeof addSchema>;

type ContentItem = AddContentForm & { _id: string };

export const AddContent: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddContentForm>({
    resolver: zodResolver(addSchema),
  });

  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const onSubmit = async (data: AddContentForm) => {
    setApiError("");
    setLoading(true);
    try {
      const res = await axiosInstance.post("/content/add", data);
      const newContent: ContentItem = {
        ...data,
        _id: res.data._id || Date.now().toString(), // backend id or temporary id
      };
      setContents((prev) => [newContent, ...prev]);
      reset();
    } catch (error: any) {
      setApiError(error.response?.data?.message || "Error adding content");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (_id: string) => {
    setContents((prev) => prev.filter((c) => c._id !== _id));
  };

  return (
    <div className="max-w-md mx-auto bg-card dark:bg-gray-800 p-6 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-card-foreground">
        Add Content
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-card-foreground">
            Link
          </label>
          <input
            type="url"
            {...register("link")}
            placeholder="Enter link"
            className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 ${
              errors.link
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 dark:border-gray-600 focus:ring-indigo-500"
            } bg-background text-foreground`}
          />
          {errors.link && (
            <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-card-foreground">
            Title
          </label>
          <input
            type="text"
            {...register("title")}
            placeholder="Enter title"
            className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 ${
              errors.title
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 dark:border-gray-600 focus:ring-indigo-500"
            } bg-background text-foreground`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-card-foreground">
            Content Type
          </label>
          <select
            {...register("type")}
            className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 ${
              errors.type
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 dark:border-gray-600 focus:ring-indigo-500"
            } bg-background text-foreground`}
            defaultValue=""
          >
            <option value="" disabled>
              Select type
            </option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="article">Article</option>
            <option value="audio">Audio</option>
            <option value="document">Document</option>
            <option value="tweet">Tweet</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
          )}
        </div>

        {apiError && <p className="text-red-500 text-center">{apiError}</p>}
        {loading && (
          <p className="text-blue-500 text-center">Adding content...</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add Content"}
        </button>
      </form>

      <div className="mt-10 space-y-6">
        {contents.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No content added yet.
          </p>
        ) : (
          contents.map((content) => (
            <ContentCard
              key={content._id}
              {...content}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

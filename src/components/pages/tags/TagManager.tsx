import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { ContentCard } from "../../content/ContentCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const addTagSchema = z.object({ title: z.string().min(1, "Title required") });
type AddTagInput = z.infer<typeof addTagSchema>;

const addTagsToContentSchema = z.object({
  contentId: z.string(),
  tagIds: z.array(z.string()),
});
type AddTagsToContentInput = z.infer<typeof addTagsToContentSchema>;

// --- Types ---
type Tag = { _id: string; title: string };
type Content = {
  _id: string;
  title: string;
  link: string;
  type: string;
  tags: Tag[];
};

export const TagManager: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [contents, setContents] = useState<Content[]>([]);
  const [searchResults, setSearchResults] = useState<Content[]>([]);
  const [searchTagIds, setSearchTagIds] = useState<string[]>([]);
  const [beforeDate, setBeforeDate] = useState("");
  const [loading, setLoading] = useState(false);

  // --- Fetch user content and extract unique tags ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/content/user-content");
        const contentData = res.data.content || [];
        setContents(contentData);

        // extract unique tags
        const tagMap: Record<string, Tag> = {};
        contentData.forEach((c: Content) =>
          c.tags.forEach((t) => (tagMap[t._id] = t))
        );
        setTags(Object.values(tagMap));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- Add Tag ---
  const {
    register: registerTag,
    handleSubmit: handleSubmitTag,
    reset: resetTag,
  } = useForm<AddTagInput>({ resolver: zodResolver(addTagSchema) });

  const onAddTag = async (data: AddTagInput) => {
    try {
      const res = await axiosInstance.post("/tags/add", data);
      setTags((prev) => [...prev, res.data.tag]);
      resetTag();
      alert("Tag added successfully");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error adding tag");
    }
  };

  // --- Add Tags to Content ---
  const { register: registerContentTag, handleSubmit: handleSubmitContentTag } =
    useForm<AddTagsToContentInput>({
      resolver: zodResolver(addTagsToContentSchema),
    });

  const onAddTagsToContent = async (data: AddTagsToContentInput) => {
    try {
      const res = await axiosInstance.post("/content/tags", data);
      setContents((prev) =>
        prev.map((c) => (c._id === data.contentId ? res.data.content : c))
      );
      alert("Tags added to content successfully");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error adding tags to content");
    }
  };

  // --- Delete tag from content ---
  const handleDeleteTagFromContent = async (
    contentId: string,
    tagId: string
  ) => {
    if (!window.confirm("Are you sure you want to remove this tag?")) return;
    try {
      const res = await axiosInstance.delete(
        `/content/${contentId}/tags/${tagId}`
      );
      setContents((prev) =>
        prev.map((c) => (c._id === contentId ? res.data.content : c))
      );
      alert("Tag removed successfully");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error removing tag");
    }
  };

  // --- Search content ---
  const handleSearch = async () => {
    try {
      const query = new URLSearchParams();
      if (searchTagIds.length) query.append("tagIds", searchTagIds.join(","));
      if (beforeDate) query.append("beforeDate", beforeDate);
      const res = await axiosInstance.get(
        `/content/search?${query.toString()}`
      );
      setSearchResults(res.data.contents);
    } catch (err: any) {
      alert(err.response?.data?.message || "Error searching content");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="space-y-8">
      {/* Add Tag */}
      <div className="bg-card dark:bg-gray-700 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-card-foreground mb-4">
          Add Tag
        </h2>
        <form onSubmit={handleSubmitTag(onAddTag)} className="flex gap-2">
          <input
            type="text"
            {...registerTag("title")}
            placeholder="Tag title"
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </form>
      </div>

      {/* Add Tags to Content */}
      <div className="bg-card dark:bg-gray-700 p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-semibold text-card-foreground">
          Add Tags to Content
        </h2>
        <form
          onSubmit={handleSubmitContentTag(onAddTagsToContent)}
          className="space-y-2"
        >
          <select
            {...registerContentTag("contentId")}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-black dark:text-white"
            defaultValue=""
          >
            <option value="" disabled>
              Select Content
            </option>
            {contents.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
          <select
            {...registerContentTag("tagIds")}
            multiple
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-black dark:text-white"
          >
            {tags.map((t) => (
              <option key={t._id} value={t._id}>
                {t.title}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Add Tags
          </button>
        </form>
      </div>

      {/* Search Content */}
      <div className="bg-card dark:bg-gray-700 p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-semibold text-card-foreground">
          Search Content
        </h2>
        <div className="flex flex-col md:flex-row gap-2">
          <select
            multiple
            value={searchTagIds}
            onChange={(e) =>
              setSearchTagIds(
                Array.from(e.target.selectedOptions, (o) => o.value)
              )
            }
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-black dark:text-white"
          >
            {tags.map((t) => (
              <option key={t._id} value={t._id}>
                {t.title}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={beforeDate}
            onChange={(e) => setBeforeDate(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Search
          </button>
        </div>

        {/* Search Results */}
        <div className="space-y-4 mt-4">
          {searchResults.length > 0 ? (
            searchResults.map((c) => (
              <ContentCard
                key={c._id}
                _id={c._id}
                title={c.title}
                link={c.link}
                type={c.type}
                tags={c.tags}
                onTagDelete={handleDeleteTagFromContent}
              />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-300 text-center mt-2">
              No results found
            </p>
          )}
        </div>
      </div>

      {/* User Content */}
      <div className="space-y-4">
        {contents.map((c) => (
          <ContentCard
            key={c._id}
            _id={c._id}
            title={c.title}
            link={c.link}
            type={c.type}
            tags={c.tags}
            onTagDelete={handleDeleteTagFromContent}
          />
        ))}
      </div>
    </div>
  );
};

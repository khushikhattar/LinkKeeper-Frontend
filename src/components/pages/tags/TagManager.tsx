import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { ContentCard } from "../../content/ContentCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const createTagSchema = z.object({
  title: z.string().min(1, "Title required"),
  contentId: z.string().optional(),
});
type CreateTagInput = z.infer<typeof createTagSchema>;

const assignTagsSchema = z.object({
  contentId: z.string(),
  tagIds: z.array(z.string()).min(1, "Select at least one tag"),
});
type AssignTagsInput = z.infer<typeof assignTagsSchema>;

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
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resContents = await axiosInstance.get("/content/user-content");
        const contentData: Content[] = resContents.data?.content || [];
        setContents(contentData);

        const resTags = await axiosInstance.get("/tags/user-tags");
        const userTags: Tag[] = resTags.data?.tags || [];
        const tagMap: Record<string, Tag> = {};
        userTags.forEach((t) => (tagMap[t._id] = t));
        contentData.forEach((c) =>
          (c.tags || []).forEach((t) => (tagMap[t._id] = t))
        );
        setTags(Object.values(tagMap));
      } catch (err) {
        console.error("Failed to fetch contents/tags:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    reset: resetCreate,
    watch: watchCreate,
  } = useForm<CreateTagInput>({
    resolver: zodResolver(createTagSchema),
  });

  const onCreateTag = async (data: CreateTagInput) => {
    if (!data.title.trim()) return alert("Tag title required");
    setCreating(true);
    try {
      const resTag = await axiosInstance.post("/tags/add", {
        title: data.title,
      });
      const newTag: Tag = resTag.data.tag;
      setTags((prev) =>
        prev.find((t) => t._id === newTag._id) ? prev : [...prev, newTag]
      );
      if (data.contentId) {
        const resAssign = await axiosInstance.post("/tags/content/tags", {
          contentId: data.contentId,
          tagIds: [newTag._id],
        });
        const updatedContent: Content = resAssign.data.content;
        setContents((prev) =>
          prev.map((c) => (c._id === updatedContent._id ? updatedContent : c))
        );
      }
      resetCreate();
      alert("Tag created successfully");
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Error creating tag");
    } finally {
      setCreating(false);
    }
  };

  const {
    register: registerAssign,
    handleSubmit: handleSubmitAssign,
    reset: resetAssign,
  } = useForm<AssignTagsInput>({
    resolver: zodResolver(assignTagsSchema),
  });

  const onAssignTags = async (data: AssignTagsInput) => {
    setAssigning(true);
    try {
      const res = await axiosInstance.post("/tags/content/tags", data);
      const updatedContent: Content = res.data.content;
      setContents((prev) =>
        prev.map((c) => (c._id === updatedContent._id ? updatedContent : c))
      );
      const assignedTagsFromResponse = updatedContent.tags || [];
      setTags((prev) => {
        const map = new Map(prev.map((t) => [t._id, t]));
        assignedTagsFromResponse.forEach((t) => map.set(t._id, t));
        return Array.from(map.values());
      });

      resetAssign();
      alert("Tags assigned successfully");
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Error assigning tags");
    } finally {
      setAssigning(false);
    }
  };

  const handleDeleteTagFromContent = async (
    contentId: string,
    tagId: string
  ) => {
    if (!window.confirm("Remove this tag from content?")) return;
    try {
      const res = await axiosInstance.delete(
        `/tags/content/${contentId}/tags/${tagId}`,
        { withCredentials: true }
      );

      const updatedContent: Content = res.data.content;
      setContents((prev) =>
        prev.map((c) => (c._id === updatedContent._id ? updatedContent : c))
      );
      alert("Tag removed from content");
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Error removing tag");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="space-y-8">
      <div className="bg-card dark:bg-gray-700 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Create Tag</h2>
        <form
          onSubmit={handleSubmitCreate(onCreateTag)}
          className="flex flex-col md:flex-row gap-2"
        >
          <input
            type="text"
            {...registerCreate("title")}
            placeholder="Tag title"
            className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <select
            {...registerCreate("contentId")}
            className="flex-1 px-4 py-2 border rounded-md"
          >
            <option value="">(optional) Assign to content</option>
            {contents.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={!watchCreate("title") || creating}
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            {creating ? "Creating..." : "Create Tag"}
          </button>
        </form>
      </div>

      <div className="bg-card dark:bg-gray-700 p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Assign Existing Tags</h2>
        <form onSubmit={handleSubmitAssign(onAssignTags)} className="space-y-2">
          <select
            {...registerAssign("contentId")}
            className="w-full px-4 py-2 border rounded-md"
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
            {...registerAssign("tagIds")}
            multiple
            className="w-full px-4 py-2 border rounded-md"
          >
            {tags.map((t) => (
              <option key={t._id} value={t._id}>
                {t.title}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={assigning}
            className="px-4 py-2 bg-blue-600 text-black rounded-md"
          >
            {assigning ? "Assigning..." : "Assign Tags"}
          </button>
        </form>
      </div>
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

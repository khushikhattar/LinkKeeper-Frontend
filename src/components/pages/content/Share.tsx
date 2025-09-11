import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { Share2 } from "lucide-react";

export const Share: React.FC = () => {
  const [isShared, setIsShared] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);

  useEffect(() => {
    const fetchShareStatus = async () => {
      try {
        const res = await axiosInstance.get("/content/mylink");
        if (res.data.share && res.data.hash) {
          setIsShared(true);
          setShareLink(`${window.location.origin}/appname/${res.data.hash}`);
        } else {
          setIsShared(false);
          setShareLink(null);
        }
      } catch (err) {
        console.error("Error fetching share status:", err);
      }
    };
    fetchShareStatus();
  }, []);

  const toggleShare = async () => {
    try {
      if (isShared) {
        await axiosInstance.post("/content/share", { share: false });
        alert("Sharing disabled");
        setIsShared(false);
        setShareLink(null);
      } else {
        const res = await axiosInstance.post("/content/share", { share: true });
        if (res.data.hash) {
          const link = `${window.location.origin}/appname/${res.data.hash}`;
          setIsShared(true);
          setShareLink(link);
          alert(`Share link generated: ${link}`);
        }
      }
    } catch (error: any) {
      console.error(error.response?.data?.message || "Error toggling share");
      alert(error.response?.data?.message || "Error toggling share");
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 mt-3">
      <button
        onClick={toggleShare}
        className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors ${
          isShared
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        <Share2 size={18} />
        {isShared ? "Disable Share" : "Enable Share"}
      </button>

      {shareLink && (
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Link:{" "}
          <a
            href={shareLink}
            target="_blank"
            className="text-indigo-500 hover:underline"
          >
            {shareLink}
          </a>
        </p>
      )}
    </div>
  );
};

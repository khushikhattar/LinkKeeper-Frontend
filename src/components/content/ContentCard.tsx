import React from "react";
import { Trash } from "lucide-react";

type ContentCardProps = {
  _id: string;
  title: string;
  link: string;
  type: string;
  onDelete?: (_id: string) => void;
  isReadOnly?: boolean;
  tags?: { _id: string; title: string }[];
  onTagDelete?: (_contentId: string, _tagId: string) => void;
};

export const ContentCard: React.FC<ContentCardProps> = ({
  _id,
  title,
  link,
  type,
  onDelete,
  isReadOnly = false,
  tags = [],
  onTagDelete,
}) => {
  const handleDeleteClick = () => {
    if (!onDelete) return;
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      onDelete(_id);
    }
  };

  return (
    <div className="bg-card dark:bg-gray-700 shadow-md rounded-xl p-4 w-full">
      <h3 className="text-lg font-semibold mb-2 text-card-foreground">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
        Type: {type}
      </p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-500 hover:underline"
      >
        Visit Link
      </a>

      {/* Delete content */}
      {!isReadOnly && onDelete && (
        <button
          onClick={handleDeleteClick}
          aria-label="Delete content"
          className="mt-2 text-red-500 hover:text-red-600"
        >
          <Trash />
        </button>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((t) => (
            <span
              key={t._id}
              className="bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100 px-2 py-1 rounded-full flex items-center gap-2"
            >
              {t.title}
              {!isReadOnly && onTagDelete && (
                <button
                  onClick={() => onTagDelete(_id, t._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  &times;
                </button>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

import React from "react";
import { Trash } from "lucide-react";

interface DeleteContentProps {
  onDelete: () => void;
}

export const DeleteContent: React.FC<DeleteContentProps> = ({ onDelete }) => {
  return (
    <button onClick={onDelete} aria-label="Delete content">
      <Trash />
    </button>
  );
};

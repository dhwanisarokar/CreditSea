import { useState } from "react";
import { uploadFile } from "../services/api";

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    setLoading(true);
    await uploadFile(file);
    setLoading(false);
    setFile(null);
    onUpload();
    alert("File uploaded successfully!");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white shadow-md rounded-lg">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="text-black file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default FileUpload;

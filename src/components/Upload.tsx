"use client"

import { useState, ChangeEvent } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import useDataStore from './zustand/Store'
import { ApiResponse } from "@/utlis/types";
import { useRouter } from "next/navigation";



export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [password,setPassword]=useState<string>("")
  const [message, setMessage] = useState<string>("");
    const setData=useDataStore((state)=>state.setData)
    const router=useRouter()
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage(" Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}pdf_parse/`;
    if (password && password.trim() !== "") {
  url += `?password=${encodeURIComponent(password)}`;
}
    try {
      setUploading(true);
      setMessage("");

      
      const res: AxiosResponse<ApiResponse> = await axios.post(
        url,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(res.data)
      setMessage("File uploaded successfully");
      setData(res.data)
      router.push('/display')
    } catch (error:AxiosError | unknown) {
       if (axios.isAxiosError(error)) {
    setMessage(error.response?.data?.detail || "Upload failed.");
  } else {
    setMessage("Upload failed. Try again.");
  }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0d1b0d] to-[#001a00] text-green-400 px-4">
      <div className="w-full max-w-lg p-8 rounded-3xl border border-green-800 bg-black/40 backdrop-blur-xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-green-400 text-center mb-8 tracking-wide">
          File Uploader
        </h2>

        <label
          className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-green-500 rounded-2xl cursor-pointer bg-black/40 hover:bg-green-900/20 transition-all duration-300 ease-in-out backdrop-blur-lg"
        >
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          {file ? (
            <p className="text-green-300 break-words w-full font-medium px-4">{file.name}</p>
          ) : (
            <p className="text-green-500 text-center">
              📂 Drag & drop your file here <br />
              <span className="text-green-300 text-sm">or click to select</span>
            </p>
          )}
        </label>
           <input
          type="password"
          placeholder="Enter PDF password (if any)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-6 w-full py-3 px-4 rounded-xl bg-black/40 border border-green-700 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full mt-8 py-3 bg-green-600/90 hover:bg-green-700 disabled:bg-green-900 rounded-2xl text-black font-semibold shadow-md shadow-green-900/40 transition-transform transform hover:scale-[1.02]"
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>

      
        {message && (
          <p className="mt-6 text-center text-sm text-green-300 bg-black/40 rounded-xl py-2 px-4 backdrop-blur-md border border-green-800/50">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

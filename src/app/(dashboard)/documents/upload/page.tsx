// Document upload page
"use client";

import { motion } from "framer-motion";
import { Upload, FileText, X, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { BackButton } from "@/components/BackButton";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [confidentiality, setConfidentiality] = useState("internal");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadStatus("idle");

    try {
      console.log('🚀 Starting upload process...');
      console.log('📁 Files:', files.map(f => ({ name: f.name, size: f.size, type: f.type })));
      console.log('📋 Metadata:', { title, description, department, confidentiality });

      // Validate required fields
      if (!title || !department || files.length === 0) {
        console.error('❌ Validation failed: Missing required fields');
        setUploadStatus("error");
        return;
      }

      // Create FormData for file upload
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file`, file);
        console.log(`📎 Adding file ${index + 1}:`, file.name);
      });
      
      formData.append('title', title);
      formData.append('description', description || '');
      formData.append('department', department);
      formData.append('confidentiality', confidentiality);

      console.log('📤 Sending request to /api/documents/upload...');
      
      // Call API
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || 'mock-token'}`,
        },
        body: formData
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

      const responseData = await response.json();
      console.log('📦 Response data:', responseData);

      if (response.ok) {
        console.log('✅ Upload successful!');
        setUploadStatus("success");
        
        // Reset form after delay
        setTimeout(() => {
          setFiles([]);
          setTitle("");
          setDescription("");
          setDepartment("");
          setConfidentiality("internal");
          setUploadStatus("idle");
          console.log('🔄 Form reset completed');
        }, 3000);
      } else {
        console.error('❌ Upload failed:', responseData);
        setUploadStatus("error");
      }
    } catch (error) {
      console.error('💥 Upload error:', error);
      setUploadStatus("error");
    } finally {
      setIsUploading(false);
      console.log('🏁 Upload process finished');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <BackButton />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Upload Document</h1>
          <p className="text-gray-400">Add a new document to the system</p>
        </motion.div>

        {/* Upload Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload Area */}
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-gray-600 transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-blue-400 hover:text-blue-300 transition-colors">
                  Click to upload
                </span>
                <span className="text-gray-400"> or drag and drop</span>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                />
              </label>
              <p className="text-sm text-gray-500 mt-2">
                PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX (MAX. 10MB)
              </p>
            </div>

            {/* Selected Files */}
            {files.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Selected Files:</h3>
                {files.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 bg-gray-900 border border-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="text-sm font-medium">{file.name}</div>
                        <div className="text-xs text-gray-400">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Document Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                  placeholder="Enter document title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 text-white resize-none"
                  placeholder="Enter document description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Department *</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                  >
                    <option value="">Select department</option>
                    <option value="Finance">Finance</option>
                    <option value="HR">Human Resources</option>
                    <option value="IT">Information Technology</option>
                    <option value="Legal">Legal</option>
                    <option value="Operations">Operations</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Confidentiality *</label>
                  <select
                    value={confidentiality}
                    onChange={(e) => setConfidentiality(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                  >
                    <option value="public">Public</option>
                    <option value="internal">Internal</option>
                    <option value="confidential">Confidential</option>
                    <option value="secret">Secret</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Status Messages */}
            {uploadStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-900/50 border border-green-500 rounded-lg flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div>
                  <span className="text-green-400 font-semibold">Document uploaded successfully!</span>
                  <p className="text-green-300 text-sm mt-1">Check console for detailed logs</p>
                </div>
              </motion.div>
            )}

            {uploadStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-900/50 border border-red-500 rounded-lg flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400" />
                <div>
                  <span className="text-red-400 font-semibold">Upload failed. Please try again.</span>
                  <p className="text-red-300 text-sm mt-1">Check console for error details</p>
                </div>
              </motion.div>
            )}

            {/* Console Logs Display */}
            <div className="mt-4 p-4 bg-gray-900 border border-gray-800 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">📋 Upload Logs (Check Browser Console)</h3>
              <div className="text-xs text-gray-500 space-y-1">
                <p>• Open Developer Tools (F12)</p>
                <p>• Go to Console tab</p>
                <p>• Look for 🚀, 📁, 📤, 📡, ✅, ❌ emojis</p>
                <p>• Detailed upload process will be logged</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                disabled={isUploading || files.length === 0}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload Document
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

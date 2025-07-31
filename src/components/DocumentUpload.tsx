"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface UploadFile {
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

export function DocumentUpload() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  }, []);

  const handleFiles = (files: File[]) => {
    const newUploadFiles = files.map(file => ({
      file,
      progress: 0,
      status: 'uploading' as const,
    }));

    setUploadFiles(prev => [...prev, ...newUploadFiles]);

    // Simulate upload progress
    newUploadFiles.forEach((uploadFile, index) => {
      simulateUpload(uploadFile, index);
    });
  };

  const simulateUpload = (uploadFile: UploadFile, index: number) => {
    const interval = setInterval(() => {
      setUploadFiles(prev => {
        const updated = [...prev];
        const fileIndex = updated.findIndex(f => f.file === uploadFile.file);
        
        if (fileIndex !== -1) {
          updated[fileIndex].progress += Math.random() * 20;
          
          if (updated[fileIndex].progress >= 100) {
            updated[fileIndex].progress = 100;
            updated[fileIndex].status = 'completed';
            clearInterval(interval);
          }
        }
        
        return updated;
      });
    }, 200);
  };

  const removeFile = (fileToRemove: File) => {
    setUploadFiles(prev => prev.filter(f => f.file !== fileToRemove));
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
          isDragOver
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-2xl">📁</span>
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-900">
              Drop files here to upload
            </p>
            <p className="text-sm text-gray-500 mt-1">
              or click to browse your computer
            </p>
          </div>
          
          <div>
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif"
            />
            <label htmlFor="file-upload">
              <Button asChild className="cursor-pointer">
                <span>Choose Files</span>
              </Button>
            </label>
          </div>
          
          <p className="text-xs text-gray-400">
            Supported formats: PDF, Word, Excel, PowerPoint, Images, Text files
          </p>
        </div>
      </div>

      {/* Upload Progress */}
      {uploadFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Uploading Files</h4>
          {uploadFiles.map((uploadFile, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {uploadFile.file.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {uploadFile.status === 'completed' ? 'Complete' : `${Math.round(uploadFile.progress)}%`}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(uploadFile.file)}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={uploadFile.progress} className="flex-1" />
                  <span className="text-xs text-gray-500">
                    {(uploadFile.file.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

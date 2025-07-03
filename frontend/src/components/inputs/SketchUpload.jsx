
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Upload, Image, X, FileText } from 'lucide-react';

const SketchUpload = ({ onSketchUpload, maxFiles = 5 }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (files) => {
    const newFiles = Array.from(files).slice(0, maxFiles - uploadedFiles.length);
    const fileObjects = newFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: URL.createObjectURL(file)
    }));

    const updatedFiles = [...uploadedFiles, ...fileObjects];
    setUploadedFiles(updatedFiles);
    onSketchUpload(updatedFiles);
  };

  const removeFile = (fileId) => {
    const updatedFiles = uploadedFiles.filter(f => f.id !== fileId);
    setUploadedFiles(updatedFiles);
    onSketchUpload(updatedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="h-5 w-5" />
          <span>Sketch & Reference Upload</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragging 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-2">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Image className="h-6 w-6 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium">
                Drag & drop your sketches here
              </p>
              <p className="text-xs text-gray-500">
                or click to browse files
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              Choose Files
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.dwg,.dxf"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
          />
        </div>

        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Uploaded Files ({uploadedFiles.length}/{maxFiles}):</h4>
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center space-x-3 p-2 border rounded-md">
                <div className="flex-shrink-0">
                  {file.type.startsWith('image/') ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                      <FileText className="h-5 w-5 text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="flex-shrink-0 p-1 text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="bg-yellow-50 p-3 rounded-md">
          <p className="text-sm text-yellow-800">
            <strong>Supported formats:</strong> Images (JPG, PNG), PDF, AutoCAD (DWG, DXF)
          </p>
          <p className="text-xs text-yellow-700 mt-1">
            AI will analyze your sketches to generate optimized designs
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SketchUpload;

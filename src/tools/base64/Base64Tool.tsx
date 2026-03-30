"use client";

import { useState, useCallback } from "react";
import { TabGroup } from "@/components/ui/TabGroup";
import { FileUpload } from "@/components/ui/FileUpload";
import { CopyButton } from "@/components/ui/CopyButton";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { encodeBase64, decodeBase64 } from "./logic";

const TABS = [
  { id: "text", label: "Text" },
  { id: "file", label: "File" },
  { id: "image", label: "Image" },
];

export function Base64Tool() {
  const [activeTab, setActiveTab] = useState("text");

  // Text mode state
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [isEncoding, setIsEncoding] = useState(true);
  const [textError, setTextError] = useState<string | null>(null);

  // File mode state
  const [fileOutput, setFileOutput] = useState("");
  const [fileName, setFileName] = useState("");

  // Image mode state
  const [imageDataUri, setImageDataUri] = useState("");
  const [imageName, setImageName] = useState("");

  const handleTextProcess = useCallback(() => {
    setTextError(null);
    if (!textInput.trim()) {
      setTextOutput("");
      return;
    }
    if (isEncoding) {
      setTextOutput(encodeBase64(textInput));
    } else {
      const { result, error } = decodeBase64(textInput);
      setTextOutput(result);
      setTextError(error);
    }
  }, [textInput, isEncoding]);

  const handleFileRead = useCallback((content: string, filename: string) => {
    // content from FileUpload with readAs="dataURL" is a data URI
    // Extract only the base64 part after the comma
    const base64 = content.split(",")[1] ?? content;
    setFileOutput(base64);
    setFileName(filename);
  }, []);

  const handleImageRead = useCallback((content: string, filename: string) => {
    setImageDataUri(content);
    setImageName(filename);
  }, []);

  return (
    <div className="space-y-4">
      <TabGroup tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      {/* ── Text Mode ── */}
      {activeTab === "text" && (
        <div className="space-y-4">
          <div>
            <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-1">
              Input
            </label>
            <textarea
              id="text-input"
              rows={6}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={isEncoding ? "Enter text to encode…" : "Enter Base64 to decode…"}
              className="w-full rounded-lg border border-gray-300 p-3 font-mono text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsEncoding(true);
                setTextError(null);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isEncoding
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => {
                setIsEncoding(false);
                setTextError(null);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                !isEncoding
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
              }`}
            >
              Decode
            </button>
            <button
              onClick={handleTextProcess}
              className="px-4 py-2 text-sm font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              Convert
            </button>
          </div>

          <ErrorMessage message={textError} />

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="text-output" className="block text-sm font-medium text-gray-700">
                Output
              </label>
              <div className="flex gap-2">
                <CopyButton getText={() => textOutput} label="Copy" />
                {textOutput && (
                  <DownloadButton
                    content={textOutput}
                    filename={isEncoding ? "encoded.txt" : "decoded.txt"}
                  />
                )}
              </div>
            </div>
            <textarea
              id="text-output"
              rows={6}
              value={textOutput}
              readOnly
              placeholder="Output will appear here…"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-sm"
            />
          </div>
        </div>
      )}

      {/* ── File Mode ── */}
      {activeTab === "file" && (
        <div className="space-y-4">
          <FileUpload
            onFileRead={handleFileRead}
            readAs="dataURL"
            label="Drop any file here or click to browse"
          />

          {fileOutput && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Base64 Output{fileName && <span className="text-gray-400 ml-1">({fileName})</span>}
                </label>
                <div className="flex gap-2">
                  <CopyButton getText={() => fileOutput} label="Copy" />
                  <DownloadButton content={fileOutput} filename={`${fileName || "file"}.b64.txt`} />
                </div>
              </div>
              <textarea
                rows={8}
                value={fileOutput}
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-sm break-all"
              />
            </div>
          )}
        </div>
      )}

      {/* ── Image Mode ── */}
      {activeTab === "image" && (
        <div className="space-y-4">
          <FileUpload
            accept="image/*"
            onFileRead={handleImageRead}
            readAs="dataURL"
            label="Drop an image here or click to browse"
          />

          {imageDataUri && (
            <>
              <div className="flex justify-center rounded-lg border border-gray-200 bg-gray-50 p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageDataUri}
                  alt={imageName || "Preview"}
                  className="max-h-64 max-w-full object-contain rounded"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Data URI{imageName && <span className="text-gray-400 ml-1">({imageName})</span>}
                  </label>
                  <div className="flex gap-2">
                    <CopyButton getText={() => imageDataUri} label="Copy" />
                    <DownloadButton
                      content={imageDataUri}
                      filename={`${imageName || "image"}.datauri.txt`}
                    />
                  </div>
                </div>
                <textarea
                  rows={6}
                  value={imageDataUri}
                  readOnly
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-sm break-all"
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

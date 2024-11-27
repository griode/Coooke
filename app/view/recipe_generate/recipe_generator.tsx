/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef } from "react";
import { IconButton } from "@/app/components/button";
import InteractivePanel from "@/app/components/interactive_panel_props";
import {
  HiMiniArrowUp,
  HiMiniSparkles,
  HiOutlinePhoto,
  HiOutlineSparkles,
} from "react-icons/hi2";
import pickImage from "@/app/data/functions/image_picker";

// Define the structure of a single chat entry
type RecipeGeneratorProps = {
  contentType: "text" | "image" | "recipes"; // Possible content types
  content: string; // The actual content (text or image URL)
  author: "user" | "bot"; // The sender of the content
};

// Component to render individual chat entries
const RequestContent: React.FC<{ content: RecipeGeneratorProps }> = ({
  content,
}) => {
  const { contentType, content: contentData, author } = content;

  // Render content based on its type
  const view =
    contentType === "text" ? (
      <div className="p-2 bg-slate-100 text-sm w-fit rounded-lg">
        {contentData}
      </div>
    ) : contentType === "image" ? (
      <div className="h-36 rounded-xl overflow-hidden">
        <img
          src={contentData}
          alt="Uploaded content"
          className="w-full h-full object-cover"
        />
      </div>
    ) : null;

  return (
    <div
      className={`flex ${
        author === "user" ? "justify-end" : "justify-start"
      } my-2`}
    >
      {view}
    </div>
  );
};

// Main Recipe Generator Component
const RecipeGenerator: React.FC = () => {
  const [chatData, setChatData] = useState<RecipeGeneratorProps[]>([]); // Chat history
  const descriptionRef = useRef<HTMLTextAreaElement>(null); // Reference to the input field

  // Add a new chat entry
  const handleSendRequest = (request: RecipeGeneratorProps) => {
    setChatData((prevState) => [...prevState, request]);
  };

  // Handle image upload
  const handlePickImage = async () => {
    const image = await pickImage(); // Custom hook to pick an image

    if (image) {
      handleSendRequest({
        contentType: "image",
        content: image,
        author: "user",
      });
    }
  };

  // Handle sending a text description
  const handleSendDescription = () => {
    const description = descriptionRef.current?.value.trim(); // Get input value
    if (description) {
      handleSendRequest({
        contentType: "text",
        content: description,
        author: "user",
      });
      if (descriptionRef.current) {
        descriptionRef.current.value = ""; // Clear input field
      }
    }
  };

  return (
    <InteractivePanel
      icon={<HiOutlineSparkles />}
      activateIcon={<HiMiniSparkles />}
      position="left-16 top-4 bottom-4 overflow-hidden ml-1"
      child={
        <div className="space-y-2 w-full flex flex-col items-center justify-between h-full">
          {/* Header */}
          <header className="w-full">
            <h1 className="text-xl font-bold m-4">
              How can I assist you today? You can:
            </h1>
            <hr />
          </header>

          {/* Chat History */}
          <div className="h-full w-full overflow-y-scroll p-4 space-y-4">
            {chatData.map((request, index) => (
              <RequestContent key={index} content={request} />
            ))}
          </div>

          {/* Footer */}
          <footer className="px-4 pb-4 w-full">
            <div className="border rounded-2xl w-full">
              {/* Input field */}
              <textarea
                ref={descriptionRef}
                className="w-full h-16 p-3 outline-none bg-transparent resize-none text-sm"
                placeholder="Write recipe name or description"
                aria-label="Recipe description"
              ></textarea>
              {/* Action buttons */}
              <div className="flex justify-between px-3 pb-3">
                <IconButton onClick={handlePickImage} aria-label="Upload image">
                  <HiOutlinePhoto className="text-xl" />
                </IconButton>
                <IconButton
                  onClick={handleSendDescription}
                  aria-label="Send description"
                >
                  <HiMiniArrowUp className="text-xl" />
                </IconButton>
              </div>
            </div>
          </footer>
        </div>
      }
    />
  );
};

export default RecipeGenerator;

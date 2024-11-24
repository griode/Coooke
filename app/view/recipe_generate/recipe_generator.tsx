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

type RecipeGeneratorProps = {
  contentType: "text" | "image" | "recipes";
  content: string;
  author: "user" | "bot";
};

const RequestContent: React.FC<{ content: RecipeGeneratorProps }> = ({
  content,
}) => {
  const view =
    content.contentType === "text" ? (
      <div className="p-2 bg-slate-100 text-sm w-fit rounded-lg">
        {content.content}
      </div>
    ) : content.contentType === "image" ? (
      <div className="h-36 rounded-xl overflow-hidden">
        <img
          src={content.content}
          alt="Uploaded content"
          className="w-full h-full object-cover"
        />
      </div>
    ) : null;

  return (
    <div
      className={`flex ${
        content.author === "user" ? "justify-end" : "justify-start"
      } my-2`}
    >
      {view}
    </div>
  );
};

const RecipeGenerator: React.FC = () => {
  const [chatData, setChatData] = useState<RecipeGeneratorProps[]>([]);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleSendRequest = (request: RecipeGeneratorProps) => {
    setChatData((prevState) => [...prevState, request]);
  };

  const handlePickImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.style.display = "none";

    input.addEventListener("change", (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const request: RecipeGeneratorProps = {
            contentType: "image",
            content: e.target?.result as string,
            author: "user",
          };
          handleSendRequest(request);
        };
        reader.readAsDataURL(file);
      }
    });

    input.click();
  };

  const handleSendDescription = () => {
    const description = descriptionRef.current?.value.trim();
    if (description) {
      const request: RecipeGeneratorProps = {
        contentType: "text",
        content: description,
        author: "user",
      };
      handleSendRequest(request);
      if (descriptionRef.current) {
        descriptionRef.current.value = ""; // clear the input field
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
          <header className="w-full">
            <h1 className="text-xl font-bold m-4">
              How can I assist you today? You can:
            </h1>
            <hr />
          </header>

          <div className="h-full w-full overflow-y-scroll p-4 space-y-4">
            {chatData.map((request, index) => (
              <RequestContent key={index} content={request} />
            ))}
          </div>

          <footer className="px-4 pb-4 w-full">
            <div className="border rounded-2xl w-full">
              <textarea
                ref={descriptionRef}
                className="w-full h-16 p-3 outline-none bg-transparent resize-none text-sm"
                placeholder="Write recipe name or description"
                aria-label="Recipe description"
              ></textarea>
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

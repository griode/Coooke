"use client";
import React, {useEffect, useRef, useState} from "react";
import {HiMiniArrowUp, HiOutlinePhoto} from "react-icons/hi2";
import {IconButton} from "@/components/button";
import {ClosePanelButton} from "@/components/interactive_panel_props";
import CircularProgress from "@/components/circular_progress";
import {RecipeGeneratorProps, RequestContent} from "./chat_view";
import pickImage from "@/lib/utils/image_picker";
import {useRecipes} from "@/hooks/use_recipes";
import {useCurrentUser} from "@/hooks/use_current_user";
import RecipeGenerator from "@/lib/provider/recipe_generator";
import UserProvider from "@/lib/provider/user_provider";
import {CiEraser} from "react-icons/ci";


export const ChatBox: React.FC = () => {
    const [chatData, setChatData] = useState<RecipeGeneratorProps[]>([]); // Chat history
    const descriptionRef = useRef<HTMLTextAreaElement>(null); // Reference to the input field
    const [loadingTraitement, setLoadingTraitement] = useState(false);
    const {recipes, setRecipes} = useRecipes();
    const {currentUser} = useCurrentUser();

    // Add a new chat entry
    const handleSendRequest = (request: RecipeGeneratorProps) => {
        setChatData((prevState) => [...prevState, request]);
    };

    const scrollToBottom = () => {
        const chatBox = document.getElementById("chatBox");
        chatBox?.scrollTo({top: chatBox?.scrollHeight, behavior: "smooth"});
    }

    useEffect(() => {
        scrollToBottom();
    }, [chatData]);

    // Handle image upload
    const handlePickImage = async () => {
        const image = await pickImage();
        if (image) {
            handleSendRequest({
                contentType: "image",
                content: image,
                recipes: [],
                author: "user",
            });
            const checkRequest = await UserProvider.requestAuthorized(currentUser?.uid ?? "");
            if (!checkRequest) {
                handleSendRequest({
                    contentType: "text",
                    recipes: [],
                    content: "Sorry you have reached the number of daily requests authorized, come back after 24 hours",
                    author: "bot",
                });
                return
            }
            setLoadingTraitement(true);
            // Call the traitement API
            const newRecipes = await RecipeGenerator.generateWithImage(image);
            setLoadingTraitement(false);
            if (newRecipes.length > 0) {
                handleSendRequest({
                    contentType: "recipes",
                    recipes: newRecipes,
                    content: '',
                    author: "bot",
                });
                setRecipes([...newRecipes, ...recipes]);
                await UserProvider.updateUserNumberAuthorizedRequest(currentUser?.uid ?? "")
            } else {
                handleSendRequest({
                    contentType: "text",
                    recipes: [],
                    content: "Sorry, I couldn't find any recipe for the image, please try again.",
                    author: "bot",
                });
            }
        }
        scrollToBottom();
    }

    // Handle sending a text description
    const handleSendDescription = async () => {
        const checkRequest = await UserProvider.requestAuthorized(currentUser?.uid ?? "");
        const description = descriptionRef.current?.value.trim();
        if (description) {
            handleSendRequest({
                contentType: "text",
                recipes: [],
                content: description,
                author: "user",
            });
            if (descriptionRef.current) {
                descriptionRef.current.value = ""; // Clear input field
            }

            if (!checkRequest) {
                handleSendRequest({
                    contentType: "text",
                    recipes: [],
                    content: "Sorry you have reached the number of daily requests authorized, come back after 24 hours",
                    author: "bot",
                });
                return
            }

            setLoadingTraitement(true);
            // Call the traitement API
            const newRecipes = await RecipeGenerator.generateWithDescription(description);
            setLoadingTraitement(false);
            if (newRecipes.length > 0) {
                handleSendRequest({
                    contentType: "recipes",
                    recipes: newRecipes,
                    content: description,
                    author: "bot",
                });
                setRecipes([...newRecipes, ...recipes]);
                await UserProvider.updateUserNumberAuthorizedRequest(currentUser?.uid ?? "")
            } else {
                handleSendRequest({
                    contentType: "text",
                    recipes: [],
                    content: "Sorry, I couldn't find any recipe for this description.",
                    author: "bot",
                });
            }
        }
        scrollToBottom();
    };

    return (
        <div className="space-y-2 w-full flex flex-col items-center justify-between h-full">
            {/* Header */}
            <header className="w-full">
                <div className="flex items-center p-2 space-x-4 justify-between">
                    <div className={'flex space-x-2 items-center'}>
                        <ClosePanelButton panelId="chatPanel"/>
                        <h1 className="flex items-center justify-center">
                            <span>🍳 Let's Cook Something Amazing! 🥗</span>
                        </h1>
                    </div>
                    <IconButton onClick={() => setChatData([])}><CiEraser/></IconButton>
                </div>
                <hr/>
            </header>
            {/* Chat History */}
            <div
                id="chatBox"
                className="h-full w-full overflow-y-scroll p-4">
                {chatData.map((request, index) => (
                    <RequestContent key={index} content={request}/>
                ))}
                {loadingTraitement && (<div className="flex space-x-2 items-center">
                    <CircularProgress infinite={true} size={16}/>
                    <p>analyse... </p></div>)}
            </div>

            <footer className="px-4 pb-4 w-full">
                <div className="border rounded-2xl w-full">
                    <textarea
                        ref={descriptionRef}
                        className="w-full h-18 p-3 outline-none bg-transparent resize-none"
                        placeholder="Write recipe name or description"
                        aria-label="Recipe description"
                    ></textarea>
                    <div className="flex justify-between px-3 pb-3">
                        <IconButton onClick={handlePickImage} aria-label="Upload image">
                            <HiOutlinePhoto className="text-xl"/>
                        </IconButton>
                        <IconButton
                            onClick={handleSendDescription}
                            aria-label="Send description"
                        >
                            <HiMiniArrowUp className="text-xl"/>
                        </IconButton>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ChatBox

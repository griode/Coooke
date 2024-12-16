/* eslint-disable @typescript-eslint/no-explicit-any */
import { functions, storage } from "@/app/firebase";
import { deleteObject, getDownloadURL, ref, StringFormat, uploadString } from "firebase/storage";
import { v1 } from "uuid";
import imageCompression from "browser-image-compression";
import { httpsCallable } from "firebase/functions";

// Compress an image to a Base64 string
export async function compressImageToBase64(
    base64String: string, megabytes: number
): Promise<string | null> {
    // Convertir Base64 en Blob
    const base64ToBlob = (base64: string): Blob => {
        const byteString = atob(base64.split(",")[1]);
        const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const intArray = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            intArray[i] = byteString.charCodeAt(i);
        }
        return new Blob([arrayBuffer], { type: mimeString });
    };

    const fileBlob: any = base64ToBlob(base64String);

    // Définir les options initiales de compression
    const options = {
        maxSizeMB: 2.9, // Légèrement inférieur à 3 MB
        maxWidthOrHeight: 1920, // Dimensions maximales
        useWebWorker: true,
    };

    try {
        let compressedFile = await imageCompression(fileBlob, options);

        // Vérifier la taille de l'image compressée
        while (compressedFile.size > megabytes * 1024 * 1024) {
            // Réduire la taille maximale pour compresser davantage
            options.maxSizeMB /= 2;

            // Compresser de nouveau
            compressedFile = await imageCompression(fileBlob, options);

            // Si les options atteignent une limite trop basse
            if (options.maxSizeMB < 0.1) {
                throw new Error(`Impossible de compresser l'image ${megabytes} Mo.`);
            }
        }

        // Convertir Blob compressé en Base64
        return await imageCompression.getDataUrlFromFile(compressedFile);
    } catch (error) {
        console.error(`Failed to compress image below ${megabytes} Mo: ` + error);
        return null;
    }
}

// Delete a file from Firebase Storage
export async function deleteFileByUrl(fileUrl: string): Promise<void> {
    try {
        const fileRef = ref(storage, fileUrl);
        await deleteObject(fileRef)
    } catch (error) {
        console.log("Error to delete image or image dose not existe : " + error);
    }
}

export async function uploadBase64ImageCompress(
    base64String: string,
    storagePath: string
): Promise<string | null> {
    try {
        // Convertir Blob compressé en Base64
        const compressedBase64 = await compressImageToBase64(base64String, 0.8);

        // Créer une référence pour le fichier dans Firebase Storage
        const fileRef = ref(storage, `${storagePath}/${v1()}`);

        // Uploader le Base64 compressé dans Firebase Storage
        if (!compressedBase64) {
            return null;
        }
        await uploadString(fileRef, compressedBase64, StringFormat.DATA_URL);

        // Obtenir et retourner l'URL de téléchargement
        return await getDownloadURL(fileRef);
    } catch (error) {
        console.error("Failed to upload compressed Base64 file." + error);
        return null;
    }
}

export async function uploadImageFromUrl(imageUrl: string, filePath: string): Promise<string> {
    try {
        const generateRecipe = httpsCallable(functions, "upload_image_to_storage");
        const response = await generateRecipe({
            "url": imageUrl,
            "path": filePath,
        });
        const url = (response.data as { url?: string })?.url as string;
        if (url) {
            return url;
        }
        return ""
    } catch (error) {
        console.error("Erreur dans uploadImageFromUrl : ", error);
        return ""
    }
}
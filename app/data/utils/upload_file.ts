/* eslint-disable @typescript-eslint/no-explicit-any */
import { storage } from "@/app/firebase";
import { ref, getDownloadURL, uploadString, StringFormat, deleteObject, uploadBytesResumable } from "firebase/storage";
import {v1} from "uuid";
import imageCompression from "browser-image-compression";

export async function uploadBase64File(
  base64String: string,
  storagePath: string
): Promise<string> {
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

  // Options de compression
  const options = {
    maxSizeMB: 0.8, // Taille maximale de l'image compressée en MB
    maxWidthOrHeight: 1920, // Dimension maximale (largeur ou hauteur)
    useWebWorker: true,
  };

  try {
    // Compresser l'image
    const compressedFile = await imageCompression(fileBlob, options);

    // Convertir Blob compressé en Base64
    const compressedBase64 = await imageCompression.getDataUrlFromFile(
      compressedFile
    );

    // Créer une référence pour le fichier dans Firebase Storage
    const fileRef = ref(storage, `${storagePath}/${v1()}`);

    // Uploader le Base64 compressé dans Firebase Storage
    await uploadString(fileRef, compressedBase64, StringFormat.DATA_URL);

    // Obtenir et retourner l'URL de téléchargement
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading compressed Base64 file:", error);
    throw new Error("Failed to upload compressed Base64 file.");
  }
}

export async function uploadImageFromUrl(imageUrl: string, filePath: string): Promise<string> {
  try {
      // Télécharger l'image en tant que Blob
      const response = await fetch(imageUrl);
      if (!response.ok) {
          throw new Error(`Erreur lors du téléchargement de l'image : ${response.statusText}`);
      }
      const blob = await response.blob();

      // Référence vers Firebase Storage
      const storageRef = ref(storage,`${filePath}/${v1()}`);

      // Uploader l'image dans Firebase Storage
      const uploadTask = await uploadBytesResumable(storageRef, blob);

      // Récupérer l'URL publique de l'image
      const downloadURL = await getDownloadURL(uploadTask.ref);
      console.log("Image URL dans Firebase Storage: ", downloadURL);

      return downloadURL;
  } catch (error) {
      console.error("Erreur dans uploadImageFromUrl : ", error);
      throw error;
  }
}

export async function deleteFileByUrl(fileUrl: string): Promise<void> {
  // Crée une référence de fichier à partir de l'URL fournie
  const fileRef = ref(storage, fileUrl);
  try {
    // Supprimer le fichier de Firebase Storage
    await deleteObject(fileRef);
  } catch (error) {
    console.error("Erreur lors de la suppression du fichier:", error);
    throw new Error("Échec de la suppression du fichier.");
  }
}

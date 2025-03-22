import * as fabric from 'fabric';
import { FabricImage } from 'fabric';

export async function SaveSelectedImages(borderColor: string, selectedToPrint: File[]) {
    const canvasWidth = 243;
    const canvasHeight = 324;

    try {
        const canvas = new fabric.Canvas('image', {
            width: canvasWidth,
            height: canvasHeight,
        });

        const savedImages: string[] = [];

        for (const imageFile of selectedToPrint) {
            const imageUrl = URL.createObjectURL(imageFile);

            const imageWidth = canvasWidth - 30;
            const imageHeight = canvasHeight - 45;

            // Add border rectangle
            const rect = new fabric.Rect({
                width: canvasWidth,
                height: canvasHeight,
                fill: borderColor,
                selectable: false,
                hasControls: false,
                hasBorders: false,
            });
            canvas.add(rect);

            // Create clip path
            const clipPath = new fabric.Rect({
                left: 15,
                top: 15,
                width: imageWidth,
                height: imageHeight,
                absolutePositioned: true,
            });

            // Load image
            const img = await FabricImage.fromURL(imageUrl);
            if (img) {
                img.scaleToHeight(imageHeight);
                img.scaleToWidth(imageWidth);

                const scaleX = imageWidth / img.width!;
                const scaleY = imageHeight / img.height!;
                const scale = Math.max(scaleX, scaleY); // Ensures full coverage

                img.set({
                    scaleX: scale,
                    scaleY: scale,
                    left: (canvasWidth - img.width! * scale) / 2,
                    top: (canvasHeight - img.height! * scale) / 2,
                    selectable: false,
                    hasControls: false,
                    hasBorders: true,
                    clipPath: clipPath,
                });
                canvas.add(img);
                canvas.renderAll();

                // Convert canvas to image
                const dataURL = canvas.toDataURL({
                    multiplier: 2,
                    format: 'jpeg',
                    quality: 0.8,
                });

                savedImages.push(dataURL);
            }

            URL.revokeObjectURL(imageUrl);
            canvas.clear(); // Clear the canvas for the next image
        }

        // Download all images
        downloadCanvas(savedImages);
        return true;
    } catch (error) {
        console.error("Error processing images:", error);
        return false;
    }
}

const downloadCanvas = (savedImages: string[]) => {
    savedImages.forEach((imgData, index) => {
        const blob = dataURLtoBlob(imgData);
        const objUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = objUrl;
        link.download = `image_${index + 1}.jpg`; // Unique filenames

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(objUrl);
    });
};

// Helper function to convert dataURL to Blob
const dataURLtoBlob = (dataURL: string) => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];

    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([uint8Array], { type: mimeString });
};
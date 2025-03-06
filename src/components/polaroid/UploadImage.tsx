import { useRef,  } from "react";
import { PolaroidUpload, UploadImageButton } from "../../assets/icons/Icon";
import axios from "axios";
import { useAppDispatch } from "../../context/AppContext";

const UploadImage = () => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file)
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadImage = async (file:File) => {
    
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mementos");
    formData.append("cloud_name", "dt7jocfde");
    formData.append("folder", "mementos");
    
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dt7jocfde/image/upload",
        formData
      );
      const imageUrl = response.data.secure_url;
      dispatch({ type: "SET_UPLOAD", payload: imageUrl });
      console.log("Image Uploaded");
    } catch (error) {
      console.error("Upload Failed", error);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="border-[1px] border-black flex flex-col items-center justify-center h-60 px-3 gap-y-4">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <img src={PolaroidUpload} alt="PolaroidUpload" />
        <img src={UploadImageButton} alt="UploadImage" onClick={handleClick} />
      </div>
    </div>
  );
};

export default UploadImage;

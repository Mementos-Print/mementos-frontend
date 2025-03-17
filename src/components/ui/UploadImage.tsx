import { useEffect, useRef } from "react";
import { PolaroidUpload, UploadImageButton } from "../../assets/icons/Icon";
// import axios from "axios";
import { useSetSelected } from "../../hooks/useSetSelected";
import { useAppState } from "../../hooks/useAppState";

const UploadImage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const setSelected = useSetSelected();
  const {importedImages} = useAppState()

  useEffect(()=>{
    const savedImages = localStorage.getItem("importedImages");
    if(savedImages){
      setSelected("importedImages", JSON.parse(savedImages))
    }
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const updatedImages = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );

    const newImageList = [... updatedImages, ...importedImages ]
    setSelected("importedImages", newImageList);

    localStorage.setItem("importedImages",JSON.stringify(newImageList))
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex justify-center">
      <div className="border-[1px] border-black flex flex-col items-center justify-center h-60 px-3 gap-y-4">
        <input
          type="file"
          ref={fileInputRef}
          multiple
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

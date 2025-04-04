import { useRef } from "react";
import { UploadImageButton } from "../../assets/icons/Icon";
import { useSetSelected } from "../../hooks/useSetSelected";
import { useAppState } from "../../hooks/useAppState";

const UploadImage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const setSelected = useSetSelected();
  const { importedImages } = useAppState();

  // useEffect(()=>{
  //   const savedImages = localStorage.getItem("importedImages");
  //   if(savedImages){
  //     setSelected("importedImages", JSON.parse(savedImages))
  //   }
  // })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const updatedImages = Array.from(e.target.files)

    const newImageList = [...updatedImages, ...importedImages];
    setSelected("importedImages", newImageList);

    // localStorage.setItem("importedImages",JSON.stringify(newImageList))
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center h-60 px-3 gap-y-3">
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <img src={UploadImageButton} alt="UploadImage" onClick={handleClick} />
        <div className="text-[#9E9E9E] text-xs leading-4 text-center">
          <p>Select images to print</p>
          <p>(Even selections only i.e 2, 4, 6 etc)</p>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;

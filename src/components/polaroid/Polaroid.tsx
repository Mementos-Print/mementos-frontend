import { useAppState } from "../../context/AppContext";
import BaseFeatures from "./BaseFeatures";
import UploadImage from "./UploadImage";

const PolaroidIndex = () => {
  const { onUpload } = useAppState();
  return (
    <div className="bg-[#F5F5F5]">
      <div className="py-10">
        <UploadImage />
        {onUpload && <img src={onUpload} />}
      </div>
      <BaseFeatures />
    </div>
  );
};

export default PolaroidIndex;

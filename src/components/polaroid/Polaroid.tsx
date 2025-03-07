// import { useAppState } from "../../hooks/useAppState";
import BaseFeatures from "./BaseFeatures";
import UploadImage from "../ui/UploadImage";

const PolaroidIndex = () => {
  // const { onUpload } = useAppState();
  return (
    <div className="bg-[#F5F5F5]">
      <div className="py-10">
        <UploadImage />
        {/* {onUpload && <img src={onUpload} />} */}
      </div>
      <BaseFeatures />
    </div>
  );
};

export default PolaroidIndex;

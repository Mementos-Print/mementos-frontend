import ReactDOM from "react-dom";
import { CancelUpload, UploadForPrint } from "../../assets/icons/Icon";

const UploadOverlay = () => {
  const portalRoot = document.getElementById("portal-root");
  if (!portalRoot) return null;
  return ReactDOM.createPortal(
    <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center">
    <div className="relative w-[90%] rounded-2xl h-[312px] bg-white flex flex-col items-center justify-center shadow-lg gap-16 z-50">
      <div className="text-base text-[#212121] text-center">
        <p className="font-medium">All set!</p>
        <p className="font-light">Upload Image(s) for printing</p>
      </div>
      <img src={UploadForPrint} alt="upload-image"  className="absolute bottom-8"/>
      <img src={CancelUpload} alt="cancel" className="absolute top-2 right-4" />
    </div>

    </div>,
    portalRoot
  );
};

export default UploadOverlay;

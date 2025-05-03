import ReactDOM from "react-dom";
import {
  ArrowRightGenerated,
  CancelUpload,
  GeneratedSuccess,
  //   ProgressiveBar,
} from "../../assets/icons/Icon";
import { useSetSelected } from "../../hooks/useSetSelected";

const PolaroidGenerated = () => {
  const portalRoot = document.getElementById("portal-root");
  const setSelected = useSetSelected();

  if (!portalRoot) return null;
  return ReactDOM.createPortal(
    <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center">
      {/* <img src={ProgressiveBar} className="absolute top-0" alt="" /> */}
      <div className="relative w-[90%] rounded-2xl h-[396px] bg-white flex flex-col items-center justify-center shadow-lg gap-16 z-50 p-4">
        <img src={GeneratedSuccess} alt="success" />
        <div className="text-base text-[#212121] text-center">
          <p className="font-medium">Polaroid Generated</p>
          <p className="font-light">
            We are Inking your memory, it will only take a few minutes
          </p>
        </div>
        <a href="/" className="flex items-center justify-center py-2 text-white gap-2 bg-[#333431] w-[90%] absolute bottom-8 rounded-[60px]">
          <p className="text-xl">Back to home</p>
          <img src={ArrowRightGenerated} alt="arrow-right-generated" />
        </a>

        <img
          src={CancelUpload}
          alt="cancel"
          className="absolute top-2 right-4"
          onClick={() => setSelected("isSuccessful", false)}
        />
      </div>
    </div>,
    portalRoot
  );
};

export default PolaroidGenerated;

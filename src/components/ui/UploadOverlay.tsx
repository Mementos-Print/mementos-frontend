import ReactDOM from "react-dom";
import { CancelUpload, UploadForPrint } from "../../assets/icons/Icon";
import { useSetSelected } from "../../hooks/useSetSelected";
import { uploadImage } from "../../pages/auth/auth";
import { useAppState } from "../../hooks/useAppState";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";

const UploadOverlay = () => {
  const portalRoot = document.getElementById("portal-root");
  const setSelected = useSetSelected();
  const { borderOption, selectedImages, userCredentials } = useAppState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(Boolean);

  const handleSuccess = () => {
    setLoading(true);
    uploadImage(
      borderOption,
      selectedImages,
      JSON.stringify(userCredentials, null, 2)
    )
      .then(() => {
        setSelected("isDone", false);
        navigate("/user/dashboard");
        setSelected("isSuccessful", true);
      })
      .catch((err) => {
        toast(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!portalRoot) return null;
  return ReactDOM.createPortal(
    <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center">
      <div className="relative w-[90%] rounded-2xl h-[312px] bg-white flex flex-col items-center justify-center shadow-lg gap-16 z-50 p-4">
        <div className="text-base text-[#212121] text-center">
          <p className="font-medium">All set!</p>
          <p className="font-light">Upload Image(s) for printing</p>
        </div>
        {loading ? (
          <p className="bg-[#333431] rounded-[60px] py-2 w-full text-center text-white text-xl absolute bottom-8 w-[80%]">
            Loading...
          </p>
        ) : (
          <img
            src={UploadForPrint}
            alt="upload-image"
            className="absolute bottom-8"
            onClick={handleSuccess}
          />
        )}
        <img
          src={CancelUpload}
          alt="cancel"
          className="absolute top-2 right-4"
          onClick={() => setSelected("isDone", false)}
        />
      </div>
      <ToastContainer />
    </div>,
    portalRoot
  );
};

export default UploadOverlay;

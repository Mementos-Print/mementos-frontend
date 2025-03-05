import { FormDataUploadTab } from "../../../types/type";
import EditPictures from "./EditPictures";
import FileUpload from "./FileUpload";

const UploadTab = ({ Files, handleFilesChange, handleNext, handleSubmit }: FormDataUploadTab) => {
    return (
        <div className="w-full">
            {Files.length == 0 ?
                <FileUpload handleFilesChange={handleFilesChange} handleNext={handleNext} />
                :
                <EditPictures />}

            <div>
                <button onClick={handleSubmit} className="bg-secondary py-2 px-4 text-primary rounded-full">
                    Done
                </button>
            </div>

        </div>
    )
}
export default UploadTab;
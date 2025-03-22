import { CompletedProps } from "../../types/type";
import CompletedModal from "../Modals/CompletedModal";

const Completed = ({ isOpen }: CompletedProps) => (
   <div>
      <CompletedModal isOpen={isOpen} />
   </div>
);

export default Completed;
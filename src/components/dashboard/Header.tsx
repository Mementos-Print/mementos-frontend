import { Link } from "react-router-dom";
import { Add } from "../../assets/icons/Icon";

const Header = () => {
  return (
    <div className="flex justify-between items-center w-full text-xl font-semibold mb-4">
      <p>Dashboard</p>
      <div className="flex items-center gap-2 bg-[#C9EC81] rounded-[60px] py-2 px-6">
        <Add />
        <Link to="/dashboard/upload">
          <p>Upload</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;

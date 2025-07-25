import { Link } from "react-router-dom";
import { ArrowUpRight } from "../../assets/icons/Icon";

export const OptionsBox = ({
  heading,
  note,
  link,
}: {
  heading: string;
  note: string;
  link: string;
}) => {
  return (
    <Link to={link}>
      <div className="flex flex-col p-4 bg-[#FAFAFA80] border border-[#FAFAFA] rounded-2xl">
        <div className="flex flex-row justify-between items-center">
          <p className="text-[20px] kanit-regular">{heading}</p>
          <div className="rounded-full p-2 w-fit bg-secondary">
            <ArrowUpRight />
          </div>
        </div>
        <p className="text-left kanit-light">{note}</p>
      </div>
    </Link>
  );
};

export const AdminOptionsBox = ({
  heading,
  link,
}: {
  heading: string;
  link: string;
}) => {
  return (
    <Link to={link}>
      <div className="flex flex-col py-2 px-4 bg-[#FAFAFA80] border border-[#FAFAFA] rounded-2xl w-full">
        <p className="text-[20px] kanit-regular">{heading}</p>
      </div>
    </Link>
  );
};

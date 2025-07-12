import { FilterDashboard, Search } from "../../assets/icons/Icon";
import { LibraryProps } from "../../types";

const LibraryItems = [
  {
    name: "Tide 25",
    date_created: "Wedding",
    image: "/image_6.jpg",
  },
  {
    name: "Tide 25",
    date_created: "Wedding",
    image: "/image_7.jpg",
  },
  {
    name: "Tide 25",
    date_created: "Wedding",
    image: "/image_8.jpg",
  },
  {
    name: "Tide 25",
    date_created: "Wedding",
    image: "/image_9.jpg",
  },
];

const Header = () => {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <p className="text-lg font-semibold">Library</p>
        <p className="text-sm text-[#616161]">View Library</p>
      </div>
      <div className="flex gap-2 mb-3 relative">
        <input
          type="search"
          className="h-9 rounded-lg w-[272px p-2 placeholder:px-9 flex-1"
        />
        <Search className="absolute left-2 top-2" />

        <div className="bg-white p-2 rounded-lg">
          <FilterDashboard />
        </div>
      </div>
    </div>
  );
};

const LibraryCard = ({ name, date_created, image }: LibraryProps) => {
  return (
    <div className="h-[162px] relative">
      <img src={image} alt="image" className="h-full w-full object-cover" />
      <div className="absolute bottom-0 bg-white w-full">
        <p className="text-base mb-2">{name}</p>
        <p className="text-xs text-[#757575]">{date_created}</p>
      </div>
    </div>
  );
};

const Library = () => {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-2 gap-2">
        {LibraryItems.map((item, idx) => {
          return (
            <LibraryCard
              key={idx}
              name={item.name}
              date_created={item.date_created}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Library;

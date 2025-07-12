import { FilterDashboard } from "../../assets/icons/Icon";
import { AvailableEventProps } from "../../types";

const EventItems = [
  {
    name: "Tide 25",
    type: "Wedding",
    image: "/image_6.jpg",
  },
  {
    name: "Tide 25",
    type: "Wedding",
    image: "/image_7.jpg",
  },
  {
    name: "Tide 25",
    type: "Wedding",
    image: "/image_8.jpg",
  },
  {
    name: "Tide 25",
    type: "Wedding",
    image: "/image_9.jpg",
  },
  {
    name: "Tide 25",
    type: "Wedding",
    image: "/image_6.jpg",
  },
  {
    name: "Tide 25",
    type: "Wedding",
    image: "/image_6.jpg",
  },
];
const EventCard = ({ name, type, image }: AvailableEventProps) => {
  return (
    <div className="h-[127px] w-[86px] relative border-white border-4 flex-shrink-0">
      <img src={image} alt="image" className="h-full w-full object-cover" />
      <div className="absolute bottom-0 bg-white w-full">
        <p className="text-sm">{name}</p>
        <p className="text-[10px]">{type}</p>
      </div>
    </div>
  );
};

const AvailableEvents = () => {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <p className="text-lg font-semibold">Available Events</p>
        <FilterDashboard />
      </div>
      <div className="flex gap-2 overflow-x-auto scroll-bar h-[180px]">
        {EventItems.map((item, idx) => {
          return (
            <EventCard
              key={idx}
              name={item.name}
              type={item.type}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AvailableEvents;

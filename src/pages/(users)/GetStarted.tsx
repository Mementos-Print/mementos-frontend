// Landing Page

import { motion } from "framer-motion";
import { BackgroundGradientsEllipses } from "../../assets/icons/Icon";
import { OptionsBox } from "../../components/ui/OptionsBox";
import { optionsLists } from "../../constants";

const GetStarted = () => {
  return (
    <div className="kanit-medium">
      <div className="absolute  inset-0 w-full h-full child:w-full -z-10 object-cover">
        <BackgroundGradientsEllipses />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container relative z-10 px-4 mx-auto max-w-7xl"
      >
        <div className="px-5 relative z-10 flex flex-col items-center justify-center text-center w-full h-fit">
          <div className="py-[50px]">
            <h1 className="text-[36px] kanit-bold">Mementos Print </h1>
          </div>

          <div className="flex flex-col gap-3">
            <p className="kanit-light">Select an option</p>
            <div className="flex flex-col gap-4">
              {optionsLists.map((options, index) => (
                <OptionsBox
                  heading={options.heading}
                  note={options.note}
                  link={options.link}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GetStarted;

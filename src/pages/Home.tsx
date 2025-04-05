// Landing Page

import { motion } from "framer-motion"
import { ArrowRight, BackgroundGradientsEllipses } from "../assets/icons/Icon"
import { Link } from "react-router-dom"

const Home = () => {

    return (
        <div className="kanit-medium ">
            <div className="absolute inset-0 w-full h-full child:w-full -z-10 object-cover md:object-fill">
                <BackgroundGradientsEllipses />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="container relative z-10 px-4 mx-auto max-w-7xl"
            >
                <div className="px-5 relative z-10 flex flex-col gap-2 items-center justify-center text-center w-full h-fit">
                    {/* Main section */}
                    <div className="pt-2 pb-4">
                        <h1 className="text-[34px]/9 kanit-semibold">Inking your memories</h1>
                    </div>

                    <div className="block mx-auto">
                        <img src="/images/LandingPageImage.jpg" alt="Mementos print image" />;
                    </div>

                    <div className="w-full lg:w-1/2 py-2 px-4 bg-secondary rounded-full">
                        <Link to='/auth/user/signin' className="" >
                            <div className="w-full flex flex-row gap-6 items-center justify-center">
                                <p className="text-[20px] kanit-regular">Get Started</p>
                                <div className="">
                                    <ArrowRight color="var(--primary)" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Home
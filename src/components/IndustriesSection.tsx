"use client";

import { motion, Variants } from "framer-motion";

const industries = [
    {
        name: "Real Estate Operators",
        copy: "Real estate operators face high structural exposure due to listing syndication dependency, directory inconsistencies, and data fragmentation across MLS, Zillow, Realtor, and proprietary platforms. Visibility gaps at the listing level compound into significant revenue displacement.",
    },
    {
        name: "Private Medical & Aesthetic Clinics",
        copy: "Medical and aesthetic practices operate in a high-trust environment where digital credibility directly precedes patient conversion. Inconsistent NAP data, review platform fragmentation, and absent owned channels create avoidable structural risk.",
    },
    {
        name: "Tech Founders",
        copy: "Early-stage and growth-stage founders often build product infrastructure before digital infrastructure. This creates an exposure window where the business cannot be found, verified, or transacted with at the moment market demand arrives.",
    },
    {
        name: "Hospitality & Capital Operators",
        copy: "Hospitality and capital operators face maximum exposure through platform dependency — OTAs, aggregators, and booking platforms absorb margin while extracting ownership of the customer relationship. Examination identifies where sovereignty can be reclaimed.",
    },
    {
        name: "High-Visibility Personal Brands",
        copy: "Personal brands with earned visibility but fractured infrastructure leak audience, revenue, and authority. Examination identifies where followers become owned contacts and where distribution can be decoupled from platform algorithms.",
    },
    {
        name: "Diaspora-Led Enterprises",
        copy: "Diaspora-led operators frequently manage businesses spanning multiple geographic markets with inconsistent digital presence in each. Examination maps the full footprint and identifies structural inconsistencies across market contexts.",
    },
];

export default function IndustriesSection() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: "easeOut" }
        }
    };

    return (
        <section id="industries" className="bg-white py-[120px] text-black overflow-hidden">
            <div className="max-w-[1140px] mx-auto px-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-[80px] pb-10 border-b border-[#E0E0E0] text-center flex flex-col items-center"
                >
                    <p className="font-montserrat text-[10px] font-semibold tracking-[0.4em] uppercase text-blue-mid mb-3">
                        Coverage
                    </p>
                    <h2 className="font-montserrat font-extrabold text-black tracking-[-0.02em] mb-4 text-[clamp(30px,4.5vw,52px)]">
                        Industries
                    </h2>
                    <p className="font-inter text-[16px] text-[#8A8A8A] max-w-2xl mx-auto">
                        Sovereign X examinations are calibrated to sector-specific
                        structural exposure.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {industries.map(({ name, copy }, i) => (
                        <motion.div
                            key={name}
                            variants={itemVariants}
                            className={`grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 md:gap-[60px] py-11 border-b border-[#EBEBEB] items-start ${i === 0 ? "border-t" : ""
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-1 rounded-full bg-blue-mid/20" />
                                <h3 className="font-montserrat text-[14px] font-bold text-black tracking-[0.02em] uppercase">
                                    {name}
                                </h3>
                            </div>
                            <p className="font-inter text-[14px] text-[#555] leading-[1.75]">
                                {copy}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

"use client";

import { motion, Variants } from "framer-motion";

export default function RequestSection() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <section id="request" className="bg-black py-[120px] overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="max-w-[1140px] mx-auto px-10 text-center flex flex-col items-center"
            >
                <p className="font-montserrat text-[10px] font-semibold tracking-[0.4em] uppercase text-white/35 mb-5">
                    Intake
                </p>
                <h2 className="font-montserrat font-extrabold text-white tracking-[-0.01em] mb-4 text-[clamp(32px,5vw,56px)] max-w-3xl">
                    Request Examination
                </h2>
                <p className="font-inter text-[16px] text-white/40 mb-[52px] leading-relaxed max-w-2xl">
                    All submissions are reviewed before examination is scheduled. Not
                    every applicant proceeds.
                </p>

                <form onSubmit={(e) => e.preventDefault()}>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >
                        {/* Business Name */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-2">
                            <label className="font-montserrat text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40">
                                Business Name
                            </label>
                            <input
                                type="text"
                                name="business_name"
                                placeholder="Your business name"
                                className="bg-white/[0.04] border border-white/[0.08] text-white font-inter text-[14px] px-4 py-3.5 outline-none focus:border-navy/60 transition-all duration-200 placeholder:text-white/20 focus:bg-white/[0.07]"
                            />
                        </motion.div>

                        {/* Industry */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-2">
                            <label className="font-montserrat text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40">
                                Industry
                            </label>
                            <input
                                type="text"
                                name="industry"
                                placeholder="e.g. Real Estate, Medical, Tech"
                                className="bg-white/[0.04] border border-white/[0.08] text-white font-inter text-[14px] px-4 py-3.5 outline-none focus:border-navy/60 transition-all duration-200 placeholder:text-white/20 focus:bg-white/[0.07]"
                            />
                        </motion.div>

                        {/* Revenue Range */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-2">
                            <label className="font-montserrat text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40">
                                Revenue Range
                            </label>
                            <select
                                name="revenue_range"
                                className="bg-[#111] border border-white/[0.08] text-white font-inter text-[14px] px-4 py-3.5 outline-none focus:border-navy/60 transition-all duration-200 appearance-none focus:bg-[#181818]"
                            >
                                <option value="" disabled>
                                    Select range
                                </option>
                                <option value="under-250k">Under $250K</option>
                                <option value="250k-1m">$250K – $1M</option>
                                <option value="1m-5m">$1M – $5M</option>
                                <option value="5m-plus">$5M+</option>
                            </select>
                        </motion.div>

                        {/* Location */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-2">
                            <label className="font-montserrat text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                placeholder="City, Country"
                                className="bg-white/[0.04] border border-white/[0.08] text-white font-inter text-[14px] px-4 py-3.5 outline-none focus:border-navy/60 transition-all duration-200 placeholder:text-white/20 focus:bg-white/[0.07]"
                            />
                        </motion.div>

                        {/* Primary Concern — full width */}
                        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 flex flex-col gap-2">
                            <label className="font-montserrat text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40">
                                Primary Concern
                            </label>
                            <input
                                type="text"
                                name="primary_concern"
                                placeholder="What is your most pressing structural issue?"
                                className="bg-white/[0.04] border border-white/[0.08] text-white font-inter text-[14px] px-4 py-3.5 outline-none focus:border-navy/60 transition-all duration-200 placeholder:text-white/20 focus:bg-white/[0.07]"
                            />
                        </motion.div>

                        {/* Digital Stack — full width */}
                        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 flex flex-col gap-2">
                            <label className="font-montserrat text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40">
                                Current Digital Stack
                            </label>
                            <input
                                type="text"
                                name="digital_stack"
                                placeholder="e.g. WordPress, Shopify, Google My Business, Instagram..."
                                className="bg-white/[0.04] border border-white/[0.08] text-white font-inter text-[14px] px-4 py-3.5 outline-none focus:border-navy/60 transition-all duration-200 placeholder:text-white/20 focus:bg-white/[0.07]"
                            />
                        </motion.div>

                        {/* Why — full width textarea */}
                        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 flex flex-col gap-2">
                            <label className="font-montserrat text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40">
                                Why are you seeking examination?
                            </label>
                            <textarea
                                name="why_examination"
                                placeholder="Describe your situation and what you are hoping to understand or resolve."
                                rows={4}
                                className="bg-white/[0.04] border border-white/[0.08] text-white font-inter text-[14px] px-4 py-3.5 outline-none focus:border-navy/60 transition-all duration-200 placeholder:text-white/20 resize-y min-h-[100px] focus:bg-white/[0.07]"
                            />
                        </motion.div>
                    </motion.div>

                    <div className="mt-12 flex flex-col items-center gap-6">
                        <motion.button
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1, duration: 0.6 }}
                            whileHover={{ scale: 1.05, backgroundColor: "#004080" }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="font-montserrat text-[12px] font-bold tracking-[0.25em] uppercase text-white bg-navy border border-navy px-16 py-[20px] transition-all duration-300 shadow-[0_0_30px_rgba(0,102,255,0.15)] hover:shadow-[0_0_40px_rgba(0,102,255,0.4)]"
                        >
                            Submit for Review
                        </motion.button>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.2, duration: 1 }}
                            className="font-inter text-[13px] text-white/30 max-w-[400px] leading-relaxed text-center"
                        >
                            Submissions reviewed within 48 hours. Not all applicants proceed
                            to examination.
                        </motion.p>
                    </div>
                </form>
            </motion.div>
        </section>
    );
}

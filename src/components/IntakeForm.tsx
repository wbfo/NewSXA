"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

type Service = "digital-audit" | "image-audit" | "voice-agent" | "";

const inputClass =
    "bg-white/[0.04] border border-white/[0.08] text-white font-inter text-[14px] px-4 py-3.5 outline-none focus:border-[#D4AF37]/40 transition-all duration-200 placeholder:text-white/20 focus:bg-white/[0.07] w-full";

const selectClass =
    "bg-[#111] border border-white/[0.08] text-white font-inter text-[14px] px-4 py-3.5 outline-none focus:border-[#D4AF37]/40 transition-all duration-200 appearance-none focus:bg-[#181818] w-full";

const labelClass =
    "font-montserrat text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40";

const textareaClass =
    "bg-white/[0.04] border border-white/[0.08] text-white font-inter text-[14px] px-4 py-3.5 outline-none focus:border-[#D4AF37]/40 transition-all duration-200 placeholder:text-white/20 resize-y min-h-[100px] focus:bg-white/[0.07] w-full";

function Field({
    label,
    note,
    children,
    fullWidth = false,
}: {
    label: string;
    note?: string;
    children: React.ReactNode;
    fullWidth?: boolean;
}) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`flex flex-col gap-2 ${fullWidth ? "col-span-1 md:col-span-2" : ""}`}
        >
            <label className={labelClass}>
                {label}
                {note && (
                    <span className="ml-2 normal-case tracking-normal text-white/25 font-inter text-[10px] not-italic">
                        — {note}
                    </span>
                )}
            </label>
            {children}
        </motion.div>
    );
}

export default function IntakeForm() {
    const [service, setService] = useState<Service>("");

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.04, delayChildren: 0.05 },
        },
    };

    return (
        <form onSubmit={(e) => e.preventDefault()} className="w-full">
            {/* ── Service Selector ── */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-10 flex flex-col gap-2"
            >
                <label className={labelClass}>Select Service *</label>
                <select
                    value={service}
                    onChange={(e) => setService(e.target.value as Service)}
                    className={selectClass}
                    required
                >
                    <option value="" disabled>
                        Choose your service
                    </option>
                    <option value="digital-audit">Sovereign X Digital Audit</option>
                    <option value="image-audit">Sovereign X Image Audit</option>
                    <option value="voice-agent">Sovereign X Voice Agent</option>
                </select>
            </motion.div>

            <AnimatePresence mode="wait">
                {service && (
                    <motion.div
                        key="fields"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >
                        {/* ══════════════════════════════════════
                            UNIVERSAL FIELDS — shown for every service
                        ══════════════════════════════════════ */}
                        <Field label="Full Name *">
                            <input
                                type="text"
                                name="full_name"
                                placeholder="Your full name"
                                required
                                className={inputClass}
                            />
                        </Field>

                        <Field label="Email Address *">
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                required
                                className={inputClass}
                            />
                        </Field>

                        <Field label="Phone / WhatsApp">
                            <input
                                type="tel"
                                name="phone"
                                placeholder="+1 (555) 000-0000"
                                className={inputClass}
                            />
                        </Field>

                        <Field label="How did you hear about us?">
                            <select name="referral_source" className={selectClass}>
                                <option value="">Select one</option>
                                <option value="instagram">Instagram</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="tiktok">TikTok</option>
                                <option value="referral">Referral</option>
                                <option value="google">Google / Search</option>
                                <option value="podcast">Podcast</option>
                                <option value="other">Other</option>
                            </select>
                        </Field>

                        {/* ══════════════════════════════════════
                            DIGITAL AUDIT FIELDS
                        ══════════════════════════════════════ */}
                        {service === "digital-audit" && (
                            <>
                                <Field label="Business Name *">
                                    <input
                                        type="text"
                                        name="business_name"
                                        placeholder="Your business name"
                                        required
                                        className={inputClass}
                                    />
                                </Field>

                                <Field label="Website URL *">
                                    <input
                                        type="url"
                                        name="website_url"
                                        placeholder="https://yourbusiness.com"
                                        required
                                        className={inputClass}
                                    />
                                </Field>

                                <Field label="Industry / Type *">
                                    <input
                                        type="text"
                                        name="industry"
                                        placeholder="e.g. Real Estate, Medical, Tech"
                                        required
                                        className={inputClass}
                                    />
                                </Field>

                                <Field label="City and State *">
                                    <input
                                        type="text"
                                        name="city_state"
                                        placeholder="e.g. New York, NY"
                                        required
                                        className={inputClass}
                                    />
                                </Field>

                                <Field label="Number of Locations">
                                    <input
                                        type="number"
                                        name="num_locations"
                                        placeholder="e.g. 1"
                                        min={1}
                                        className={inputClass}
                                    />
                                </Field>

                                <Field label="Considering AI Implementation?">
                                    <select name="ai_interest" className={selectClass}>
                                        <option value="">Select one</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                        <option value="maybe">Maybe</option>
                                    </select>
                                </Field>

                                <Field label="Biggest Current Challenge *" fullWidth>
                                    <textarea
                                        name="challenge"
                                        placeholder="Describe your most pressing structural or digital issue."
                                        required
                                        className={textareaClass}
                                    />
                                </Field>

                                <Field label="Social Handles" fullWidth>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <input
                                            type="text"
                                            name="instagram"
                                            placeholder="@Instagram"
                                            className={inputClass}
                                        />
                                        <input
                                            type="text"
                                            name="linkedin"
                                            placeholder="LinkedIn URL"
                                            className={inputClass}
                                        />
                                        <input
                                            type="text"
                                            name="facebook"
                                            placeholder="@Facebook"
                                            className={inputClass}
                                        />
                                    </div>
                                </Field>

                                <Field label="Additional Notes or Goals" fullWidth>
                                    <textarea
                                        name="additional_notes"
                                        placeholder="Anything else we should know about your goals or situation."
                                        className={textareaClass}
                                    />
                                </Field>
                            </>
                        )}

                        {/* ══════════════════════════════════════
                            IMAGE AUDIT FIELDS
                        ══════════════════════════════════════ */}
                        {service === "image-audit" && (
                            <>
                                <Field label="Gender *">
                                    <select name="gender" required className={selectClass}>
                                        <option value="">Select one</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="nonbinary">Non-binary</option>
                                        <option value="prefer-not">Prefer not to say</option>
                                    </select>
                                </Field>

                                <Field label="Age Range *">
                                    <select name="age_range" required className={selectClass}>
                                        <option value="">Select range</option>
                                        <option value="18-24">18 – 24</option>
                                        <option value="25-34">25 – 34</option>
                                        <option value="35-44">35 – 44</option>
                                        <option value="45-54">45 – 54</option>
                                        <option value="55+">55+</option>
                                    </select>
                                </Field>

                                <Field
                                    label="Height *"
                                    note="needed for body type analysis"
                                >
                                    <input
                                        type="text"
                                        name="height"
                                        placeholder="e.g. 5ft 10in or 178 cm"
                                        required
                                        className={inputClass}
                                    />
                                </Field>

                                <Field
                                    label="Weight *"
                                    note="needed for body type analysis"
                                >
                                    <input
                                        type="text"
                                        name="weight"
                                        placeholder="e.g. 180 lbs or 82 kg"
                                        required
                                        className={inputClass}
                                    />
                                </Field>

                                <Field label="Industry / Field *">
                                    <input
                                        type="text"
                                        name="industry"
                                        placeholder="e.g. Finance, Entertainment, Law"
                                        required
                                        className={inputClass}
                                    />
                                </Field>

                                <Field label="Interested in Photography Session?">
                                    <select name="photo_session" className={selectClass}>
                                        <option value="">Select one</option>
                                        <option value="yes">Yes</option>
                                        <option value="possibly">Possibly</option>
                                        <option value="no">No</option>
                                    </select>
                                </Field>

                                <Field label="Interested in Wardrobe Blueprint?">
                                    <select name="wardrobe_blueprint" className={selectClass}>
                                        <option value="">Select one</option>
                                        <option value="yes">Yes</option>
                                        <option value="possibly">Possibly</option>
                                        <option value="no">No</option>
                                    </select>
                                </Field>

                                <Field label="Upcoming Events or Shoots?">
                                    <input
                                        type="text"
                                        name="upcoming_events"
                                        placeholder="e.g. Speaking event in July, headshot session"
                                        className={inputClass}
                                    />
                                </Field>

                                <Field label="Social Handles" fullWidth>
                                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                        <input
                                            type="text"
                                            name="instagram"
                                            placeholder="@Instagram"
                                            className={inputClass}
                                        />
                                        <input
                                            type="text"
                                            name="tiktok"
                                            placeholder="@TikTok"
                                            className={inputClass}
                                        />
                                        <input
                                            type="text"
                                            name="linkedin"
                                            placeholder="LinkedIn URL"
                                            className={inputClass}
                                        />
                                        <input
                                            type="text"
                                            name="youtube"
                                            placeholder="YouTube"
                                            className={inputClass}
                                        />
                                        <input
                                            type="text"
                                            name="x_twitter"
                                            placeholder="@X / Twitter"
                                            className={inputClass}
                                        />
                                    </div>
                                </Field>

                                <Field
                                    label="What do you want your image to communicate? *"
                                    fullWidth
                                >
                                    <textarea
                                        name="image_goal"
                                        placeholder="e.g. Authority, approachability, luxury, credibility…"
                                        required
                                        className={textareaClass}
                                    />
                                </Field>

                                <Field label="Biggest Current Image Concerns *" fullWidth>
                                    <textarea
                                        name="image_concerns"
                                        placeholder="What do you feel is holding your image back right now?"
                                        required
                                        className={textareaClass}
                                    />
                                </Field>

                                <Field
                                    label="Style Inspiration — Who do you admire?"
                                    fullWidth
                                >
                                    <input
                                        type="text"
                                        name="style_inspiration"
                                        placeholder="Names, brands, or aesthetics you gravitate toward"
                                        className={inputClass}
                                    />
                                </Field>

                                {/* ── Image Audit Disclaimer ── */}
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="col-span-1 md:col-span-2 border border-[#D4AF37]/30 bg-[#D4AF37]/[0.04] px-6 py-5"
                                >
                                    <p className="font-montserrat text-[9px] font-black tracking-[0.3em] uppercase text-[#D4AF37]/80 mb-3">
                                        Submission Requirements
                                    </p>
                                    <p className="font-inter text-[13px] text-white/50 leading-[1.75]">
                                        After payment you will receive a Google Drive upload link.{" "}
                                        <span className="text-white/70">Required:</span> full body front, full body side, face
                                        close-up in natural light, 3 outfit photos. For Instagram and TikTok submit 6–10 feed
                                        screenshots. Color analysis requires natural light close-up. Body type analysis requires
                                        accurate height and weight. Sections without complete data are marked directional.
                                    </p>
                                </motion.div>
                            </>
                        )}

                        {/* ══════════════════════════════════════
                            VOICE AGENT FIELDS
                        ══════════════════════════════════════ */}
                        {service === "voice-agent" && (
                            <>
                                <Field label="Business Name *">
                                    <input
                                        type="text"
                                        name="business_name"
                                        placeholder="Your business name"
                                        required
                                        className={inputClass}
                                    />
                                </Field>

                                <Field label="Website URL">
                                    <input
                                        type="url"
                                        name="website_url"
                                        placeholder="https://yourbusiness.com"
                                        className={inputClass}
                                    />
                                </Field>

                                <Field label="Industry *">
                                    <input
                                        type="text"
                                        name="industry"
                                        placeholder="e.g. Medical Clinic, Law Firm, Real Estate"
                                        required
                                        className={inputClass}
                                    />
                                </Field>

                                <Field label="Monthly Call Volume (approximate)">
                                    <input
                                        type="text"
                                        name="call_volume"
                                        placeholder="e.g. 50–100 calls/month"
                                        className={inputClass}
                                    />
                                </Field>

                                <Field label="Do calls go to voicemail after hours?">
                                    <select name="voicemail" className={selectClass}>
                                        <option value="">Select one</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                        <option value="not-sure">Not sure</option>
                                    </select>
                                </Field>

                                <Field label="Online Booking System?">
                                    <select name="online_booking" className={selectClass}>
                                        <option value="">Select one</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </Field>

                                <Field label="Average Transaction Value ($)">
                                    <input
                                        type="text"
                                        name="avg_transaction"
                                        placeholder="e.g. $500, $2,000"
                                        className={inputClass}
                                    />
                                </Field>

                                <Field
                                    label="Notes on Current Phone Intake Challenges"
                                    fullWidth
                                >
                                    <textarea
                                        name="phone_challenges"
                                        placeholder="Describe pain points with your current inbound call process."
                                        className={textareaClass}
                                    />
                                </Field>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Submit ── */}
            {service && (
                <div className="mt-12 flex flex-col items-center gap-6">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        whileHover={{ scale: 1.05, backgroundColor: "#004080" }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="font-montserrat text-[12px] font-bold tracking-[0.25em] uppercase text-white bg-navy border border-navy px-16 py-[20px] transition-all duration-300 shadow-[0_0_30px_rgba(0,102,255,0.15)] hover:shadow-[0_0_40px_rgba(0,102,255,0.4)]"
                    >
                        Submit for Review
                    </motion.button>
                    <p className="font-inter text-[13px] text-white/30 max-w-[400px] leading-relaxed text-center">
                        Submissions reviewed within 48 hours. Not all applicants proceed to examination.
                    </p>
                </div>
            )}
        </form>
    );
}

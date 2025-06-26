"use client"
import React, { useState } from "react";
import { FileText, Laptop, X } from "lucide-react";
import { Listbox } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';
import { motion } from "framer-motion";

const jobs = [
    {
        category: "Content",
        icon: FileText,
        positions: [
            {
                title: "Content Writer",
                level: "Junior",
                location: "XYZ",
                type: "Full Time",
                link: "#",
                aboutCompany: `About Leverage Edu\n\nAt Leverage Edu, we are democratising access to global opportunities for students everywhere. By helping students make the right career choices with the aid of information and pathways that they can trust, we are opening doors to opportunities they could not access without the right guidance and support. Making sense of the complex web of courses, colleges, careers, and geographies is a tough task – by leveraging technology but connecting with students at a personal level, we help them maximise their potential.\n\nTo build towards this goal, we are looking for people with the ambition and hustle to make the world a smaller place and get people closer to their dream opportunities. We are building at a breakneck speed in one of the fastest-growing industries in the world, and the opportunities for growth are limitless.\n\nOur Virtues: https://leverageedu.com/blog/the-leverage-edu-virtues/`,
                aboutRole: `About the Role\n\nWe are looking for Content Writers who possess a flair for writing across different formats of content, both for conventional media and social media platforms. You'll work closely with top B-school graduates, ex-McKinsey, BCG, Deloitte, EY, Byju, Paytm employees to establish, nurture, and grow business across categories & territories. This is an` // (truncated for brevity)
            },
        ],
    },
    {
        category: "Engineering",
        icon: Laptop,
        positions: [
            {
                title: "Full Stack Developer",
                level: "Junior/Mid",
                location: "Noida",
                type: "Full Time",
                link: "#",
                aboutCompany: "About the Engineering Team...",
                aboutRole: "Role details for Full Stack Developer..."
            },
            {
                title: "Associate Product Manager",
                level: "Senior/Mid",
                location: "XYZ",
                type: "Full Time",
                link: "#",
                aboutCompany: "About the Engineering Team...",
                aboutRole: "Role details for Associate Product Manager..."
            }
        ],
    },
    {
        category: "Sales",
        icon: Laptop,
        positions: [
            {
                title: "Business Development Associate",
                level: "Junior/Mid",
                location: "XYZ",
                type: "Part Time",
                link: "#",
                aboutCompany: "",
                aboutRole: "Role details for Business Development Associate..."
            },
        ],
    }
];

// Collect unique job types and locations from all positions
const jobTypes = Array.from(new Set(jobs.flatMap(job => job.positions.map(pos => pos.type))));
const locations = Array.from(new Set(jobs.flatMap(job => job.positions.map(pos => pos.location))));

type FormFields = {
    resume: File | null;
    name: string;
    email: string;
    phone: string;
    currentLocation: string;
    currentCTC: string;
    linkedin: string;
    github: string;
};

const initialForm: FormFields = {
    resume: null,
    name: "",
    email: "",
    phone: "",
    currentLocation: "",
    currentCTC: "",
    linkedin: "",
    github: "",
};

export default function CareerPage() {
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [selectedLocation, setSelectedLocation] = useState("All Locations");
    const [selectedType, setSelectedType] = useState("All Job Types");
    const [modal, setModal] = useState<{ job: any, position: any } | null>(null);
    const [formModal, setFormModal] = useState<{ job: any, position: any } | null>(null);
    const [form, setForm] = useState<FormFields>(initialForm);
    const [formTouched, setFormTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Filtering logic
    const filteredJobs = jobs
        .filter(job => selectedCategory === "All Categories" || job.category === selectedCategory)
        .map(job => ({
            ...job,
            positions: job.positions.filter(pos =>
                (selectedLocation === "All Locations" || pos.location === selectedLocation) &&
                (selectedType === "All Job Types" || pos.type === selectedType)
            )
        }))
        .filter(job => job.positions.length > 0);

    // Custom select component for modern look
    function CustomSelect({ value, onChange, options }: { value: string, onChange: (v: string) => void, options: string[] }) {
        return (
            <Listbox value={value} onChange={onChange}>
                {({ open }) => (
                    <div className="relative w-full sm:w-64">
                        <Listbox.Button
                            className={`relative w-full cursor-pointer rounded-2xl bg-white py-3 px-6 pr-12 text-lg font-semibold text-gray-800 shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[oklch(84.5%_.18_83.6)] transition-all flex items-center justify-between ${open ? 'ring-2 ring-[oklch(84.5%_.18_83.6)] border-[oklch(84.5%_.18_83.6)]' : ''}`}
                        >
                            <span>{value}</span>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" />
                        </Listbox.Button>
                        <Listbox.Options className="absolute z-10  w-full rounded-2xl bg-white shadow-xl border border-gray-200 py-1 text-lg font-semibold text-gray-800 focus:outline-none">

                            {options.map((opt) => (
                                <Listbox.Option
                                    key={opt}
                                    value={opt}
                                    className={({ active, selected }) =>
                                        `cursor-pointer select-none relative flex items-center gap-2 px-6 py-3 transition-all
                                        ${active ? 'bg-[oklch(96%_.04_83.6)] text-black' : ''}
                                        ${selected ? 'font-bold text-[oklch(84.5%_.18_83.6)]' : ''}`
                                    }
                                >
                                    {({ selected }) => (
                                        <>
                                            {selected && <Check className="w-5 h-5 text-[oklch(84.5%_.18_83.6)]" />}
                                            <span className="block flex-1">{opt}</span>
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </div>
                )}
            </Listbox>
        );
    }

    // Form validation
    const requiredFields: (keyof FormFields)[] = ["resume", "name", "email", "phone", "currentLocation", "currentCTC"];
    const isFieldInvalid = (field: keyof FormFields) =>
        (formTouched[field] || formSubmitted) && (!form[field] || (field === "resume" && !form.resume));

    function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, files } = e.target;
        setForm(f => ({
            ...f,
            [name]: files ? files[0] : value,
        }));
        setFormTouched(t => ({ ...t, [name]: true }));
    }

    function handleFormSubmit(e: React.FormEvent) {
        e.preventDefault();
        setFormSubmitted(true);
        // If any required field is missing, do not submit
        if (requiredFields.some(f => !form[f])) return;
        // Submit logic here (e.g., API call)
        setFormModal(null);
        setForm(initialForm);
        setFormTouched({});
        setFormSubmitted(false);
        alert("Application submitted!");
    }

    return (
        <div className="min-h-screen">
            {/* Application Form Modal */}
            {formModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            onClick={() => setFormModal(null)}
                            aria-label="Close"
                        >
                            <X size={28} />
                        </button>
                        <div className="text-center mb-6">
                            <div className="text-2xl font-bold text-[oklch(84.5%_.18_83.6)]">{formModal.position.title}</div>
                            <div className="text-gray-500 text-lg mb-2">{formModal.job.category}</div>
                            <div className="flex justify-center gap-8 mb-6">
                                <span className="font-semibold">{formModal.position.level}</span>
                                <span className="font-semibold">{formModal.position.location}</span>
                                <span className="font-semibold">{formModal.position.type}</span>
                            </div>
                        </div>
                        <form className="bg-gray-50 rounded-xl p-8" onSubmit={handleFormSubmit}>
                            <h2 className="text-2xl font-bold text-center mb-6">Apply for the role</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1">Resume</label>
                                    <input
                                        type="file"
                                        name="resume"
                                        accept=".pdf,.doc,.docx"
                                        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-[oklch(84.5%_.18_83.6)]"
                                        onChange={handleFormChange}
                                    />
                                    {isFieldInvalid("resume") && <div className="text-red-500 text-sm mt-1">Resume is required</div>}
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-[oklch(84.5%_.18_83.6)]"
                                        value={form.name}
                                        onChange={handleFormChange}
                                    />
                                    {isFieldInvalid("name") && <div className="text-red-500 text-sm mt-1">This field is required</div>}
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">E-mail address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-[oklch(84.5%_.18_83.6)]"
                                        value={form.email}
                                        onChange={handleFormChange}
                                    />
                                    {isFieldInvalid("email") && <div className="text-red-500 text-sm mt-1">This field is required</div>}
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Phone number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-[oklch(84.5%_.18_83.6)]"
                                        value={form.phone}
                                        onChange={handleFormChange}
                                    />
                                    {isFieldInvalid("phone") && <div className="text-red-500 text-sm mt-1">This field is required</div>}
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Current Location</label>
                                    <input
                                        type="text"
                                        name="currentLocation"
                                        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-[oklch(84.5%_.18_83.6)]"
                                        value={form.currentLocation}
                                        onChange={handleFormChange}
                                    />
                                    {isFieldInvalid("currentLocation") && <div className="text-red-500 text-sm mt-1">This field is required</div>}
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Current CTC</label>
                                    <input
                                        type="text"
                                        name="currentCTC"
                                        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-[oklch(84.5%_.18_83.6)]"
                                        value={form.currentCTC}
                                        onChange={handleFormChange}
                                    />
                                    {isFieldInvalid("currentCTC") && <div className="text-red-500 text-sm mt-1">This field is required</div>}
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">LinkedIn link (Optional)</label>
                                    <input
                                        type="url"
                                        name="linkedin"
                                        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-[oklch(84.5%_.18_83.6)]"
                                        value={form.linkedin}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Github link (Optional)</label>
                                    <input
                                        type="url"
                                        name="github"
                                        className="w-full border rounded px-4 py-2 focus:outline-none focus:border-[oklch(84.5%_.18_83.6)]"
                                        value={form.github}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="mt-6 bg-[oklch(84.5%_.18_83.6)] text-black font-bold py-2 px-6 rounded hover:bg-[oklch(90.5%_.18_83.6)] transition"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Job Details Modal */}
            {modal && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            onClick={() => setModal(null)}
                            aria-label="Close"
                        >
                            <X size={28} />
                        </button>
                        <div className="text-center mb-2">
                            <div className="text-2xl font-bold text-[oklch(84.5%_.18_83.6)]">{modal.position.title}</div>
                            <div className="text-gray-500 text-lg mb-4">{modal.job.category}</div>
                            <div className="flex justify-center gap-8 mb-6">
                                <span className="font-semibold">{modal.position.level}</span>
                                <span className="font-semibold">{modal.position.location}</span>
                                <span className="font-semibold">{modal.position.type}</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="font-semibold text-lg mb-1">About Leverage Edu</div>
                            <div className="text-gray-700 whitespace-pre-line text-base">{modal.position.aboutCompany}</div>
                        </div>
                        <div>
                            <div className="font-semibold text-lg mb-1">About the Role</div>
                            <div className="text-gray-700 whitespace-pre-line text-base">{modal.position.aboutRole}</div>
                        </div>
                        <div className="flex justify-center py-5">
                            <button
                                className="mt-4 sm:mt-0 inline-block bg-[oklch(84.5%_.18_83.6)]  px-6 py-2 rounded font-semibold hover:bg-[oklch(90.5%_.18_83.6)] transition text-black"
                                onClick={() => {
                                    setFormModal(modal);
                                    setModal(null);
                                }}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Header */}
            <div className="bg-white py-12">
                <h1 className="text-3xl font-bold text-center mb-8">Join Our Team</h1>
                <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-3xl mx-auto mb-8 px-2">
                    <CustomSelect
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        options={["All Categories", ...jobs.map(j => j.category)]}
                    />
                    <CustomSelect
                        value={selectedLocation}
                        onChange={setSelectedLocation}
                        options={["All Locations", ...locations]}
                    />
                    <CustomSelect
                        value={selectedType}
                        onChange={setSelectedType}
                        options={["All Job Types", ...jobTypes]}
                    />
                </div>
            </div>
            {/* Job Listings */}
            <div className="max-w-4xl mx-auto">
                {filteredJobs.length === 0 && (
                    <div className="text-center text-gray-400 py-12 text-xl">No jobs found for selected filters.</div>
                )}
                {filteredJobs.map((job) => {
                    const Icon = job.icon;
                    return (
                        <div key={job.category} className="mb-10 ">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white">
                                    <Icon className="w-10 h-10 text-[oklch(84.5%_.18_83.6)] " />
                                </div>
                                <h2 className="text-2xl font-bold">{job.category}</h2>
                            </div>
                            {job.positions.length > 0 ? (
                                <>
                                    {job.positions.map((position, idx) => (
                                        <motion.div
                                            key={position.title + idx}
                                            className="bg-white rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between px-6 py-6 mb-4"
                                            whileHover={{ scale: 1.00, y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        >
                                            <div className="flex flex-col py-5 sm:flex-row sm:items-center gap-2 sm:gap-8 w-full">
                                                <span className="text-[oklch(84.5%_.18_83.6)]  font-bold cursor-pointer hover:underline text-2xl">{position.title}</span>
                                                <span className="text-gray-600 font-semibold">{position.level}</span>
                                                <span className="text-gray-600 font-semibold">{position.location}</span>
                                                <span className="text-gray-600 font-semibold">{position.type}</span>
                                            </div>
                                            <button
                                                className="mt-4 sm:mt-0 inline-block bg-[oklch(84.5%_.18_83.6)]  px-6 py-2 rounded font-semibold hover:bg-[oklch(90.5%_.18_83.6)] transition text-black"
                                                onClick={() => setModal({ job, position })}
                                            >
                                                Apply
                                            </button>
                                        </motion.div>
                                    ))}
                                </>
                            ) : (
                                <div className="bg-white rounded-lg shadow-sm px-6 py-4 text-gray-400">No openings currently.</div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
} 
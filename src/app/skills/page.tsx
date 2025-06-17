'use client';

import React, { useEffect, useState } from "react";
import NavigationMenu from "@/app/components/NavigationMenu";
import Dots from "@/app/components/Dots";

interface Category {
    name: string;
    id: number;
}

interface Skill {
    name: string;
    label: string;
    description: string;
    icon: string;
    category_id: number;
}


export default function Skills() {
    const [skills, setskills] = useState<Skill[] | null>(null);
    const [categories, setCategories] = useState<Category[] | null>(null);

    useEffect(() => {
        const fetchSkills = async () => {
            const response = await fetch("api/skills", { cache: "no-store" });
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setskills(data.skills);
            setCategories(data.categories);
        };

        fetchSkills();
    }, []);

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-8 overflow-hidden p-10">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-[#4c09325c] to-black animate-bgMove z-0"></div>
            <h1 className="text-3xl font-bold tracking-wide uppercase z-10">
                Skills & Erfahrung
            </h1>

            <div className="mt-12 space-y-8 w-full max-w-4xl z-50 text-center">
                {categories && categories.map((category, index) => (
                    <div
                        key={index}
                    >
                        <h2 className="text-2xl font-bold mb-4 z-50">{category.name}</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                            {skills?.filter(skill => skill.category_id === category.id).map((skill, index) => (
                                <div key={index} className="tile w-full p-4 border-l-4 border-pink-500 bg-[#0d0d0d] rounded-lg shadow-lg transition-transform duration-300 flex flex-col items-center">
                                    <div className="tile-inner relative w-full h-full transform-style-preserve-3d text- bg-[#0d0d0d]">
                                        <div className="tile-front bg-gray-800 text-white p-4 rounded-lg shadow-lg flex items-center justify-center h-full flex-col">
                                            <div className="flex justify-center items-center w-full h-24 sm:h-32">
                                                <div className="text-pink-500 font-mono text-xl sm:text-3xl text-center">
                                                    {skill.icon}
                                                </div>
                                            </div>

                                            <div className="text-lg font-semibold m-2">
                                                {skill.label}
                                            </div>
                                        </div>
                                        <div className="tile-back absolute tile-back inset-0 bg-[#222] text-xs font-semibold transform rotateY-18 0bg-gray-700 text-white p-4 rounded-lg shadow-lg flex items-center justify-center h-full space-y-2">
                                            {skill.description}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes bgMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-bgMove {
                    background-size: 200% 200%;
                    animation: bgMove 10s infinite alternate ease-in-out;
                }
                .perspective-1000 {
                    perspective: 1000px;
                }
                .tile {
                    position: relative;
                    transform-style: preserve-3d;
                    transition: transform 0.6s;
                }
                .tile:hover {
                    transform: rotateY(180deg);
                }
                .tile-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    transform-style: preserve-3d;
                }
                .tile-back {
                    backface-visibility: hidden;
                    transform: rotateY(180deg);
                }
            `}</style>

            <Dots numberOfDots={20} />
            <NavigationMenu />
        </div>
    );
}
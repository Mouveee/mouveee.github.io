'use client'

import { useState, useEffect } from "react";
import { CirclePlus, Check } from "lucide-react";
import { signOut } from "next-auth/react"
import { ToastContainer, toast } from "react-toastify"

interface Category {
    id: number;
    name: string;
}

interface Skill {
    id: number;
    label: string;
    key: string;
    category_id: number;
    description: string;
    icon: string;
    modified: boolean;
}

interface Update {
    skills: Skill[];
    categories: Category[];
}


export default function AdminClient() {
    const [categories, setCategories] = useState<Category[] | []>([])
    const [skills, setSkills] = useState<Skill[] | []>([]);

    useEffect(() => {
        const fetchSkills = async () => {
            const newSkills: Skill[] = [];
            const newCategories: Category[] = [];

            const response = await fetch("api/skills", { cache: "no-store" });
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();

            data.categories.forEach((category: Category) => {
                const cat = {
                    name: category.name,
                    id: category.id,
                }

                newCategories.push(cat);

            });

            data.skills.map((skill: Skill) => {
                const newSkill = {
                    id: skill.id,
                    label: skill.label,
                    key: skill.key,
                    category_id: skill.category_id,
                    description: skill.description,
                    icon: skill.icon,
                    modified: false,
                }

                newSkills.push(newSkill);
            })

            setCategories(newCategories);
            setSkills(newSkills);
        };

        fetchSkills();
    }, []);

    const updateSkill = (skillId: number, field: string, value: string) => {
        setSkills(prevSkills =>
            prevSkills.map(skill =>
                skill.id === skillId
                    ? { ...skill, [field]: value, modified: true }
                    : skill
            )
        );
    };

    const postData = (data: Update) => {
        fetch("api/skills", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to save data");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Data saved successfully:", JSON.stringify(data, null, 2));
                toast('Succes')
            })
            .catch((error) => {
                toast('Something went wrong')
                console.error("Error saving data:", error);
            });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        postData({ skills: skills, categories: categories })
    };


    return (
        <div className="relative flex flex-col items-start justify-rcente px-8 overflow-hidden p-10">
            <button onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button>
            <button onClick={() => toast("This is a test toast!")}>Show Toast</button>
            <form
                className="relative flex flex-col items-start justify-center px-8 overflow-hidden p-10"
                onSubmit={handleSubmit}
            >
                {
                    categories?.map((category, index) => (
                        <div key={index} className="mb-4">
                            <h2 className="mb-4 font-semibold">Category:</h2>

                            <input
                                key={index}
                                className="mb-4"
                                type="text"
                                name={category.name}
                                value={category.name}
                                placeholder="Category Name"
                                onChange={(e) => {
                                    const updatedCategories = [...categories!];
                                    updatedCategories[index].name = e.target.value;
                                    setCategories(updatedCategories);
                                }}
                            />

                            <h2 className="mb-4 font-semibold">Skills:</h2>

                            <div className="m4 flex flex-row w-full flex-wrap gap-4">
                                {
                                    skills?.filter(skill => skill.category_id === category.id).map((skill, skillIndex) => (
                                        <div key={skillIndex} className="mb-6 flex flex-col w-full">
                                            <input
                                                type="text"
                                                className="mb-4"
                                                value={skill.label}
                                                onChange={(e) => updateSkill(skill.id, 'label', e.target.value)}
                                            />

                                            <textarea
                                                className="mb-4 h-fit"
                                                value={skill.description}
                                                onChange={(e) => updateSkill(skill.id, 'description', e.target.value)}
                                            />

                                            <input
                                                type="text"
                                                className="mb-4"
                                                value={skill.icon}
                                                onChange={(e) => updateSkill(skill.id, 'icon', e.target.value)}
                                            />

                                            {skill.modified ? <Check
                                                onClick={() => {
                                                    const updatedSkills = [...skills!];
                                                    updatedSkills[skillIndex].modified = true;
                                                    setSkills(updatedSkills);
                                                    postData({ skills: [skill], categories: [] });
                                                }
                                                }></Check> : null}

                                        </div>
                                    ))
                                }

                                <CirclePlus className="cursor-pointer" onClick={() => {
                                    alert('in progress')
                                }} />
                            </div>
                        </div>
                    ))
                }
                <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded">Save</button>
            </form >
            <ToastContainer></ToastContainer>
        </div >
    )
}

'use client';

import React from "react";
import NavigationMenu from "@/app/components/NavigationMenu";

interface ASCIIAnimation {
    [key: string]: string[];
}

interface Category {
    title: string;
    interests: { key: string; label: string }[];
}

export default function About() {
    const asciiAnimations: ASCIIAnimation = {
        murakami: [
            "    (o)     (o)   ",
            "     |       |    ",
            "    /|\\_____/|\\  ",
            "   / |       | \\ ",
            "  /  |  ---  |  \\",
            "    / |     | \\  "
        ],
        gatsby: [
            "    .     *",
            "  *    o    *",
            "      /\    ",
            "   * /  \\ *  ",
            "     ||     ",
            "   __||__    "
        ],
        twinPeaks: [
            "   ,___,    ",
            "  [o,o]     ",
            "  |)  (|     ",
            '  --"--"--   ',
            "   /   \\    ",
            "  /     \\   "
        ],
        zelda: [
            "        /\\        ",
            "       /  \\       ",
            "      /____\\      ",
            "     /\\    /\\     ",
            "    /  \\  /  \\    ",
            "   /____\\/____\\   "
        ]
        ,
        junjiIto: [
            "   .-.      ",
            "  (O O)     ",
            "  | O |     ",
            "  |   |     ",
            "  |   |     ",
            "   `-'      "
        ],
        jpegmafia: [
            "  ||  ",
            " |||| ",
            "  ||  ",
            "  ||  ",
            "  ||  ",
            "  ||  "
        ],
        radiohead: [
            "     ___     ",
            "    /   \\    ",
            "   | O O |   ",
            "    \\_^_/    ",
            "     | |     ",
            "    /   \\    "
        ],
        sufjan: [
            "    /\\    /\\    ",
            "   /  \\  /  \\   ",
            "  /    \\/    \\  ",
            "  \\          /  ",
            "   \\        /   ",
            "    \\      /    "
        ],
        flyingLotus: [
            "    ^    ^    ",
            "   / \\  / \\   ",
            "  /   \\/   \\  ",
            " /    /\    \\ ",
            " \\   /  \\   / ",
            "  \\ /    \\ /  "
        ],
        kateBush: [
            "     .--.      ",
            "  .-(    ).    ",
            " (        )   ",
            "  `-.____.-'   ",
            "    / // /      ",
            "     // / /      "
        ],
        movieNerd: [
            "   ________   ",
            "  /        \\  ",
            " |  [o] [o] | ",
            " |    ||    | ",
            "  \\________/  ",
            "    |    |    "
        ],
        ableton: [
            "  |----|----|----|----|  ",
            "  |    |    |    |    |  ",
            "  |----|----|----|----|  ",
            "  |    |    |    |    |  ",
            "  |----|----|----|----|  ",
            "  |    |    |    |    |  "
        ],
        totoro: [
            "⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⡆⠀⠀⢀⣶⠀⠀⠀",
            "⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣇⣀⣀⣼⣿⠆⠀⠀",
            " ⠀⠀⠀⠀⠀⠀⠀⣠⡟⡝⣿⣿⣿⠿⢯⠀⠀⠀",
            "⣀⠀⢀⣆⠀⠀⣰⣿⣷⣶⣿⣿⣿⣭⣼⣇⠀⠀",
            "⢹⣷⣼⡿⡄⢰⣿⠟⣁⠀⣀⠈⠙⣿⣿⣿⣀⠀",
            "⢸⣦⣿⣷⣷⠈⡏⠈⠉⠈⠉⠈⠓⢿⣿⣿⣿⡇",
        ]
    };

    // Dummy text for each category
    const dummyTexts: { [key: string]: string } = {
        murakami: "Haruki Murakami is a master of magical realism, blending surreal elements with everyday life.",
        gatsby: "The Great Gatsby explores themes of wealth, love, and the American Dream in the Jazz Age.",
        twinPeaks: "Twin Peaks is a mind-bending TV show, mixing crime drama with surrealist elements.",
        zelda: "The Legend of Zelda is a beloved action-adventure series renowned for its immersive world, intricate puzzles, and epic quests. Its blend of exploration, combat, and rich storytelling has made it a cornerstone of gaming history.",
        junjiIto: "Junji Ito's horror stories often involve grotesque body horror and twisted psychological elements.",
        jpegmafia: "JPEGMAFIA is an experimental rapper and producer known for his eclectic style and biting social commentary.",
        radiohead: "Radiohead is a British rock band that revolutionized modern music with their experimental approach.",
        sufjan: "Sufjan Stevens blends indie rock with classical and folk influences in his heartfelt, often spiritual music.",
        flyingLotus: "Flying Lotus is an electronic music producer known for his genre-defying blend of hip-hop, jazz, and experimental sounds.",
        kateBush: "Kate Bush is an iconic British singer-songwriter known for her ethereal voice and innovative music.",
        movieNerd: "Film nerds are passionate about exploring every detail of a movie's history, techniques, and impact.",
        ableton: "Ableton Live is a popular music production software used by artists to create electronic music.",
        totoro: "Totoro is a beloved character from Studio Ghibli's animated film 'My Neighbor Totoro,' symbolizing childhood innocence."
    };

    const categories: Category[] = [
        {
            title: "Literature",
            interests: [
                {
                    key: "murakami",
                    label: "Haruki Murakami"
                },
                {
                    key: "gatsby",
                    label: "The Great Gatsby"
                }
            ]
        },
        {
            title: "Film & TV",
            interests: [
                {
                    key: "twinPeaks",
                    label: "Twin Peaks"
                },
                {
                    key: "totoro",
                    label: "Studio Ghibli"
                }
            ]
        },
        {
            title: "Music",
            interests: [
                {
                    key: "jpegmafia",
                    label: "JPEGMAFIA"
                },
                {
                    key: "radiohead",
                    label: "Radiohead"
                },
                {
                    key: "sufjan",
                    label: "Sufjan Stevens"
                },
                {
                    key: "flyingLotus",
                    label: "Flying Lotus"
                },
                {
                    key: "kateBush",
                    label: "Kate Bush"
                }
            ]
        },
        {
            title: "Games & Art",
            interests: [
                {
                    key: "ableton",
                    label: "Ableton Live"
                },
                {
                    key: "zelda",
                    label: "Zelda Series"
                },
                {
                    key: "junjiIto",
                    label: "Junji Ito"
                },
                {
                    key: "movieNerd",
                    label: "Film Nerd"
                },
            ]
        }
    ];

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white px-8 overflow-hidden p-10">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-[#4c09325c] to-black animate-bgMove z-0"></div>
            <h1 className="text-5xl font-bold tracking-wide uppercase text-center z-10">
                About Me
            </h1>

            <div className="mt-12 space-y-8 w-full max-w-4xl z-10 text-center">
                {categories.map((category, catIndex) => (
                    <div key={catIndex}>
                        <h2 className="text-2xl self-center font-semibold mb-4 uppercase">{category.title}</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                            {category.interests.map((item, index) => (
                                <div key={index} className="perspective-1000">
                                    <div className="tile w-full p-4 border-l-4 border-pink-500 bg-[#141414] rounded-lg shadow-lg hover:bg-[#222] transition-transform duration-300 flex flex-col items-center">
                                        {/* Front Side with ASCII Animation */}
                                        <div className="tile-inner relative w-full h-full transform-style-preserve-3d text-center">
                                            <pre className="text-pink-500 leading-4 font-mono text-xs m-auto">{asciiAnimations[item.key].join("\n")}</pre>
                                            {/* Caption */}
                                            <p className="text-s text-gray-300 uppercase font-bold mt-5">{item.label}</p>

                                            {/* Back Side with Dummy Text */}
                                            <div className="tile-back absolute inset-0 bg-[#222] text-gray-300 text-xs font-semibold flex items-center justify-center transform rotateY-180">
                                                {dummyTexts[item.key]}
                                            </div>
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
            <NavigationMenu />
        </div>
    );
}

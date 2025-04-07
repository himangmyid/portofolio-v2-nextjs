"use client";

import { FaReact, FaGithub, FaPhp, FaHtml5, FaCss3Alt, FaBootstrap } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiMysql, SiLaravel } from "react-icons/si";
import { TbBrandJavascript } from "react-icons/tb";
import { DiVisualstudio, DiPhotoshop } from "react-icons/di";

const techStack = [
    { icon: FaHtml5, name: "HTML", color: "text-orange-500" },
    { icon: FaCss3Alt, name: "CSS", color: "text-blue-500" },
    { icon: TbBrandJavascript, name: "JavaScript", color: "text-yellow-400" },
    { icon: SiTypescript, name: "TypeScript", color: "text-blue-400" },
    { icon: FaReact, name: "React", color: "text-cyan-400" },
    { icon: SiNextdotjs, name: "Next.js", color: "text-white" },
    { icon: FaPhp, name: "PHP", color: "text-purple-500" },
    { icon: SiMysql, name: "MySQL", color: "text-blue-300" },
    { icon: SiLaravel, name: "Laravel", color: "text-red-500" },
    { icon: FaBootstrap, name: "Bootstrap", color: "text-purple-400" },
    { icon: FaGithub, name: "GitHub", color: "text-gray-300" },
    { icon: DiVisualstudio, name: "VS Code", color: "text-blue-500" },
    { icon: DiPhotoshop, name: "Photoshop", color: "text-blue-300" },
];

export function TechStack() {
    return (
        <div className="mb-20 relative overflow-hidden group">
            <h3 className="text-3xl font-bold text-center mb-8 text-blue-400">Tech Stack That I Use</h3>

            {/* Main container */}
            <div className="relative  overflow-hidden mask-radial  mask-x-from-70% mask-x-to-100%">
                {/* Gradient overlay */}
                {/* Marquee container */}
                <div className="marquee">
                    <div className="marquee-content">
                        {techStack.map((tech, index) => (
                            <div
                                key={index}
                                className="tech-item"
                            >
                                <div className={`icon ${tech.color}`}>
                                    <tech.icon className="w-full h-full" />
                                </div>
                                <span className="text-sky-300 text-sm font-medium">{tech.name}</span>
                            </div>
                        ))}
                        {/* Duplicate the items for continuous marquee effect */}
                        {techStack.map((tech, index) => (
                            <div
                                key={index + techStack.length}
                                className="tech-item"
                            >
                                <div className={`icon ${tech.color}`}>
                                    <tech.icon className="w-full h-full" />
                                </div>
                                <span className="text-gray-300 text-sm font-medium">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .marquee {
                    display: flex;
                    overflow: hidden;
                    white-space: nowrap;
                }

                .marquee-content {
                    display: flex;
                    animation: marquee 20s linear infinite;
                }

                @keyframes marquee {
                    0% {
                        transform: translateX(0%);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                .tech-item {
                    flex: 0 0 auto;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 16px; /* Adjusted padding for better spacing */
                    margin-right: 24px; /* Adjusted margin for better spacing */
                    background-color: rgba(15, 52, 96, 0.3);
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    width: 160px; /* Adjusted width for larger items */
                    transition: transform 0.3s, box-shadow 0.3s;
                }

                .tech-item:hover {
                    transform: scale(1.1);
                    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
                }

                .icon {
                    width: 64px; /* Adjusted size of the icons */
                    height: 64px;
                    margin-bottom: 8px;
                }
            `}</style>
        </div>
    );
}
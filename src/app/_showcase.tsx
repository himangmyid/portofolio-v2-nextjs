// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"

// interface Project {
//   id: string
//   title: string
//   description: string
//   image: string
//   tags: string[]
//   liveUrl?: string
//   githubUrl?: string
// }

// const projects: Project[] = [
//   {
//     id: "project-1",
//     title: "Portfolio Website",
//     description: "Website portfolio personal dengan desain modern dan responsif",
//     image: "/placeholder.svg?height=400&width=600",
//     tags: ["Next.js", "Tailwind CSS", "TypeScript"],
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com/username/project",
//   },
//   {
//     id: "project-2",
//     title: "E-Commerce App",
//     description: "Aplikasi e-commerce dengan fitur keranjang belanja dan pembayaran",
//     image: "/placeholder.svg?height=400&width=600",
//     tags: ["React", "Node.js", "MongoDB"],
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com/username/project",
//   },
//   {
//     id: "project-3",
//     title: "Task Manager",
//     description: "Aplikasi manajemen tugas dengan fitur drag-and-drop",
//     image: "/placeholder.svg?height=400&width=600",
//     tags: ["Vue.js", "Firebase", "Vuex"],
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com/username/project",
//   },
// ]

// export default function Showcase() {
//   const [currentIndex, setCurrentIndex] = useState(0)

//   const nextProject = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
//   }

//   const prevProject = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
//   }

//   return (
//     <div className="container mx-auto py-12 px-4">
//       <h2 className="text-3xl font-bold text-center mb-12">Showcase Proyek</h2>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {projects.map((project, index) => (
//           <Card
//             key={project.id}
//             className={cn(
//               "transition-all duration-300 hover:shadow-lg",
//               index === currentIndex ? "lg:col-span-1 lg:scale-100" : "lg:col-span-1 lg:scale-95 lg:opacity-80",
//             )}
//           >
//             <CardHeader className="p-0 overflow-hidden rounded-t-lg">
//               <div className="relative h-48 w-full">
//                 <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
//               </div>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <CardTitle className="mb-2">{project.title}</CardTitle>
//               <CardDescription className="mb-4">{project.description}</CardDescription>
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {project.tags.map((tag) => (
//                   <Badge key={tag} variant="secondary">
//                     {tag}
//                   </Badge>
//                 ))}
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               {project.liveUrl && (
//                 <Button variant="outline" size="sm" asChild>
//                   <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
//                     <ExternalLink className="mr-2 h-4 w-4" />
//                     Live Demo
//                   </Link>
//                 </Button>
//               )}
//               {project.githubUrl && (
//                 <Button variant="outline" size="sm" asChild>
//                   <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
//                     <Github className="mr-2 h-4 w-4" />
//                     Source Code
//                   </Link>
//                 </Button>
//               )}
//             </CardFooter>
//           </Card>
//         ))}
//       </div>

//       <div className="flex justify-center mt-8 gap-4">
//         <Button variant="outline" size="icon" onClick={prevProject} aria-label="Previous project">
//           <ChevronLeft className="h-4 w-4" />
//         </Button>
//         <Button variant="outline" size="icon" onClick={nextProject} aria-label="Next project">
//           <ChevronRight className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   )
// }


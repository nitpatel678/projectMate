import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code,
  Palette,
  Database,
  Brain,
  Users,
  LayoutDashboard,
  Server,
  Network,
  Paintbrush,
  Layers,
  Sparkles,
} from "lucide-react";
import Button from "../components/common/Button";
import SearchBar from "../components/common/SearchBar";

const LandingPage = () => {
  const handleSearch = (query) => {
    console.log("Search query:", query);
    // Redirect to search results page
  };

  const categories = [
    {
      title: "Development",
      icon: Code,
      description:
        "Build robust, scalable, and efficient applications using the latest programming languages, frameworks, and tools to meet your technological needs.",
      color: "bg-blue-500",
    },
    {
      title: "Design",
      icon: Palette,
      description:
        "Create stunning, intuitive, and user-friendly designs that enhance the user experience and elevate your brand.",
      color: "bg-purple-500",
    },
    {
      title: "Data Science",
      icon: Database,
      description:
        "Analyze and interpret complex data to uncover insights and drive informed business decisions.",
      color: "bg-green-500",
    },
    {
      title: "Machine Learning",
      icon: Brain,
      description:
        "Develop intelligent systems that learn from data to make predictions, automate processes, and solve complex real-world problems.",
      color: "bg-yellow-500",
    },
  ];

  const techStack = [
    { name: "React", icon: LayoutDashboard, description: "Frontend Library" },
    { name: "Node.js", icon: Server, description: "Backend Runtime" },
    { name: "MongoDB", icon: Database, description: "NoSQL Database" },
    { name: "Express", icon: Network, description: "Backend Framework" },
    { name: "Tailwind", icon: Paintbrush, description: "CSS Framework" },
    { name: "Redux", icon: Layers, description: "State Management" },
    { name: "Framer", icon: Sparkles, description: "Animations" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-0 mt-0">
        <div className="container mx-auto px-4 py-5 md:py-2 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-geologica"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Find Your Perfect Project Partner
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 mb-8 font-calibri"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover, connect, and collaborate with the perfect partner to
              bring your project ideas to life
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search Latest Project"
                className="mb-6"
              />
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button as="link" to="/register" variant="orange" size="lg">
                Get Started
              </Button>
              <Button as="link" to="/home" variant="secondary" size="lg">
                Browse Projects
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="md:w-1/2 relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative z-10">
              <img
                src="https://raw.githubusercontent.com/nitpatel678/SideProject-ProjectMate/main/NewTry/3Dvectorhd.png"
                alt="Project collaboration"
                className="w-full max-w-xl h-auto object-contain mx-auto"
              />
            </div>
            <div className="absolute top-0 right-0 w-full h-full bg-primary rounded-full -z-10 opacity-20 scale-90 translate-x-10 translate-y-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-geologica">
              Collaborate-Create
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-calibri">
              Bring your ideas to life by teaming up with skilled professionals
              from diverse fields. Our platform enables seamless collaboration,
              fostering innovation and teamwork.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-200 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div>
                  <div
                    className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}
                  >
                    <category.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 font-poppins">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4 font-calibri">
                    {category.description}
                  </p>
                </div>
                <div className="mt-auto">
                  <Link
                    to={`/categories/${category.title.toLowerCase()}`}
                    className="text-primary font-medium flex items-center hover:underline font-poppins"
                  >
                    Explore Projects <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-geologica">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-calibri">
              Project Mate makes it easy to find collaborators and join exciting
              projects in just a few simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Create Your Profile",
                description:
                  "Sign up and showcase your skills, experience, and portfolio to stand out to potential collaborators.",
                icon: Users,
                step: "01",
              },
              {
                title: "Discover Projects",
                description:
                  "Browse through a wide range of projects or create your own to find the perfect match for your skills and interests.",
                icon: Code,
                step: "02",
              },
              {
                title: "Collaborate & Create",
                description:
                  "Connect with team members, communicate effectively, and bring your ideas to life together.",
                icon: Palette,
                step: "03",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="relative bg-white rounded-xl shadow-sm p-8 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute -top-4 -left-4 bg-primary text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div className="mb-4 text-primary text-orange-500">
                  <item.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-poppins">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-calibri">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black font-geologica mb-6">
            Ready to Start Collaborating?
          </h2>
          <p className="text-black font-calibri text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of creators and contributors already building amazing
            projects together on Project Mate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button as="link" to="/register" variant="orange" size="lg">
              Sign Up Now
            </Button>
            <Button as="link" to="/home" variant="secondary" size="lg">
              Explore Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-geologica">
              Our Tech Stack
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-calibri">
              Project Mate is built with modern technologies to ensure a smooth,
              responsive, and scalable experience.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 max-w-6xl mx-auto">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-3 text-orange-400">
                  <tech.icon size={28} />
                </div>
                <h3 className="font-semibold text-sm md:text-base font-poppins">
                  {tech.name}
                </h3>
                <p className="text-xs text-gray-500 font-calibri">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;

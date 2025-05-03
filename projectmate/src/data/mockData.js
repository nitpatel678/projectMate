export const projects = [
    {
      id: "1",
      title: "E-commerce Website Development",
      description: "Looking for developers to build a modern e-commerce platform with React and Node.js",
      category: "Web Development",
      isPaid: true,
      budget: 2500,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      requiredSkills: ["React", "Node.js", "MongoDB", "Express"],
      createdBy: {
        id: "user1",
        name: "John Smith",
        avatar: "/placeholder-avatar.png",
        title: "Project Manager",
      },
      teamSize: 3,
      location: "Remote",
      duration: "2 months",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      detailedDescription:
        "We are looking to build a modern e-commerce platform that will allow users to browse products, add them to cart, and checkout securely. The platform should be responsive and work well on mobile devices.",
      responsibilities: [
        "Develop frontend using React and Redux",
        "Build backend API with Node.js and Express",
        "Implement authentication and authorization",
        "Create database schema and models",
        "Integrate payment gateway",
      ],
      requirements: [
        "At least 2 years of experience with React",
        "Strong knowledge of Node.js and Express",
        "Experience with MongoDB or similar NoSQL databases",
        "Understanding of RESTful API design",
        "Familiarity with payment gateway integration",
      ],
    },
    {
      id: "2",
      title: "Mobile App UI/UX Design",
      description: "Need a talented designer to create beautiful and intuitive UI/UX for a fitness tracking app",
      category: "UI/UX Design",
      isPaid: true,
      budget: 1800,
      deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days from now
      requiredSkills: ["Figma", "UI/UX", "Mobile Design", "Prototyping"],
      createdBy: {
        id: "user2",
        name: "Sarah Johnson",
        avatar: "/placeholder-avatar.png",
        title: "Product Manager",
      },
      teamSize: 1,
      location: "Remote",
      duration: "3 weeks",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      detailedDescription:
        "We are developing a fitness tracking app that helps users monitor their workouts, nutrition, and progress. We need a talented UI/UX designer to create an intuitive and engaging interface that motivates users to achieve their fitness goals.",
      responsibilities: [
        "Create wireframes and mockups for all app screens",
        "Design a cohesive and modern UI kit",
        "Develop interactive prototypes for user testing",
        "Collaborate with developers to ensure design implementation",
        "Iterate designs based on feedback",
      ],
      requirements: [
        "Portfolio demonstrating mobile app design experience",
        "Proficiency with Figma or similar design tools",
        "Understanding of iOS and Android design guidelines",
        "Experience with user-centered design processes",
        "Ability to create engaging and intuitive interfaces",
      ],
    },
    {
      id: "3",
      title: "Machine Learning Algorithm Development",
      description: "Seeking a data scientist to develop a recommendation algorithm for our content platform",
      category: "Machine Learning",
      isPaid: true,
      budget: 3500,
      deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days from now
      requiredSkills: ["Python", "TensorFlow", "Machine Learning", "Data Science"],
      createdBy: {
        id: "user3",
        name: "Michael Chen",
        avatar: "/placeholder-avatar.png",
        title: "CTO",
      },
      teamSize: 2,
      location: "Remote",
      duration: "3 months",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      detailedDescription:
        "Our content platform needs a sophisticated recommendation system to suggest relevant content to users based on their preferences and behavior. We are looking for experienced data scientists to develop and implement machine learning algorithms for this purpose.",
      responsibilities: [
        "Analyze user data to identify patterns and preferences",
        "Develop and train recommendation algorithms",
        "Implement A/B testing to evaluate algorithm performance",
        "Optimize algorithms for speed and accuracy",
        "Document methodology and results",
      ],
      requirements: [
        "Advanced degree in Computer Science, Data Science, or related field",
        "Strong experience with Python and machine learning libraries",
        "Knowledge of recommendation systems and collaborative filtering",
        "Experience with large datasets and data processing",
        "Understanding of evaluation metrics for recommendation systems",
      ],
    },
    {
      id: "4",
      title: "WordPress Website Redesign",
      description: "Looking for a WordPress developer to redesign our company website with a modern look",
      category: "Web Development",
      isPaid: false,
      budget: 0,
      deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days from now
      requiredSkills: ["WordPress", "PHP", "HTML/CSS", "JavaScript"],
      createdBy: {
        id: "user4",
        name: "Emily Wilson",
        avatar: "/placeholder-avatar.png",
        title: "Marketing Director",
      },
      teamSize: 1,
      location: "Remote",
      duration: "1 month",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      detailedDescription:
        "Our company website needs a fresh, modern look that better represents our brand. We are looking for a WordPress developer who can redesign our existing site while maintaining all current functionality and improving the user experience.",
      responsibilities: [
        "Redesign website layout and appearance",
        "Ensure mobile responsiveness",
        "Optimize site performance and loading speed",
        "Implement SEO best practices",
        "Migrate content from existing site",
      ],
      requirements: [
        "Portfolio of WordPress website designs",
        "Experience with custom WordPress theme development",
        "Knowledge of PHP and WordPress hooks",
        "Understanding of responsive design principles",
        "Familiarity with SEO best practices",
      ],
    },
    {
      id: "5",
      title: "Social Media Marketing Campaign",
      description: "Need a marketing specialist to create and manage a social media campaign for our product launch",
      category: "Marketing",
      isPaid: true,
      budget: 1200,
      deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
      requiredSkills: ["Social Media Marketing", "Content Creation", "Analytics", "Copywriting"],
      createdBy: {
        id: "user5",
        name: "David Brown",
        avatar: "/placeholder-avatar.png",
        title: "Startup Founder",
      },
      teamSize: 1,
      location: "Remote",
      duration: "2 months",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      detailedDescription:
        "We are launching a new product and need a comprehensive social media marketing campaign to generate buzz and attract potential customers. The campaign should include content creation, posting schedule, and performance tracking across multiple platforms.",
      responsibilities: [
        "Develop a social media strategy for product launch",
        "Create engaging content for different platforms",
        "Schedule and manage posts",
        "Engage with audience and respond to comments",
        "Track performance metrics and adjust strategy as needed",
      ],
      requirements: [
        "Proven experience in social media marketing",
        "Strong copywriting and content creation skills",
        "Knowledge of social media analytics tools",
        "Understanding of different social media platforms",
        "Experience with product launches or campaigns",
      ],
    },
    {
      id: "6",
      title: "Database Migration Project",
      description: "Seeking a database expert to migrate our data from MySQL to MongoDB",
      category: "Database",
      isPaid: true,
      budget: 2000,
      deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(), // 25 days from now
      requiredSkills: ["MySQL", "MongoDB", "Database Migration", "Data Modeling"],
      createdBy: {
        id: "user6",
        name: "Robert Lee",
        avatar: "/placeholder-avatar.png",
        title: "Lead Developer",
      },
      teamSize: 1,
      location: "Remote",
      duration: "1 month",
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
      detailedDescription:
        "We need to migrate our existing relational database (MySQL) to MongoDB to better support our application's growing needs. The project involves data modeling, migration strategy development, and execution with minimal downtime.",
      responsibilities: [
        "Analyze current database structure and data",
        "Design appropriate data models for MongoDB",
        "Develop migration scripts and tools",
        "Test migration process and verify data integrity",
        "Document the migration process and new database structure",
      ],
      requirements: [
        "Strong experience with both MySQL and MongoDB",
        "Knowledge of database migration best practices",
        "Understanding of NoSQL data modeling principles",
        "Experience with data validation and integrity checks",
        "Ability to minimize downtime during migration",
      ],
    },
  ]
  
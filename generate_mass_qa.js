const fs = require('fs');
const path = require('path');
const { generateAnswer } = require('./generate_answers');

// Question prefixes to create variations
const questionPrefixes = [
    "Can you tell me about",
    "What's your experience with",
    "How do you handle",
    "Could you explain",
    "I'm interested in learning about",
    "What's your approach to",
    "How would you describe",
    "Tell me more about",
    "What are your thoughts on",
    "How do you work with",
    "What makes you unique in",
    "How do you stay updated with",
    "What's your philosophy on",
    "How do you ensure quality in",
    "What's your process for",
    "How do you manage",
    "What tools do you use for",
    "How do you optimize",
    "What's your strategy for",
    "How do you implement"
];

// Question suffixes to create variations
const questionSuffixes = [
    "?",
    " in your work?",
    " in your projects?",
    " when working with clients?",
    " in your development process?",
    " compared to others?",
    " in the industry?",
    " for different projects?",
    " at different scales?",
    " in various contexts?",
    " for different clients?",
    " in your portfolio?",
    " in your experience?",
    " as a developer?",
    " as a professional?",
    " in your field?",
    " in practice?",
    " day to day?",
    " typically?",
    " generally?"
];

// Additional keywords for each category
const additionalKeywords = {
    personal_info: [
        "professional growth", "career goals", "learning approach", "problem-solving skills",
        "communication style", "teamwork", "leadership", "adaptability",
        "time management", "project management", "decision making", "creativity",
        "innovation", "analytical skills", "technical expertise", "soft skills",
        "professional network", "industry knowledge", "personal brand", "work-life balance"
    ],
    services: [
        "web optimization", "code refactoring", "system architecture", "technical consulting",
        "performance tuning", "security audits", "code reviews", "technical documentation",
        "project planning", "agile development", "sprint planning", "release management",
        "continuous integration", "automated testing", "quality assurance", "user training",
        "technical support", "system monitoring", "data analytics", "cloud migration"
    ],
    portfolio: [
        "project complexity", "technical challenges", "innovative solutions", "client satisfaction",
        "project timeline", "team collaboration", "project scope", "budget management",
        "stakeholder communication", "risk management", "quality control", "user feedback",
        "performance metrics", "success criteria", "project impact", "business value",
        "technical stack", "scalability", "maintainability", "documentation"
    ],
    experience: [
        "industry expertise", "technical leadership", "team management", "project delivery",
        "client relations", "problem resolution", "innovation", "best practices",
        "code quality", "performance optimization", "security measures", "scalability solutions",
        "architecture design", "system integration", "technical mentoring", "knowledge sharing",
        "process improvement", "risk mitigation", "change management", "stakeholder management"
    ],
    contact: [
        "response times", "communication channels", "availability", "meeting scheduling",
        "project updates", "progress reports", "feedback loops", "issue resolution",
        "client meetings", "status updates", "emergency support", "regular check-ins",
        "documentation sharing", "collaboration tools", "remote work", "time zones",
        "project milestones", "deliverable reviews", "contract terms", "payment schedules"
    ],
    website_features: [
        "user interface", "user experience", "mobile responsiveness", "cross-browser compatibility",
        "loading speed", "accessibility", "SEO optimization", "social integration",
        "content management", "form handling", "error handling", "data validation",
        "session management", "caching strategy", "API integration", "security features",
        "analytics tracking", "performance monitoring", "backup systems", "disaster recovery"
    ],
    technical: {
        frontend: [
            "React", "Vue.js", "Angular", "TypeScript", "JavaScript", "HTML5", "CSS3",
            "Sass", "Webpack", "Babel", "Redux", "GraphQL", "PWA", "Web Components",
            "Responsive Design", "Mobile First", "Cross-browser", "Performance"
        ],
        backend: [
            "Node.js", "Python", "Java", "PHP", "Ruby", "Go", "C#",
            "REST APIs", "Microservices", "Docker", "Kubernetes", "AWS", "Azure",
            "Database Design", "Caching", "Message Queues", "System Architecture"
        ],
        database: [
            "MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "DynamoDB",
            "Data Modeling", "Query Optimization", "Indexing", "Replication",
            "Backup Strategy", "Data Migration", "Schema Design", "Performance Tuning"
        ],
        devops: [
            "CI/CD", "Jenkins", "GitLab", "GitHub Actions", "Terraform", "Ansible",
            "Monitoring", "Logging", "Security", "Scalability", "High Availability",
            "Load Balancing", "Auto Scaling", "Infrastructure as Code"
        ]
    },
    design: [
        "design systems", "component libraries", "style guides", "brand guidelines",
        "user research", "usability testing", "wireframing", "prototyping",
        "responsive design", "mobile first", "accessibility", "color theory",
        "typography", "grid systems", "visual hierarchy", "interaction design",
        "motion design", "micro-interactions", "design tools", "design process"
    ],
    blog: [
        "technical writing", "code examples", "best practices", "industry trends",
        "technology updates", "tutorial series", "case studies", "problem solving",
        "performance tips", "security guidelines", "development tools", "frameworks",
        "libraries", "coding standards", "architecture patterns", "design patterns",
        "testing strategies", "deployment guides", "monitoring tips", "debugging techniques"
    ]
};

// Function to generate variations of a question
function generateQuestionVariations(keyword, category) {
    const variations = [];
    questionPrefixes.forEach(prefix => {
        questionSuffixes.forEach(suffix => {
            const question = `${prefix} ${keyword}${suffix}`;
            variations.push({
                question,
                answer: generateAnswer(question, category)
            });
        });
    });
    return variations;
}

// Function to generate more variations
function generateMoreVariations() {
    const trainingData = JSON.parse(fs.readFileSync('chatbot_training.json', 'utf8'));
    
    // Add new variations for each category
    for (const category in additionalKeywords) {
        if (!trainingData.training_data[category]) {
            trainingData.training_data[category] = [];
        }
        
        if (category === 'technical') {
            // Handle technical category separately due to nested structure
            for (const subCategory in additionalKeywords[category]) {
                additionalKeywords[category][subCategory].forEach(keyword => {
                    const variations = generateQuestionVariations(keyword, category);
                    trainingData.training_data[category].push(...variations);
                });
            }
        } else {
            // Handle other categories
            additionalKeywords[category].forEach(keyword => {
                const variations = generateQuestionVariations(keyword, category);
                trainingData.training_data[category].push(...variations);
            });
        }
    }
    
    // Save the updated training data
    fs.writeFileSync('chatbot_training.json', JSON.stringify(trainingData, null, 4));
    console.log('Generated additional Q&A pairs.');
}

// Run the generator multiple times
for (let i = 0; i < 10; i++) {
    generateMoreVariations();
    console.log(`Iteration ${i + 1} completed.`);
}

console.log('Finished generating Q&A pairs. Check chatbot_training.json for the results.'); 
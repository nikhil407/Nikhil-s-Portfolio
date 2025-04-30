const fs = require('fs');
const path = require('path');

// Read the existing training data
const trainingData = JSON.parse(fs.readFileSync('chatbot_training.json', 'utf8'));

// Question templates for each category
const questionTemplates = {
    personal_info: [
        "Tell me about {topic}",
        "What can you tell me about {topic}",
        "I'd like to know more about {topic}",
        "Could you explain {topic}",
        "What's your experience with {topic}"
    ],
    services: [
        "How do you handle {service}",
        "What's your approach to {service}",
        "Can you explain your {service} process",
        "What makes your {service} different",
        "How do you ensure quality in {service}"
    ],
    portfolio: [
        "Show me examples of {type} projects",
        "What's your most impressive {type} project",
        "How do you approach {type} projects",
        "What challenges have you faced in {type} projects",
        "What's your success rate with {type} projects"
    ],
    experience: [
        "How long have you been working with {technology}",
        "What's your experience level with {technology}",
        "How many {type} projects have you completed",
        "What industries have you worked in",
        "What's your biggest achievement in {field}"
    ],
    contact: [
        "How can I reach you about {topic}",
        "What's the best way to contact you for {service}",
        "Do you offer {type} consultations",
        "How quickly can you respond to {type} inquiries",
        "What's your availability for {type} projects"
    ],
    website_features: [
        "How does the {feature} work",
        "What's the purpose of the {feature}",
        "Can you explain the {feature} functionality",
        "How do I use the {feature}",
        "What makes the {feature} special"
    ],
    technical: [
        "What {technology} do you use for {purpose}",
        "How do you implement {feature} using {technology}",
        "What's your preferred {technology} for {task}",
        "How do you optimize {aspect} using {technology}",
        "What {technology} do you recommend for {purpose}"
    ],
    design: [
        "What's your design approach for {type}",
        "How do you handle {aspect} in design",
        "What principles guide your {type} design",
        "How do you ensure {quality} in design",
        "What's your process for {type} design"
    ],
    blog: [
        "What do you write about in {topic}",
        "How often do you post about {topic}",
        "What's your most popular {topic} post",
        "What insights do you share about {topic}",
        "How do you choose {topic} for your blog"
    ]
};

// Keywords for each category
const keywords = {
    personal_info: ["yourself", "background", "education", "career", "skills", "expertise"],
    services: ["web development", "mobile development", "UI/UX design", "consulting", "maintenance"],
    portfolio: ["web applications", "mobile apps", "e-commerce", "enterprise", "startup"],
    experience: ["JavaScript", "React", "Node.js", "Python", "Java", "PHP"],
    contact: ["new projects", "consultations", "support", "collaboration", "partnerships"],
    website_features: ["news ticker", "support button", "contact form", "portfolio section", "animations"],
    technical: ["frontend", "backend", "database", "security", "performance"],
    design: ["user interface", "user experience", "responsive", "accessibility", "interaction"],
    blog: ["web development", "mobile apps", "UI/UX", "technology", "industry trends"]
};

// Function to generate variations of a question
function generateQuestionVariations(template, keyword) {
    return questionTemplates[template].map(q => q.replace('{topic}', keyword));
}

// Function to generate answers based on the question type
function generateAnswer(question, category) {
    // This is a simplified version - in a real implementation, you would use
    // more sophisticated logic to generate appropriate answers
    const baseAnswers = {
        personal_info: "I have extensive experience in this area and can provide detailed information about my background and expertise.",
        services: "I follow industry best practices and use modern technologies to deliver high-quality services in this field.",
        portfolio: "I have completed numerous successful projects in this category, each demonstrating my skills and expertise.",
        experience: "I have worked with this technology/field for several years and have a proven track record of successful implementations.",
        contact: "You can reach me through various channels, and I'm always happy to discuss new opportunities and collaborations.",
        website_features: "This feature is designed to enhance user experience and provide valuable functionality to visitors.",
        technical: "I use modern technologies and best practices to ensure optimal performance and maintainability.",
        design: "My design approach focuses on user-centered principles and modern aesthetics while ensuring functionality.",
        blog: "I regularly share insights and knowledge about this topic through my blog posts and articles."
    };

    return baseAnswers[category];
}

// Generate new Q&A pairs
function generateNewQAPairs() {
    const newPairs = {};
    
    for (const category in questionTemplates) {
        newPairs[category] = [];
        
        keywords[category].forEach(keyword => {
            const variations = generateQuestionVariations(category, keyword);
            variations.forEach(question => {
                newPairs[category].push({
                    question: question,
                    answer: generateAnswer(question, category)
                });
            });
        });
    }
    
    return newPairs;
}

// Add new pairs to existing training data
const newPairs = generateNewQAPairs();
for (const category in newPairs) {
    if (!trainingData.training_data[category]) {
        trainingData.training_data[category] = [];
    }
    trainingData.training_data[category].push(...newPairs[category]);
}

// Save the updated training data
fs.writeFileSync('chatbot_training.json', JSON.stringify(trainingData, null, 4));

console.log('Generated new Q&A pairs and updated training data.'); 
const fs = require('fs');
const path = require('path');

// Answer templates based on website content
const answerTemplates = {
    personal_info: {
        journey: "My journey in web development started with a passion for creating digital experiences. I've evolved from basic HTML/CSS to full-stack development, constantly learning and adapting to new technologies.",
        passion: "I'm passionate about creating innovative digital solutions that solve real-world problems. My focus is on building user-centric applications with cutting-edge technology.",
        motivation: "My motivation comes from the ability to create impactful digital solutions. I'm driven by the challenge of solving complex problems and delivering exceptional user experiences.",
        goals: "My goals include pushing the boundaries of web development, contributing to open-source projects, and helping businesses achieve their digital transformation objectives.",
        achievements: "I've successfully delivered numerous projects across various industries, received positive client feedback, and continuously improved my technical skills and knowledge.",
        education: "I've pursued continuous learning in web development through various courses, certifications, and hands-on experience. My education is an ongoing journey in this ever-evolving field.",
        certifications: "I hold certifications in various web technologies and frameworks, which validate my expertise and commitment to professional development.",
        specialties: "My specialties include full-stack development, UI/UX design, and creating scalable web applications. I focus on delivering high-quality, maintainable code.",
        strengths: "My key strengths include problem-solving, attention to detail, and the ability to learn quickly. I excel at creating efficient, user-friendly applications.",
        work_ethic: "I maintain a strong work ethic focused on quality, reliability, and continuous improvement. I believe in delivering projects on time while maintaining high standards."
    },
    services: {
        custom_solutions: "I provide tailored web solutions that address specific business needs. Each project is carefully planned and executed to ensure optimal results.",
        enterprise_applications: "I develop robust enterprise applications with scalability and security in mind. My approach includes thorough planning and testing.",
        ecommerce_platforms: "I create e-commerce platforms with secure payment processing, inventory management, and user-friendly interfaces.",
        progressive_web_apps: "I build PWAs that offer native app-like experiences with offline capabilities and fast loading times.",
        api_development: "I develop RESTful APIs with proper documentation, security measures, and scalability considerations.",
        cloud_services: "I implement cloud solutions using modern platforms, ensuring scalability, security, and cost-effectiveness.",
        devops: "I implement DevOps practices to streamline development, testing, and deployment processes.",
        testing: "I conduct comprehensive testing including unit tests, integration tests, and performance testing.",
        deployment: "I handle deployment processes with proper version control and continuous integration practices.",
        maintenance: "I provide ongoing maintenance and support to ensure applications remain secure and up-to-date."
    },
    portfolio: {
        responsive_websites: "I've created numerous responsive websites that adapt seamlessly to all devices and screen sizes.",
        progressive_web_apps: "My PWA projects include offline functionality, push notifications, and app-like experiences.",
        ecommerce_solutions: "I've developed e-commerce platforms with secure payment processing and inventory management.",
        enterprise_systems: "I've built enterprise systems with robust security and scalability features.",
        mobile_applications: "I've created mobile applications with native-like performance and user experience.",
        ui_ux_designs: "My UI/UX designs focus on user-centered principles and modern design trends.",
        api_integrations: "I've integrated various APIs to enhance functionality and user experience.",
        cloud_solutions: "I've implemented cloud-based solutions for improved scalability and performance.",
        database_systems: "I've designed and implemented efficient database systems for various applications."
    },
    experience: {
        frontend_frameworks: "I have extensive experience with modern frontend frameworks like React, Vue, and Angular.",
        backend_technologies: "I'm proficient in backend technologies including Node.js, Python, and PHP.",
        database_systems: "I have experience with both SQL and NoSQL databases, optimizing for performance.",
        cloud_platforms: "I've worked with various cloud platforms for deployment and scaling.",
        devops_tools: "I use DevOps tools for continuous integration and deployment.",
        testing_frameworks: "I implement comprehensive testing using modern testing frameworks.",
        deployment_tools: "I use various deployment tools to ensure smooth releases.",
        version_control: "I follow best practices in version control using Git.",
        project_management: "I use agile methodologies for efficient project management."
    },
    contact: {
        project_inquiries: "I respond to project inquiries within 24 hours with detailed information.",
        collaboration_opportunities: "I'm open to collaboration and respond promptly to partnership proposals.",
        job_offers: "I review job offers carefully and respond within 48 hours.",
        freelance_work: "I consider freelance projects based on scope and alignment with my expertise.",
        consultation_requests: "I offer free initial consultations for potential projects.",
        support_tickets: "I prioritize support tickets based on severity and impact.",
        partnership_proposals: "I evaluate partnership opportunities based on mutual benefits.",
        speaking_engagements: "I consider speaking engagements that align with my expertise.",
        training_requests: "I offer training sessions based on availability and topic relevance."
    },
    website_features: {
        dark_mode: "The dark mode feature reduces eye strain and saves battery life on devices.",
        light_mode: "The light mode provides a clean, professional appearance suitable for all users.",
        animations: "Animations enhance user experience while maintaining performance.",
        transitions: "Smooth transitions create a polished, professional feel.",
        responsive_design: "The website adapts seamlessly to all devices and screen sizes.",
        accessibility_features: "Accessibility features ensure the website is usable by everyone.",
        performance: "Optimized performance ensures fast loading times and smooth interactions.",
        security: "Robust security measures protect user data and privacy.",
        user_experience: "The user experience is designed to be intuitive and engaging.",
        interactive_elements: "Interactive elements enhance engagement while maintaining usability."
    },
    technical: {
        code_quality: "I maintain high code quality through best practices and code reviews.",
        testing: "I implement comprehensive testing strategies for reliable applications.",
        documentation: "I provide thorough documentation for all projects.",
        version_control: "I use Git for version control and collaboration.",
        deployment: "I follow best practices for secure and efficient deployment.",
        scaling: "I design systems with scalability in mind from the start.",
        security: "I implement security best practices throughout development.",
        performance: "I optimize performance through various techniques and tools.",
        maintenance: "I provide regular maintenance and updates for all projects.",
        updates: "I keep all projects updated with the latest security patches and features."
    },
    design: {
        color_schemes: "I create color schemes that enhance readability and brand identity.",
        typography: "I select typography that improves readability and visual hierarchy.",
        layout: "I design layouts that are intuitive and responsive.",
        navigation: "I create navigation systems that are intuitive and accessible.",
        interactions: "I design interactions that are smooth and purposeful.",
        animations: "I use animations to enhance user experience without distraction.",
        accessibility: "I ensure designs meet accessibility standards.",
        responsive: "I create designs that work seamlessly across all devices.",
        user_flow: "I optimize user flows for efficiency and satisfaction.",
        visual_hierarchy: "I establish clear visual hierarchy to guide users."
    },
    blog: {
        coding_tutorials: "My coding tutorials provide practical, step-by-step guidance.",
        design_tips: "I share design tips based on industry best practices.",
        industry_news: "I cover relevant industry news and developments.",
        technology_reviews: "I provide honest reviews of technologies and tools.",
        case_studies: "I share case studies of successful projects and solutions.",
        best_practices: "I discuss best practices based on experience and research.",
        trends: "I analyze current trends and their implications.",
        insights: "I share insights gained from real-world experience.",
        opinions: "I share informed opinions on industry topics.",
        guides: "I create comprehensive guides for various topics."
    }
};

// Function to generate answers
function generateAnswer(question, category) {
    const keywords = Object.keys(answerTemplates[category]);
    for (const keyword of keywords) {
        if (question.toLowerCase().includes(keyword)) {
            return answerTemplates[category][keyword];
        }
    }
    return "I'm constantly learning and improving my skills in this area. My approach is to stay updated with the latest developments and best practices.";
}

// Function to update answers in training data
function updateAnswers() {
    const trainingData = JSON.parse(fs.readFileSync('chatbot_training.json', 'utf8'));
    
    for (const category in trainingData.training_data) {
        trainingData.training_data[category].forEach(qa => {
            if (!qa.answer) {
                qa.answer = generateAnswer(qa.question, category);
            }
        });
    }
    
    fs.writeFileSync('chatbot_training.json', JSON.stringify(trainingData, null, 4));
    console.log('Updated answers in training data.');
}

// Export the generateAnswer function
module.exports = {
    generateAnswer,
    updateAnswers
};

// Run updateAnswers if this file is run directly
if (require.main === module) {
    updateAnswers();
} 
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to run a script and handle its output
function runScript(scriptName) {
    try {
        console.log(`Running ${scriptName}...`);
        execSync(`node ${scriptName}`, { stdio: 'inherit' });
        console.log(`${scriptName} completed successfully.`);
        return true;
    } catch (error) {
        console.error(`Error running ${scriptName}:`, error.message);
        return false;
    }
}

// Function to combine all Q&A pairs
function combineQAPairs() {
    const trainingData = JSON.parse(fs.readFileSync('chatbot_training.json', 'utf8'));
    const combinedData = {
        training_data: {}
    };

    // Combine all categories
    for (const category in trainingData.training_data) {
        combinedData.training_data[category] = trainingData.training_data[category];
    }

    // Remove duplicates
    for (const category in combinedData.training_data) {
        const uniqueQAs = [];
        const seenQuestions = new Set();

        combinedData.training_data[category].forEach(qa => {
            if (!seenQuestions.has(qa.question)) {
                seenQuestions.add(qa.question);
                uniqueQAs.push(qa);
            }
        });

        combinedData.training_data[category] = uniqueQAs;
    }

    // Save combined data
    fs.writeFileSync('chatbot_training.json', JSON.stringify(combinedData, null, 4));
    console.log('Combined and deduplicated Q&A pairs.');
}

// Main function to run all generators
async function generateAllQA() {
    console.log('Starting Q&A generation process...');

    // Run each generator
    const scripts = [
        'generate_qa.js',
        'generate_mass_qa.js',
        'generate_answers.js'
    ];

    for (const script of scripts) {
        if (!runScript(script)) {
            console.error(`Failed to run ${script}. Stopping process.`);
            return;
        }
    }

    // Combine and deduplicate Q&A pairs
    combineQAPairs();

    // Count total Q&A pairs
    const finalData = JSON.parse(fs.readFileSync('chatbot_training.json', 'utf8'));
    let totalPairs = 0;
    for (const category in finalData.training_data) {
        totalPairs += finalData.training_data[category].length;
    }

    console.log(`\nGeneration complete!`);
    console.log(`Total unique Q&A pairs generated: ${totalPairs}`);
    console.log(`Categories: ${Object.keys(finalData.training_data).join(', ')}`);
}

// Run the main function
generateAllQA(); 
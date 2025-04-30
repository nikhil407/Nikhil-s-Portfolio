# Portfolio Website Chatbot Training Data Generator

This project generates training data for the "Ask Nikhil" chatbot on the portfolio website. It creates a comprehensive set of questions and answers based on the website's content and features.

## Features

- Generates 5000+ unique Q&A pairs
- Covers multiple categories:
  - Personal Information & Background
  - Skills & Expertise
  - Services & Offerings
  - Projects & Portfolio
  - Experience & Education
  - Contact & Communication
  - Website Features & Functionality
  - Technical Details & Implementation
  - Design & UI/UX
  - Blog & Content
- Automatically removes duplicates
- Generates natural-sounding answers
- Maintains consistent tone and style

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Usage

### Generate All Q&A Pairs

To generate all Q&A pairs at once:
```bash
npm run generate
```

### Generate Specific Components

To generate specific components:

1. Generate initial Q&A pairs:
```bash
npm run generate-qa
```

2. Generate mass variations:
```bash
npm run generate-mass
```

3. Generate answers:
```bash
npm run generate-answers
```

## Output

The generated training data is saved in `chatbot_training.json` with the following structure:

```json
{
  "training_data": {
    "category_name": [
      {
        "question": "What is your experience with...",
        "answer": "I have extensive experience..."
      }
    ]
  }
}
```

## Customization

You can customize the training data by modifying:

1. `generate_qa.js` - Initial Q&A pairs
2. `generate_mass_qa.js` - Additional keywords and templates
3. `generate_answers.js` - Answer templates

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
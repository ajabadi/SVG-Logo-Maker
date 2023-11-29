const { Circle, Triangle, Square } = require('./lib/shapes');
const fs = require('fs');
const path = require('path');

(async () => {
    const inquirer = await import('inquirer').then(module => module.default);

    function promptUser() {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'shape',
                message: 'What shape would you like to use for the logo?',
                choices: ['Circle', 'Triangle', 'Square'],
            },
            {
                type: 'input',
                name: 'shapeColor',
                message: 'Enter the color for the shape:',
            },
            {
                type: 'input',
                name: 'text',
                message: 'Enter the text for the logo (up to 3 characters):',
                validate: function(value) {
                    var pass = value.match(/^[A-Za-z]{1,3}$/);
                    if (pass) {
                        return true;
                    }
                    return 'Please enter up to 3 alphabetical characters.';
                }
            },
            {
                type: 'input',
                name: 'textColor',
                message: 'Enter the color for the text:',
            }
        ]);
    }

    function generateSVG(shape, text, textColor) {
        return `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                    ${shape.render()}
                    <text x="150" y="100" dy="0.35em" font-size="50" fill="${textColor}" text-anchor="middle" >${text}</text>
                </svg>`;
    }
    
    
    async function createLogo() {
        try {
            const answers = await promptUser();

            let shape;
            switch (answers.shape) {
                case 'Circle':
                    shape = new Circle(answers.shapeColor);
                    break;
                case 'Triangle':
                    shape = new Triangle(answers.shapeColor);
                    break;
                case 'Square':
                    shape = new Square(answers.shapeColor);
                    break;
            }

            const svg = generateSVG(shape, answers.text, answers.textColor);
            const filePath = path.join(__dirname, 'examples', 'example.svg');
            fs.writeFileSync(filePath, svg);
            console.log('Generated logo.svg in examples folder');
        } catch (error) {
            console.error('Error creating logo:', error);
        }
    }

    createLogo();
})();







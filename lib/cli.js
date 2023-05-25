const inquirer = require("inquirer");
const SVG = require("./svg");
const { Circle, Triangle, Square } = require("./shapes");
const { writeFile } = require("fs/promises");

class CLI {
  run() {
    return inquirer
      .prompt([
        {
          name: "shapeType",
          type: "list",
          message: "Select a logo shape",
          choices: ["Circle", "Square", "Triangle"],
        },
        {
          name: "text",
          type: "input",
          message:
            "Enter the text for the logo. (Cannot be more than 3 characters.)",
          validate: (text) =>
            text.length <= 3 ||
            "Text cannot contain more than 3 characters",
        },
        {
          name: "textColor",
          type: "input",
          message: "Enter a color for text",
        },
        {
          name: "shapeColor",
          type: "input",
          message: "Enter a color for the background",
        },
      ])
      .then(({ text, textColor, shapeType, shapeColor }) => {
        let shape;
        switch (shapeType) {
          case "circle":
            shape = new Circle();
            break;

          case "square":
            shape = new Square();
            break;

          default:
            shape = new Triangle();
            break;
        }
        shape.setColor(shapeColor);

        const svg = new SVG();
        svg.setText(text, textColor);
        svg.setShape(shape);
        return writeFile("logo.svg", svg.render());
      })
      .then(() => {
        console.log("Generated logo.svg");
      })
      .catch((error) => {
        console.log(error);
        console.log("omething has gone wrong.");
      });
  }
}

module.exports = CLI;


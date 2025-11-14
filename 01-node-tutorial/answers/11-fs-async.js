const { writeFile, write } = require("fs");
const path = require("path");
console.log("start");
const filePath = path.join(__dirname, "temporary", "fileB.txt");
writeFile(filePath, "This is line 1\n", (err) => {
  if (err) {
    console.log("This error happened: ", err);
  } else {
    console.log("at point 1");
    writeFile(filePath, "This is line 2, appended.\n", { flag: "a" }, (err) => {
      if (err) {
        console.error("This error happened: ", err);
      } else {
        console.log("at point 2");

        writeFile(
          filePath,
          "This is line 3, also appended.\n",
          { flag: "a" },
          (err) => {
            if (err) {
              console.error("This error happened: ", err);
            } else {
              console.log("at point 3");
              console.log("Writing to file successfully completed.");
            }
          }
        );
      }
    });
  }
});
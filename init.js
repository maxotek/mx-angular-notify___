// Initializes the seed project with the specified 
// project name, description, repository URL & output filename

var fs = require('fs');
var fileChecker = require('./file-checker');

// Verify that files exist
var packageFile = "package.json";
var bowerFile = "bower.json";
var buildConfFile = "build.conf.js";

var filesToCheck = [packageFile, bowerFile, buildConfFile];
if (filesToCheck.some(fileChecker))
    return -1;

// Check Arguments
if (process.argv.length < 6) {
    console.error("Usage: node init.js <project-name> <project-description> <git-repository-url> <output-filename>");
    return -1;
}

var projectName = process.argv[2];
var projectDescription = process.argv[3];
var repoUrl = process.argv[4];
var outputFileName = process.argv[5];

// Dump Arguments
console.log("Project: " + projectName);
console.log("Description: " + projectDescription);
console.log("Repository URL: " + repoUrl);
console.log("Output File: " + outputFileName);

// Modify package.json
var content = fs.readFileSync(packageFile)
var obj = JSON.parse(content);
obj.name = projectName;
obj.description = projectDescription;
obj.repository = repoUrl;
fs.writeFileSync(packageFile, JSON.stringify(obj, null, 2));

console.log(packageFile + " updated");

// Modify bower.json
var content = fs.readFileSync(bowerFile)
var obj = JSON.parse(content);
obj.name = projectName;
obj.description = projectDescription;
obj.homepage = repoUrl;
fs.writeFileSync(bowerFile, JSON.stringify(obj, null, 4));

console.log(bowerFile + " updated");

// Modify build.conf.js
var content = fs.readFileSync(buildConfFile).toString();
content = content.replace(/buildJsFilename:(\s*)(['"])[^']+(['"])/, "buildJsFilename:$1$2" + outputFileName + "$3");
fs.writeFileSync(buildConfFile, content);

console.log(buildConfFile + " updated");
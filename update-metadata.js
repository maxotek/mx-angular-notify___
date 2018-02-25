// Initializes the seed project with the specified 
// project name, description, repository URL & output filename

var fs = require('fs');
var metadataUpdater = require('./seeder/metadata-updater');

// Check Arguments
if (process.argv.length < 5) {
    console.error("Usage: node update-metadata <project-name> <project-description> <output-filename> [github-project-url] [git-https-url] [git-ssh-url]");
    return -1;
}

var projectName = process.argv[2];
var projectDescription = process.argv[3];
var outputFileName = process.argv[4];
var projectUrl = process.argv.length > 5 ? process.argv[5] : null;
var httpsUrl = process.argv.length > 6 ? process.argv[6] : null;
var sshUrl = process.argv.length > 7 ? process.argv[7] : null;

return metadataUpdater(projectName, projectDescription, outputFileName, projectUrl, httpsUrl, sshUrl) ? 1 : -1;
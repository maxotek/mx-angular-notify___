var repoCreator = require("./seeder/repo-creator");
var metadataUpdater = require("./seeder/metadata-updater");

// Check Arguments
if (process.argv.length < 6) {
    console.error("Usage: node init <project-name> <project-description> <output-filename> <access_token>");
}
else {
    var projectName = process.argv[2];
    var projectDescription = process.argv[3];
    var outputFileName = process.argv[4];
    var accessToken = process.argv[5];

    // Create repository
    repoCreator(projectName, projectDescription, accessToken, function (result) {
        if (!result.success)
            return - 1;

        var projectUrl = result.projectUrl;
        var httpsUrl = result.httpsUrl;
        var sshUrl = result.sshUrl;

        console.log("Project URL: " + projectUrl);
        console.log("HTTPS URL: " + httpsUrl);
        console.log("SSH URL: " + sshUrl);

        return metadataUpdater(projectName, projectDescription, outputFileName, projectUrl, httpsUrl, sshUrl) ? 1 : -1;
    });
}
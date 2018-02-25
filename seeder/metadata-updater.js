var fs = require('fs');
var file = require('./file');

module.exports = function (projectName, projectDescription, outputFileName, projectUrl, httpsUrl, sshUrl) {
    // Verify that files exist
    var packageFile = "package.json";
    var bowerFile = "bower.json";
    var buildConfFile = "build.conf.js";
    var gitConfFile = ".git/config";

    var filesToCheck = [packageFile, bowerFile, buildConfFile, gitConfFile];
    if (filesToCheck.some(file.checkFileExists))
        return false;

    // Dump Arguments
    console.log("Project: " + projectName);
    console.log("Description: " + projectDescription);
    console.log("Output File: " + outputFileName);
    console.log("Project URL: " + projectUrl);
    console.log("HTTPS URL: " + httpsUrl);
    console.log("SSH URL: " + sshUrl);

    // Modify package.json
    var content = fs.readFileSync(packageFile)
    var obj = JSON.parse(content);
    obj.name = projectName;
    obj.description = projectDescription;

    if (httpsUrl)
        obj.repository = httpsUrl;

    fs.writeFileSync(packageFile, JSON.stringify(obj, null, 2));
    console.log(packageFile + " updated");

    // Modify bower.json
    var content = fs.readFileSync(bowerFile)
    var obj = JSON.parse(content);
    obj.name = projectName;
    obj.description = projectDescription;

    if (projectUrl)
        obj.homepage = projectUrl;

    fs.writeFileSync(bowerFile, JSON.stringify(obj, null, 4));
    console.log(bowerFile + " updated");

    // Modify build.conf.js
    file.regexReplaceFile(buildConfFile, /buildJsFilename:(\s*)(['"])[^']+(['"])/, "buildJsFilename:$1$2" + outputFileName + "$3");

    // Modify Git remote
    if (sshUrl)
        file.regexReplaceFile(gitConfFile, /(\s*url\s*=\s*).*/, "$1" + sshUrl);

    return true;
}
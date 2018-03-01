"use strict";

var fs = require("fs");
var file = require("./file");

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
    var nodePkg = file.readJsonFileAsync(packageFile);
    nodePkg.name = projectName;
    nodePkg.description = projectDescription;

    if (httpsUrl)
        nodePkg.repository = httpsUrl;

    fs.writeFileSync(packageFile, JSON.stringify(nodePkg, null, 2));
    console.log(packageFile + " updated");

    // Modify bower.json
    var bowerPkg = file.readJsonFileAsync(bowerFile);
    bowerPkg.name = projectName;
    bowerPkg.description = projectDescription;
    bowerPkg.main = "dist/" + outputFileName;

    if (projectUrl)
        bowerPkg.homepage = projectUrl;

    fs.writeFileSync(bowerFile, JSON.stringify(bowerPkg, null, 4));
    console.log(bowerFile + " updated");

    // Modify build.conf.js
    file.regexReplaceFile(buildConfFile, /buildJsFilename:(\s*)(['"])[^'"]+(['"])/, "buildJsFilename:$1$2" + outputFileName + "$3");

    // Modify yourProject.js
    var newModuleFileName = "src/" + projectName + ".js";
    fs.renameSync("src/your-project-name.js", newModuleFileName);
    console.log("Renamed AngularJS module file to: " + newModuleFileName);

    file.regexReplaceFile(newModuleFileName, /your-project-name/, projectName);
    console.log("Updated AngularJS project name in: " + newModuleFileName);

    // Modify Git remote
    if (sshUrl)
        file.regexReplaceFile(gitConfFile, /(\s*url\s*=\s*).*/, "$1" + sshUrl);

    return true;
};
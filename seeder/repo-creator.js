var https = require('https');

module.exports = function (repoName, repoDescription, accessToken, callback) {
    // List repositories
    var options = {
        hostname: "api.github.com",
        port: 443,
        path: "/user/repos",
        headers: {
            Authorization: 'Bearer ' + accessToken,
            "User-Agent": "Maxotek Seeder"
        }
    };

    console.log("Listing repositories");

    https.get(options, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log('Status Code:', resp.statusCode);
            var result = JSON.parse(data);

            var ownRepos = null;
            if (resp.statusCode != 200) {
                handleError(result);
            }
            else {
                ownRepos = result;

                console.log("Found: " + ownRepos.length + " repositories");

                var existingOwnRepoFullPath = null;
                var checkIfRepoExists = function (repo) {
                    var exists = repo.name == repoName;

                    if (exists)
                        existingOwnRepoFullPath = repo.html_url;

                    return exists;
                };

                if (ownRepos.some(checkIfRepoExists)) {
                    var msg = "The repository: " + repoName + " already exists at " + existingOwnRepoFullPath;
                    console.error(msg);

                    if (callback)
                        callback({
                            success: false,
                            error: msg
                        });
                    return false;
                }
                else {
                    console.log("Creating repository: " + repoName);

                    options.method = "POST";
                    options.headers["Content-Type"] = "application/json";

                    var req = https.request(options, (resp) => {
                        let data = '';

                        // A chunk of data has been recieved.
                        resp.on('data', (chunk) => {
                            data += chunk;
                        });

                        resp.on('end', () => {
                            console.log('Status Code:', resp.statusCode);

                            var result = JSON.parse(data);

                            if (resp.statusCode != 201) {
                                handleError(result);
                            } else {
                                console.log("Repository created at: " + result.html_url);

                                if (callback)
                                    callback({
                                        success: true,
                                        projectUrl: result.html_url,
                                        sshUrl: result.ssh_url
                                    });
                            }
                        });
                    });

                    var postData = {
                        name: repoName,
                        description: repoDescription,
                        private: false
                    };

                    req.write(JSON.stringify(postData));
                    req.end();
                }
            }
        });

    }).on("error", (err) => {
        console.error("Unable to list repositories: " + err.message);

        if (callback)
            callback({
                success: false,
                error: err.message
            });
    });

    function handleError(result) {
        console.log(result.message);

        if (result.errors) {
            result.errors.forEach(error => {
                console.log(error.message);
            });
        }

        if (callback)
            callback({
                success: false,
                error: result.message
            });
    }
}
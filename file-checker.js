var fs = require('fs');

module.exports = function (fileName) {
    if (!fs.existsSync(fileName)) {
        console.error(fileName + " does not exist");
        return true;
    }

    return false;
}
const fs = require('fs');
const path = require('path');

class mailsContoller {
    async getMails(req, res) {
        try {
            let filePath = path.join(__dirname, 'medium.json');
            let rawData = fs.readFileSync(filePath);

            let data = JSON.parse(rawData);
            res.json(data);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new mailsContoller();
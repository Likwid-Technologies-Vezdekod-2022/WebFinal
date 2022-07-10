const fs = require('fs');
const path = require('path');

class mailsContoller {
    async getMails(req, res) {
        try {
            let { limit, page } = req.query;
            page = page || 1;
            limit = limit || 20;
            let offset = page * limit - limit;


            let filePath = path.join(__dirname, 'small.json');
            let rawData = fs.readFileSync(filePath);
            
            let data = JSON.parse(rawData);

            data = [...data].splice(offset, limit);

            res.json([...data]);
        } catch (err) {
            console.log(err);
        }
    }

    async editMails(req, res) {
        try {
            if(!req.body) return res.sendStatus(400);
            
            let filePath = path.join(__dirname, 'small.json');
            fs.writeFileSync(filePath, JSON.stringify(req.body));
            
            res.json(req.body);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new mailsContoller();
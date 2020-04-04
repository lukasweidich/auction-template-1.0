const datastoreApi = require("../util/datastoreApi")
const express = require('express')
const fetch = require("node-fetch")
const app = express()
const port = 3001

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/userid/:userId', function (req, res) {
    datastoreApi.getAccessibleTemplatesOfUser(req.params.userId).then(templates => {
        res.send(templates);
    })
});

app.post("/userid/:userId", (req, res) => {
    // if (!datastoreApi.hasAnyAccessibleTemplates(req.params.userId)) {
    datastoreApi.insertHasAccessNewUser({ acessibleTemplateIds: [{ templateId: "dem-it-classic" }], userId: req.params.userId }, req.params.userId).then(
        res.send(`Successfully added dem-it-classic to userId: ${req.params.userId}`)
    )
    // }
})

app.get('/cors/:xdd', async function (req, res) {
    // let a = request(
    //     { url: req.params.url },
    //     (error, response, body) => {
    //         if (error || response.statusCode !== 200) {
    //             return res.status(500).json({ type: 'error', message: error.message });
    //         }
    //         res.json(JSON.parse(body));
    //     }
    // )
    let xd = await fetch(`http://www.${req.params.xdd}`)
        .then(res => res.text())
    res.send(xd);
    // let xdd = req.params.xdd.substr(1, req.params.xdd.length);
    // let x = await fetch(xdd);
    // x = await x.text();
    // res.send(x)
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
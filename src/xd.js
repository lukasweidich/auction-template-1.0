const { Datastore } = require('@google-cloud/datastore');
const datastore = new Datastore();
require("dotenv").config();

const insertHasAccess = (hasAccessMapping) => {
    return datastore.save({
        key: datastore.key('hasAccess'),
        data: hasAccessMapping,
    });
};

// insertHasAccess(
//     {
//         acessibleTemplateIds: [{ "templateId": "stinkt" }],
//         userId: "lukas"
//     }
// );

const getHasAccess = () => {
    const query = datastore
        .createQuery('hasAccess')

    return datastore.runQuery(query);
};

const getAccessibleTemplatesOfUser = (userId) => {
    const query = datastore
        .createQuery('hasAccess')
        .filter("userId", "=", userId);

    return datastore.runQuery(query);
};

// getHasAccess().then(console.log);
getAccessibleTemplatesOfUser("z1wefYkT0afD5WEq0uWpCNDEWk62").then(res => console.log(res[0][0].acessibleTemplateIds.map(el => el.templateId)))
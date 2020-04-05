const { Datastore } = require('@google-cloud/datastore');
const fetch = require('node-fetch');
const datastore = new Datastore();
require("dotenv").config();

const insertHasAccess = (hasAccessMapping) => {
    return datastore.save({
        key: datastore.key('hasAccess'),
        data: hasAccessMapping,
    });
};

const insertHasAccessNewUser = (hasAccessMapping, userId) => {
    if (hasAccessibleTemplates(userId)) {
        return datastore.save({
            key: datastore.key('hasAccess'),
            data: hasAccessMapping,
        });
    }
};

const getHasAccess = () => {
    const query = datastore
        .createQuery('hasAccess')

    return datastore.runQuery(query);
};

const getAccessibleTemplatesOfUser = (userId) => {
    const query = datastore
        .createQuery('hasAccess')
        .filter("userId", "=", userId);
    return datastore.runQuery(query).then(res => {
        return res;
    });
};

const doesUserExist = (userId) => {
    const query = datastore
        .createQuery('hasAccess')
        .filter("userId", "=", userId);
    return datastore.runQuery(query).then(res => {
        return res[0].length > 0;
    });
};

const hasAccessibleTemplates = (userId) => {
    const query = datastore
        .createQuery('hasAccess')
        .filter("userId", "=", userId);
    return datastore.runQuery(query).then(res => {
        return res[0].map(el => el.acessibleTemplateIds[0].templateId).length > 0;
    });
}

// getAccessibleTemplatesOfUser("z1wefYkT0afD5WEq0uWpCNDEWk62").then(console.log)
// hasAccessibleTemplates("z1wefYkT0afD5WEq0uWpCNDEWk62").then(console.log)
// doesUserExist("dqdw").then(console.log)
module.exports = { getAccessibleTemplatesOfUser, getHasAccess, insertHasAccess, insertHasAccessNewUser, doesUserExist }
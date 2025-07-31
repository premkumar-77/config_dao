const dao = require("./dao");
const {PlatformConfig} = require('../registry/service-registry');

class DaoManager extends dao{
    constructor(model) {
        this.model = model;
    }
}
module.exports = new DaoManager(PlatformConfig);
const { DatabaseQueryError } = require('../utils/error');

module.exports = class dao {
    constructor(model) {
        this.model = model;
    }

    async findAll() {
        try {
            const result = await this.model.findAll({
                attributes: ['key', 'value']
            });
            return result;
            
        } catch (error) {
            console.error('Error fetching records:', error);
            throw new DatabaseQueryError(`Database query error: ${error.message}`);
        }

    }

}
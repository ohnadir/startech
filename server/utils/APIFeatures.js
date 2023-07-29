class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    search() {
        const keyword = this.queryString.keyword;
        let query = {};
        if (keyword !== 'undefined' || keyword !== undefined || keyword) {
            let regex = new RegExp(keyword, 'i');
            query = {
            ...query,
            $or: [{ name: regex }]
            };
        }
        this.query = this.query.find(query);
        return this;
    } 
    filter() {

        const queryCopy = { ...this.queryString };

        // Removing fields from the query
        const removeFields = ['keyword']
        removeFields.forEach(el => delete queryCopy[el]);

        // Advance filter for price, ratings etc
        let queryStr = JSON.stringify(queryCopy)


        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    /* pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    } */
}
module.exports = APIFeatures
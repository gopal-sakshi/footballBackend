var extractParams = {}


extractParams.get('/', async function(req, res) {
    
    let page = req.query.page;
    let limit = req.query.limit;
    /* blah blah */
    let id = req.params.id;


    /****
         * https://stackabuse.com/:id/?page=2&limit=3

                queryParams = page & limit
                routeParams = id

                ********* WITHOUT EXPRESS ***************
                const url = require('url');
                const querystring = require('querystring');
                let rawUrl = 'https://stackabuse.com/?page=2&limit=3';
                let parsedUrl = url.parse(rawUrl);
                let parsedQs = querystring.parse(parsedUrl.query);

                this is how parsedQs object looks like 
                    {
                        page: '2',
                        limit: '3'
                    }
    **/

})

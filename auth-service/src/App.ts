
import * as express from 'express';

class App {

    public express;

    constructor() {
        this.express = express();
        this.mountMiddlewares();
        this.mountRoutes();
    }


    private mountRoutes(): void {
        const route = express.Router();

        route.get('/hello', (req, res) => {
            res.json({
                msg: 'That mean i will load all routes inside this function'
            })
        })

        this.express.use('/', route)
    }

    private mountMiddlewares() {
        this.express.use(function (req, res, next) {
            console.log("Hello world!")
            next()
        })
    }
}


export default new App().express;
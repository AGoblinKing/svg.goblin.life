import { HttpServer } from "http-server"

new HttpServer({
    root: './public'
}).listen(8080)

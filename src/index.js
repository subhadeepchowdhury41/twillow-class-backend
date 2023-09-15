"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const apollo_server_core_1 = require("apollo-server-core");
const resolvers_1 = require("./resolvers");
const mongo_1 = require("./utils/mongo");
const authChecker_1 = __importDefault(require("./utils/authChecker"));
const jwt_1 = require("./utils/jwt");
const cloudinary_1 = require("cloudinary");
const default_1 = require("../config/default");
const multer_1 = __importDefault(require("multer"));
const streamifier_1 = __importDefault(require("streamifier"));
const bootstrap = async () => {
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: resolvers_1.resolvers,
        authChecker: authChecker_1.default
    });
    const app = (0, express_1.default)();
    cloudinary_1.v2.config(default_1.cloudinaryConfig);
    const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
    app.post('/upload', upload.single('file'), async (req, res) => {
        if (!req.file) {
            console.error('File upload failed');
            return res.status(400).send('File upload failed.');
        }
        try {
            let folder;
            if (req.file.mimetype.startsWith('image'))
                folder = 'images';
            else if (req.file.mimetype.startsWith('video'))
                folder = 'videos';
            else
                folder = 'files';
            const result = cloudinary_1.v2.uploader.upload_stream({ resource_type: 'auto', folder: folder }, (error, result) => {
                if (error) {
                    console.error('Error uploading to Cloudinary:', error);
                    return res.status(500).send('Error uploading to Cloudinary.');
                }
                return res.json({ url: result.secure_url, type: result.resource_type });
            });
            streamifier_1.default.createReadStream(req.file.buffer).pipe(result);
        }
        catch (error) {
            console.error('Error uploading to Cloudinary:', error);
            return res.status(500).send('Error uploading to Cloudinary.');
        }
    });
    app.use((0, cookie_parser_1.default)());
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        context: (ctx) => {
            const context = ctx;
            console.log(ctx.req.headers.authorization);
            try {
                const user = (0, jwt_1.verifyJwt)(ctx.req.headers.authorization);
                context.user = user;
            }
            catch (e) {
                return context;
            }
            return context;
        },
        plugins: [
            process.env.NODE_ENV === 'production' ? (0, apollo_server_core_1.ApolloServerPluginLandingPageDisabled)() : (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()
        ]
    });
    await server.start();
    server.applyMiddleware({ app });
    app.listen(process.env.PORT || 4000, () => {
        console.log('server started on localhost:4000 ⚡⚡⚡');
    });
    (0, mongo_1.connectToDB)();
};
bootstrap();

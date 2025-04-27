"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    const ipAddress = req.ip;
    res.send(`Your IP address is: ${ipAddress}`);
});
app.post("/api/sum", (req, res) => {
    const { a, b } = req.body;
    console.log(a + b);
    res.json({
        sum: a + b,
    });
});
app.post("/api/addToHistory", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { reqMethod, reqUrl, reqBody, reqParams, reqHeaders } = req.body;
    let userId = req.get("postman-user-id");
    // console.log("userId",userId);
    if (userId) {
        const user = yield db_1.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                userHistory: true,
            },
        });
        if (!user) {
            yield db_1.prisma.user.create({
                data: {
                    id: userId,
                    userHistory: {
                        create: {
                            reqMethod,
                            reqUrl,
                            reqBody,
                            reqParams,
                            reqHeaders
                        },
                    },
                },
            });
        }
        else {
            yield db_1.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    userHistory: {
                        create: {
                            reqMethod,
                            reqUrl,
                            reqBody,
                            reqParams,
                            reqHeaders
                        },
                    },
                },
            });
        }
    }
}));
app.get("/api/getAllHistory", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.get("postman-user-id");
    if (userId) {
        const user = yield db_1.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                userHistory: true,
            },
        });
        console.log("user history: ", user === null || user === void 0 ? void 0 : user.userHistory);
        res.json(user === null || user === void 0 ? void 0 : user.userHistory);
    }
    else {
        res.send("There's no userId provided: " + userId);
    }
}));
app.listen(PORT, () => {
    console.log("app is listening on port: ", PORT);
});

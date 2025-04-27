import express from "express";
import cors from "cors";
import { prisma } from "./db";

const PORT = process.env.PORT ?? 3000;

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  const ipAddress = req.ip;
  res.send(`Your IP address is: ${ipAddress}`);
});
app.post("/api/sum", (req, res) => {
  const { a, b }: { a: number; b: number } = req.body;
  console.log(a + b);
  res.json({
    sum: a + b,
  });
});

app.post("/api/addToHistory", async (req, res) => {
  console.log(req.body);
  const { reqMethod, reqUrl, reqBody, reqParams, reqHeaders } = req.body;
  let userId = req.get("postman-user-id")
  // console.log("userId",userId);
  if (userId) {
    const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          userHistory: true,
        },
      });
    if(!user){
        await prisma.user.create({
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
    else{
        await prisma.user.update({
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
});
app.get("/api/getAllHistory", async (req, res) => {
const userId = req.get("postman-user-id");
  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        userHistory: true,
      },
    });
    console.log("user history: ", user?.userHistory);
    res.json(user?.userHistory);
  }
  else{
    res.send("There's no userId provided: "+userId)
  }
});

app.listen(PORT, () => {
  console.log("app is listening on port: ",PORT);
});

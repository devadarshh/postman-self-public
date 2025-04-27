import { useEffect, useState } from "react";
import axios from "axios";

import "react-json-view-lite/dist/index.css";
import { JsonViewer } from "@textea/json-viewer";
import { v4 as uuidv4 } from "uuid";
// api for testing
// https://jsonplaceholder.typicode.com/posts

interface req {
  reqMethod: string;
  reqUrl: string;
  reqBody: string;
  reqParams: string,
  reqHeaders: string
}
const backendUrl = import.meta.env.VITE_BACKEND_URL

export default function App() {
  const [method, setMethod] = useState("get");
  const [url, seturl] = useState("");
  const [body, setbody] = useState(``);
  const [response, setResponse] = useState("");
  const [headers, setHeaders] = useState("");
  const [params, setParams] = useState("");
  const [history, setHistory] = useState<req[]>([]);
  console.log("HISTORY: ",history);
  useEffect(() => {
   if(backendUrl){
    (async () => {
      const userId = localStorage.getItem("postman-user-id");
      if (userId) {
        const userHistory = await axios.get(`${backendUrl}/api/getAllHistory`, {
          headers: {
            "postman-user-id": userId,
          },
        });
        // if(userHistory.data.isString)
        // console.log(userHistory),setHistory([])
        // if(!userHistory.data.isString)

        setHistory(userHistory.data);
      }
    })();
   }
  }, []);

  const handleSubmit = async () => {
    let headersObj = {};
    let paramsObj = {};
    if (headers !== "") {
      headersObj = JSON.parse(headers);
    }
    if (params !== "") {
      paramsObj = JSON.parse(params);
    }
    if (method === "get") {
      const res = await axios.get(url, {
        params:{...paramsObj}, headers: { ...headersObj } });
      setResponse(JSON.stringify(res.data));
    }
    if (method === "post") {
      const res = await axios.post(url, JSON.parse(body), {
        params:{...paramsObj},
        headers: { ...headersObj },
      });
      setResponse(JSON.stringify(res.data));
    }
    if (method === "put") {
      const res = await axios.put(url, JSON.parse(body), {
        params:{...paramsObj},
        headers: { ...headersObj },
      })
      setResponse(JSON.stringify(res.data));
    }
    if (method === "patch") {
      const res = await axios.patch(url,JSON.parse(body), {
        params:{...paramsObj},
        headers: { ...headersObj },
      })
      setResponse(JSON.stringify(res.data));
    }
    if (method === "delete") {
      const res = await axios.delete(url,{
        params:{...paramsObj},
        headers: { ...headersObj },
      })
      setResponse(JSON.stringify(res.data));
    }
    let userId = localStorage.getItem("postman-user-id");
    if (!userId) {
      localStorage.setItem("postman-user-id", uuidv4());
      userId = localStorage.getItem("postman-user-id");
    }

    axios.post(
      `${backendUrl}/api/addToHistory`,
      {
        reqMethod: method,
        reqUrl: url,
        reqBody: body,
        reqParams: params,
        reqHeaders:headers
      },
      { headers: { "postman-user-id": userId } }
    );
  };

  if (response) {
    const x = JSON.parse(response);
    console.log("json: ", x);
  }
  return (
    <div className="flex w-screen bg-zinc-900 min-h-screen max-h-full justify-center">
      <div className="hidden w-1/4 bg-zinc-800 text-white  sm:flex flex-col items-center pt-4 space-y-4 px-2">
        <h1 className="text-xl font-bold ">History</h1>
        {history.length > 0 &&
          history.map((i, key) => (
            <ul
              className="flex space-x-4 bg-zinc-900 rounded-md  w-full  px-4 hover:bg-red-950 border border-black cursor-pointer"
              key={key}
              onClick={() => {
                setMethod(i.reqMethod);
                setbody(i.reqBody);
                seturl(i.reqUrl);
                setParams(i.reqParams);
                setHeaders(i.reqHeaders);
              }}
            >
              <li className="uppercase">{i.reqMethod}</li>
              <li className="px-1 overflow-x-hidden ">{i.reqUrl}</li>
            </ul>
          ))}
      </div>
      <div className="flex items-center space-y-8 flex-col w-full sm:w-3/4 py-12 justify-center ">
        <div className="flex text-white w-full sm:w-3/4 justify-center">
          <div className="border border-r-0 h-8 flex items-center  ">
            <select
              className="bg-transparent outline-none px-1 sm:px-4 "
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option className="options-style" value="get">
                GET
              </option>
              <option className="options-style" value="post">
                POST
              </option>
              <option className="options-style" value="put">
                PUT
              </option>
              <option className="options-style" value="patch">
                PATCH
              </option>
              <option className="options-style" value="delete">
                DELETE
              </option>
            </select>
          </div>
          <div className="border  h-8 w-full flex items-center">
            <input
              value={url}
              onChange={(e) => seturl(e.target.value)}
              className="px-4 bg-zinc-800 w-full outline-none border-none"
              type="text"
            />
          </div>
          <div>
            <button
              className="px-4  bg-zinc-900 border border-l-0 h-8 hover:bg-zinc-800"
              onClick={handleSubmit}
            >
              Send
            </button>
          </div>
        </div>

        <div className="w-full sm:w-3/4 flex items-center  flex-col">
          {/* <ul className="flex space-x-4 text-white py-4 ">
          <li className="lists-style">Params</li>
          <li className="lists-style">Authorization</li>
          <li className="lists-style">Headers</li>
          <li className="lists-style">Body </li>
          <li className="lists-style">Scripts </li>
          <li className="lists-style">Settings</li>
        </ul> */}
          <p className="text-white text-center mb-2 ">Query Params</p>
          <textarea
            className="w-full p-4 bg-zinc-800 border text-white mb-4"
            value={params}
            onChange={(e) => setParams(e.target.value)}
          ></textarea>
          <p className="text-white text-center mb-2 ">Headers</p>
          <textarea
            className="w-full p-4 bg-zinc-800 border text-white mb-4"
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
          ></textarea>
          <p className="text-white text-center mb-2 ">Request Body</p>
          <textarea
            className="w-full p-4 bg-zinc-800 border text-white"
            value={body}
            onChange={(e) => setbody(e.target.value)}
          ></textarea>
        </div>
        <div className="w-full sm:w-3/4 flex items-center  flex-col h-full">
          <p className="text-white mb-2">Response</p>
          {response ? (
            <div className="border p-2 bg-transparent w-full">
              <JsonViewer
                style={{ backgroundColor: "#27272a" }}
                theme="dark"
                value={JSON.parse(response) ?? { a: "b" }}
              />
            </div>
          ) : (
            <textarea className="w-full p-4 bg-zinc-800 border text-white "></textarea>
          )}
        </div>
      </div>
    </div>
  );
}

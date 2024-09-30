/******************************************************************************
 *
 *  __  __ _____  _____ ______ _____ _______ _____ _____  ________      __
 * |  \/  |_   _|/ ____|  ____|_   _|__   __/ ____|  __ \|  ____\ \    / /
 * | \  / | | | | (___ | |__    | |    | | | (___ | |  | | |__   \ \  / /
 * | |\/| | | |  \___ \|  __|   | |    | |  \___ \| |  | |  __|   \ \/ /
 * | |  | |_| |_ ____) | |     _| |_   | |  ____) | |__| | |____   \  /
 * |_|  |_|_____|_____/|_|    |_____|  |_| |_____/|_____/|______|   \/
 *
 *
 * Project: CHIKA DONATION PORTAL
 * Description: A simple web panel to collect and manage donation for messenger bot projects.
 *
 * Project Author: Tas33n (https://github.com/tas33n)
 * Script Author(express): Mero (https://github.com/meroitachi)
 *
 * Copyright © 2024 MISFITSDEV. All rights reserved.
 *
 * This code is the property of MISFITSDEV and is protected by copyright law.
 * Unauthorized copying, modification, distribution, or use of this code,
 * via any medium, is strictly prohibited without express written permission.
 *
 *****************************************************************************/

const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const CONFIG_GIST_URL = "";
const DEFAULT_CONFIG = {
    environment: "local",
    APP_NAME: "CHIKA DONATION PANEL",
    CDN_SRC: "https://cdn.jsdelivr.net/gh/meroitachi/chika-donation-alt@main",
    CDN_SRC2: "http://localhost:4000",
    APP_URL: "http://localhost:8787", // "http://127.0.0.1:8787",
    BOT_ID_NO: "1",
    BOT_API:
        "http://localhost:8000" /* "https://touka0x11-a0fc068a4b01.herokuapp.com"*/,
    BOT_APIKEY: "superad"
    //"8d8e8ca0d542ce666e816db0659dd067f72f213474ebfde73aea3b241e39f5"
};

let CONFIG;
async function fetchConfig(gistUrl) {
    try {
        const response = await axios.get(gistUrl);
        return response.data;
    } catch (error) {
        console.error("Error fetching config:", error);
        return null;
    }
}
async function initConfig() {
    const gistConfig = null; // await fetchConfig(CONFIG_GIST_URL);
    CONFIG = gistConfig || DEFAULT_CONFIG;
    console.log("Configuration initialized:", CONFIG);
}
let tokenStore = {};
function generateToken() {
    return crypto.randomBytes(20).toString("hex");
}
function serveHomePage(req, res) {
    const homeHtml = fs.readFileSync(
        path.join(__dirname, "index.html"),
        "utf8"
    );
    const updatedHtml = homeHtml.replaceAll(
        "{{app_base}}",
        CONFIG.environment === "production" ? CONFIG.CDN_SRC : CONFIG.CDN_SRC2
    );
    res.status(200).contentType("text/html").send(updatedHtml);
}

function serve404Page(req, res) {
    const errorHtml = fs.readFileSync(path.join(__dirname, "404.html"), "utf8");
    const updatedHtml = errorHtml.replaceAll(
        "{{app_base}}",
        CONFIG.environment === "production" ? CONFIG.CDN_SRC : CONFIG.CDN_SRC2
    );
    res.status(404).contentType("text/html").send(updatedHtml);
}

async function handleApiRequest(req, res) {
    const { api, id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }

    try {
        let apiUrl = null;

        switch (api) {
            case `me`:
                if (!["1", "2", "3"].includes(id)) {
                    res.status(404).json("This vot id not found");
                    return;
                }
                apiUrl = `${CONFIG.BOT_API}/web/api/me/${id}`;
                break;
            case "user":
                apiUrl = `${CONFIG.BOT_API}/web/api/user/${id}`;
                break;
            case "thread":
                apiUrl = `${CONFIG.BOT_API}/web/api/thread/${id}`;
                break;
            default:
                return res.status(404).json({ error: "Invalid API endpoint" });
        }

        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${CONFIG.BOT_APIKEY}`
            },
            timeout: 60000
        });

        res.status(200).json(response.data);
    } catch (error) {
        if (error.code === "ECONNABORTED") {
            res.status(504).json({ error: "Request timed out" });
        } else {
            console.error("Error fetching data:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
async function sendEMail(data) {
    const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
            user: "7cdde003@smtp-brevo.com", //Replace it with yours
            pass: "xsmtpsib-79c156bf9f84a83c96602d084410842da76d45764cdd7127bd8476795fcebd5-Q4Hhwn3t8NmbY7JT" //And this one too
        }
    });

    const mailOptions = {
        from: `"Chika's subscription" <meherab999plus@gmail.com>`, //your sender email and sender name
        to: data.to,
        subject: data.subject,
        html: data.content
    };
    const inf = await transporter.sendMail(mailOptions);
    return inf;
}
async function submitPaymentInfo(req, res) {
    const {
        email,
        uid,
        tid,
        trxid,
        packageName,
        senderNumber,
        amount,
        paymentMethod
    } = req.body;
    const token = generateToken();
    tokenStore[token] = { email, uid, tid };
    let mailConetnt = vpage(
        "other",
        email,
        uid,
        tid,
        trxid,
        senderNumber,
        paymentMethod,
        amount,
        packageName,
        null,
        null,
        token
    );

    const mailOptionss = {
        to: "meherabhosain7@gmail.com",
        //admin email address
        subject: "Request from user:" + email,
        content: mailConetnt
    };
    try {
        const ress = await sendEMail(mailOptionss);

        // const apiResponse = await axios.post(
        //             `${CONFIG.BOT_API}/sendmail`,
        //             mailOptionss,
        //             {
        //                 headers: {
        //                     Authorization: `Bearer superad`,
        //                     "Content-Type": "application/json"
        //                 }
        //             }
        //         );
        // if(apiResponse.data.status=="success"){
        if (ress) {
            res.status(200).json({
                status: "success",
                info: {
                    email: email,
                    paymentMethod: paymentMethod,
                    senderNumber: senderNumber,
                    trxid: trxid,
                    amount: amount,
                    packageName: packageName
                }
            });
        } else {
            res.status(500).json({
                status: "failed",
                message: "Request failed"
            });
        }
    } catch (error) {
        console.error("Error sending Request:", error);
        res.status(500).json({
            status: "failed",
            message: "Error sending request"
        });
    }
}

function vpage(
    type,
    email,
    uid,
    tid,
    trxid,
    senderNumber,
    paymentMethod,
    amount,
    packageName,
    message,
    status,
    token
) {
    const script1 = `
    <script>
      document.getElementById("btnn").addEventListener("click", async function () {
const userConfirm = confirm("Are you sure?");
let status, message;
if (userConfirm) {
status = "success";
message ="Congratulations! You are now one of Chika's ultimate users.";
} else {
status = "canceled";
message = "Sorry your request could not be processed";
}
try {
const response = await fetch("${CONFIG.APP_URL}/verify/payment-info",
{
method: "POST",
headers: {
Authorization: "Bearer superad",
"Content-Type": "application/json"
},
body: JSON.stringify({
email: "${email}",
uid: "${uid}",
tid: "${tid}",
trxid: "${trxid}",
senderNumber: "${senderNumber}",
paymentMethod: "${paymentMethod}",
amount: "${amount}",
packageName:
"${packageName}",
statuss: status,
messagee: message,
token: "${token}"
})
}
);

const data = await response.json();
if (status === "success" && data.status === "success") {
alert("Verified");
} else if (status === "canceled") {
alert("Canceled");
} else {
alert("failed");
}
} catch (error) {
alert(
"An error occurred while processing the request."
);
}
});
</script>
  `;

    let buttonmain;
    const button1 = `<a href="${
        CONFIG.APP_URL
    }/vinfo?token=${token}&email=${email}&packageName=${packageName.replace(
        /'/g,
        "%27"
    )}&amount=${amount}&senderNumber=${senderNumber}&trxid=${trxid}&paymentMethod=${paymentMethod}&uid=${uid}&tid=${tid}" class="btn-link" id="btnn" > Process Request</a>`;
    const button2 = `<a href="${
        CONFIG.APP_URL +
        (["failed", "canceled"].includes(status) ? "#packages" : "#supporters")
    }" class="btn-link">${
        status === "success" ? "You are in VIP list now" : "Try again"
    }</a>`;

    const button3 = `<button id="btnn" class="btn">Process Request
    </button>`;
    let mainscript;
    if (type === "forverify") {
        buttonmain = button3;
        mainscript = script1;
    } else if (type === "usern") {
    } else {
        buttonmain = button1;
    }

    const content = `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        background-color: #0f172a;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
        font-family: Arial, sans-serif;
        overflow-x: hidden;
      }
      .container {
        background-color: #1e293b;
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        width: 90%;
        max-width: 500px;
      }
      h1 {
        font-size: 28px;
        text-align: center;
        margin-bottom: 24px;
        color: #fbbf24;
      }
      pre {
        background-color: #334155;
        border: 1px solid #64748b;
        border-radius: 8px;
        padding: 15px;
        overflow-x: auto;
        white-space: pre-wrap;
        word-wrap: break-word;
        max-height: 300px;
        overflow-y: auto;
        font-size: 16px;
      }
      .key {
        color: #f87171;
        font-weight: bold;
      }
      .value {
        color: #86efac;
      }
      .btn-link {
            display: inline-block;
            background-color: #3B82F6;
            color: white;
            padding: 12px;
            border-radius: 6px;
            text-align: center;
            font-size: 18px;
            margin-top: 15px;
            width: 100%;
            text-decoration: none;
            transition: background-color 0.3s, transform 0.3s;
        }
        .btn-link:hover {
            background-color: #1D4ED8;
            transform: scale(1.02);
        }
        .btn {
        background-color: #3b82f6;
        color: white;
        padding: 12px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        width: 100%;
        text-align: center;
        font-size: 18px;
        margin-top: 15px;
        transition: background-color 0.3s, transform 0.3s;
      }
      .btn:hover {
        background-color: #1d4ed8;
        transform: scale(1.05);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>${
          type === "usern" ? "Chika Subscription Log" : "Request Overview"
      }</h1>
      <div class="json-container">
        <pre>
          <span class="key">{</span>
          ${
              type === "usern"
                  ? `
            <span class="key">"status"</span>: <span class="value">${status}</span>,
            <span class="key">"message"</span>: <span class="value">${message}</span>,
          `
                  : ""
          }
          <span class="key">"email"</span>: <span class="value">${email}</span>,
          <span class="key">"uid"</span>: <span class="value">${uid}</span>,
          <span class="key">"paymentMethod"</span>: <span class="value">${paymentMethod}</span>,
          <span class="key">"tid"</span>: <span class="value">${tid}</span>,
          <span class="key">"trxid"</span>: <span class="value">${trxid}</span>,
          <span class="key">"packageName"</span>: <span class="value">${decodeURIComponent(
              packageName
          )}</span>,
          <span class="key">"senderNumber"</span>: <span class="value">${senderNumber}</span>,
          <span class="key">"amount"</span>: <span class="value">${amount}</span>
          <span class="key">}</span>
        </pre>
      </div>
      ${buttonmain}
    </div>
    ${type === "forverify" ? mainscript : ""}
  </body>
  </html>`;

    return content;
}
async function verifyPaymentInfo(req, res) {
    const {
        email,
        uid,
        tid,
        trxid,
        senderNumber,
        paymentMethod,
        amount,
        packageName,
        statuss,
        messagee,
        token
    } = req.body;
    if (
        !email ||
        !uid ||
        !tid ||
        !trxid ||
        !senderNumber ||
        !paymentMethod ||
        !amount ||
        !packageName ||
        !statuss ||
        !token
    ) {
        res.json({ status: "canceled", message: "all info required" });
    } else {
        if (statuss !== "canceled") {
            try {
                const postData = {
                    trxid: trxid,
                    amount: amount,
                    packageName: packageName
                };

                const apiResponse = await axios.post(
                    `${CONFIG.BOT_API}/web/api/active/${uid}/${tid}`,
                    postData,
                    {
                        headers: {
                            Authorization: `Bearer ${CONFIG.BOT_APIKEY}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (apiResponse.data.status === "success") {
                    console.log(
                        token,
                        "check token verifypinfo",
                        tokenStore[token]
                    );
                    delete tokenStore[token];
                    res.json({
                        status: "success",
                        message: "The request was successful"
                    });
                } else {
                    delete tokenStore[token];
                    res.json({
                        status: "failed",
                        message: "The request failed"
                    });
                }
            } catch (error) {
                delete tokenStore[token];
                console.error("Error while trying to send request:", error);
                res.json({
                    status: "failed",
                    message: "The request failed"
                });
            }
        } else {
            delete tokenStore[token];
            res.json({ status: statuss, message: "Request canceled" });
        }

        let mailconetnt = vpage(
            "usern",
            email,
            uid,
            tid,
            trxid,
            senderNumber,
            paymentMethod,
            amount,
            packageName,
            messagee,
            statuss
        );
        const mailoptionss = {
            to: email, //client mail
            subject: "Chika's subscription status",
            content: mailconetnt
        };
        const ress = await sendEMail(mailoptionss);

        // const sendm = await axios.post(
        //             `${CONFIG.BOT_API}/sendmail`,
        //             mailoptionss,
        //             {
        //                 headers: {
        //                     Authorization: `Bearer superad`,
        //                     "Content-Type": "application/json"
        //                 }
        //             }
        //         );
    }
}

const serveAssets = async (req, res) => {
    const rfile = req.params[0];
    if (!rfile || rfile.length < 1) {
        res.status(400).json("filePath required");
        return;
    }
    try {
        const fullPath = path.resolve(`${__dirname}/../assets/${rfile}`);
        if (!fullPath.startsWith(path.resolve(`${__dirname}/../assets/`))) {
            return res.status(403).send("Access denied");
        }

        fs.stat(fullPath, (err, stats) => {
            if (err || !stats.isFile()) {
                return res.status(404).send("File not found");
            }
            res.sendFile(fullPath);
        });
    } catch (err) {
        res.status(500).json("Error");
        console.log(err);
    }
};
const checkAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        if (token === "superad") {
            next();
        } else {
            return res.status(403).json({ message: "Forbidden" });
        }
    } else {
        return res.status(403).json({ message: "Forbidden" });
    }
};
async function startServer() {
    await initConfig();
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get("/", serveHomePage);
    app.get("/assets/*", serveAssets);

    app.get("/api/:api/:id", handleApiRequest);
    app.get("/vinfo", (req, res) => {
        const {
            email,
            uid,
            tid,
            trxid,
            senderNumber,
            paymentMethod,
            amount,
            packageName,
            token
        } = req.query;
        if (
            !email ||
            !uid ||
            !tid ||
            !trxid ||
            !senderNumber ||
            !paymentMethod ||
            !amount ||
            !packageName
        ) {
            return res.status(400).json({ message: "All info required" });
        }

        if (!tokenStore[token] || !token) {
            return res.status(404).json({ message: "Not Found" });
        }
        const htcontent = vpage(
            "forverify",
            email,
            uid,
            tid,
            trxid,
            senderNumber,
            paymentMethod,
            amount,
            packageName,
            null,
            null,
            token
        );
        res.send(htcontent);
    });
    app.post("/submit/payment-info", submitPaymentInfo);
    app.post("/verify/payment-info", checkAuth, verifyPaymentInfo);
    app.use("*", serve404Page);
    const port = process.env.PORT || 8787;
    app.listen(port, () => {
        console.log(`Server is listening on port: ${port}`);
    });
}

startServer();

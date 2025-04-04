const http = require("http");
const fs = require("fs");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

const data = fs.readFileSync(`./dev-data/students.json`, "utf-8");
const studentData = JSON.parse(data);

const overviewTemplate = fs.readFileSync(`./templates/overview.html`, "utf-8");
const studentTemplate = fs.readFileSync(`./templates/student.html`, "utf-8");
const cardTemplate = fs.readFileSync(`./templates/card.html`, "utf-8");

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  // Static CSS
  if (pathname === "/style.css") {
    const css = fs.readFileSync(`${__dirname}/public/style.css`);
    res.writeHead(200, { "Content-Type": "text/css" });
    return res.end(css);
  }

  // Overview
  if (pathname === "/" || pathname === "/overview") {
    const cardsHtml = studentData.map(stu => replaceTemplate(cardTemplate, stu)).join("");
    const output = overviewTemplate.replace("{%STUDENT_CARDS%}", cardsHtml);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(output);
  }

  // Individual Student Page
  else if (pathname === "/student") {
    const student = studentData[query.id];
    if (!student) {
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("<h1>Student Not Found</h1>");
    }
    const output = replaceTemplate(studentTemplate, student);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(output);
  }

  // API
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(studentData));
  }

  // 404
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 Page Not Found</h1>");
  }
});

const PORT = process.env.PORT || 8000;
server.listen(8000, "127.0.0.1", () => {
  console.log("Server running at ",PORT);
});

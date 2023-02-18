const fs = require("fs");
// Dependencies
const express = require("express");
const fileUpload = require("express-fileupload");
// Configure & Run the http server
const app = express();
app.use(fileUpload());
app.use(express.static(__dirname, { dotfiles: "allow" }));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/upload", (req, res) => {
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send("No files were uploaded.");
	}

	const file = req.files.file;
	const filePath =
		"/home/azureuser/nodessl/.well-known/acme-challenge/" + file.name;

	file.mv(filePath, (err) => {
		if (err) {
			console.error(err);
			return res.status(500).send(err);
		}
		//console.log(file);

		res.send("File uploaded!").status(200);
	});
	//fs.createWriteStream(file.name,file.data);
	console.log(file);
	//res.send('File uploaded');
});

app.listen(80, () => {
	console.log("HTTP server running on port 80");
});

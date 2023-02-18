const { spawn } = require("child_process");
const fs = require("fs");
const fileUpload = require("./fileUpload");

/**
 *
 * @param {String} text Get verification text and file name using regex
 * @returns {String,null} If found it return text or null
 */
function extractStringFromText(text) {
	// Define the regular expression to match the target string
	const regex = /[A-Za-z0-9]+\.[A-Za-z0-9-]+/;

	// Match the regular expression against the input text
	const matches = text.match(regex);

	if (matches) {
		return matches[0];
	}

	return null;
}

/**
 *
 * @param {String} string Value to be written into file
 * @param {fs.PathLike} filePath Path where file needs to be stored Default it stored in same project folder
 */
function writeStringToFile(string, filePath) {
	fs.writeFileSync(filePath, string);
}

/**
 *
 * @param {String} domain Domain that needs SSL certificate
 * @param {String} tempServerIP IP address of server where domain is pointed
 */
async function certbot(domain, tempServerIP) {
	const certbotProcess = spawn("sudo", [    //Certbot Command
		"certbot",
		"certonly",
		"--manual",
		"-d",
		domain,
	]);
	certbotProcess.stdout.on("data", async (data) => {
		console.log(`stdout: ${data}`);
		data = data.toString();
		if (data.includes("Create")) {
			let val = extractStringFromText(data);
			let name = val.split(".");
			writeStringToFile(val, `${name[0]}`);
			console.log("Certbot verification file has been created");
			let status = await fileUpload.fileUploader(name[0], tempServerIP);
			if (status == false) {
				console.error("Error while uploading file to server");
				certbotProcess.kill("SIGINT");
			}
			console.log(
				"File has been uploaded to the destined server for verification"
			);
			certbotProcess.stdin.write("\n");
		}
	});
	certbotProcess.stderr.on("data", (data) => {
		console.error(`stderr: ${data}`);
	});

	// Handle the process exit
	certbotProcess.on("close", (code) => {
		console.log(`child process exited with code ${code}`);
		console.log(
			`Verification is complete and your cert file are stored in /etc/letsencrypt/archives/${domain}. Make sure to be sudo user to access these files`
		);
	});
}

module.exports = { certbot };

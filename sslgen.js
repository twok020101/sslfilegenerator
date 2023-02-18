const certbotProcess = require("./src/certbotRunner");
const pfxCreator = require("./src/pfxCrete");
// const process = require("process");

processName = process.argv[2]; //Name of the process that needs to run

/**
 * Main entry point of the program
 */
async function main() {
	switch (processName) {
		case "certfiles":
			let domainPointingIp = process.argv[3];
			let domain = process.argv[4];

			console.warn(
				"Please make sure you run the server node files before proceeding(Please refer documentation). Else you wont be able to generate SSL files"
			);

			console.warn(
				"Make sure you have installed certbot and openssl(If you want pfx) before you proceed"
			);

			console.warn("Make sure to run this program as sudo");

			certbotProcess.certbot(domain, domainPointingIp);
			break;
		case "pfxgenerate":
			let filePath = process.argv[3];
			const certificatePath = filePath + "/cert.pem";
			const privFilePath = filePath + "/priv.pem";
			let pfxFileName = "default";
			if (process.argv[4]) {
				pfxFileName = process.argv[4]; //If user provides pfx name else default
			}
			let password = "password";
			if (process.argv[5]) {
				password = process.argv[5];
			}
			pfxCreator.pfxCreator(
				certificatePath,
				privFilePath,
				password,
				pfxFileName
			);
			break;

		default:
			console.error("Command not found please refer the documentation");
			break;
	}
}

main();

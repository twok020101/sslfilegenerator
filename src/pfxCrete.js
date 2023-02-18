const { spawn } = require("child_process");
const fs = require("fs");

/**
 *
 * @param {fs.PathLike || String} certificatePath Path where certificate/fullchain file is saved
 * @param {fs.PathLike || String} privFilePath Path where private key file is saved
 * @param {String} password Password for pfx file
 * @param {String} pfxFileName Name for the pfx file
 * @returns {Boolean} Status of pfx file creation
 */
async function pfxCreator(
	certificatePath,
	privFilePath,
	password,
	pfxFileName
) {
	if (!fs.existsSync(certificate) || !fs.existsSync(privFilePath)) {
		//Check if both files exists
		return false;
	}
	const certificate = fs.readFileSync(certificatePath);
	const privateKey = fs.readFileSync(privFilePath);
	if (pfxFileName.split(".")[1] != "pfx") {
		let pfxFileName = pfxFileName + ".pfx";
	}

	const openssl = spawn("sudo", [
		//Run the ssl command
		"openssl",
		"pkcs12",
		"-export",
		"-in",
		certificate,
		"-inkey",
		privateKey,
		"-out",
		pfxFileName,
		"-passout",
		`pass:${password}`,
	]);
	openssl.stderr.on("data", (data) => {
		console.error(`openssl error: ${data}`);
	});

	openssl.on("close", (code) => {
		if (code === 0) {
			console.log(
				`PFX file created at ${pfxFile} . Please wait for 30 sec for file to show up`
			);
			return true;
		} else {
			console.error(`openssl exited with code ${code}`);
			return false;
		}
	});
}

module.exports = { pfxCreator };

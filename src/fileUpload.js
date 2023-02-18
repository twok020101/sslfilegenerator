const superagent = require("superagent");
const fs = require("fs");

/**
 *
 * @param {String} filename Filename that need to be uploaded to the server
 * @param {String} serverIp IP of the temp server where domain is currently pointed
 * @returns {Boolean} Status of the upload
 */
async function fileUploader(filename, serverIp) {
	const fileStream = fs.createReadStream(filename);
	let status = false;
	superagent
		.post(`http://${serverIp}/upload`)
		.attach("file", fileStream)
		.end((err, res) => {
			if (err) {
				console.error(err);
			}

			console.log(
				"File uploaded successfully to the server while domain is pointed"
			);
			if (res.status == 200) {
				status = true;
			}
		});
	return status;
}

module.exports = { fileUploader };

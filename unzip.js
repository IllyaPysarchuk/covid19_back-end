const {Parse} = require('unzipper');
const {createWriteStream, createReadStream, unlinkSync} = require('fs');
function downloadImage (pathName) {
    const name = pathName.slice(6, -4);
    const unzip = () => {

        const stream =
            createReadStream(pathName).pipe(Parse());

        return new Promise((resolve, reject) => {
            stream.on('entry', (entry) => {
                const writeStream =
                    createWriteStream(`files/${entry.path}`);
                return entry.pipe(writeStream);
            });
            stream.on('finish', () => resolve());
            stream.on('error', (error) => reject(error));
        });
    };


    (async () => {
        try {
            await unzip();
            await unlinkSync(pathName);
            await console.log(name + " unziped")

        } catch (err) {
            console.error(err);
        }
    })();
}downloadImage("files/covid19_by_settlement_dynamics.zip")
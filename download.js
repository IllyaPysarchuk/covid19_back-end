const Fs = require('fs')
const Path = require('path')
const Axios = require('axios')

async function downloadImage (url_name) {
    const url = url_name
    const urlname = url_name.slice(63);
    const path = Path.resolve(__dirname, 'files', urlname)
    const writer = Fs.createWriteStream(path)

    const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream'
    })

    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    }).then(() => {
        console.log(urlname + " downloaded")
        })
}
downloadImage('https://raw.githubusercontent.com/VasiaPiven/covid19_ua/master/covid19_by_area_type_hosp_dynamics.csv')
downloadImage('https://raw.githubusercontent.com/VasiaPiven/covid19_ua/master/covid19_by_settlement_actual.csv')
downloadImage('https://raw.githubusercontent.com/VasiaPiven/covid19_ua/master/covid19_by_settlement_dynamics.zip')

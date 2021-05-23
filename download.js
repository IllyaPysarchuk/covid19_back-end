const Fs = require('fs')
const Path = require('path')
const Axios = require('axios')

async function downloadImage (url_name) {
    const url = url_name
    const path = Path.resolve(__dirname, 'files', 'url_name.csv')
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
    })
}
downloadImage('https://raw.githubusercontent.com/VasiaPiven/covid19_ua/master/covid19_by_area_type_hosp_dynamics.csv')
downloadImage('https://raw.githubusercontent.com/VasiaPiven/covid19_ua/master/covid19_by_settlement_actual.csv')
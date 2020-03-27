function bodyParse(request) {

    return new Promise((resolve, reject) => {
        let totalData = '';

        request.on('data', chunk => {
            totalData += chunk;
        }).on('end', () => {
            request.body = JSON.parse(totalData); //el .body es un nombre propio podria ser = .cualquiercosa
            resolve();
        }).on('error', error => {
            console.log(error);
            reject();
        });
    })
}

module.exports = {
    bodyParse
};
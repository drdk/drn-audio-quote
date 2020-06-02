let config = {
    dev: {
        global:{
            TYPE:'Local development',
            DEBUGGING:true,
            ASSETS_PATH: './assets/'
        }
    },
    preprod: {
        global:{
            TYPE:'Staging',
            DEBUGGING:true,
            ASSETS_PATH: 'https://preprod.dr.dk/feature/audio-quote/assets/',
         },
        MINIFY:false,
        BASE_URL:'https://preprod.dr.dk/feature/audio-quote/',
    },
    prod: {
        global:{
            TYPE:'Production',
            DEBUGGING:false,
            ASSETS_PATH: 'https://www.dr.dk/feature/audio-quote/assets/',
        },
        MINIFY:true,
        BASE_URL: 'https://www.dr.dk/feature/audio-quote/',
    }
}
module.exports = config;
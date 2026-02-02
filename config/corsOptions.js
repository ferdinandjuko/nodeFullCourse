const whitelist = [
    'https://www.yoursite.com',
    'http:127.0.0.1:5500',
    'http://127.0.0.1:3500'
];

const corsOptions = {
    origin: (origin, callBack) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callBack(null, true)
        } else {
            callBack(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

export default corsOptions;

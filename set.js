const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUllQXFyVVhNVE56MzZCNXVLOC9xK1lkeE1XNFNicS8rRjlqSCsyZU5VVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidnBpU0VjQWNjQVZ5aGdodWp6a0NldGxLMDIvOTEzNHhVQUJ4eGhNK20xRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFQWJvWTN1aTJMNmVlUkZBaWFNaHh0MHZSREo0eFpwVXFFSG5wUkUwTDF3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2cmd5Y1NaUHlDQk9vUDdMQTBOaEp5SnJ5N2MxY1FEMS9SSElXMlAxMlVnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtOUzl3VUJ3UGVscFp1eEFxL1UyLzVWd2luVFFCOWFsSkRxUlU4UWtDMVk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZRUTRKTzNnWEZPemdQb2ZVTDNRWS9FaERKazg0cytBMk1WREtoNkwrbTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUp6Vmt3MmV6TmRzRjRtcFFmY2NMeGpCUEJqNU1zZDF5ZTNZK2hGc1gxWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUy9GcS9kYWZVci9GKzV0azVpVGR1VjVpS21CYzUzZERpZHVmb0pVRWpRcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iit4UHhoRU1pWEZyNUovMXdZZjViclVIVkxjR0c5OHBTNTNST2I1bHJCN0FuMm5SM1MxNDVTZ0orVVpsQVlaZ0F5WjFhY2JIUTJnZzhHZElmWG1jdUFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQyLCJhZHZTZWNyZXRLZXkiOiJZZXFWMVNEYmFpenlLeVBnZ01FT3oycU0wRTV2bDAvdjZQMFcyOEh2ZzE4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJhakJiMlZHR1FwS2tJRkk3U1g2bGpBIiwicGhvbmVJZCI6ImEzMDkyMWY5LTQxZmEtNGUwMy1hNjEyLTYzNWFiMjBiYjIxZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJdjFIQVFWRVdNREE2Q0dRNWJLaXBja05nM0E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0FCdjQzMkl1U3lnTWpJNUN5ZGlwVGhTVG9rPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjYyMUZMWEFOIiwibWUiOnsiaWQiOiIyMzQ3MDQ1NTA1MDk2OjkzQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMalo0ckVGRU9TUjRiUUdHQWNnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJaY09GWUJNODR0MlJ4N3NLUEZ2Y0h0OGZTUlF2QXNGaTFsNTl3b0wwdWxRPSIsImFjY291bnRTaWduYXR1cmUiOiJ5U2p4T3ZscGdLOU5XbVBWbkJmeEh0VTJhdUF6MnpaSFB6bzd3ZmVxMDE2RWI0NDdnTWIvbDZLMkwybFBoQi9yUlZnUDRtRVRFVUdqRU5Ia3BBdnNBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTGMrN3ZaQ0oxcFNEektiaXlJaFRFaE96ZUVhNGlHVTNUenZja2dLM1d4Rmh3Y0EvcDllUUp6RE9Jd3JVQ0VMK1pDa0ZHbStXRmN3aXZmWlBucnBkRFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ3MDQ1NTA1MDk2OjkzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldYRGhXQVRQT0xka2NlN0NqeGIzQjdmSDBrVUx3TEJZdFplZmNLQzlMcFUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjEyNTYxNzZ9',
    PREFIXE: process.env.PREFIX || ",",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUZJZStERERVWGtYZXlsSktvOEFTSHZhMEpyczhPNGJVVUN6b3N5VTRYZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRnlDanI5Wm5EZ3pabXVLS2UxUWg1TW4zOTM3UkZqQVZYcnZBNm5EVUlscz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4T0IybGJ5TVhxWElaekhmSnhxSHlwSlA0MDFiUEhtRFB0bWF1VXcvTDFZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsRmdGM0NRVi8yOWg4MnVHK1E5aU1nMTZhbExsUnpaNTZ4ZGk0MDN6YVV3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktOb1Jmak0rN1FSelVaN0Rwd3JDTUY3US9VeVBlR05sR3ZFaGhxNlk3Rlk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjA5Q2JJb0JEbXl3WlErdENreDhVRlVoVG82NVlFSDE0aUZ6RStDQndRQms9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0lYQ3JzeTFtYVh2V3IzMHN3blZLOTBGcUEyUEc2Wkt6eW5OTVhHRXFFWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibTBtRElzTk5aclBnMU9SN2w3RU0wdDZtdlhJK0x5UkVrekpEbEQ3TFp4az0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilk2aHdWa0lqUE5WMTRPckVGVHBLeWpMUU4rUkVNZzhoYXZXaXA3NlFPZVlieWZYWkhwTyszeFd4ckxOaEJ0RHo3QVorb01jMU1IeDJiQzAzUVd3dEFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzcsImFkdlNlY3JldEtleSI6IlYveEFZemlZdFloS0UzZFNSWkpURkMzcE80M2EwWW5mZzh3bTVldTNrVEU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkNBZkJpTVdqVEQyYzZZa01kSmlmRUEiLCJwaG9uZUlkIjoiNDAyMjA4MzItOGJkOS00OGI3LTkxZjgtYjQ1ZTBhZjNmYWU2IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFmSWJwQk05Y0lvMHJzRWU2L1RaRDZzaTVycz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0bDNyRFF5UWJQOTBiTllQTm9HbW9sUytlSUk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiN0wzWVdIR0YiLCJtZSI6eyJpZCI6IjkyMzE4OTQ5Mjk5NToyN0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUHZ0L004R0VKbUkxN2NHR0NrZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiM3o5L0paRFdlVDBhUU14WlpVQ3hkTmM5M0xoSWJpb3ZEaEc2RjRaU3RnZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiY2sxelFEWlpyblZtUFhwdU5pNzI5bEt0ZzJSblVXNU84S01WYVRvc1BKRFhhOUUySVhrRVZsZzdJeVhUU3JlaXJ4WFZNSUZJMXc0QUZiUVpqOEhYQlE9PSIsImRldmljZVNpZ25hdHVyZSI6InhEL1N1ZHNzdi9aU1JBRTB0OVJaWG9QVHA5OW1IbDEvMW00aUQyMnpuVHc2Q0VSK3gyMXJNc3AxSE9XUExiUi9iSUtVNm9EN3lEV09MQ2hJOGJUSEJ3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMTg5NDkyOTk1OjI3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmQ4L2Z5V1Exbms5R2tETVdXVkFzWFRYUGR5NFNHNHFMdzRSdWhlR1VyWUkifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjczODI1NjZ9',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "AWAIS IQBAL",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "923189492995",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "off",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'on',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0f089184835ed3d3b1f8c.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
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
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

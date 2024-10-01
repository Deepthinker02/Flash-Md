const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0JIN1AwajdiWUJiM3BaNVdQc1lRNDhENGFtNXdVS3pwd3ZST0M3S1ZrRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNU5CVXJHejlBaTFkOWlWOWlyYStSYjdDeksyWHpyT1R5bFVRdk1FSWpHST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5QnVub2hZSk1IQ3pZMWJia3EycjdLaWpOOTJoVEwzbjlPRDdmV3NLcUdzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZYnhsbVJQUERSem1WL1M2T01CU2hpT2JaNXBCc3RnN2VXcS9pRnU1RTBjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldHbWxVV0VoanBhbzVJMGFFb2ovMk1pZHJ6NDVzbjg3aFNZTXVpa0tJMjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9PK0xnZzVlbW45TENyUFd1WHBxSFFrc3ppMkJMZFNjaTNaZytQWjArbTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUtJWGlXSTcvbmtSWDFWcDBkK0tGbkQ1UmU5cG9zRjhiZUd2aGY3RGdXRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibGRtcU5YZzE5QXFqak8xK3ozR1Z6bVNNbm5DYTNHNFF2YnJodjZCSG1Gcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklDQXlHNkhHWDNiU3B3VnhQZUZRb3NkSE5zM3ZUUk1qbFdGKzhOSUlUeFkxRU05cExGWnltZitBbzN5VU1hOUNwV1FqSDB5ZmVldCszRWsyMHUzUkRRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjksImFkdlNlY3JldEtleSI6Inora2Y4RUNLamhiaGorVk9MMStOeDB6Y2tvVDlyNUltK083ZWYvYm1Wbnc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IktCZk9pR0lsUUlXMFhNNkc3Wk5UMmciLCJwaG9uZUlkIjoiMWNmN2I0ZTEtMmVjZC00NjVmLTgwM2UtODFkMjcwMThiOTcxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtmNnBTU2NiREFoMHE1WS9yVDg0bUhaYWNxMD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6L0R0REt5SEp2UWExQ3F4b0JLSXhaWHhaSWM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNE5SSktWVEYiLCJtZSI6eyJpZCI6IjkyMzE4OTQ5Mjk5NToyOUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUHZ0L004R0VMdlI3cmNHR0NzZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiM3o5L0paRFdlVDBhUU14WlpVQ3hkTmM5M0xoSWJpb3ZEaEc2RjRaU3RnZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiTnZ4ZHNjUXh5ZkdqSXQyK0JFK0thaDJtQTBWc25idWViWGYyRHRiTWlleG5Db1JMYXJvWFhpeENEaDJkVHZPTEtNRTNHMkhHQjhNQnJta0xyTWRRQUE9PSIsImRldmljZVNpZ25hdHVyZSI6InR5SmdHQndEc1RBTm9VeEdDQUZtc1RjbndBMk1PMmJUWnFEUW1YRklEcDBYWmk5MVJCN2lrUDMrVG80MEJmVjBYNk9DcFR5Qkl5NkJ1eldaZFAvN0R3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMTg5NDkyOTk1OjI5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmQ4L2Z5V1Exbms5R2tETVdXVkFzWFRYUGR5NFNHNHFMdzRSdWhlR1VyWUkifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjc3Njg3NzV9
    session: process.env.SESSION_ID || '',
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

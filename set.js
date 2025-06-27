
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0hBVzYrMGRkTHl4bHhRSmpwb2RiOTBoMjJqUER3bXR1bjVKbDhIQmhYZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMXJaK2NUeHhoV092Z1JxK0pxUG95THMzdWFiQ2dwNjUrRnk0ZlVGYUxsMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3RC9yYzZrazhPWFpvTVE5Y1dLNWsxWCtvQW9McjI1WE1wTUQySkNUTG5BPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5MXc5OE05ZmRyTlZaM3ZuV0dveHd3Yi9iMzZoYXVrcWYzR2NVODBlV1RzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndMci9NVVBOTC9ObHkvYVlIcCtnN3hPRjBFeVpsYlNRYk5HMFJLT2E4M2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjU0cWk1THg0Wmh4YnVmcm92bDkxV2hiZW5rVVROeEdlenNPRFVLNWpTbnM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUErbms5S3h6SDRuSTBOVDB5L2E3VHBFaHlmeWp6U2x5MkxDeCtWV2tVMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieTc1NHIyUVhJYVVSYWZWQ3hoYzBWczFUbldEL2Iva3hrYXFXVHlDQklYdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpQOUpnQXpIcFF5ejNIeWN6M1JYOG1lNXlVUU9tQTdrQ0srUUNhUzliakNHRWF2K0VNK3UzZ3dRcXZ6akhlQ0pXamhJWXFCZFl0eHlVZWx3d0JqUGlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDUsImFkdlNlY3JldEtleSI6Inc3UHE1RzBYM01YT1AzdmZ2TnhZWi9pQXd3WlBzSlhHbmJaaHN3L3B4M3M9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjMzNTQwMTkwOTYzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjMzODY2NjJEM0FEQ0U0NUMxRUQyNDE2OEExQ0QyQTA3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTEwMTk1NTR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzMzU0MDE5MDk2M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3OEY2REQ4RTY3Qjg5ODgxQzdDOUE4ODNCRUMwQTM0RiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxMDE5NTU3fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiIyTEU2Vkw1MiIsIm1lIjp7ImlkIjoiMjMzNTQwMTkwOTYzOjg5QHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ikl0J3MgUGxlbnR5IiwibGlkIjoiMzMwODYzNTA5NzQ5Ojg5QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTERNeXZjQkVJbmcrY0lHR0FjZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTWNTZy9PcTJOejlnQjhqYWdJeWZlZlU5WHBIV3kyZitreEQ2bWdWSGlXTT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVGIzR0NQbGQxY0JrdVdiMVphTEFHMmYwY2orazFjYjBMeEN1RmNVRWp6dEdKUHlVaC9PUXRCOWVNbVFZWDJHSXpWUDlPV2kvVlloN3FIZnVWREFoQmc9PSIsImRldmljZVNpZ25hdHVyZSI6IkVkR2QveEtySzI3bVl6Yml2MUk3MTJJYU5HNGRwWGcvM1prbXErZ0dqNnRoNVZadTF1RU41cTRGVFFPU200S3A0TFRpVGR5R0lQNVpZMGpSdTIxdWhBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjMzNTQwMTkwOTYzOjg5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlRIRW9QenF0amMvWUFmSTJvQ01uM24xUFY2UjFzdG4vcE1RK3BvRlI0bGoifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lBZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MTAxOTU0NCwibGFzdFByb3BIYXNoIjoibm0zQmIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQURKcSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "princetech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "233540190963",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BWB-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/ygvlzy.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'no',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

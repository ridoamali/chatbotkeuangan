const TelegramBot = require('node-telegram-bot-api'); //install dulu package ini
const { google } = require('googleapis'); //install dulu package ini

// Ganti dengan token bot Telegram Anda
const BOT_TOKEN = 'Your-data-sesuaikan-aja'; //isi dengan bot token kamu sendiri

// Ganti dengan ID spreadsheet Google Sheets Anda
const SPREADSHEET_ID = 'Your-data-sesuaikan-aja'; //isi dengan ID spreadsheet kamu

// Path ke file credentials.json
const CREDENTIALS_PATH = './credentials.json';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

async function authorize() {
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();

  return google.sheets({ version: 'v4', auth: client });
}

async function appendData(nominal, budget, keterangan) {
  const sheets = await authorize();

  // Mendapatkan nomor baris terakhir
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'A:A', // Kolom No. di spreadsheet
  });

  const values = response.data.values || [];
  const nextRow = values.length + 1; // Baris berikutnya

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: 'A1',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [[nextRow, nominal, budget, keterangan]],
    },
  });
}

function normalizeNominal(nominal) {
  let normalized = nominal.toLowerCase().replace(/[^0-9kjtrb]/g, ''); // Hapus karakter selain angka, k, j, t, rb

  if (normalized.includes('k')) {
    normalized = parseInt(normalized.replace('k', '')) * 1000;
  } else if (normalized.includes('jt')) {
    normalized = parseInt(normalized.replace('jt', '')) * 1000000;
  } else if (normalized.includes('rb')) {
        normalized = parseInt(normalized.replace('rb', '')) * 1000;
  } else {
    normalized = parseInt(normalized);
  }

  return normalized;
}

async function getSummary() {
  const sheets = await authorize();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'B2:B99', // Kolom Nominal atau yg mau di jumlahkan
  });

  const values = response.data.values || [];
  let total = 0;

  for (const row of values) {
    if (row[0]) {
      total += parseInt(row[0]);
    }
  }

  return total;
}

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  const parts = text.split(',');

  if (parts.length === 3) {
    const nominal = parts[0].trim();
    const budget = parts[1].trim();
    const keterangan = parts[2].trim();

    const normalizedNominal = normalizeNominal(nominal);

    try {
      await appendData(normalizedNominal, budget, keterangan);
      const summary = await getSummary();
      bot.sendMessage(chatId, `✅Data berhasil ditambahkan ke Google Spreadsheet. \nAnda telah memasukkan: \n💰${nominal}, \n🎯${budget}, \n📚${keterangan}\n\nTotal Pengeluaran: ${summary}`);
    } catch (error) {
      console.error('Error:', error);
      bot.sendMessage(chatId, '❌Terjadi kesalahan saat menambahkan data.');
    }
  } else {
    bot.sendMessage(chatId, 'Format salah🙅🏻‍♂️. Gunakan: Nominal, Budget, Keterangan. \nContoh: 4000, Es Teh, Beli Es Teh di jalan');
  }
});
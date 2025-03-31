CHAT BOT TELEGRAM - PENCATAT UANGKU

Ada dua versi cara menginstall source code ini.

---Via Desktop/Laptop---
Instal dulu Node JS dan NPM
\n Install juga Visual Studio Code
\n Lalu buka di visual studio code
Lengkapi dulu kredensial seperti Bot Token Telegram kamu.
Cara buat bot telegram dengan cari "Bot Father" di telegram, lalu ikuti arahannya sampai dapat Tokennya.
Lengkapi juga Spreadsheet ID dengan cara buat spreadsheet lalu setelah url /d/ itu adalah tokennya.
Buat juga credentials.json dengan cara di google cloud console, buat project, manage api & services, lalu create credentials lalu download credentials itu.
Setelah semua syarat terpenuhi,

ketik npm init -y
npm install

Lalu jalankan script ini dengan mengetik di terminal "node index.js" tanpa tanda petik ya.
Bot siap dipakai.
Kalau ingin bisa di akses secara luas alias Publik, harus siapin VPS.

---Install pakai android termux---
Hampir sama, cuma tidak pakai visual studio code dan dijalankan lewat aplikasi termux.
Kamu bisa install Node.js dan npm di terminal emulator Android dengan beberapa cara, tergantung pada environment yang kamu gunakan. Berikut adalah beberapa opsi:

1. Menggunakan Termux (Paling Populer)

Termux adalah terminal emulator yang powerful untuk Android. Ikuti langkah-langkah berikut:

Langkah 1: Install Termux

Download Termux dari F-Droid (lebih baik daripada versi Play Store karena tidak dibatasi):
	•	Link F-Droid

Langkah 2: Update dan Install Node.js

Buka Termux, lalu jalankan perintah berikut:

pkg update && pkg upgrade -y
pkg install nodejs -y

Ini akan menginstal Node.js beserta npm.

Langkah 3: Cek Versi

Setelah install selesai, cek apakah sudah terpasang dengan benar:

node -v
npm -v

Jika muncul versi Node.js dan npm, berarti sudah berhasil terinstall.

selamat mencoba.
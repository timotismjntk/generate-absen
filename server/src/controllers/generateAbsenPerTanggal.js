const {default: axios} = require('axios');
const fs = require('fs');
const FormData = require('form-data');

// constants
const {COOKIES, LIST_PEGAWAI, LIST_HARI, JENIS_ABSEN, generateRandomJam} = require('../constants')
const foto = "./server/src/assets/foto-absen/blank.png"

async function pushAbsen({tanggal, jam, jenis_absen, pegawai}) {
    const formattedTanggal = new Date(tanggal).toLocaleDateString('id', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).split('/'). reverse().join('-');

    const fd = new FormData();

    fd.append('skpd', '30_Dinas Komunikasi dan Informatika');
    fd.append('tanggal_absen', formattedTanggal);
    fd.append("jenis_absen", jenis_absen);
    fd.append('pegawais[' + pegawai.id + ']', pegawai.nama);
    fd.append('jam', jenis_absen === 'Absen Masuk' ? pegawai.nama === 'tks_28_Kamiluddin' ? '07:30' : jam : jam);
    fd.append('jams[' + pegawai.id + ']', jam);
    
    fd.append("berkas", fs.readFileSync(foto), "foto.png");
    
    return axios({
        method: 'post',
        url: 'https://absensi-ng.labura.go.id/absenmanualinput/buatbaru?token=%242y%2410%24EaYuBLaeQmOt.BIT67UQ9.%2Fl9Am.ghyXUudjnVLGEHlgS7S%2F7GusK',
        headers: {
            Cookie: Object.entries(COOKIES).map(([key, value]) => key + '=' + value + ';').join(''),
            'Content-Type': 'multipart/form-data', // Important to set the correct content type
        },
        data: fd,
    }).then(res => res.data)
}

// const tanggal = '2024-05-27';
// const harIni = LIST_HARI[new Date(tanggal).getDay()];

// if (harIni !== 'Minggu' || harIni !== 'Sabtu') {
//  if (harIni === 'Jumat') {
//     Promise.allSettled([
//         pushAbsen(tanggal, JENIS_ABSEN['Absen Masuk'].jenis),
//         pushAbsen(tanggal, JENIS_ABSEN['Absen Pulang'].jenis)
//     ]).then(result => {
//         console.log(result);
//     })
//  } else {
//     Promise.allSettled([
//         pushAbsen(tanggal, JENIS_ABSEN['Absen Masuk'].jenis),
//         pushAbsen(tanggal, JENIS_ABSEN['Absen Istirahat'].jenis),
//         pushAbsen(tanggal, JENIS_ABSEN['Absen Selesai Istirahat'].jenis),
//         pushAbsen(tanggal, JENIS_ABSEN['Absen Pulang'].jenis)
//     ]).then(result => {
//         console.log(result);
//     })
//  }
// } else {
//     console.log('Hari ini bukan hari kerja!!!!')
// }

module.exports = {
    pushAbsen,
}
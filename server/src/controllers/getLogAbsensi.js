const {default: axios} = require('axios');
const fs = require('fs');
const markup2json = (...args) => import('markup2json').then(({default: markup2json}) => markup2json(...args));
const {LIST_HARI} = require('../constants')

const {COOKIES} = require('../constants')

async function getLogAbsensi({bulan, pegawai}) {
    const fd = new FormData();

    Object.entries({
        bulan: bulan || '06-2024',
        skpd_id: 30,
        pegawai_id: pegawai.pegawai_id,
        jenis_pegawai: pegawai?.nama?.includes('pegawai') ? 'pegawai' : 'tks',
    }).forEach(([key, value]) => {
        fd.append(key, value);
    });

    const {data: {data}} = await axios({
        method: 'post',
        url: 'https://absensi-ng.labura.go.id/logabsen/getLogAbsensi?token=%242y%2410%24EaYuBLaeQmOt.BIT67UQ9.%2Fl9Am.ghyXUudjnVLGEHlgS7S%2F7GusK',
        headers: {
            Cookie: Object.entries(COOKIES).map(([key, value]) => key + '=' + value + ';').join(''),
            'Content-Type': 'multipart/form-data', // Important to set the correct content type
        },
        data: fd,
    });

    if (Array.isArray(data)) {
        return await Promise.all(data.map(async item => {
            if (item.length === 4) {
                const [tanggalHtml, listAbsenHtml] = item;
                const tanggalObject = await handleHtmlToJSON(tanggalHtml);
                const listAbsenObject = await handleHtmlToJSON(listAbsenHtml);
                const tanggal = tanggalObject?.children?.[0]?.text;

                if (tanggal.includes('Sabtu') || tanggal.includes('Minggu')) {
                    return null;
                } else {
                    const tanggalFormatted = tanggal.replace('Mei', 'May').replace('Agustus', 'August').replace('Oktober', 'October').replace('Desember', 'December');
                    return {
                        tanggal: tanggalFormatted,
                        listAbsen: listAbsenObject?.children ? listAbsenObject?.children?.map?.(el => ({
                            jenis_absen: el?.children?.[0]?.children?.[0]?.text,
                            jam: el?.children?.[1]?.children?.[0]?.text,
                            foto: el?.children?.[1]?.attributes?.href,
                        })) : [],
                    }
                }
            } else {
                return null;
            }
        }));
    } else {
        return {};
    }
}

function handleHtmlToJSON(html) {
    try {
        return markup2json(html);
    } catch (e) {
        // console.log('');
    }
}

module.exports = {
    getLogAbsensi
}
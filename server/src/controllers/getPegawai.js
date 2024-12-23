const {default: axios} = require('axios');
const markup2json = (...args) => import('markup2json').then(({default: markup2json}) => markup2json(...args));

const {COOKIES} = require('../constants')

async function getPegawai() {
    const fd = new FormData();

    Object.entries({
        skpd_id: 30,
    }).forEach(([key, value]) => {
        fd.append(key, value);
    });

    const {data} = await axios({
        method: 'post',
        url: 'https://absensi-ng.labura.go.id/absenmanualinput/checklistpegawai?token=%242y%2410%24EaYuBLaeQmOt.BIT67UQ9.%2Fl9Am.ghyXUudjnVLGEHlgS7S%2F7GusK',
        headers: {
            Cookie: Object.entries(COOKIES).map(([key, value]) => key + '=' + value + ';').join(''),
            'Content-Type': 'multipart/form-data', // Important to set the correct content type
        },
        data: {
            skpd: '30_Dinas Komunikasi dan Informatika',
            absenmanual_id: null
        },
    });

    const formatted = data.replaceAll('\n        \n            <tr>', '')
        .replaceAll('\n ', '').split('\n                ')
        .filter(el => el.length > 0).join();
    const listPegawai = await handleHtmlToJSON(`<div>${formatted}</div>`).catch(e => {});
    const processedListPegawai = listPegawai?.children?.[1]?.children?.find(el => el.tag === 'tbody')
        .children?.filter(el => el.children?.some(_el => _el.attributes?.type === 'checkbox'))

    return processedListPegawai?.map(el => {
        const pegawai = el.children?.find(_el => _el.attributes?.type === 'checkbox');

        return {
            nama: pegawai.attributes?.value,
            id: pegawai.attributes?.name?.replace(/[^0-9]/g, ''),
            pegawai_id: pegawai.attributes?.value?.replace(/[^0-9]/g, '')
        }
    });
}

function handleHtmlToJSON(html) {
    try {
        return markup2json(html);
    } catch (e) {
        // console.log('');
    }
}

module.exports = {
    getPegawai
}
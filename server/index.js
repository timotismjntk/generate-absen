const express = require('express')
const dayjs = require('dayjs');
dayjs.locale('id');
const cors = require('cors')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: true });

// controllers
const {getLogAbsensi} = require('./src/controllers/getLogAbsensi');
const {pushAbsen} = require('../server/src/controllers/generateAbsenPerTanggal');
const { JENIS_ABSEN, LIST_HARI } = require('./src/constants');
const { getPegawai } = require('./src/controllers/getPegawai');

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 8080

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/listAbsensi', async (req, res) => {
    const {bulan, pegawai} = req.body;
    const listAbsen = await getLogAbsensi({bulan, pegawai})

    res.status(200).json({
        status: 'success',
        message: 'list absen succesfully',
        data: listAbsen.filter(item => item !== null),
    });
})

app.post('/createAbsensi', async (req, res) => {
    const {tanggal, jam, jenis_absen, pegawai} = req.body;

    if (!dayjs(tanggal).isValid()) {
        res.status(500).json({
            status: 'error',
            message: 'cannot create absensi, because tanggal is not valid',
        })
    } else {
        if (jenis_absen in JENIS_ABSEN) {
            if (Object.keys(pegawai || {}).every(el => ['nama', 'id', 'pegawai_id'].includes(el))) {
                let result;
                if (LIST_HARI[new Date(tanggal).getDay()] === 'Jumat') {
                    if (jenis_absen === 'Absen Istirahat' || jenis_absen === 'Absen Selesai Istirahat') {
                        result = "Absen Jumat " + jenis_absen + " tidak bisa dilakukan karena waktu absen bukan dalam jam kerja."
                    } else {
                        result = await pushAbsen({tanggal, jam, jenis_absen, pegawai})
                    }
                } else {
                    result = await pushAbsen({tanggal, jam, jenis_absen, pegawai})
                }

                res.status(200).json({
                    status: 'success',
                    message: 'create absensi success',
                    data: result,
                });
            } else {
                res.status(500).json({
                    status: 'error',
                    message: 'cannot create absensi, because pegawai is not valid',
                })
            }
        } else {
            res.status(500).json({
                status: 'error',
                message: 'cannot create absensi, because jenis_absen is not valid',
            })
        }
    }
})

app.get('/getPegawai', async (req, res) => {
    const result = await getPegawai()

    res.status(200).json({
        status: 'success',
        message: 'get pegawai succesfully',
        data: result,
    });
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})
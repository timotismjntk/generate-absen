import React, { memo, useCallback, useState } from 'react'
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import './AbsensiList.css';
import { Pegawai } from '../App';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

type Item = {
    tanggal: string;
    listAbsen: {
        jenis_absen: string;
        jam: string;
        foto: string;
    }[]
};

export type Data = Item[]

const JENIS_ABSEN = [
    {
        jam: '07:30',
        jenis: 'Absen Masuk', 
    },
    {
        jam: '12:01',
        jenis: 'Absen Istirahat',
    },
    {
        jam: '13:01',
        jenis: 'Absen Selesai Istirahat',
    },
    {
        jam: '16:45',
        jenis: 'Absen Pulang',
    },
]

const LIST_HARI = {
    0: 'Minggu',
    1: 'Senin',
    2: 'Selasa',
    3: 'Rabu',
    4: 'Kamis',
    5: 'Jumat',
    6: 'Sabtu'
};

function GenerateAbsensi({item, pegawai, refresh}: {item: Item; pegawai: Pegawai | null; refresh(): Promise<void>}) {
    const [loading, setLoading] = useState(false);

    function generateRandomJam(jenis_absen: string, hari: string) {
        let startHour, startMinute, endHour, endMinute;
        
        switch (jenis_absen) {
            case 'Absen Upacara':
                startHour = 7; startMinute = 0;
                endHour = 7; endMinute = 30;
                break;
            case 'Absen Masuk':
                startHour = 7; startMinute = 0;
                endHour = 7; endMinute = 30;
                break;
            case 'Absen Istirahat':
                startHour = 12; startMinute = 0;
                endHour = 12; endMinute = 29;
                break;
            case 'Absen Selesai Istirahat':
                startHour = 12; startMinute = 31;
                endHour = 12; endMinute = 59;
                break;
            case 'Absen Pulang':
                if (hari === 'Jumat') {
                    startHour = 12; startMinute = 0;
                    endHour = 14; endMinute = 0;
                } else {
                    startHour = 16; startMinute = 45;
                    endHour = 18; endMinute = 0;
                }
                break;
            default:
                throw new Error('Invalid jenis_absen');
        }
    
        const start = startHour * 60 + startMinute;
        const end = endHour * 60 + endMinute;
        const randomTime = Math.floor(Math.random() * (end - start + 1)) + start;
    
        const newHour = Math.floor(randomTime / 60);
        const newMinute = randomTime % 60;
    
        const formattedTime = `${String(newHour).padStart(2, '0')}:${String(newMinute).padStart(2, '0')}`;
        return formattedTime;
    }
    
    

    const generateAbsensi = useCallback(async () => {
        try {
            if (pegawai === null) {
                alert('Gagal melakukan generate absen');
                return;
            }

            setLoading(true);
            const listAbsen = item.listAbsen;

            const res = await Promise.all([...Array(4)].map((_, index) => {
                if (listAbsen[index]?.jam === undefined) {
                    const isAbsenUpacara = Boolean(LIST_HARI[new Date(item.tanggal).getDay()] === 'Senin' && JENIS_ABSEN[index].jenis === 'Absen Masuk');
                    return {
                        jenis_absen: isAbsenUpacara ? 'Absen Upacara' : JENIS_ABSEN[index].jenis,
                        foto: undefined,
                        jam: generateRandomJam(isAbsenUpacara ? 'Absen Upacara' : JENIS_ABSEN[index].jenis, LIST_HARI[new Date(item.tanggal).getDay()]),
                    }
                } else {
                    return listAbsen[index];
                }
            }).filter(el => el.foto === undefined).map(async el => {
                return axios({
                    url: 'http://localhost:8080/createAbsensi',
                    method: 'post',
                    data: {
                        tanggal: item.tanggal,
                        jenis_absen: el.jenis_absen,
                        pegawai: pegawai,
                        jam: el.jam,
                    }
                })
            }))

            setLoading(false);
            if (res.every(el => el.data.status === 'success')) {
                toast.success('Berhasil melakukan generate absen', );
                setTimeout(() => {
                    refresh();
                }, 500)
            } else {
                alert('Gagal melakukan generate absen');
            }
        } catch (e) {
            setLoading(false);
            alert(e.message)
        }
    }, [item, refresh, pegawai]);

    if (item.listAbsen.every(el => el === undefined || el.foto === undefined) || item.listAbsen.some(el => el === undefined || el.foto === undefined)) {
        if (item.tanggal?.includes("Jum'at") && item.listAbsen?.[0]?.foto && item.listAbsen?.[3]?.foto) {
            return <td/>
        }

        return (
            <td>
                {loading ? (
                    <ClipLoader color={"#000"} loading={true} size={35} />
                ) : (
                    <button onClick={() => generateAbsensi()}>Generate Absensi</button>
                )}
            </td>
        )
    } else {
        return <td/>
    }
}

export default memo(function AbsensiList({data, pegawai, refresh}: {data: Data; pegawai: Pegawai | null; refresh(): Promise<void>}) {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Hari/Tanggal</th>
                        <th>Jam Masuk</th>
                        <th>Jam Keluar Istirahat</th>
                        <th>Jam Selesai Istirahat</th>
                        <th>Jam Pulang</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(entry => (
                        <tr key={entry.tanggal}>
                            <td className="tanggal">{entry.tanggal}</td>
                            {[...Array(4)].map((_, index) => {
                                const absen = entry.listAbsen[index];
                                return (
                                    <td key={index}>
                                        {(absen && absen.foto) ? (
                                            <div className="small-text">
                                                <img src={absen.foto} alt="Foto" />
                                                <div>{absen.jam}</div>
                                            </div>
                                        ) : !(entry.tanggal?.includes("Jum'at") && (index === 1 || index === 2)) && (
                                            <div className="small-text">belum absen</div>
                                        )}
                                    </td>
                                );
                            })}
                            <GenerateAbsensi item={entry} refresh={refresh} pegawai={pegawai} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      );
})

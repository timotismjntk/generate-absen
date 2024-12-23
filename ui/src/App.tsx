import React, {useEffect, useState} from 'react'
import AbsensiList, { type Data } from './components/AbsensiList';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import Select from 'react-select';
import { ToastContainer } from 'react-toastify';
import dayjs from 'dayjs';
import { MonthPicker, MonthInput } from 'react-lite-month-picker';

import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export type Pegawai = {nama: string; id: string; pegawai_id: string}

export default function App() {
  const [selectedPegawai, setSelectedPegawai] = useState<{value: Pegawai; label: string} | null>(null);
  const [dataPegawai, setDataPegawai] = useState<Pegawai[]>([]);
  const [data, setData] = useState<Data>([]);
  const [selectedMonthData, setSelectedMonthData] = useState({
    month: dayjs().format('MM'),
    year: dayjs().format('YYYY'),
  });
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [loadingDataPegawai, setLoadingDataPegawai] = useState(false);
  const [loading, setLoading] = useState(false);

  async function getDataPegawai() {
    try {
      setLoadingDataPegawai(true);
      const {data: {data: res}} = await axios('http://localhost:8080/getPegawai', {
        method: "GET",
      })
      
      setDataPegawai(res)
      setLoadingDataPegawai(false)
    } catch (e) {
      alert(e?.message);
      setLoadingDataPegawai(false)
    }
  }  

  async function getData() {
    try {
      setLoading(true);
      const {data: {data: res}} = await axios('http://localhost:8080/listAbsensi', {
        method: "post",
        data: {
          bulan: (Number(selectedMonthData.month) > 9 ? '' + selectedMonthData.month : '0' + selectedMonthData.month) + '-' + selectedMonthData.year,
          pegawai: selectedPegawai?.value,
        }
      })

      setData(res)
      setLoading(false)
    } catch (e) {
      console.log(e);
      setLoading(false)
    }
  }

  const handleSelectChange = (selectedPegawai) => {
    setSelectedPegawai(selectedPegawai);
  };

  useEffect(() => {
    getDataPegawai()
  }, [])

  useEffect(() => {
    if (selectedPegawai) {
      getData();
    }
  }, [selectedPegawai, selectedMonthData]);

  return (
    <div className="app-container">
      {loading && (
        <div className="loading-container">
          <ClipLoader color={"#000"} loading={true} size={35} />
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Select
          value={selectedPegawai}
          isLoading={loadingDataPegawai}
          onChange={handleSelectChange}
          options={dataPegawai.map(item => ({ value: item, label: item.nama?.replace(/[0-9]/g, '').replace('pegawai', '').replace('tks', '').replace(/[^\p{L}\d\s]+/gu, '') }))}
          placeholder="Cari Pegawai"
          isClearable
          styles={{
            control: (provided) => ({
              ...provided,
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 10,
              width: 500, // Adjust the width as needed
            }),
            menu: (provided) => ({
              ...provided,
              width: 500, // Adjust the width as needed
            }),
          }}
        />
      </div>
      <div style={{ marginTop: '16px' }}>
          <MonthInput
            selected={selectedMonthData}
            setShowMonthPicker={setIsPickerOpen}
            showMonthPicker={isPickerOpen}
            size="small"
            style={{width: '500px'}}
          />
          {isPickerOpen ? (
            <MonthPicker
              setIsOpen={setIsPickerOpen}
              selected={selectedMonthData}
              onChange={setSelectedMonthData}
              size="small"
            />
          ) : null}
        </div>
      <AbsensiList data={data} refresh={getData} pegawai={selectedPegawai?.value || null} />
      <ToastContainer />
    </div>
  )
}
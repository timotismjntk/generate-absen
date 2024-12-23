const COOKIES = {
    cf_clearance: '4nYrJX7WPGUTQUkEjuco1I.P81IkcW6L4rsT4fQeRQA-1716965520-1.0.1.1-RBqdtEQPgP2Nnhe3Bgtnj_WDUZJDxlVoC8lmm96jX0Tm7uToLWOy9iqvRmqPQ59JdZbc7tCkn6n8Xb6wJ6cOdA',
    ci_session: '6049cbd4af080fd5c6bf73751dd88726b47cf3ef',
    labura_layanan_app_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNDI4MyIsIm5hbWEiOiJUaW1vdGl1cyBTaW1hbmp1bnRhayIsInVzZXJuYW1lIjoiMTMxNjA3ODgxMzE2MDc4OCIsInJvbGVzIjpbeyJkb21haW4iOm51bGwsInJvbGVfaWQiOm51bGx9LHsiZG9tYWluIjpudWxsLCJyb2xlX2lkIjoiMSJ9LHsiZG9tYWluIjoiYWJzZW5zaS1uZy5sYWJ1cmEuZ28uaWQiLCJyb2xlX2lkIjoiMSJ9LHsiZG9tYWluIjoiYWdlbmRhLmxhYnVyYS5nby5pZCIsInJvbGVfaWQiOiI0In0seyJkb21haW4iOiJhZ2VuZGFzdXJhdC5sYWJ1cmEuZ28uaWQiLCJyb2xlX2lkIjoiMyJ9LHsiZG9tYWluIjoiYXNldHRpay5sYWJ1cmEuZ28uaWQiLCJyb2xlX2lkIjoiMSJ9LHsiZG9tYWluIjoic2ltcGtrLmxhYnVyYS5nby5pZCIsInJvbGVfaWQiOiIxIn0seyJkb21haW4iOiJidXJzYWtlcmphLmxhYnVyYS5nby5pZCIsInJvbGVfaWQiOiIxIn0seyJkb21haW4iOiJkYXRhZHByZC5sYWJ1cmEuZ28uaWQiLCJyb2xlX2lkIjoiMSJ9LHsiZG9tYWluIjoiZG5zYW5hbGl0aWsubGFidXJhLmdvLmlkIiwicm9sZV9pZCI6IjEifSx7ImRvbWFpbiI6ImRva3RlcmhlYmF0LmxhYnVyYS5nby5pZCIsInJvbGVfaWQiOiIxIn0seyJkb21haW4iOiJkcml2ZS5sYWJ1cmEuZ28uaWQiLCJyb2xlX2lkIjoiMiJ9LHsiZG9tYWluIjoiZWtpci5sYWJ1cmEuZ28uaWQiLCJyb2xlX2lkIjoiMSJ9LHsiZG9tYWluIjoiZ2FqaWt1LmxhYnVyYS5nby5pZCIsInJvbGVfaWQiOiIxIn0seyJkb21haW4iOiJoYWxvZGFta2FyLmxhYnVyYS5nby5pZCIsInJvbGVfaWQiOiIxIn0seyJkb21haW4iOiJpa20ubGFidXJhLmdvLmlkIiwicm9sZV9pZCI6IjEifSx7ImRvbWFpbiI6ImpkaWgubGFidXJhLmdvLmlkIiwicm9sZV9pZCI6IjEifSx7ImRvbWFpbiI6ImxheWFuYW4ubGFidXJhLmdvLmlkIiwicm9sZV9pZCI6IjEifSx7ImRvbWFpbiI6ImxpbmtkZXMubGFidXJhLmdvLmlkIiwicm9sZV9pZCI6IjEifSx7ImRvbWFpbiI6Im5vdGlmLmxhYnVyYS5nby5pZCIsInJvbGVfaWQiOiIxIn0seyJkb21haW4iOiJwZW5nZXRhaHVhbi5sYWJ1cmEuZ28uaWQiLCJyb2xlX2lkIjoiMiJ9LHsiZG9tYWluIjoicGVuamVsYWphaC5sYWJ1cmEuZ28uaWQiLCJyb2xlX2lkIjoiMSJ9LHsiZG9tYWluIjoicy5sYWJ1cmEuZ28uaWQiLCJyb2xlX2lkIjoiMSJ9LHsiZG9tYWluIjoic2liYWR1LmxhYnVyYS5nby5pZCIsInJvbGVfaWQiOiIxIn0seyJkb21haW4iOiJzaWRhaGFuaWt1dC5sYWJ1cmEuZ28uaWQiLCJyb2xlX2lkIjoiMSJ9LHsiZG9tYWluIjoic2lrZWxpbmdpbmRhaC5sYWJ1cmEuZ28uaWQiLCJyb2xlX2lkIjoiMSJ9LHsiZG9tYWluIjoic2lrZXBhbmcubGFidXJhLmdvLmlkIiwicm9sZV9pZCI6IjEifSx7ImRvbWFpbiI6InNpbXBlcm5hcy5sYWJ1cmEuZ28uaWQiLCJyb2xlX2lkIjoiMSJ9LHsiZG9tYWluIjoic3BiZS5sYWJ1cmEuZ28uaWQiLCJyb2xlX2lkIjoiMiJ9LHsiZG9tYWluIjoidHRlLmxhYnVyYS5nby5pZCIsInJvbGVfaWQiOiIyIn0seyJkb21haW4iOiJ0dWdhcy5sYWJ1cmEuZ28uaWQiLCJyb2xlX2lkIjoiMSJ9LHsiZG9tYWluIjoidW1rbS5sYWJ1cmEuZ28uaWQiLCJyb2xlX2lkIjoiMSJ9LHsiZG9tYWluIjoid2lzYXRhLmxhYnVyYS5nby5pZCIsInJvbGVfaWQiOiIxIn0seyJkb21haW4iOiJzaW5va2FiLmxhYnVyYS5nby5pZCIsInJvbGVfaWQiOiIzIn0seyJkb21haW4iOiJoZWxwZGVzay5sYWJ1cmEuZ28uaWQiLCJyb2xlX2lkIjoiMiJ9XSwic2twZF9pZCI6IjMwIiwibmFtYV9vcGQiOiJEaW5hcyBLb211bmlrYXNpIGRhbiBJbmZvcm1hdGlrYSIsInN0YXJ0X3Rva2VuIjoiMjAyNC0wNS0yOSAwNjo1MTo0MCIsImplbmlzX3BlZ2F3YWkiOiJ0a3MiLCJqZW5pc191c2VyIjoidGtzIiwidG9rZW4iOiIkMnkkMTAkRWFZdUJMYWVRbU90LkJJVDY3VVE5LlwvbDlBbS5naHlYVXVkam5WTEdFSGxnUzdTXC83R3VzSyJ9.n8vp4vvNqIjxepv3E_Thn8N_2IW4a5vuTcWZTJRXU8g",
}

const LIST_PEGAWAI = {
    'edy': {
        nama: 'tks_1_Edy Kurniawan',
        id: 1,
        pegawai_id: 1,
    },
    'wak_kamil': {
        nama: 'tks_28_Kamiluddin',
        id: 57,
        pegawai_id: 28,
    },
    'timo': {
        nama: 'tks_4283_Timotius Simanjuntak',
        id: 72,
        pegawai_id: 4283,
    },
}

function generateRandomJam(jam) {
    const [hour, minute] = jam.split(':').map(Number);
    const randomMinute = Math.floor(Math.random() * 30); // Generate random minute between 0 and 29
    const randomTime = `${hour}:${minute + randomMinute}`;
    return randomTime;
}

const JENIS_ABSEN = {
    'Absen Upacara': {
        jam: generateRandomJam('07:30'),
        jenis: 'Absen Upacara',
    },
    'Absen Masuk': {
        jam: generateRandomJam('07:30'),
        jenis: 'Absen Masuk', 
    },
    'Absen Istirahat': {
        jam: generateRandomJam('12:01'),
        jenis: 'Absen Istirahat',
    },
    'Absen Selesai Istirahat': {
        jam: generateRandomJam('13:01'),
        jenis: 'Absen Selesai Istirahat',
    },
    'Absen Pulang': {
        jam: generateRandomJam('16:31'),
        jenis: 'Absen Pulang',
    },
}

const LIST_HARI = {
    0: 'Minggu',
    1: 'Senin',
    2: 'Selasa',
    3: 'Rabu',
    4: 'Kamis',
    5: 'Jumat',
    6: 'Sabtu'
};

module.exports = {
    COOKIES,
    LIST_PEGAWAI,
    JENIS_ABSEN,
    LIST_HARI,
    generateRandomJam,
}
import { useEffect, useState } from 'react'
import axios from 'axios'

const usePut = (url ,body) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const BASE_URL = 'http://localhost:3005/api/v1'
    useEffect(() => {
        const putData = async () => {
            setLoading(true)
            const headers = {};
            const user = JSON.parse(localStorage.getItem("user"))
            headers.authorization = `Bearer ${user?.token}`;
            const configOptions = {
                headers,
            };
            try {
                const res = await axios.put(`${BASE_URL}${url}`,body, configOptions)
                setData(res.data);
            } catch (err) {
                setError(err)
            }
            setLoading(false)
        }
        putData();
    }, [])

    return { data, loading, error }
};

export default usePut
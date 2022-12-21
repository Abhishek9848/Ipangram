import { useEffect, useState } from 'react'
import axios from 'axios'

const usePost = (url, body) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const BASE_URL = 'http://localhost:3005/api/v1'
    useEffect(() => {
        const postData = async () => {
            setLoading(true)
            const headers = {};
            const user = JSON.parse(localStorage.getItem("user"))
            headers.authorization = `Bearer ${user?.token}`;
            const configOptions = {
                headers,
            };
            try {
                const res = await axios.post(`${BASE_URL}${url}`, body, configOptions)
                setData(res.data);
            } catch (err) {
                setError(err)
            }
            setLoading(false)
        }
        postData();
    }, [])

    return { data, loading, error }
};

export default usePost
import {useEffect , useState} from 'react'
import axios from 'axios'

const useFetch =(url) =>{
    const [data , setData] = useState([])
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)
    const BASE_URL = 'http://localhost:3005/api/v1'
    const headers = {};
    const user = JSON.parse(localStorage.getItem("user"))
    headers.authorization = `Bearer ${user?.token}`;
    const configOptions = {
        headers,
    };
    useEffect(() =>{
        const fetchData = async () =>{
            setLoading(true)
            
            try{
                const res = await  axios.get(`${BASE_URL}${url}`,configOptions)
                setData(res.data);
            }catch(err){
                setError(err)
            }
            setLoading(false)
        }
        fetchData();
    },[])

    const reFetch = async ()=>{
        setLoading(true);
        try{
            const res = await axios.get(`${BASE_URL}${url}`, configOptions);
            setData(res.data);
        }catch(err){
            setError(err);
        }
        setLoading(false);
    }; 

    return { data , loading, error , reFetch}
};

export default useFetch
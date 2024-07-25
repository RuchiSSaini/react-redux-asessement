import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import {setData } from '../store/appSlice';

const FetchJSON : React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try
            {
                const response = await fetch('/data/assessment-data.json');
                const result = await response.json();
                dispatch(setData(result));
            }
            catch(error)
            {
                console.error(" Failed to fetch data from json file ", error);
            }
        };

        fetchData();
    }, [dispatch]);

    return null;
}

export default FetchJSON;
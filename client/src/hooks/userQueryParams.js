import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


const Hook = () => {
    const [queryParams, setQueryParams] = useState({});
    const { search } = useLocation();

    useEffect(() => {
        let qry = {};
        let urlParams = new URLSearchParams(search);
        urlParams.forEach((value, key) => {
            qry[key] = value;
        });
        setQueryParams(qry);
    }, [search]);

    return {
        queryParams,
        search
    }
}

export default Hook;
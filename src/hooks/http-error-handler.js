import { useState, useEffect } from "react";

export default httpClient => {
    const [error, setError] = useState(null);

    const reqInterceptor = httpClient.interceptors.response.use(req => {
        setError(null)
        return req;
    });
    
    const resInterceptor = httpClient.interceptors.response.use(res => res, error => {
        setError(error)
    });
    
    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.request.eject(resInterceptor);
        };
    }, [reqInterceptor, resInterceptor, httpClient]);
    
    const errorConfirmHandler = () => {
        setError(null);
    };

    return [error, errorConfirmHandler];
};

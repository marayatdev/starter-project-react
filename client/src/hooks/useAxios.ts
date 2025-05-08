import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export function useAxios<T = any>(
    config: AxiosRequestConfig,
    dependencies: any[] = []
) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        let cancel = false;

        const fetchData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token'); // หรือใช้จาก context ก็ได้
                const finalConfig: AxiosRequestConfig = {
                    ...config,
                    headers: {
                        ...(config.headers || {}),
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                };

                const response: AxiosResponse<T> = await axios(finalConfig);

                if (!cancel) {
                    setData(response.data);
                    setError(null);
                }
            } catch (err) {
                if (!cancel) {
                    setError(err);
                    setData(null);
                }
            } finally {
                if (!cancel) setLoading(false);
            }
        };

        fetchData();
        return () => {
            cancel = true;
        };
    }, dependencies);

    return { data, error, loading };
}

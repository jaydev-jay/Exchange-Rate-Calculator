import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`https://api.frankfurter.app/latest?from=${currency}`)
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => console.error("Error fetching data:", err));
    }, [currency]);

    return data;
}

export default useCurrencyInfo;

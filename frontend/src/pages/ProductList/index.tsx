import { useEffect, useState } from 'react'
import { Table } from '../../components/Table';
import {api} from '../../services/api'

interface Product {
    _id: string;
    name: string;
    type: string;
    price: number;
}
interface ResponsePagenation {
    totalItems: number;
    items: Product[]
}

export function ProductList() {
    const [responsePagenation, setResponsePagenation] = useState<ResponsePagenation>()
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState<number>(1);

    
    useEffect(() => {
        api.get("products?page=" + String(page) + "&limit=" + String(limit)).then(response => {
            setResponsePagenation(response.data);
        })
    }, [page])

    function handlePagination(value: number){
        if (page <= 0) {
            setPage(1)
            return;
        }
        setPage(page + value)
    }

    return(
        <>
        {responsePagenation && <Table product={responsePagenation.items}/>}
        <button onClick={() => handlePagination(-1)}>{`<`}</button>
        <button  onClick={() => handlePagination(+1)}>{`>`}</button>
        
        </>
    )
}
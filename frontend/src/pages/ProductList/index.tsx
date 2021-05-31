import { useEffect, useState } from 'react'
import { Table } from '../../components/Table';
import {api} from '../../services/api'

interface Product {
    _id: string;
    name: string;
    type: string;
    price: number;
}

export function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        api.get("products").then(response => {
            setProducts(response.data);
            
        })
    }, [])

    return(
        <>
        {products && <Table product={products}/>}
            
        
        </>
    )
}
import { useEffect, useState } from 'react'
import { Input } from '../../components/Input';
import { Table } from '../../components/Table';
import { api } from '../../services/api'

interface Product {
    _id: string;
    name: string;
    type: string;
    price: number;
}

interface ResponsePagination {
    totalItems: number;
    items: Product[]
}

export function ProductList() {
    const [responsePagination, setResponsePagination] = useState<ResponsePagination>()
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState<number>(1);
    const [inputFilterByName, setInputFilterByName] = useState('')
    const [pages, setPages] = useState<number[]>();

    useEffect(() => {
        api.get("products?page=" + String(page) + "&limit=" + String(limit) + "&name=" + inputFilterByName).then(response => {
            setResponsePagination(response.data);
        })
    }, [page, inputFilterByName])

    useEffect(() => {
        setPage(1);
    }, [inputFilterByName])

    useEffect(() => {
        const totalItems = responsePagination?.totalItems || 0;
        const numberOfPages = Math.ceil(totalItems / limit)
        const listPages: number[] = [];

        for (let i = 1; i < numberOfPages; i++) {
            listPages.push(i);
        }
        setPages(listPages);

    }, [responsePagination])

    return (
        <>
            <Input
                value={inputFilterByName}
                onChange={(event) => {
                    setInputFilterByName(event.target.value)
                }}
            />
            <h1>{inputFilterByName}</h1>
            {responsePagination && <Table product={responsePagination.items} />}
            {pages && pages.map(pageNumber => <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}>
                {pageNumber}</button>)}

        </>
    )
}
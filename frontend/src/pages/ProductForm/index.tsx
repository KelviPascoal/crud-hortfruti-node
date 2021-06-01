import { FormEvent, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button } from '../../components/Button'
import { Input } from '../../components/Input/index'
import { api } from '../../services/api';

interface Product {
    _id: string
    name: string;
    type: string;
    price: number;
}

export function ProductForm() {
    const params: any = useParams();

    const [nameValue, setNameValue] = useState('');
    const [typeValue, setTypeValue] = useState('');
    const [priceValue, setPriceValue] = useState('');

    useEffect(() => {
        async function loadInputs() {
            await api.get('products/' + params.id).then(response => {
                const product: Product = response.data;
                setNameValue(product.name)
                setTypeValue(product.type)
                setPriceValue(String(product.price))
            })
        }
        loadInputs()
    }, [params.id])

    async function HandleSave(event: FormEvent) {
        event.preventDefault()
        if (params.id) {
            if (!nameValue || !typeValue || !priceValue) {
                alert('preencha todos os campos')
            }

            const product = {
                name: nameValue,
                type: typeValue,
                price: Number(priceValue)
            }
            console.log(product);

            await api.put('products/' + params.id, product).then(response => {
                console.log("asdasdasdsadsadsadassda" + response.data);
            })
            return
        }


        if (!nameValue || !typeValue || !priceValue) {
            alert('preencha todos os campos')
        }

        const product = {
            name: nameValue,
            type: typeValue,
            price: Number(priceValue)
        }
        console.log(product);

        await api.post('products/', product).then(response => {
            console.log("asdasdasdsadsadsadassda" + response.data);

        })
    }

    return (
        <>
            <form onSubmit={HandleSave} >
                <Input value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)} />

                <Input value={typeValue}
                    onChange={(e) => setTypeValue(e.target.value)} />

                <Input value={priceValue}
                    onChange={(e) => setPriceValue(e.target.value)} />

                <Button type="submit">Salvar</Button>

            </form>

        </>
    )
}
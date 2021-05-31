import { ButtonHTMLAttributes } from "react";

interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export function Button(props: Button) {
    const {...rest} = props;
    return(
        <button  {...rest}></button>
    )
}
import { InputHTMLAttributes } from "react";

interface Input extends InputHTMLAttributes<HTMLInputElement> {
}

export function Input(props: Input) {
    const {...rest} = props;
    return(
        <input  {...rest}/>
    )
}
import { Link } from "react-router-dom"

export function Header() {

    return (
        <header>
            <Link to="/cadastro"><button>Cadastrar Produto</button></Link>
            <Link to="/"><button>lista</button></Link>
        </header>
    )
}
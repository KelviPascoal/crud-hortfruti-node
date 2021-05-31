import {Route, Switch} from 'react-router-dom';
import { ProductList } from '../pages/ProductList';
import { ProductForm } from '../pages/ProductForm';
 function Routes() {
    return(
        <Switch>
        <Route path="/" exact component={ProductList}/>
        <Route path="/cadastro" component={ProductForm}/>
        <Route path="/editar/:id" component={ProductForm}/>
        </Switch>
    )
}

export default Routes;

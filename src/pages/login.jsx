import { Link, useRouteError } from "react-router-dom";
import { Button } from 'antd';
const LoginPage = () => {
    return(
        <>
        <div>Login page</div>
            <Button type="primary">
                <Link to="/">
                    <span>Back to homepage</span>
                </Link>
            </Button>
        </>
        
    );
}

export default LoginPage;
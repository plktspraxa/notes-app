const { Navigate, Outlet } = require("react-router-dom")
const { token } = require("./token")

const ProtectedRoute = ({children, redirectPath = '/login'}) => {
    if(!token.getToken()){
        return <Navigate to={redirectPath} replace/>
    }else {
        return children? children: <Outlet/>;
    }
}

export default ProtectedRoute;
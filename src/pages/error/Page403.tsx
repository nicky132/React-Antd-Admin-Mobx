import {Button, Result} from "antd";
import {useHistory} from "react-router-dom";

export function Page403() {
    let history = useHistory()
    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary" onClick={() => {
                history.push('/')
            }}>Back Home</Button>}
        />
    )
}

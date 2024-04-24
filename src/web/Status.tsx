import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap";
import { Navigate, useLocation, useNavigate } from "react-router-dom"

export const Status = () => {
    type user = {
        userId?:number
        userEmail?:string
        userPw?:string
        userPhone?:string
        userWhen?:string
        userAlarmEmail?:boolean
        userAlarmSms?:boolean
        userAlarmKakao?:boolean
    }
    const location = useLocation();
    const navigator = useNavigate();
    const [user, setUser] = useState<any>();
    const [userList, setUserList] = useState<any>();

    useEffect(() => {
        setUser(location.state.data.result.data.user);
        setUserList(location.state.data.result.data.userList);
    },[location])

    return (
    <div>
       <p>접속자 이메일 : {user?.userEmail}</p>
       <p>접속자 비밀번호 : {user?.userPw}</p>
       <p>접속자 전화번호 : {user?.userPhone}</p>
       <Button onClick={() => navigator("/")}>이전으로 돌아가기</Button>
       <Table striped bordered hover>
      <thead>
        <tr>
          <th>index</th>
          <th>Email</th>
          <th>Password</th>
          <th>Phone</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {userList?.map((user:any, index:number) => (
          <tr key={user?.userId}>
            <td>{user?.userId}</td>
            <td>{user?.userEmail}</td>
            <td>{user?.userPw}</td>
            <td>{user?.userPhone}</td>
            <td>{user?.userWhen}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
);
}
export default Status
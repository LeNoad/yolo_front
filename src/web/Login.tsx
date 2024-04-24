import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export const Login = () => {

    type reqLoginUserDto = {
        userEmail: string,
        userPw: string
    }
    const API_IP = process.env.REACT_APP_API_IP;
    const navigator = useNavigate();
    const [reqLoginUserDto, setReqLoginUserDto] = useState<reqLoginUserDto>({ userEmail: '', userPw: '' });

    const handleInputChange = (e: any) => {
        setReqLoginUserDto({
            ...reqLoginUserDto,
            [e.target.name]: e.target.value,
        });
    };
    const handleLogin = () => {
        axios.post(API_IP+'/api/test/v2', reqLoginUserDto).then((data: any) => {
            if (data.data.result.data.loginCheck) {
                alert('로그인 성공')
                navigator("/status", { state: { data: data.data } })
            } else {
                alert('로그인 실패')
            }
        });
    };

    return (
        <Container className="d-flex justify-content-center">
            <Row>
                <Col xs={12} md={12} >
                    <h1>테스트용 로그인</h1>    
                </Col>
                <Col xs={12} md={12} >
                    <Form.Control type="email" name="userEmail" placeholder="로그인 이메일" onChange={(e: any) => handleInputChange(e)}/>
                </Col>
                <Col xs={12} md={12}>
                    <Form.Control type="password" name="userPw" placeholder="비밀번호" onChange={(e: any) => handleInputChange(e)} />
                </Col>
                <Col xs={6} md={6}>
                    <Button onClick={() => handleLogin()} className="w-100">로그인</Button>
                </Col>
                <Col xs={6} md={6}>
                    <Button onClick={() => navigator("/register")} className="w-100">회원가입</Button>
                </Col>
            </Row>
        </Container>
    );
}
export default Login
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import qs from 'qs';
import { useNavigate } from "react-router-dom";
export const Register = () => {
    const navigator = useNavigate();
    const [registerCheck, setRegisterCheck] = useState<boolean>(false);
    type userRegisterDto = {
        userEmail: string,
        userPw: string,
        userPhone: string,
        userWhen: string,
        userAlarmEmail: boolean,
        userAlarmSms: boolean,
        userAlarmKakao: boolean,
    }
    const [userRegisterDto, setUserRegisterDto] = useState<userRegisterDto>({ userEmail: '', userPw: '', userPhone: '', userWhen: '', userAlarmEmail: false, userAlarmSms: false, userAlarmKakao: false });
    const handleInputChange = (e: any) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setUserRegisterDto({
            ...userRegisterDto,
            [e.target.name]: value,
        });

    };
    const handleRegister = () => {
        if (registerCheck) {
            axios.post("http://127.0.0.1:8080/api/test/v3", userRegisterDto).then((data: any) => {
                console.log(data)
                alert('회원가입 성공')
                navigator("/")
            })
        } else {
            alert("아이디 중복 체크 해주시길 바랍니다.")
        }
    }
    const handleEmailCheck = () => {
        axios.post("http://127.0.0.1:8080/api/test/v1", userRegisterDto).then((data: any) => {
            if (!data.data.result.data) {
                alert('중복된 아이디가 존재하지 않습니다.');
                setRegisterCheck(true);
            } else {
                alert('중복된 아이디가 존재 합니다.')
                setRegisterCheck(false);
            }
        })
    }
    return (
        <Container>
            <Row>
                <Col xs={12} md={12} >
                    <h1>테스트용 로그인</h1>    
                </Col>
                <Col xs={6} md={6} >
                    <Form.Control type="email" name="userEmail" placeholder="로그인 이메일" onChange={(e: any) => handleInputChange(e)} />
                </Col>
                <Col xs={6} md={6}>
                    <Button variant="success" onClick={() => handleEmailCheck()}>아이디 중복 체크</Button>
                </Col>
                <Col xs={12} md={12}>
                    <Form.Control type="password" name="userPw" placeholder="비밀번호" onChange={(e: any) => handleInputChange(e)} />
                </Col>
                <Col xs={12} md={12}>
                    <Form.Control type="text" name="userPhone" placeholder="핸드폰번호" onChange={(e: any) => handleInputChange(e)} />
                </Col>
                <Col xs={6} md={6}>
                    <Form>
                        <Form.Check type="checkbox" name="userAlarmEmail" onChange={(e: any) => handleInputChange(e)} label="이메일 알람" />
                        <Form.Check type="checkbox" name="userAlarmSms" onChange={(e: any) => handleInputChange(e)} label="SMS 알람" />
                        <Form.Check type="checkbox" name="userAlarmKakao" onChange={(e: any) => handleInputChange(e)} label="카카오 알람" />
                    </Form>
                </Col>
                <Col xs={6} md={6}>
                    <Button variant="success" onClick={() => handleRegister()}>회원가입</Button>
                </Col>
            </Row>
        </Container>
    );
}
export default Register;
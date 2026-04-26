import { useState } from 'react';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register({ username, password, email });
            alert('회원가입 성공! 로그인 해주세요.');
            navigate('/login');
        } catch (err) {
            alert('회원가입 실패: ' + err.response?.data?.message || '오류 발생');
        }
    };

    return (
        <div>
            <h2>회원가입</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="아이디"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br />
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br />
                <button type="submit">회원가입</button>
            </form>
            <p>이미 계정이 있나요? <a href="/login">로그인</a></p>
        </div>
    );
}

export default Register;
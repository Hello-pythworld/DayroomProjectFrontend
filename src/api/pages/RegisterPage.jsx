import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axios';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axiosInstance.post('/api/auth/register', {
                username,
                password,
                email,
            });
            alert('회원가입 성공! 로그인해주세요.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || '회원가입에 실패했습니다.');
        }
    };

    return (
        <div>
            <h2>회원가입</h2>
            <input
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleRegister}>회원가입</button>
            <p>이미 계정이 있으신가요? <Link to="/login">로그인</Link></p>
        </div>
    );
}

export default RegisterPage;
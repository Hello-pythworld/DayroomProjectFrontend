import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axios';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axiosInstance.post('/api/auth/login', {
                username,
                password,
            });
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            setError('아이디 또는 비밀번호가 틀렸습니다.');
        }
    };

    return (
        <div>
            <h2>로그인</h2>
            <input
                placeholder="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            /><br />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /><br />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleLogin}>로그인</button>
            <p>계정이 없으신가요? <Link to="/register">회원가입</Link></p>
        </div>
    );
}

export default LoginPage;
import { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ username, password });
            localStorage.setItem('token', res.data);
            alert('로그인 성공!');
            navigate('/');
        } catch (err) {
            alert('로그인 실패: ' + err.response?.data?.message || '오류 발생');
        }
    };

    return (
        <div>
            <h2>로그인</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
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
                <button type="submit">로그인</button>
            </form>
            <p>계정이 없나요? <a href="/register">회원가입</a></p>
        </div>
    );
}

export default Login;
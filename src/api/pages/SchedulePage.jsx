import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';

function SchedulePage() {
    const [schedules, setSchedules] = useState([]);
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    const fetchSchedules = async () => {
        try {
            const res = await axiosInstance.get('/api/schedules');
            setSchedules(res.data);
        } catch (err) {
            console.error('일정 불러오기 실패:', err);
        }
    };

    useEffect(() => {
        fetchSchedules();
    }, []);

    const handleSubmit = async () => {
        if (!title || !startTime || !endTime) {
            alert('제목과 시간을 입력해주세요.');
            return;
        }
        try {
            if (editId) {
                await axiosInstance.put(`/api/schedules/${editId}`, {
                    title, startTime, endTime,
                });
                setEditId(null);
            } else {
                await axiosInstance.post('/api/schedules', {
                    title, startTime, endTime,
                });
            }
            setTitle('');
            setStartTime('');
            setEndTime('');
            fetchSchedules();
        } catch (err) {
            alert('저장 실패!');
        }
    };

    const handleEdit = (schedule) => {
        setEditId(schedule.id);
        setTitle(schedule.title);
        setStartTime(schedule.startTime);
        setEndTime(schedule.endTime);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('삭제할까요?')) return;
        try {
            await axiosInstance.delete(`/api/schedules/${id}`);
            fetchSchedules();
        } catch (err) {
            alert('삭제 실패!');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <h2>내 일정</h2>
            <button onClick={handleLogout}>로그아웃</button>

            <hr />

            <h3>{editId ? '일정 수정' : '일정 등록'}</h3>
            <input
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            /><br />
            <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
            /><br />
            <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
            /><br />
            <button onClick={handleSubmit}>
                {editId ? '수정 완료' : '등록'}
            </button>
            {editId && (
                <button onClick={() => {
                    setEditId(null);
                    setTitle('');
                    setStartTime('');
                    setEndTime('');
                }}>취소</button>
            )}

            <hr />

            <h3>일정 목록</h3>
            {schedules.length === 0 ? (
                <p>등록된 일정이 없어요.</p>
            ) : (
                schedules.map((s) => (
                    <div key={s.id} style={{ border: '1px solid #ccc', margin: '8px', padding: '8px' }}>
                        <strong>{s.title}</strong><br />
                        <span>{s.startTime} ~ {s.endTime}</span><br />
                        <button onClick={() => handleEdit(s)}>수정</button>
                        <button onClick={() => handleDelete(s.id)}>삭제</button>
                    </div>
                ))
            )}
        </div>
    );
}

export default SchedulePage;
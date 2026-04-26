import { useState, useEffect } from 'react';
import { getSchedules, createSchedule, updateSchedule, deleteSchedule } from '../api/schedule';
import { useNavigate } from 'react-router-dom';

function Schedule() {
    const [schedules, setSchedules] = useState([]);
    const [form, setForm] = useState({ title: '', description: '', date: '', startTime: '', endTime: '' });
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            const res = await getSchedules();
            setSchedules(res.data);
        } catch (err) {
            alert('인증이 필요합니다.');
            navigate('/login');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateSchedule(editId, form);
                setEditId(null);
            } else {
                await createSchedule(form);
            }
            setForm({ title: '', description: '', date: '', startTime: '', endTime: '' });
            fetchSchedules();
        } catch (err) {
            alert('오류 발생: ' + err.response?.data?.message || '다시 시도해주세요.');
        }
    };

    const handleEdit = (schedule) => {
        setEditId(schedule.id);
        setForm({
            title: schedule.title,
            description: schedule.description,
            date: schedule.date,
            startTime: schedule.startTime,
            endTime: schedule.endTime
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('삭제하시겠습니까?')) return;
        try {
            await deleteSchedule(id);
            fetchSchedules();
        } catch (err) {
            alert('삭제 실패');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>📅 내 일정</h2>
                <button onClick={handleLogout}>로그아웃</button>
            </div>

            <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input placeholder="제목" value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                <input placeholder="설명" value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })} />
                <input type="date" value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                <input type="time" value={form.startTime}
                    onChange={(e) => setForm({ ...form, startTime: e.target.value })} required />
                <input type="time" value={form.endTime}
                    onChange={(e) => setForm({ ...form, endTime: e.target.value })} required />
                <button type="submit">{editId ? '수정 완료' : '일정 추가'}</button>
                {editId && <button type="button" onClick={() => { setEditId(null); setForm({ title: '', description: '', date: '', startTime: '', endTime: '' }); }}>취소</button>}
            </form>

            {schedules.length === 0 ? (
                <p>등록된 일정이 없습니다.</p>
            ) : (
                schedules.map((s) => (
                    <div key={s.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px', marginBottom: '10px' }}>
                        <h3>{s.title}</h3>
                        <p>{s.description}</p>
                        <p>📆 {s.date} | ⏰ {s.startTime} ~ {s.endTime}</p>
                        <button onClick={() => handleEdit(s)}>수정</button>
                        <button onClick={() => handleDelete(s.id)} style={{ marginLeft: '8px', color: 'red' }}>삭제</button>
                    </div>
                ))
            )}
        </div>
    );
}

export default Schedule;
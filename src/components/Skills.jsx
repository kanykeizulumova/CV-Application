import { useState, useEffect } from 'react'
import Input from './Input';

export default function Skills({ onClose, addSkillsInfo, data }) {
    const [formData, setFormData] = useState({
        id: data?.id || '',
        skills: data?.skills || '',
    });

    useEffect(() => {
        if (data) {
            setFormData({
                id: data.id || '',
                skills: data.skills || '',
            });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.skills.trim()) {
            addSkillsInfo(formData);
        }
    };

    const handleAddAnother = () => {
        if (formData.skills.trim()) {
            addSkillsInfo(formData);
            setFormData({
                skills: '',
            });
        }
    };
    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <h2>Skills</h2>
                <Input label="Skills" name='skills' value={formData.skills} onChange={handleChange} type="text" />
                <button type='button' onClick={handleAddAnother}> + Add another</button>
                <button type='submit'>Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}

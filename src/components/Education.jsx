import { useState, useEffect } from 'react'
import Input from './Input';

export default function Education({ onClose, addEducationInfo, data }) {
    const [formData, setFormData] = useState({
        id: data?.id || '',
        school: data?.school || '',
        degree: data?.degree || '',
        startDate: data?.startDate || '',
        graduationYear: data?.graduationYear || '',
        city: data?.city || '',
    });

    useEffect(() => {
        if (data) {
            setFormData({
                id: data.id || '',
                school: data.school || '',
                degree: data.degree || '',
                startDate: data.startDate || '',
                graduationYear: data.graduationYear || '',
                city: data.city || '',
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
        if (formData.degree.trim() && formData.school.trim() && formData.startDate.trim() && formData.graduationYear.trim() && formData.city.trim()) {
            addEducationInfo(formData);
        }
    };

    const handleAddAnother = () => {
        if (formData.degree.trim() && formData.school.trim() && formData.startDate.trim() && formData.graduationYear.trim() && formData.city.trim()) {
            addEducationInfo(formData);
            setFormData({
                school: '',
                degree: '',
                startDate: '',
                graduationYear: '',
                city: '',
            });
        }
    };
    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <h2>Education</h2>
                <Input label="Name of school/ institution" name='school' value={formData.school} onChange={handleChange} type="text" />
                <Input label="Degree(s)" name='degree' value={formData.degree} onChange={handleChange} type="text" />
                <Input label="Start Date" name='startDate' value={formData.startDate} onChange={handleChange} type="date" />
                <Input label="Graduation year" name='graduationYear' value={formData.graduationYear} onChange={handleChange} type="date" />
                <Input label="Location (City, State)" name='city' value={formData.city} onChange={handleChange} type="text" />
                <button type='button' onClick={handleAddAnother}> + Add another</button>
                <button type='submit'>Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}


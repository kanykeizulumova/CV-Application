import { useState, useEffect } from 'react'
import Input from './Input';

export default function General({ addGeneralInfo, onClose, data, setIsPreviewVisible }) {
    const [formData, setFormData] = useState({
        id: data?.id || '',
        firstName: data?.firstName || '',
        lastName: data?.lastName || '',
        email: data?.email || '',
        phone: data?.phone || '',
        city: data?.city || '',
        country: data?.country || ''
    });

    useEffect(() => {
        if (data) {
            setFormData({
                id: data.id || '',
                firstName: data.firstName || '',
                lastName: data.lastName || '',
                email: data.email || '',
                phone: data.phone || '',
                city: data.city || '',
                country: data.country || ''
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
        if (formData.firstName.trim() && formData.lastName.trim() && formData.email.trim() && formData.phone.trim() && formData.city.trim() && formData.country.trim()) {
            addGeneralInfo(formData);
        }
    };
    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <h2>General Information</h2>
                <Input
                    label="First Name"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <Input
                    label="Last Name"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <Input
                    label="Phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <Input
                    label="City"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                />
                <Input
                    label="Country"
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                />
                <button type='submit'>Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}







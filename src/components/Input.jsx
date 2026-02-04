function Input({ label, type, name, value, onChange }) {
    return (
        <label>
            {label}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
            />
        </label>
    );
}

export default Input;
const InputText = ({ label, name, value, onChange }) => {
  return (
    <>
      <label>{label}</label>
      <input
        type="text"
        required
        minLength={2}
        maxLength={100}
        name={name}
        pattern="[A-Za-z]+"
        className="form-control"
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default InputText;

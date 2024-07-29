const InputEmail = ({ label, name, value, onChange }) => {
  return (
    <>
      <label>{label}</label>
      <input
        type="email"
        required
        name={name}
        className="form-control"
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default InputEmail;

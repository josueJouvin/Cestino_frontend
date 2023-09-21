const EmailInput = ({ setEmail, email }) => {
  return (
    <div className="my-5">
      <label
        htmlFor="email"
        className="uppercase text-gray-700 block text-xl font-bold"
      >
        Email
      </label>
      <input
        name="email"
        id="email"
        type="email"
        placeholder="cestino@correo.com"
        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500"
        value={email}
        onChange={setEmail}
      />
    </div>
  );
};

export default EmailInput;


const Modal = ({ children }) => {
  return (
    <section className="absolute inset-0">
      <div className="inset-0 fixed grid place-items-center bg-gray-800/80 overflow-y-auto z-50 py-3 md:py-10">
        {children}
      </div>
    </section>
  );
};

export default Modal;

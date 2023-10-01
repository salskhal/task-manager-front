const FormContainer = ({ children }) => {
  return (
    <div
      className="
          flex justify-center items-center min-h-screen bg-slate-800
          px-10 py-5
          "
    >
      <div className="w-[600px] flex flex-col gap-6 bg-white px-10 py-20 rounded-2xl">
        {children}
      </div>
    </div>
  );
};
    
export default FormContainer;

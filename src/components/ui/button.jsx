
export const Button = ({ children, ...props }) => (
    <button className="bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded-2xl shadow" {...props}>
      {children}
    </button>
  );
  
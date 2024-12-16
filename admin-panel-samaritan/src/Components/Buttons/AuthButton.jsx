import { Spin } from "antd";

const AuthButton = ({ label, type, loading }) => {
  return (
    <button type={type} className="w-full mb-8 bg-green rounded-md h-10 flex items-center justify-center text-neutral">
      {loading ? <Spin spinning={loading}/> : label}
    </button>
  );
};

export default AuthButton;

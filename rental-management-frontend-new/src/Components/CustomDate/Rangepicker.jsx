import { DatePicker } from 'antd';
import './style.css'
const { RangePicker } = DatePicker;

const Rangepicker = ({ onChange, format = "DD/MM/YYYY" }) => {

  return (
    <div className='w-full'>
      <RangePicker
        onChange={onChange}
        format={format}
        className='bg-search-bg-color outline-none border-none h-10 text-xl rounded-lg focus:border-color-white active:border-color-white w-auto p-2.5'
      />
    </div>
  );
};

export default Rangepicker;

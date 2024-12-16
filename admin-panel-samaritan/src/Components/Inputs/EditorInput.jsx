import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css';

const EditorInput = ({ name, value, handleChange, viewDescription }) => {
  const modules = {
    toolbar: [[{ align: ['right', 'center', 'justify'] }], ['bold', 'italic', 'underline'],  [{ 'header': 1 }, { 'header': 2 }],  , [{ list: 'ordered' }, { list: 'bullet' }], [{ color: [] }, { background: [] }], ['link'], ['clean']]
  };

  return (
    <div className="flex-col w-full">
      <ReactQuill
        style={{ width: '100%', height: viewDescription ? '430px' : '150px' }}
        placeholder="Description"
        className="texteditor"
        theme={viewDescription ? 'bubble' : 'snow'}
        name={name}
        value={value}
        readOnly={viewDescription ? true : false}
        onChange={handleChange}
        modules={viewDescription ? { toolbar: false } : modules}
      />
    </div>
  );
};

export default EditorInput;

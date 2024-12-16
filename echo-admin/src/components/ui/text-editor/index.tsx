import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css';

export default function TextEditor({ value, handleChange, viewDescription, label, errors, touched }: any) {

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            ['link'],
            [{ list: 'ordered' }, { list: 'bullet' }],
        ]
    };

    return (
        <>
        <div className="flex flex-col w-full gap-2">
            <label>{label}</label>
            <ReactQuill
                className="h-40 texteditor"
                theme='snow'
                value={value}
                readOnly={viewDescription ? true : false}
                onChange={handleChange}
                modules={modules}
            />
        </div>
            {errors && touched && <p className="text-text_error text-xs py-12">{errors}</p>}
        </>
    );
};


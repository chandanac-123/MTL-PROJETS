import React from 'react'
import { ChromePicker, ColorResult } from 'react-color';
import ModalLayout from '../modal';
import './style.css'

interface ColorPalleteProps {
    isColorPickerOpen: boolean;
    handleCloseColorPicker: () => void;
    onColorChange: (color: string) => void;
    selectedColor: string;
}

export default function ColorPallete({
    isColorPickerOpen,
    handleCloseColorPicker,
    onColorChange,
    selectedColor
}: ColorPalleteProps) {


    const handleColorChange = (color: ColorResult) => {
        onColorChange(color.hex); // Pass the color to the parent component
    };

    return (
        <ModalLayout
            isOpen={isColorPickerOpen}
            onClose={handleCloseColorPicker}
            title="Choose Color"
        >
            <div>
                <ChromePicker
                    color={selectedColor}
                    onChange={handleColorChange}
                    styles={{ default: { picker: { width: '400px' } } }} // Custom width here
                />
            </div>
        </ModalLayout>
    )
}

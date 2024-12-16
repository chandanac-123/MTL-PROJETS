import { Button } from "../ui/button";
import ModalLayout from "../ui/modal";

export default function ConfirmationModal({ isModalOpen, handleCloseModal, title, message, buttonText,icon,onClick ,disabled=false}: any) {
    return (
        <ModalLayout isOpen={isModalOpen} onClose={handleCloseModal} title={title}>
            <span className="flex justify-center font-medium text-secondary text-center p-4">{message}</span>
            <div className="flex gap-4 mt-4">
                <Button variant="cancel" label="Cancel" size='modal' type="button" onClick={handleCloseModal} />
                <Button variant="add_button" label={buttonText} icon={icon} size='add' type="submit" disabled={disabled} onClick={onClick}/>
            </div>
        </ModalLayout>
    )
}

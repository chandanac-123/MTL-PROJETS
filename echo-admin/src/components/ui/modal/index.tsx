import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";

export default function ModalLayout({ isOpen, onClose, title, children }: any) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <div className="border-b border-light_pink" />
                    <div className="py-4">
                        {children}
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
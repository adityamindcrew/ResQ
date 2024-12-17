import React from "react";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

interface ConfirmModalProps {
  title?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  handleConfirm?: () => void;
  handleCancel?: () => void;
  children: React.ReactNode;
  className?: string; // Optional custom className
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title = "Are you sure?",
  confirmButtonText = "Yes, Confirm!",
  cancelButtonText = "Cancel",
  handleConfirm,
  handleCancel,
  children,
  className,
}) => {
  const handleConfirmAction = () => {
    Swal.fire({
      title,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText,
      cancelButtonText,
    }).then((result) => {
      if (result.isConfirmed) {
        if (handleConfirm) handleConfirm();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        if (handleCancel) handleCancel();
      }
    });
  };

  return (
    <div className={className} onClick={handleConfirmAction}>
      {children}
    </div>
  );
};

export default ConfirmModal;

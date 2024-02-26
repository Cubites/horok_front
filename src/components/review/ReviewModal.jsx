import "./reviewModal.css";

const ReviewModal = ({ isOpen, onClose, onEdit, onDelete }) => {
  return (
    <>
      <div className="modalBackdrop" onClick={onClose}></div>
      <div className="reviewModalContainer">
        <div className="closeArea">
          <div className="closeBtn" onClick={onClose}>
            X
          </div>
        </div>
        <div className="btnArea">
          <div className="editBtn" onClick={onEdit}>
            수정하기
          </div>
          <div className="delBtn" onClick={onDelete}>
            삭제하기
          </div>
        </div>
      </div>
    </>
  );
};
export default ReviewModal;

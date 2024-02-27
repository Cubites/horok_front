import "./FolderModal.css";

const FolderModal = ({ isOpen, onClose, onEdit, onDelete, onShare }) => {
  return (
    <>
      <div className="folderModalBackdrop" onClick={onClose}></div>
      <div className="folderModalContainer">
        <div className="closeArea">
          <div className="closeBtn" onClick={onClose}>
            X
          </div>
        </div>
        <div className="btnArea">
          <div className="editBtn" onClick={onEdit}>
            수정하기
          </div>
          <div className="shareBtn" onClick={onShare}>
            공유하기
          </div>
          <div
            style={{ fontSize: "20px" }}
            className="delBtn"
            onClick={onDelete}
          >
            폴더 나가기
          </div>
        </div>
      </div>
    </>
  );
};
export default FolderModal;

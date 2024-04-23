import '../../css/Modal.css';
import ShareProductWithFriends from './ShareProductWithFriends';

const ShareProductModal = ({ handleClose, show, image, id, title, userid }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <ShareProductWithFriends itemImage={image} itemId={id} itemTitle={title} userId={userid} handleClose={handleClose} />
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default ShareProductModal;
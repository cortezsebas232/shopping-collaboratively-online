import '../../css/Modal.css';
import ShareBasketWithFriends from './ShareBasketWithFriends';

const ShareBasketModal = ({ handleClose, show }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <ShareBasketWithFriends handleClose={handleClose} />
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default ShareBasketModal;
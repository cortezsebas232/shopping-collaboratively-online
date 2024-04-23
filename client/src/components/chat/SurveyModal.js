import '../../css/Modal.css';
import Survey from './Survey';

const SurveyModal = ({ handleClose, show, image, itemId, itemName, userId }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <Survey handleClose={handleClose} productImage={image} productId={itemId} productName={itemName} userId={userId} />
        <button type="button" onClick={handleClose} style={{marginTop:-60, marginLeft:50}}>
          Close
        </button>
      </section>
    </div>
  );
};

export default SurveyModal;
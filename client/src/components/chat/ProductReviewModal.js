import '../../css/Modal.css';
import ProductReviews from './ProductReviews';

const ProductReviewModal = ({show, productId, handleClose }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <ProductReviews productId={productId} handleClose={handleClose} />
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default ProductReviewModal;
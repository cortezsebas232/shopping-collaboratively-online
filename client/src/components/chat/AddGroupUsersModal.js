import React from 'react'
import AddGroupUsers from './AddGroupUsers';

function AddGroupUsersModal({show, handleClose, setGroupName, setGroupUsers, groupUsers, groupName}) {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const reload=()=>window.location.reload();

    const closeModal = () => {
        handleClose();
        reload();
    }

    return (
        <div className={showHideClassName}>
        <section className="modal-main">
            <AddGroupUsers handleClose={handleClose} setGroupName={setGroupName} setGroupUsers={setGroupUsers} groupUsers={groupUsers} groupName={groupName} />
            <button type="button" onClick={closeModal}>
            Close
            </button>
        </section>
        </div>
    );
}

export default AddGroupUsersModal

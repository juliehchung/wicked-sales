import React from 'react';

function LiveDemoModal(props) {
  return (
    <div className="backdrop position-fixed d-flex h-100 w-100">
      <div className="modal-contents m-auto bg-white border rounded mt-5 p-3">
        <h2 className="m-2">Welcome!</h2>
        <p className="m-2">This is a live demo website.</p>
        <form onSubmit={event => {
          event.preventDefault();
          props.close();
        }}>
          <div className="form-check m-2">
            <input className="form-check-input" type="checkbox" id="acknowledgement" required />
            <label className="form-check-label" htmlFor="acknowledgement">I acknowledge that these merchandise are not for purchase.</label>
          </div>
          <div className="btn-group w-100 p-1">
            <button className="btn btn-warning w-100">I Understand</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LiveDemoModal;

import React from 'react';

const FormConfirmItem = ({ title, value }) => {
  return (
    <div className="mb-3 card border-0 px-3">
      <div className="row p-3">
        <div className="col-md-2">
          <strong>{title}: </strong>{' '}
        </div>
        <div className="col-md-6">
          {value && <div className=" text-muted">{value}</div>}
        </div>
      </div>
    </div>
  );
};

export default FormConfirmItem;

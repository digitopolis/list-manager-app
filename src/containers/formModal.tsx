import React, { useState } from "react";
import { Modal } from "antd";

type PropType = React.FC | React.ReactElement;

const FormModal: React.FC<{
  formComponent: React.FC;
  showForm: boolean;
  setSelectedForm: Function;
}> = ({ formComponent, showForm, setSelectedForm }) => {
  const [visible, setVisible] = useState(showForm);

  const hideModal = (): void => {
    setSelectedForm(null);
    setVisible(false);
  };

  const formWithProps = (formComponent: PropType) => {
    if (React.isValidElement(formComponent)) {
      return React.cloneElement(formComponent, {
        hideModal: hideModal,
      });
    }
  };
  return (
    <Modal visible={visible} footer={null}>
      {formWithProps(formComponent)}
    </Modal>
  );
};

export default FormModal;

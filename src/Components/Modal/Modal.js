import React from "react";
import Proptypes from "prop-types";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";

const Modal = ({ onCloseModal, openModal, title, content }) => {
  <Dialog
    open={openModal}
    onClose={onCloseModal}
    aria-labelledby="login-register-dialog-title"
    aria-describedby="login-register-dialog-content"
  >
    <DialogTitle id="login-register-dialog-title">{title}</DialogTitle>
    <DialogContent id="login-register-dialog-content">{content}</DialogContent>
    <button></button>
  </Dialog>;
};

Modal.proptypes = {
  openModal: Proptypes.func.isRequired,
  onCloseModal: Proptypes.func.isRequired,
  title: Proptypes.string.isRequired,
  content: Proptypes.string.isRequired
};

export default Modal;

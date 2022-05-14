import React from "react";
import { useSelector } from "react-redux";
import { LoadingError } from "./LoadingError";
import { QnAModal } from "./QnAModal";

export default function ModalBody() {
  const component = useSelector((state) => state.modal.component);

  let modalBody = <LoadingError />;

  switch (component) {
    case "QnA":
      modalBody = <QnAModal />;
      break;
    default:
      modalBody = <LoadingError />;
  }

  return modalBody;
}

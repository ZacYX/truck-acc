import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

export default function ConfirmModal({
  isOpen,
  onCancel,
  onConfirm,
  header,
  body,
}: {
  isOpen: boolean,
  onCancel: () => void,
  onConfirm: () => void,
  header?: string,
  body?: string,
}) {

  return (
    <Modal isOpen={isOpen} onOpenChange={onCancel}>
      <ModalContent>
        <ModalHeader>
          ⚠️{header ?? "Confirmation"}
        </ModalHeader>
        <ModalBody>
          <p>
            {body ?? "Are you sure you want to confirm?"}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </ModalFooter>
      </ModalContent>

    </Modal>
  )

}
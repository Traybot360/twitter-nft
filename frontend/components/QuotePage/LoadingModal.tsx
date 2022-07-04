import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

// modal that appears when loading the NFT
const LoadingModal = ({ isOpen, onClose, loading, message, setMessage }) => {
  const customClose = () => {
    setMessage(null);
    onClose();
  };
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={customClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Mint{loading ? "ing" : "ed"} your tweet</ModalHeader>
        {!loading && <ModalCloseButton />}
        <ModalBody pb={6}>{message}</ModalBody>

        <ModalFooter>
          {!loading && <Button onClick={customClose}>Cancel</Button>}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoadingModal;

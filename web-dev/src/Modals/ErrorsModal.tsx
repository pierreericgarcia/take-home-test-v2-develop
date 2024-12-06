import { Button, Chip, Stack } from "@mui/material";
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../Components/Modal";

export default function ErrorsModal({
  isOpen,
  onClose,
  errors,
}: {
  isOpen: boolean;
  onClose: () => void;
  errors: string[];
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="Error"
        description="Please fix the following errors"
      />
      <ModalContent>
        <Stack direction="row" spacing={1}>
          {errors.map((error) => (
            <Chip key={error} label={error} color="error" />
          ))}
        </Stack>
      </ModalContent>
      <ModalFooter>
        <Button variant="contained" onClick={onClose}>
          Ok
        </Button>
      </ModalFooter>
    </Modal>
  );
}

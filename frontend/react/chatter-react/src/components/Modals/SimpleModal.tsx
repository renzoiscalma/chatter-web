import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { SxProps, useTheme } from "@mui/material/styles";
import { KeyboardEvent, useState } from "react";
import OutlinedField from "../InputField/OutlinedField";
import ModalBase from "./ModalBase";

interface ModalProps {
  opened: boolean;
  handleCloseModal(): void;
  handleSubmit(input: string): void;
  header: string;
  placeholder: string;
  initialValue?: string;
  validation?(input: string): boolean;
}

interface InputState {
  input: string;
  error: boolean;
}

/**
 *  A generic modal that contains a SINGLE text input, a confirm and a cancel button.
 * does not support validation from backend.
 **/
function SimpleModal({
  opened,
  handleCloseModal,
  handleSubmit,
  header,
  placeholder,
  initialValue,
  validation,
}: ModalProps): JSX.Element {
  const theme = useTheme();

  const confirmButtonSx: SxProps = {
    flexGrow: 1,
    color: theme.common.text.accept,
    fontWeight: "bold",
  };

  const cancelButtonSx: SxProps = {
    flexGrow: 1,
    color: theme.common.text.decline,
    fontWeight: "bold",
  };

  const buttonContainer: SxProps = {
    display: "flex",
  };

  const [values, setValues] = useState<InputState>({
    input: "",
    error: false,
  });

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" && values.input !== "") {
      handleSubmit(values.input);
    }
  };

  const handleChange =
    (prop: keyof InputState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues((values) => ({
        ...values,
        [prop]: event.target.value,
        error: false,
      }));
    };

  const submitHandler = (): void => {
    if (validation) {
      if (validation(values.input)) {
        handleSubmit(values.input);
      } else {
        setValues((values) => ({ ...values, error: true }));
      }
    } else {
      handleSubmit(values.input);
    }
  };

  const onCloseHandler = (): void => {
    setValues({
      error: false,
      input: "",
    });
    handleCloseModal();
  };

  return (
    <ModalBase open={opened} onClose={onCloseHandler} header="Header">
      <OutlinedField
        error={values.error}
        helperText={values.error ? "Incorrect entry." : ""}
        autoComplete="off"
        id="outlined-basic"
        label={placeholder}
        onChange={handleChange("input")}
        onKeyDown={handleKeyDown}
        defaultValue={initialValue}
        placeholder="https://www.youtube.com/watch?v=4WXs3sKu41I"
      />
      <Box sx={buttonContainer}>
        <Button sx={confirmButtonSx} onClick={submitHandler}>
          SUBMIT
        </Button>
        <Button sx={cancelButtonSx} onClick={onCloseHandler}>
          CANCEL
        </Button>
      </Box>
    </ModalBase>
  );
}

export default SimpleModal;

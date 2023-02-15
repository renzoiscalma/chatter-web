import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { SxProps, useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { KeyboardEvent, useState } from "react";

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

  const style: SxProps = {
    display: "flex",
    flexDirection: "column",
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "26px",
    width: 400,
    bgcolor: theme.modal?.bgColor,
    boxShadow: 24,
    px: 4,
    py: 2,
  };

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

  const textFieldSx: SxProps = {
    margin: "18px 0",
    ".MuiInputLabel-outlined": {
      color: theme.common.text.secondary + " !important",
    },
    input: {
      color: theme.common.text.secondary,
    },
    fieldset: {
      borderColor: theme.textInput?.borderColor,
      "&.MuiOutlinedInput-notchedOutline": {
        borderColor: theme.textInput?.borderColor,
      },
      "&.Mui-error": {
        borderColor: theme.common.text.decline,
      },
    },
    ".MuiFormHelperText-root": {
      margin: "0 auto",
      marginTop: "5px",
    },
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
    <Modal open={opened} onClose={onCloseHandler}>
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          textAlign="center"
          color={theme.common.text.secondary}
        >
          {header}
        </Typography>
        <TextField
          error={values.error}
          helperText={values.error ? "Incorrect entry." : ""}
          autoComplete="off"
          sx={textFieldSx}
          id="outlined-basic"
          label={placeholder}
          variant="outlined"
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
      </Box>
    </Modal>
  );
}

export default SimpleModal;

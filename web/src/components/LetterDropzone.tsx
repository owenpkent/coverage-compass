import { DropZone, FileTrigger, Button, Text, type FileDropItem } from "react-aria-components";
import { useIntl } from "react-intl";

/**
 * Accessible file input: a React Aria DropZone (keyboard-focusable, announces
 * drag state) plus a FileTrigger button that opens the native picker (which
 * offers the camera on phones). Emits the chosen File to the parent; it does no
 * reading itself.
 */
export function LetterDropzone({
  onFile,
  disabled = false,
}: {
  onFile: (file: File) => void;
  disabled?: boolean;
}) {
  const intl = useIntl();

  return (
    <DropZone
      className="dropzone"
      aria-label={intl.formatMessage({ id: "drop.aria" })}
      isDisabled={disabled}
      onDrop={async (e) => {
        const item = e.items.find((i): i is FileDropItem => i.kind === "file");
        if (item) onFile(await item.getFile());
      }}
    >
      <Text slot="label" className="dropzone-prompt">
        {intl.formatMessage({ id: "drop.prompt" })}
      </Text>
      <p className="dropzone-or">{intl.formatMessage({ id: "drop.or" })}</p>
      <FileTrigger
        acceptedFileTypes={["application/pdf", "image/*"]}
        onSelect={(files) => {
          const file = files?.item(0);
          if (file) onFile(file);
        }}
      >
        <Button className="btn btn-primary" isDisabled={disabled}>
          {intl.formatMessage({ id: "drop.cta" })}
        </Button>
      </FileTrigger>
    </DropZone>
  );
}

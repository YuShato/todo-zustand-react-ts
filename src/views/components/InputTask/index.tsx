import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

interface InputTaskProps {
  id: string;
  title: string;
  onDone: (id: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
  id,
  title,
  onDone,
  onEdited,
  onRemoved,
}) => {
  const [checked, setChecked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(title);
  const editTitleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditMode]);

  return (
    <div className={styles.InputTask}>
      <label className={styles.InputTaskLabel}>
        <input
          type="checkbox"
          checked={checked}
          disabled={isEditMode}
          className={styles.inputTaskChexbox}
          onChange={(evt) => {
            setChecked(evt.target.checked);

            if (evt.target.checked) {
              setTimeout(() => {
                onDone(id);
              }, 300);
            }
          }}
        />
        {isEditMode ? (
          <input
            value={value}
            ref={editTitleInputRef}
            onChange={(evt) => {
              setValue(evt.target.value);
            }}
            onKeyDown={(evt) => {
              if (evt.key === "Enter") {
                onEdited(id, value);
                setIsEditMode(false);
              }
            }}
            className={styles.inputTaskTitleEdit}
          />
        ) : (
          <h3 className={styles.InputTaskTitle}>{title}</h3>
        )}
      </label>
      {isEditMode ? (
        <button
          className={styles.InputTaskEdit}
          aria-label="Save"
          onClick={() => {
            onEdited(id, value);
            setIsEditMode(false);
          }}
        />
      ) : (
        <button
          className={styles.InputTaskEdit}
          aria-label="Edit"
          onClick={() => {
            setIsEditMode(true);
          }}
        />
      )}
      <button
        className={styles.InputTaskRemove}
        aria-label="Remove"
        onClick={() => {
          if (confirm("Are you sure?")) {
            onRemoved(id);
          }
        }}
      />
    </div>
  );
};

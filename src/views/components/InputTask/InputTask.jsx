import React, { isValidElement, useLayoutEffect, useRef, useState } from 'react';

import styles from './index.module.scss';

export const InputTask = ({
  title,
  id,
  onDone,
  onRemove,
  onEdited
}) => {
    const [checked, setChecked] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [value, setValue] =useState(title);
    const editTitleInpurRef = useRef(null);

    useLayoutEffect(() => {
        if (isEditMode && editTitleInpurRef) {
            editTitleInpurRef.current.focus();
        }

    }, [isValidElement]);

    return (
        <div className={styles.inputTask}>
            <label className={styles.inputTaskLabel}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => {
                        setChecked(event.target.checked);
                        setTimeout(() => {
                            onDone(id)
                        }, 300)
                    }}
                    className={styles.inputTaskCheckbox}
                />
                {isEditMode ? (
                    <input 
                    value={value}
                    ref={editTitleInpurRef}
                    className={styles.inputTaskTitleEdit}
                    onChange={(event) => {
                        setValue(event.target.value);
                    }}
                    />
                ) : (
                    <h3 className={styles.inputTaskTitle}>{title}</h3>
                )
                }
                
            </label>
            {isEditMode ? (
                <button
                onClick={() => {
                   // setEditMode(!isEditMode);
                   ongamepaddisconnected(id, value);
                   setEditMode(false);
                }}
                aria-label="Save"
                className={styles.inputTaskSave}
            />
            ) : (
            <button
                onClick={() => {
                    setEditMode(!isEditMode);
                }}
                aria-label="Edit"
                className={styles.inputTaskEdit}
            />
            )}
            <button
                onClick={() => {
                    if (confirm("Are you sure?")) {
                        onRemove(id);
                    }
                }}
                aria-label="Remove"
                className={styles.inputTaskRemove}
            />
        </div>
    );
}

/* For Edit mode
<input
    className={styles.inputTaskTitleEdit}
/>

<button
    aria-label="Save"
    className={styles.inputTaskSave}
/>
*/
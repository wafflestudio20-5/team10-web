import styles from "./ImageModal.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage, faXmark, faArrowDown} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import React, {
    useState,
    useCallback,
    useRef,
    useEffect,
    ChangeEvent
} from "react";

type ImageModalType = {
    isModalOpen: boolean,
    toggleModal: () => void,
    imageFile: File | null,
    setImageFile: React.Dispatch<File | null>
}

export function ImageModal({isModalOpen, toggleModal, imageFile, setImageFile}: ImageModalType) {

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const dragRef = useRef<HTMLLabelElement | null>(null);

    const onChangeFiles = useCallback(
        (e: ChangeEvent<HTMLInputElement> | any): void => {
            let selectFiles: File[];
            if (e.type === "drop") {
                selectFiles = e.dataTransfer.files;
            } else {
                selectFiles = e.target.files;
            }
            setImageFile(selectFiles[0]);
        }, [imageFile]
    );

    const handleDragIn = useCallback((e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragOut = useCallback((e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer!.files) {
            setIsDragging(true);
        }
    }, []);

    const handleDrop = useCallback(
        (e: DragEvent): void => {
            e.preventDefault();
            e.stopPropagation();
            onChangeFiles(e);
            setIsDragging(false);
        }, [onChangeFiles]);

    const initDragEvents = useCallback((): void => {
        if (dragRef.current !== null) {
            dragRef.current.addEventListener("dragenter", handleDragIn);
            dragRef.current.addEventListener("dragleave", handleDragOut);
            dragRef.current.addEventListener("dragover", handleDragOver);
            dragRef.current.addEventListener("drop", handleDrop);
        }
    }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

    const resetDragEvents = useCallback((): void => {
        if (dragRef.current !== null) {
            dragRef.current.removeEventListener("dragenter", handleDragIn);
            dragRef.current.removeEventListener("dragleave", handleDragOut);
            dragRef.current.removeEventListener("dragover", handleDragOver);
            dragRef.current.removeEventListener("drop", handleDrop);
        }
    }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

    useEffect(() => {
        initDragEvents();
        return () => resetDragEvents();
    }, [initDragEvents, resetDragEvents]);

    return (
        <Modal isOpen={isModalOpen} onRequestClose={toggleModal} className={styles.modal}>
            <header>
                <p className={styles.title}>프로필 사진 변경</p>
                <FontAwesomeIcon icon={faXmark} className={styles.x} onClick={toggleModal}/>
            </header>
            <div className={styles.dragdrop}>
                <input
                    type="file"
                    id="fileUpload"
                    style={{display: "none"}}
                    accept="image/*"
                    onChange={onChangeFiles}
                />
                <label
                    className={isDragging ? `${styles.file} ${styles.dragging}` : styles.file}
                    htmlFor="fileUpload"
                    ref={dragRef}
                >
                    {
                        imageFile ?
                            <img className={styles.image} src={URL.createObjectURL(imageFile)} alt="사진"/>
                            : <FontAwesomeIcon icon={isDragging? faArrowDown : faImage} className={styles.fa}/>
                    }
                    <p>여기에 파일 끌어서 놓기<br/>혹은</p>
                    <label className={styles.button} htmlFor="fileUpload">파일 선택</label><br/>
                    <div className={styles.fileName}>{imageFile ? imageFile.name : ""}</div>
                </label>
            </div>
            <footer>
                <button className={styles.cancel} onClick={toggleModal}>취소</button>
                <button className={styles.save}>저장</button>
            </footer>
        </Modal>
    )
}
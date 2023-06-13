import React, { useEffect, useRef, useState } from 'react';
import styles from './HeaderImage.module.scss';
import LoadScreen from '@/components/UI/LoadScreen/LoadScreen';
import OrgService from '@/services/api/orgServices';
import MainButton from '@/components/UI/button/mainButton/MainButton';

type Props = {
    img: string | null
    id: number
    reload: ( id: number ) => void
    newHeaderFunc: ( file: File, id: number ) => void
};

export default function HeaderImage({ img, id, reload, newHeaderFunc }: Props) {


    
    const [ highlight, setHighlight ] = useState( false );
    const [ loading, setLoading ] = useState<boolean>( false )

    
    
    const newHeader = async ( file: File, id: number ) => {
        setLoading(true)

        const response = await newHeaderFunc( file, id )
        reload( id )
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }
 
    const handleDragOver: React.DragEventHandler<HTMLLabelElement> = ( event ) => {
        event.preventDefault();
        setHighlight( true );
    };

    const handleDragLeave = () => {
        setHighlight( false );
    };

    const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = ( event ) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            const file = fileList[0];
            if ( id !== null ) {
                newHeader( file, id )
                console.log(file);
            }
        }
    };

    const handleDrop: React.DragEventHandler<HTMLLabelElement> = ( event ) => {
        event.preventDefault();
        setHighlight( false );
        const fileList = event.dataTransfer.files;
        if ( fileList && fileList.length > 0 ) {
            const file = fileList[0];
            if ( id !== null ) {
                newHeader( file, id )
            }
        }
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleNewFileChange: React.ChangeEventHandler<HTMLInputElement> = ( event ) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            const file = fileList[0];
            if ( id !== null ) {
                newHeader( file, id )
                console.log(file);
            }
        }
    };

    return (
        <div className={styles.header}>
            
            {loading ? 
                    <div className={styles.loadBLock}>
                        <LoadScreen/>
                    </div>
                : 
                img ? (
                <div className={styles.headerImg}>
                    <img src={img} alt="" />
                    <div className={styles.headerButton}>
                        <input
                            type="file"
                            multiple
                            onChange={handleNewFileChange}
                            ref={fileInputRef}
                        />
                        <MainButton onClick={handleButtonClick}>изменить</MainButton>
                    </div>
                </div>
            ) : (
                <div className={styles.addHeader}>
                    <>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            name="file"
                            id="file"
                        />
                        <label
                            htmlFor="file"
                            className={`${styles.content} ${highlight ? styles.highlight : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            выберите файл для шапки
                        </label>
                    </>
                </div>
            )}
        </div>
    );
}
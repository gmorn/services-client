import React, { useEffect, useRef, useState } from 'react'
import styles from './Description.module.scss'
import OrgService from '@/services/api/orgServices'

type Props = {
    description: string | null
    id: number
    reload: ( id: number ) => void
    newDescFunc: ( data: {description: string | null, id: number} ) => void
}

export default function Description({ description, id, reload, newDescFunc }: Props) {

    const [textareaValue, setTextareaValue] = useState(description)
    const [textareaState, setTextareaState] = useState(false)


    useEffect(() => {setTextareaValue(description);
    }, [description])

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleBlur = () => {
        setTextareaState(false)
        console.log('Textarea lost focus');
        // Дополнительные действия, которые нужно выполнить при потере фокуса
        if (textareaValue !== '') {
            const data = {
                description: textareaValue,
                id
            };
            newDescFunc(data)
            reload(id)
        }
      };
    
    const handleClick = () => {
        if (textareaRef.current) {
            setTextareaState(true)
            textareaRef.current.focus();
        }
    };

    useEffect(() => {
        const textarea: HTMLTextAreaElement = textareaRef.current!;
    
        const adjustTextareaHeight = () => {
          textarea.style.height = 'auto';
          textarea.style.height = `${textarea.scrollHeight}px`;
        };
    
        textarea.addEventListener('input', adjustTextareaHeight);
    
        return () => {
          textarea.removeEventListener('input', adjustTextareaHeight);
        };
      }, [description]);

    return (
        <div className={styles.description}>
            {
                description === null || ''  ?
                    <div 
                        className={`${styles.newDesc}
                            ${textareaState ? styles.active : ''}
                            ${textareaState ? styles.active : ''}
                        `}
                        onClick={handleClick}
                    >
                        Нажмите чтобы добавить описание
                    </div>
                :
                    <div 
                        className={`${styles.desc}
                            ${textareaState ? styles.active : ''}
                        `}
                        onClick={handleClick} 
                    >
                        <div className={styles.content}>
                            <pre>
                                {textareaValue}
                            </pre>
                        </div>
                    </div>
            }
            
            <textarea 
                className={`${styles.textarea} 
                    ${textareaState ? styles.active : ''}
                `}
                ref={textareaRef} 
                onBlur={handleBlur}
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
            />
        </div>
    )
}
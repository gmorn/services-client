import styles from './Modal.module.scss'
import closeIcon from '@/assets/images/icons/close_icon.png'
import Image from 'next/image'

type Props = {
    children: React.ReactNode
    modal: boolean
    setModal: (param1: boolean) => void
    clickClose?: boolean
}

export default function Modal({ children, modal, setModal, clickClose = false }: Props) {




    const closeModal = () => {
        setModal(false)
    }

    return (
        <div className={`${styles.modalScreen} ${modal ? styles.active : ''}`}>
            <div 
                className={styles.modal}
                onClick={clickClose ? () => {} : () => closeModal()}
            ></div>
            <div className={styles.content}>
                <div className={styles.closeButton}>
                    <Image
                        src={closeIcon}
                        alt=""
                        width={16}
                        height={16}
                        onClick={closeModal}
                    />
                </div>
                {children}
            </div>
        </div>
    )
}
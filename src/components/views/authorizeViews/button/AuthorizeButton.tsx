import FormButton from '@/components/UI/button/formButton/FormButton';
import { IUser } from '@/pages/authorize/authorize.types';
import React from 'react'
import styles from './AuthorizeButton.module.scss'
import Link from 'next/link';

type Props = {
    pageType: string;
    user: IUser;
}

export default function AuthorizeButton({ pageType, user }: Props) {
    return (
        <div className={styles.buttonBlock}>
            {pageType === 'registration' ? (
                <>
                    <FormButton disabled={!(
                        user.firstName.isValid && 
                        user.lastName.isValid && 
                        user.password.isValid && 
                        user.passwordRepeat.isValid && 
                        user.phoneNumber.value &&
                        user.email.isValid
                    )}>Зарегистрироваться</FormButton>
                    <p className={styles.text}>Уже есть аккаунт?</p>
                    <Link href="/authorize/login" className={styles.link_btn}>
                        <FormButton>Войти</FormButton>
                    </Link>
                </>
            ) : pageType === 'login' ? (
                <>
                    {/* <Link href="/authorize/forgotPassword" className={styles.link}>
                        Забыли пароль?
                    </Link> */}
                    <FormButton disabled={!(user.email.isValid && user.password.isValid)}>Войти</FormButton>
                    <p className={styles.text}>Ещё нет аккаунта?</p>
                    <Link href="/authorize/registration" className={styles.link_btn}>
                        <FormButton>Зарегистрироваться</FormButton>
                    </Link>
                </>
            )
            :
            null}
        </div>
    )
}
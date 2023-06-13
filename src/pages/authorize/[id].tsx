import { useEffect, useState } from 'react';
import styles from './Authorize.module.scss'
import AuthorizeForm from '@/components/views/authorizeViews/form/AuthorizeForm';
import AuthorizeButton from '@/components/views/authorizeViews/button/AuthorizeButton';
import { IFormField, IUser, IUserLogin } from './authorize.types';
import Authorize from '.';
import { fetchUserLogin, fetchUserReg } from '@/store/user/userSlice';
import { IUserData } from '@/store/user/userSlice.types';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/store';
import LoadScreen from '@/components/UI/LoadScreen/LoadScreen';
import Router , {useRouter}  from 'next/router';
import { isJsxClosingElement } from 'typescript';

const AuthorizeSubPage = () => {

    const dispatch = useDispatch()

    const [pageType, setPageType] = useState<string>('');

    const router = useRouter();

    const userLogin = useAppSelector(state => state.user.user.isLogin)

    useEffect(() => {
        userLogin && router.push('/')
    }, [userLogin])

    useEffect(() => {
        if (router.query.id !== undefined) {
            setPageType(router.query.id as string);
        }
    }, [router]);

    const [user, setUser] = useState<IUser>({
        firstName: { value: '', isValid: null },
        lastName: { value: '', isValid: null },
        password: { value: '', isValid: null },
        passwordRepeat: { value: '', isValid: null },
        phoneNumber: { value: '', isValid: null },
        email: { value: '', isValid: null },
    })

    const changeUser = ( 
        firstName: IFormField, 
        lastName: IFormField, 
        password: IFormField, 
        passwordRepeat: IFormField, 
        phoneNumber: IFormField, 
        email: IFormField, 
    ) => {
     
        setUser({
            firstName: { value: firstName.value, isValid: firstName.isValid },
            lastName: { value: lastName.value, isValid: lastName.isValid },
            password: { value: password.value, isValid: password.isValid },
            passwordRepeat: { value: passwordRepeat.value, isValid: passwordRepeat.isValid },
            phoneNumber: { value: phoneNumber.value, isValid: phoneNumber.isValid },
            email:  { value: email.value, isValid: email.isValid }
        })
    
        return true
      }

    const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        switch (pageType) {
            case 'login': {
                if ( user.password.isValid && 
                    user.email.isValid) {
                        
                    const pushUser: IUserLogin = {
                        password: user.password.value, 
                        email: user.email.value 
                    }
                    dispatch(fetchUserLogin( pushUser ))
                }
                break;
            }
            case 'registration': {
                if (user.firstName.isValid && 
                    user.lastName.isValid && 
                    user.password.isValid && 
                    user.passwordRepeat.isValid && 
                    user.phoneNumber.value &&
                    user.email.isValid) {
                    const pushUser: IUserData = { 
                        firstName: user.firstName.value, 
                        lastName: user.lastName.value, 
                        password: user.password.value, 
                        phoneNumber: user.phoneNumber.value, 
                        email: user.email.value 
                    }
                    dispatch(fetchUserReg( pushUser ))
                }
                break;
            }
        }
    };


2
    return (
        <div className={styles.authorize}>
            <form className={styles.form} onSubmit={submitFormHandler}>
                {
                pageType === 'registration' ? (
                    <h1 className={ styles.form_title }>Регистрация аккаунта</h1>
                ) : pageType === 'login' ? (
                    <h1 className={ styles.form_title }>Вход в аккаунт</h1>
                ) : ('')
                }
                <AuthorizeForm pageType={ pageType } changeUser={ changeUser }/>
                <AuthorizeButton pageType={ pageType } user={ user }/>
                {/* {
                    loading && <LoadScreen/>
                } */}
                
            </form>
        </div>
    )
}

export default AuthorizeSubPage;
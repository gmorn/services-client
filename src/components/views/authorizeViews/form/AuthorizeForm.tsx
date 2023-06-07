import React, { useEffect, useState } from 'react'
import { IFormField } from '@/pages/authorize/authorize.types';
import FormInput from '@/components/UI/input/FormInput/FormInput';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import userSlice, { resetEmailStatus, resetPasswordStatus } from '@/store/user/userSlice';

const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const nameRegExp = /^[a-zA-Zа-яА-Я]+$/u
const phoneRegExp = /^\d+$/;

type Props = {
    pageType: string;
    changeUser: (
        param1: IFormField, 
        param2: IFormField, 
        param3: IFormField, 
        param4: IFormField,
        param5: IFormField,
        param6: IFormField,
    ) => void;
}

export default function AuthorizeForm({ pageType, changeUser }: Props) {

    const emailStatus = useAppSelector(state => state.user.status.email)
    const passwordStatus = useAppSelector(state => state.user.status.password)

    useEffect(() => {
        dispatch(resetEmailStatus())
      }, [pageType])

    const dispatch = useAppDispatch()

    const [firstName, setFirstName] = useState<IFormField>({ value: '', isValid: null });
    const [lastName, setLastName] = useState<IFormField>({ value: '', isValid: null });
    const [password, setPassword] = useState<IFormField>({ value: '', isValid: null });
    const [passwordRepeat, setPasswordRepeat] = useState<IFormField>({ value: '', isValid: null });
    const [phoneNumber, setPhoneNumber] = useState<IFormField>({ value: '', isValid: null });
    const [email, setEmail] = useState<IFormField>({ value: '', isValid: null });

    useEffect(() => {
        changeUser(firstName, lastName ,password, passwordRepeat, phoneNumber, email)
      }, [ firstName, lastName ,password, passwordRepeat, phoneNumber, email ])

    const firstNameValid = (value: string)  => {
        const valid = nameRegExp.test(value)
        setFirstName({ value: value, isValid: valid });
    }
    const lastNameValid = (value: string)  => {
        const valid = nameRegExp.test(value)
        setLastName({ value: value, isValid: valid });
    }
    const passwordValid = (value: string)  => {
        const valid = (pageType === 'registration' ? (value === '' ? null : (value.length >= 8 ? true : false)) : (value === '' ? null : true))
        dispatch(resetPasswordStatus())
        setPassword({ value: value, isValid: valid });  
    }
    const passwordRepeatValid = (value: string)  => {
        const valid = value === password.value;
        setPasswordRepeat({ value: value, isValid: valid });
    }
    const phoneNumberValid = (value: string)  => {
        const valid = value === '' ? null : true;
        setPhoneNumber({ value: value, isValid: valid });
    }
    const emailValid = (value: string)  => {
        const valid = emailRegExp.test(value);
        dispatch(resetEmailStatus())
        setEmail({ value: value, isValid: valid});
    }

    return (
        <div>
            {pageType === 'registration' && 
                <FormInput
                    placeholder={'введите имя'}
                    label={'Неверное имя'}
                    value={firstName.value}
                    onChange={firstNameValid}
                    status={firstName.isValid}
                />
            }
            {pageType === 'registration' && 
                <FormInput
                    placeholder={'введите фамилию'}
                    label={'Неверная фамилия'}
                    value={lastName.value}
                    onChange={lastNameValid}
                    status={lastName.isValid}
                />
            }
            {(pageType === 'registration' || 'login') && 
                <FormInput
                    placeholder={'E-mail'}
                    label={`
                        ${pageType === 'registration' ? 
                        emailStatus ? 'Такой email уже занят' : 'Не верный email' : 
                        emailStatus ? 'Такого пользователя не существует' : 'Не верный email'}
                    `}
                    value={email.value}
                    onChange={emailValid}
                    status={emailStatus ? false : email.isValid}
                />
            }

            {(pageType === 'registration' || 'login') && 
                <FormInput
                    type={'password'}
                    placeholder={'Пароль'}
                    label={`
                    ${pageType === 'registration' ? 
                        'Пароль не менее 8 смволов' : 
                        passwordStatus && 'Неверный пароль'}
                    `}
                    value={password.value}
                    onChange={passwordValid}
                    status={passwordStatus ? false : password.isValid}
                />
            }

            {pageType === 'registration' && 
                <FormInput
                    type={'password'}
                    placeholder={'Повторите пароль'}
                    label={'Пароли не совпадают'}
                    value={passwordRepeat.value}
                    onChange={passwordRepeatValid}
                    status={passwordRepeat.isValid}
                />
            }

            {pageType === 'registration' && 
                <FormInput
                    placeholder={'введите номер'}
                    label={'не коректный номер'}
                    value={phoneNumber.value}
                    onChange={phoneNumberValid}
                    status={phoneNumber.isValid}
                />
            }

        </div>
    )
}
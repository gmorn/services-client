import {  T_appDispatch, T_rootState } from "@/store";
import { useDispatch } from "react-redux";
import { useSelector, TypedUseSelectorHook } from 'react-redux'

type DispatchFunc = () => T_appDispatch

export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<T_rootState> = useSelector
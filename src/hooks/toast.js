import { v4 as uuidv4 } from 'uuid';
import { addToast as add, removeToast as remove } from '../store/toastSlice';
import { useDispatch } from 'react-redux';

function useToast() {
    const dispatch = useDispatch();

    const addToast = (toast) => {
        const id = uuidv4();
        const toastWithId = {
            ...toast,
            id
        }
        dispatch(add(toastWithId));

        setTimeout(() => {
            deleteToast(id);
        }, 5000)
    }

    const deleteToast = (id) => {
        dispatch(remove(id))
    }

    return {
        addToast,
        deleteToast
    };
}

export default useToast;
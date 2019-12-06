import { useState } from 'react';

const useModal = () => {

    const [isShowing, setIsShowing] = useState<boolean>(false);

    function toggle() {
        console.log('useModal toggle has been clicked')
        setIsShowing(!isShowing);
    };

    return { isShowing, toggle };

}

export default useModal;
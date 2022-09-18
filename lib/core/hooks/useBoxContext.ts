import { useContext } from 'react';
import { BoxContext } from '../providers/BoxProvider';

const useBoxContext = () => useContext(BoxContext);

export default useBoxContext;

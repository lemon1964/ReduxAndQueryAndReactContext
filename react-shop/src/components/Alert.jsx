import { useEffect, useContext } from 'react';
import { ShopContext } from '../context';

function Alert(props) {
  const { altername = '', closeAlert = Function.prototype } = useContext(ShopContext);

  useEffect(() => {
    const timerId = setTimeout(closeAlert, 3000);

    return () => {
      clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [altername]);

  return (
    <div id="toast-container">
      <div className="toast">{altername} добавлен в корзину</div>
    </div>
  );
}

export { Alert };

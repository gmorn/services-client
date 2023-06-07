import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Authorize = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/authorize/login', undefined, { shallow: true });
  }, []);
};

export default Authorize;
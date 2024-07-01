import { RouterConfigs } from 'app/config';
import { fromPairs, isNumber } from 'lodash-es';
import { compile } from 'path-to-regexp';
import { useLocation as useRRLocation, useNavigate as useRRNavigate, type NavigateOptions } from 'react-router-dom';

type Path = keyof typeof RouterConfigs | 'goBack';

type Options = NavigateOptions & {
  params?: Record<string, string>;
  backPath?: Path;
};

export const useNavigate = () => {
  const navigate = useRRNavigate();
  const location = useRRLocation();
  const canGoBack = location.key !== 'default';
  const Paths = fromPairs(Object.entries(RouterConfigs).map(([key, value]) => [key, value.path]));

  return (to: Path | number | '404', options?: Options) => {
    if (to === '404') {
      return navigate('/404');
    }
    if (isNumber(to)) {
      return navigate(to);
    }
    if (to === 'goBack') {
      if (canGoBack) {
        return navigate(-1);
      }
      if (options?.backPath) {
        return navigate(Paths[options.backPath]);
      }
      return navigate(RouterConfigs['Homepage'].path);
    }
    const path = compile(Paths[to])(options?.params);
    navigate(path, options);
  };
};

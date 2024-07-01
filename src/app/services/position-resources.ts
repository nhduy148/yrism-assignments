import Api from 'app/networking/api';
import { PositionResourceResponse } from 'shared/types';

export const getPositionResource = () => Api.GET_POSITION_RESOURCE<PositionResourceResponse>();

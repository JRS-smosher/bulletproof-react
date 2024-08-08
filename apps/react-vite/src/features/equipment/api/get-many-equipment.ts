import { queryOptions, useQuery } from '@tanstack/react-query';

import { QueryConfig } from '@/lib/react-query';
import { Equipment } from '@/types/api';

export const getEquipment = (): Promise<Equipment[]> => {
  return new Promise((resolve) => {
    return resolve([
      {
        equipmentCategory: '',
        jurisdictionNumber: '',
        altOwnerNumber: '',
        serialNumber: '',
        nationalBoardNumber: '',
        id: '1',
        createdAt: Date.now(),
        certificate: {
          expirationDate: 0,
          duration: 0,
        },
      },
    ]);
  });
};

export const getEquipmentQueryOptions = () => {
  return queryOptions({
    queryKey: ['equipment'],
    queryFn: () => getEquipment(),
  });
};

type UseEquipmentOptions = {
  queryConfig?: QueryConfig<typeof getEquipmentQueryOptions>;
};

export const useEquipment = ({ queryConfig }: UseEquipmentOptions = {}) => {
  return useQuery({
    ...getEquipmentQueryOptions(),
    ...queryConfig,
  });
};

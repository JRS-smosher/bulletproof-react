import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { MutationConfig } from '@/lib/react-query';
import { Equipment } from '@/types/api';

import { getEquipmentQueryOptions } from './get-many-equipment';

export const equipmentCategoryArray = [
  'Boiler',
  'Pressure Vessel',
  'Refrigeration',
] as const;

export const createEquipmentInputSchema = z.object({
  equipmentCategory: z.enum(equipmentCategoryArray),
  jurisdictionNumber: z
    .string()
    .min(1, 'Required')
    .regex(/tn12345/),
  altOwnerNumber: z.string(),
  serialNumber: z.string(),
  nationalBoardNumber: z
    .string()
    .min(1, 'National Board Number must be defined'),
  certificate: z
    .object({
      expirationDate: z.coerce.number(),
      duration: z.coerce
        .number({
          required_error: 'Duration is required',
          invalid_type_error: 'Duration Must be a number',
        })
        .min(1, 'Must state the length the certificate is good for'),
    })
    .required(),
});

export type EquipmentInput = z.infer<typeof createEquipmentInputSchema>;

export const createEquipment = ({
  data,
}: {
  data: EquipmentInput;
}): Promise<Equipment> => {
  console.log(data);
  return new Promise((resolve) => {
    return resolve({
      ...data,
      id: '1',
      createdAt: Date.now(),
      certificate: {
        ...data.certificate,
      },
    });
  });
};

type UseCreateEquipmentOptions = {
  mutationConfig?: MutationConfig<typeof createEquipment>;
};

export const useCreateEquipment = ({
  mutationConfig,
}: UseCreateEquipmentOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getEquipmentQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createEquipment,
  });
};

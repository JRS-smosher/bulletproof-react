import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Select } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

import {
  createEquipmentInputSchema,
  equipmentCategoryArray,
  useCreateEquipment,
} from '../api/create-equipment';

export const CreateEquipment = () => {
  const { addNotification } = useNotifications();
  const createEquipmentMutation = useCreateEquipment({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Equipment Created',
        });
      },
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createEquipmentMutation.isSuccess}
        triggerButton={
          <Button size="sm" icon={<Plus className="size-4" />}>
            Create Equipment
          </Button>
        }
        title="Create Equipment"
        submitButton={
          <Button
            form="create-equipment"
            type="submit"
            size="sm"
            isLoading={createEquipmentMutation.isPending}
          >
            Submit
          </Button>
        }
      >
        <Form
          id="create-equipment"
          onSubmit={(values) => {
            createEquipmentMutation.mutate({ data: values });
          }}
          options={{ mode: 'onBlur' }}
          schema={createEquipmentInputSchema}
        >
          {({ register, formState }) => (
            <>
              <Select
                label="Equipment Category"
                options={equipmentCategoryArray.map((category) => {
                  return {
                    label: category,
                    value: category,
                  };
                })}
                error={formState.errors['equipmentCategory']}
                registration={register('equipmentCategory')}
              />
              <Input
                label="Jurisdiction Number"
                error={formState.errors['jurisdictionNumber']}
                registration={register('jurisdictionNumber')}
              />
              <Input
                label="Alternate Owner Number"
                registration={register('altOwnerNumber')}
                error={formState.errors['altOwnerNumber']}
              />
              <Input
                label="Serial Number"
                registration={register('serialNumber')}
                error={formState.errors['serialNumber']}
              />
              <Input
                label="National Board Number"
                registration={register('nationalBoardNumber')}
                error={formState.errors['nationalBoardNumber']}
              />
              <Input
                label="Expiration Date"
                type="date"
                registration={register('certificate.expirationDate', {
                  valueAsDate: true,
                })}
                error={formState.errors['certificate']?.['expirationDate']}
              />
              <Input
                label="Duration"
                type="number"
                registration={register('certificate.duration')}
                error={formState.errors['certificate']?.['duration']}
              />
            </>
          )}
        </Form>
      </FormDrawer>
    </Authorization>
  );
};

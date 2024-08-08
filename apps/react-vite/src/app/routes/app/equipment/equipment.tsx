import { QueryClient } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { ContentLayout } from '@/components/layouts';
import { Spinner } from '@/components/ui/spinner';
import {
  useEquipment,
  getEquipmentQueryOptions,
} from '@/features/equipment/api/get-many-equipment';
import { CreateEquipment } from '@/features/equipment/components/create-equipment';

export const equipmentLoader = (queryClient: QueryClient) => async () => {
  const equipmentQuery = getEquipmentQueryOptions();

  const promises = [
    queryClient.getQueryData(equipmentQuery.queryKey) ??
      (await queryClient.fetchQuery(equipmentQuery)),
  ] as const;

  const [equipment] = await Promise.all(promises);

  return {
    equipment,
  };
};

export const EquipmentRoute = () => {
  const equipmentQuery = useEquipment({});

  if (equipmentQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!equipmentQuery.data) return null;

  return (
    <>
      <ContentLayout title={equipmentQuery.data[0].nationalBoardNumber}>
        <CreateEquipment />
        <div className="mt-8">
          <ErrorBoundary
            fallback={
              <div>Failed to load comments. Try to refresh the page.</div>
            }
          ></ErrorBoundary>
        </div>
      </ContentLayout>
    </>
  );
};

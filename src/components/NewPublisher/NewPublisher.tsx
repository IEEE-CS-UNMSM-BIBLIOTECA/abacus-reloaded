import { Button, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitPublisherPayload } from '@/types';
import { addPublisher } from '@/services/endpoints/setters';

const NewPublisher = ({ opened, onClose }: {
  opened: boolean;
  onClose: () => void;
}) => {
  const form = useForm<SubmitPublisherPayload>();

  const queryClient = useQueryClient();

  const addAuthorMutation = useMutation({
    mutationFn: (values: SubmitPublisherPayload) => addPublisher(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publishers'] });
    },
  });

  const handleSubmit = () => form.onSubmit(async (values: SubmitPublisherPayload) => {
    await addAuthorMutation.mutateAsync(values);
    onClose();
  });

  return (
    <Modal opened={opened} onClose={onClose}>
      <form className="stack gap-xl" onSubmit={handleSubmit()}>
        <TextInput
          key={form.key('name')}
          {...form.getInputProps('name')}
          label="Publisher"
          placeholder="Nombre del publisher"
          required
        />
        <div className="group jc-space-between">
          <Button onClick={onClose}>
            CERRAR
          </Button>
          <Button variant="primary" type="submit">
            CONFIRMAR
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewPublisher;

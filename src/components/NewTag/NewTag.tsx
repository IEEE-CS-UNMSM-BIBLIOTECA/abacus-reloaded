import { Button, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitTagPayload } from '@/types';
import { addTag } from '@/services/endpoints/setters';

const NewTag = ({ opened, onClose }: {
  opened: boolean;
  onClose: () => void;
}) => {
  const form = useForm<SubmitTagPayload>();

  const queryClient = useQueryClient();

  const addAuthorMutation = useMutation({
    mutationFn: (values: SubmitTagPayload) => addTag(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });

  const handleSubmit = () => form.onSubmit(async (values: SubmitTagPayload) => {
    await addAuthorMutation.mutateAsync(values);
    onClose();
  });

  return (
    <Modal opened={opened} onClose={onClose}>
      <form className="stack gap-xl" onSubmit={handleSubmit()}>
        <TextInput
          key={form.key('name')}
          {...form.getInputProps('name')}
          label="Tag"
          placeholder="Nombre del tag"
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

export default NewTag;
